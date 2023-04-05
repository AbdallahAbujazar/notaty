const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const pool = new Pool({
  user: 'your_username',
  host: 'your_host',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
});

app.get('/', (req, res) => {
  pool.connect()
    .then(client => {
      return client.query('SELECT * FROM notes')
        .then(result => {
          client.release();
          res.send(result.rows);
        })
        .catch(error => {
          client.release();
          console.error(error);
          res.status(500).send(error);
        });
    });
});

app.post('/add', (req, res) => {
  const { title, body } = req.body;
  pool.connect()
    .then(client => {
      return client.query('INSERT INTO notes (title, body) VALUES ($1, $2)', [title, body])
        .then(() => {
          client.release();
          res.send('Note added successfully');
        })
        .catch(error => {
          client.release();
          console.error(error);
          res.status(500).send(error);
        });
    });
});

app.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;
  pool.connect()
    .then(client => {
      return client.query('UPDATE notes SET title = $1, body = $2 WHERE id = $3', [title, body, id])
        .then(() => {
          client.release();
          res.send('Note updated successfully');
        })
        .catch(error => {
          client.release();
          console.error(error);
          res.status(500).send(error);
        });
    });
});

app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  pool.connect()
    .then(client => {
      return client.query('DELETE FROM notes WHERE id = $1', [id])
        .then(() => {
          client.release();
          res.send('Note deleted successfully');
        })
        .catch(error => {
          client.release();
          console.error(error);
          res.status(500).send(error);
        });
    });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
