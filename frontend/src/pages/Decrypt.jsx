import React, { useState } from 'react';
import Navbar from "../components/nav2";

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
    <div><Navbar/>
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Decrypt Text</h1>
      <textarea
        value={encryptedText}
        rows={4}
        onChange={handleEncryptedTextChange}
        placeholder="Enter encrypted text here..."
        className="p-2 mb-4 border rounded-md w-full max-w-lg bg-gray-50"
      />
      <textarea
        value={privateKey}
        rows={10}
        onChange={handlePrivateKeyChange}
        placeholder="Enter private key here..."
        className="p-2 mb-4 border rounded-md w-full max-w-lg bg-gray-50"
      />
      <button
        onClick={handleDecryptButtonClick}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mb-4"
      >
        Decrypt Text
      </button>
      {decryptedText && (
        <div className="w-full max-w-lg">
          <label className="block font-semibold mb-2">Decrypted Text:</label>
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
            Copy Decrypted Text
          </button>
        </div>
      )}
    </div>
    </div>
  );
}

export default DecryptComponent;
