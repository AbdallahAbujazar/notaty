const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const createNoteTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS notes (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      created_date TIMESTAMP NOT NULL,
      updated_date TIMESTAMP NOT NULL
    );
  `;

  try {
    await pool.query(query);
  } catch (error) {
    console.error('Error creating notes table:', error);
  }
};

module.exports = { pool, createNoteTable };
