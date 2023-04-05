const API_BASE_URL = "/notes";

async function getNotes() {
    const response = await fetch(API_BASE_URL);
    const data = await response.json();
    return data;
}

async function addNote() {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
  
    const response = await fetch('/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        content,
      }),
    });
  
    if (response.ok) {
      window.location.href = '/notes';
    } else {
      const error = await response.text();
      console.error(error);
    }
  }
  

async function getNoteById(noteId) {
    const response = await fetch(`${API_BASE_URL}/${noteId}`);
    const data = await response.json();
    return data;
}

async function updateNote(noteData) {
    const response = await fetch(`${API_BASE_URL}/${noteData.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(noteData)
    });
    return response;
}

async function deleteNote(noteId) {
    const response = await fetch(`${API_BASE_URL}/${noteId}`, {
        method: "DELETE"
    });
    return response;
}

export { getNotes, addNote, getNoteById, updateNote, deleteNote };
