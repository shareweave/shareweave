import { IGunChainReference } from "gun/types/chain"
import { gun, keys, SEA, index } from "../gun"
import { subscribe } from "../store"
import getCurrentDateString from "./date"

let dataset: string
subscribe(a => dataset = a.dataset || '')
export async function index(chainReference: IGunChainReference, indexes: keys[]) {
    // @ts-expect-error incorrect gun types
    const data = gun.user()["_"]['soul']
    const hash = await SEA.work(data, null, undefined, { name: "SHA-256" })
    if (!hash) throw new Error('hashing failed')
    indexes.forEach(index => {
        gun.get(dataset).get(index).get(getCurrentDateString()).get('#').get(hash).put(data)
    })
}

function fetchIndexFromGun(index: keys) {
    return new Promise<index>((resolve, reject) => {
        gun.get(dataset).get(index).load!(data => resolve(data))
    })
}

export async function fetchIndex(index: keys) {
    const data = await fetchIndexFromGun(index)
    await new Promise<void>(resolve => setInterval(() => {
        if (data) resolve()
    }, 5))
    //await (await fetchIndexFromGun(index))


    await console.log(await fetchIndexFromGun(index))
    await console.log('fetchindex', data)
    let result: string[] = []
    const items = await Object.values(data)
    await console.log('items', items)
    for (let [index, item] of items.entries()) {
        for (let piece of Object.values(item)) {
            if (!(typeof piece === 'string')) {
                for (let item of Object.entries(piece)) {
                    await result.push(item[1])
                }
            }
        }
    }
    console.log('result', result)
    return result
    /*   const result: string[] = []
       gun.get(dataset).get(index).map().get('#').map().once(data => {
           console.log('data t')
           if (!(data == undefined)) result.push((data as unknown) as string)
       }, { wait: 10000 })
       return result */
}