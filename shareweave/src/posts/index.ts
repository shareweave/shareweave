import PostItem from "./item"
import ArDB from "ardb"
import Arweave from "arweave"
import ArdbTransaction from "ardb/lib/models/transaction"

type tag = { name: string; values: string | string[] }
interface Params {
  max?: number
  tags?: tag[] // arweave tags
}

export default class PostList {
  dataSet: string
  appName: string | undefined
  constructor(dataSet: string) {
    this.dataSet = dataSet
  }
  async query(params: Params = {}, cursor?: string) {
    const ardb = new ArDB(
      Arweave.init({
        host: "arweave.net",
        port: 443,
        protocol: "https",
      })
    )
    const result = await ardb
      .search()
      //  .tags(params.tags || [])
      .tag("dataset", this.dataSet)
      .limit(params.max || 100)
      .find() as ArdbTransaction[]
    console.log(result)
    const c = ""
    const data = result.map(item => {
      const post = new PostItem(item)
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
