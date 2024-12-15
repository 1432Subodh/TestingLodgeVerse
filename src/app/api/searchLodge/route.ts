import { Lodge } from "../../../../interface/All_InterFace"; 
import { db } from "@/config/FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { search } = body;

  try {
    const lodgesRef = collection(db, "LodgeData"); // Replace "LodgeData" with your Firestore collection name
    const normalizedSearchText = search.toLowerCase(); // Normalize the input

    // Query for LodgeNameKeywords
    const nameQuery = query(
      lodgesRef,
      where("LodgeNameKeywords", "array-contains", normalizedSearchText)
    );

    // Query for AddressKeywords
    const addressQuery = query(
      lodgesRef,
      where("AddressKeywords", "array-contains", normalizedSearchText)
    );

    // Query for Category
    const categoryQuery = query(
      lodgesRef,
      where("Category", "==", search) // Case-sensitive matching in Firestore
    );

    // Fetch results from all three queries
    const [nameSnapshot, addressSnapshot, categorySnapshot] = await Promise.all([
      getDocs(nameQuery),
      getDocs(addressQuery),
      getDocs(categoryQuery),
    ]);

    const nameResults: Lodge[] = nameSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Lodge[];

    const addressResults: Lodge[] = addressSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Lodge[];

    const categoryResults: Lodge[] = categorySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Lodge[];

    // Combine and deduplicate results
    const combinedResults = [
      ...nameResults,
      ...addressResults.filter(
        (addressResult) =>
          !nameResults.find((nameResult) => nameResult.id === addressResult.id)
      ),
      ...categoryResults.filter(
        (categoryResult) =>
          !nameResults.find((nameResult) => nameResult.id === categoryResult.id) &&
          !addressResults.find(
            (addressResult) => addressResult.id === categoryResult.id
          )
      ),
    ];

    return NextResponse.json(combinedResults);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
