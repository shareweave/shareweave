import { IGunChainReference } from "gun/types/chain"
import type UserAPI from "./user"
export interface Options {
    user?: IGunChainReference<Record<string, any>, any, false> | undefined
    gun?: IGunChainReference
    uploadServer?: string,
    appName?: string,
    userAPI?: UserAPI,
    gunOptions?: IGunConstructorOptions
}