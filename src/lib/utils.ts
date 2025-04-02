import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import bcrypt from "bcryptjs"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function hashPassword(password: string){
  const saltRound = 10
  const salt = bcrypt.genSaltSync(saltRound);
  const hash = bcrypt.hashSync(password, salt);

  return hash
}
export function generateReferralCode(length = 8) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}