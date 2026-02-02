const express = require("express")
const cors = require("cors")
const { Pool } = require("pg")

const app = express()
require("dotenv").config()
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

const pool = new Pool ({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false
})

pool.connect((err, client, release) => {
    if (err) {
        console.error("Error connecting to database:", err)
    } else {
        console.log("Connected to database")
        release()
    }
})

app.get("/", (req, res) => {
    res.json({
        message: "PERN Stack API is running!"
    })
})

app.get("/api/players", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM players ORDER BY points DESC")
        res.json(result.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.post("/api/players", async (req, res) => {
    try {
        const { player } = req.body
        const result = await pool.query("INSERT INTO players (player) VALUES ($1) RETURNING *", [player])
        res.status(201).json(result.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

app.put("/api/players/:id", async (req, res) => {
    try {
        const { id } = req.params
        const { points } = req.body
        const result = await pool.query("UPDATE players SET points = $1 WHERE id = $2 RETURNING *", [points, id])
        res.json(result.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

app.delete("/api/players/:id", async (req, res) => {
    try {
        const { id } = req.params
        const result = await pool.query("DELETE FROM players WHERE id = $1 RETURNING *", [id])
        res.json(result.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/health", (req,res) => {
    res.json({status: "ok", timestamp: new Date().toISOString()})
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})