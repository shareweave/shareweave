// polyfill node global
window.global = window
// ... then import 3ID Connect
import { EthereumAuthProvider, ThreeIdConnect } from '@3id/connect'
import { Core } from '@self.id/core'
import { DID } from 'dids'
import KeyDidResolver from 'key-did-resolver'
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'
import { CeramicClient } from '@ceramicnetwork/http-client'

// this is for metamask,
// we should have an option to use another wallet or web2 login
const ethereum = window.ethereum
const threeIdConnect = new ThreeIdConnect()

if (ethereum) {
    const ceramic = new CeramicClient('https://ceramic-clay.3boxlabs.com')

    // or use one of the preconfigured option
    const core = new Core({ ceramic: 'mainnet-gateway' })
    const addresses = await ethereum.enable()

    // ethProvider is an Ethereum provider and addresses an array of strings

    const authProvider = new EthereumAuthProvider(ethereum, addresses[0])
    await threeIdConnect.connect(authProvider)

    // create a w3c decentralized identifier from ethereum wallet
    const provider = threeIdConnect.getDidProvider()
    const resolver = {
        ...KeyDidResolver.getResolver(),
        ...ThreeIdResolver.getResolver(ceramic),
    }
    const did = new DID({ provider, resolver })

    // Authenticate with the provider
    await did.authenticate()

    // Create a JWS - this will throw an error if the DID instance is not authenticated
    // const jws = await did.createJWS({ hello: 'world' })

    // Get a profile from https://self.id
    const profile = await core.get('basicProfile', did.id)

    console.log(profile) // null??
    globalThis.did = did
}


export default threeIdConnect