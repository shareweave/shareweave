import ArdbTransaction from "ardb/lib/models/transaction"
import { toJS } from "../utils/tagTransform"
import PostList from "./index"

interface Meta {
  author: string,
  time: number,
}
type tags = { [key: string]: (string | null)[] }

interface Reactions {
  [key: string]: string
}

export default class PostItem {
  txID: string
  meta?: Meta
  tags: { [key: string]: (string | null)[] }
  transaction: ArdbTransaction
  display: boolean = true
  constructor(transaction: ArdbTransaction) {
    this.txID = transaction.id
    this.tags = toJS(transaction.tags)
    this.transaction = transaction
    if (!this.tags.address || !this.tags.address[0]) {
      this.display = false
      return
    }
    else {
      this.meta = {
        time: transaction.block.timestamp * 1000,
        author: this.tags.address[0],
      }
    }
  }
  comments() {
    return new PostList(`reply-${this.txID}`)
  }
  async reactions() {
    const data: Reactions = {}
    return data
  }
  async comment() { }
  async addReaction() { }

  /* the actual post data */
  async data() {
    const data: unknown = await (
      await fetch(`https://arweave.net/${this.txID}`)
    ).json()
    return data
  }
}
