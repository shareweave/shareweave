import { EthereumAuthProvider, SelfID } from '@self.id/web'

// The following assumes there is an injected `window.ethereum` provider
const addresses = await window.ethereum.request({
    method: 'eth_requestAccounts',
})

// The following configuration assumes your local node is connected to the Clay testnet
const self = await SelfID.authenticate({
    authProvider: new EthereumAuthProvider(window.ethereum, addresses[0]),
    ceramic: 'testnet-clay',
    connectNetwork: 'testnet-clay',
})

await self.set('basicProfile', { name: 'Alice' })

globalThis.selfID = self

export default {}