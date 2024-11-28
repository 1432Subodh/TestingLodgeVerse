'use client';

import { useEffect, useState } from "react";
import { db } from "@/config/FirebaseConfig";
import { collection, getDocs, QuerySnapshot, DocumentData } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { IndianRupee } from "lucide-react";

// Sample Loader Component
const Loader = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="loader border-t-4 border-primary rounded-full w-12 h-12 animate-spin"></div>
  </div>
);

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
  Category?: string;
  GoogleMapsURL?: string;
  KeyPlaces?: string;
};

const Page: React.FC = () => {
  const [lodges, setLodges] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLodges = async () => {
      try {
        setLoading(true); // Show loader
        const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(collection(db, "LodgeData"));
        const fetchedLodges: DataType[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLodges(fetchedLodges);
      } catch (error) {
        console.error("Error fetching lodges:", error);
      } finally {
        setLoading(false); // Hide loader
      }
    };

    fetchLodges();
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="font-bold pb-4 sm:text-xl tracking-wide capitalize">
        Welcome! Find your lodge.
      </h1>

      {lodges.length > 0 ? (
        <div className="sm:grid sm:grid-cols-4 sm:gap-5 flex flex-col gap-3">
          {lodges.map((lodge) => (
            <Card
              key={lodge.id}
              className="sm:w-[230px] flex sm:flex-col w-full sm:h-64 h-32"
            >
              <div className="sm:w-full w-44 sm:h-32 h-full relative">
                <span
                  className={`absolute right-4 top-1 text-xs px-2 py-0.5 cursor-default rounded-sm ${
                    lodge.Category === "Boys"
                      ? "hover:bg-[#49a411c3] bg-green-700"
                      : lodge.Category === "Girls"
                      ? "bg-pink-600 hover:bg-[#ab107ac3]"
                      : "hover:bg-yellow-600 bg-[#d99a2eb8]"
                  }`}
                >
                  {lodge?.Category || "Uncategorized"}
                </span>
                <Image
                  src={lodge.LodgeThumbnail?.[0] || "/placeholder-image.jpg"}
                  alt={lodge.LodgeName || "Lodge Thumbnail"}
                  width={230}
                  height={128}
                  className="sm:w-full w-44 sm:h-32 h-full object-cover sm:rounded-t-md rounded-md"
                />
              </div>

              <CardContent className="p-3 w-full flex flex-col justify-between h-full">
                <div>
                  <h1 className="font-semibold text-foreground">
                    {lodge.LodgeName || "Lodge Name"}
                  </h1>
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
