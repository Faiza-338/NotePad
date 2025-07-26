import React, { useState, useEffect } from 'react';

const AddNote = ({ onAddNote, editingNote, onUpdateNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // If there's an editingNote, pre-fill the form with the note's data
  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
    }
  }, [editingNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const note = { title, content };

    if (editingNote) {
      // If editing, update the note
      onUpdateNote({ ...note, id: editingNote.id });
    } else {
      // If adding a new note
      onAddNote(note);
    }

    // Clear the form after submission
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit">{editingNote ? 'Update Note' : 'Add Note'}</button>
    </form>
  );
};

export default AddNote;
