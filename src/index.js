import Safe, { SafeFactory } from '@gnosis.pm/safe-core-sdk'
import { gnosisAddress } from './deployment/contract.js';
import { getChainId, ethAdapter } from './util/adapter.js';


// const txServiceUrl = 'https://safe-transaction.gnosis.io'
// const safeService = new SafeServiceClient({ txServiceUrl, ethAdapter })
const safeAddress = gnosisAddress.GnosisSafeL2;

// If the Safe contracts are not deployed to your current network, the property contractNetworks will be required to point to the addresses of the Safe contracts previously deployed by you.

const contractNetworks = async () => {
  const id = await getChainId();
  return {
    [id]: {
      multiSendAddress: gnosisAddress.MultiSend,
      safeMasterCopyAddress: gnosisAddress.GnosisSafe,
      safeProxyFactoryAddress: gnosisAddress.GnosisSafeProxyFactory
    }
  }

}

const safeFactory = (async () => {
  const network = await contractNetworks();
  const safeFactoryStore = await SafeFactory.create({ ethAdapter, network })
  console.log(safeFactoryStore)
})()

const safeSdk = (async () => {
  const network = await contractNetworks();
  const safeSdkStore = await Safe.create({ ethAdapter, safeAddress, network });
  console.log(safeSdkStore)
})()

// const safeAccountConfig: SafeAccountConfig = {
//   owners: ['0x...', '0x...', '0x...'],
//   threshold: 2,
//   ... (optional params)
// }
// const safeSdk = await safeFactory.deploySafe({ safeAccountConfig })