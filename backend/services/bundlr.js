import Bundlr from "@bundlr-network/client";

import { readFileSync } from "node:fs";

const jwk = JSON.parse(readFileSync("wallet.json").toString());

const bundlr = new Bundlr.default("http://node1.bundlr.network", "arweave", jwk);

export async function uploadToArweave(data, mime = "text/plain") {
  const transaction = bundlr.createTransaction(data, {
    tags: [{ name: "Content-Type", value: mime }],
  });

  await transaction.sign();
  await transaction.upload();

  return transaction;
}
