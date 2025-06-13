-- CreateTable
CREATE TABLE "tradeprocess" (
    "id" TEXT NOT NULL,
    "tradeid" TEXT NOT NULL,
    "orderid" TEXT NOT NULL,
    "confirmseen" TEXT NOT NULL,
    "sendusdt" TEXT NOT NULL,
    "checkusdtsent" TEXT NOT NULL,
    "sendfeeusdt" TEXT NOT NULL,
    "checkusdtfeesent" TEXT NOT NULL,

    CONSTRAINT "tradeprocess_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tradeprocess_tradeid_key" ON "tradeprocess"("tradeid");

-- CreateIndex
CREATE UNIQUE INDEX "tradeprocess_orderid_key" ON "tradeprocess"("orderid");

-- AddForeignKey
ALTER TABLE "tradeprocess" ADD CONSTRAINT "tradeprocess_orderid_fkey" FOREIGN KEY ("orderid") REFERENCES "adsTransaction"("orderId") ON DELETE CASCADE ON UPDATE CASCADE;
