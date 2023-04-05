const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('client'));

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const pool = new Pool({
    user: 'notatyuser',
    host: 'localhost',
    database: 'notaty',
    password: 'notatypassword',
    port: 5432,
    ssl: false
  });
// Route to render the notes page
app.get('/notes', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM notes');
        res.render('notes', { notes: result.rows });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Other routes for CRUD operations
app.post('/notes', async (req, res) => {
    try {
        const { title, content } = req.body;
        const createdDate = new Date();
        const updatedDate = createdDate;

        const result = await pool.query(
            'INSERT INTO notes (title, content, created_date, updated_date) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, content, createdDate, updatedDate]
        );

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
