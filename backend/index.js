const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

// middlewares
app.use(cors());
app.use(express.json());

// test endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

// start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});