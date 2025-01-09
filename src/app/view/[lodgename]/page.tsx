'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import Image from "next/image";
import { ExternalLinkIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

const Page = () => {
    const [data, setData] = useState<any | null>(null);
    const [imageShow, setImageShow] = useState<string | null>(null);
    const [isImageLoading, setIsImageLoading] = useState<boolean>(true);
    const [isMounted, setIsMounted] = useState(false);
    const path = useParams<{ lodgename: string }>();
  
    useEffect(() => {
      setIsMounted(true);
      return () => setIsMounted(false); // Clean up to ensure back/forward cache restoration
    }, []);
  
    const fetchData = useCallback(async () => {
      try {
        if (!path||!path.lodgename) return;
  
        const lodgeId = path.lodgename;
        const docRef = doc(db, "LodgeData", lodgeId);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          const lodgeData = docSnap.data();
          setData(lodgeData);
          setImageShow(lodgeData?.LodgeThumbnail?.[0] || null);
        } else {
          console.warn("No such document!");
        }
      } catch (err) {
        console.error("Error fetching lodge data:", err);
      }
    }, [path]);
  
    useEffect(() => {
      if (isMounted) fetchData();
    }, [fetchData, isMounted]);
  
    const handleImageChange = useCallback((imageUrl: string) => {
      if (imageUrl === imageShow) return;
      setIsImageLoading(true);
      setImageShow(imageUrl);
    }, [imageShow]);
  
    if (!isMounted) return null;

  return (
    <div className="pt-16 pb-4 sm:px-10 px-5 min-h-screen w-full flex gap-4 sm:flex-row flex-col">
      {/* Left Section: Image Viewer */}
      <div className="sm:w-[45%] h-full flex flex-col gap-4">
        <div className="relative">
          {isImageLoading && (
            <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-25 rounded-md">
              <div className="spinner-border animate-spin inline-block w-10 h-10 border-4 rounded-full text-primary"></div>
            </div>
          )}
          {data ? (
            <Image
              src={imageShow || "/img/placeholder-image.jpg"}
              alt={data?.LodgeName || "Lodge Thumbnail"}
              width={600}
              height={400}
              className={`w-full sm:h-[75vh] h-[50vh] rounded-md object-cover transition-opacity ${isImageLoading ? "opacity-50" : "opacity-100"}`}
              onLoad={() => setIsImageLoading(false)}
            />
          ) : (
            <Skeleton className="w-full sm:h-[75vh] h-[50vh] rounded-md" />
          )}
        </div>

        <div className="flex gap-3 justify-center">
          {data?.LodgeThumbnail?.map((thumbnail: string, index: number) => (
            <Image
              key={index}
              src={thumbnail || "/img/placeholder-image.jpg"}
              alt={`Thumbnail ${index + 1}`}
              width={100}
              height={80}
              className={`opacity-60 w-28 h-20 overflow-hidden rounded-md object-cover cursor-pointer ${imageShow === thumbnail && "border-2 border-primary"}`}
              onClick={() => handleImageChange(thumbnail)}
            />
          ))}
        </div>
      </div>

      {/* Right Section: Lodge Details */}
      <div className="sm:w-[55%] sm:max-h-none min-h-[65vh]">
        <p className="text-xs tracking-wider font-light">Lodge Name</p>
        <div className="flex justify-between items-center">
          <h1 className="sm:text-3xl text-2xl font-extrabold tracking-wide leading-none pb-3 capitalize">
            {data ? data?.LodgeName : <Skeleton className="w-40 h-6" />}
          </h1>
          <button className="text-xs flex transition-all font-semibold items-center gap-1 border rounded-md bg-card px-2 py-1.5 hover:opacity-75">
            <Link href={data?.GoogleMapsURL || "/"} target="_blank">
              View on Map
            </Link>
            <ExternalLinkIcon width={12} height={12} />
          </button>
        </div>

        <p className="text-xs tracking-wider font-light">Address</p>
        <h3 className="font-semibold text-sm pb-1">{data ? data?.Address : <Skeleton className="w-80 h-4" />}</h3>

        <p className="text-xs tracking-wider font-light">Category</p>
        <h3 className="font-semibold text-sm pb-5 border-b">
          {data ? data?.Category : <Skeleton className="w-20 h-4" />}
        </h3>

        {/* Additional Information */}
        <div className="flex justify-between w-full gap-4 mt-4 pb-4">
          <Card className="w-[50%] capitalize p-4">
            <h1 className="text-lg font-semibold mb-2">Facilities</h1>
            <p className="text-sm font-light">
              {data ? data?.Facilities : <Skeleton className="w-full h-12" />}
            </p>
          </Card>
          <Card className="w-[50%] p-4">
            <h1 className="text-lg font-semibold mb-2">Contact</h1>
            <p className="text-sm font-light">Owner: <span className="font-semibold">{data?.OwnerName}</span></p>
            <p className="text-sm font-light">Phone: <span className="font-semibold">{data?.PhoneNumber}</span></p>
          </Card>
        </div>

        {/* Room Details */}
        <div className="w-full border-t pt-4 mt-4">
          <h2 className="text-xl font-semibold mb-4">Room Details</h2>
          <ul className="space-y-3">
            <li className="flex justify-between items-center bg-card p-4 rounded-md shadow-sm">
              <p className="text-sm font-light">Room Price:</p>
              <h3 className="text-lg font-semibold">{data?.Rent ? `₹${data.Rent}` : <Skeleton className="w-16 h-6" />}</h3>
            </li>
            <li className="flex justify-between items-center bg-card p-4 rounded-md shadow-sm">
              <p className="text-sm font-light">Room Size:</p>
              <h3 className="text-lg font-semibold">{data?.Size || <Skeleton className="w-16 h-6" />}</h3>
            </li>
            <li className="flex justify-between items-center bg-card p-4 rounded-md shadow-sm">
              <p className="text-sm font-light">Room Type:</p>
              <h3 className="text-lg font-semibold">{data?.RoomType || <Skeleton className="w-16 h-6" />}</h3>
            </li>
            <li className="flex justify-between items-center bg-card p-4 rounded-md shadow-sm">
              <p className="text-sm font-light">Availability:</p>
              <h3 className="text-lg font-semibold">
                {data?.Availability ? (
                  <span className="text-green-600">Available</span>
                ) : (
                  <span className="text-red-600">Unavailable</span>
                )}
              </h3>
            </li>
          </ul>
        </div>

        <div className="flex justify-center sm:mt-10 mt-5">
          <button className="bg-primary hover:bg-accent text-white px-4 py-2 rounded-md">
            Add to Favorites
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
