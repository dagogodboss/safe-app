const { ethers } = require("ethers");
const config = require("./config");
const EthersAdapter = require("@gnosis.pm/safe-ethers-lib")["default"];
const {
    iotexMainNodeUrl,
    iotexTestNodeUrl,
    rinkeby,
    iotexPrivateKey,
    network,
    rinkebyPrivateKey,
    nextDelegatePrivateKey,
} = config;

let url = iotexMainNodeUrl, provider = new ethers.providers.JsonRpcProvider(url), privateKey = iotexPrivateKey;

if (network == 'rinkeby') {
    url = rinkeby;
    provider = rinkebyProvider();
    privateKey = rinkebyPrivateKey;
} else if (network == 'iotex-testnet') {
    url = iotexTestNodeUrl;
    provider = new ethers.providers.JsonRpcProvider(url);
}

const wallet = new ethers.Wallet(
    privateKey,
    provider
);
const getEthAdapter = async () => {
    const account = await wallet.connect(provider);
    const ethAdapter = new EthersAdapter({
        ethers,
        signer: account,
    });
    return ethAdapter;
}

const getNextDelegateEthAdapter = async () => {
    const wallet = new ethers.Wallet(nextDelegatePrivateKey, provider);
    const account = await wallet.connect(provider);
    return new EthersAdapter({
        ethers,
        signer: account,
    })
}

const getChainId = async () => {
    return await (await getEthAdapter()).getChainId();
};

const rinkebyProvider = () => {
    return new ethers.providers.InfuraProvider("rinkeby", {
        projectId: process.env.INFURA_ID,
        projectSecret: process.env.INFURA_KEY,
    });
}
module.exports = {
    wallet,
    getEthAdapter,
    getChainId,
    getNextDelegateEthAdapter
};
