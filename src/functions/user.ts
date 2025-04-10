import { prisma } from "@/lib/db";

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: { email: email },
    omit: {
      id: true,
      password: true
    }
    
  });

  return user;
}


export async function updateUserProfile(email: string, input: string, mode: number) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any = {};

  if (mode === 1) {
    data.username = input;
  }

  // Add other modes here
  else if (mode === 2) 
    { data.phoneNo = input }
  else if (mode === 3)
  { data.image = input }
  else if (mode === 4)
  { data.name = input }
  else if (mode == 5)
  { data.}

  if (Object.keys(data).length === 0) {
    throw new Error("Nothing to update.");
  }

  const user = await prisma.user.update({
    where: { email },
    data,
  });

  return user;
}
