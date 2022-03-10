import UserAPI from "./user"
import PostList from "./posts"
import { set, update } from "./store"
import type { Options } from "./options"
import Gun from 'gun/gun'
import { gun, user, SEA } from './gun'
import { IGunChainReference } from "gun/types/chain"
import { index, fetchIndex } from "./utils/gunIndex"
import { debug } from "arweave/node/lib/merkle"

export default class Shareweave {
  user: UserAPI
  posts: PostList

  constructor(dataset: string, options: Options = {}) {
    options.userAPI = new UserAPI({
      onLogin: async userAPI => {
        if (!user) throw new Error('Couldnt get user')
        let userSecret = await new Promise<CryptoKeyPair | null>(async (resolve, reject) => {
          console.log(userAPI.profile.address)
          const items = await fetchIndex(`address-${userAPI.profile.address}`)
          if (items.length === 0) console.log('there was no items')
          if (items.length === 0) resolve(null)
          let result: { [key: string]: boolean } = {}
          items.forEach((item, index) => {
            console.log('item/index', item, index)
            gun.get(item).get('proof').once(proof => {
              console.log('proof', proof, item)
              if (proof && userAPI.verify(item, proof as any)) {
                result[item] = true
                console.log('authresult', result, Object.keys(result).length, item)
                gun.get(item).get('secret').once(async secret => {
                  resolve(JSON.parse(await userAPI.decrypt(secret as any)) as CryptoKeyPair)
                })
              }
            })
          })
        })
        if (userSecret === null) {
          const pair = await SEA.pair()
          if (pair === undefined) throw new Error('password was not created')
          // @ts-expect-error
          user.auth(pair)
          // @ts-expect-error
          user.get('proof').put(await userAPI.sign(user.is.pub))
          user.get('secret').put(await userAPI.encrypt(JSON.stringify(pair)))
          index(user, ['users', `address-${userAPI.profile.address}`])
        }
        if (userSecret === null) throw new Error('fetching or creating user keys failed')
        gun.user().auth(userSecret)
      }
    })
    options.dataset = dataset
    options.gunOptions = { ...options.gunOptions, peers: ['https://gun-manhattan.herokuapp.com/gun', 'https://gunjs.herokuapp.com/gun'] }
    set(options)
    this.user = options.userAPI
    this.posts = new PostList(dataset)
  }
}