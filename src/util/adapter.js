const { ethers } = require("ethers");
const EthersAdapter = require("@gnosis.pm/safe-ethers-lib")["default"];

// const url = "https://babel-api.testnet.iotex.io";
// const provider = new ethers.providers.JsonRpcProvider(url);
const safeOwner = "0xc62661BAe6E8346725305318476521E87977E371";
const infuraProvider = new ethers.providers.InfuraProvider("rinkeby", {
    projectId: "d5ad5505c3714449aed188c4971a49f4",
    projectSecret: "ad0b4db6d1184da5be2b1959655406b4",
});
// const signer = infuraProvider.getSigner(safeOwner);

const privateKey = '0x7e853aca230bcc4cf0710b25f84ae400283081537ab5f2a4e1b1607a627a4837';
const wallet = new ethers.Wallet(
    privateKey,
    infuraProvider
);
const getEthAdapter = async () => {
    const account = await wallet.connect(infuraProvider);
    const ethAdapter = new EthersAdapter({
        ethers,
        signer: account,
    });
    return ethAdapter;
}

const privateKey2 = '0x80ea3f76d28b7487afe9f89264d8f61fb86448deff112f381419c4fc58a383d6';
const wallet2 = new ethers.Wallet(privateKey2, infuraProvider);

const getSecondDelegateEthAdapter = async () => {
    const account = await wallet2.connect(infuraProvider);
    return new EthersAdapter({
        ethers,
        signer: account,
    })
}
const getChainId = async () => {
    return await (await getEthAdapter()).getChainId();
};

module.exports = {
    wallet,
    getEthAdapter,
    infuraProvider,
    getChainId,
    getSecondDelegateEthAdapter
};
