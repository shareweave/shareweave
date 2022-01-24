import { EthereumAuthProvider, SelfID } from '@self.id/web'

/* the schema for a basic profile, this is followed by self ID and should also be followed by
our web2 login, see  https://github.com/ceramicstudio/datamodels/tree/main/packages/identity-profile-basic */
import type { BasicProfile } from '@datamodels/identity-profile-basic'

// todo: web2 login, see github issue
// @ts-expect-error window.ethereum not defined in TS
const ethereum = window.ethereum
if (!ethereum) throw new Error('ethereum not found, please install metamask')
export default class UserAPI {
    // private variables for the class
    #selfID: SelfID
    #profileData: BasicProfile
    // this function must not prompt the user if already logged in:
    async login() {
        // The following assumes there is an injected `ethereum` provider
        const addresses = await ethereum.request({
            method: 'eth_requestAccounts',
        })

        const self = await SelfID.authenticate({
            authProvider: new EthereumAuthProvider(ethereum, addresses[0]),
            ceramic: 'testnet-clay',
            connectNetwork: 'testnet-clay',
        })
        this.#profileData = await self.get('basicProfile')
        this.#selfID = self
        // debug
        window.selfID = SelfID
    }
    async logout() {
        //  TODO
    }
    async auth() {
        // TODO
    }
    get profile() {
        // allow for viewing but not setting profile data
        // using a property not a promise
        return this.#profileData
    }
    get isLoggedIn() {
        // ternary
        return this.#profileData ? true : false
    }
    async setProfile(data) {
        // we'll merge the existing data with any new data
        const result = await this.#selfID.merge('basicProfile', data)
        // then refresh our profile data
        this.#profileData = await this.#selfID.get('basicProfile')
        return result
    }
    get did() {
        // get the w3c decentralized identifier
        return this.#selfID.did
    }
}