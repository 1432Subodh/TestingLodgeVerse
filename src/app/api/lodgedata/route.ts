import { NextResponse } from "next/server";
import { supabase } from "@/config/SupabaseConfig";
import { db } from "@/config/FirebaseConfig";
import { collection, addDoc, QuerySnapshot, DocumentData, getDocs } from "firebase/firestore";
import { DataType } from "@/app/lodge/page";

const generateRandomFileName = (originalName: string, prefix: string): string => {
    const extension = originalName.split('.').pop() || '';
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 15)}.${extension}`;
};

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const {
            lodgeData, // Basic lodge data (name, address, etc.)
            fileUrls,  // External image URLs
            files,    // Files to upload
        } = body;

        // Upload files to Supabase
        const uploadedFilePaths = await Promise.all(
            files.map(async (file: { name: string; content: string; prefix: string }) => {
                const { name, content, prefix } = file;
                const randomFileName = generateRandomFileName(name, prefix);

                const { data, error } = await supabase.storage
                    .from('image')
                    .upload(randomFileName, Buffer.from(content, 'base64'), { contentType: 'image/*' });

                if (error) {
                    throw new Error(`File upload error: ${error.message}`);
                }

                return data?.path
                    ? `https://qwymhkktvbieizekmchi.supabase.co/storage/v1/object/public/image/${data.path}`
                    : null;
            })
        );

        // Combine file URLs and uploaded file paths
        const LodgeThumbnail = [ ...fileUrls, ...uploadedFilePaths.filter(Boolean)];

        // Ensure at least one image is provided
        if (LodgeThumbnail.length === 0) {
            return NextResponse.json({ error: "No images or URLs provided." }, { status: 400 });
        }

        // Add lodge data to Firestore
        const docRef = await addDoc(collection(db, "LodgeData"), {
            ...lodgeData,
            LodgeThumbnail,
        });

        return NextResponse.json({ message: "Lodge successfully added", id: docRef.id }, { status: 201 });
    } catch (error) {
        console.error("Error in lodge API route:", error);
        return NextResponse.json({ error }, { status: 500 });
    }
}


export async function GET(){
    try {
        
        const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(collection(db, "LodgeData"));
        const fetchedLodges: any[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // console.log(fetchedLodges)
        return NextResponse.json(fetchedLodges)

    } catch (error) {
        console.error("Error fetching lodges:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch lodges" },
            { status: 500 }
        )
    }

}
