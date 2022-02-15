import fastify from "fastify";

import { v1 } from "./routes/index.js";
import { PORT } from "./config.js";

const app = fastify();

app.register(v1, { prefix: "/v1" });
app.register(v1, { prefix: "/" });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
