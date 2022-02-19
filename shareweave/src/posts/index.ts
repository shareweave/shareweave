import PostItem from "./item";
import ArDB from "ardb";

type tag = { name: string; values: string | string[] };
interface Params {
  max?: number;
  tags?: tag[]; // arweave tags
}

export default class PostList {
  dataSet: string;
  appName: string | undefined;
  constructor(dataSet: string) {
    this.dataSet = dataSet;
  }
  async query(params: Params, cursor?: string) {
    // @ts-expect-error
    const ardb = new ArDB(
      window.Arweave.init({
        host: "arweave.net",
        port: 443,
        protocol: "https",
      })
    );
    const result = await ardb
      .search()
      .tag("Data-Set", this.dataSet)
      .tags(params.tags || [])
      .limit(params.max || 100)
      .find();
    console.log(result);
    const c = "";
    const data: PostItem[] = [];
    return {
      data,
      cursor: c,
      queryAfter: (qParams: Params = params) => {
        this.query(qParams, c);
      },
    };
  }
}
