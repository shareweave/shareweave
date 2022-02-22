import Shareweave from 'shareweave'
import { readable, writable } from 'svelte/store'
const shareweave = new Shareweave('shareweave-test', {
    uploadServer: 'https://localhost:3030'
})
export default shareweave
export const isLoggedIn = writable(false)