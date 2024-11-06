import express from "express";
import cors from "cors";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Mock posts data
const posts = [
  { id: 1, title: "First Post", body: "This is the first post." },
  { id: 2, title: "Second Post", body: "This is the second post." },
  { id: 3, title: "Third Post", body: "This is the third post." },
];

app.get("/api/posts", (req, res) => {
  res.json(posts);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
