const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { exec } = require('child_process');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.post('/encrypt', (req, res) => {
  const { text } = req.body;
  exec(`./rsa encrypt "${text}"`, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: stderr });
    }

    const output = stdout.trim().split('\n');
    const encryptedText = output[0];

    const publicKeyStart = output.indexOf('-----BEGIN PUBLIC KEY-----');
    const publicKeyEnd = output.indexOf('-----END PUBLIC KEY-----');
    const publicKey = output.slice(publicKeyStart, publicKeyEnd + 1).join('\n');

    const privateKeyStart = output.indexOf('-----BEGIN RSA PRIVATE KEY-----');
    const privateKeyEnd = output.indexOf('-----END RSA PRIVATE KEY-----');
    const privateKey = output.slice(privateKeyStart, privateKeyEnd + 1).join('\n');

    res.json({ encryptedText, publicKey, privateKey });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
