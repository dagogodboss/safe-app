import Web3 from 'web3'
import Web3Adapter from '@gnosis.pm/safe-web3-lib';




const url = 'https://babel-api.mainnet.iotex.io';
const web3Provider = new Web3.providers.HttpProvider(url);
const safeOwner = '0xc62661BAe6E8346725305318476521E87977E371'

export const ethAdapter = new Web3Adapter({
    web3Provider,
    signerAddress: safeOwner
})



export const getChainId = async () => {
    return await ethAdapter.getChainId()
}