"use client";
/* eslint-disable */
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft, Clock } from "lucide-react";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { addtraderequest, createads } from "@/functions/user";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { PutBlobResult } from "@vercel/blob";
import { useRouter } from "next/navigation";

export default function AtokHolder({ email, name, data }: { email: string, name: string, data:any[] }) {
   const [selectedType, setSelectedType] = useState<string | null>("buy"); // Selected transaction type for filtering
  const [showdialog, setshowdialog] = useState(false);
  const [showModal, setshowModal] = useState(false);
  const [imgproof, setimgproof] = useState<PutBlobResult | null>(null);
  const idCardFrontRef = useRef<HTMLInputElement>(null);
  const filteredData = data.filter(item => item.type === selectedType)
  // const [data, setData] = useState<any>([]);
  const [formData, setFormData] = useState({
    proof: "",
    price: "",
    minQty: 0, // Ensure minQty is a number
    maxQty: 0, // Ensure maxQty is a number
    payment: "",
    amount: 0, // Add amount field for purchase
    toreceive: 0,
    toreceiveprocessing: 0,
    adId: "",
    pricee: "",
    merchantusername: "",
  });
  const postads = async (proof: string) => {
    try {
      const response = await createads(
        email,
        "atok",
        formData.price,
        formData.minQty,
        formData.maxQty,
        proof
      );
      if (response.success) {
        toast.success("Ads created successfully!");
        setFormData({
          proof: "",
          price: "",
          minQty: 0,
          maxQty: 0,
          payment: "",
          amount: 0,
          toreceive: 0,
          toreceiveprocessing: 0,
          adId: "",
          pricee: "",
          merchantusername: "",
        }); // Reset form
      } else {
        toast.error("Error creating ads!");
      }
    } catch (error) {
      console.error("Error creating ads:", error);
      toast.error("An unexpected error occurred.");
    }
  };


  const [btn, setBtn] = useState(false);
  const handlesell = () => {
    setSelectedType("sell");
    setBtn(true);
  };
  const handlebuy = () => {
    setBtn(false);
    setSelectedType("buy")
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "minQty" || name === "maxQty" ? Number(value) : value, // Parse minQty and maxQty as numbers
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: "idCardFront" | "idCardBack") => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, [field]: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Upload front ID card
      if (!idCardFrontRef.current?.files) {
        throw new Error("no image selected");
      }
      const frontFile = idCardFrontRef.current.files[0];
      const frontResponse = await fetch(`/api/kyc?filename=${frontFile.name}`, {
        method: "POST",
        body: frontFile,
      });
      if (!frontResponse.ok) {
        throw new Error("Failed to upload image");
      }
      const newBlobFront = (await frontResponse.json()) as PutBlobResult;
      setimgproof(newBlobFront);

      await postads(imgproof?.url || ""); // Use the uploaded image URL
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  }

  const handlepurchase = async (e: any) => {
    e.preventDefault();
    setshowModal(true); // Close the modal after purchase
    try {
      const response = await addtraderequest(
        email,
        formData.merchantusername,
        formData.adId,
        formData.amount,
        Number(formData.pricee),
        "atok",
        "buy"
      )
      if (response.success) {
        toast("Trade created successfully!");
      } else {
        toast(response.message || "Failed to create trade.");
      }
    } catch (error) {
      console.error("Error creating trade:", error);
      toast("An unexpected error occurred.");
    }
  }

  const handleAdSelection = (ad: any) => {
    setFormData((prev) => ({
      ...prev,
      price: ad.price, // Set the price of the selected ad
      minQty: ad.minQty,
      maxQty: ad.maxQty,
      payment: ad.payment,
      adId: ad.id,
      pricee: ad.price,
      status: "",
      merchantusername: ad.userName,
      amount: 0, // Reset amount when selecting a new ad

    }));
    setshowdialog(true);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = Number(e.target.value);
    const toReceive = amount * Number(formData.price); // Ensure price is treated as a number
    const toReceiveProcessing = toReceive - toReceive * 0.02; // Deduct 2% processing fee

    setFormData((prev) => ({
      ...prev,
      amount, // Update the amount
      toreceive: toReceive, // Set the calculated value for toreceive
      toreceiveprocessing: toReceiveProcessing, // Set the calculated value for toreceiveprocessing
      amounts: amount, // Update the amounts
      toreceives: toReceive, // Set the calculated value for toreceives
      toreceiveprocessings: toReceiveProcessing, // Set the calculated value for toreceiveprocessings
    }));
  };

  const router = useRouter();

  return (
    <div>
      <Link href={"/otc"} className="flex flex-box">
        <ArrowBigLeft />
        Advertisement
      </Link>
      <DropdownMenuSeparator />
      <div className="grid grid-box sm:flex sm:flex-box lg:flex md:flex lg:flex-box md:flex-box lg:gap-4 md:gap-4 sm:gap-6 w-full">
        <div className="flex flex-row w-full pb-3 gap-3">
          <div className="w-full">
            <Button
              className={btn ? "w-full" : "w-full bg-green-500"}
              onClick={handlebuy}
            >
              Buy
            </Button>
          </div>

          <div className="w-full">
            <Button
              className={btn ? "bg-red-500 w-full" : "w-full"}
              onClick={handlesell}
            >
              Sell
            </Button>
          </div>
        </div>
        <div className="w-full pb-3">
          <Dialog>
            <DialogTrigger className="w-full bg-blue-500 p-1 rounded">Create Ads</DialogTrigger>
            <DialogContent>
              <DialogTitle>Create Advertisement</DialogTitle>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Proof</label>
                  <input
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
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Minimum Quantity</label>
                  <input
                    type="number"
                    name="minQty"
                    value={formData.minQty}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Maximum Quantity</label>
                  <input
                    type="number"
                    name="maxQty"
                    value={formData.maxQty}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                  <select
                    name="payment"
                    value={formData.payment}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    required
                  >
                    <option value="">Select Payment Method</option>
                    <option value="Wallet">Wallet</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                  </select>
                </div>
                <Button type="submit" className="w-full bg-blue-500">
                  Submit
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex flex-box w-full gap-3 pb-3">
          <div className="w-full">
            <Button className="w-full">My Ads</Button>
          </div>
          <div className="w-full">
            <Button className="w-full">Official Web</Button>
          </div>
        </div>
        <div className="w-full pb-3">
          <Button className="w-full bg-red-500" onClick={
            () => {
              router.replace("/otc/advertisement/trades")
            }
          }>Active trades</Button>
        </div>
      </div>
      <div className="container mx-auto py-10">

        {/* Ads Table */}
        <div className={showdialog  ? "hidden" : ""}>
        <h2 className="text-2xl font-bold mb-4">Ads List</h2>
        
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md hidden sm:table">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 text-left">Username</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Available|limits</th>
              <th className="p-4 text-left">Payment Method</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((ad: any) => (
                <tr key={ad.id} className="border-b">
                  <td className="p-4">{ad.userName}</td>
                  <td className="p-4">{ad.price} USDT</td>
                  <td className="p-4">{ad.minQty}-{ad.maxQty} Atok</td>
                  <td className="p-4">Wallet</td>
                  <td>
                    
                    <Button
                      className="bg-blue-500 text-white"
                      disabled={name == ad.userName ? true : false}
                      onClick={() => {
                        handleAdSelection(ad);
                        
                      }}
                    >
                      Buy
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  No ads found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
        {/* hiddem dialog */}
        <div className={showdialog && !showModal ? "" : "hidden"}>
        <form onSubmit={handlepurchase} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleAmountChange} // Trigger calculation on amount change
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">You will receive:</label>
            <input
              type="number"
              name="toreceive"
              value={formData.toreceive || 0} // Display the calculated value
              readOnly // Make the input read-only
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              What you will receive after deduction of processing fee:
            </label>
            <input
              type="number"
              name="toreceiveprocessing"
              value={formData.toreceiveprocessing || 0} // Display the calculated value
              readOnly // Make the input read-only
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100"
            />
          </div>
          <Button type="submit" className="w-full bg-blue-500">
            Submit
          </Button>
        </form>
        </div>
        
        {/* Mobile View */}
        <div className="block sm:hidden border p-4 rounded-lg shadow-md">
          <div className="gap-4">
            {data.length > 0 ? (
              data.map((ad: any) => (
                <div key={ad.id}>
                  <div className={showdialog ? "hidden" : ""}>
                <div className="flex flex-cols-2 gap-4" >
                  <div className="col-span-1">
                    <h3 className="text-lg font-bold">{ad.userName}</h3>
                    <p>Price: {ad.price} USDT</p>
                    <p>Available: {ad.minQty}-{ad.maxQty} PI</p>
                    <p>Payment Method: Wallet</p>
                  </div>
                  <div className="col-span-1">
                    <Button
                      className="bg-blue-500 text-white"
                      disabled={name == ad.userName ? true : false}
                      onClick={() => {
                        handleAdSelection(ad);
                      }}
                    >
                      Buy
                    </Button>
                  </div>
                </div>
                </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">No ads found</div>
            )}

          </div>
        </div>
        {/* Modal for Purchase Confirmation */}
        <div className={showModal ? "" : "hidden"}>
                Waiting For Confirmation
                <div className="max-w-md mx-auto p-6 bg-yellow-50 border border-yellow-300 shadow-lg rounded-lg text-center">
                  <div className="flex justify-center mb-4">
                    <Clock className="text-yellow-500 w-16 h-16" />
                  </div>
                  <h1 className="text-2xl font-bold text-yellow-700 mb-2">trade Pending</h1>
                  <p className="text-gray-700 mb-4">
                    Thank you, <span className="font-semibold">hii</span>, for choose to buy from me. Your trade request has been sent to the buyer.
                  </p>
                  <p className="text-gray-600">
                    Please allow up to 48 hours for the verification process to complete. We will notify you once your KYC has been approved.
                  </p>
                </div>
              </div>
      </div>
    </div>
  );
}

{/* <div>
                            price: {ad.price} USDT
                            <br />
                            Available: {ad.minQty}-{ad.maxQty} Atok
                            <br />
                            Payment Method: Wallet
                            <br />
                            Time limit: 15 MINS
                            <br />
                            Processing Fee: 2%
                            <br />
                            <br />
                            <h2>Note from the Buyer: hello thanks for trading with kelvin</h2>

                          </div> */}
