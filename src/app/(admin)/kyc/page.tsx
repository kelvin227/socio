import React from "react";
import { getKycRequests } from "@/functions/user";
import KycHolder from "@/components/kyc_holder";

export default async function Kycpage() {
  const fetch = await getKycRequests();
  return <KycHolder kyc={fetch} />;
}
