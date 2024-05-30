// src/components/DecryptComponent.jsx
import React, { useState } from 'react';
import Navbar from "../components/nav2";
import AESDecryptComponent from '../components/AESDecryptComponent';
import RSADecryptComponent from '../components/RSADecryptComponent';
import DSADecryptComponent from '../components/DSADecryptComponent';

function DecryptComponent() {
  const [decryptionType, setDecryptionType] = useState('aes');

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Decrypt Text</h1>
        <div className="mb-4">
          <button
            onClick={() => setDecryptionType('aes')}
            className={`px-4 py-2 mr-2 ${decryptionType === 'aes' ? 'bg-blue-500' : 'bg-gray-300'} text-white rounded-md hover:bg-blue-600`}
          >
            AES
          </button>
          <button
            onClick={() => setDecryptionType('rsa')}
            className={`px-4 py-2 mr-2 ${decryptionType === 'rsa' ? 'bg-blue-500' : 'bg-gray-300'} text-white rounded-md hover:bg-blue-600`}
          >
            RSA
          </button>
          <button
            onClick={() => setDecryptionType('dsa')}
            className={`px-4 py-2 ${decryptionType === 'dsa' ? 'bg-blue-500' : 'bg-gray-300'} text-white rounded-md hover:bg-blue-600`}
          >
            DSA
          </button>
        </div>
        {decryptionType === 'aes' && <AESDecryptComponent />}
        {decryptionType === 'rsa' && <RSADecryptComponent />}
        {decryptionType === 'dsa' && <DSADecryptComponent />}
      </div>
    </div>
  );
}

export default DecryptComponent;
