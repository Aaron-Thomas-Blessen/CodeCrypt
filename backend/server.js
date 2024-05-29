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
  exec(`./aes encrypt "${text}"`, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: stderr });
    }

    const output = stdout.trim().split('\n');
    const encryptedText = output[0];
    const key = output[1];
    const iv = output[2];

    res.json({ encryptedText, key, iv });
  });
});

app.post('/decrypt', (req, res) => {
  const { encryptedText, key, iv } = req.body;
  exec(`./aes decrypt "${encryptedText}" "${key}" "${iv}"`, (error, stdout, stderr) => {
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
