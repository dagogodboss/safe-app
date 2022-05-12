/** @format */

const { SafeFactory, default: Safe } = require("@gnosis.pm/safe-core-sdk");
const { ethers } = require("ethers");
const { wallet, getNextDelegateEthAdapter } = require("./adapter");

/**
 * create a new Safe
 * @param {*} ethAdapter
 * @param {*} contractNetworks
 * @param {*} safeAccountConfig
 * @returns  safeSdk
 */
const createSafe = async (ethAdapter, contractNetworks, safeAccountConfig) => {
    const safeFactory = await SafeFactory.create({
        ethAdapter,
        contractNetworks,
    });
    const safeSdk = await safeFactory.deploySafe({ safeAccountConfig });
    return safeSdk;
};

/**
 * connect to an existing safe
 * @param {*} ethAdapter
 * @param {*} contractNetworks
 * @param {*} safeAddress
 * @returns safeSdk instance
 */
const connectToSafe = async (ethAdapter, contractNetworks, safeAddress) => {
    return await Safe.create({
        ethAdapter,
        safeAddress: ethers.utils.getAddress(safeAddress),
        contractNetworks,
    });
};

/**
 * @description 
 * Fund a safe from an account
 * @param {'address': string} to
 * @param {'amount': number} value
 * @returns transactionResponse
 */
const fundSafe = async (to, value) => {
    const sendEther = {
        to,
        value: ethers.utils.parseUnits(value.toString(), "ether").toHexString(),
    };
    const sendToSafe = await wallet.sendTransaction(sendEther);
    return sendToSafe.transactionResponse?.wait;
};

/**
 * @description Interacting with the multi sig Safe wallet.
 * Create a Transaction of type {SafeTransactionDataPartial}.
 * Sign the Transaction by the required amount of delegate.
 * And then execute the transaction
 * @param {*} safeSdk
 * @returns transactionResponse
 */
const debitSafe = async (safeSdk, transactionRequest, safeAddress) => {

    const safeTransaction = await safeSdk.createTransaction(transactionRequest);
    const safeTransactionHash = await safeSdk.getTransactionHash(safeTransaction);
    const creatorApprove = safeSdk.approveTransactionHash(safeTransactionHash);
    await creatorApprove.transactionResponse?.wait();

    const nextDelegateSafeSdk = await safeSdk.connect({
        ethAdapter: await getNextDelegateEthAdapter(),
        safeAddress: ethers.utils.getAddress(safeAddress),
    });

    const execute = await nextDelegateSafeSdk.executeTransaction(safeTransaction);
    return execute.transactionResponse?.wait();
};
module.exports = {
    fundSafe,
    debitSafe,
    createSafe,
    connectToSafe,
};

// @TODO: create a function for delegate to sign transaction

/**
 * 
 * @returns 
 */
const transactionRequest = async () => {
    return {
        to: ethers.utils.getAddress("0x8d7d02240849375f49B40729Ffcd2857313e09B3"),
        data: "0x",
        value: ethers.utils.parseUnits("0.0005", "ether").toHexString(),
    };

}