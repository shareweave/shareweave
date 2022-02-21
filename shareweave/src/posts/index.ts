import PostItem from "./item"
import ArDB from "ardb"
import Arweave from "arweave"
import ArdbTransaction from "ardb/lib/models/transaction"
import UserAPI from "../user"
import arweaveGraphql, { SortOrder, TagOperator } from 'arweave-graphql'

type tag = { name: string; values: string | string[] }
interface Params {
  max?: number
  tags?: tag[] // arweave tags
}

export default class PostList {
  dataSet: string
  appName: string | undefined
  #user: UserAPI
  constructor(dataSet: string, userAPI: UserAPI) {
    this.dataSet = dataSet
    this.#user = userAPI
  }
  async query(params: Params = {}, cursor?: string) {
    const transactionsResult = await arweaveGraphql('arweave.net/graphql').getTransactions({
      tags: [
        { name: 'dataset', values: [this.dataSet] },
      ],
    })
    /*  const ardb = new ArDB(
        Arweave.init({
          host: "arweave.net",
          port: 443,
          protocol: "https",
        })
      )
      const result = await ardb
        .search()
        //.tags(params.tags || [])
        .tag("dataset", this.dataSet)
        .limit(params.max || 100)
        .find() as ArdbTransaction[]
      console.log(result) */

    const c = ""
    const data = transactionsResult.transactions.edges.map(item => {
      const post = new PostItem(item.node, this.#user)
      if (post.display) return post
      else return null
    })
    return {
      data,
      cursor: c,
      queryAfter: (qParams: Params = params) => {
        this.query(qParams, c)
      },
    }
  }
}
