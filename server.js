const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // import cors

const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(cors());

// Serve the current folder instead of /public
app.use(express.static(path.join(__dirname)));

// API route to list images
app.get('/photos', (req, res) => {
  const photosDir = path.join(__dirname, 'assets', 'her photos');

  fs.readdir(photosDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to scan directory' });
    }
    const imageFiles = files.filter(f => f.match(/\.(jpg|jpeg|png|gif|webp)$/i));
    res.json(imageFiles);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
