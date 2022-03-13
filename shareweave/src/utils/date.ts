function pad(n: number, width: number, z?: string) {
    z = z || '0'
    const stringNumber = n + ''
    return stringNumber.length >= width ? n : new Array(width - stringNumber.length + 1).join(z) + n
}

export default function getCurrentDateString(): `${any}T${any}` {
    const date = new Date()
    const year = date.getUTCFullYear()
    const month = date.getUTCMonth() + 1
    const day = date.getUTCDate()
    const hour = date.getUTCHours()
    const minute = date.getUTCMinutes()
    const large = `${pad(year, 4)}-${pad(month, 2)}-${pad(day, 2)}`
    const small = `${pad(hour, 2)}:${pad(minute, 2)}:00`
    return `${large}T${small}`
}