const gnosisAddress = require("./deployment/contract.js");
const { getChainId, ethAdapter } = require("./util/adapter.js");
const { SafeFactory } = require("@gnosis.pm/safe-core-sdk");
const Safe = require("@gnosis.pm/safe-core-sdk")["default"];

// If the Safe contracts are not deployed to your current network, the property contractNetworks will be required to point to the addresses of the Safe contracts previously deployed by you.

const main = async () => {
  try {
    const id = await getChainId();
    console.log(id);
    const contractNetwork = {
      [id]: {
        multiSendAddress: '0xA238CBeb142c10Ef7Ad8442C6D1f9E89e07e7761',
        safeMasterCopyAddress: '0xd9Db270c1B5E3Bd161E8c8503c55cEABeE709552',
        safeProxyFactoryAddress: '0xa6B71E26C5e0845f74c812102Ca7114b6a896AB2',
      },
    };
    const safeFactory = await SafeFactory.create({
      ethAdapter,
      contractNetworks: contractNetwork,
    });
    const safeAccountConfig = {
      owners: [
        "0xc62661BAe6E8346725305318476521E87977E371",
        "0x367b2ee9236949ED95BDbA2c9d97D23ee6066967",
        "0x8d7d02240849375f49B40729Ffcd2857313e09B3",
      ],
      threshold: 2,
    };
    const safeSdk = await safeFactory.deploySafe({ safeAccountConfig });
    return safeSdk.getAddress();
  } catch (error) {
    console.log(error);
    return error.message;
  }
};
main();
// const safeAccountConfig: SafeAccountConfig = {
//   owners: ['0x...', '0x...', '0x...'],
//   threshold: 2,
//   ... (optional params)
// }
// const safeSdk = await safeFactory.deploySafe({ safeAccountConfig })
