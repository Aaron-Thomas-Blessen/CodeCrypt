import React, { useState } from 'react';
import Navbar from "../components/nav2";

function SignComponent() {
  const [inputText, setInputText] = useState('');
  const [signature, setSignature] = useState('');
  const [publicKey, setPublicKey] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSignButtonClick = () => {
    fetch('http://localhost:5000/sign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: inputText }),
    })
    .then(response => response.json())
    .then(data => {
      setSignature(data.signature);
      setPublicKey(data.publicKey);
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Sign Message</h1>
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Enter message here..."
          className="p-2 mb-4 border rounded-md w-full max-w-lg"
        />
        <button
          onClick={handleSignButtonClick}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Sign Message
        </button>
        {signature && (
          <div className="mt-4 w-full max-w-lg">
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
          <div className="mt-4 w-full max-w-lg">
            <label className="block font-semibold mb-2">Public Key:</label>
            <textarea
              value={publicKey}
              readOnly
              rows={4}
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
    </div>
  );
}

export default SignComponent;
