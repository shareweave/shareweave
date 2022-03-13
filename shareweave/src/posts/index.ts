import PostItem from "./item"
import { subscribe } from "../store"
import { Options } from "../options"
import { gun, Indexes, user } from "../gun"
import getCurrentDateString from "../utils/date"
import { index, fetchIndex } from "../utils/gunIndex"

type tag = { name: string; values: string | string[] }
interface Params {
  max?: number
  tags?: tag[] // arweave tags
}
interface Base {
  reply?: never
}
export default class PostList<DataType = { [key: string]: string }> {
  dataSet: keyof Indexes
  #options: Options = {}
  constructor(dataSet: keyof Indexes) {
    this.dataSet = dataSet
    subscribe(options => {
      console.log(options, this.#options)
      this.#options = options
    })
  }
  add(data: Omit<DataType, 'reply'>, tags: string[] = []) {
    return new Promise((resolve, reject) => {
      if (!this.#options.appName) throw new Error("not init'ed")
      if (!user.is) throw new Error("not logged in")
      const item = gun.get('~' + user.is.pub).get('app').get(this.#options.appName).get(this.dataSet).get(getCurrentDateString()).put(data, async ack => {
        // @ts-expect-error gun isn't typed correctly
        if (ack.err) reject(ack.err)
        console.log(item, this.dataSet)
        await index(item, [this.dataSet])
        resolve(ack)
      })
    })
  }
  attachListener(listener: () => void) {
    if (!this.#options.appName) throw new Error("appname not initialized")
    let hasRunFirst = false
    gun.get(this.#options.appName).get(this.dataSet).on(() => {
      if (hasRunFirst) listener()
      hasRunFirst = true
    })
  }
  async query(params?: never) {
    const result = []
    const index = await fetchIndex(this.dataSet)
    console.log(index, 'index postlist')
    for (const item of index) {
      if (item) result.push(new PostItem<DataType>(item))
    }
    return result
  }
}
