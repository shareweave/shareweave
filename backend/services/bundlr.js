import Bundlr from "@bundlr-network/client"

import { readFileSync } from "node:fs"

import { NETWORK } from "../config.js"

const jwk = JSON.parse(readFileSync("wallet.json", "utf8"))

export const bundlr = new Bundlr.default(NETWORK, "arweave", jwk)

export async function uploadToArweave(data, tags, mime = "text/json") {
  const transaction = bundlr.createTransaction(JSON.stringify(data), {
    tags: [{ name: "Content-Type", value: mime }, ...tags],
  })

  await transaction.sign()
  await transaction.upload()
  return {
    success: true,
    id: transaction.id
  }
}
