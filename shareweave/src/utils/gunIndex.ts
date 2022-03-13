import type { IGun, IGunChain } from 'gun'
import { gun, keys, SEA, index } from "../gun"
import { subscribe } from "../store"
import getCurrentDateString from "./date"

let appName: string
subscribe(a => appName = a.appName || '')
export async function index(chainReference: any, indexes: keys[]) {
    const data = chainReference._.soul || chainReference.load()._.link
    console.log(chainReference)
    const hash = await SEA.work(data, null, null, { name: "SHA-256" })
    if (!hash) throw new Error('hashing failed')
    indexes.forEach(index => {
        console.log('indexing', index)
        gun.get(appName).get(index).get(getCurrentDateString()).get('#').get(hash).put(data, ack => {
            // @ts-expect-error incorrect gun types
            if (ack.err) throw new Error(index + ack.err)
            console.log(index, hash, data, JSON.stringify(hash), gun.get(appName).get(index).get(getCurrentDateString()).get('#'), 'done')
        })
    })
}

function fetchIndexFromGun(index: keys) {
    return new Promise<index>((resolve, reject) => {
        gun.get(appName).get(index).load(() => {
            gun.get(appName).get(index).load(data => resolve(data))
        })
    })
}

export async function fetchIndex(index: keys): Promise<string[]> {
    const data = await fetchIndexFromGun(index)
    await new Promise<void>(resolve => setInterval(() => {
        if (data) resolve()
    }, 5))
    //await (await fetchIndexFromGun(index))


    await console.log('fetchindex', data)
    /* let result: string[] = []
     const items = await Object.values(data)
     await console.log('items', items) */

    // we have an object with times as keys, but we don't need the times rn, just get values
    Object.values(data)
        // now we have an array of objects with the '#' property containing one or more hash/data pairs
        .map(item => Object.values(item)[0])
        // now we have an array with objects containing one or more hash/value pairs, we'll turn it into an array with arrays of values
        .map(item => Object.values(item))
        // now flatten it into an array values
        .reduce((previousResult, item) => {
            console.log(item)
            item.forEach(item => previousResult.push(item))
        }, [])

    /*    for (let [index, item] of items.entries()) {
            console.log('list', index, item)
            for (let piece of Object.values(item)) {
                console.log(piece, item, index, 'piece')
                if (!(typeof piece === 'string')) {
                    for (let item of Object.entries(piece)) {
                        await result.push(item[1])
                    }
                }
            }
        }
        console.log('result', result)
        return result*/
}