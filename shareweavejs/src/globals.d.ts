import type { ExternalProvider } from '@ethersproject/providers'

/* this code needs to be changed, right now it assumes that metamask is installed
     but it's probably better than not having types  for window.ethereum */

declare global {
    interface Window { ethereum: any }
}