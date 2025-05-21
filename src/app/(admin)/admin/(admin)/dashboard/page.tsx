import { auth } from '@/auth';
import PagePlaceholder from '@/components/page-placeholder';
import { getUserByEmail } from '@/functions/user';

export default async function Home() {
  // This is a placeholder for the Kelvin page.
  const session = await auth();
  // You can fetch data or perform any other operations here if needed.
  const role = await getUserByEmail(session?.user?.email as string);
  if (role?.roles === 'admin') {
    return <PagePlaceholder pageName={session?.user?.email as string} />;
  }else{
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <h1 className="text-2xl font-bold">You are not authorized to view this page.</h1>
      </div>
    );
  }
}
