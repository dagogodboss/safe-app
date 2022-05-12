/** @format */

const { getChainId, getEthAdapter } = require("./util/adapter.js");
const { network } = require("./util/config.js");
const { createSafe, connectToSafe } = require("./util/safeManager.js");
const { getContractNetworks, delegates } = require("./deployment");

const main = async () => {
  try {
    const ethAdapter = await getEthAdapter()
    const contractNetworks = getContractNetworks(network, await getChainId())
    /**
    *  @description Config the Accounts and number of Signers required for a Safe.
    *  @description First time create a Safe Use the Factory Library
    */
    const newSafeSdk = await createSafe(ethAdapter, contractNetworks, delegates);

    console.log(newSafeSdk.getAddress());
    return newSafeSdk.getAddress();
    /**
     *  @description Reconnection to an existing Safe multi Sig Wallet
     * @params safeAddress: The address to connect to, 
     const safeSdk = await connectToSafe(ethAdapter, contractNetworks, newSafeSdk.getAddress());
     console.log(safeSdk.getAddress());
     */

  } catch (error) {
    console.log(error);
    return error.message;
  }
};
main();


