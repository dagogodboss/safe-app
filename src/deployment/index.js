
const { rinkebyGnosisAddress, iotexTestNetGnosisAddress, iotexGnosisAddress } = require("./contract.js");

const delegates = {
    owners: [
        process.env.OWNER1,
        process.env.OWNER2,
        process.env.OWNER3
    ],
    threshold: process.env.THRESHOLD,
}

const getContractNetworks = (network, id) => {
    switch (network) {
        case 'rinkeby':
            return {
                [id]: {
                    multiSendAddress: rinkebyGnosisAddress.MultiSend,
                    safeMasterCopyAddress: rinkebyGnosisAddress.GnosisSafe,
                    safeProxyFactoryAddress: rinkebyGnosisAddress.GnosisSafeProxyFactory,
                },
            };
        case 'iotex-testnet':
            return {
                [id]: {
                    multiSendAddress: iotexTestNetGnosisAddress.MultiSend,
                    safeMasterCopyAddress: iotexTestNetGnosisAddress.GnosisSafe,
                    safeProxyFactoryAddress: iotexTestNetGnosisAddress.GnosisSafeProxyFactory,
                }
            }
        default:
            return {
                [id]: {
                    multiSendAddress: iotexGnosisAddress.MultiSend,
                    safeMasterCopyAddress: iotexGnosisAddress.GnosisSafe,
                    safeProxyFactoryAddress: iotexGnosisAddress.GnosisSafeProxyFactory,
                }
            }
    }
}

module.exports = {
    getContractNetworks,
    delegates
}