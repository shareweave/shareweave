import fastify from "fastify"

import { v1 } from "./routes/index.js"
import { PORT } from "./config.js"

const app = fastify()

import fastifyCORS from 'fastify-cors'

app.register(fastifyCORS, {
  methods: ['POST', 'GET'],
  origin: true
  /*(origin, cb) => {
    const hostname = new URL(origin).hostname
    if (hostname === "localhost") {
      //  Request from localhost will pass
      cb(null, true)
      return
    }
    // Generate an error on other origins, disabling access
    cb(new Error("Not allowed"))
  }*/
})

app.register(v1, { prefix: "/v1" })
app.register(v1, { prefix: "/" })

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
