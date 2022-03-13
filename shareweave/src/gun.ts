import type { ISEA } from 'gun'
import Gun from 'gun/gun'
import 'gun/lib/load'
import 'gun/lib/open'
import 'gun/lib/then.js'
// @ts-expect-error no types // only works on cdn wtf
import ImportSEA from 'https://cdn.skypack.dev/gun/sea'
import { subscribe } from './store'

type user = {
    app: {
        [key: string]: {
            [K in keys]: any
        }
    },
    secret: string,
    proof: string,
}
type index = {
    [key: `${any}T${any}`]: {
        '#': {
            // an SEA hash
            [key: string]: any
        }
    }
}
type PostIndex = `posts` | `replies-${string}`

type Indexes = Record<`address-${string}` | PostIndex | 'users', index>
interface AppState {
    // an app can contain data submitted by a user, and an index that points to these items
    // "indexes" is stored under the appname, which is what key: string represents here
    // user is stored under the ID, which is what key: string represents here
    [key: string]: Indexes & user
}
type keys = keyof Indexes

const gun = new Gun<AppState>()
const SEA: ISEA = ImportSEA
const user = gun.user()
console.log(gun)
export { gun, user, SEA, keys, index, Indexes }
subscribe(options => {
    console.log('changed, peers', options.gunOptions)
    gun.opt(options.gunOptions)
})
// @ts-expect-error debug
globalThis.gun = gun
