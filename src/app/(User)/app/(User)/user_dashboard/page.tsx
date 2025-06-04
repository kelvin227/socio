import { auth } from "@/auth";
import PagePlaceholder from "@/components/user-pageholder";
import { TransactionTable } from "../wallet/transaction/trans";
import { prisma } from "@/lib/db";
/* eslint-disable */



export default async function Home() {
  const session = await auth();
  const email = session?.user?.email as string;

  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true }
  });
  if (!user) {
    console.log("error: User not found");
  }

  const wallet = await prisma.wallets.findUnique({
    where: { userId: user?.id },
    select: { address: true },
  });
  if (!wallet) {
    console.log("error: Wallet not found");
  }

  const currentYear = new Date().getFullYear();

  const getbuy = await prisma.adsTransaction.findMany({
    where: {
      AND: [
        {
          OR: [
            {
              merchantID: user?.id
            }
          ]
        },
        {
          createdAt: {
            gte: new Date(currentYear, 0, 1), // Jan 1st of current year
            lt: new Date(currentYear + 1, 0, 1), // Jan 1st of next year
          }
        },
        {
          status: "completed"
        },
        {
          type: {
            in: ['buy', 'sell']
          }
        }
      ]
    },
    select: { type: true, amount: true, createdAt: true, merchantID:true, userId:true,status:true },
  })
  if (!getbuy) {
    console.error(getbuy);
  }

  // --- Data Transformation Logic ---
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    // Initialize the structure for all 12 months with default 0 values
    const monthlyAggregates = new Array(12).fill(null).map((_, i) => ({
      month: monthNames[i],
      Buy: 0,
      Sell: 0,
    }));

    // Process each transaction fetched from the database
    getbuy.forEach(transaction => {
      const date = new Date(transaction.createdAt);
      const monthIndex = date.getMonth(); // getMonth() returns 0 for Jan, 1 for Feb, etc.
      const amount = parseFloat(transaction.amount); // Convert string 'amount' to a number

      // Basic validation for amount
      if (isNaN(amount)) {
        console.warn(`Skipping transaction with invalid amount: ${transaction.amount}`);
        return;
      }

      // Aggregate amounts based on 'type'
      if (transaction.type === 'buy') {
        monthlyAggregates[monthIndex].Buy += amount;
      } else if (transaction.type === 'sell') {
        monthlyAggregates[monthIndex].Sell += amount;
      }
      // Any other 'type' values will simply be ignored
    });


  return (
    <div>
      <PagePlaceholder pageName={session?.user?.email as string} barchartdata={monthlyAggregates as any} />
      <div className="container mx-auto py-10">
        <TransactionTable email={session?.user?.email as string} address={wallet?.address as string} id={user?.id as string}  />
      </div>
    </div>
  );
}
