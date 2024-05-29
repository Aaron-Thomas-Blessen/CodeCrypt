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
    const publicKey = output.slice(1, output.indexOf('-----END PUBLIC KEY-----') + 1).join('\n');
    const privateKey = output.slice(output.indexOf('-----BEGIN RSA PRIVATE KEY-----')).join('\n');

    res.json({ encryptedText, publicKey, privateKey });
  });
});

app.post('/decrypt', (req, res) => {
  const { encryptedText, privateKey } = req.body;
  exec(`./rsa decrypt "${encryptedText}" "${privateKey}"`, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: stderr });
    }

    const decryptedText = stdout.trim();
    res.json({ decryptedText });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
