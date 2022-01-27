var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _UserAPI_selfID, _UserAPI_profileData;
import { EthereumAuthProvider, SelfID } from '@self.id/web';
// todo: web2 login, see github issue
// @ts-expect-error window.ethereum not defined in TS
const ethereum = window.ethereum;
if (!ethereum)
    throw new Error('ethereum not found, please install metamask');
export default class UserAPI {
    constructor() {
        // private variables for the class
        _UserAPI_selfID.set(this, void 0);
        _UserAPI_profileData.set(this, void 0);
    }
    // this function must not prompt the user if already logged in:
    async login() {
        // The following assumes there is an injected `ethereum` provider
        const addresses = await ethereum.request({
            method: 'eth_requestAccounts',
        });
        const self = await SelfID.authenticate({
            authProvider: new EthereumAuthProvider(ethereum, addresses[0]),
            ceramic: 'testnet-clay',
            connectNetwork: 'testnet-clay',
        });
        __classPrivateFieldSet(this, _UserAPI_profileData, await self.get('basicProfile'), "f");
        __classPrivateFieldSet(this, _UserAPI_selfID, self, "f");
        // debug
        window.selfID = SelfID;
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
        return __classPrivateFieldGet(this, _UserAPI_profileData, "f");
    }
    get isLoggedIn() {
        // ternary
        return __classPrivateFieldGet(this, _UserAPI_profileData, "f") ? true : false;
    }
    async setProfile(data) {
        // we'll merge the existing data with any new data
        const result = await __classPrivateFieldGet(this, _UserAPI_selfID, "f").merge('basicProfile', data);
        // then refresh our profile data
        __classPrivateFieldSet(this, _UserAPI_profileData, await __classPrivateFieldGet(this, _UserAPI_selfID, "f").get('basicProfile'), "f");
        return result;
    }
    get did() {
        // get the w3c decentralized identifier
        return __classPrivateFieldGet(this, _UserAPI_selfID, "f").did;
    }
}
_UserAPI_selfID = new WeakMap(), _UserAPI_profileData = new WeakMap();
//# sourceMappingURL=user.js.map