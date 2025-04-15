"use client"
/* eslint-disable */
import type { PutBlobResult } from '@vercel/blob';
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
//import { SubmitKyc } from '@/functions/user';

export default function UKyc() {
  const idCardFrontRef = useRef<HTMLInputElement>(null); // Separate ref for front ID card
  const idCardBackRef = useRef<HTMLInputElement>(null); // Separate ref for back ID card
  const [blobFront, setBlobFront] = useState<PutBlobResult | null>(null);
  const [blobBack, setBlobBack] = useState<PutBlobResult | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    country: "",
    idCardNumber: "",
    idCardFront: null,
    idCardBack: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: "idCardFront" | "idCardBack") => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, [field]: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Upload front ID card
    if (!idCardFrontRef.current?.files) {
      throw new Error("No front ID card file selected");
    }
    const frontFile = idCardFrontRef.current.files[0];
    const frontResponse = await fetch(`/api/kyc?filename=${frontFile.name}`, {
      method: "POST",
      body: frontFile,
    });
    const newBlobFront = (await frontResponse.json()) as PutBlobResult;
    setBlobFront(newBlobFront);

    // Upload back ID card
    if (!idCardBackRef.current?.files) {
      throw new Error("No back ID card file selected");
    }
    const backFile = idCardBackRef.current.files[0];
    const backResponse = await fetch(`/api/kyc?filename=${backFile.name}`, {
      method: "POST",
      body: backFile,
    });
    const newBlobBack = (await backResponse.json()) as PutBlobResult;
    setBlobBack(newBlobBack);

    alert("KYC details submitted successfully!");
        //const response = await SubmitKyc(email, data.idCardnumber, field);
    // if (response.success) {
    //   toast.success(response.message);
    //   router.refresh();
    // } else {    
    //   toast.error(response.message);
    // }
    // Here you can handle the form submission, e.g., send the data to your server
  };


  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">KYC Verification</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div>
          <Label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
            Full Name
          </Label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleInputChange}
            className="mt-1 block w-full"
            required
          />
        </div>

        {/* Country */}
        <div>
          <Label htmlFor="country" className="block text-sm font-medium text-gray-700">
            Country
          </Label>
          <Select
            onValueChange={(value) => setFormData((prev) => ({ ...prev, country: value }))}
          >
            <SelectTrigger className="mt-1 block w-full">
              <SelectValue placeholder="Select your country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USA">United States</SelectItem>
              <SelectItem value="UK">United Kingdom</SelectItem>
              <SelectItem value="Canada">Canada</SelectItem>
              <SelectItem value="India">India</SelectItem>
              <SelectItem value="Nigeria">Nigeria</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* ID Card Number */}
        <div>
          <Label htmlFor="idCardNumber" className="block text-sm font-medium text-gray-700">
            ID Card Number
          </Label>
          <Input
            id="idCardNumber"
            name="idCardNumber"
            type="text"
            placeholder="Enter your ID card number"
            value={formData.idCardNumber}
            onChange={handleInputChange}
            className="mt-1 block w-full"
            required
          />
        </div>

        {/* ID Card Front Image */}
        <div>
          <Label htmlFor="idCardFront" className="block text-sm font-medium text-gray-700">
            Upload ID Card (Front)
          </Label>
          <Input
            id="idCardFront"
            name="idCardFront"
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "idCardFront")}
            className="mt-1 block w-full"
ref={idCardFrontRef}
            required
          />
        </div>

        {/* ID Card Back Image */}
        <div>
          <Label htmlFor="idCardBack" className="block text-sm font-medium text-gray-700">
            Upload ID Card (Back)
          </Label>
          <Input
            id="idCardBack"
            name="idCardBack"
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "idCardBack")}
ref={idCardBackRef}
            className="mt-1 block w-full"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <Button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-md">
            Submit KYC
          </Button>
        </div>
      </form>
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