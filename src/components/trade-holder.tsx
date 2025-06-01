"use client";
/* eslint-disable */
import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { acceptTrade, completetrans, confirmbuyer, confirmseen, createdispute, getadstransactions, gettraderequestsinfo } from "@/functions/user";
import { BadgeCheck, Clock, Loader2 } from "lucide-react";
import { checkTransactionByHash, sendusdttrade } from "@/functions/blockchain/wallet.utils";
import { PutBlobResult } from "@vercel/blob";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogContent, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";

export default function PendingTrades({ email, id, trades, tradeinfo, adstrans }: { email: string, id: string, trades: any[], tradeinfo: any, adstrans: any[] }) {
  const [coin, setCoin] = useState<string>("");
  const [Price, setPrice] = useState<string>("");
  const [Amount, setAmount] = useState<string>("");
  const [userid, setuserId] = useState<string>("");
  const [show, setShow] = useState(false);
  const [ShowDisputeModal, setShowDisputeModal] = useState<boolean>(false);
  const [disputeReason, setDisputeReason] = useState<string>(""); // transaction hash
  const [senderwalletaddress, setSenderWalletAddress] = useState<string>("");
  const [recieverwalletaddress, setReceiverWalletAddress] = useState<string>("");
  const [AmountSent, setAmountSent] = useState<string>("");
  const [tradeid, settradeid] = useState<string>("");
  const [status, setstatus] = useState<string>("");
  const [transStatus, setTransStatus] = useState<string>("");
  const [merchantid, setmerchantid] = useState<string>("");
  const [Wallet, setWallet] = useState<string>("");
  const [date, setDate] = useState<Date>();
  const [customerconfirm, setcustomerconfirm] = useState<string>("");
  const [merchantconfirm, setMerchantconfirm] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [url, seturl] = useState<string>("null");
  const [viewLoading, setViewLoading] = useState<boolean>(false); // For loading spinner on view
  const [seenLoading, setSeenLoading] = useState(false); // <-- Add this state
  const [sendLoading, setSendLoading] = useState(false); // <-- Add this state
  const imgreceipt = useRef<HTMLInputElement>(null);
  const merchantconfirmRef = useRef(merchantconfirm);
  const customerconfirmRef = useRef(customerconfirm);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const router = useRouter();

  const pendingtrades = trades || [];//Array.isArray(trades) ? trades : [];
  const tradeInfo = tradeinfo || [];
  const adstransactions = adstrans || [];
  // setTransStatus(trans?.status as string);
  // setcustomerconfirm(trans?.customerconfirm as string);
  // setMerchantconfirm(trans?.merchantconfirm as string);
  // setPrice(trans?.price as string);
  // setWallet(trans?.walletAddress as string);
  // seturl(trans?.receipt || "");
  // setDate(trans?.createdAt);
   // Calculate paginated trades
  const totalPages = Math.ceil(pendingtrades.length / itemsPerPage);
  const paginatedTrades = pendingtrades.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  let filteredData: any[] = [];
  let adstransfiltered:any[]= [];
  const accept = async (tradeId: string) => {
    try {
      const response = await acceptTrade(tradeId);
      if (response.success) {
        toast.success("Trade accepted successfully.");
      } else {
        toast.success(response.message || "Failed to accept trade.");
      }
      setShow(true);
    } catch (error) {
      console.error("Error accepting trade:", error);
      toast.error("An unexpected error occurred.");
    }
  };

  const handlesent = async (tradeId: string) => {
    try {
      setSendLoading(true); // Start loading
      if (!imgreceipt.current?.files) {
        throw new Error("no image selected");
      }
      const details = imgreceipt.current.files[0];
      const detailsresponse = await fetch(`/api/kyc?filename=${details.name}`, {
        method: "POST",
        body: details,
      });
      if (!detailsresponse.ok) {
        throw new Error("Failed to upload image");
      }
      const receiptdetails = (await detailsresponse.json()) as PutBlobResult;

      if (!receiptdetails.url) {
        throw new Error("Receipt is null. Please upload a valid receipt.");
      }
      const response = await confirmbuyer(tradeId, receiptdetails.url, email, Amount, coin);
      if (response?.success) {
      router.refresh()
        toast.success("successfully updated merchant status plaese wait for the user to check");
        setMerchantconfirm("sent")
      } else {
        toast.error("An unexpected error occured");
      }
    } catch (error: any) {
      toast("Error message", error);
    } finally {
      setSendLoading(false); // Stop loading
    }
  };

  const handlerecieved = async (tradeId: string) => {
    try {
      setSeenLoading(true); // Start loading
      const response = await confirmseen(tradeId, Amount, Price, selectedType, id, merchantid);
      if (response?.success) {toast.success("Usdt Transfer Successfull")} else {
        toast.error("an unexpected error occured");
      }
    } catch (error: any) {
      toast.error(error);
    } finally {
      setSeenLoading(false); // Stop loading
    }
  };

  // Add loading spinner for viewing trade details
  const handleView = async (type: string, Id: string, stat: string, amount: string, userid: string, coin: string, merchantID: string, Date: Date, wallet: string) => {
    setViewLoading(true);
    setShow(true);
    setSelectedType(type);
    settradeid(Id);
    setstatus(stat);
    setAmount(amount);
    setuserId(userid);
    setCoin(coin);
    setmerchantid(merchantID);
    setDate(Date);
    setWallet(wallet)
     filteredData = tradeInfo.filter((item: any) => item.id === Id)
    adstransfiltered = adstransactions.filter(item => item.orderid === Id)
    try{
      console.log(Id)
      const trans = adstransactions.filter((item) => item.orderId === Id);
      console.log(adstransactions)
    if (trans) {
      // setTransStatus(trans.status as string);
      // setcustomerconfirm(trans.customerconfirm as string);
      // setMerchantconfirm(trans.merchantconfirm as string);
      // setPrice(trans.price as string);
      // seturl(trans.receipt || "");
      // setDate(trans.createdAt);
      trans.map((item: any
      )=> (
      console.log(item.merchantconfirm),
      setTransStatus(item.status as string),
      setcustomerconfirm(item.customerconfirm as string),
      setMerchantconfirm(item.merchantconfirm as string),
      setPrice(item.price as string),
      seturl(item.receipt || ""),
      setDate(item.createdAt)
      ))
    }else{
      toast.error("Trade information not found.");
    }}catch (error) {
      console.error("Error fetching trade info:", error);
      toast.error("An unexpected error occurred while fetching trade info.");
    }finally{
      setViewLoading(false);
    }
    console.log("merchant ID is", merchantID);
    console.log("this user id is:", id );
   // setViewLoading(false);
  };
  const BackView = async() => {
    setShow(false);
    setSelectedType("");
    settradeid("");
    setstatus("");
    setAmount("");
    setuserId("");
    setCoin("");
  }

  const handledispute = () => {
    setShowDisputeModal(true);
    //await createdispute(id, email, tradeid, reason);
  };

  const handleDisputeSubmit = async () => {
    if (!tradeid) return;

    try {
      const response = await checkTransactionByHash(disputeReason, senderwalletaddress, recieverwalletaddress, AmountSent);
      if(response?.success){
      
      setDisputeReason("");
      toast.success(response.message);
      }else{
        toast.error(response?.message || "Failed to submit dispute request.");
      }
      
    } catch (error) {
      console.error("Error submitting rejection reason:", error);
    }
  };

  useEffect(() => {
    merchantconfirmRef.current = merchantconfirm;
    customerconfirmRef.current = customerconfirm;
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, [merchantconfirm, customerconfirm]);

  // Function to cancel a trade
  const cancelTrade = async (tradeId: string) => {
    try {
      const response = await fetch(`/api/trades/cancel`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tradeId }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Trade canceled successfully.");
        router.refresh();
      } else {
        toast.error(data.message || "Failed to cancel trade.");
      }
    } catch (error) {
      console.error("Error canceling trade:", error);
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Pending Trades{merchantid}</h1>
      {/* Rejection Modal */}
      {ShowDisputeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="dark:bg-gray-500 light:bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Dispute Request</h2>
            <p className="mb-4">
              Please provide the transaction hash for the coin you transferred<br/>
              Trade ID:
               <strong>{tradeid}</strong>.
            </p>
            <p className="mb-2">Transation Hash</p>
            <Input
              type="text"
              placeholder="Enter transaction hash"
              value={disputeReason}
              onChange={(e) => setDisputeReason(e.target.value)}
              className="w-full mb-4 dark:bg-gray-200 dark:text-black"
            />
            <p className="mb-2">Sender's Wallet Address</p>
            <Input
              type="text"
              placeholder="Enter the wallet address you sent the coin from"
              value={senderwalletaddress}
              onChange={(e) => setSenderWalletAddress(e.target.value)}
              className="w-full mb-4 dark:bg-gray-200 dark:text-black"
            />
             <p className="mb-2">Reciever's Wallet Address</p>
            <Input
              type="text"
              placeholder="Enter the wallet address you sent the coin to"
              value={recieverwalletaddress}
              onChange={(e) => setReceiverWalletAddress(e.target.value)}
              className="w-full mb-4 dark:bg-gray-200 dark:text-black"
            />
            <p className="mb-2 dark:text-white">Amount Sent</p>
            <Input
              type="text"
              placeholder="Enter the amount of coin you sent"
              value={AmountSent}
              onChange={(e) => setAmountSent(e.target.value)}
              className="w-full mb-4 dark:bg-gray-200 dark:text-black"
            />
            <div className="flex justify-end gap-4">
              <Button
                onClick={() => {
                  setShowDisputeModal(false);
                  setDisputeReason("");
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDisputeSubmit}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                disabled={!disputeReason.trim() || !senderwalletaddress.trim() || !recieverwalletaddress.trim() || !AmountSent.trim()}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-center text-gray-500">Loading pending trades...</p>
      ) : paginatedTrades.length > 0 ? (
        <>
          {/* Desktop Table */}
          <table className={`min-w-full lightbg-white border border-gray-300 rounded-lg shadow-md ${show ? "hidden" : "hidden sm:table"}`}>
            <thead>
              <tr className="light:bg-gray-100">
                <th className="p-4 text-left">Trade ID</th>
                <th className="p-4 text-left">Amount</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left" colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTrades.map((trade: any) => (
                <tr key={trade.id} className="border-b">
                  <td className="p-4">{trade.id}</td>
                  <td className="p-4">{trade.amount}</td>
                  <td className="p-4">{trade.price}</td>
                  <td className={trade.status === "pending" ? "p-4 text-yellow-500" : "p-4"}>{trade.status}</td>
                  <td className="p-4">
                    {id === trade.userId ? (
                      <Button
                        className="bg-blue-500 text-white"
                        onClick={() => handleView(trade.type, trade.id, trade.status, trade.amount, trade.userId, trade.coin, trade.merchantId, trade.createdAt, trade.walletAddress)}
                        disabled={viewLoading}
                      >
                        {viewLoading ? (
                          <span className="flex items-center gap-2">
                            <Loader2 className="animate-spin w-4 h-4" />
                            Loading...
                          </span>
                        ) : (
                          "View"
                        )}
                      </Button>
                    ) : (
                      <Button
                        className="bg-blue-500 text-white"
                        onClick={() => {
                          if (trade.status === "Accepted") {
                            handleView(trade.type, trade.id, trade.status, trade.amount, trade.userId, trade.coin, trade.merchantId, trade.createdAt, trade.walletAddress);
                          } else {
                            accept(trade.id);
                            settradeid(trade.id);
                            handleView(trade.type, trade.id, trade.status, trade.amount, trade.userId, trade.coin, trade.merchantId, trade.createdAt, trade.walletAddress);
                            router.refresh();
                          }
                        }}
                        disabled={viewLoading}
                      >
                        {viewLoading ? (
                          <span className="flex items-center gap-2">
                            <Loader2 className="animate-spin w-4 h-4" />
                            Loading...
                          </span>
                        ) : (
                          trade.status === "Accepted" ? "View" : "Accept and View"
                        )}
                      </Button>
                    )}
                  </td>
                  <td className="p-4">
                    <Button
                      className="bg-red-500 text-white"
                      onClick={() => cancelTrade(trade.id)}
                    >
                      Cancel
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination Controls */}
          {pendingtrades.length > itemsPerPage && (
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

          {/* Mobile View */}
          <div className={`sm:hidden ${show ? "hidden" : ""}`}>
            {paginatedTrades.map((trade: any) => (
              <div key={trade.id} className="border-b border-gray-300 p-4 light:bg-white rounded-lg light:shadow-md mb-4">
                <p><strong>Trade ID:</strong> {trade.id}</p>
                <p><strong>Amount:</strong> {trade.amount}</p>
                <p><strong>Price:</strong> {trade.price}</p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={trade.status === "pending" ? "text-yellow-500" : ""}>
                    {trade.status}
                  </span>
                </p>
                <div className="flex justify-between mt-4">
                  {id === trade.userId ? (
                    <Button
                      className="light:bg-blue-500 dark:text-white"
                      onClick={() => handleView(trade.type, trade.id, trade.status, trade.amount, trade.userId, trade.coin, trade.merchantId, trade.createdAt, trade.walletAddress)}
                      disabled={viewLoading}
                    >
                      {viewLoading ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="animate-spin w-4 h-4" />
                          Loading...
                        </span>
                      ) : (
                        "View"
                      )}
                    </Button>
                  ) : (
                    <Button
                      className="light:bg-blue-500 dark:text-white"
                      onClick={() => {
                        if (trade.status === "Accepted") {
                          handleView(trade.type, trade.id, trade.status, trade.amount, trade.userId, trade.coin, trade.merchantId, trade.createdAt, trade.walletAddress);
                        } else {
                          accept(trade.id);
                          settradeid(trade.id);
                        }
                      }}
                      disabled={viewLoading}
                    >
                      {viewLoading ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="animate-spin w-4 h-4" />
                          Loading...
                        </span>
                      ) : (
                        trade.status === "Accepted" ? "View" : "Accept and View"
                      )}
                    </Button>
                  )}
                  <Button
                    className="bg-red-500 text-white"
                    onClick={() => cancelTrade(trade.id)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ))}
          </div>


          {/* Trade Details Section */}
          {viewLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="animate-spin w-12 h-12 text-blue-500 mb-4" />
              <span className="text-lg text-gray-600 dark:text-gray-300">Loading trade details...</span>
            </div>
          ) : (
            <div className={show ? "max-w-md mx-auto p-6 bg-yellow-50 border border-yellow-300 dark:bg-[#1a1a1a] dark:border dark:border-[#333333] shadow-lg rounded-lg text-center  dark:text-white text-gray-600" : "hidden"}>
            
            {transStatus === "completed" ? (
              <div>
                <div className="flex justify-center mb-4">
              <BadgeCheck className="text-green-500 w-16 h-16" />
            </div>
                <h1 className="text-2xl font-bold text-green-700 mb-2">Transaction completed</h1>
                <p className="mb-4">If you have any questions, feel free to reach out to the merchant.</p>
                <p className="mb-4">Thank you for using our trading platform!</p>
                <p className="mb-4">For any issues, please contact support.</p>
                <div className="w-full">
                  <div className="grid grid-box w-full gap-4">
                    <Button
                      className="w-full dark:bg-gray-400 light:text-green-300"
                      disabled={merchantconfirm === "pending"}
                      onClick={() => router.replace("/wallet")}
                    >
                      view Asset
                    </Button>
                    <Button className="w-full dark:bg-gray-400" onClick={()=>BackView()}>
                      Back
                    </Button>
                  </div>
                </div>
              </div>
            ) : selectedType === "buy" ? 
            merchantid === id ? (
              <div>
                <div className="flex justify-center mb-4">
              <Clock className="text-yellow-500 w-16 h-16" />
            </div>
                <h1 className="text-2xl font-bold text-yellow-700 mb-2">Send {coin} to user wallet Address</h1>
                <p className="mb-4">
                  To complete the trade, please send the agreed amount of {coin} to the user&apos;s wallet address. Once the payment is confirmed, the trade will be finalized.
                </p>
                <span className="mb-4">User Wallet Address: <span className="font-bold">{Wallet}</span></span><br />
                <span className="mb-4">Amount to send: <span className="font-bold">{Amount}</span></span><br />
                <span className="mb-4">Transaction ID: <span className="font-bold">{tradeid}</span></span> <br />
                <span className="mb-4">Order Time: <span className="font-bold">{new Date(date as Date).toLocaleString()}</span></span><br />
                <span className="mb-4">Please ensure to double-check the wallet address before sending.</span>
                <p className="mb-4">If you have any questions, feel free to reach out to the user.</p>
                <p className="mb-4">Thank you for using our trading platform!</p>
                <p className="mb-4">For any issues, please contact support.</p>
                <input
                  id="img"
                  name="img"
                  type="file"
                  accept="image/*"
                  className={merchantconfirm === "sent" ? "hidden" : "mt-1 block w-full"}
                  ref={imgreceipt}
                  required
                />
                <div className="w-full">
                  <div className="grid grid-box w-full gap-4">
                    {status !== "pending" ? (
                      merchantconfirm === "sent" ?
                        <Button
                          className="w-full dark:bg-gray-400 light:text-green-300 text-white"
                          disabled={true}
                        >
                          waiting for buyer to confirm the coin
                        </Button>
                        :
                        <Button
                          className="w-full dark:bg-gray-400 light:text-green-300"
                          onClick={() => handlesent(tradeid)}
                          disabled={sendLoading}
                        >
                          {sendLoading ? (
                            <span className="flex items-center gap-2">
                              <Loader2 className="animate-spin w-4 h-4" />
                              Sending...
                            </span>
                          ) : (
                            "I have Sent The Coin"
                          )}
                        </Button>
                    ) : (
                      <Button
                        className="w-full text-green-300"
                        onClick={() => router.refresh()}
                      >
                        Waiting for merchant to accept trade
                      </Button>
                    )}
                    {merchantconfirm || customerconfirm ? <Button className="w-full dark:bg-gray-400 text-blue-300" onClick={() => {setShowDisputeModal(true)}}>
                      Order dispute
                    </Button> : <Button className="w-full dark:bg-gray-400 text-blue-300">
                      Cancel
                    </Button>}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-center mb-4">
              <Clock className="text-yellow-500 w-16 h-16" />
            </div>
                <h1 className="text-2xl font-bold text-yellow-700 mb-2">{coin} will be sent to your wallet address</h1>
                <p className="mb-4">
                  To complete the trade, please confirm that agreed amount of {coin} has been sent to your wallet. Once the Deposit is confirmed, the trade will be finalized.
                </p>
                <span className="mb-4">User Wallet Address: <span className="font-bold">{Wallet}</span></span><br />
                <span className="mb-4">Amount sent: <span className="font-bold">{Amount}</span></span><br />
                <span className="mb-4">Transaction ID: <span className="font-bold">{tradeid}</span></span> <br />
                <span className="mb-4">Order Time: <span className="font-bold">{new Date(date as Date).toLocaleString()}</span></span><br />
                <span className="mb-4">Please ensure to double-check the amount before releasing your USDT.</span>
                <p className="mb-4">If you have any questions, feel free to reach out to the merchant.</p>
                <p className="mb-4">Thank you for using our trading platform!</p>
                <p className="mb-4">For any issues, please contact support.</p>
                <div className="mb-4">
                  <Dialog>
                    <DialogTrigger>
                      <img src={url || "null"} width={200} height={100} alt="Receipt" />
                    </DialogTrigger>
                    <DialogContent>
                      <img src={url || "null"} width={500} height={500} alt="Receipt" />
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="w-full">
                  <div className="grid grid-box w-full gap-4">
                    {status !== "pending" ? (
                      <Button
                        className="w-full dark:bg-gray-400 light:text-green-300"
                        disabled={merchantconfirm === "pending"}
                        onClick={() => handlerecieved(tradeid)}
                      >
                        {seenLoading ? (
                          <span className="flex items-center gap-2">
                            <Loader2 className="animate-spin w-4 h-4" />
                            Processing...
                          </span>
                        ) : (
                          "I have seen coin"
                        )}
                      </Button>
                    ) : (
                      <Button
                        className="w-full text-green-300"
                        onClick={() => router.refresh()}
                      >
                        Waiting for merchant to accept trade
                      </Button>
                    )}
                    {merchantconfirm || customerconfirm ? <Button className="w-full dark:bg-gray-400 text-blue-300" onClick={() => cancelTrade(id)}>
                      Cancel
                    </Button> : <Button className="w-full dark:bg-gray-400 text-blue-300" onClick={() =>handledispute}>
                      Order dispute
                    </Button>}
                  </div>
                </div>
              </div>
            )
              : merchantid === id ? (
                <div>
                  <div className="flex justify-center mb-4">
              <Clock className="text-yellow-500 w-16 h-16" />
            </div>
                  <h1 className="text-2xl font-bold text-yellow-700 mb-2">{coin} will be sent to your wallet address</h1>
                  <p className="mb-4">
                    To complete the trade, please confirm that agreed amount of {coin} has been sent to your wallet. Once the Deposit is confirmed, the trade will be finalized.
                  </p>
                  <span className="mb-4">User Wallet Address: <span className="font-bold">{Wallet}</span></span><br />
                  <span className="mb-4">Amount sent: <span className="font-bold">{Amount}</span></span><br />
                  <span className="mb-4">Transaction ID: <span className="font-bold">{tradeid}</span></span> <br />
                  <span className="mb-4">Order Time: <span className="font-bold">{new Date(date as Date).toLocaleString()}</span></span><br />
                  <span className="mb-4">Please ensure to double-check the amount before releasing your USDT.</span>
                  <p className="mb-4">If you have any questions, feel free to reach out to support.</p>
                  <p className="mb-4">Thank you for using our trading platform!</p>
                  <p className="mb-4">For any issues, please contact support.</p>
                  <div className="mb-4">
                    <Dialog>
                      <DialogTrigger>
                        <img src={url} width={200} height={100} alt="Receipt" />
                      </DialogTrigger>
                      <DialogContent>
                        <img src={url} width={500} height={500} alt="Receipt" />
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="w-full">
                    <div className="grid grid-box w-full gap-4">
                      {status !== "pending" ? (
                        <Button
                          className="w-full dark:bg-gray-400 light:text-green-300"
                          disabled={merchantconfirm === "pending"}
                          onClick={() => handlerecieved(tradeid)}
                        >
                          I have seen coin
                        </Button>
                      ) : (
                        <Button
                          className="w-full text-green-300"
                          onClick={() => router.refresh()}
                        >
                          Waiting for merchant to accept trade
                        </Button>
                      )}
                      {merchantconfirm || customerconfirm === "sent" ? <Button className="w-full dark:bg-gray-400 text-blue-300" onClick={() =>     setShowDisputeModal(true)}>
                        Order dispute
                      </Button> : <Button className="w-full dark:bg-gray-400 text-blue-300">
                        Cancel
                      </Button>}
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-center mb-4">
              <Clock className="text-yellow-500 w-16 h-16" />
            </div>
                  <h1 className="text-2xl font-bold text-yellow-700 mb-2">Send {coin} to user wallet Address</h1>
                  <p className="mb-4">
                    To complete the trade, please send the agreed amount of {coin} to the user&apos;s wallet address. Once the payment is confirmed, the trade will be finalized.
                  </p>
                  <span className="mb-4">User Wallet Address: <span className="font-bold">{Wallet}</span></span><br />
                  <span className="mb-4">Amount to send: <span className="font-bold">{Amount}</span></span><br />
                  <span className="mb-4">Transaction ID: <span className="font-bold">{tradeid}</span></span> <br />
                  <span className="mb-4">Order Time: <span className="font-bold">{new Date(date as Date).toLocaleString()}</span></span><br />
                  <span className="mb-4">Please ensure to double-check the wallet address before sending.</span>
                  <p className="mb-4">If you have any questions, feel free to reach out to the user.</p>
                  <p className="mb-4">Thank you for using our trading platform!</p>
                  <p className="mb-4">For any issues, please contact support.</p>
                  <input
                    id="img"
                    name="img"
                    type="file"
                    accept="image/*"
                    className={customerconfirm === "sent" ? "hidden" : "mt-1 block w-full"}
                    ref={imgreceipt}
                    required
                  />
                  <div className="w-full">
                    <div className="grid grid-box w-full gap-4">
                      {status !== "pending" ? (
                        customerconfirm === "sent" ? <Button
                          className="w-full dark:bg-gray-400 light:text-green-300"
                          disabled={true}
                        >
                          waiting for buyer to cnofirm the coin
                        </Button> : <Button
                          className="w-full dark:bg-gray-400 light:text-green-300"
                          onClick={() => handlesent(tradeid)}
                        >
                          I have Sent The Coin
                        </Button>
                      ) : (
                        <Button
                          className="w-full text-green-300"
                          onClick={() => router.refresh()}
                        >
                          Waiting for merchant to accept trade
                        </Button>
                      )}
                      <Button className="w-full dark:bg-gray-400 text-blue-300" onClick={() =>  setShowDisputeModal(true)}>
                        Order dispute
                      </Button>
                    </div>
                  </div>
                </div>
              )

            }
          </div>
          )}
        </>
      ) : (
        <p className="text-center text-gray-500">No pending trades found.</p>
      )}
    </div>
  );
}