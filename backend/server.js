const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // import cors
require('dotenv').config();

const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(cors());

app.use(express.json());// <– parse application/json

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

app.post('/email', async (req, res) => {
  const { email, to_name, from_name, message } = req.body;

  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        service_id: process.env.SERVICE_ID,
        template_id: process.env.EMAIL_TEMPLATE_ID,
        user_id: process.env.EMAIL_PUBLIC_KEY,
        template_params: { email, to_name, from_name, message }
      })
    });

    if (!response.ok) {
      throw new Error(`EmailJS error: ${response.message}`);
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});