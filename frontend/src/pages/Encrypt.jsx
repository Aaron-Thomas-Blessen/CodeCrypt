import React, { useState } from 'react';

function EncryptComponent() {
  const [inputText, setInputText] = useState('');
  const [encryptedText, setEncryptedText] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleEncryptButtonClick = () => {
    fetch('http://localhost:5000/encrypt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: inputText }),
    })
    .then(response => response.json())
    .then(data => {
      setEncryptedText(data.encryptedText);
      setPublicKey(data.publicKey);
      setPrivateKey(data.privateKey);
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <h1>Encrypt Text</h1>
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Enter text here..."
      />
      <button onClick={handleEncryptButtonClick}>Encrypt Text</button>
      <br />
      <textarea
        type="text"
        value={encryptedText}
        readOnly
        rows={4}
        style={{ marginTop: '10px' , width: '100%' }}
      />
      <button onClick={() => navigator.clipboard.writeText(encryptedText)}>Copy Encrypted Text</button>
      <br />
      <textarea
        type="text"
        value={publicKey}
        readOnly
        rows={10}
        style={{ marginTop: '10px' , width: '100%' }}
      />
      <button onClick={() => navigator.clipboard.writeText(publicKey)}>Copy Public Key</button>
      <br />
      <textarea
        type="text"
        value={privateKey}
        readOnly
        rows={10}
        style={{ marginTop: '10px', width: '100%'  }}
      />
      <button onClick={() => navigator.clipboard.writeText(privateKey)}>Copy Private Key</button>
    </div>
  );
}

export default EncryptComponent;
