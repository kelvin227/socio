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

export default async function getBalance(walletAddress: string) {
    const sepolia =  "0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43";
    const usdt = "0x55d398326f99059ff775485246999027b3197955";
    const usdtresponse = await fetch ('https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress='+ {usdt} +'&address=0x222b38Fec42183288d752ED2926a142eEc655967&tag=latest&apikey=HUSTYYQF38TCG66EA8DZ18AY57QV42VHJ8'
); 
    const response = await fetch(
        "https://api-sepolia.etherscan.io/api?module=account&action=balance&address=0x3d80C535515074d9BDC25AD6eB40641E0aeBd12f&tag=latest&apikey=KB4T4QZCQQBM4G5WDHHZRHV1RYAIDYXMBQ"
    );
    const data = await response.json();
    const balance = data.result; // Assuming the API returns the balance in the 'result' field
    return ethers.formatEther(balance);
    //return {success: true, message: balance};
    
}
export async function monitor(){
   const responses = await fetch(
    "https://api.bscscan.com/api?module=account&action=tokentx&contractaddress=0x55d398326f99059ff775485246999027b3197955&address=0x222b38Fec42183288d752ED2926a142eEc655967&page=1&offset=5&startblock=0&endblock=999999999&sort=asc&apikey=HUSTYYQF38TCG66EA8DZ18AY57QV42VHJ8"
);
const response = await fetch(
    "https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=0x3d80C535515074d9BDC25AD6eB40641E0aeBd12f&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=KB4T4QZCQQBM4G5WDHHZRHV1RYAIDYXMBQ"
);
const data = await response.json();
const trans = data.result; // Assuming the API returns the balance in the 'result' field
return (trans);
    
}

export async function sendusdt(address: string, amount: string, password: string, recipient: string) {
    const provider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/" + process.env.INFURA_API_KEY);
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
            value: ethers.parseUnits(amount, 18),
            chainId: 56//11155111 // Sepolia testnet chain ID
        });
        console.log("Transaction Hash:", tx.hash);
        await tx.wait(); // Wait for the transaction to be mined
        console.log("Transaction confirmed in block:", tx.blockNumber);
    }

    //const data = await wallet; // Assuming the API returns the balance in the 'result' field
    console.log(privateK);
    //return ethers.formatEther(balance);
    
}

export async function sendtest(amount: string, recipient: string, email: string) {
    const user = await prisma.user.findUnique({
        where: { email },
        select: { id: true }
    });
    if (!user) {
        return{success: true, message: "failed to get user info"};
        console.log(user);
    }
    
    const walletss = await prisma.wallets.findUnique({
        where: { id: user.id },
        select: { address: true, encrypted_key: true, private_key: true, },
    });
    
          // Connect to the Ethereum Sepolia network
          if (!walletss) {
            return{success: true, message: "unable to get wallet info"};
            console.log(walletss);
          }
    const provider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/" + process.env.INFURA_API_KEY);
   // const decrypt_private_key = await ethers.Wallet.fromEncryptedJson(privateK.private_key, password);
    const wallet = new ethers.Wallet(walletss.private_key, provider);

    //if (!decrypt_private_key) {
    //    throw new Error("Invalid password or wallet not found");
    //}
    if (wallet) {
        const tx = await wallet.sendTransaction({
            to: recipient,
            value: ethers.parseEther(amount),
            chainId: 11155111 // Sepolia testnet chain ID
        });
        console.log(wallet);
        console.log("Transaction Hash:", tx.hash);
        await tx.wait(); // Wait for the transaction to be mined
        console.log("Transaction confirmed in block:", tx.blockNumber);
    }

    //const data = await wallet; // Assuming the API returns the balance in the 'result' field
    console.log(walletss);
    //return ethers.formatEther(balance);
    
}

