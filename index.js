const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const winston = require('winston');

const app = express();

// Set up Winston logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/combined.log' })  // Logs will be saved in 'logs/combined.log'
    ]
});

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Correct paths to views and public directories
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: false }));

// Example route with logging
app.get('/', (req, res) => {
    logger.info('Rendering index page');
    res.render('index');
});

app.use((err, req, res, next) => {
    logger.error('An error occurred:', err);
    res.status(500).send('Internal Server Error');
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
