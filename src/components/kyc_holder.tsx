"use client";
/* eslint-disable */
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { approvekyc, rejectkyc } from "@/functions/user";

export default function KycHolder({ kyc }: { kyc: Array<any> }) {
  const kycRequests = kyc;

  const [selectedRequest, setSelectedRequest] = useState<
    { id: string; FullName: string; email: string; country: string; IDNO: string; idCardFront: string; idCardBack: string } | null
  >(null);

  const [showRejectModal, setShowRejectModal] = useState(false); // State to show/hide the rejection modal
  const [rejectionReason, setRejectionReason] = useState(""); // State to store the rejection reason

  const handleViewDetails = (request: {
    id: string;
    FullName: string;
    email: string;
    country: string;
    IDNO: string;
    idCardFront: string;
    idCardBack: string;
  }) => {
    setSelectedRequest(request);
  };

  const Approve = async ({ email }: { email: string }) => {
    try {
      const response = await approvekyc(email);
      if (response.success) {
        console.log("KYC Approved successfully!");
      } else {
        console.log("Failed to approve KYC request.");
      }
    } catch (error) {
      console.error("Error approving KYC:", error);
    }
  };

  const Reject = async ({ email, reason }: { email: string; reason: string }) => {
    try {
      const response = await rejectkyc(email, reason);
      if (response.success) {
        console.log("KYC Rejected successfully!");
      } else {
        console.log("Failed to reject KYC request.");
      }
    } catch (error) {
      console.error("Error rejecting KYC:", error);
    }
  };

  const handleRejectSubmit = async () => {
    if (!selectedRequest) return;

    try {
      await Reject({ email: selectedRequest.email, reason: rejectionReason });
      setShowRejectModal(false); // Close the modal after submission
      setRejectionReason(""); // Clear the rejection reason
    } catch (error) {
      console.error("Error submitting rejection reason:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">KYC Requests</h1>

      {/* Rejection Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Reject KYC Request</h2>
            <p className="mb-4">
              Please provide a reason for rejecting the KYC request for <strong>{selectedRequest?.FullName}</strong>.
            </p>
            <Input
              type="text"
              placeholder="Enter rejection reason"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full mb-4"
            />
            <div className="flex justify-end gap-4">
              <Button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectionReason("");
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </Button>
              <Button
                onClick={handleRejectSubmit}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                disabled={!rejectionReason.trim()}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      )}

      {selectedRequest ? (
        <div className="p-6 bg-gray-50 border border-gray-300 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Full Details</h2>
          <p>
            <strong>Full Name:</strong> {selectedRequest.FullName}
          </p>
          <p>
            <strong>Email:</strong> {selectedRequest.email}
          </p>
          <p>
            <strong>Country:</strong> {selectedRequest.country}
          </p>
          <p>
            <strong>ID Card Number:</strong> {selectedRequest.IDNO}
          </p>
          <div className="mt-4">
            <strong>ID Card Front:</strong>
            <img src={selectedRequest.idCardFront} alt="ID Card Front" className="mt-2 w-full max-w-sm border rounded-md" />
          </div>
          <div className="mt-4">
            <strong>ID Card Back:</strong>
            <img src={selectedRequest.idCardBack} alt="ID Card Back" className="mt-2 w-full max-w-sm border rounded-md" />
          </div>
          <Button
            onClick={() => setSelectedRequest(null)}
            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Back to Requests
          </Button>
        </div>
      ) : kycRequests.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 text-left">Full Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Country</th>
              <th className="p-4 text-left">ID Card Number</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {kycRequests.map((request) => (
              <tr key={request.id}>
                <td className="p-4 border-b">{request.FullName}</td>
                <td className="p-4 border-b">{request.email}</td>
                <td className="p-4 border-b">{request.country}</td>
                <td className="p-4 border-b">{request.IDNO}</td>
                <td className="p-4 border-b flex gap-2">
                  <Button
                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                    onClick={() => Approve({ email: request.email })}
                  >
                    Approve
                  </Button>
                  <Button
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                    onClick={() => {
                      setSelectedRequest(request);
                      setShowRejectModal(true);
                    }}
                  >
                    Reject
                  </Button>
                  <Button
                    onClick={() => handleViewDetails(request)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    View Full Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500 text-center">No KYC requests available</p>
      )}
    </div>
  );
}