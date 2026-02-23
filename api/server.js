const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// Ensure data directory exists
const dataDir = '/data';
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// Open SQLite database
const db = new Database(path.join(dataDir, 'polls.db'));

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');

// Create tables if they don't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS polls (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    poll_key TEXT UNIQUE NOT NULL,
    match_title TEXT NOT NULL,
    is_active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS votes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    poll_key TEXT NOT NULL,
    choice TEXT NOT NULL CHECK(choice IN ('win', 'draw', 'loss')),
    session_token TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(poll_key, session_token)
  );
`);

// Seed default poll if none exists
const existingPoll = db.prepare('SELECT id FROM polls WHERE poll_key = ?').get('eagles-vs-golden-badgers');
if (!existingPoll) {
    db.prepare('INSERT INTO polls (poll_key, match_title) VALUES (?, ?)').run(
        'eagles-vs-golden-badgers',
        'Eagles vs Golden Badgers'
    );
}

// Middleware
app.use(cors({
    origin: ['https://eaglesrugbyug.com', 'http://eaglesrugbyug.com', 'http://localhost:3000'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());

const getActivePollsTotal = () => {
    const row = db.prepare('SELECT COUNT(*) AS total FROM polls WHERE is_active = 1').get();
    return Number(row?.total) || 0;
};

// Health check
app.get('/api/health', (req, res) => {
    try {
        const dbReady = Boolean(db.prepare('SELECT 1 AS ok').get()?.ok);
        res.json({
            status: 'ok',
            db: {
                ready: dbReady,
                path: path.join(dataDir, 'polls.db')
            }
        });
    } catch (error) {
        res.status(503).json({ status: 'error', error: 'Database unavailable', code: 'DB_UNAVAILABLE' });
    }
});

// GET /api/poll/:key/counts — get win/draw/loss counts
app.get('/api/poll/:key/counts', (req, res) => {
    const { key } = req.params;

    const poll = db.prepare('SELECT id FROM polls WHERE poll_key = ?').get(key);
    if (!poll) {
        return res.status(404).json({ error: 'Poll not found', code: 'POLL_NOT_FOUND' });
    }

    const counts = db.prepare(`
    SELECT
      SUM(CASE WHEN choice = 'win' THEN 1 ELSE 0 END) AS win,
      SUM(CASE WHEN choice = 'draw' THEN 1 ELSE 0 END) AS draw,
      SUM(CASE WHEN choice = 'loss' THEN 1 ELSE 0 END) AS loss,
      COUNT(*) AS total
    FROM votes
    WHERE poll_key = ?
  `).get(key);

    res.json({
        win: counts.win || 0,
        draw: counts.draw || 0,
        loss: counts.loss || 0,
        total: counts.total || 0,
        active_polls_total: getActivePollsTotal()
    });
});

// POST /api/poll/:key/vote — cast a vote
app.post('/api/poll/:key/vote', (req, res) => {
    const { key } = req.params;
    const { choice, session_token } = req.body;

    if (!choice || !['win', 'draw', 'loss'].includes(choice)) {
        return res.status(400).json({ error: 'Invalid choice. Must be win, draw, or loss.', code: 'INVALID_CHOICE' });
    }

    if (!session_token || typeof session_token !== 'string' || session_token.length < 8) {
        return res.status(400).json({ error: 'Invalid session token.', code: 'INVALID_SESSION_TOKEN' });
    }

    const poll = db.prepare('SELECT id FROM polls WHERE poll_key = ?').get(key);
    if (!poll) {
        return res.status(404).json({ error: 'Poll not found', code: 'POLL_NOT_FOUND' });
    }

    // Try to insert vote (UNIQUE constraint prevents double voting)
    let accepted = false;
    try {
        db.prepare('INSERT INTO votes (poll_key, choice, session_token) VALUES (?, ?, ?)').run(key, choice, session_token);
        accepted = true;
    } catch (err) {
        // Duplicate vote — silently accept but mark as not accepted
        accepted = false;
    }

    // Return updated counts
    const counts = db.prepare(`
    SELECT
      SUM(CASE WHEN choice = 'win' THEN 1 ELSE 0 END) AS win,
      SUM(CASE WHEN choice = 'draw' THEN 1 ELSE 0 END) AS draw,
      SUM(CASE WHEN choice = 'loss' THEN 1 ELSE 0 END) AS loss,
      COUNT(*) AS total
    FROM votes
    WHERE poll_key = ?
  `).get(key);

    res.json({
        accepted,
        win: counts.win || 0,
        draw: counts.draw || 0,
        loss: counts.loss || 0,
        total: counts.total || 0,
        active_polls_total: getActivePollsTotal()
    });
});

app.listen(PORT, () => {
    console.log(`Eagles RFC Poll API running on port ${PORT}`);
});
