const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8000;

const codespaceName = process.env.CODESPACE_NAME;

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true);
    }

    const allowedLocalhost = origin.startsWith('http://localhost') || origin.startsWith('http://127.0.0.1');
    const allowedCodespace = codespaceName && origin.includes(codespaceName);

    if (allowedLocalhost || allowedCodespace) {
      return callback(null, true);
    }

    callback(new Error('Not allowed by CORS'));
  },
};

app.use(cors(corsOptions));

app.get('/api/users', (req, res) => {
  res.json([{ id: 1, name: 'Test User' }]);
});

app.get('/api/activities', (req, res) => {
  res.json([{ id: 1, name: 'Running' }]);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
