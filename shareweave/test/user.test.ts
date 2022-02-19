import {} from "../src/globals";
import UserAPI from "../src/user";
import { setupEthTesting } from "eth-testing";

jest.mock("@self.id/web", () => ({
  __esModule: true,
  SelfID: {
    authenticate: jest.fn(() => ({
      get: (something: string) => {
        return null;
      },
    })),
  },
}));
const { provider, testingUtils } = setupEthTesting({
  providerType: "MetaMask",
});
testingUtils.mockChainId("0x1");
testingUtils.mockAccounts(["0x138071e4e810f34265bd833be9c5dd96f01bd8a5"]);
testingUtils.mockRequestAccounts(
  ["0xf61B443A155b07D2b2cAeA2d99715dC84E839EEf"],
  { chainId: "0x1" }
);
jest.mock("../src/user/login-ui", () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({ web3Provider: provider })),
}));
import { SelfID } from "@self.id/web";

describe("user module", () => {
  const user = new UserAPI();
  it("should create user", () => {
    expect(user).toBeTruthy();
  });

  it("should login", () => {
    return user
      .login()
      .then(() => {
        expect(user.profile.address).toMatch(/0x/);
      })
      .catch((error) => console.error(error));
  });

  it("should have profile", () => {
    return user
      .login()
      .then(() => {
        expect(user.profile.name).toBeTruthy();
      })
      .catch((error) => console.error(error));
  });
});
