const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

// Serve static files from the React app's build folder
app.use(express.static(path.join(__dirname, './', 'web')));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.get('/config', (req, res) => {
  res.status(200).json({
    API: process.env['API'],
    GQL: process.env['GQL']
  })
})

// Handle all other routes by serving the React app's index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './', 'web', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});