const express = require('express');
const path = require('path');
const crypto = require('crypto');
const app = express();
const port = 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Route utama kirim index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 🔑 Route untuk generate API key dengan prefix
app.post('/apikeyc/create', (req, res) => {
  try {
    const rawKey = crypto.randomBytes(32).toString('hex');
    const apiKey = `sk-itumy-v1-api_${rawKey}`; // ← prefix di sini

    res.json({
      success: true,
      apiKey: apiKey
    });
  } catch (err) {
    console.error('Error generate API key:', err);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat membuat API key'
    });
  }
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});