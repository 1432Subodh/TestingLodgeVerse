import { auth } from "@/config/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { NextResponse } from "next/server"

export async function POST(req:Request){

    try {
        const data = await req.json()
        // const {data} =body
        // console.log(data)
        // let user
        const user = await signInWithEmailAndPassword(auth, data.email , data.password)
           
            return NextResponse.json(user)
    } catch (error) {
        console.log(error)
        return NextResponse.json(error,{ status: 500 })
    }

}