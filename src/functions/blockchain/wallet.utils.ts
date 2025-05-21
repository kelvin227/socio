"use server";
import { prisma } from '@/lib/db';
import { ethers } from 'ethers';
/* eslint-disable */
const provider = new ethers.JsonRpcProvider("https://bsc-mainnet.infura.io/v3/YOUR_INFURA_API_KEY");
const usdtcontractaddress = "0x55d398326f99059ff775485246999027b3197955";
const abi = [
    "function transfer(address: recipient, uint256 amount) external returns (bool)"
]

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

export async function checkbalance(email: string){//(address: string) {
    const user = await prisma.user.findUnique({
        where:{email},
        select: {id: true}
    })
    if(!user){
        return{success:false, message:"unable able to fecth user details"}
    }
    const getaddress = await prisma.wallets.findUnique({
        where:{ userId: user.id},
        select: {address: true}
    })
     if(!getaddress){
        return{success:false, message:"unable able to fecth wallet address"}
    }
    const address = getaddress?.address;

    const usdt = "0x55d398326f99059ff775485246999027b3197955";
    const usdtresponse = await fetch(`https://api.etherscan.io/v2/api?chainid=56&module=account&action=tokenbalance&contractaddress=${usdt}&address=${address}&tag=latest&apikey=${process.env.ETHER_API_KEY}`); 

    const data = await usdtresponse.json();
    const balance = ethers.formatEther(data.result); // Assuming the API returns the balance in the 'result' field
    return {success: true, message: balance};
    //return {success: true, message: balance};
    
}

export async function getBalance(address: string){//(address: string) {
    const usdt = "0x55d398326f99059ff775485246999027b3197955";
    const usdtresponse = await fetch (`https://api.etherscan.io/v2/api?chainid=56&module=account&action=tokenbalance&contractaddress=${usdt}&address=${address}&tag=latest&apikey=${process.env.ETHER_API_KEY}`); 
    const data = await usdtresponse.json();
    const balance = ethers.formatEther(data.result); // Assuming the API returns the balance in the 'result' field
    
    
    return {success: true, message: balance}
    //return {success: true, message: balance};
    
}
export async function getBnbBalance(address: string){//(address: string) {
    const usdt = "0x55d398326f99059ff775485246999027b3197955";
    const usdtresponse = await fetch (`https://api.etherscan.io/v2/api?chainid=56&module=account&action=balance&address=${address}&tag=latest&apikey=${process.env.ETHER_API_KEY}`); 
    const data = await usdtresponse.json();
    const balance = ethers.formatEther(data.result); // Assuming the API returns the balance in the 'result' field
    
    
    return {success: true, message: balance}
    //return {success: true, message: balance};
    
}
export async function getPrice(){
    const url2= `https://api.coingecko.com/api/v3/simple/price?ids=binance-bridged-usdt-bnb-smart-chain&vs_currencies=usd`
///const url = 'https://api.coingecko.com/api/v3/coins/binance-bridged-usdt-bnb-smart-chain';
const options = {
  method: 'GET',
  headers: {accept: 'application/json', 'x-cg-demo-api-key': `${process.env.COIN_GECKO_KEY}`}
};

 try {
        const response = await fetch(url2, options);
        if (!response.ok) {
            throw new Error("Failed to fetch price from CoinGecko");
        }
        const data = await response.json();
        const price = data["binance-bridged-usdt-bnb-smart-chain"]?.usd;
        if (typeof price !== "number") {
            throw new Error("Unexpected response structure from CoinGecko");
        }
        return { success: true, message: price };
    } catch (error) {
        console.error("getPrice error:", error);
        return { success: false, message: error };
    }
}
export async function getBnbPrice(){
    const url2= `https://api.coingecko.com/api/v3/simple/price?ids=binance-bridged-usdt-bnb-smart-chain&vs_currencies=usd`
///const url = 'https://api.coingecko.com/api/v3/coins/binance-bridged-usdt-bnb-smart-chain';
const options = {
  method: 'GET',
  headers: {accept: 'application/json', 'x-cg-demo-api-key': `${process.env.COIN_GECKO_KEY}`}
};

 try {
        const response = await fetch(url2, options);
        if (!response.ok) {
            throw new Error("Failed to fetch price from CoinGecko");
        }
        const data = await response.json();
        const price = data["binance-bridged-usdt-bnb-smart-chain"]?.usd;
        if (typeof price !== "number") {
            throw new Error("Unexpected response structure from CoinGecko");
        }
        return { success: true, message: price };
    } catch (error) {
        console.error("getPrice error:", error);
        return { success: false, message: error };
    }
}
export async function gettransaction(address: string) {
   
try {
    const responses = await fetch(
    `https://api.etherscan.io/v2/api?chainid=56&module=account&action=tokentx&contractaddress=0x55d398326f99059ff775485246999027b3197955&address=${address}&page=1&offset=5&startblock=0&endblock=999999999&sort=asc&apikey=${process.env.ETHER_API_KEY}`
);
 
      return responses.json();
      
    } catch (error) {
      console.error("Error fetching transaction data:", error);
    } 
}

export async function sendusdt(address: string, amount: string, recipient: string) {
    if (!amount || Number(amount) <= 0) {
        throw new Error("Invalid amount provided.");
    }
    
    if (!recipient) {
        throw new Error("Recipient address is required.");
    }
    
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
            chainId: 56,//11155111 // USDT testnet chain ID
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
    if (!amount || Number(amount) <= 0) {
        throw new Error("Invalid amount provided.");
    }
    
    if (!recipient) {
        throw new Error("Recipient address is required.");
    }
    
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

export async function estimateGas(senderwallet: string, recipient: string, amount: string) {
  try {
    const usdtContractAddress = "0x55d398326f99059fF775485246999027B3197955"; // USDT on BSC

    // Create Interface for ERC20 transfer
    const erc20Interface = new ethers.Interface([
      "function transfer(address to, uint256 amount)",
    ]);

    // Encode the transfer data
    const encodedData = erc20Interface.encodeFunctionData("transfer", [
      senderwallet,
      ethers.parseUnits(amount, 6), // USDT has 6 decimals
    ]);

    // Send fetch request to estimate gas
    const response = await fetch(`https://bsc-mainnet.infura.io/v3/${process.env.INFRUA_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "eth_estimateGas",
        params: [
          {
            from: senderwallet,
            to: usdtContractAddress,
            data: encodedData,
          },
        ],
        id: 1,
      }),
    });

     const getGasPrice = await fetch(`https://bsc-mainnet.infura.io/v3/${process.env.INFRUA_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "eth_gasPrice",
        params: [
        ],
        id: 1,
      }),
    });

    const result = await response.json();
    if (result.error) {
      console.error("Gas estimation error:", result.error);
      return null;
    }
    const gasPriceresult = await getGasPrice.json();
    if (gasPriceresult.error) {
      console.error("Gas estimation error:", result.error);
      return null;
    }

    // Fetch current gas price (in wei)
const gasPrice = gasPriceresult.result; // Returns a bigint

// Calculate total gas cost in wei
const totalGasWei = result.result * gasPrice;

// Convert to BNB (divide by 1e18 to go from wei to BNB)
const totalGasBNB = ethers.formatEther(totalGasWei);

console.log("gas price is", ethers.formatEther(gasPrice))
console.log("estimated gas in bnb:", totalGasBNB) //this is what i need this is the gas price in bnb

    console.log("Estimated gas:",ethers.formatEther(result.result) );
    return result.result;
  } catch (err) {
    console.error("Error estimating gas:", err);
    return null;
  }
}

export async function sendusdttrade(amount: string, recipient: string, id: string) {
    if (!amount || Number(amount) === 0) {
        throw new Error("Invalid amount provided.");
    }
    
    if (!recipient) {
        throw new Error("Recipient address is required.");
    }
    
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
            return{success: false, message: walletss}
          }

          console.log(amount);

          const totalGasCostBNB = await estimateGas(wallets?.address as string, recipient, amount)
   
    return{success: true, message: `gas fee is${totalGasCostBNB}`}
    
}
