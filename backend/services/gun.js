import Gun from 'gun'
import { GUN_PRIV } from '../config.js'

const gun = new Gun()
const user = gun.user()
user.auth(JSON.parse(GUN_PRIV))

export async function index(data, indexes) {
    console.log(chainReference)
    const hash = await SEA.work(data, null, null, { name: "SHA-256" })
    if (!hash) throw new Error('hashing failed')
    indexes.forEach(index => {
        user.get(appName).get(index).get(getCurrentDateString()).put(data, ack => {
            // @ts-expect-error incorrect gun types
            if (ack.err) throw new Error(index + ack.err)
            console.log(data, user.is.pub)
        })
    })
}
