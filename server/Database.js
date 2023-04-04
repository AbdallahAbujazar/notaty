const API_URL = 'http://localhost:3000/api/notes';

const Database = {
  addNote: function(note) {
    return fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error adding note');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error adding note:', error);
      throw error;
    });
  },

  updateNote: function(note) {
    const url = `${API_URL}/${note._id}`;
    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error updating note');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error updating note:', error);
      throw error;
    });
  },

  getNotes: function() {
    return fetch(API_URL)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error getting notes');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error getting notes:', error);
      throw error;
    });
  },

  getNoteById: function(noteId) {
    const url = `${API_URL}/${noteId}`;
    return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error getting note by ID');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error getting note by ID:', error);
      throw error;
    });
  },

  getNotesByTitle: function(noteTitle) {
    const url = `${API_URL}/search/${noteTitle}`;
    return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error searching notes');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error searching notes:', error);
      throw error;
    });
  },

  deleteNote: function(noteId) {
    const url = `${API_URL}/${noteId}`;
    return fetch(url, {
      method: 'DELETE'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error deleting note');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error deleting note:', error);
      throw error;
    });
  }
};

module.exports = Database;
