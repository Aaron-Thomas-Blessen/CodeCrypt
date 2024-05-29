const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { exec } = require('child_process');
const crypto = require('crypto');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/encrypt', (req, res) => {
  const { text } = req.body;

  // Generate a random key and iv
  const key = crypto.randomBytes(32);
  const iv = crypto.randomBytes(16);

  // Create the cipher
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

  let encryptedText = cipher.update(text, 'utf8', 'hex');
  encryptedText += cipher.final('hex');

  // Return the encrypted text, key, and iv as hex strings
  res.json({
    encryptedText,
    key: key.toString('hex'),
    iv: iv.toString('hex')
  });
});

app.post('/decrypt', (req, res) => {
  const { encryptedText, key, iv } = req.body;

  // Convert key and iv from hex strings to buffers
  const keyBuffer = Buffer.from(key, 'hex');
  const ivBuffer = Buffer.from(iv, 'hex');

  // Create the decipher
  const decipher = crypto.createDecipheriv('aes-256-cbc', keyBuffer, ivBuffer);

  let decryptedText = decipher.update(encryptedText, 'hex', 'utf8');
  decryptedText += decipher.final('utf8');

  // Return the decrypted text
  res.json({ decryptedText });
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
