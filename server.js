const express = require('express');
const path = require('path');

const app = express();

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Homepage Route
app.get('/', (req, res) => {
  res.render('index');
});

// Route for new match setup
app.get('/new-match', (req, res) => {
  res.render('new-match');
});

// Route for score entry
app.get('/score-entry', (req, res) => {
  res.render('score-entry');
});

// Route for match summary
app.get('/summary', (req, res) => {
  res.render('summary');
});

});
