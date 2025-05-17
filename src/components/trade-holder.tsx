"use client";
/* eslint-disable */
import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { acceptTrade, completetrans, confirmbuyer, confirmseen, createdispute, getadstransactions, gettraderequests, gettraderequestsinfo } from "@/functions/user";
import { Clock } from "lucide-react";
import { sendusdttrade } from "@/functions/blockchain/wallet.utils";
import { PutBlobResult } from "@vercel/blob";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogContent, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
//import { sendtest } from "@/functions/blockchain/wallet.utils";

export default function PendingTrades({ email, id }: { email: string, id: string }) {
  const[coin, setCoin] = useState<string>("")
  const [Price, setPrice] = useState<string>("");
  const [Amount, setAmount] = useState<string>("");
  const [userid, setuserId] = useState<string>("")
  const [show, setShow] = useState(false);
  const [ShowDisputeModal, setShowDisputeModal] = useState<boolean>(false);
  const [disputeReason, setDisputeReason] = useState<string>("")
  const [tradeid, settradeid] = useState<string>("");
  const [status, setstatus] = useState<string>("");
  const [transStatus, setTransStatus] = useState<string>("");
  const [merchantid, setmerchantid] = useState<string>("");
  const [customerconfirm, setcustomerconfirm] = useState<string>("");
  const [merchantconfirm, setMerchantconfirm] = useState<string>("");
  const [pendingTrades, setPendingTrades] = useState<any>([]); // State to store pending trades
  const [selectedType, setSelectedType] = useState<string>(""); // State to store selected trade type
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [receipt, setreceipt] = useState<PutBlobResult| null>(null);
  const [url, seturl] = useState<string>("null");
  const imgreceipt = useRef<HTMLInputElement>(null);

  // Fetch pending trades
  const fetchPendingTrades = async () => {
    try {
      setLoading(true);
      const response = await gettraderequests(email); // Fetch pending trades from the API
      if (response.success) {
        setPendingTrades(response.traderequests); // Assuming the API returns a `trades` array
      } else {
        toast(response.message || "Failed to fetch pending trades.");
      }
    } catch (error) {
      console.error("Error fetching pending trades:", error);
      toast("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };
  const fetchTransactionDetails = async (id: string) => {
    try {
      const response = await getadstransactions(id);

      const info = await gettraderequestsinfo(id)

      if (response?.success) {
        const trans = response.gettrans
        const merchantID = trans?.merchantID || "";
        setmerchantid(merchantID)
        setTransStatus(trans?.status as string)
        setcustomerconfirm(trans?.customerconfirm as string)
        setMerchantconfirm(trans?.merchantconfirm as string);// Update merchant info
        setPrice(trans?.price as string);
        if (info.success) {
          const moreinfo = info.info
          setstatus(moreinfo?.status as string)
        }
        toast("Merchant info updated!");
      } else {
        toast(response?.message || "Failed to fetch transaction details.");
      }
    } catch (error) {
      console.log("Error fetching transaction details:", error);
      toast("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const accept = async (tradeId: string) => {
    try {
      const response = await acceptTrade(tradeId); // Call the API to accept the trade

      if (response.success) {
        toast.success("Trade accepted successfully.");
        // Optionally, refresh the pending trades list
      } else {
        toast.success(response.message || "Failed to accept trade.");
      }
      setShow(true);
    } catch (error) {
      console.error("Error accepting trade:", error);
      toast.error("An unexpected error occurred.");
    }
  }
  const handlesent = async (tradeId: string) => {
    try {
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
            setreceipt(receiptdetails);

      if (!receipt) {
        throw new Error("Receipt is null. Please upload a valid receipt.");
      }
      const response = await confirmbuyer(tradeId, receipt.url);
      if (response?.success) {
        fetchTransactionDetails(tradeId);
        toast.success("successfully updated merchant status plaese wait for the user to check")
      } else {
        toast.error("An unexpected error occured")
      }
    } catch (error: any) {
      toast("Error message", error)
    }
  }
  const handlerecieved = async (tradeId: string) => {
    try {
      const response = await confirmseen(tradeId);
      if (response?.success) {
        fetchTransactionDetails(tradeId);
        const Op = Number(Price) * Number(Amount);
        if (selectedType !== "buy") {
          const send = await sendusdttrade(Op.toString(), userid, merchantid);
          if(!send.success){
            toast.error(send.error);
          }else{
            toast.success("usdt transferred");
            const complete = await completetrans(tradeId);
            if(complete?.success){
              toast.success("transaction completed");
            }else{
              toast.error("an error was encountered")
            }
          }
        } else {
          const send = await sendusdttrade(Op.toString(), merchantid, userid)
        }


      } else {
        toast.error("an unexpected error occured")
      }
    } catch (error: any) {
      toast.error(error)
    }
  }

  const handleView = async (type: string, Id: string, stat: string, amount: string, userid: string, coin: string) => {
    setShow(true);
    setSelectedType(type)
    fetchTransactionDetails(Id);
    settradeid(Id);
    setstatus(stat);
    setAmount(amount)
    setuserId(userid)
    setCoin(coin);
  }

  const handledispute = async (tradeid: string, reason: string) => {
    const request = await createdispute(id, email, tradeid, reason);
  }
  const handleDisputeSubmit = async () => {
    if (!tradeid) return;

    try {
      await handledispute(tradeid, disputeReason);
      setShowDisputeModal(false); // Close the modal after submission
      setDisputeReason(""); // Clear the rejection reason
    } catch (error) {
      console.error("Error submitting rejection reason:", error);
    }
  };
  useEffect(() => {
    fetchPendingTrades();
  }, []);

  useEffect(() => {
    if (!show || !tradeid) return;

    const interval = setInterval(async () => {
      const response = await getadstransactions(tradeid);
      if (response?.success) {
        const trans = response.gettrans;

        setmerchantid(trans?.merchantID || "");
        setcustomerconfirm(trans?.customerconfirm as string);
        setMerchantconfirm(trans?.merchantconfirm as string);
        setTransStatus(trans?.status || "");
        seturl(trans?.receipt || "");


        if (merchantconfirm === "sent" || customerconfirm === "sent") {
          clearInterval(interval); // Stop polling once status is no longer pending
        }

      }
    }, 5000); // Every 5 seconds

    return () => clearInterval(interval); // Cleanup when component unmounts or tradeid changes
  }, [show, tradeid]);


  // useEffect(() => {
  //   if (!show || !tradeid) return;

  //   const interval = setInterval(async () => {
  //     const response = await getadstransactions(tradeid);
  //     if (response?.success) {
  //       const trans = response.gettrans;

  //       if (trans?.status !== "pending") {
  //         clearInterval(interval); // Stop polling once status is no longer pending
  //       }

  //     }
  //   }, 5000); // Every 5 seconds

  //   return () => clearInterval(interval); // Cleanup when component unmounts or tradeid changes
  // }, [show, tradeid]);


  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Pending Trades</h1>
      <h1>{transStatus} {customerconfirm}</h1>
      {/* Rejection Modal */}
            {ShowDisputeModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                  <h2 className="text-xl font-bold mb-4">Reject KYC Request</h2>
                  <p className="mb-4">
                    Please provide a reason for the on Order Id <strong>{tradeid}</strong>.
                  </p>
                  <Input
                    type="text"
                    placeholder="Enter rejection reason"
                    value={disputeReason}
                    onChange={(e) => setDisputeReason(e.target.value)}
                    className="w-full mb-4"
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
                      onClick={() => handleDisputeSubmit}
                      className="bg-red-500 text-white px-4 py-2 rounded-md"
                      disabled={!disputeReason.trim()}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
            )}

      {loading ? (
        <p className="text-center text-gray-500">Loading pending trades...</p>
      ) : pendingTrades.length > 0 ? (
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
              {pendingTrades.map((trade: any) => (
                <tr key={trade.id} className="border-b">
                  <td className="p-4">{trade.id}</td>
                  <td className="p-4">{trade.amount}</td>
                  <td className="p-4">{trade.price}</td>
                  <td className={trade.status === "pending" ? "p-4 text-yellow-500" : "p-4"}>{trade.status}</td>
                  <td className="p-4">
                    {id === trade.userId ? (
                      <Button
                        className="bg-blue-500 text-white"
                        onClick={() => handleView(trade.type, trade.id, trade.status, trade.amount, trade.userId, trade.coin)}
                      >
                        View
                      </Button>
                    ) : (
                      <Button
                        className="bg-blue-500 text-white"
                        onClick={() => {
                          trade.status === "Accepted"
                            ? handleView(trade.type, trade.id, trade.status, trade.amount, trade.userId, trade.coin)
                            : accept(trade.id);
                          settradeid(trade.id);
                          handleView(trade.type, trade.id, trade.status, trade.amount, trade.userId, trade.coin);
                        }}
                      >
                        {trade.status === "Accepted" ? "View" : "Accept and View"}
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

          {/* Mobile View */}
          <div className={`sm:hidden ${show ? "hidden" : ""}`}>
            {pendingTrades.map((trade: any) => (
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
                      onClick={() => handleView(trade.type, trade.id, trade.status, trade.amount, trade.userId, trade.coin)}
                    >
                      View
                    </Button>
                  ) : (
                    <Button
                      className="light:bg-blue-500 dark:text-white"
                      onClick={() => {
                        trade.status === "Accepted"
                          ? handleView(trade.type, trade.id, trade.status, trade.amount, trade.userId, trade.coin)
                          : accept(trade.id);
                        settradeid(trade.id);
                      }}
                    >
                      {trade.status === "Accepted" ? "View" : "Accept and View"}
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

          <div className={show ? "max-w-md mx-auto p-6 bg-yellow-50 border border-yellow-300 dark:bg-[#1a1a1a] dark:border dark:border-[#333333] shadow-lg rounded-lg text-center  dark:text-white text-gray-600" : "hidden"}>
            {/* Dialog Content */}
            <div className="flex justify-center mb-4">
              <Clock className="text-yellow-500 w-16 h-16" />
            </div>
            {selectedType === "buy" ?
            merchantid === id ? (
              <div>
                <h1 className="text-2xl font-bold text-yellow-700 mb-2">Send {coin} to user wallet Address</h1>
                <p className="mb-4">
                  To complete the trade, please send the agreed amount of {coin} to the user&apos;s wallet address. Once the payment is confirmed, the trade will be finalized.
                </p>
                <span className="mb-4">User Wallet Address: <span className="font-bold">{pendingTrades[0].walletAddress}</span></span><br />
                <span className="mb-4">Amount to send: <span className="font-bold">{pendingTrades[0].amount}</span></span><br />
                <span className="mb-4">Transaction ID: <span className="font-bold">{pendingTrades[0].id}</span></span> <br />
                <span className="mb-4">Order Time: <span className="font-bold">{new Date(pendingTrades[0].createdAt).toLocaleString()}</span></span><br />
                <span className="mb-4">Please ensure to double-check the wallet address before sending.</span>
                <p className="mb-4">If you have any questions, feel free to reach out to the user.</p>
                <p className="mb-4">Thank you for using our trading platform!</p>
                <p className="mb-4">For any issues, please contact support.</p>
              <input
                    id="img"
                    name="img"
                    type="file"
                    accept="image/*"
                    className={merchantconfirm === "sent"? "hidden" :"mt-1 block w-full"}
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
                    >
                      I have Sent The Coin
                    </Button>
                ) : (
                  <Button
                    className="w-full text-green-300"
                    onClick={() => fetchTransactionDetails(tradeid)}
                  >
                    Waiting for merchant to accept trade
                  </Button>
                )}
                {merchantconfirm || customerconfirm ?<Button className="w-full dark:bg-gray-400 text-blue-300" onClick={handleDisputeSubmit}>
                  Order dispute
                </Button>: <Button className="w-full dark:bg-gray-400 text-blue-300">
                 Cancel
                </Button>}
              </div>
            </div>
              </div>
              
            ) : (

            <div>
        <h1 className="text-2xl font-bold text-yellow-700 mb-2">{coin} will be sent to your wallet address</h1>
                <p className="mb-4">
                  To complete the trade, please confirm that agreed amount of {coin} has been sent to your wallet. Once the Deposit is confirmed, the trade will be finalized.
                </p>
                <span className="mb-4">User Wallet Address: <span className="font-bold">{pendingTrades[0].walletAddress}</span></span><br />
                <span className="mb-4">Amount sent: <span className="font-bold">{pendingTrades[0].amount}</span></span><br />
                <span className="mb-4">Transaction ID: <span className="font-bold">{pendingTrades[0].id}</span></span> <br />
                <span className="mb-4">Order Time: <span className="font-bold">{new Date(pendingTrades[0].createdAt).toLocaleString()}</span></span><br />
                <span className="mb-4">Please ensure to double-check the amount before releasing your USDT.</span>
                <p className="mb-4">If you have any questions, feel free to reach out to the merchant.</p>
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
                    onClick={() => fetchTransactionDetails(tradeid)}
                  >
                    Waiting for merchant to accept trade
                  </Button>
                )}
                {merchantconfirm  || customerconfirm ? <Button className="w-full dark:bg-gray-400 text-blue-300" onClick={() => cancelTrade(id)}>
                  Cancel
                </Button>  : <Button className="w-full dark:bg-gray-400 text-blue-300" onClick={handleDisputeSubmit}>
                  Order dispute
                </Button>}
                
              </div>
            </div>
                
            </div>
            )
          : merchantid === id ? (
            <div>
        <h1 className="text-2xl font-bold text-yellow-700 mb-2">{coin} will be sent to your wallet address</h1>
                <p className="mb-4">
                  To complete the trade, please confirm that agreed amount of {coin} has been sent to your wallet. Once the Deposit is confirmed, the trade will be finalized.
                </p>
                <span className="mb-4">User Wallet Address: <span className="font-bold">{pendingTrades[0].walletAddress}</span></span><br />
                <span className="mb-4">Amount sent: <span className="font-bold">{pendingTrades[0].amount}</span></span><br />
                <span className="mb-4">Transaction ID: <span className="font-bold">{pendingTrades[0].id}</span></span> <br />
                <span className="mb-4">Order Time: <span className="font-bold">{new Date(pendingTrades[0].createdAt).toLocaleString()}</span></span><br />
                <span className="mb-4">Please ensure to double-check the amount before releasing your USDT.</span>
                <p className="mb-4">If you have any questions, feel free to reach out to the merchant.</p>
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
                    onClick={() => fetchTransactionDetails(tradeid)}
                  >
                    Waiting for merchant to accept trade
                  </Button>
                )}
                {merchantconfirm || customerconfirm === "sent" ? <Button className="w-full dark:bg-gray-400 text-blue-300">
                  Order dispute
                </Button> : <Button className="w-full dark:bg-gray-400 text-blue-300">
                  Cancel
                </Button>}
              </div>
            </div>
                
            </div>              
            ) : (
                
              <div>
                <h1 className="text-2xl font-bold text-yellow-700 mb-2">Send {coin} to user wallet Address</h1>
                <p className="mb-4">
                  To complete the trade, please send the agreed amount of {coin} to the user&apos;s wallet address. Once the payment is confirmed, the trade will be finalized.
                </p>
                <span className="mb-4">User Wallet Address: <span className="font-bold">{pendingTrades[0].walletAddress}</span></span><br />
                <span className="mb-4">Amount to send: <span className="font-bold">{pendingTrades[0].amount}</span></span><br />
                <span className="mb-4">Transaction ID: <span className="font-bold">{pendingTrades[0].id}</span></span> <br />
                <span className="mb-4">Order Time: <span className="font-bold">{new Date(pendingTrades[0].createdAt).toLocaleString()}</span></span><br />
                <span className="mb-4">Please ensure to double-check the wallet address before sending.</span>
                <p className="mb-4">If you have any questions, feel free to reach out to the user.</p>
                <p className="mb-4">Thank you for using our trading platform!</p>
                <p className="mb-4">For any issues, please contact support.</p>
              <input
                    id="img"
                    name="img"
                    type="file"
                    accept="image/*"
                    className={customerconfirm === "sent" ? "hidden":"mt-1 block w-full"}
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
                    </Button> :<Button
                      className="w-full dark:bg-gray-400 light:text-green-300"
                      onClick={() => handlesent(tradeid)}
                    >
                      I have Sent The Coin
                    </Button>
                ) : (
                  <Button
                    className="w-full text-green-300"
                    onClick={() => fetchTransactionDetails(tradeid)}
                  >
                    Waiting for merchant to accept trade
                  </Button>
                )}
                <Button className="w-full dark:bg-gray-400 text-blue-300">
                  Order dispute
                </Button>
              </div>
            </div>
              </div>

            
            )
          }

            
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">No pending trades found.</p>
      )}
    </div>
  );
}

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
      // Optionally, refresh the pending trades list
    } else {
      toast.error(data.message || "Failed to cancel trade.");
    }
  } catch (error) {
    console.error("Error canceling trade:", error);
    toast.error("An unexpected error occurred.");
  }
};

