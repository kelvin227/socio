-- CreateTable
CREATE TABLE "Kyc" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "FullName" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "IDNO" TEXT NOT NULL,
    "documentURL" TEXT NOT NULL,
    "Status" TEXT NOT NULL,
    "Rejection_reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Reviewed_at" TIMESTAMP(3),

    CONSTRAINT "Kyc_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Kyc" ADD CONSTRAINT "Kyc_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
