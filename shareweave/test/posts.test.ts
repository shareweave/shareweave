import { } from "../src/globals"
import PostList from '../src/posts'

describe("posts API", () => {
    const posts = new PostList('Shareweave-Test')
    it("should create a list of posts", () => {
        expect(posts).toBeTruthy()
    })

    /*    it("should query posts", () => {
            expect(posts.query({})).toBeTruthy()
        }) */
})