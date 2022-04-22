const { ethers } = require("ethers");
const EthersAdapter = require("@gnosis.pm/safe-ethers-lib")["default"];

const url = "https://rinkeby.infura.io/v3/4eaba2cca518401591bcd1e5c17b0e21";
const provider = new ethers.providers.JsonRpcProvider(url);
const safeOwner = "0xc62661BAe6E8346725305318476521E87977E371";
const signer = provider.getSigner(safeOwner);

const ethAdapter = new EthersAdapter({
    ethers,
    signer: signer,
});

const getChainId = async () => {
    return await ethAdapter.getChainId();
};

module.exports = {
    ethAdapter,
    getChainId,
};
