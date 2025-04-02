import { auth } from '@/auth';
import PagePlaceholder from '@/components/user-pageholder';

export default async function Home() {
  const session = await auth()
  return <PagePlaceholder pageName={session?.user?.email as string} />;
}
