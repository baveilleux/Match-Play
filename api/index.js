const app = require('../index'); // Adjust the path as needed
const serverless = require('serverless-http');

module.exports = serverless(app);
