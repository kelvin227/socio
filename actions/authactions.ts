"use server"

import { prisma } from "@/lib/db"


export async function createUser(username:string, password:string){
    try {
        const newUser = await prisma.user.create({
            data: {
                email: username,
                name: password
            }
        })
        console.log("new user is: ", newUser)
        return {success: true, message: "User created successfully"}
    } catch (error) {
        console.error(error)
        return {success: false, message: "Failed to create a user"}
    }
}