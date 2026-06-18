const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 8000;
const isCodespace = Boolean(process.env.CODESPACE_NAME);

const allowedOrigins = [
  'http://localhost:4200',
];

if (isCodespace) {
  allowedOrigins.push(`https://${process.env.CODESPACE_NAME}-8000.app.github.dev`);
}

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  }
}));

app.get('/api/users', (req, res) => {
  res.json([{ id: 1, name: 'Test User' }]);
});

app.get('/api/activities', (req, res) => {
  res.json([{ id: 1, name: 'Running' }]);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
//Step 4: API ready on port 8000
