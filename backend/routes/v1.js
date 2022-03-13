import { index } from "../services/gun.js"
export async function v1(app, opts) {
  app.post("/", (req, res) => {

  })

  app.get("/", async (req, res) => {
    return "Hello World!"
  })
}

async function saveData({ body }, reply) {
  const post = body
  const transaction = await uploadToArweave(post.body, post.tags)
  return transaction
} 
