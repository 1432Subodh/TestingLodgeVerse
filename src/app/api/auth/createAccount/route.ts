import { auth, db } from "@/config/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const data = await req.json();
        // console.log(body)
        // const { data } = body;
        // console.log(data)

        // Validate request payload
        if (!data?.email || !data?.password) {
            return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
        }

        // Create user with Firebase
        const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);

        // Extract user details
        const user = userCredential.user;

        if (user.uid) {
            const docRef = await addDoc(collection(db, "users"), {
                uid: user.uid,
                email: user.email,
                username: data.username,
                fullname: data.fullname
            })
            console.log(docRef)
        }


        return NextResponse.json({
            message: "User created successfully.",
            user: {
                uid: user.uid,
                email: user.email,
            },
        });
    } catch (error: any) {
        // Handle Firebase errors
        return NextResponse.json({
            error: error.message || "An unexpected error occurred.",
        }, { status: 500 });
    }
}
