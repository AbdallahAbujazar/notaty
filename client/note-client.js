function getNotes() {
    return fetch('/api/notes')
      .then(response => response.json())
      .then(notes => notes);
  }
  
  function createNote(note) {
    return fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
      })
      .then(response => response.json())
      .then(createdNote => createdNote);
  }
  
  function updateNote(id, note) {
    return fetch(`/api/notes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
      })
      .then(response => response.json())
      .then(updatedNote => updatedNote);
  }
  
  function deleteNote(id) {
    return fetch(`/api/notes/${id}`, { method: 'DELETE' });
  }
  