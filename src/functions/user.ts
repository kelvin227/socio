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

export async function updateUserProfile(email: string, value: string, field: "username" | "name") {
  try {
    // Fetch the user by email
    const user = await getUserByEmail(email);
    if (!user) {
      return { success: false, message: "User not found" };
    }

    // Validate the new value
    if (!value || value.trim() === "") {
      return { success: false, message: `${field} cannot be empty` };
    }

    // Check if the new value is already taken (only for username)
    if (field === "username") {
      const existingUser = await prisma.user.findUnique({
        where: { userName: value }, // Correct field name in the database
      });
      if (existingUser && existingUser.email !== email) {
        return { success: false, message: "Username is already taken" };
      }

      // Check if the new username is the same as the current username
      if (user.userName === value) {
        return { success: false, message: "New username is the same as the current username" };
      }
    }

    // Map "username" to "userName" for the database field
    const updateField = field === "username" ? "userName" : field;

    // Update the user's field in the database
    await prisma.user.update({
      where: { email },
      data: { [updateField]: value },
    });

    return { success: true, message: `${field} updated successfully` };
  } catch (error) {
    console.error(`Error updating user ${field}:`, error);
    return { success: false, message: `An error occurred while updating the ${field}` };
  }
}


export async function SubmitKyc(
  email: string,
  FullName: string,
  country: string,
  idCardNumber: string,
  idCardFront: string,
  idCardBack: string
  ) {
  try {
    // Fetch the user by email
    const users = await getUserByEmail(email);
    if (!users) {
      return { success: false, message: "User not found" };
    }

    // Validate the new value
    if (!FullName || FullName.trim() === "") {
      return { success: false, message: "Full name cannot be empty" };
    }
    if (!country || country.trim() === "") {
      return { success: false, message: "Country cannot be empty" };
    }
    if (!idCardNumber || idCardNumber.trim() === "") {
      return { success: false, message: "ID card number cannot be empty" };
    }

    // Update the user's KYC details in the database
    await prisma.kyc.create({
      data: {
        FullName,
        email,
        country,
        IDNO: idCardNumber,
        documentURL1: idCardFront,
        documentURL2: idCardBack,
        Status: "pending",
        //user: { connect: { email } }, // Connect to the user by email
    }
  }
  );

    return { success: true, message: "KYC details submitted successfully" };
  } catch (error) {
    console.error(`Error submitting KYC details for user ${email}:`, error);
    return { success: false, message: `An error occurred while submitting KYC details` };
  }
}