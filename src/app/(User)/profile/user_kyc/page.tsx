import { auth } from "@/auth";
import KycPageholder from "@/components/kyc_pageholder";
import { getKycStatus } from "@/functions/user";

/* eslint-disable */

// type KycPageholderProps = {
//   email: string;
//   mess: string;
// };

const UKyc= async() => {
  const session= await auth();
  const kyc = await getKycStatus(session?.user?.email as string);
  let kycs ="";
  if (kyc?.message === "approved") {
    kycs = "approved";
  } else if (kyc?.message === "pending") {
    kycs = "pending";

  }
  else if (kyc?.message === "rejected") {
    kycs = "rejected";
    } else {
    kycs = "not submitted";
  }
  return (
  <div>
    <KycPageholder kycss={kycs} email={session?.user?.email as string} />
  </div>
  );

};

// 'use client';
 
// import type { PutBlobResult } from '@vercel/blob';
// import { useState, useRef } from 'react';
 
// export default function UKyc() {
//   const inputFileRef = useRef<HTMLInputElement>(null);
//   const [blob, setBlob] = useState<PutBlobResult | null>(null);
//   return (
//     <>
//       <h1>Upload Your Avatar</h1>
 
//       <form
//         onSubmit={async (event) => {
//           event.preventDefault();
 
//           if (!inputFileRef.current?.files) {
//             throw new Error('No file selected');
//           }
 
//           const file = inputFileRef.current.files[0];
 
//           const response = await fetch(
//             `/api/kyc?filename=${file.name}`,
//             {
//               method: 'POST',
//               body: file,
//             },
//           );
 
//           const newBlob = (await response.json()) as PutBlobResult;
 
//           setBlob(newBlob);
//         }}
//       >
//         <input name="file" ref={inputFileRef} type="file" required />
//         <button type="submit">Upload</button>
//       </form>
//       {blob && (
//         <div>
//           Blob url: <a href={blob.url}>{blob.url}</a>
//         </div>
//       )}
//     </>
//   );
// }
export default UKyc;