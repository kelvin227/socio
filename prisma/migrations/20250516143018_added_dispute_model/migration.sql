-- CreateTable
CREATE TABLE "dispute" (
    "id" TEXT NOT NULL,
    "tradeid" TEXT NOT NULL,
    "orderid" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "useremail" TEXT NOT NULL,

    CONSTRAINT "dispute_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "dispute" ADD CONSTRAINT "dispute_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dispute" ADD CONSTRAINT "dispute_tradeid_fkey" FOREIGN KEY ("tradeid") REFERENCES "traderequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dispute" ADD CONSTRAINT "dispute_orderid_fkey" FOREIGN KEY ("orderid") REFERENCES "adsTransaction"("orderId") ON DELETE CASCADE ON UPDATE CASCADE;
