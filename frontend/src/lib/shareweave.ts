import Shareweave from 'shareweave'
import { writable } from 'svelte/store'
interface reply {
    text: string
    reply?: reply
}
interface post {
    title: string,
    text: string,
    reply?: reply
}
const shareweave = new Shareweave('shareweave-test', {
    uploadServer: 'http://localhost:3030'
})
export default shareweave
export const isLoggedIn = writable(false)
globalThis.shareweave = shareweave