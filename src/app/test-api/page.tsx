'use client'
import React, { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";


export interface Lodge {
  id: string;
  LodgeName: string;
  Address: string;
  OwnerName: string;
  Email: string;
  PhoneNumber: string;
  Facilities: string;
  Rent: string;
  Size: string;
  Category: string;
  GoogleMapsURL: string;
  KeyPlaces: string;
  LodgeNameKeywords: string[];
  AddressKeywords: string[];
  LodgeThumbnail: string[];
}

const SearchLodge: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [results, setResults] = useState<Lodge[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    if (!searchText.trim()) return;

    setLoading(true);

    // try {
    //   const lodgesRef = collection(db, "LodgeData"); // Replace "lodges" with your Firestore collection name
    //   const normalizedSearchText = searchText.toLowerCase(); // Normalize the input

    //   // Query for LodgeNameKeywords
    //   const nameQuery = query(
    //     lodgesRef,
    //     where("LodgeNameKeywords", "array-contains", normalizedSearchText)
    //   );

    //   // Query for AddressKeywords
    //   const addressQuery = query(
    //     lodgesRef,
    //     where("AddressKeywords", "array-contains", normalizedSearchText)
    //   );

    //   // Fetch results from both queries
    //   const [nameSnapshot, addressSnapshot] = await Promise.all([
    //     getDocs(nameQuery),
    //     getDocs(addressQuery),
    //   ]);

    //   const nameResults: Lodge[] = nameSnapshot.docs.map((doc) => ({
    //     id: doc.id,
    //     ...doc.data(),
    //   })) as Lodge[];

    //   const addressResults: Lodge[] = addressSnapshot.docs.map((doc) => ({
    //     id: doc.id,
    //     ...doc.data(),
    //   })) as Lodge[];

    //   // Combine and deduplicate results
    //   const combinedResults = [
    //     ...nameResults,
    //     ...addressResults.filter(
    //       (addressResult) =>
    //         !nameResults.find((nameResult) => nameResult.id === addressResult.id)
    //     ),
    //   ];

      

    //   setResults(combinedResults);
    // } catch (error) {
    //   console.error("Error searching lodges:", error);
    //   setResults([]);
    // } finally {
    //   setLoading(false);
    // }

    const response = await fetch('/api/searchLodge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        searchText,
      }),
    });
    setResults(await response.json())
    setLoading(false)
  };

  

  return (
    <div className="mt-20">
      <h1>Search Lodge</h1>
      <input
        type="text"
        placeholder="Search by name or address"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ padding: "10px", width: "300px" }}
      />
      <button onClick={handleSearch} style={{ marginLeft: "10px", padding: "10px" }}>
        Search
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {results.length > 0 ? (
            results.map((lodge) => (
              <div key={lodge.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
                <h3>{lodge.LodgeName}</h3>
                <p>Address: {lodge.Address}</p>
                <p>Rent: {lodge.Rent}</p>
                <p>Facilities: {lodge.Facilities}</p>
                <p>Owner: {lodge.OwnerName}</p>
                <a href={lodge.GoogleMapsURL} target="_blank" rel="noopener noreferrer">
                  View on Google Maps
                </a>
                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                  {lodge.LodgeThumbnail.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`${lodge.LodgeName} thumbnail`}
                      style={{ width: "100px", height: "100px", objectFit: "cover" }}
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p>No results found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchLodge;
