import React, { useState } from 'react';
import Navbar from "../components/nav2";
import AESComponent from '../components/AESComponent';
import RSAComponent from '../components/RSAComponent';
import DSAEncryptComponent from '../components/DSAEncryptComponent';
import SHAComponent from '../components/SHAComponent';

function EncryptComponent() {
  const [encryptionType, setEncryptionType] = useState('aes');

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center p-6 bg-gray-900 min-h-screen text-white">
        <h1 className="text-2xl font-bold mb-4">Encrypt Text</h1>
        <div className="mb-4">
          <button
            onClick={() => setEncryptionType('aes')}
            className={`px-4 py-2 mr-2 ${encryptionType === 'aes' ? 'bg-blue-500' : 'bg-gray-700'} text-white rounded-md hover:bg-blue-600`}
          >
            AES
          </button>
          <button
            onClick={() => setEncryptionType('rsa')}
            className={`px-4 py-2 mr-2 ${encryptionType === 'rsa' ? 'bg-blue-500' : 'bg-gray-700'} text-white rounded-md hover:bg-blue-600`}
          >
            RSA
          </button>
          <button
            onClick={() => setEncryptionType('dsa')}
            className={`px-4 py-2 mr-2 ${encryptionType === 'dsa' ? 'bg-blue-500' : 'bg-gray-700'} text-white rounded-md hover:bg-blue-600`}
          >
            DSA
          </button>
          <button
            onClick={() => setEncryptionType('sha')}
            className={`px-4 py-2 ${encryptionType === 'sha' ? 'bg-blue-500' : 'bg-gray-700'} text-white rounded-md hover:bg-blue-600`}
          >
            SHA
          </button>
        </div>
        {encryptionType === 'aes' && <AESComponent />}
        {encryptionType === 'rsa' && <RSAComponent />}
        {encryptionType === 'dsa' && <DSAEncryptComponent />}
        {encryptionType === 'sha' && <SHAComponent />}
      </div>
    </div>
  );
}

export default EncryptComponent;
