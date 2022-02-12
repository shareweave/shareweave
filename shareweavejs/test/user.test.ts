import { } from "../src/globals"
import { jest } from '@jest/globals'
import UserAPI from "../src/user"
import { SelfID } from "@self.id/web"
jest.mock("@self.id/web")


describe("user module", () => {
  (SelfID.authenticate as jest.Mock).mockResolvedValue({
    get: (something: string) => {
      if (something === "basicProfile") {
        return JSON.parse(
          `{ "name": "ian", "description": "i do stuff cooly", "image": { "original": { "src": "ipfs://QmWeiZZMtApwLiwXjDqUoUdbzMDTDibnJDxkgPXaXxNXFo", "size": 1910471, "width": 3890, "height": 2307, "mimeType": "image/jpeg" }, "alternatives": [ { "src": "ipfs://QmaVRABtKWnAnisKyb7Zmq2FeCrcGPGV9FgiSCZbuC5fvp", "size": 14221, "width": 253, "height": 150, "mimeType": "image/jpeg" } ] }, "background": { "original": { "src": "ipfs://QmWeiZZMtApwLiwXjDqUoUdbzMDTDibnJDxkgPXaXxNXFo", "size": 1910471, "width": 3890, "height": 2307, "mimeType": "image/jpeg" }, "alternatives": [] }, "emoji": "h", "homeLocation": "localhost", "residenceCountry": "US", "url": "https://code3z.github.io" }`
        )
      }
    },
  })
  const user = new UserAPI()
  it("should create user", () => {
    expect(user).toBeTruthy()
  })

  it("should login", () => {
    return user
      .login()
      .then(() => {
        console.log(user)
        expect(user.profile.address).toMatch(/0x/)
      })
      .catch((error) => console.error(error))
  })
})
