import { } from "../../src/globals"
import getCurrentDateString from "./date"
describe("dates", () => {
    it("should work", () => {
        expect(getCurrentDateString().includes('2022')).toBeTruthy()
    })
})
