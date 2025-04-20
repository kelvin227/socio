"use server"

import { signIn, signOut } from "@/auth"
import { prisma } from "@/lib/db"
import bcrypt from "bcryptjs"

export async function Login(email:string, password:string){
    try {
        const existingUser = await prisma.user.findUnique({
            where: {email: email}
        })
        if(!existingUser){
            return {success: false, message: "User does not exist"}
        }
        const isMatch = bcrypt.compareSync(password, existingUser.password)
        if(!isMatch){
            return {success: false, message: "Incorrect password"}
        }
        if(existingUser.roles === "admin"){

        await signIn("credentials", {
            email: email,
            password: password,
            redirect: false,
        })
    }
            await signIn("credentials", {
                email: email,
                password: password,
                redirect: false,
            })
        return {success: true, message: "Sign in successfully"}
    } catch (error) {
        console.error(error)
        return {success: false, message: "There's an error somewhere"}
    }
}

export async function LogOut(){
    await signOut(
        {redirectTo: "/auth"}
    )
}

export async function SignUp(email:string, password:string, referralCode?: string){
    try {
        const existingUser = await prisma.user.findUnique({
            where: {email: email}
        })
        if (existingUser){
            return {success: false, message: "Email already in use"}
        }
        const referredBy = await prisma.user.findUnique({
            where: {referralCode: referralCode}
        })
        if (!referredBy){
            return {success: false, message: "invalid referral code"}
        }
        await signIn("credentials", {
            email: email,
            password: password,
            referralCode: referralCode,
            redirect: false
        })
        return {success: true, message: "User created successfully"}
    } catch (error) {
        //console.error(error)
        return {success: false, message: "Failed to create a user"}
    }
}