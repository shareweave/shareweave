import UserAPI from "./user"
import PostList from "./posts"
import { set, update } from "./store"
import type { Options } from "./options"
import Gun from 'gun/gun'
import { gun, user, SEA, Indexes } from './gun'
import { index, fetchIndex } from "./utils/gunIndex"
import { debug } from "arweave/node/lib/merkle"
import { ISEA, ISEAPair } from "gun"
import renderLoginComponent from "./user/login-ui"
globalThis.fetchIndex = fetchIndex
globalThis.index = index

interface LoginData { email?: string; password: string, username: string, signUp: boolean, done?: () => void }
export default class Shareweave<DataType = { [key: string]: any }> {
  user: { login: (ldata?: LoginData) => Promise<LoginData | void>, setProfile: (data: any) => Promise<void>, profile?: any, isLoggedIn?: boolean }
  posts: PostList<DataType>

  constructor(appName: string, options: Options = {}) {
    /*  options.userAPI = new UserAPI({
        onLogin: async userAPI => {
          if (user.is) return
          let userSecret = await new Promise<ISEAPair | null>(async (resolve, reject) => {
            console.log(userAPI.profile.address)
            const items = await fetchIndex(`address-${userAPI.profile.address}`)
            if (items.length === 0) console.log('there was no items', items, userAPI.profile.address)
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
                    const key = JSON.parse(await userAPI.decrypt(secret as any)) as ISEAPair
                    console.log('userkey', key, secret, item)
                    await gun.user().auth(key)
                    resolve(key)
                  })
                }
              })
            })
          })
          console.log('usersecret', userSecret)
          if (userSecret === null) {
            const pair = await SEA.pair()
            if (pair === undefined) throw new Error('password was not created')
            user.auth(pair)
            // @ts-expect-error
            user.get('proof').put(await userAPI.sign(user.is.pub))
            user.get('secret').put(await userAPI.encrypt(JSON.stringify(pair)))
            if (!user.is) throw new Error("login failed")
            // @ts-expect-error
            const pub = user.is.pub as string
            console.log(gun.get(`~${pub}`))
            index(gun.get(`~${pub}`), [`address-${userAPI.profile.address}`, 'users'])
          }
        }
      }) */
    options.appName = appName
    options.gunOptions = { ...options.gunOptions, peers: ['https://gun-manhattan.herokuapp.com/gun', 'https://gunjs.herokuapp.com/gun'] }
    set(options)
    const _shareweave = this
    this.user = {
      login(ldata?: LoginData) {
        return new Promise(async (resolve, reject) => {
          if (user.is) resolve()
          const data = ldata || await renderLoginComponent()
          console.log('login data', data)
          if (!data.email && options.requireEmail) alert('You need to provide an email address')

          if (data.signUp) gun.user().create(data.username, data.password, (ack: any) => {
            if (ack.err) alert(ack.err)
          })
          gun.user().auth(data.username, data.password, (ack: any) => {
            if (ack.err) alert(ack.err)
            else {
              if (data.done) data.done()
              user.get('profile').load(data => {
                _shareweave.user.profile = data
              })
              _shareweave.user.isLoggedIn = true
              resolve(data)
            }
          })
        })
      },
      setProfile(data: any) {
        return new Promise<void>((resolve, reject) => {
          user.get('profile').put(data)
        })
      }
    }
    this.posts = new PostList<DataType>(`posts`)
  }
}