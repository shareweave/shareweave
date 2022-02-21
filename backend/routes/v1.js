import { uploadToArweave } from "../services/index.js"

export async function v1(app, opts) {
  app.post("/", saveData)

  app.get("/", async (req, res) => {
    return "Hello World!"
  })
}

async function saveData({ body }, reply) {
  const post = JSON.parse(body)
  const transaction = await uploadToArweave(post.body, post.tags)
  return transaction
} 
