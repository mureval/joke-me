import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://v2.jokeapi.dev/joke";

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/joke", async (req, res) => {
  try {
    const result = await axios.get(`${API_URL}/Any?safe-mode`);
    res.render("index.ejs", {
      category: result.data.category,
      question: result.data.setup,
      answer: result.data.delivery,
    });
  } catch (err) {
    res.status(429).send("Too Many Request");
  }
});

app.listen(port, () => {
  console.log(`Server listening on port: http://localhost:${port}`);
});
