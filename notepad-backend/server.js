const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json.json'); // Firebase service account key

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://notepad-app-a8d2b.firebaseio.com" // Replace with your Firebase URL
});

const db = admin.firestore(); // Use Firestore
const app = express();

// Middleware to parse JSON request bodies
app.use(cors());
app.use(bodyParser.json());

// Create a new note
app.post('/notes', async (req, res) => {
  const { title, content } = req.body;
  try {
    const newNote = {
      title,
      content,
      createdAt: new Date().toISOString(),
    };

    const noteRef = await db.collection('notes').add(newNote);
    res.status(201).json({ id: noteRef.id, ...newNote });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create note' });
  }
});

// Get all notes
app.get('/notes', async (req, res) => {
  try {
    const snapshot = await db.collection('notes').get();
    const notes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

// Update a note
app.put('/notes/:id', async (req, res) => {
  const { title, content } = req.body;
  const noteId = req.params.id;

  try {
    await db.collection('notes').doc(noteId).update({
      title,
      content,
    });
    res.status(200).json({ message: 'Note updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update note' });
  }
});

// Delete a note
app.delete('/notes/:id', async (req, res) => {
  const noteId = req.params.id;

  try {
    await db.collection('notes').doc(noteId).delete();
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete note' });
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Server running at http://localhost:5000');
});
