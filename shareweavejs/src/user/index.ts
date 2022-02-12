import { SelfID } from "@self.id/web";
import { EthereumAuthProvider } from "@3id/connect";
import { splitSignature, verifyMessage } from "ethers/lib/utils";
import { Buffer } from "buffer/";
import newGetImageFunction from "../utils/getImage";
import renderLoginComponent from "./login-ui";
import defaultProfile from "./default-profile";
/* the schema for a basic profile, this is followed by self ID and should also be followed by
our web2 login, see  https://github.com/ceramicstudio/datamodels/tree/main/packages/identity-profile-basic */
import type { BasicProfile } from "@datamodels/identity-profile-basic";

//if (!ethereum) throw new Error('ethereum not found, please install metamask')
export default class UserAPI {
  // private variables for the class
  #selfID: SelfID | undefined;
  #profileData: BasicProfile | null | undefined;
  #addresses: [string] | undefined;
  ethereum: any;
  // this function must not prompt the user if already logged in:
  async login() {
    this.ethereum = (await renderLoginComponent()).web3Provider;
    // The following assumes there is an injected `ethereum` provider
    this.#addresses = (await this.ethereum.request({
      method: "eth_requestAccounts",
    })) as [string];
    const self = await SelfID.authenticate({
      authProvider: new EthereumAuthProvider(this.ethereum, this.#addresses[0]),
      ceramic: "testnet-clay",
      connectNetwork: "testnet-clay",
    });
    this.#profileData = {
      ...defaultProfile,
      ...(await self.get("basicProfile")),
    };
    this.#selfID = self;
    // debug
    // window.selfID = self
  }
  logout() {
    // clear any data saved locally, any auth stuff

    // then reload
    document.location.reload();
  }
  async auth() {
    // TODO
  }
  get profile() {
    /* allow for viewing but not setting profile data
     *  using a property not a promise */
    if (!(this.#profileData && this.#addresses)) {
      throw new Error("User not logged in");
    }
    return {
      ...this.#profileData,
      address: this.#addresses[0],
      getImage: newGetImageFunction(this.#profileData.image),
      getBackground: newGetImageFunction(this.#profileData.image),
    };
  }
  get isLoggedIn() {
    // ternary
    return this.#profileData ? true : false;
  }
  async setProfile(data: BasicProfile) {
    // we'll merge the existing data with any new data
    const result = await this.#selfID?.merge("basicProfile", data);
    // then refresh our profile data
    this.#profileData = await this.#selfID?.get("basicProfile");
    return result;
  }
  get did() {
    // get the w3c decentralized identifier
    return this.#selfID?.did;
  }
  async sign(data: string) {
    if (!(this.#profileData && this.#addresses)) {
      throw new Error("User not logged in");
    }
    /*  const provider = new ethers.providers.Web3Provider(ethereum)
          const signer = provider.getSigner()
          return await signer.signMessage(data) */
    const msg = `0x${Buffer.from(data, "utf8").toString("hex")}`;
    return await this.ethereum.request({
      method: "personal_sign",
      params: [msg, this.#addresses[0], "Example password"],
    });
  }
  verify(data: string, signature: string) {
    const splitSig = splitSignature(signature);
    return verifyMessage(data, splitSig);
  }
}
