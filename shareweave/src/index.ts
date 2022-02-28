import UserAPI from "./user"
import PostList from "./posts"
import { set, update } from "./store"
import type { Options } from "./options"

export default class Shareweave {
  user: UserAPI
  posts: PostList

  constructor(dataSet: string, options: Options = {}) {
    /*  const userAPI = options.userAPI || new UserAPI()
      const userAPIProxy = new Proxy(userAPI, {
        get(target, prop, receiver) {
          console.log(target, prop, receiver)
          update(options => {
            return { ...options, userAPI: target }
          })
          // @ts-expect-error
          return userAPI[prop]
        }
      })*/
    options.userAPI = new UserAPI()
    set(options)
    this.user = options.userAPI
    this.posts = new PostList(dataSet)
  }
}