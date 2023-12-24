const path = require('path');
const express = require("express");
const bodyParser = require('body-parser');
const Executor = require('./executor');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client", "dist")))

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.post('/execute', async (req, res) => {
  const { code, language } = req.body;

  try {
    const executor = new Executor(language);
    const output = await executor.execute(code);
    res.json({ output });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on\nhttp://localhost:${PORT}`);
});