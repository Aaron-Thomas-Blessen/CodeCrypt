import React, { useState } from 'react';
import Navbar from "../components/nav2";

function EncryptComponent() {
  const [inputText, setInputText] = useState('');
  const [encryptedText, setEncryptedText] = useState('');
  const [key, setKey] = useState('');
  const [iv, setIv] = useState('');

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
      setKey(data.key);
      setIv(data.iv);
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Encrypt Text</h1>
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Enter text here..."
          className="p-2 mb-4 border rounded-md w-full max-w-lg"
        />
        <button
          onClick={handleEncryptButtonClick}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Encrypt Text
        </button>
        {encryptedText && (
          <div className="mt-4 w-full max-w-lg">
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
        {key && (
          <div className="mt-4 w-full max-w-lg">
            <label className="block font-semibold mb-2">Key:</label>
            <textarea
              value={key}
              readOnly
              rows={4}
              className="p-2 w-full border rounded-md bg-gray-50 mb-2"
            />
            <button
              onClick={() => navigator.clipboard.writeText(key)}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Copy Key
            </button>
          </div>
        )}
        {iv && (
          <div className="mt-4 w-full max-w-lg">
            <label className="block font-semibold mb-2">IV:</label>
            <textarea
              value={iv}
              readOnly
              rows={4}
              className="p-2 w-full border rounded-md bg-gray-50 mb-2"
            />
            <button
              onClick={() => navigator.clipboard.writeText(iv)}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Copy IV
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EncryptComponent;
