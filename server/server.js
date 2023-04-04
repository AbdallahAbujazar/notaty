const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const sequelize = require('./Database');
const NoteHandler = require('./note-handler');
const { DataTypes } = require('sequelize');

// Define the Note model
const Note = sequelize.define('Note', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

// Create tables in the database
sequelize.sync();

app.use(bodyParser.json());

// Initialize NoteHandler with Note model
const noteHandler = new NoteHandler(Note);

// Set up API routes
app.get('/api/notes', noteHandler.getAllNotes.bind(noteHandler));
app.post('/api/notes', noteHandler.createNote.bind(noteHandler));
app.put('/api/notes/:id', noteHandler.updateNote.bind(noteHandler));
app.delete('/api/notes/:id', noteHandler.deleteNote.bind(noteHandler));

// Start the server
app.listen(port, () => console.log(`App listening on port ${port}!`));
