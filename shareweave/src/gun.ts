import type { IGunChainReference } from 'gun/types/chain'
import { IGunStaticSEA } from 'gun/types/static/sea'
import Gun from 'gun/gun'
import 'gun/lib/load'
import 'gun/lib/then.js'
// @ts-expect-error no types // only works on cdn wtf
import ImportSEA from 'https://cdn.skypack.dev/gun/sea'
import { subscribe } from './store'

interface CustomGunChainReference<DataType = Record<string, any>, ReferenceKey = any, IsTop extends 'pre_root' | 'root' | false = false> extends IGunChainReference<DataType, ReferenceKey, IsTop> {
    hashedPut: (data: unknown) => void
}
(Gun.chain as CustomGunChainReference).hashedPut = function (data: unknown) {

}
type index = {
    [key: `${any}T${any}`]: {
        '#': {
            // an SEA hash
            [key: string]: any
        }
    }
}
interface Indexes {
    users: index,
    [key: `address-${string}`]: index
}
interface AppState {
    // indexes under the `dataset`
    [key: string]: Indexes
}
type keys = keyof Indexes

const gun = new Gun<AppState>() as CustomGunChainReference<AppState, any, "root">
const SEA: IGunStaticSEA = ImportSEA
const user = gun.user()
console.log(gun)
export { gun, user, SEA, CustomGunChainReference, keys }
subscribe(options => {
    console.log('changed, peers', options.gunOptions)
    gun.opt(options.gunOptions)
})
// @ts-expect-error debug
globalThis.gun = gun
