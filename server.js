const express = require('express');
const path = require('path');
const PORT = process.env.port || 3001;
const app = express();
const noteFile = require('./db/db.json');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for Notes
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET route for db.json file
app.get('/api/notes', (req, res) => res.json(noteFile));

// POST route for db.json file
app.post('/api/notes', (req, res) => {
    // Destructure request 
    const { title, text } = req.body;

    // If destructuring was success
    if (title && text) {
        // Variable for new note
        const newNote = {
            title,
            text,
        };

        // Variable holding response
        const response = {
            status: 'success',
            body: newNote,
        };

        console.log(response);
        res.json(response);
        
    } else {
        res.json('Error when posting note')
    }

});

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);
