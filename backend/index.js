import Arweave from "arweave";

/**
 * @param {Request} request
 */
async function handleRequest(request) {
  const arweave = Arweave.init({});

  return new Response("Hello worker!", {
    headers: { "content-type": "text/plain" },
  });
}

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});
