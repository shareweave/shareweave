import Bundlr from "@bundlr-network/client";

import { readFileSync } from "node:fs";

import { NETWORK } from "../config.js";

const jwk = JSON.parse(readFileSync("wallet.json", "utf8"));

export const bundlr = new Bundlr.default(NETWORK, "arweave", jwk);

export async function uploadToArweave(data, mime = "text/plain") {
  const transaction = bundlr.createTransaction(data, {
    tags: [{ name: "Content-Type", value: mime }],
  });

  await transaction.sign();
  await transaction.upload();

  return transaction;
}
