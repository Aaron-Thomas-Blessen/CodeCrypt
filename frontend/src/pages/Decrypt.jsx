import React, { useState } from 'react';
import Navbar from "../components/nav2";

function VerifyComponent() {
  const [message, setMessage] = useState('');
  const [signature, setSignature] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [isValid, setIsValid] = useState(null);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSignatureChange = (e) => {
    setSignature(e.target.value);
  };

  const handlePublicKeyChange = (e) => {
    setPublicKey(e.target.value);
  };

  const handleVerifyButtonClick = () => {
    fetch('http://localhost:5000/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, signature, publicKeyPem: publicKey }),
    })
    .then(response => response.json())
    .then(data => {
      setIsValid(data.isValid);
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Verify Message</h1>
        <textarea
          value={message}
          rows={4}
          onChange={handleMessageChange}
          placeholder="Enter message here..."
          className="p-2 mb-4 border rounded-md w-full max-w-lg bg-gray-50"
        />
        <textarea
          value={signature}
          rows={4}
          onChange={handleSignatureChange}
          placeholder="Enter signature here..."
          className="p-2 mb-4 border rounded-md w-full max-w-lg bg-gray-50"
        />
        <textarea
          value={publicKey}
          rows={4}
          onChange={handlePublicKeyChange}
          placeholder="Enter public key here..."
          className="p-2 mb-4 border rounded-md w-full max-w-lg bg-gray-50"
        />
        <button
          onClick={handleVerifyButtonClick}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mb-4"
        >
          Verify Message
        </button>
        {isValid !== null && (
          <div className="w-full max-w-lg">
            <label className="block font-semibold mb-2">Verification Result:</label>
            <textarea
              value={isValid ? "Valid Signature" : "Invalid Signature"}
              readOnly
              rows={4}
              className="p-2 w-full border rounded-md bg-gray-50 mb-2"
            />
            <button
              onClick={() => navigator.clipboard.writeText(isValid ? "Valid Signature" : "Invalid Signature")}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Copy Result
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default VerifyComponent;
