import express from 'express';
import cors from 'cors'
import * as path from 'path';

const PORT = process.env.PORT || 8000;
const REACT_APP_PATH = process.env.REACT_APP_PATH || path.join(__dirname, './', 'web')

const app = express();

// Serve static files from the React app's build folder
app.use(express.static(REACT_APP_PATH));

app.use(cors())

app.get('/health', (_, res) => {
  res.set('Cache-Control', 'no-cache');
  res.status(200).json({ status: 'OK' });
});

app.get('/config', (_, res) => {
  res.set('Cache-Control', `public, max-age=${60*15}`)
  res.status(200).json({
    API: process.env['API'],
    GQL: process.env['GQL']
  })
})

// Handle all other routes by serving the React app's index.html
app.get('*', (_, res) => {
  res.sendFile(path.join(REACT_APP_PATH, 'index.html'));
});

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

server.on('error', console.error);