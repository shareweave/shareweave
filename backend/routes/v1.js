export async function v1(app, opts) {
  app.post("/", saveData);

  app.get("/", async (req, res) => {
    return "Hello World!";
  });
}

async function saveData() {}
