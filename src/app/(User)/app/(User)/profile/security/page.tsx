import { auth } from "@/auth";
import Security from "@/components/sercurity_holder";

export default async function Home() {
  const session = await auth();

  return (
    <div>
      <Security email={session?.user?.email as string} />

    </div>
  );
}
