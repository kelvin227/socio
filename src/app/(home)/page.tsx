import { prisma } from "@/lib/db";
import Link from "next/link";

export default async function Home() {
  const users = await prisma.user.findMany();

  return (

    <div>
      {users.length > 0 ? (
        users.map((user, index) => <h1 key={index}>{user.email}</h1>)
      ) : (
        <p>No users Yet</p>
      )}
      <h1 className="text-red-500" ><Link href={"/auth"}> Sign Up </Link></h1>
      
    </div>
    
      
  );
}
