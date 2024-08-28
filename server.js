const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: false }));

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

// POST route for match summary
app.post('/summary', (req, res) => {
    // Extract submitted scores and player names from the request body
    const { player1, player2, ...scores } = req.body;

    // Logic to process scores and calculate match results
    const matchResult = calculateMatchResults(scores);

    // Render summary page with match results
    res.render('summary', { player1, player2, matchResult });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Function to calculate match results
function calculateMatchResults(scores) {
    let player1Up = 0;
    let player2Up = 0;

    for (let i = 1; i <= 18; i++) {
        const player1Score = parseInt(scores[`hole${i}player1`]);
        const player2Score = parseInt(scores[`hole${i}player2`]);

        if (!isNaN(player1Score) && !isNaN(player2Score)) {
            if (player1Score < player2Score) {
                player1Up++;
            } else if (player2Score < player1Score) {
                player2Up++;
            }
        }
    }

    let result = 'Match is All Square';
    if (player1Up > player2Up) {
        result = `Player 1 wins by ${player1Up - player2Up}`;
    } else if (player2Up > player1Up) {
        result = `Player 2 wins by ${player2Up - player1Up}`;
    }

    return result;
}
