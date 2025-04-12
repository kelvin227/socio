"use server"
import { prisma } from "@/lib/db";

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    omit: {
      id: true,
      password: true
    }
    
  });

  return user;
}


export async function updateUserProfile(email: string, newUsername: string) {
  try {
    // Fetch the user by email
    const user = await getUserByEmail(email);
    if (!user) {
      return { success: false, message: "User not found" };
    }

    // Validate the new username
    if (!newUsername || newUsername.trim() === "") {
      return { success: false, message: "Username cannot be empty" };
    }

    // Check if the new username is already taken by another user
    const existingUser = await prisma.user.findUnique({
      where: { userName: newUsername },
    });
    if (existingUser && existingUser.email !== email) {
      return { success: false, message: "Username is already taken" };
    }

    // Check if the new username is the same as the current username
    if (user.userName === newUsername) {
      return { success: false, message: "New username is the same as the current username" };
    }

    // Update the user's username in the database
    await prisma.user.update({
      where: { email },
      data: { userName: newUsername },
    });

    return { success: true, message: "Username updated successfully" };
  } catch (error) {
    console.error("Error updating user profile:", error);
    return { success: false, message: "An error occurred while updating the username" };
  }
}