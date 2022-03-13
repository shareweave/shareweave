import { GetTransactionsQuery } from "arweave-graphql"
import { IGunChain, SEA } from "gun"
import { gun } from "../gun"
import { Options } from "../options"
import { subscribe } from "../store"
import UserAPI from "../user"
import PostList from "./index"

interface Meta {
  author: string,
  time?: number,
}
type tags = { [key: string]: (string | null)[] }
type transaction = GetTransactionsQuery['transactions']['edges'][0]['node']
interface Reactions {
  [key: string]: string
}

export default class PostItem<DataType extends { reply?: any }> {
  meta?: Meta
  #options: Options = {}
  postID: string
  #gunChain: IGunChain<any>
  constructor(postID: string) {
    subscribe(options => this.#options = options)
    this.postID = postID
    this.#gunChain = gun.get(postID)
    console.log('gunchain', this.#gunChain, postID)
    if (!postID.includes('/')) throw new Error('incorrect post ID')
    this.meta = {
      author: postID.split('/')[0]
    }
  }
  comments() {
    return new PostList<DataType['reply']>(`replies-${this.postID}`)
  }
  async reactions() {
    const data: Reactions = {}
    return data
  }

  addReaction() { }

  async delete() {
    await this.#gunChain.put(null as any).promise()
    return
  }
  async flag() {

  }
  subscribe(callback: (data: DataType) => void) {
    gun.get(this.postID).open(data => {
      callback(data as any as DataType)
    })
  }
  /* the actual post data */
  get(item: string) {
    return new Promise((resolve, reject) => {
      gun.get(this.postID).get(item as any).load((data) => {
        if (!data) throw new Error(`could not fetch ${item} on ${this.postID}`)
        resolve(data)
      })
    })
  }
}
