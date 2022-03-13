import { user } from '../gun'
import type { Options } from '../options'
import { subscribe } from '../store'

let options: Options
subscribe(newOptions => options = newOptions)

export default async (tags: any[] = [], body: any = '') => {
    if (!options.userAPI || !options.appName) throw new Error('not ready')
    const unsignedTags = [...tags, { name: 'address', value: options.userAPI.profile.address }, { name: 'App-Name', value: 'shareweave.com' }]
    const signedTags = [...unsignedTags, { name: 'proof', value: (await options.userAPI.sign(JSON.stringify(unsignedTags))) }]
    const signedBody = {
        data: body,
        proof: (await options.userAPI.sign(JSON.stringify(body)))
    }
    if (!options.uploadServer) throw new Error("Upload server currently required")
    user.get(options.appName).put({ tags: signedTags, body: signedBody })
}