const express = require('express');
const fs = require('fs');
const { fstat } = require('fs');
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

        // Create response variable to inform user/server
        const response = {
            status: 'success',
            body: newNote,
        };

        console.log(response);
        res.json(response);

        // If all went well, obtain db.json and write new note to it
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                // Convert file into a string
                const allNotes = JSON.parse(data);

                // Add the new note to the file
                allNotes.push(newNote);

                // Write it back to the file
                fs.writeFile('./db/db.json', JSON.stringify(allNotes, null, 4),

                    // If error occurs while writing, log it
                    (writeErr) => writeErr ? console.error(writeErr) : console.info('Successfully updated notes!')
                )
            }
        });

        // If title and text weren't entered
    } else {
        res.json('Error in posting review');
    }
});

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);
