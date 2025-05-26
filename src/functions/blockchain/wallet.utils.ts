"use server";
import { prisma } from '@/lib/db';
import { ethers } from 'ethers';
/* eslint-disable */
const provider = new ethers.JsonRpcProvider("https://bsc-mainnet.infura.io/v3/YOUR_INFURA_API_KEY");
const adminWallet = "0xd8c8223d43F6AD2af6D5c6399C6Fc63aF42253B6";
const usdtcontractaddress = "0x55d398326f99059ff775485246999027b3197955";
const abi =
    [{ "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "constant": true, "inputs": [], "name": "_decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "_name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "_symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "burn", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getOwner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "mint", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "renounceOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }]


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

export async function checkbalance(email: string, amount: string, price: string) {//(address: string) {
    const user = await prisma.user.findUnique({
        where: { email },
        select: { id: true }
    })
    if (!user) {
        return { success: false, message: "unable able to fecth user details" }
    }
    const getaddress = await prisma.wallets.findUnique({
        where: { userId: user.id },
        select: { address: true }
    })
    if (!getaddress) {
        return { success: false, message: "unable able to fecth wallet address" }
    }
    const address = getaddress?.address;

    const usdt = "0x55d398326f99059ff775485246999027b3197955";
    const usdtresponse = await fetch(`https://api.etherscan.io/v2/api?chainid=56&module=account&action=tokenbalance&contractaddress=${usdt}&address=${address}&tag=latest&apikey=${process.env.ETHER_API_KEY}`);

    const data = await usdtresponse.json();
    const balance = ethers.formatEther(data.result); // Assuming the API returns the balance in the 'result' field
    let cal = Number(amount) * Number(price);
    let cal2 = cal * 0.02 + cal;
    if (Number(balance) < cal2) {
        return { success: false, message: `insufficient balance, you need ${cal2}"USDT` };
    }
    const fee = Number(amount) * 0.02;
    // Optional: Check sender's BNB balance for gas fees
    const senderBNBBalance = await getBnbBalance(address);
    // You might want to estimate gas for the transaction more precisely here.
    // For a simple transfer, a rough estimate is okay, but it's crucial for users to have enough BNB.
    const estimatedGasLimit = ethers.formatEther("60000"); // A common estimate for token transfer
    const gasPrice = await estimateGas(address, adminWallet, amount);
    const gasPriceForFee = await estimateGas(address, adminWallet, fee.toString())
    const gaspriceconvert = parseInt(gasPrice?.gasPrice, 16);
    const gasPriceConvertForFee = parseInt(gasPriceForFee?.gasPrice, 16);
    const requiredBNBForFee = gasPriceConvertForFee * Number(estimatedGasLimit);
    const requiredBNB = gaspriceconvert * Number(estimatedGasLimit);
    const requiredBNBBalance = requiredBNB + requiredBNBForFee;

    if (Number(senderBNBBalance.message) < requiredBNBBalance) {
        return { success: false, message: `Insufficient BNB for gas fees in wallet ${address}. Needs approx. ${requiredBNB} BNB.` };
    }
    return { success: true, message: "" };
    //return {success: true, message: balance};

}

export async function getBalance(address: string) {//(address: string) {
    const usdt = "0x55d398326f99059ff775485246999027b3197955";
    const usdtresponse = await fetch(`https://api.etherscan.io/v2/api?chainid=56&module=account&action=tokenbalance&contractaddress=${usdt}&address=${address}&tag=latest&apikey=${process.env.ETHER_API_KEY}`);
    const data = await usdtresponse.json();
    const balance = ethers.formatEther(data.result); // Assuming the API returns the balance in the 'result' field


    return { success: true, message: balance }
    //return {success: true, message: balance};

}
export async function getBnbBalance(address: string) {//(address: string) {
    const usdt = "0x55d398326f99059ff775485246999027b3197955";
    const usdtresponse = await fetch(`https://api.etherscan.io/v2/api?chainid=56&module=account&action=balance&address=${address}&tag=latest&apikey=${process.env.ETHER_API_KEY}`);
    const data = await usdtresponse.json();
    const balance = ethers.formatEther(data.result); // Assuming the API returns the balance in the 'result' field


    return { success: true, message: balance }
    //return {success: true, message: balance};

}
export async function getPrice() {
    const url2 = `https://api.coingecko.com/api/v3/simple/price?ids=binance-bridged-usdt-bnb-smart-chain&vs_currencies=usd`
    ///const url = 'https://api.coingecko.com/api/v3/coins/binance-bridged-usdt-bnb-smart-chain';
    const options = {
        method: 'GET',
        headers: { accept: 'application/json', 'x-cg-demo-api-key': `${process.env.COIN_GECKO_KEY}` }
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
export async function getBnbPrice() {
    const url2 = `https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd`
    const options = {
        method: 'GET',
        headers: { accept: 'application/json', 'x-cg-demo-api-key': `${process.env.COIN_GECKO_KEY}` }
    };

    try {
        const response = await fetch(url2, options);
        if (!response.ok) {
            throw new Error("Failed to fetch price from CoinGecko");
        }
        const data = await response.json();
        const price = data["binancecoin"]?.usd;
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
            `https://api.etherscan.io/v2/api?chainid=56&module=account&action=tokentx&contractaddress=0x55d398326f99059ff775485246999027b3197955&address=${address}&page=1&offset=5&startblock=0&endblock=999999999&sort=desc&apikey=${process.env.ETHER_API_KEY}`
        );

        return responses.json();

    } catch (error) {
        console.error("Error fetching transaction data:", error);
    }
}

export async function sendusdt(amount: string, recipient: string, email: string) {
    if (!amount || Number(amount) === 0) {
        throw new Error("Invalid amount provided.");
    }

    if (!recipient) {
        throw new Error("Recipient address is required.");
    }
    try {
        const user = await prisma.user.findUnique({
            where: { email },
            select: { id: true }
        })
        if (!user) {
            return { success: false, message: "unable to get userId" }
        }
        const id = user.id
        const wallets = await prisma.wallets.findUnique({
            where: { userId: id },
            select: { address: true, encrypted_key: true, private_key: true },
        });



        // 1. Setup Provider and Wallet
        const provider = new ethers.JsonRpcProvider(`https://bsc-mainnet.infura.io/v3/${process.env.INFRUA_API_KEY}`);
        const wallet = new ethers.Wallet(wallets?.private_key as string, provider);

        // Get the sender's address (for logging/checking)
        const senderAddress = wallet.address;
        console.log(`Transfer initiated by ${senderAddress}`);

        // 2. Instantiate USDT Contract
        const usdtContract = new ethers.Contract(usdtcontractaddress, abi, wallet);

        // 3. Get USDT decimals to format the amount correctly
        const decimals = await usdtContract.decimals();
        const amountInWei = ethers.parseUnits(amount.toString(), decimals);


        // Optional: Check sender's balance before sending
        const senderUSDTBalance = await usdtContract.balanceOf(senderAddress);
        if (senderUSDTBalance <= amountInWei) {
            return { success: false, message: `Insufficient USDT balance for ${senderAddress}. Has ${ethers.formatUnits(senderUSDTBalance, decimals)} USDT, needs ${amount} USDT.` };
        }

        // Optional: Check sender's BNB balance for gas fees
        const senderBNBBalance = await getBnbBalance(senderAddress);
        // You might want to estimate gas for the transaction more precisely here.
        // For a simple transfer, a rough estimate is okay, but it's crucial for users to have enough BNB.
        const estimatedGasLimit = ethers.formatEther("60000"); // A common estimate for token transfer
        const gasPrice = await estimateGas(senderAddress, recipient, amount);
        const gaspriceconvert = parseInt(gasPrice?.gasPrice, 16);
        const requiredBNB = gaspriceconvert * Number(estimatedGasLimit);
        console.log(requiredBNB)
        if (Number(senderBNBBalance.message) < Number(requiredBNB)) {
            return { success: false, message: `Insufficient BNB for gas fees in wallet ${senderAddress}. Needs approx. ${requiredBNB} BNB.` };
        }


        // 4. Send the Transaction
        console.log(`Attempting to transfer ${amount} USDT from ${senderAddress} to ${recipient}`);
        const tx = await usdtContract.transfer(recipient, amountInWei, {
            gasLimit: ethers.parseEther(estimatedGasLimit) // Explicitly set gas limit or let ethers estimate
        });

        console.log(`Transaction submitted! Hash: ${tx.hash}`);

        // 5. Wait for Transaction Confirmation (important for reliability)
        const receipt = await tx.wait(); // Waits for 1 block confirmation by default

        if (receipt.status === 1) {
            console.log(`Transaction successfull! Block: ${receipt.blockNumber}`);
            // Here you would update your database for the P2P order status
            console.log("this is the tx:", tx)
            console.log("this is the receipt:", receipt)
            return {
                success: true,
                message: 'USDT transfer successful',
                transactionHash: tx.hash,
                blockNumber: receipt.blockNumber,
                recipient,
                amount: amount,
                sender: senderAddress
            };
        } else {
            console.error(`Transaction failed! Receipt:`, receipt);
            return {
                success: false,
                message: 'USDT transfer failed on blockchain',
                transactionHash: tx.hash,
                receipt: receipt
            };
        }

    } catch (error: any) {
        console.log('Error during USDT transfer:', error);
        let errorMessage = 'An unexpected error occurred during the transfer.';

        // Try to get more specific error messages from the blockchain or Ethers.js
        if (error.reason) {
            errorMessage = `Blockchain Error: ${error.reason}`;
        } else if (error.message && error.message.includes("insufficient funds for gas")) {
            errorMessage = "Insufficient BNB for gas fees in the sender's wallet.";
        } else if (error.code === 'CALL_EXCEPTION') {
            errorMessage = "Smart contract call failed. Check recipient address and amount.";
        }
    };

}

export async function sendtest(amount: string, recipient: string, email: string) {
    if (!amount || Number(amount) <= 0) {
        throw new Error("Invalid amount provided.");
    }

    if (!recipient) {
        throw new Error("Recipient address is required.");
    }

    const user = await prisma.user.findUnique({
        where: { email },
        select: { id: true }
    });
    console.log("user from sendtest", user);
    if (!user) {
        return { success: false, message: "failed to get user info" };
    }
    const wallets = await prisma.wallets.findUnique({
        where: { userId: user.id },
        select: { address: true, encrypted_key: true, private_key: true, },
    });


    const provider = new ethers.JsonRpcProvider(`https://bsc-mainnet.infura.io/v3/${process.env.INFRUA_API_KEY}`)
    // const decrypt_private_key = await ethers.Wallet.fromEncryptedJson(privateK.private_key, password);
    const wallet = new ethers.Wallet(wallets?.private_key as string, provider);

    //if (!decrypt_private_key) {
    //    throw new Error("Invalid password or wallet not found");
    //}

    // Optional: Check sender's BNB balance for gas fees
    const senderBNBBalance = await getBnbBalance(wallets?.address as string);
    // You might want to estimate gas for the transaction more precisely here.
    // For a simple transfer, a rough estimate is okay, but it's crucial for users to have enough BNB.
    const estimatedGasLimit = ethers.formatEther("60000"); // A common estimate for token transfer
    const gasPrice = await estimateGas(wallets?.address as string, recipient, amount);
    const gaspriceconvert = parseInt(gasPrice?.gasPrice, 16);
    const requiredBNB = gaspriceconvert * Number(estimatedGasLimit);
    if (Number(senderBNBBalance.message) < Number(requiredBNB)) {
        return { success: false, message: `Insufficient BNB for gas fees in wallet ${wallets?.address}. Needs approx. ${requiredBNB} BNB.` };
    }


    // 4. Send the Transaction
    console.log(`Attempting to transfer ${amount} USDT from ${wallets?.address} to ${recipient}`);
    if (wallet) {
        const tx = await wallet.sendTransaction({
            to: recipient,
            value: ethers.parseEther(amount),
            gasLimit: ethers.parseEther(estimatedGasLimit)
        });
        console.log("error sending a getting user detials", wallet);
        console.log("Transaction Hash:", tx.hash);
        console.log(tx);
        await tx.wait(); // Wait for the transaction to be mined
        return { success: true, message: "BNB sent successfully" }
    }
    return { success: false, message: wallet }

    //const data = await wallet; // Assuming the API returns the balance in the 'result' field
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
        //parseInt()

        // Calculate total gas cost in wei
        const totalGasWei = result.result * gasPrice;

        // Convert to BNB (divide by 1e18 to go from wei to BNB)
        const totalGasBNB = ethers.formatEther(totalGasWei);

        return { success: true, message: totalGasBNB, gasPrice, totalGasWei };
    } catch (err) {
        console.error("Error estimating gas:", err);
        return null;
    }
}

export async function sendusdttrade(amount: string, recipientid: string, id: string) {
    if (!amount || Number(amount) === 0) {
        throw new Error("Invalid amount provided.");
    }

    if (!recipientid) {
        throw new Error("Recipient address is required.");
    }

    const wallets = await prisma.wallets.findUnique({
        where: { userId: id },
        select: { address: true, encrypted_key: true, private_key: true, },
    });
    const walletss = await prisma.wallets.findUnique({
        where: { userId: recipientid },
        select: { address: true },
    });

    // Connect to the Ethereum Sepolia network
    if (!walletss) {
        //return{success: true, message: "unable to get wallet info"};
        return { success: false, message: walletss }
    }
    const recipient = walletss.address

    try {
        // 1. Setup Provider and Wallet
        const provider = new ethers.JsonRpcProvider(`https://bsc-mainnet.infura.io/v3/${process.env.INFRUA_API_KEY}`);
        const wallet = new ethers.Wallet(wallets?.private_key as string, provider);

        // Get the sender's address (for logging/checking)
        const senderAddress = wallet.address;
        console.log(`Transfer initiated by ${senderAddress}`);

        // 2. Instantiate USDT Contract
        const usdtContract = new ethers.Contract(usdtcontractaddress, abi, wallet);

        // 3. Get USDT decimals to format the amount correctly
        const decimals = await usdtContract.decimals();
        const fee = Number(amount) * 0.02;
        const amountandfee = fee + Number(amount)
        const amountInWei = ethers.parseUnits(amountandfee.toString(), decimals);


        // Optional: Check sender's balance before sending
        const senderUSDTBalance = await usdtContract.balanceOf(senderAddress);
        if (senderUSDTBalance <= amountInWei) {
            return { success: false, message: `Insufficient USDT balance for ${senderAddress}. Has ${ethers.formatUnits(senderUSDTBalance, decimals)} USDT, needs ${amount} USDT.` };
        }

        // Optional: Check sender's BNB balance for gas fees
        const senderBNBBalance = await getBnbBalance(senderAddress);
        // You might want to estimate gas for the transaction more precisely here.
        // For a simple transfer, a rough estimate is okay, but it's crucial for users to have enough BNB.
        const estimatedGasLimit = ethers.formatEther("60000"); // A common estimate for token transfer
        const gasPrice = await estimateGas(senderAddress, recipient, amount);
        const gasPriceForFee = await estimateGas(senderAddress, adminWallet, fee.toString())
        const gaspriceconvert = parseInt(gasPrice?.gasPrice, 16);
        const gasPriceConvertForFee = parseInt(gasPriceForFee?.gasPrice, 16);
        const requiredBNBForFee = gasPriceConvertForFee * Number(estimatedGasLimit);
        const requiredBNB = gaspriceconvert * Number(estimatedGasLimit);
        const requiredBNBBalance = requiredBNB + requiredBNBForFee;
        console.log("this is the total number usdt plus fee", amountandfee)
        console.log("this is the bnb required for the fee transfer to the admin wallet", requiredBNBForFee)
        console.log("this is the bnb balance required for the amount transfer", requiredBNB)
        console.log("this is the total bnb required", requiredBNBBalance)

        if (Number(senderBNBBalance.message) < requiredBNBBalance) {
            return { success: false, message: `Insufficient BNB for gas fees in wallet ${senderAddress}. Needs approx. ${requiredBNB} BNB.` };
        }


        // 4. Send the Transaction
        console.log(`Attempting to transfer ${amount} USDT from ${senderAddress} to ${recipient}`);
        const tx = await usdtContract.transfer(recipient, ethers.parseUnits(amount), {
            gasLimit: ethers.parseEther(estimatedGasLimit) // Explicitly set gas limit or let ethers estimate
        });
        console.log(fee.toString())
        const feetx = await usdtContract.transfer(adminWallet, ethers.parseUnits(fee.toString()), {
            gasLimit: ethers.parseEther(estimatedGasLimit)
        })

        console.log(`Transaction submitted! Hash: ${tx.hash}`);
        console.log(`Transaction for feesubmitted! Hash: ${feetx.hash}`);


        // 5. Wait for Transaction Confirmation (important for reliability)
        const receipt = await tx.wait(); // Waits for 1 block confirmation by default
        const feereceipt = await feetx.wait(); // Waits for 1 block confirmation by default



        if (receipt.status === 1) {
            // Here you would update your database for the P2P order status
            console.log("this is the tx:", tx);
            console.log("this is the receipt:", feereceipt);
            return {
                success: true,
                message: 'USDT transfer successful',
                transactionHash: tx.hash,
                blockNumber: receipt.blockNumber,
                recipient,
                amount: amount,
                sender: senderAddress
            };
        } else {
            console.error(`Transaction failed! Receipt:`, receipt);
            return {
                success: false,
                message: 'USDT transfer failed on blockchain',
                transactionHash: tx.hash,
                receipt: receipt
            };
        }

    } catch (error: any) {
        console.log('Error during USDT transfer:', error);
        let errorMessage = 'An unexpected error occurred during the transfer.';

        // Try to get more specific error messages from the blockchain or Ethers.js
        if (error.reason) {
            errorMessage = `Blockchain Error: ${error.reason}`;
        } else if (error.message && error.message.includes("insufficient funds for gas")) {
            errorMessage = "Insufficient BNB for gas fees in the sender's wallet.";
        } else if (error.code === 'CALL_EXCEPTION') {
            errorMessage = "Smart contract call failed. Check recipient address and amount.";
        }
    };
}

//     const totalGasCostBNB = await estimateGas(wallets?.address as string, recipient, amount)

//     return { success: true, message: `${totalGasCostBNB?.message}` }

//}
