-- CreateTable
CREATE TABLE "traderequest" (
    "id" TEXT NOT NULL,
    "adId" TEXT NOT NULL,
    "coin" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "merchantId" TEXT NOT NULL,
    "merchantName" TEXT NOT NULL,

    CONSTRAINT "traderequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "traderequest_userId_key" ON "traderequest"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "traderequest_merchantId_key" ON "traderequest"("merchantId");

-- AddForeignKey
ALTER TABLE "traderequest" ADD CONSTRAINT "traderequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
