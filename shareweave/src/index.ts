import UserAPI from "./user"
import PostList from "./posts"
import { set } from "./store"
import type { Options } from "./options"

export default class Shareweave {
  user: UserAPI
  posts: PostList

  constructor(dataSet: string, options: Options = {}) {
    options.userAPI = options.userAPI || new UserAPI()
    set(options)
    this.user = options.userAPI
    this.posts = new PostList(dataSet)
  }
}