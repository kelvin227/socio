"use client";
/* eslint-disable */
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft, Clock } from "lucide-react";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { addtraderequest, createads, deletead } from "@/functions/user";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { PutBlobResult } from "@vercel/blob";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import {checkbalance} from "@/functions/blockchain/wallet.utils";

export default function AtokHolder({ email, name, data, userads}: { email: string, name: string, data: any[], userads: any[] }) {
  const [myad, setmyads] = useState(false)
  const [showads, setshowads] = useState(true);
  const [selectedCoin, setSelectedCoin] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string | null>("buy"); // Selected transaction type for filtering
  const [showdialog, setshowdialog] = useState(false);
  const [showModal, setshowModal] = useState(false);
  const [imgproof, setimgproof] = useState<PutBlobResult | null>(null);
  const idCardFrontRef = useRef<HTMLInputElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
  let filteredData = data.filter(item => item.type === selectedType)
  let filteredcoin = filteredData.filter(item => item.coin === selectedCoin)
  if(myad){
    filteredData =userads.filter(item => item.type === selectedType)
    filteredcoin = filteredData.filter(item => item.coin === selectedCoin)
  }
  const totalPages = Math.ceil(filteredcoin.length / itemsPerPage);
  const paginatedAds = filteredcoin.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const [btn, setBtn] = useState(false);
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
    type: "buy"
  });



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

      const response = await createads(
        email,
        selectedCoin,
        formData.price,
        formData.minQty,
        formData.maxQty,
        imgproof?.url || "",
        formData.type
      );
      if (response.success) {
        toast("Ads created successfully!", {
        className: "bg-green-500 text-white",
      });
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
          type: "buy",
        }); // Reset form
      } 
        toast(response.message, {
        className: "bg-red-500 text-white",
      });
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  }

  const handlepurchase = async (e: any) => {
    e.preventDefault();
    let balance;
    try {
      if(selectedType === "sell"){
        const response = await addtraderequest(
        email,
        formData.merchantusername,
        formData.adId,
        formData.amount,
        Number(formData.pricee),
        selectedCoin,
        "sell"
      )
            if (response.success) {
        setshowModal(true);// Close the modal after purchase
        toast("Trade created successfully!");
      } else {
        toast(response.message || "Failed to create trade request.");
      }

      }else{

        const checkbalanc = await checkbalance(email, formData.amount.toString(), formData.pricee);
        if(!checkbalanc.success){
          toast.error(checkbalanc.message);
        }else{
const response = await addtraderequest(
        email,
        formData.merchantusername,
        formData.adId,
        formData.amount,
        Number(formData.pricee),
        selectedCoin,
        "buy"
      )
      if (response.success) {
        setshowModal(true);// Close the modal after purchase
        toast.success("Trade created successfully!");
      } else {
        toast(response.message || "Failed to create trade request.");
      }
    }
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

    const handledelete = async(ad: any) => {
    setFormData((prev) => ({
      ...prev,
      adId: ad.id,
    }));
    const del = await deletead(ad.Id);
    if(!del.success){
      toast.error("unable to delete ad");
    }else{
      toast.success("ad deleted successfully")
      router.refresh();
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = Number(e.target.value);
    const toReceive = amount * Number(formData.price); // Ensure price is treated as a number
    const toReceiveProcessing = selectedType === "sell" ? toReceive - toReceive * 0.02 : toReceive + toReceive * 0.02; // Deduct 2% processing fee

    setFormData((prev) => ({
      ...prev,
      amount, // Update the amount
      toreceive: toReceive, // Set the calculated value for toreceive
      toreceiveprocessing: toReceiveProcessing, // Set the calculated value for toreceiveprocessing
      }));
  };

  const router = useRouter();

  return (
  
    !showads ? (

      <div>
      <div className="flex flex-box cursor-pointer" onClick = {() => {setSelectedCoin(""), setshowads(true), setSelectedType("buy"), setshowdialog(false), setshowModal(false), setBtn(false), setmyads(false)}}>
        <ArrowBigLeft />
        Advertisement
      </div>
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
            <DialogTrigger className="w-full bg-blue-500 p-1 rounded" disabled={myad ? true : false}>Create Ads</DialogTrigger>
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
                  <label className="block text-sm font-medium text-grey-700">Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    required
                  >
                    <option value="buy">Buy</option>
                    <option value="sell">Sell</option>
                  </select>
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
                    <option value="Wallet">Wallet</option>
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
            <Button className="w-full" onClick={()=> {setmyads(true)}}>My Ads</Button>
          </div>
          <div className="w-full">
            <Button className="w-full">Official Web</Button>
          </div>
        </div>
        <div className="w-full pb-3">
          <Button className="w-full" onClick={
            () => {
              router.replace("/otc/advertisement/trades")
            }
          }>Active trades</Button>
        </div>
      </div>
      <div className="container mx-auto py-10">

        {/* Ads Table */}
        <div className={showdialog ? "hidden" : ""}>
          <h2 className="text-2xl font-bold mb-4">Ads List</h2>

          <table className="min-w-full border border-gray-300 rounded-lg shadow-md hidden sm:table">
            <thead>
              <tr className="light:bg-gray-100">
                <th className="p-4 text-left">Username</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Available|limits</th>
                <th className="p-4 text-left" colSpan={2}>Payment Method</th>
              </tr>
            </thead>
            <tbody>
              {filteredcoin.length > 0 ? (
                paginatedAds.map((ad: any) => (
                
                  <tr key={ad.id} className="border-b">
                    <td className="p-4">{ad.userName}</td>
                    <td className="p-4">{ad.price} USDT</td>
                    <td className="p-4">{ad.minQty}-{ad.maxQty} {ad.coin}</td>
                    <td className="p-4">Wallet</td>
                    <td>

                      {myad ? <Button
              className="bg-red-500 w-full"
              onClick={() => handledelete(ad)}
            >
              delete
            </Button> :<Button
                        className={selectedType === "buy" ? "bg-blue-500 text-white" : "bg-red-500 text-white"}
                        disabled={name == ad.userName ? true : false}
                        onClick={() => {
                          handleAdSelection(ad);

                        }}
                      >
                        {selectedType === "buy" ? ("buy") : ("sell")}
                      </Button>}
                    </td>
                  </tr>
                
                   
          
                )
              ) ): (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">
                    No ads found
                  </td>
                </tr>
              )}
              
            </tbody>
          </table>
          {/* Pagination Controls */}
          {filteredcoin.length > itemsPerPage && (
            <div className="flex justify-center items-center gap-4 mt-4">
              <Button
                className="px-4 py-2"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Previous
              </Button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <Button
                className="px-4 py-2"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
              </Button>
            </div>
          )}
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
              <label className="block text-sm font-medium light:text-gray-700">{selectedType === "buy" ? "USDT to send:": "USDT to receive:"}</label>
              <input
                type="number"
                name="toreceive"
                value={formData.toreceive || 0} // Display the calculated value
                readOnly // Make the input read-only
                className="mt-1 block w-full light:border-gray-300 rounded-md shadow-sm light:bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium light:text-gray-700">
                {selectedType === "buy" ? "What you wil send after addition of processing fees": "What you will receive after deduction of processing fee:"}
              </label>
              <input
                type="number"
                name="toreceiveprocessing"
                value={formData.toreceiveprocessing || 0} // Display the calculated value
                readOnly // Make the input read-only
                className="mt-1 block w-full light:border-gray-300 rounded-md shadow-sm light:bg-gray-100"
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
            {filteredcoin.length > 0 ? (
              paginatedAds.map((ad: any) => (
                <div key={ad.id}>
                  <div className={showdialog ? "hidden" : ""}>
                    <div className="flex flex-cols-2 gap-4" >
                      <div className="col-span-1">
                        <h3 className="text-lg font-bold">{ad.userName}</h3>
                        <p>Price: {ad.price} USDT</p>
                        <p>Available: {ad.minQty}-{ad.maxQty} {ad.coin}</p>
                        <p>Payment Method: Wallet</p>
                      </div>
                      <div className="col-span-1">
                        {myad ? <Button
              className="bg-red-500 w-full"
              onClick={() => handledelete(ad)}
            >
              delete
            </Button> :<Button
                          className={selectedType === "buy" ? "bg-blue-500 text-white" : "bg-red-500 text-white"}
                          disabled={name == ad.userName ? true : false}
                          onClick={() => {
                            handleAdSelection(ad);
                          }}
                        >
                          {selectedType === "buy" ? ("buy") : ("sell")}
                        </Button>}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">No ads found</div>
            )}

            {/* Pagination Controls */}
          {filteredcoin.length > itemsPerPage && (
            <div className="flex justify-center items-center gap-4 mt-4">
              <Button
                className="px-4 py-2"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Previous
              </Button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <Button
                className="px-4 py-2"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
              </Button>
            </div>
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
              Thank you, <span className="font-semibold">{name}</span>, for choose to buy from me. Your trade request has been sent to the buyer.
            </p>
            <p className="text-gray-600">
              please wait while the {selectedType ==="buy"? "Seller": "Buyer"} is being contacted if the buyer does not response in the next 5 hours your request will be automatically be canceled
            </p>
          </div>
        </div>
      </div>
    </div>
    ) :
     (
       <div>
      <div className="pb-4" onClick = {() => {setSelectedCoin("atok"), setshowads(false)}}>
        <Card>
          <div className="flex flex-box w-full p-2">
            <CardContent>
              <div>
                <Avatar>
                  <AvatarImage
                    src="https://atok.ai/_next/image?url=%2Fatok-token%2Ftoken.png&w=1920&q=100"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            </CardContent>

            <div>
              <CardContent>Atok/USDT</CardContent>
            </div>

            <div className="absolute right-0">
              <div className="grid grid-box">
                <CardContent>Start Trading</CardContent>

                <CardContent>
                  <div className="flex flex-box">
                    2% fee
                    <TrendingUp />
                  </div>
                </CardContent>
              </div>
            </div>
          </div>
        </Card>
        
      </div>

      <div className="pb-4" onClick = {() => {setSelectedCoin("wow"), setshowads(false)}}>
        <Card>
          <div className="flex flex-box w-full p-2">
            <CardContent>
              <div>
                <Avatar>
                  <AvatarImage
                    src="https://school.codegator.com.ng/image/ajavyk7p.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            </CardContent>
        
            <div>
              <CardContent>WOW/USDT</CardContent>
            </div>
        
            <div className="absolute right-0">
              <div className="grid grid-box">
                <CardContent>start trading</CardContent>
        
                <CardContent>
                  <div className="flex flex-box">
                    2% fee
                    <TrendingUp />
                  </div>
                </CardContent>
              </div>
            </div>
          </div>
        </Card>
        
        
      </div>

      <div className="pb-4" onClick = {() => {setSelectedCoin("sidra"), setshowads(false)}}>
        <Card>
          <div className="flex flex-box w-full p-2">
            <CardContent>
              <div>
                <Avatar>
                  <AvatarImage
                    src="https://play-lh.googleusercontent.com/NLwEmyxzTKqtR2bvRSugma35UBn-6x-zRNNwHykjV9wVDS3ACezJg-al6A-4W2oWnw"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            </CardContent>
        
            <div className="">
              <CardContent>SDA/USDT</CardContent>
            </div>
        
            <div className="absolute right-0">
              <div className="grid grid-box">
                <CardContent>Start Trading</CardContent>
        
                <CardContent>
                  <div className="flex flex-box">
                    2% fee
                    <TrendingUp />
                  </div>
                </CardContent>
              </div>
            </div>
          </div>
        </Card>
        
      </div>

      <div className="pb-4" onClick = {() => {setSelectedCoin("ruby"), setshowads(false)}}>
        <Card>
          <div className="flex flex-box w-full p-2">
            <CardContent>
              <div>
                <Avatar>
                  <AvatarImage
                    src="https://play-lh.googleusercontent.com/OVJjGaAQNzEBJXeqi8RLvDHKHb-be2bbF95iKsrhltNDSOAYXO-qJKJexTV-OT9h-A=w480-h960-rw"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            </CardContent>
        
            <div className="">
              <CardContent>RBL/USDT</CardContent>
            </div>
        
            <div className="absolute right-0">
              <div className="grid grid-box">
                <CardContent>Start Trading</CardContent>
        
                <CardContent>
                  <div className="flex flex-box">
                    2% fee
                    <TrendingUp />
                  </div>
                </CardContent>
              </div>
            </div>
          </div>
        </Card>

        
        
      </div>

      <div className="pb-4" onClick = {() => {setSelectedCoin("Opincur"), setshowads(false)}}>
        <Card>
          <div className="flex flex-box w-full p-2">
            <CardContent>
              <div>
                <Avatar>
                  <AvatarImage
                    src="https://opincur.com/img/logo.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            </CardContent>
        
            <div className="">
              <CardContent>Opincur/USDT</CardContent>
            </div>
        
            <div className="absolute right-0">
              <div className="grid grid-box">
                <CardContent>Start Trading</CardContent>
        
                <CardContent>
                  <div className="flex flex-box">
                    2% fee
                    <TrendingUp />
                  </div>
                </CardContent>
              </div>
            </div>
          </div>
        </Card>

        
        
      </div>

      <div className="pb-4" onClick = {() => {setSelectedCoin("star"), setshowads(false)}}>
        <Card>
          <div className="flex flex-box w-full p-2">
            <CardContent>
              <div>
                <Avatar>
                  <AvatarImage
                    src="https://miro.medium.com/v2/resize:fit:394/1*dC5IusZmsnRzCxEVdN5Z_A.jpeg"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            </CardContent>
        
            <div className="">
              <CardContent>Star Network/USDT</CardContent>
            </div>
        
            <div className="absolute right-0">
              <div className="grid grid-box">
                <CardContent>Start Trading</CardContent>
        
                <CardContent>
                  <div className="flex flex-box">
                    2% fee
                    <TrendingUp />
                  </div>
                </CardContent>
              </div>
            </div>
          </div>
        </Card>
        
      </div>

      <div className="pb-4" onClick = {() => {setSelectedCoin("socio"), setshowads(false)}}>
        <Card>
          <div className="flex flex-box w-full p-2">
            <CardContent>
              <div>
                <Avatar>
                  <AvatarImage
                    src="https://kalajtomdzamxvkl.public.blob.vercel-storage.com/logo2-6X2L1QaE3Zc3GrRsCHvW0JY0kcA7bx.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            </CardContent>
        
            <div className="">
              <CardContent>Socio</CardContent>
            </div>
        
            <div className="absolute right-0">
              <div className="grid grid-box">
                <CardContent>Start Trading</CardContent>
        
                <CardContent>
                  <div className="flex flex-box">
                    2% fee
                    <TrendingUp />
                  </div>
                </CardContent>
              </div>
            </div>
          </div>
        </Card>
        
      </div>
    </div>
    )
    
      
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
