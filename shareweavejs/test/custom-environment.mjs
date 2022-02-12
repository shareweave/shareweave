import Environment from "jest-environment-jsdom";
import { TextDecoder, TextEncoder } from "util";
import { setupEthTesting } from "eth-testing";

export default class CustomTestEnvironment extends Environment {
  async setup() {
    await super.setup();
    if (typeof this.global.TextEncoder === "undefined") {
      this.global.TextEncoder = TextEncoder;
      this.global.TextDecoder = TextDecoder;
    }
    if (typeof this.global.ethereum === "undefined") {
      const { provider, testingUtils } = setupEthTesting({
        providerType: "MetaMask",
      });
      testingUtils.mockChainId("0x1");
      testingUtils.mockRequestAccounts(
        ["0xf61B443A155b07D2b2cAeA2d99715dC84E839EEf"],
        { chainId: "0x1" }
      );
      this.global.ethereum = provider;
    }
  }
}
