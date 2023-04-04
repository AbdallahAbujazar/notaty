const { sequelize } = require('./Database');

const Note = require('./schemas/note');


function getNotes(req, res) {
  Note.findAll()
    .then(notes => res.status(200).json(notes))
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    });
}

function createNote(req, res) {
  const { title, content } = req.body;

  Note.create({
      title: title,
      content: content,
    })
    .then(note => res.status(201).json(note))
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    });
}

function updateNote(req, res) {
  const { id } = req.params;
  const { title, content } = req.body;

  Note.findByPk(id)
    .then(note => {
      if (!note) {
        res.status(404).json({ error: `Note with ID ${id} not found` });
      } else {
        note.title = title;
        note.content = content;
        note.save();
        res.status(200).json(note);
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    });
}

function deleteNote(req, res) {
  const { id } = req.params;

  Note.findByPk(id)
    .then(note => {
      if (!note) {
        res.status(404).json({ error: `Note with ID ${id} not found` });
      } else {
        note.destroy();
        res.status(204).json();
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    });
}

module.exports = { getNotes, createNote, updateNote, deleteNote };
