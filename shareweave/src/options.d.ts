import { IGunChainReference } from "gun/types/chain"
import type UserAPI from "./user"
export interface Options {
    requireEmail?: boolean
    uploadServer?: string,
    appName?: string,
    userAPI?: UserAPI,
    gunOptions?: IGunConstructorOptions
}