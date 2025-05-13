"use server"
/* eslint-disable */
import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/utils";

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: { email: email },
    omit: {
      id: true,
      password: true
    }
    
  });

  return user;
}

export async function getUserByID(id: string) {
  const user = await prisma.user.findUnique({
    where: { id},
    omit: {
      password: true
    }
    
  });

  return user;
}

export async function updateUserProfile(email: string, value: string, field: "username" | "name") {
  try {
    // Fetch the user by email
    const user = await getUserByEmail(email);
    if (!user) {
      return { success: false, message: "User not found" };
    }

    // Validate the new value
    if (!value || value.trim() === "") {
      return { success: false, message: `${field} cannot be empty` };
    }

    // Check if the new value is already taken (only for username)
    if (field === "username") {
      const existingUser = await prisma.user.findUnique({
        where: { userName: value }, // Correct field name in the database
      });
      if (existingUser && existingUser.email !== email) {
        return { success: false, message: "Username is already taken" };
      }

      // Check if the new username is the same as the current username
      if (user.userName === value) {
        return { success: false, message: "New username is the same as the current username" };
      }
    }

    // Map "username" to "userName" for the database field
    const updateField = field === "username" ? "userName" : field;

    // Update the user's field in the database
    await prisma.user.update({
      where: { email },
      data: { [updateField]: value },
    });

    return { success: true, message: `${field} updated successfully` };
  } catch (error) {
    console.error(`Error updating user ${field}:`, error);
    return { success: false, message: `An error occurred while updating the ${field}` };
  }
}


export async function SubmitKyc(
  email: string,
  FullName: string,
  country: string,
  idCardNumber: string,
  idCardFront: string,
  idCardBack: string
  ) {
  try {
    // Fetch the user by email
    const users = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true },
      });
    if (!users) {
      return { success: false, message: "User not found" };
    }

    // Validate the new value
    if (!FullName || FullName.trim() === "") {
      return { success: false, message: "Full name cannot be empty" };
    }
    if (!country || country.trim() === "") {
      return { success: false, message: "Country cannot be empty" };
    }
    if (!idCardNumber || idCardNumber.trim() === "") {
      return { success: false, message: "ID card number cannot be empty" };
    }
    const kyc = await prisma.kyc.findUnique({
      where: { userid: users.id },
    });
    const userid = users.id;
    // Check if the new value is already taken (only for username)
    // Update the user's KYC details in the database
    if(kyc){
      await prisma.kyc.update({
        where: { userid: kyc.userid },
        data: {
          FullName,
          userid: kyc.userid,
          country,
          IDNO: idCardNumber,
          documentURL1: idCardFront,
          documentURL2: idCardBack,
          Status: "pending",
          //user: { connect: { email } }, // Connect to the user by email
      }
    }
    );
    } else{
      // Create a new KYC record if it doesn't exist
      await prisma.kyc.create({
        data: {
          FullName,
          userid: userid,
          country,
          IDNO: idCardNumber,
          documentURL1: idCardFront,
          documentURL2: idCardBack,
          Status: "pending",
          //user: { connect: { email } }, // Connect to the user by email
      }
    });
    }

    return { success: true, message: "KYC details submitted successfully" };
  } catch (error) {
    console.error(`Error submitting KYC details for user ${email}:`, error);
    return { success: false, message: `An error occurred while submitting KYC details` };
  }
}

export async function getKycStatus(email: string) {
  try {
    const users = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true },
      });
    // Fetch the user's KYC status by email
    const kyc = await prisma.kyc.findUnique({
      where: {userid: users?.id},
      select: { Status: true, userid: true },
    });

    if (!kyc) {
      return { success: false, message: "KYC details not found" };
    }

    return { success: true, message: kyc.Status };
  } catch (error) {
    console.error(`Error fetching KYC status for user ${email}:`, error);
    return { success: false, message: `An error occurred while fetching KYC status` };
  }
}
 export async function getKycDetails(email: string) {
  try {
    const users = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true },
      });
    // Fetch the user's KYC status by email
    const kyc = await prisma.kyc.findUnique({
      where: {userid: users?.id},
      select: { FullName: true, country: true, IDNO: true, documentURL1: true, documentURL2: true, Status: true },
    });

    if (!kyc) {
      return { success: false, message: "KYC details not found" };
    }

    return { success: true, message: "kyc" };
  } catch (error) {
    console.error(`Error fetching KYC status for user ${email}:`, error);
    return { success: false, message: `An error occurred while fetching KYC status` };
  }
}
export async function getKycRequests() {
  try {
    const kycRequests = await prisma.kyc.findMany({
      where: { Status: "pending" },
      include: {
        user: {
          select: {
            email: true, // Include the user's email
          },
        },
      },
    });
    if(!kycRequests){
      return{success: false, message:"unable to get kyc"};
    }
    return{success: true, message: kycRequests};
  } catch (error) {
    console.error("Error fetching KYC requests:", error);
    throw new Error("Failed to fetch KYC requests");
  }
}

export async function blockuser(email: string) {
  // Fetch the user by email
  try{
    const block = await prisma.user.update({
      where: { email }, // Replace with the actual user ID
      data: { isBlocked: true }, // Set isBlocked to true
  });
  if(!block) {
    return { success: false, message: "failed to blocked user" };
  }
  return { success: true, message: "User blocked successfully" };
}catch (error) {
  console.error("Error blocking user:", error);
  throw new Error("Failed to block user");
}
}

export async function unblockuser(email: string){
  try{
    const unblock = await prisma.user.update({
      where: { email }, // Replace with the actual user ID
      data: { isBlocked: false }, // Set isBlocked to true
  });
  if(!unblock) {
    return { success: false, message: "Failed to Unblocked user"};
  }
  return{ success: true, message: "User Unblocked Successfully"}

}catch (error) {
  throw new Error("Failed to Unblock user");
}
}

export async function approvekyc(email: string){
  try{
    const users = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true },
      });

    const approve = await prisma.kyc.update({
      where: { userid: users?.id }, // Replace with the actual user ID
      data: { Status: "approved" }, // Set isBlocked to true
  });
  if(!approve) {
    return { success: false, message: "Failed to approve user KYC"};
  }
  const userkyc = await prisma.user.update({
    where: {email},
    data: {kycverified: true}
  })
  return{ success: true, message: "User KYC Approved Successfully"}

}catch (error) {
  throw new Error("Failed to approve user KYC" + error);
}
}

export async function rejectkyc(email: string, reason: string){
  try{
    const users = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true },
      });

      if(!users){
        return{success: false, message:"unable to fetc user details"}
      }

    const reject = await prisma.kyc.update({
      where: { userid: users.id }, // Replace with the actual user ID
      data: { Status: "rejected", Rejection_reason: reason }, // Set isBlocked to true
  });
  if(!reject) {
    return { success: false, message: "Failed to reject user KYC"};
  }
  return{ success: true, message: "User KYC recjected Successfully"}

}catch (error) {
  throw new Error("Failed to reject user KYC" + error);
}
}

export async function addTransaction(senderWalletAddress: string, receiverWalletAddress: string, transactionHash: string, amount: number, coin: string, fee: string, orderId: string, price: string, qty: number) {
  try{
    const userId = await prisma.wallets.findUnique({
      where: { address: senderWalletAddress },
      select: { userId: true },
    });
    if (!userId) {
      throw new Error("User not found for the given wallet address");
    }
    const transaction = await prisma.transaction.create({
      data: {
        senderWalletAddress,
        receiverWalletAddress,
        transactionHash,
        userId: userId.userId,
        amount,
        status: "pending",
        coin,
        fee,
        orderId,
        price,
        qty
      }
  });
  
} catch (error) {
    console.error("Error adding transaction:", error);
    throw new Error("Failed to add transaction");
  }
}

export async function getp2ptransaction(email: string) {
  try {
    const userId = await prisma.user.findUnique({
      where: { email },
      select: { id: true }, // Select only the user ID
    });
    // Fetch transactions with pagination and search
    const transactions = await prisma.transaction.findMany({
      where: { userId: userId?.id }, // Filter by transaction type
    });
    if (!transactions) {
      return { success: false, message: "No transactions found for the user" };
      
    }
    return {success: true, message: transactions};
    // Get the total count of transactions for pagination
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw new Error("Failed to fetch transactions");
  }
}

export async function searchTransaction(id: string) {
  try {
    // Fetch transactions with pagination and search
    const transaction = await prisma.transaction.findFirst({
      where: {
            id
      },
    });
    
    
    return transaction
    //return{ success: true, message: "User KYC  Successfully"}
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw new Error("Failed to fetch transactions");
  }
}

export async function addModerator(email: string, name: string, roles: string) {
  try {
    // Fetch the user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (user) {
    if (user.roles === "moderator") {
      return { success: false, message: "User is already a moderator" };
    }
    }


    // Validate the new value
    if (!name || name.trim() === "") {
      return { success: false, message: "Name cannot be empty" };
    }
    if (!roles || roles.trim() === "") {
      return { success: false, message: "Role cannot be empty" };
    }

    // Check if the new value is already taken (only for username)
    if (roles !== "moderator") {
      return { success: false, message: "Role must be moderator" };
    }

    //hash the password before storing it in the database
    const hashedPassword = hashPassword("password"); // Replace "password" with the actual password
    // Update the user's field in the database
    await prisma.user.create({
      data: { 
        email,
        name, 
        roles,
        password: hashedPassword, // Set a default password or handle it as needed
        isBlocked: false, // Set isBlocked to false by default
        userName: email.split("@")[0], // Set a default username based on the email
        image: "https://example.com/default-avatar.png", // Set a default avatar URL
      },
    });

    return { success: true, message: `Moderator added successfully` };
  } catch (error) {
    console.error(`Error adding moderator for user ${email}:`, error);
    return { success: false, message: `An error occurred while adding moderator` };
  }
}
export async function addNotification(userId: string, title: string, message: string) {
  try {
    // Validate input
    if (!userId || !title || !message) {
      return { success: false, message: "All fields are required" };
    }

    // Create a new notification in the database
    const notification = await prisma.notification.create({
      data: {
        userId,
        title,
        message,
        isRead: false, // Default to unread
      },
    });

    return { success: true, message: "Notification added successfully", notification };
  } catch (error) {
    console.error("Error adding notification:", error);
    return { success: false, message: "Failed to add notification" };
  }
}

export async function getNotifications(email: string) {
  try {
    // Fetch the user by email
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true }, // Select only the user ID
    });
    if (!user) {
      return { success: false, message: "User not found" };
    }
    const userId = user.id; // Get the user ID
    // Fetch notifications for the user
    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }, // Sort by creation date (latest first)
    });

    return { success: true, notifications };
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return { success: false, message: "Failed to fetch notifications" };
  }
}

export async function createads(email: string, coin: string, price: string, minQty: number, maxQty: number, proof: string, type: string ) {
  try {
    // Fetch the user by email
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, userName: true, kycverified: true }, // Select only the user ID
    });
    if (!user) {
      return { success: false, message: "User not found" };
    }
    if(!user.kycverified){
      return{success: false, message: "you must verify you kyc before you create an ad"}
    }
    const userId = user.id; // Get the user ID
    const username = user.userName; // Get the username
   const existingAds = await prisma.ads.findMany({
  where: { userId },
});

const sameTypeAd = existingAds.find(ad => ad.type === type);

if (sameTypeAd) {
  return {
    success: false,
    message: `You have already created a ${type} ad. Go to 'View Ads' to edit your ad details.`,
  };
}

    // Create a new ad in the database
    const ads = await prisma.ads.create({
      data: {
        coin,
        price,
        minQty,
        maxQty,
        proof,
        status: "inactive",
        userId,
        userName: username || "", // Include the username in the ad data
        type
      },
    });
    if(!ads){
      return{ success: false, message: ads}
    }
    return { success: true, message: "Ad created successfully" };
  } catch (error) {
    console.log("Error creating ad:", error);
    return { success: false, message: "Failed to create ad" };
  }
}
export async function getAds(email: string) {
  try {
    // Fetch the user by email
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true }, // Select only the user ID
    });
    if (!user) {
      return { success: false, message: "User not found" };
    }
    const userId = user.id; // Get the user ID
    // Fetch ads for the user
    const ads = await prisma.ads.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }, // Sort by creation date (latest first)
    });

    return { success: true, ads };
  } catch (error) {
    console.error("Error fetching ads:", error);
    return { success: false, message: "Failed to fetch ads" };
  }
}

export async function getAllAds() {
  try {
    // Fetch all ads
    const ads = await prisma.ads.findMany({
      orderBy: { createdAt: "desc" }, // Sort by creation date (latest first)
    });

    if (!ads) {
      return { success: false, message: "No ads found" };
    }
    
    return { success: true, ads, };
  } catch (error) {
    console.error("Error fetching ads:", error);
    return { success: false, message: "Failed to fetch ads" };
  }
}

export async function addtraderequest(email: string, userName: string, adId: string, amount: number, price: number, coin: string, type: string) {
  try {
    console.log("Adding trade request:", { email, userName, adId, amount, price, coin });
    // Fetch the user by email
    const merchant = await prisma.user.findUnique({
      where: { userName },
      select: { id: true, userName: true }, // Select only the user ID
    });
    if (!merchant) {
      return { success: false, message: "User not found" };
    }
    const merchantId = merchant.id; // Get the user ID
    const username = merchant.userName; // Get the username

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true }, // Select only the user ID
    });
    if (!user) {
      return { success: false, message: "User not found" };
    }
    const wallet = await prisma.userWallet.findUnique({
      where: { userid: user.id }
    });
    let walletAddress;
    if(coin==="ATOK"){
      walletAddress = wallet?.walletAddress; // Get the user's wallet address
    }else if(coin==="WOW") {
      walletAddress = wallet?.walletAddress2; // Get the user's wallet address
    } else if(coin==="SDA"){
      walletAddress = wallet?.walletAddress3; // Get the user's wallet address
    } else if(coin ==="RBL"){
      walletAddress = wallet?.walletAddress4; // Get the user's wallet address
    }else if(coin === "Opincur"){
      walletAddress = wallet?.walletAddress5; // Get the user's wallet address
    }else if(coin === "Star"){
      walletAddress = wallet?.walletAddress6; // Get the user's wallet address
    }else if(coin ==="Socio"){
      walletAddress = wallet?.walletAddress7; // Get the user's wallet address
    }

    const userId = user.id; // Get the user ID
    // Create a new ad in the database
    const priceNo = price.toString().replace(/,/g, "");
    const amountNo = amount.toString().replace(/,/g, "");
    const traderequest = await prisma.traderequest.create({
      data: {
        adId,
        coin,
        price: priceNo,
        status: "pending",
        type,
        amount: amountNo,
        userId,
        merchantId,
        walletAddress, // Include the wallet address in the ad data
        merchantName: username || "", // Include the username in the ad data
      },
    });

    if(!traderequest){
      return{success: false, message: "failed to upload"}
    }
    return { success: true, message: "Trade request created successfully" };
  } catch (error) {
    console.log("Error creating trade request:", error);
    return { success: false, message: "Failed to create trade request" };
  }
}

export async function gettraderequests(email: string) {
  try {
    // Fetch the user by email
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true }, // Select only the user ID
    });
    if (!user) {
      return { success: false, message: "User not found" };
    }
    const userId = user.id; // Get the user ID
    // Fetch ads for the user
    const traderequests = await prisma.traderequest.findMany({
      where: {
        OR: [
          { merchantId: userId },
          { userId: userId }
        ]
      },
      orderBy: { createdAt: "desc" }, // Sort by creation date (latest first)
    });

    return { success: true, traderequests };
  } catch (error) {
    console.error("Error fetching traderequests:", error);
    return { success: false, message: "Failed to fetch traderequests" };
  }
}

export async function gettraderequestsinfo(id: string) {
  try {
    // Fetch ads for the user
    const info = await prisma.traderequest.findUnique({
      where: {
        id
      },
    });

    return { success: true, info };
  } catch (error) {
    console.error("Error fetching traderequests:", error);
    return { success: false, message: "Failed to fetch traderequests" };
  }
}

export async function acceptTrade(id: string) {
  try {
    // Fetch the user by email
    const traderequest = await prisma.traderequest.findUnique({
      where: { id },    });
    if (!traderequest) {
      return { success: false, message: "Trade request not found" };
    }
    const traderequestId = traderequest.id; // Get the user ID
    const adId = traderequest.adId; // Get the user ID
    const amount = traderequest.amount; // Get the user ID
    const price = traderequest.price; // Get the user ID
    const coin = traderequest.coin; // Get the user ID
    const status = traderequest.status; // Get the user ID
    const walletAddress = traderequest.walletAddress;
    const type = traderequest.type;

    if (status === "Accepted") {
      return { success: false, message: "Trade request already Accepted" };
    }

    // Update the user's field in the database
    await prisma.traderequest.update({
      where: { id },
      data: { status: "Accepted" },
    });

    // Create a new ad in the database
    const addTransaction = await prisma.adsTransaction.create({
      data: {
        adId: adId,
        orderId: traderequestId,
        coin,
        type,
        price,
        status: "pending",
        amount,
        userId: traderequest.userId,
        merchantconfirm: "pending",
        customerconfirm: "pending",
        merchantID: traderequest.merchantId,
        walletAddress,
        userName: traderequest.merchantName || "", // the username is the merchant username
      },
    });

    if(!addTransaction){
      return{success: false, message:""}
    }

    return { success: true, message: `Trade request accepted successfully` };
  } catch (error) {
    console.error(`Error accepting trade request ${id}:`, error);
    return { success: false, message: `An error occurred while accepting trade request` };
  }
}

export async function getadstransactions(ids: string){
  try{
    const gettrans = await prisma.adsTransaction.findUnique({
      where:{ orderId: ids}
    })

    if(!gettrans){
      return{success: false, message: "unable to get transaction info"}
    }
    return{ success: true, gettrans}

  }catch(error){
    console.log(error);
  }

}

export async function confirmbuyer(id: string){
  try{
    console.log(`the id is${id}`)
    const gettrans = await prisma.adsTransaction.update({
      where: { orderId: id },
      data:{
        merchantconfirm: "sent"
      }
    })
    if(!gettrans){
      return{success:false, message: "unable to update transaction"}
    }
    return{succes: true, gettrans}
  }catch(error){
    console.log(error)
  }
}

export async function confirmseen(id: string){
  try{
    const gettrans = await prisma.adsTransaction.update({
      where: { orderId: id },
      data:{
        customerconfirm: "sent"
      }
    })
    if(!gettrans){
      return{success:false, message: "unable to update transaction"}
    }
    return{success: true, gettrans}
  }catch(error){
    console.log(error)
  }
}
