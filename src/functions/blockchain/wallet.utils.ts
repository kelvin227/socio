"use server";
import { prisma } from '@/lib/db';
import { ethers } from 'ethers';
/* eslint-disable */


export async function createWallet(password: string, email: string) {
    const getuser = await prisma.user.findUnique({
        where: { email },
        select: { id: true },
    });
    if (!getuser) {
        throw new Error("User not found");
    }
    const userId = getuser.id;
    
    const wallet = ethers.Wallet.createRandom();
    const private_key = wallet.privateKey;
    const encryptedJson = await wallet.encrypt(password);
    const newWallet = await prisma.wallets.create({
        data: {
            address: wallet.address,
            private_key: private_key,
            network: "BEP20",
            mnemonic: wallet.mnemonic?.phrase as string,
            encrypted_key: encryptedJson,
            userId
        },
    });
    return newWallet;
}

export default async function getBalance(address: string) {
    const usdt = "0x55d398326f99059ff775485246999027b3197955";
    const usdtresponse = await fetch (`https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=${usdt}&address=${address}&tag=latest&apikey=${process.env.BSC_API_KEY}`); 

    const response = await fetch(
        `https://api-sepolia.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${process.env.SEPOLIA_API_KEY}`
    );
    const data = await response.json();
    const balance = ethers.formatEther(data.result); // Assuming the API returns the balance in the 'result' field
    return {success: true, message: balance};
    //return {success: true, message: balance};
    
}
export async function gettransaction(address: string) {
   const responses = await fetch(
    `https://api.bscscan.com/api?module=account&action=tokentx&contractaddress=0x55d398326f99059ff775485246999027b3197955&address=${address}&page=2&offset=5&startblock=0&endblock=999999999&sort=asc&apikey=${process.env.BSC_API_KEY}`
);
try {
      const response = await fetch(
        `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${process.env.SEPOLIA_API_KEY}`
      );
      return response.json();
      
    } catch (error) {
      console.error("Error fetching transaction data:", error);
    } 
}

export async function sendusdt(address: string, amount: string, recipient: string) {
    const provider = new ethers.JsonRpcProvider(`https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`);
    const privateK = await prisma.wallets.findUnique({
        where:{address},
        select: {private_key: true}
    })
    if (!privateK) {
        throw new Error("Wallet not found");
    }
   // const decrypt_private_key = await ethers.Wallet.fromEncryptedJson(privateK.private_key, password);
    const wallet = new ethers.Wallet(privateK.private_key, provider);

    //if (!decrypt_private_key) {
    //    throw new Error("Invalid password or wallet not found");
    //}
    if (wallet) {
        const tx = await wallet.sendTransaction({
            to: recipient,
            value: ethers.parseEther(amount),
            chainId: 56//11155111 // USDT testnet chain ID
        });
        console.log("Transaction Hash:", tx.hash);
        await tx.wait(); // Wait for the transaction to be mined
        console.log("Transaction confirmed in block:", tx.blockNumber);
    }

    //const data = await wallet; // Assuming the API returns the balance in the 'result' field
    console.log(privateK);
    //return ethers.formatEther(balance);
    
}

export async function sendtest(amount: string, recipient: string, id: string) {
    // console.log("email from sendtest", email);
    // const user = await prisma.user.findUnique({
    //     where: { email },
    //     select: { id: true }
    // });
    // console.log("user from sendtest", user);
    // if (!user) {
    //     //return{success: true, message: "failed to get user info"};
    //     console.log("error from getting user details", user);
    // }
    const wallets = await prisma.wallets.findUnique({
        where: { userId: id },
        select: { address: true, encrypted_key: true, private_key: true, },
    });
    const walletss = await prisma.wallets.findUnique({
        where: { userId: recipient },
        select: { address: true },
    });
    
          // Connect to the Ethereum Sepolia network
          if (!walletss) {
            //return{success: true, message: "unable to get wallet info"};
            console.log(walletss);
          }
          console.log("return null for walletss", walletss);
    const provider = new ethers.JsonRpcProvider(`https://sepolia.infura.io/v3/80c842e999184bd28fd9d46c6d19afb4`);
   // const decrypt_private_key = await ethers.Wallet.fromEncryptedJson(privateK.private_key, password);
    const wallet = new ethers.Wallet(wallets?.private_key as string, provider);

    //if (!decrypt_private_key) {
    //    throw new Error("Invalid password or wallet not found");
    //}
    if (wallet) {
        const tx = await wallet.sendTransaction({
            to: walletss?.address,
            value: ethers.parseEther(amount),
        });
        console.log("error sending a getting user detials", wallet);
        console.log("Transaction Hash:", tx.hash);
        await tx.wait(); // Wait for the transaction to be mined
        return {success: true, tx}
    }
    return{success: false, message: wallet}

    //const data = await wallet; // Assuming the API returns the balance in the 'result' field
    console.log("error with return", walletss);
    //return ethers.formatEther(balance);
    
}

