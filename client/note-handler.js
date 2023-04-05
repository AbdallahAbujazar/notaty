import { getNotes, addNote, getNoteById, updateNote, deleteNote } from './note-client.js';

function updateNotesTable(noteId, noteTitle) {
    const table = document.getElementById("notes-table");
    const rowCount = table.rows.length;
    for (let i = rowCount - 1; i > 0; i--) {
        table.deleteRow(i);
    }

    getNotes(noteTitle).then(data => {
        data.forEach(note => {
            const row = table.insertRow(-1);
            row.id = note.id;

            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);
            const cell4 = row.insertCell(3);

            cell1.innerHTML = note.title;
            cell2.innerHTML = note.content;
            cell3.innerHTML = note.updated_at;
            cell4.innerHTML = `
                <a onclick="openEditModal('${note.id}')" href="#"><img src="images/edit.png" style="width: 22px;"></a>
                <a onclick="confirmDeleteNote('${note.id}')" href="#"><img src="images/delete.png" style="width: 22px;"></a>
            `;
        });
    }).then(() => {
        if (noteId) {
            const row = document.getElementById(noteId);
            row.style.animation = "new-row 5s";
        }
    });
}

function searchNotes() {
    const searchTitle = document.getElementById("searchInput").value;
    updateNotesTable(undefined, searchTitle);
}

function confirmDeleteNote(noteId) {
    const action = confirm("Are you sure you want to delete this note?");
    if (action) {
        deleteNote(noteId).then(() => {
            updateNotesTable();
        });
    }
}

export { updateNotesTable, searchNotes, confirmDeleteNote };
