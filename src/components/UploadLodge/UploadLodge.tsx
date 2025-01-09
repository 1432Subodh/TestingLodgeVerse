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


    const resizeImage = (file: File, maxWidth: number, maxHeight: number, maxSizeKB: number): Promise<File> => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            const reader = new FileReader();

            reader.onload = (e) => {
                img.src = e.target?.result as string;
            };

            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > maxWidth) {
                        height = Math.round((height *= maxWidth / width));
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width = Math.round((width *= maxHeight / height));
                        height = maxHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                ctx?.drawImage(img, 0, 0, width, height);

                canvas.toBlob((blob) => {
                    if (blob && blob.size / 1024 <= maxSizeKB) {
                        resolve(new File([blob], file.name, { type: file.type }));
                    } else {
                        reject(new Error('Image size exceeds the maximum limit.'));
                    }
                }, file.type);
            };

            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const tokenizeString = (input: string): string[] => {
            return input.toLowerCase().split(" "); // Split by spaces, normalize to lowercase
        };

        // Extract form data
        const lodgeData = {
            LodgeName: (form.elements.namedItem("lodgeName") as HTMLInputElement).value,
            LodgeNameLowerCase: ((form.elements.namedItem("lodgeName") as HTMLInputElement).value).toLowerCase().replaceAll(',', ''),
            AddressLowerCase: ((form.elements.namedItem("address") as HTMLTextAreaElement).value).toLowerCase().replaceAll(',', ''),
            Address: (form.elements.namedItem("address") as HTMLTextAreaElement).value,
            OwnerName: (form.elements.namedItem("ownerName") as HTMLInputElement).value,
            Email: (form.elements.namedItem("email") as HTMLInputElement).value,
            PhoneNumber: (form.elements.namedItem("phoneNumber") as HTMLInputElement).value,
            Facilities: (form.elements.namedItem("facilities") as HTMLTextAreaElement).value,
            Rent: (form.elements.namedItem("rent") as HTMLInputElement).value,
            Size: (form.elements.namedItem("size") as HTMLInputElement)?.value || "N/A",
            Category: ((form.elements.namedItem("category") as HTMLInputElement)?.value).toLowerCase() || "Uncategorized",
            GoogleMapsURL: (form.elements.namedItem("googleMapsUrl") as HTMLInputElement)?.value || "",
            KeyPlaces: (form.elements.namedItem("keyPlaces") as HTMLTextAreaElement)?.value || "",
            NumberOfBed: (form.elements.namedItem("NumberOfStudents") as HTMLInputElement)?.value,
            LodgeNameKeywords: tokenizeString(((form.elements.namedItem("lodgeName") as HTMLInputElement).value).toLowerCase().replaceAll(',', '')),
            AddressKeywords: tokenizeString(((((form.elements.namedItem("address") as HTMLTextAreaElement).value) + ` ${(form.elements.namedItem("category") as HTMLInputElement)?.value || "Uncategorized"}`) + ` ${(form.elements.namedItem("keyPlaces") as HTMLTextAreaElement)?.value || ""}`).toLowerCase().replaceAll(',', '')),
        };

        // Prepare files for upload
        const fileInputs = Array.from(form.querySelectorAll<HTMLInputElement>('input[type="file"]'));

        const files = await Promise.all(
            fileInputs.map(async (fileInput, index) => {
                const file = fileInput.files?.[0];
                if (file) {
                    try {
                        const resizedFile = await resizeImage(file, 800, 800, 300); // Resize image to 800x800 and ensure size is under 300KB
                        const prefix = `LodgeImage/Image_${index + 1}`;
                        const content = await resizedFile.arrayBuffer();
                        return {
                            name: resizedFile.name,
                            content: Buffer.from(content).toString('base64'),
                            prefix,
                        };
                    } catch (error) {
                        toast.error(`File ${index + 1} exceeds 300KB after resizing. Please upload smaller files.`);
                        return null;
                    }
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
                            fileUrls,
                            files: files.filter(Boolean), // Filter out invalid files
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
        <>
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
                        <Input id="NumberOfBed" placeholder="Number of Bed" type="number" required />
                        <Select name="size">
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select size" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Small (10X10)">10x10 (Small)</SelectItem>
                                <SelectItem value="Big (12X12)">12x12 (Big)</SelectItem>
                                <SelectItem value="Large">Large</SelectItem>
                                <SelectItem value="NA">NA</SelectItem>
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
                                <SelectItem value="Girl">Girl</SelectItem>
                                <SelectItem value="Boy">Boy</SelectItem>
                                <SelectItem value="Family">Family</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Separator className="my-4" />

                    {/* File Upload */}
                    <div className="grid gap-3">
                        <div className="font-semibold">Upload Images <span className='text-red-700'>* Image size will be under 1MB</span></div>
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
                            className="bg-primary hover:bg-accent px-3 py-1.5 rounded-md"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </button>
                    </div>
                </CardContent>
            </form>
        </>
    );
}

export default UploadLodge;
