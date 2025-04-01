import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { hashPassword } from "./lib/utils";
NextAuth({
    providers: [Credentials({
        name: "credentials",
        credentials: {
            email: {label: "Email", type: "email"},
            password: {label: "Password", type: "password"},
        },
        authorize: async (credentials) => {
            if (!credentials?.email || !credentials?.password){
                return null
            };

            const email =  credentials.email;
            const hashedPassword = hashPassword(credentials.password);

            const 
        }

    })]
})