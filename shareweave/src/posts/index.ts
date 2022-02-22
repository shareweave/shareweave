import PostItem from "./item"
import ArDB from "ardb"
import Arweave from "arweave"
import ArdbTransaction from "ardb/lib/models/transaction"
import UserAPI from "../user"
import arweaveGraphql, { SortOrder, TagOperator } from 'arweave-graphql'
import { subscribe } from "../store"
import { Options } from "../options"

type tag = { name: string; values: string | string[] }
interface Params {
  max?: number
  tags?: tag[] // arweave tags
}

export default class PostList {
  dataSet: string
  appName: string | undefined
  #options: Options = {}
  constructor(dataSet: string) {
    this.dataSet = dataSet
    subscribe(options => this.#options)
  }
  async add() {
    if (!this.#options.uploadServer) throw new Error("Upload server currently required")
    fetch(this.#options.uploadServer)
  }
  async query(params: Params = {}, currentCursor?: string) {
    const transactionsResult = await arweaveGraphql('arweave.net/graphql').getTransactions({
      after: currentCursor,
      tags: [
        { name: 'dataset', values: [this.dataSet] },
      ],
    })

    const newCursor = transactionsResult.transactions.edges[transactionsResult.transactions.edges.length - 1].cursor
    const data = transactionsResult.transactions.edges.map(item => {
      const post = new PostItem(item.node)
      if (post.display) return post
      else return null
    })
    return {
      data,
      cursor: newCursor,
      queryAfter: (newParams: Params = params) => this.query(newParams, newCursor),
    }
  }
}
