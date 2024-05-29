import React, { useState } from 'react';

function DecryptComponent() {
  const [encryptedText, setEncryptedText] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [decryptedText, setDecryptedText] = useState('');

  const handleEncryptedTextChange = (e) => {
    setEncryptedText(e.target.value);
  };

  const handlePrivateKeyChange = (e) => {
    setPrivateKey(e.target.value);
  };

  const handleDecryptButtonClick = () => {
    fetch('http://localhost:5000/decrypt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ encryptedText, privateKey }),
    })
    .then(response => response.json())
    .then(data => {
      setDecryptedText(data.decryptedText);
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <h1>Decrypt Text</h1>
      <textarea
        type="text"
        value={encryptedText}
        rows={4}
        style={{ marginTop: '10px' , width: '100%' }}
        onChange={handleEncryptedTextChange}
        placeholder="Enter encrypted text here..."

      />
      <br />
      <textarea
        type="text"
        value={privateKey}
        rows={10}
        style={{ marginTop: '10px' , width: '100%' }}
        onChange={handlePrivateKeyChange}
        placeholder="Enter private key here..."
      />
      <br />
      <button onClick={handleDecryptButtonClick}>Decrypt Text</button>
      <br />
      <textarea
        type="text"
        value={decryptedText}
        readOnly
        rows={4}
        style={{ marginTop: '10px' , width: '100%' }}
      />
      <button onClick={() => navigator.clipboard.writeText(decryptedText)}>Copy Decrypted Text</button>
    </div>
  );
}

export default DecryptComponent;
