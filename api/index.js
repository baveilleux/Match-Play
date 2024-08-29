const app = require('../index'); // This imports the Express app from the root directory
const serverless = require('serverless-http');

module.exports = serverless(app);  // Wraps the app using serverless-http for serverless deployment
