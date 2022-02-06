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
      testingUtils.mockAccounts(["0x138071e4e810f34265bd833be9c5dd96f01bd8a5"]);
      testingUtils.lowLevel.mockRequest("eth_requestAccounts", [
        "0x138071e4e810f34265bd833be9c5dd96f01bd8a5",
      ]);
      this.global.ethereum = provider;
    }
  }
}
