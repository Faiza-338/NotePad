import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddNote from './AddNote';  // Make sure the path is correct
import NoteList from './NoteList'; // Make sure the path is correct

const App = () => {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);

  // Fetch notes when the component is mounted
  useEffect(() => {
    fetchNotes();
  }, []);

  // Fetch notes from backend
  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/notes');
      setNotes(response.data);  // Set notes from backend
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  // Handle adding a new note
  const handleAddNote = async (note) => {
    try {
      await axios.post('http://localhost:5000/notes', note);
      fetchNotes();  // Re-fetch notes after adding a new one
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  // Handle editing a note
  const handleEditNote = (note) => {
    setEditingNote(note);
  };

  // Handle updating a note
  const handleUpdateNote = async (note) => {
    try {
      await axios.put(`http://localhost:5000/notes/${note.id}`, note);
      fetchNotes();  // Re-fetch notes after updating
      setEditingNote(null);  // Clear editing state
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  // Handle deleting a note
  const handleDeleteNote = async (noteId) => {
    try {
      await axios.delete(`http://localhost:5000/notes/${noteId}`);
      fetchNotes();  // Re-fetch notes after deletion
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div className="App">
      <h1>Notepad App</h1>

      {/* Pass the functions as props */}
      <AddNote
        onAddNote={handleAddNote}
        editingNote={editingNote}
        onUpdateNote={handleUpdateNote}
      />

      {/* Render the list of notes */}
      <NoteList
        notes={notes}
        onEditNote={handleEditNote}
        onDeleteNote={handleDeleteNote}
      />
    </div>
  );
};

export default App;
