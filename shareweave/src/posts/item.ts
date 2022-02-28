import ArdbTransaction from "ardb/lib/models/transaction"
import { GetTransactionsQuery } from "arweave-graphql"
import { Options } from "../options"
import add from "../protocol/add"
import { subscribe } from "../store"
import UserAPI from "../user"
import specialTags from "../utils/specialTags"
import { toJS } from "../utils/tagTransform"
import PostList from "./index"

interface Meta {
  author: string,
  time: number,
}
type tags = { [key: string]: (string | null)[] }
type transaction = GetTransactionsQuery['transactions']['edges'][0]['node']
interface Reactions {
  [key: string]: string
}

export default class PostItem {
  txID: string
  meta?: Meta
  tags: tags
  transaction: transaction
  display: boolean = true
  #options: Options = {}
  constructor(transaction: transaction) {
    subscribe(options => this.#options = options)
    this.txID = transaction.id
    this.tags = toJS(transaction.tags)
    this.transaction = transaction
    if (!this.tags.address || !this.tags.address[0] /* || !this.tags.signature || !this.tags.signature[0]*/) {
      this.display = false
      return
    }
    else {
      this.meta = {
        time: (transaction.block?.timestamp || 0) * 1000,
        author: this.tags.address[0],
      }
      //const contentTags = {}
      //Object.keys(this.tags).forEach(tag => { if (!specialTags.includes(tag)) contentTags.push(this.tags[tag]) })
      //const isValid = this.#user.verify(JSON.stringify(contentTags), this.tags.signature[0])
      //console.log(isValid)
    }
  }
  comments() {
    return new PostList(this.txID)
  }
  async reactions() {
    const data: Reactions = {}
    return data
  }
  async comment(data: { tags?: any[], body: any }) {
    if (!data.tags) data.tags = []
    add([...data.tags, { name: 'dataset', value: this.txID }], data.body)
  }
  addReaction() { }

  async delete() {
    console.log('moderate', this.transaction.id)
    const tags = [{ name: 'action', value: 'delete' }, { name: 'delete', value: this.transaction.id }]
    add([...tags, ...this.transaction.tags])
  }
  async flag() {

  }
  /* the actual post data */
  async getData() {
    const { data, proof } = await (
      await fetch(`https://arweave.net/${this.txID}`)
    ).json()
    if (!this.#options.userAPI) throw new Error(`user not logged in`)
    if (this.#options.userAPI.verify(JSON.stringify(data), proof) !== this.tags.address[0]) return { error: { code: 0, message: 'The post is invalid' } }
    return data
  }
}
