// src/components/DSAEncryptComponent.jsx
import React, { useState } from 'react';

function DSAEncryptComponent() {
  const [inputText, setInputText] = useState('');
  const [signature, setSignature] = useState('');
  const [publicKey, setPublicKey] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleEncryptButtonClick = () => {
    fetch('http://localhost:5000/encrypt/dsa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: inputText }),
    })
    .then(response => response.json())
    .then(data => {
      setSignature(data.signature);
      setPublicKey(data.publicKey);
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
        Sign Text
      </button>
      {signature && (
        <div className="mt-4">
          <label className="block font-semibold mb-2">Signature:</label>
          <textarea
            value={signature}
            readOnly
            rows={4}
            className="p-2 w-full border rounded-md bg-gray-50 mb-2"
          />
          <button
            onClick={() => navigator.clipboard.writeText(signature)}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Copy Signature
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
    </div>
  );
}

export default DSAEncryptComponent;
