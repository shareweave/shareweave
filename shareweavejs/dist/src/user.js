var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
var _UserAPI_selfID, _UserAPI_profileData, _UserAPI_addresses;
import { SelfID } from '@self.id/web';
import { EthereumAuthProvider } from '@3id/connect';
import { verifyMessage, splitSignature } from 'ethers/lib/utils';
import { Buffer } from 'buffer/';
import newGetImageFunction from './utils/getImage';
console.log(window.ethereum);
const ethereum = window.ethereum;
//if (!ethereum) throw new Error('ethereum not found, please install metamask')
export default class UserAPI {
    constructor() {
        // private variables for the class
        _UserAPI_selfID.set(this, void 0);
        _UserAPI_profileData.set(this, void 0);
        _UserAPI_addresses.set(this, void 0);
    }
    // this function must not prompt the user if already logged in:
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            // The following assumes there is an injected `ethereum` provider
            __classPrivateFieldSet(this, _UserAPI_addresses, yield ethereum.request({
                method: 'eth_requestAccounts',
            }), "f");
            const self = yield SelfID.authenticate({
                authProvider: new EthereumAuthProvider(ethereum, __classPrivateFieldGet(this, _UserAPI_addresses, "f")[0]),
                ceramic: 'testnet-clay',
                connectNetwork: 'testnet-clay',
            });
            __classPrivateFieldSet(this, _UserAPI_profileData, yield self.get('basicProfile'), "f");
            __classPrivateFieldSet(this, _UserAPI_selfID, self, "f");
            // debug
            // window.selfID = self
        });
    }
    logout() {
        // clear any data saved locally, any auth stuff
        // then reload
        document.location.reload();
    }
    auth() {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO
        });
    }
    get profile() {
        /* allow for viewing but not setting profile data
        *  using a property not a promise */
        if (!(__classPrivateFieldGet(this, _UserAPI_profileData, "f") && __classPrivateFieldGet(this, _UserAPI_addresses, "f")))
            throw new Error('User not logged in');
        return Object.assign(Object.assign({}, __classPrivateFieldGet(this, _UserAPI_profileData, "f")), { address: __classPrivateFieldGet(this, _UserAPI_addresses, "f")[0], getImage: newGetImageFunction(__classPrivateFieldGet(this, _UserAPI_profileData, "f").image), getBackground: newGetImageFunction(__classPrivateFieldGet(this, _UserAPI_profileData, "f").image) });
    }
    get isLoggedIn() {
        // ternary
        return __classPrivateFieldGet(this, _UserAPI_profileData, "f") ? true : false;
    }
    setProfile(data) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            // we'll merge the existing data with any new data
            const result = yield ((_a = __classPrivateFieldGet(this, _UserAPI_selfID, "f")) === null || _a === void 0 ? void 0 : _a.merge('basicProfile', data));
            // then refresh our profile data
            __classPrivateFieldSet(this, _UserAPI_profileData, yield ((_b = __classPrivateFieldGet(this, _UserAPI_selfID, "f")) === null || _b === void 0 ? void 0 : _b.get('basicProfile')), "f");
            return result;
        });
    }
    get did() {
        var _a;
        // get the w3c decentralized identifier
        return (_a = __classPrivateFieldGet(this, _UserAPI_selfID, "f")) === null || _a === void 0 ? void 0 : _a.did;
    }
    sign(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(__classPrivateFieldGet(this, _UserAPI_profileData, "f") && __classPrivateFieldGet(this, _UserAPI_addresses, "f")))
                throw new Error('User not logged in');
            /*  const provider = new ethers.providers.Web3Provider(ethereum)
              const signer = provider.getSigner()
              return await signer.signMessage(data) */
            const msg = `0x${Buffer.from(data, 'utf8').toString('hex')}`;
            return yield ethereum.request({
                method: 'personal_sign',
                params: [msg, __classPrivateFieldGet(this, _UserAPI_addresses, "f")[0], 'Example password'],
            });
        });
    }
    verify(data, signature) {
        const splitSig = splitSignature(signature);
        return verifyMessage(data, splitSig);
    }
}
_UserAPI_selfID = new WeakMap(), _UserAPI_profileData = new WeakMap(), _UserAPI_addresses = new WeakMap();
