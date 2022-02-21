import UserAPI from "./user"
import PostList from "./posts"

interface Options { }
export default class Shareweave {
  user: UserAPI
  posts: PostList

  constructor(dataSet: string, options?: Options) {
    this.user = new UserAPI()
    this.posts = new PostList(dataSet, this.user)
  }
}
