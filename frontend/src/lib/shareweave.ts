import Shareweave from 'shareweave'
import { readable, writable } from 'svelte/store'
const shareweave = new Shareweave('shareweave-test')
export default shareweave
export const isLoggedIn = writable(false)