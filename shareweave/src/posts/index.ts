import PostItem from "./item"
import arweaveGraphql, { SortOrder, TagOperator } from 'arweave-graphql'
import { subscribe } from "../store"
import { Options } from "../options"
import add from "../protocol/add"
import { user } from "../gun"

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
    subscribe(options => {
      console.log(options, this.#options)
      this.#options = options
    })
  }
  async add(data: { tags: any[], body: any }) {
    user.get(this.dataSet).get('posts')
  }

  async query(params: Params = {}, currentCursor?: string) {
    const transactionsResult = await arweaveGraphql('arweave.net/graphql').getTransactions({
      after: currentCursor,
      tags: [
        { name: 'dataset', values: [this.dataSet] },
        { name: 'action', values: ['post', 'reply'] }
      ],
    })
    console.log(transactionsResult)
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
