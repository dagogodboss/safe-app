require('dotenv').config();
const config = {
    iotexMainNodeUrl: 'https://babel-api.mainnet.iotex.io',
    iotexTestNodeUrl: 'https://babel-api.testnet.iotex.io',
    rinkeby: `https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`,
    iotexPrivateKey: process.env.IO_PV_KEY,
    network: process.env.NETWORK,
    rinkebyPrivateKey: process.env.RN_PV_KEY,
    nextDelegatePrivateKey: process.env.DELEGATE_PRIVATE_KEY,
}
module.exports = config;
