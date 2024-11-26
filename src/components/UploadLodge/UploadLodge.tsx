'use client'

import React, { FormEvent, useState } from 'react'
import { Separator } from "@/components/ui/separator"
import { CardContent } from '@/components/ui/card'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { addDoc, collection } from "firebase/firestore"
import { db } from "@/config/FirebaseConfig"
import { supabase } from "@/config/SupabaseConfig"

function UploadLodge() {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const generateRandomFileName = (originalName: string, prefix: string): string => {
        const extension = originalName.split('.').pop() || '';
        return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 15)}.${extension}`;
    };

    const handleFileUpload = async (file: File, filePathPrefix: string): Promise<string | null> => {
        try {
            // Generate a random unique filename
            const randomFileName = generateRandomFileName(file.name, filePathPrefix);
            const { data, error } = await supabase.storage.from('image').upload(randomFileName, file);

            if (error) {
                //console.error('File upload error:', error.message);
                return null;
            }
            return data?.path
                ? `https://qwymhkktvbieizekmchi.supabase.co/storage/v1/object/public/image/${data.path}`
                : null;
        } catch (err) {
            //console.error('Unexpected file upload error:', err);
            return null;
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const form = e.target as HTMLFormElement;

        // Extract form data
        const LodgeName = (form.elements.namedItem("lodgeName") as HTMLInputElement).value;
        const Address = (form.elements.namedItem("address") as HTMLTextAreaElement).value;
        const OwnerName = (form.elements.namedItem("ownerName") as HTMLInputElement).value;
        const Email = (form.elements.namedItem("email") as HTMLInputElement).value;
        const PhoneNumber = (form.elements.namedItem("phoneNumber") as HTMLInputElement).value;
        const Facilities = (form.elements.namedItem("facilities") as HTMLTextAreaElement).value;
        const Rent = (form.elements.namedItem("rent") as HTMLInputElement).value;
        const Size = (form.elements.namedItem("size") as HTMLInputElement)?.value || "N/A";
        const Category = (form.elements.namedItem("category") as HTMLInputElement)?.value || "Uncategorized";

        // Handle file uploads
        const fileInputs = Array.from(form.querySelectorAll<HTMLInputElement>('input[type="file"]'));
        const uploadedFilePaths = await Promise.all(
            fileInputs.map(async (fileInput, index) => {
                const file = fileInput.files?.[0];
                if (file) {
                    const filePathPrefix = `LodgeImage/Image_${index + 1}`;
                    return await handleFileUpload(file, filePathPrefix);
                }
                return null;
            })
        );

        // Filter out any null values
        const LodgeThumbnail = uploadedFilePaths.filter((path) => path !== null);

        // Ensure at least one image is uploaded
        if (LodgeThumbnail.length === 0) {
            //console.error("No images were uploaded. Submission canceled.");
            setIsSubmitting(false);
            return;
        }

        // Prepare lodge data for Firestore
        const LodgeData = {
            LodgeName,
            Address,
            OwnerName,
            Email,
            PhoneNumber,
            Facilities,
            Rent,
            Size,
            Category,
            LodgeThumbnail, // Store random file names
        };

        try {
            const docRef = await addDoc(collection(db, "LodgeData"), LodgeData);
            //console.log("Lodge successfully added with ID:", docRef.id);
            form.reset();
        } catch (error) {
            //console.error("Error adding lodge data to Firestore:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardContent className="p-6 text-sm">
                {/* Lodge Details */}
                <div className="grid gap-3">
                    <div className="font-semibold">Lodge Details</div>
                    <div className="flex flex-col gap-1">
                        <span className="text-muted-foreground text-sm">Lodge Name</span>
                        <Input id="lodgeName" placeholder="Enter lodge name" required />
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-muted-foreground text-sm">Address</span>
                        <Textarea id="address" placeholder="Enter address" required />
                    </div>
                </div>
                <Separator className="my-4" />

                {/* Owner Details */}
                <div className="grid gap-3">
                    <div className="font-semibold">Owner Contact Details</div>
                    <Input id="ownerName" placeholder="Owner Name" required />
                    <Input id="email" placeholder="Owner Email" type="email" required />
                    <Input id="phoneNumber" placeholder="Owner Phone Number" type="number" required />
                </div>
                <Separator className="my-4" />

                {/* Facilities */}
                <div className="grid gap-3">
                    <div className="font-semibold">Facilities & Amenities</div>
                    <Textarea id="facilities" placeholder="Enter facilities" required />
                </div>
                <Separator className="my-4" />

                {/* Room Details */}
                <div className="grid gap-3">
                    <div className="font-semibold">Room Details</div>
                    <Input id="rent" placeholder="Rent" type="number" required />
                    <Select name="size">
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Small">10x10 (Small)</SelectItem>
                            <SelectItem value="Big">12x12 (Big)</SelectItem>
                            <SelectItem value="Large">Large</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Separator className="my-4" />

                {/* Category Selector */}
                <div className="grid gap-3">
                    <div className="font-semibold">Category</div>
                    <Select name="category" required>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Girls">Girls</SelectItem>
                            <SelectItem value="Boys">Boys</SelectItem>
                            <SelectItem value="Family">Family</SelectItem>
                            <SelectItem value="Girls & Family">Girls & Family</SelectItem>
                            <SelectItem value="Boys & Family">Boys & Family</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Separator className="my-4" />

                {/* File Upload */}
                <div className="grid gap-3">
                    <div className="font-semibold">Upload Images</div>
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index}>
                            <label className="flex items-center gap-1">
                                File {index + 1}:
                                <Input type="file" accept="image/*" required />
                            </label>
                        </div>
                    ))}
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-background hover:bg-accent px-3 py-1.5 rounded-md"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </CardContent>
        </form>
    );
}

export default UploadLodge;
