import { Buffer } from "buffer/"
// @ts-expect-error
globalThis.Buffer = Buffer
globalThis.process = globalThis.process || { env: '' }
import { SelfID } from "@self.id/web"
import { EthereumAuthProvider } from "@3id/connect"
import { splitSignature, verifyMessage, getAddress, hexlify, arrayify } from "ethers/lib/utils.js"

import newGetImageFunction from "../utils/getImage"
import renderLoginComponent from "./login-ui"
import defaultProfile from "./default-profile"
/* the schema for a basic profile, this is followed by self ID and should also be followed by
our web2 login, see  https://github.com/ceramicstudio/datamodels/tree/main/packages/identity-profile-basic */
import type { BasicProfile } from "@datamodels/identity-profile-basic"
import { EthEncryptedData } from "@metamask/eth-sig-util"
import { user } from "../gun"
interface UserOptions {
  onLogin?: (user: UserAPI) => void
}

function stringifiableToHex(value: any) {
  return hexlify(Buffer.from(JSON.stringify(value)))
}
export default class UserAPI {
  onLogin?: (user: UserAPI) => void
  // private variables for the class
  #selfID: SelfID | undefined
  #profileData: BasicProfile | null | undefined
  #addresses: [string] | undefined
  ethereum: any

  constructor({ onLogin }: UserOptions) {
    this.onLogin = onLogin || undefined
  }
  // this function must not prompt the user if already logged in:
  async login() {
    if (user.is) return
    this.ethereum = (await renderLoginComponent()).web3Provider
    // The following assumes there is an injected `ethereum` provider
    this.#addresses = (await this.ethereum.request({
      method: "eth_accounts",
    })) as [string]
    const self = await SelfID.authenticate({
      authProvider: new EthereumAuthProvider(this.ethereum, this.#addresses[0]),
      ceramic: "testnet-clay",
      connectNetwork: "testnet-clay",
    })
    this.#profileData = {
      ...defaultProfile,
      ...(await self.get("basicProfile")),
    }
    //  this.#selfID = self
    // debug
    // window.selfID = self
    console.log(this.#profileData)
    if (this.onLogin) await this.onLogin(this)
    return
  }
  logout() {
    // clear any data saved locally, any auth stuff

    // then reload
    document.location.reload()
  }
  async auth() {
    // TODO
  }
  get profile() {
    /* allow for viewing but not setting profile data
     *  using a property not a promise */
    if (!(this.#profileData && this.#addresses)) {
      throw new Error("User not logged in")
    }
    return {
      ...this.#profileData,
      address: getAddress(this.#addresses[0]),
      getImage: newGetImageFunction(this.#profileData.image),
      getBackground: newGetImageFunction(this.#profileData.image),
    }
  }
  get isLoggedIn() {
    // ternary
    return this.#profileData ? true : false
  }
  async setProfile(data: BasicProfile) {
    // we'll merge the existing data with any new data
    const result = await this.#selfID?.merge("basicProfile", data)
    // then refresh our profile data
    this.#profileData = await this.#selfID?.get("basicProfile")
    return result
  }
  get did() {
    // get the w3c decentralized identifier
    return this.#selfID?.did
  }
  async sign(data: string) {
    if (!(this.#profileData && this.#addresses)) {
      throw new Error("User not logged in")
    }
    /*  const provider = new ethers.providers.Web3Provider(ethereum)
          const signer = provider.getSigner()
          return await signer.signMessage(data) */
    const msg = `0x${Buffer.from(data, "utf8").toString("hex")}`
    return await this.ethereum.request({
      method: "personal_sign",
      params: [msg, this.#addresses[0], "Example password"],
    })
  }
  verify(data: string, signature: string) {
    const splitSig = splitSignature(signature)
    return getAddress(verifyMessage(data, splitSig))
  }
  async encrypt(data: string) {
    // doesn't work as a top level import?
    const { encrypt } = await import("@metamask/eth-sig-util")
    if (!(this.#profileData && this.#addresses)) {
      throw new Error("User not logged in")
    }
    const signature = await this.sign(data)
    const publicKey = await this.ethereum.request({
      method: 'eth_getEncryptionPublicKey',
      params: [this.#addresses[0]],
    })
    console.log(publicKey, signature, JSON.stringify({ sig: signature, data }))
    return encrypt({ data, publicKey, version: 'x25519-xsalsa20-poly1305' })
  }
  async decrypt(encryptedData: EthEncryptedData) {
    console.log(encryptedData.ciphertext, stringifiableToHex(encryptedData))
    return await this.ethereum.request({
      method: 'eth_decrypt',
      params: [stringifiableToHex(encryptedData), this.ethereum.selectedAddress],
    })
  }
}
