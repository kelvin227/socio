"use server"

import { signIn } from "@/auth"

export async function Login(email:string, password:string, referralCode?: string){
    try {
        await signIn("credentials", {
            email: email,
            password: password,
            referralCode: referralCode,
            redirect: false
        })
        return {success: true, message: "User created successfully"}
    } catch (error) {
        console.error(error)
        return {success: false, message: "Failed to create a user"}
    }
}