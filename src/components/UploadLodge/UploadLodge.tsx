'use client'
import { Separator } from "@/components/ui/separator"
import React, { FormEvent, useState } from 'react'
import { CardContent } from '../ui/card'
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { addDoc, collection } from "firebase/firestore"
import { db } from "@/config/FirebaseConfig"
import { supabase } from "@/config/SupabaseConfig"


function UploadLodge() {
    const [filename, setfilename] = useState<string | null>(null)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(e)
        const form = e.target as HTMLFormElement;
        let LodgeName = (form.elements[0] as HTMLInputElement).value;
        let Address = (form.elements[1] as HTMLInputElement).value;
        let OwnerName = (form.elements[2] as HTMLInputElement).value;
        let Email = (form.elements[3] as HTMLInputElement).value;
        let PhoneNumber = (form.elements[4] as HTMLInputElement).value;
        let Facilities = (form.elements[5] as HTMLInputElement).value;
        let Rent = (form.elements[6] as HTMLInputElement).value;
        let Size = (form.elements[8] as HTMLInputElement).value;
        // let file = (form.elements[9] as HTMLInputElement)
        //File of Supabase

        let fileInput = form.elements[9] as HTMLInputElement;
        let file; // Safely access the first file

        if (fileInput.files?.[0]) {
            file = fileInput.files?.[0]
            console.log("Selected file:", file?.name);

        }
        const fileName = 'LodgeImage/' + file?.name
        // console.log(filename)
        setfilename(fileName)
        const { data, error } = await supabase
            .storage.from('image')
            .upload(fileName, file as File)







        const LodgeData = {
            LodgeName, Address, OwnerName, Email, PhoneNumber, Facilities, Rent, Size,
            LodgeThumbnail: `https://qwymhkktvbieizekmchi.supabase.co/storage/v1/object/public/image/${fileName}`
        }
        console.log(LodgeData)
        if (data) {
            console.log(data)
            try {
                const docRef = await addDoc(collection(db, "LodgeData"), LodgeData);
                console.log("Document written with ID: ", docRef.id);
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }else{
            console.log(error)
        }


    }



    return (
        <form action="" method="post" onSubmit={handleSubmit}>
            <p>{filename} here</p>
            <CardContent className="p-6 text-sm">
                <div className="grid gap-3 ">
                    <div className="font-semibold">Lodge Details</div>
                    <ul className="grid gap-3">
                        <li className="flex flex-col gap-1">
                            <span className="text-muted-foreground text-sm">Lodge name</span>
                            <Input placeholder="Enter lodge name here." required id="lodgeName" />
                        </li>
                        <li className="flex flex-col gap-1">
                            <span className="text-muted-foreground text-sm">Address</span>
                            <Textarea placeholder="Type address here." required id="address" />
                        </li>
                    </ul>
                    <Separator className="my-2" />
                    <div className="grid gap-3">
                        <div className="font-semibold">Owner Contact Details</div>
                        <dl className="grid gap-3">
                            <div className="flex items-center justify-between">
                                <dt className="text-muted-foreground">Owner Name</dt>
                                <Input className="w-56" placeholder="Enter Owner Name" id="ownerName" />
                            </div>
                            <div className="flex items-center justify-between">
                                <dt className="text-muted-foreground">Email</dt>
                                <Input className="w-56" placeholder="Enter Owner Email" type="email" id="email" />
                            </div>
                            <div className="flex items-center justify-between">
                                <dt className="text-muted-foreground">Phone</dt>
                                <Input className="w-56" placeholder="Enter Owner Phone Number" type="number" id="phoneNumber" />
                            </div>
                        </dl>
                    </div>
                </div>

                <Separator className="my-4" />
                <div className="grid gap-3">

                    <div className="space-y-4">
                        <div className="font-semibold">Facilities & Amenities</div>
                        <div className="flex flex-col gap-1">
                            <span className="text-muted-foreground text-sm">Address</span>
                            <Textarea placeholder="Type address here." required id="facilities" />
                        </div>
                    </div>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                    <div className="font-semibold">Room Details</div>
                    <dl className="grid gap-3">
                        <div className="flex items-center justify-between">
                            <dt className="flex items-center gap-1 text-muted-foreground">
                                Rent & Price
                            </dt>
                            <dd>
                                <Input className="w-40" type="number" placeholder="Rent & Price" id="rent" />
                            </dd>
                        </div>
                    </dl>
                    <dl className="grid gap-3">
                        <div className="flex items-center justify-between">
                            <dt className="flex items-center gap-1 text-muted-foreground">
                                Room Size
                            </dt>
                            <dd>
                                <Select>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Size" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Small">10X10 (Small)</SelectItem>
                                        <SelectItem value="Big">12X12 (Big)</SelectItem>
                                        <SelectItem value="Large">Large</SelectItem>
                                    </SelectContent>
                                </Select>
                            </dd>
                        </div>
                    </dl>
                </div>
                <Separator className="my-4" />
                <div className="space-y-4">
                    <div className="font-semibold">Uplaod Image</div>

                    <Input type="file" className="w-52" accept="image/*" id="file" />
                </div>
                <div className="flex flex-row-reverse">

                    <input type="submit" className="bg-background shadow-sm hover:bg-accent cursor-pointer hover:text-accent-foreground rounded-md px-3 py-1.5 " id="submit" />
                </div>
            </CardContent>
        </form>
    )
}

export default UploadLodge