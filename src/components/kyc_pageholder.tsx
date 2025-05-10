"use client"
/* eslint-disable */
import type { PutBlobResult } from '@vercel/blob';
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getKycStatus, SubmitKyc } from '@/functions/user';
import { toast } from "sonner";
import { Clock, CheckCircle, XCircle } from "lucide-react";


export default function KycPageholder ({email, kycss}: {email: string, kycss: string}) {
    const idCardFrontRef = useRef<HTMLInputElement>(null); // Separate ref for front ID card
    const idCardBackRef = useRef<HTMLInputElement>(null); // Separate ref for back ID card
    const [blobFront, setBlobFront] = useState<PutBlobResult | null>(null);
    const [blobBack, setBlobBack] = useState<PutBlobResult | null>(null);

    const [isLoading, setIsLoading] = useState(false);
    const [kycApproved, setKycApproved] = useState(false); // State to track KYC approval
    const [kycPending, setKycPending] = useState(false); // State to track KYC pending status
    const [kycRejected, setKycRejected] = useState(false); // State to track KYC rejection

    const [formData, setFormData] = useState({
      fullName: "",
      country: "",
      idCardNumber: "",
      idCardFront: null,
      idCardBack: null,
    });

    // Use useEffect to handle KYC status updates
    useEffect(() => {
      if (kycss === "approved") {
        setKycApproved(true);
        setKycPending(false);
        setKycRejected(false);
      } else if (kycss === "pending") {
        setKycApproved(false);
        setKycPending(true);
        setKycRejected(false);
      } else if (kycss === "rejected") {
        setKycApproved(false);
        setKycPending(false);
        setKycRejected(true);
      } else {
        setKycApproved(false);
        setKycPending(false);
        setKycRejected(false);
      }
    }, [kycss]); // Dependency array ensures this runs only when kycss changes
  
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
      setIsLoading(true);
    
      // Validate form fields
      if (!formData.fullName.trim()) {
        toast("Full name is required");
        setIsLoading(false);
        return;
      }
      if (!formData.country) {
        toast("Country is required");
        setIsLoading(false);
        return;
      }
      if (!formData.idCardNumber.trim()) {
        toast("ID card number is required");
        setIsLoading(false);
        return;
      }
    
      // Proceed with file uploads and submission
      try {
        // Upload front ID card
        if (!idCardFrontRef.current?.files) {
          throw new Error("No front ID card file selected");
        }
        const frontFile = idCardFrontRef.current.files[0];
        const frontResponse = await fetch(`/api/kyc?filename=${frontFile.name}`, {
          method: "POST",
          body: frontFile,
        });
        if (!frontResponse.ok) {
          throw new Error("Failed to upload front ID card");
        }
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
        if (!backResponse.ok) {
          throw new Error("Failed to upload back ID card");
        }
        const newBlobBack = (await backResponse.json()) as PutBlobResult;
        setBlobBack(newBlobBack);
    
        // Submit KYC details
        const response = await SubmitKyc(
          email,
          formData.fullName,
          formData.country,
          formData.idCardNumber,
          newBlobFront.url,
          newBlobBack.url
        );
    
        if (response.success) {
          toast.success(response.message);
          setKycPending(true); // Set KYC pending state to true
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    if (kycApproved) {
      // Render KYC Approved Component
      return (
        <div className="max-w-md mx-auto p-6 bg-green-50 border border-green-300 shadow-lg rounded-lg text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="text-green-500 w-16 h-16" />
          </div>
          <h1 className="text-2xl font-bold text-green-700 mb-2">KYC Approved</h1>
          <p className="text-gray-700 mb-4">
            Congratulations, <span className="font-semibold">{formData.fullName}</span>! Your KYC verification has been successfully approved.
          </p>
          <p className="text-gray-600">
            You can now access all the features and services available on our platform. Thank you for verifying your identity.
          </p>
        </div>
      );
    }

    if (kycPending) {
      // Render KYC Pending Component
      return (
        <div className="max-w-md mx-auto p-6 bg-yellow-50 border border-yellow-300 shadow-lg rounded-lg text-center">
          <div className="flex justify-center mb-4">
            <Clock className="text-yellow-500 w-16 h-16" />
          </div>
          <h1 className="text-2xl font-bold text-yellow-700 mb-2">KYC Pending</h1>
          <p className="text-gray-700 mb-4">
            Thank you, <span className="font-semibold">{formData.fullName}</span>, for submitting your KYC details. Your verification is currently under review.
          </p>
          <p className="text-gray-600">
            Please allow up to 48 hours for the verification process to complete. We will notify you once your KYC has been approved.
          </p>
        </div>
      );
    }

    if (kycRejected) {
      // Render KYC Rejected Component
      return (
        <div className="max-w-md mx-auto p-6 bg-red-50 border border-red-300 shadow-lg rounded-lg text-center">
          <div className="flex justify-center mb-4">
            <XCircle className="text-red-500 w-16 h-16" />
          </div>
          <h1 className="text-2xl font-bold text-red-700 mb-2">KYC Rejected</h1>
          <p className="text-gray-700 mb-4">
            Sorry, <span className="font-semibold">{formData.fullName}</span>. Your KYC verification has been rejected.
          </p>
          <p className="text-gray-600 mb-6">
            Please review your submitted details and try again. If you need assistance, contact our support team.
          </p>
          <Button
            onClick={() => {
              setKycRejected(false); // Reset the rejected state
            }}
            className="px-6 py-2 bg-blue-500 text-white rounded-md"
          >
            Resubmit KYC
          </Button>
        </div>
      );
    }
  
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
              value={formData.country}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, country: value }))}
            >
              <SelectTrigger className="mt-1 block w-full">
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Nepal">Nepal</SelectItem>
                <SelectItem value="China">China</SelectItem>
                <SelectItem value="India">India</SelectItem>
                <SelectItem value="Vietnam">Vietnam</SelectItem>
                <SelectItem value="US">US</SelectItem>
                <SelectItem value="UK">UK</SelectItem>
                <SelectItem value="Japan">Japan</SelectItem>
                <SelectItem value="Pakistan">Pakistan</SelectItem>
                <SelectItem value="Canada">Canada</SelectItem>
                <SelectItem value="Nigeria">Nigeria</SelectItem>
                <SelectItem value="Bangladesh">Bangladesh</SelectItem>
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
            <Button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-md" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit KYC"}
            </Button>
          </div>
        </form>
      </div>
    );
}
