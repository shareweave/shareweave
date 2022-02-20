import type { GQLTagInterface } from "ardb/lib/faces/gql"

export function toJS(tags: GQLTagInterface[]) {
    const jsTags: { [key: string]: (string | null)[] } = {}
    tags.forEach(tag => {
        if (jsTags[tag.name]) jsTags[tag.name] = [...jsTags[tag.name], tag.value]
        else jsTags[tag.name] = [tag.value || null]
    })
    return jsTags
}