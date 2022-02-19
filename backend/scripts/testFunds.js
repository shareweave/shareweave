import { bundlr } from "../services/index.js";

async function main() {
  const balance = await bundlr.getLoadedBalance();

  const converted = bundlr.utils.unitConverter(balance);

  console.log(balance);
  console.log(converted);
}

main();
