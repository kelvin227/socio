-- CreateTable
CREATE TABLE "userWallet" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "walletAddress" TEXT,
    "walletAddress2" TEXT,
    "walletAddress3" TEXT,
    "walletAddress4" TEXT,
    "walletAddress5" TEXT,
    "walletAddress6" TEXT,
    "walletAddress7" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userWallet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userWallet_walletAddress_key" ON "userWallet"("walletAddress");

-- CreateIndex
CREATE UNIQUE INDEX "userWallet_walletAddress2_key" ON "userWallet"("walletAddress2");

-- CreateIndex
CREATE UNIQUE INDEX "userWallet_walletAddress3_key" ON "userWallet"("walletAddress3");

-- CreateIndex
CREATE UNIQUE INDEX "userWallet_walletAddress4_key" ON "userWallet"("walletAddress4");

-- CreateIndex
CREATE UNIQUE INDEX "userWallet_walletAddress5_key" ON "userWallet"("walletAddress5");

-- CreateIndex
CREATE UNIQUE INDEX "userWallet_walletAddress6_key" ON "userWallet"("walletAddress6");

-- CreateIndex
CREATE UNIQUE INDEX "userWallet_walletAddress7_key" ON "userWallet"("walletAddress7");

-- AddForeignKey
ALTER TABLE "userWallet" ADD CONSTRAINT "userWallet_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;
