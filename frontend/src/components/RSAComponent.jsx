// src/components/RSAComponent.jsx
import React, { useState } from 'react';

function RSAComponent() {
  const [inputText, setInputText] = useState('');
  const [encryptedText, setEncryptedText] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleEncryptButtonClick = () => {
    fetch('http://localhost:5000/encrypt/rsa', {
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
    <div className="w-full max-w-lg">
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Enter text here..."
        className="p-2 mb-4 border rounded-md w-full"
      />
      <button
        onClick={handleEncryptButtonClick}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Encrypt Text
      </button>
      {encryptedText && (
        <div className="mt-4">
          <label className="block font-semibold mb-2">Encrypted Text:</label>
          <textarea
            value={encryptedText}
            readOnly
            rows={4}
            className="p-2 w-full border rounded-md bg-gray-50 mb-2"
          />
          <button
            onClick={() => navigator.clipboard.writeText(encryptedText)}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Copy Encrypted Text
          </button>
        </div>
      )}
      {publicKey && (
        <div className="mt-4">
          <label className="block font-semibold mb-2">Public Key:</label>
          <textarea
            value={publicKey}
            readOnly
            rows={10}
            className="p-2 w-full border rounded-md bg-gray-50 mb-2"
          />
          <button
            onClick={() => navigator.clipboard.writeText(publicKey)}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Copy Public Key
          </button>
        </div>
      )}
      {privateKey && (
        <div className="mt-4">
          <label className="block font-semibold mb-2">Private Key:</label>
          <textarea
            value={privateKey}
            readOnly
            rows={10}
            className="p-2 w-full border rounded-md bg-gray-50 mb-2"
          />
          <button
            onClick={() => navigator.clipboard.writeText(privateKey)}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Copy Private Key
          </button>
        </div>
      )}
    </div>
  );
}

export default RSAComponent;
