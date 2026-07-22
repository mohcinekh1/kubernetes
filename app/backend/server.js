const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { Pool } = require("pg");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME || "k8s_lab_db",
  user: process.env.DB_USER || "k8s_lab_user",
  password: process.env.DB_PASSWORD
};

const pool = new Pool(dbConfig);

app.get("/", (req, res) => {
  res.json({
    service: "k8s-lab-backend",
    message: "Backend API is running",
    endpoints: ["/health", "/api/info", "/api/tasks"]
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "backend",
    timestamp: new Date().toISOString()
  });
});

app.get("/api/info", (req, res) => {
  res.json({
    app: "Kubernetes Migration Lab",
    architecture: "frontend -> backend -> database",
    database: {
      host: dbConfig.host,
      port: dbConfig.port,
      name: dbConfig.database,
      user: dbConfig.user
    }
  });
});

app.get("/api/tasks", async (req, res) => {
  try {
    await ensureSchema();
    const result = await pool.query("SELECT id, title, done FROM tasks ORDER BY id ASC");
    res.json(result.rows);
  } catch (error) {
    res.status(503).json({
      error: "Database unavailable",
      detail: error.message
    });
  }
});

app.post("/api/tasks", async (req, res) => {
  const title = String(req.body.title || "").trim();

  if (!title) {
    return res.status(400).json({ error: "Task title is required" });
  }

  try {
    await ensureSchema();
    const result = await pool.query(
      "INSERT INTO tasks (title, done) VALUES ($1, false) RETURNING id, title, done",
      [title]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(503).json({
      error: "Database unavailable",
      detail: error.message
    });
  }
});

async function ensureSchema() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      done BOOLEAN NOT NULL DEFAULT false
    )
  `);

  const result = await pool.query("SELECT COUNT(*)::int AS count FROM tasks");
  if (result.rows[0].count === 0) {
    await pool.query(
      "INSERT INTO tasks (title, done) VALUES ($1, false), ($2, false), ($3, true)",
      [
        "Comprendre Docker",
        "Préparer Kubernetes",
        "Créer la structure du projet"
      ]
    );
  }
}

app.listen(port, () => {
  console.log(`Backend API listening on port ${port}`);
});
