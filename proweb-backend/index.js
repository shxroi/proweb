// index.js
const express = require('express');
const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// GET route
app.get('/', (req, res) => {
    res.send('Hello GET from Express!');
  });
  
  // POST route
  app.post('/submit', (req, res) => {
    res.send('Data has been submitted!');
  });
  