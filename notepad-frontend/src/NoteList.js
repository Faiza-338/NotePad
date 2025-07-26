import React from 'react';

const NoteList = ({ notes, onEditNote, onDeleteNote }) => {
  return (
    <div>
      <h2>Notes</h2>
      {notes.length === 0 ? (
        <p>No notes available.</p>
      ) : (
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <button onClick={() => onEditNote(note)}>Edit</button>
              <button onClick={() => onDeleteNote(note.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NoteList;
