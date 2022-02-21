import { } from "../src/globals"
import PostList from "../src/posts"
import UserAPI from "../src/user"

describe("posts API", () => {
  const posts = new PostList("shareweave-test", new UserAPI())
  it("should create a list of posts", () => {
    expect(posts).toBeTruthy()
  })

  /*    it("should query posts", () => {
            expect(posts.query({})).toBeTruthy()
        }) */
})
