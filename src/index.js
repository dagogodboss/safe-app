
const { getChainId, getEthAdapter, wallet, infuraProvider, getSecondDelegateEthAdapter } = require("./util/adapter.js");
const { SafeFactory } = require("@gnosis.pm/safe-core-sdk");
const { ethers } = require("ethers");
const Safe = require("@gnosis.pm/safe-core-sdk")["default"];
const { SafeTransactionDataPartial } = require('@gnosis.pm/safe-core-sdk-types')
// If the Safe contracts are not deployed to your current network, the property contractNetworks will be required to point to the addresses of the Safe contracts previously deployed by you.

const main = async () => {
  try {
    const id = await getChainId();
    const ethAdapter = await getEthAdapter()
    const contractNetwork = {
      [id]: {
        multiSendAddress: '0xA238CBeb142c10Ef7Ad8442C6D1f9E89e07e7761',
        safeMasterCopyAddress: '0xd9Db270c1B5E3Bd161E8c8503c55cEABeE709552',
        safeProxyFactoryAddress: '0xa6B71E26C5e0845f74c812102Ca7114b6a896AB2'
      },
    };
    /**
    *  @description Config the Accounts and number of Signers required for a Safe.
    */
    const safeAccountConfig = {
      owners: [
        "0xc62661BAe6E8346725305318476521E87977E371",
        "0x367b2ee9236949ED95BDbA2c9d97D23ee6066967",
        "0x8d7d02240849375f49B40729Ffcd2857313e09B3",
      ],
      threshold: 2,
    };
    /**
     * @description First time create a Safe Use the Factory Library
     
      // const safeFactory = await SafeFactory.create({
      //   ethAdapter,
      //   contractNetworks: contractNetwork,
      // });
      // const safeSdk = await Safe.deploySafe({ safeAccountConfig });
    */

    /**
     *  @Description Reconnection to an existing Safe multi Sig Wallet
     * @params safeAddress: The address to connect to, 
    */

    const safeSdk = await Safe.create({
      ethAdapter,
      safeAddress: '0x396BE8785f2f34133A6c70070193D94991C17DF2'
    })
    safeSdk.getAddress();
    /**
     * Send Funds to the Safe
     // const sendEther = {
     //   to: safeSdk.getAddress(),
     //   value: ethers.utils.parseUnits("0.004", 'ether').toHexString()
     // };
     // const signedHash = await wallet.signTransaction(sendEther);
     // console.log(signedHash);
     // const sendToSafe = await wallet.sendTransaction(sendEther);
     // console.log(sendToSafe);
    */

    /**
     * @description Interacting with the multi sig Safe wallet
     * So Create a Transaction of type :SafeTransactionDataPartial
     * So sign the Transaction by the required amount of delegate
     * And then execute the transaction
     */
    SafeTransactionDataPartial
    const sendFromSafe = {
      to: ethers.utils.getAddress('0x8d7d02240849375f49B40729Ffcd2857313e09B3'),
      data: '0x',
      value: ethers.utils.parseUnits("0.0005", 'ether').toHexString()
    }

    const sendSmart = {
      to: ethers.utils.getAddress('0x8d7d02240849375f49B40729Ffcd2857313e09B3'),
      data: '0x60a060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055503373ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff1660601b81525050601660018190555060805160601c6101ec6100ad6000398061013352506101ec6000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c8063c1ae07cc14610046578063c29855781461007a578063d5f39488146100fd575b600080fd5b61004e610131565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b610082610155565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100c25780820151818401526020810190506100a7565b50505050905090810190601f1680156100ef5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b610105610192565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b7f000000000000000000000000000000000000000000000000000000000000000081565b60606040518060400160405280600381526020017f6261720000000000000000000000000000000000000000000000000000000000815250905090565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff168156fea26469706673582212203c59d6950309b7226dc069015f04ef5aecd7fa93a45cb8c184f53db29b24569c64736f6c63430007060033',
      value: '0x'
    }

    const safeTransaction = await safeSdk.createTransaction(sendSmart);
    const safeTransactionHash = await safeSdk.getTransactionHash(safeTransaction);
    const creatorApprove = safeSdk.approveTransactionHash(safeTransactionHash)
    await creatorApprove.transactionResponse?.wait();

    const nextDelegateSafeSdk = await safeSdk.connect({
      ethAdapter: await getSecondDelegateEthAdapter(),
      safeAddress: '0x396BE8785f2f34133A6c70070193D94991C17DF2',
    })

    // const nextDelegateTransaction = nextDelegateSafeSdk.createTransaction(sendFromSafe);
    const execute = await nextDelegateSafeSdk.executeTransaction(safeTransaction);
    execute.transactionResponse?.wait();

  } catch (error) {
    console.log(error);
    return error.message;
  }
};
main();
