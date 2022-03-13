import fastify from "fastify"

<<<<<<< HEAD:backend/index.js
import { v1 } from "./routes/index.js"
import { PORT } from "./config.js"
=======
import { v1 } from "./routes";
import { PORT } from "./config";
>>>>>>> master:backend/index.ts

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

<<<<<<< HEAD:backend/index.js
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
=======
app.listen(PORT!, () => {
  console.log(`Server running on port ${PORT}`);
});
>>>>>>> master:backend/index.ts
