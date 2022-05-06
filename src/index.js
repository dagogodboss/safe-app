const gnosisAddress = require("./deployment/contract.js");
const { getChainId, getEthAdapter, wallet, infuraProvider } = require("./util/adapter.js");
const { SafeFactory } = require("@gnosis.pm/safe-core-sdk");
const { ethers } = require("ethers");
const Safe = require("@gnosis.pm/safe-core-sdk")["default"];

// If the Safe contracts are not deployed to your current network, the property contractNetworks will be required to point to the addresses of the Safe contracts previously deployed by you.

const main = async () => {
  try {
    const id = await getChainId();
    console.log(id);
    const ethAdapter = await getEthAdapter()
    const contractNetwork = {
      [id]: {
        multiSendAddress: '0xA238CBeb142c10Ef7Ad8442C6D1f9E89e07e7761',
        safeMasterCopyAddress: '0xd9Db270c1B5E3Bd161E8c8503c55cEABeE709552',
        safeProxyFactoryAddress: '0xa6B71E26C5e0845f74c812102Ca7114b6a896AB2'
      },
    };
    // const safeFactory = await SafeFactory.create({
    //   ethAdapter,
    //   contractNetworks: contractNetwork,
    // });
    const safeAccountConfig = {
      owners: [
        "0xc62661BAe6E8346725305318476521E87977E371",
        "0x367b2ee9236949ED95BDbA2c9d97D23ee6066967",
        "0x8d7d02240849375f49B40729Ffcd2857313e09B3",
      ],
      threshold: 2,
    };
    // const safeSdk = await Safe.deploySafe({ safeAccountConfig });
    const safeSdk = await Safe.create({
      ethAdapter,
      safeAddress: '0x396BE8785f2f34133A6c70070193D94991C17DF2'
    })
    console.log(safeSdk.getAddress())
    safeSdk.getAddress();
    // const sendEther = {
    //   to: safeSdk.getAddress(),
    //   value: ethers.utils.parseUnits("0.004", 'ether').toHexString()
    // };
    // const signedHash = await wallet.signTransaction(sendEther);
    // console.log(signedHash);
    // const sendToSafe = await wallet.sendTransaction(sendEther);
    // console.log(sendToSafe);
    sendFromSafe = {
      from: safeSdk.getAddress(),
      to: '0x8d7d02240849375f49B40729Ffcd2857313e09B3',
      value: ethers.utils.parseUnits("0.0005", 'ether').toHexString()
    }
    const safeSend = await safeSdk.createTransaction(sendFromSafe);

    const safeTransaction = safeSdk.getTransactionHash(safeSend);
    const adminApprove = safeSdk.approveTransactionHash(safeTransaction)
    await adminApprove.transactionResponse?.wait();


  } catch (error) {
    console.log(error);
    return error.message;
  }
};
main();
