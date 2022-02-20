import Bundlr from "@bundlr-network/client";

import { readFileSync } from "node:fs";

import { NETWORK } from "../config";

const jwk = JSON.parse(readFileSync("wallet.json", "utf8"));

export const bundlr = new Bundlr(NETWORK!, "arweave", jwk);

export async function uploadToArweave(
  data: string | Uint8Array,
  mime = "text/plain"
) {
  const transaction = bundlr.createTransaction(data, {
    tags: [{ name: "Content-Type", value: mime }],
  });

  await transaction.sign();
  await transaction.upload();

  return {
    success: true,
    id: transaction.id,
  };
}
