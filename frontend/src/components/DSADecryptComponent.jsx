// src/components/DSADecryptComponent.jsx
import React, { useState } from 'react';

function DSADecryptComponent() {
  const [encryptedText, setEncryptedText] = useState('');
  const [signature, setSignature] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [decryptedText, setDecryptedText] = useState('');

  const handleEncryptedTextChange = (e) => {
    setEncryptedText(e.target.value);
  };

  const handleSignatureChange = (e) => {
    setSignature(e.target.value);
  };

  const handlePublicKeyChange = (e) => {
    setPublicKey(e.target.value);
  };

  const handleDecryptButtonClick = () => {
    fetch('http://localhost:5000/decrypt/dsa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: encryptedText, signature, publicKey }),
    })
    .then(response => response.json())
    .then(data => {
      setDecryptedText(data.verified);
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <div className="w-full max-w-lg">
      <textarea
        value={encryptedText}
        rows={4}
        onChange={handleEncryptedTextChange}
        placeholder="Enter signed text here..."
        className="p-2 mb-4 border rounded-md w-full bg-gray-50"
      />
      <textarea
        value={signature}
        rows={4}
        onChange={handleSignatureChange}
        placeholder="Enter signature here..."
        className="p-2 mb-4 border rounded-md w-full bg-gray-50"
      />
      <textarea
        value={publicKey}
        rows={10}
        onChange={handlePublicKeyChange}
        placeholder="Enter public key here..."
        className="p-2 mb-4 border rounded-md w-full bg-gray-50"
      />
      <button
        onClick={handleDecryptButtonClick}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Verify Signature
      </button>
      {decryptedText && (
        <div className="mt-4">
          <label className="block font-semibold mb-2">Verification Result:</label>
          <textarea
            value={decryptedText}
            readOnly
            rows={4}
            className="p-2 w-full border rounded-md bg-gray-50 mb-2"
          />
          <button
            onClick={() => navigator.clipboard.writeText(decryptedText)}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Copy Verification Result
          </button>
        </div>
      )}
    </div>
  );
}

export default DSADecryptComponent;
