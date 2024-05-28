import React, { useState } from 'react';

function CopyableTextInput() {
  const [inputText, setInputText] = useState('');
  const [encryptedText, setEncryptedText] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleEncryptButtonClick = () => {
    console.log('Sending request to backend...');
    fetch('http://localhost:5000/encrypt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: inputText }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Received response:', data);
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
      <input
        type="text"
        value={encryptedText}
        readOnly
        style={{ marginTop: '10px' }}
      />
      <button onClick={() => navigator.clipboard.writeText(encryptedText)}>Copy Encrypted Text</button>
      <br />
      <input
        type="text"
        value={publicKey}
        readOnly
        style={{ marginTop: '10px' }}
      />
      <button onClick={() => navigator.clipboard.writeText(publicKey)}>Copy Public Key</button>
      <br />
      <input
        type="text"
        value={privateKey}
        readOnly
        style={{ marginTop: '10px' }}
      />
      <button onClick={() => navigator.clipboard.writeText(privateKey)}>Copy Private Key</button>
    </div>
  );
}

export default CopyableTextInput;
