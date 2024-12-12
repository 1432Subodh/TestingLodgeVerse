'use client';

import React, { FormEvent, useState } from 'react';
import { Separator } from "@/components/ui/separator";
import { CardContent } from '@/components/ui/card';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import toast, { Toaster } from 'react-hot-toast';

function UploadLodge() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const tokenizeString = (input: string): string[] => {
            return input.toLowerCase().split(" "); // Split by spaces, normalize to lowercase
        };
        // Extract form data
        const lodgeData = {
            LodgeName: (form.elements.namedItem("lodgeName") as HTMLInputElement).value,
            LodgeNameLowerCase: ((form.elements.namedItem("lodgeName") as HTMLInputElement).value).toLowerCase().replaceAll(',',''),
            AddressLowerCase: ((form.elements.namedItem("address") as HTMLTextAreaElement).value).toLowerCase().replaceAll(',',''),
            Address: (form.elements.namedItem("address") as HTMLTextAreaElement).value,
            OwnerName: (form.elements.namedItem("ownerName") as HTMLInputElement).value,
            Email: (form.elements.namedItem("email") as HTMLInputElement).value,
            PhoneNumber: (form.elements.namedItem("phoneNumber") as HTMLInputElement).value,
            Facilities: (form.elements.namedItem("facilities") as HTMLTextAreaElement).value,
            Rent: (form.elements.namedItem("rent") as HTMLInputElement).value,
            Size: (form.elements.namedItem("size") as HTMLInputElement)?.value || "N/A",
            Category: (form.elements.namedItem("category") as HTMLInputElement)?.value || "Uncategorized",
            GoogleMapsURL: (form.elements.namedItem("googleMapsUrl") as HTMLInputElement)?.value || "",
            KeyPlaces: (form.elements.namedItem("keyPlaces") as HTMLTextAreaElement)?.value || "",
            LodgeNameKeywords: tokenizeString(((form.elements.namedItem("lodgeName") as HTMLInputElement).value).toLowerCase().replaceAll(',','')),
            AddressKeywords: tokenizeString(((form.elements.namedItem("address") as HTMLTextAreaElement).value).toLowerCase().replaceAll(',','')),
        };

        // Prepare files for upload
        const fileInputs = Array.from(form.querySelectorAll<HTMLInputElement>('input[type="file"]'));
        const files = await Promise.all(
            fileInputs.map(async (fileInput, index) => {
                const file = fileInput.files?.[0];
                if (file) {
                    const prefix = `LodgeImage/Image_${index + 1}`;
                    const content = await file.arrayBuffer();
                    return {
                        name: file.name,
                        content: Buffer.from(content).toString('base64'),
                        prefix,
                    };
                }
                return null;
            })
        );

        // Collect file URLs
        const fileUrls = Array.from(form.querySelectorAll<HTMLInputElement>('input[name^="fileUrl"]'))
            .map((input) => input.value)
            .filter((url) => url);

        // Use toast.promise for handling async submission with feedback
        await toast.promise(
            new Promise(async (resolve, reject) => {
                try {
                    setIsSubmitting(true);

                    const response = await fetch('/api/lodgedata', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            lodgeData,
                            files: files.filter(Boolean),
                            fileUrls,
                        }),
                    });

                    const result = await response.json();

                    if (!response.ok) {
                        reject(result.error || 'Failed to submit lodge data.');
                    }
                    if (response.ok) {

                        form.reset(); // Reset the form on success
                    }

                    resolve(result.id); // Resolve promise with success
                } catch (error: any) {
                    reject(error.message || 'Submission error.');
                } finally {
                    setIsSubmitting(false);
                }
            }),
            {
                loading: 'Submitting your lodge details...',
                success: 'Lodge details submitted successfully! 🎉',
                error: 'Failed to submit lodge details. Please try again. 😢',
            }
        );
    };

    return (
        <form onSubmit={handleSubmit}>
            <Toaster /> {/* Add the Toaster component for displaying notifications */}
            <CardContent className="p-6 text-sm">
                {/* Lodge Details */}
                <div className="grid gap-3">
                    <div className="font-semibold">Lodge Details</div>
                    <Input id="lodgeName" placeholder="Enter lodge name" required />
                    <Textarea id="address" placeholder="Enter address" required />
                    <Input id="googleMapsUrl" placeholder="Google Maps URL" required />
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

                {/* Key Places Section */}
                <div className="grid gap-3">
                    <div className="font-semibold">Key Places</div>
                    <Textarea id="keyPlaces" placeholder="Nearby landmarks, markets, or points of interest" required />
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
                                <Input type="file" accept="image/*" />
                            </label>
                        </div>
                    ))}
                </div>

                {/* File URLs */}
                <div className="grid gap-3 mt-4">
                    <div className="font-semibold">Or Provide Image URLs</div>
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index}>
                            <label className="flex items-center gap-1">
                                URL {index + 1}:
                                <Input name={`fileUrl_${index}`} placeholder="Enter file URL" />
                            </label>
                        </div>
                    ))}
                </div>

                <div className="flex justify-end mt-4">
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
