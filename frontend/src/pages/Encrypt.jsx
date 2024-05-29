import React, { useState } from 'react';
import Navbar from "../components/nav2";

function EncryptComponent() {
  const [inputText, setInputText] = useState('');
  const [encryptedText, setEncryptedText] = useState('');
  const [key, setKey] = useState('');
  const [iv, setIv] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [encryptionType, setEncryptionType] = useState('aes');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleEncryptButtonClick = () => {
    fetch(`http://localhost:5000/encrypt/${encryptionType}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: inputText }),
    })
    .then(response => response.json())
    .then(data => {
      setEncryptedText(data.encryptedText);
      if (encryptionType === 'aes') {
        setKey(data.key);
        setIv(data.iv);
        setPublicKey('');
        setPrivateKey('');
      } else {
        setKey('');
        setIv('');
        setPublicKey(data.publicKey);
        setPrivateKey(data.privateKey);
      }
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Encrypt Text</h1>
        <div className="mb-4">
          <button
            onClick={() => setEncryptionType('aes')}
            className={`px-4 py-2 mr-2 ${encryptionType === 'aes' ? 'bg-blue-500' : 'bg-gray-300'} text-white rounded-md hover:bg-blue-600`}
          >
            AES
          </button>
          <button
            onClick={() => setEncryptionType('rsa')}
            className={`px-4 py-2 ${encryptionType === 'rsa' ? 'bg-blue-500' : 'bg-gray-300'} text-white rounded-md hover:bg-blue-600`}
          >
            RSA
          </button>
        </div>
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
        {encryptionType === 'aes' && key && (
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
        {encryptionType === 'aes' && iv && (
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
        {encryptionType === 'rsa' && publicKey && (
          <div className="mt-4 w-full max-w-lg">
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
        {encryptionType === 'rsa' && privateKey && (
          <div className="mt-4 w-full max-w-lg">
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
    </div>
  );
}

export default EncryptComponent;
