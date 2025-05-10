"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { acceptTrade, confirmbuyer, confirmseen, getadstransactions, gettraderequests, gettraderequestsinfo } from "@/functions/user";
import { Clock } from "lucide-react";
import { sendtest } from "@/functions/blockchain/wallet.utils";

export default function PendingTrades({ email, id }: { email: string, id: string }) {
  const [show, setShow] = useState(false);
  const [tradeid, settradeid] = useState<string>("");
  const [status, setstatus] = useState<string>("");
  const [transStatus,  setTransStatus] = useState<string>("");
  const [merchantid, setmerchantid] = useState<string>("");
  const [customerconfirm, setcustomerconfirm] = useState<string>("");
  const [merchantconfirm, setMerchantconfirm] = useState<string>("");
  const [pendingTrades, setPendingTrades] = useState<any>([]); // State to store pending trades
  const [selectedType, setSelectedType] = useState<string>(""); // State to store selected trade type
  const [loading, setLoading] = useState<boolean>(true); // Loading state

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
        if(info.success){
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
        toast("Trade accepted successfully.");
        // Optionally, refresh the pending trades list
      } else {
        toast(response.message || "Failed to accept trade.");
      }
      setShow(true);
    } catch (error) {
      console.error("Error accepting trade:", error);
      toast.error("An unexpected error occurred.");
    }
  }
  const handlesent = async (tradeId: string) => {
    try {
      const response = await confirmbuyer(tradeId);
      if (response?.success) {
        fetchTransactionDetails(tradeId);
      } else {
        toast("An unexpected error occured")
      }
    } catch (error) {

    }
  }
  const handlerecieved = async(tradeId: string) => {
    try{
      const response = await confirmseen(tradeId);
      if(response?.success){
        fetchTransactionDetails(tradeId);
      } else {
        toast("an unexpected error occured")
      }
    }catch (error){
      console.log(error)
    }
  }

  const handleView = async (type: string, Id: string) => {
    setShow(true);
    setSelectedType(type)
    fetchTransactionDetails(Id);
  }

  useEffect(() => {
    fetchPendingTrades();
  }, [email]);

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
  
        if (trans?.status !== "pending") {
          clearInterval(interval); // Stop polling once status is no longer pending
        }
      }
    }, 5000); // Every 5 seconds
  
    return () => clearInterval(interval); // Cleanup when component unmounts or tradeid changes
  }, [show, tradeid]);
  


  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Pending Trades</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading pending trades...</p>
      ) : pendingTrades.length > 0 ? (
        <>
          <table className={show ? "hidden" : "min-w-full bg-white border border-gray-300 rounded-lg shadow-md"}>
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4 text-left">Trade ID</th>
                <th className="p-4 text-left">Amount</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left " colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingTrades.map((trade: any) => (
                <tr key={trade.id} className="border-b">
                  <td className="p-4">{trade.id}</td>
                  <td className="p-4">{trade.amount}</td>
                  <td className="p-4">{trade.price}</td>
                  <td className={trade.status === "pending" ? "p-4 text-yellow-500" : "pbb-4"}>{trade.status}</td>
                  <td className="p-4">
                    {
                      id === trade.userId ? (<Button className="bg-blue-500 text-white" onClick={() => {handleView(trade.type, trade.id); settradeid(trade.id), setstatus(trade.status)}}>View</Button>) :
                        (
                          <Button
                            className="bg-blue-500 text-white"
                            onClick={() => { {trade.status === "Accepted"? ( handleView(trade.type, trade.id) ) : (accept(trade.id)) }settradeid(trade.id) }}
                          >
                            {trade.status === "Accepted" ? "View" :"Accept and View"}
                          </Button>)

                    }

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
          <div className={show ? "max-w-md mx-auto p-6 bg-yellow-50 border border-yellow-300 shadow-lg rounded-lg text-center" : "hidden"}>
            <div className="flex justify-center mb-4">
              <Clock className="text-yellow-500 w-16 h-16" />
            </div>
            <h1 className="text-2xl font-bold text-yellow-700 mb-2">Send Atok to user wallet Address</h1>
            <p className="text-gray-600 mb-4">
              To complete the trade, please send the agreed amount of Atok to the user's wallet address. Once the payment is confirmed, the trade will be finalized.
            </p>
            <span className="text-gray-600 mb-4">User Wallet Address: <span className="font-bold">{pendingTrades[0].walletAddress}</span></span><br />
            <span className="text-gray-600 mb-4">Amount to send: <span className="font-bold">{pendingTrades[0].amount}</span></span><br />
            <span className="text-gray-600 mb-4">Transaction ID: <span className="font-bold">{pendingTrades[0].id}</span></span> <br />
            <span className="text-gray-600 mb-4">Order Time: <span className="font-bold">{new Date(pendingTrades[0].createdAt).toLocaleString()}</span></span><br />
            <span className="text-gray-600 mb-4">Please ensure to double-check the wallet address before sending.</span>
            <p className="text-gray-600 mb-4">If you have any questions, feel free to reach out to the user.</p>
            <p className="text-gray-600 mb-4">Thank you for using our trading platform!</p>
            <p className="text-gray-600 mb-4">For any issues, please contact support.</p>

            <div className="w-full">

              <div className="grid grid-box w-full gap-4">
              {status != "pending" ? (selectedType === "buy" && merchantid != id ? (
                  <Button className="w-full text-green-300" disabled={merchantconfirm === "pending" ? true : false} onClick={() => handlerecieved(tradeid)}>I have seen coin</Button>
                  ) :
                  ( <Button className="w-full text-green-300" onClick={() => handlesent(tradeid)}>
                      I have Sent The Coin
                    </Button> 
                    )) : (<Button className="w-full text-green-300" onClick={() => fetchTransactionDetails(tradeid)}>
                     Waiting for merchant to accpet trade
                    </Button> )}
                
                <Button className="w-full text-blue-300">
                  Order dispute
                </Button>
              </div>




            </div>

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

