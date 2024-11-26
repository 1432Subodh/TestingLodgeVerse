'use client';

import { useEffect, useState } from "react";
import { db } from "@/config/FirebaseConfig";
import { collection, getDocs, QuerySnapshot, DocumentData } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { IndianRupee } from "lucide-react";

export type DataType = {
  id: string;
  Address?: string;
  Email?: string;
  Facilities?: string;
  LodgeName?: string;
  LodgeThumbnail?: string[];
  OwnerName?: string;
  PhoneNumber?: string;
  Rent?: string;
  Size?: string;
  Category ?: string;
  GoogleMapsURL ?: string;  
};

const Page: React.FC = () => {
  const [lodges, setLodges] = useState<DataType[]>([]);

  // Fetching data from Firestore
  useEffect(() => {
    const fetchLodges = async () => {
      try {
        const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(collection(db, "LodgeData"));
        const fetchedLodges: DataType[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLodges(fetchedLodges);
        //console.log("Fetched data:", fetchedLodges);
      } catch (error) {
        //console.error("Error fetching collection data:", error);
      }
    };

    fetchLodges();
  }, []);


  

  return (
    <div>
      <h1 className="font-bold pb-4 sm:text-xl tracking-wide capitalize">
        Welcome! Find your lodge.
      </h1>

      {lodges.length > 0 ? (
        <div className="sm:grid sm:grid-cols-4 sm:gap-5 flex flex-col gap-3">
          {lodges.map((lodge) => (
            <Card key={lodge.id} className="sm:w-[230px] flex sm:flex-col w-full sm:h-64 h-32">
              <div className="sm:w-full w-44 sm:h-32 h-full">
                <Image
                  src={lodge.LodgeThumbnail?.[0] || "/placeholder-image.jpg"} 
                  alt={lodge.LodgeName || "Lodge Thumbnail"}
                  width={230}
                  height={128}
                  className="sm:w-full opacity-55 w-44 sm:h-32 h-full object-cover sm:rounded-tr-md rounded-bl-md sm:rounded-bl-none sm:rounded-tl-md rounded-tl-md"
                />
              </div>

              <CardContent className="p-3 w-full flex flex-col justify-between h-full">
                <div>
                  <h1 className="font-semibold text-foreground">{lodge.LodgeName || "Lodge Name"}</h1>
                  <p className="text-muted-foreground text-sm leading-4">
                    {lodge.Address || "No address available."}
                  </p>
                </div>
                <div className="flex items-center justify-between sm:pt-0 pt-3">
                  <p className="flex items-center">
                    <span>{lodge.Rent || "N/A"}</span>
                    <IndianRupee className="w-3.5 h-3.5" />
                    <span>/Room</span>
                  </p>
                  <Link href={`/view/${lodge.id}`}>
                    <button className="text-sm font-semibold text-white bg-primary p-2 rounded-md">
                      View More
                    </button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default Page;
