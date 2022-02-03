import PostItem from "./item"
import ArDB from 'ardb'

type tag = { name: string, values: string | string[] }
interface Params {
    max: number
    cursor: string // skip results with cursor
    fuzzySearch: string // search without exact match, not neccessarily available in MVP
    tags: tag[] // arweave tags
}

export default class PostList {
    dataSet: string
    appName: string | undefined
    constructor(dataSet: string) {
        this.dataSet = dataSet
    }
    async query(params: Params) {
        // @ts-expect-error
        const ardb = new ArDB(window.Arweave.init({
            host: 'arweave.net',
            port: 443,
            protocol: 'https',
        }))
        const result = await ardb.search().tag('Data-Set', this.dataSet).tags(params.tags || []).limit(params.max || 100).find()
        console.log(result)


        const data: PostItem[] = []
        return { data, cursor: '' }
    }
}