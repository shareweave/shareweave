import type { Options } from "./options"

let options: Options
type listener = (data: Options) => void
const listeners: listener[] = []

export function set(data: Options) {
    options = data
    listeners.forEach(listener => listener(data))
}
export function update(updater: (data: Options) => Options) {
    options = updater(options)
    listeners.forEach(listener => listener(options))
}
export function subscribe(listener: listener) {
    if (options) listener(options)
    listeners.push(listener)
}