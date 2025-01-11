'use client';

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { IndianRupee } from "lucide-react";
import { fetchLodges } from "../../../HandleRequest/GetData";

// Sample Loader Component
const Loader = () => (
  <div className="flex justify-center items-center h-[85vh]" role="status" aria-label="Loading">
    <div className="loader border-t-4 border-primary rounded-full w-12 h-12 animate-spin"></div>
  </div>
);

export type DataType = {
  id: string;
  Address?: string;
  AddressLowerCase?: string;
  Email?: string;
  Facilities?: string;
  LodgeName?: string;
  LodgeThumbnail: string[];
  OwnerName?: string;
  PhoneNumber?: string;
  Rent?: string;
  Size?: string;
  Category?: string;
  GoogleMapsURL?: string;
  KeyPlaces?: string;
  LodgeNameLowerCase?: string;
};

const Page: React.FC = ({ searchParams }: any) => {
  const [lodges, setLodges] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [imageLoading, setImageLoading] = useState<Record<string, boolean>>({});

  const search = searchParams.search;

  const fetchData = useCallback(async () => {
    let data: any = await fetchLodges();
    setLodges(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    const fetchSearchData = async () => {
      const response = await fetch('/api/searchLodge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ search }),
      });
      setLodges(await response.json());
      setLoading(false);
    };

    if (search) {
      fetchSearchData();
    } else {
      fetchData();
    }
  }, [search, fetchData]);

  const handleImageLoadStart = (id: string) => {
    setImageLoading((prev) => ({ ...prev, [id]: true }));
  };

  const handleImageLoadComplete = (id: string) => {
    setImageLoading((prev) => ({ ...prev, [id]: false }));
  };

  if (loading) return <Loader />;

  const handleLink = ()=>{
    setLoading(true)
  if (loading) return <Loader />;
    
  }

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
                {/* Category Label */}
                <span
                  className={`absolute right-1 top-1 text-xs px-2 py-0.5 cursor-default capitalize rounded-sm ${lodge.Category === "boy"
                    ? "hover:bg-[#49a411c3] bg-green-700"
                    : lodge.Category === "girl"
                      ? "bg-pink-600 hover:bg-[#ab107ac3]"
                      : "hover:bg-yellow-600 bg-[#d99a2eb8]"
                    }`}
                  aria-label={`Category: ${lodge.Category || "Uncategorized"}`}
                >
                  {lodge?.Category || "Uncategorized"}
                </span>

                {/* Show spinner while the image is loading */}
                {imageLoading[lodge.id] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100" role="status" aria-label="Loading Image">
                    <div className="loader border-t-4 border-primary rounded-full w-8 h-8 animate-spin"></div>
                  </div>
                )}

                <Image
                  src={lodge.LodgeThumbnail?.[0] || "/placeholder-image.jpg"}
                  alt={lodge.LodgeName || "Lodge Thumbnail"}
                  width={230}
                  height={128}
                  className="sm:w-full w-44 sm:h-32 h-full object-cover sm:rounded-t-md rounded-md"
                  onLoadingComplete={() => handleImageLoadComplete(lodge.id)}
                  onLoadStart={() => handleImageLoadStart(lodge.id)}
                />
              </div>

              <CardContent className="p-3 w-full flex flex-col justify-between h-full">
                <div>
                  <h1 className="font-semibold text-foreground">
                    {lodge.LodgeName || "Lodge Name"}
                  </h1>
                  <p className="text-muted-foreground text-sm leading-4">
                    {lodge.Address
                      ? lodge.Address.split(" ").slice(0, 7).join(" ") + (lodge.Address.split(" ").length > 7 ? "..." : "")
                      : "No address available."}
                  </p>
                </div>
                <div className="flex items-center justify-between sm:pt-0 pt-3">
                  <p className="flex items-center">
                    <span>{lodge.Rent || "N/A"}</span>
                    <IndianRupee className="w-3.5 h-3.5" />
                    <span>/Room</span>
                  </p>
                  <Link href={`/view/${lodge.id}`} onClick={handleLink}>
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
        <div className="flex justify-center w-full h-[77vh] items-center"><p>No data available.</p></div>
      )}
    </div>
  );
};

export default Page;
