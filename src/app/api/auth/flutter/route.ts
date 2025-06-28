// pages/api/auth/signup.ts (or app/api/auth/signup/route.ts for App Router)
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs'; // For password hashing
import jwt from 'jsonwebtoken'; // For generating JWTs
/* eslint-disable */
// Extend global type to include prisma for TypeScript
declare global {
  var prisma: PrismaClient | undefined;
}

// Initialize Prisma Client (ensure proper singleton pattern for serverless)
let prisma: PrismaClient;
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // Use a global variable to avoid multiple instances in development hot-reloads
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_jwt_key'; // USE A STRONG SECRET IN PRODUCTION ENV!

export default async function FLUTTER(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }

    const { email, password, referralCode } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    try {
        // 1. Check for existing user
        const existingUser = await prisma.user.findUnique({
            where: { email: email }
        });
        if (existingUser) {
            return res.status(409).json({ success: false, message: 'Email already in use.' });
        }

        // 2. Validate referral code (if provided)
        let referredById = null;
        if (referralCode) {
            const referredBy = await prisma.user.findUnique({
                where: { referralCode: referralCode }
            });
            if (!referredBy) {
                return res.status(400).json({ success: false, message: 'Invalid referral code.' });
            }
            referredById = referredBy.id; // Assuming 'id' is the unique identifier for the user
        }

        // 3. Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 rounds for salting

        // 4. Create the user in the database
        const newUser = await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword, // Store hashed password
                referralCode: generateUniqueReferralCode(), // Implement your own logic for this
                referredBy: referredById,
                // Add any other fields required for user creation
            }
        });

        // 5. Create a wallet for the new user (assuming createWallet is a server-side function)
        // Note: You'll need to make sure createWallet is robust and handles failures.
        const wallet = await createWallet(password, email); // Assuming createWallet uses email/password for some internal generation
        if (!wallet) {
            // Consider rolling back user creation if wallet creation fails
            await prisma.user.delete({ where: { id: newUser.id } }); // Example rollback
            return res.status(500).json({ success: false, message: 'Failed to create a wallet.' });
        }

        // 6. Generate a JWT for the new user
        // This token will be sent to the Flutter app for authentication
        const token = jwt.sign(
            { userId: newUser.id, email: newUser.email },
            JWT_SECRET,
            { expiresIn: '7d' } // Token expires in 7 days
        );

        // 7. Return success response with the token
        return res.status(201).json({
            success: true,
            message: 'User created successfully!',
            token: token,
            user: {
                id: newUser.id,
                email: newUser.email,
                // Do NOT send password or sensitive data back!
            }
        });

    } catch (error) {
        console.error('Sign-up error:', error);
        return res.status(500).json({ success: false, message: 'Failed to create user. Please try again.' });
    }
}

// Dummy function for referral code generation (implement real logic)
function generateUniqueReferralCode(): string {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// Dummy createWallet function (replace with your actual implementation)
async function createWallet(password: string, email: string): Promise<any | null> {
    console.log(`Creating wallet for ${email}...`);
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 1000));
    // In a real app, this would interact with a crypto wallet service or generate keys
    return { walletAddress: `0x${Math.random().toString(16).slice(2, 12)}` };
}