const pool = require('../Database');

class Note {
    constructor(id, title, content, createdDate, updatedDate) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
    }

    static async create({ title, content }) {
        const dateNow = new Date();
        const { rows } = await pool.query(
            'INSERT INTO notes (title, content, created_date, updated_date) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, content, dateNow, dateNow]
        );
        return new Note(...Object.values(rows[0]));
    }

    static async update({ id, title, content }) {
        const dateNow = new Date();
        const { rows } = await pool.query(
            'UPDATE notes SET title = $1, content = $2, updated_date = $3 WHERE id = $4 RETURNING *',
            [title, content, dateNow, id]
        );
        return new Note(...Object.values(rows[0]));
    }

    static async delete(id) {
        const { rowCount } = await pool.query('DELETE FROM notes WHERE id = $1', [id]);
        return rowCount;
    }

    static async getById(id) {
        const { rows } = await pool.query('SELECT * FROM notes WHERE id = $1', [id]);
        if (rows.length > 0) {
            return new Note(...Object.values(rows[0]));
        }
        return null;
    }

    static async getByTitle(title) {
        const { rows } = await pool.query('SELECT * FROM notes WHERE title ILIKE $1', [`%${title}%`]);
        return rows.map(row => new Note(...Object.values(row)));
    }

    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM notes');
        return rows.map(row => new Note(...Object.values(row)));
    }
}

module.exports = Note;
