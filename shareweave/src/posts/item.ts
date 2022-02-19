import PostList from "./index";

interface Meta {
  author: `0x${string}`;
  time: number;
}

interface Reactions {
  [key: string]: string;
}

export default class PostItem {
  txID: string;
  meta: Meta;
  constructor(txID: string, meta: Meta) {
    this.txID = txID;
    this.meta = meta;
  }
  async comments() {
    const data: PostList = new PostList(`reply-${this.txID}`);
    return data;
  }
  async reactions() {
    const data: Reactions = {};
    return data;
  }
  async comment() {}
  async addReaction() {}
  async tag(name: string) {
    return ""; // value
  }
  /* the actual post data */
  async data() {
    const data: unknown = await (
      await fetch(`https://arweave.net/${this.txID}`)
    ).json();
    return data;
  }
}
