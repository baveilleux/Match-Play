const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/new-match', (req, res) => {
    res.render('new-match');
});

app.get('/score-entry', (req, res) => {
    res.render('score-entry');
});

app.post('/summary', (req, res) => {
    const { player1, player2, ...scores } = req.body;
    const matchResult = calculateMatchResults(scores);
    res.render('summary', { player1, player2, matchResult });
});

app.get('/test', (req, res) => {
    res.send('Server is working!');
});

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

module.exports = app;
