// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Generate DSA keys
const { publicKey, privateKey } = crypto.generateKeyPairSync('dsa', {
  modulusLength: 2048,
});

// Endpoint to sign a message
app.post('/sign', (req, res) => {
  const { message } = req.body;

  const sign = crypto.createSign('SHA256');
  sign.update(message);
  sign.end();

  const signature = sign.sign(privateKey, 'hex');

  res.json({
    message,
    signature,
    publicKey: publicKey.export({ type: 'spki', format: 'pem' })
  });
});

// Endpoint to verify a message
app.post('/verify', (req, res) => {
  const { message, signature, publicKeyPem } = req.body;

  const publicKey = crypto.createPublicKey({
    key: publicKeyPem,
    format: 'pem',
    type: 'spki'
  });

  const verify = crypto.createVerify('SHA256');
  verify.update(message);
  verify.end();

  const isValid = verify.verify(publicKey, signature, 'hex');

  res.json({ isValid });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
