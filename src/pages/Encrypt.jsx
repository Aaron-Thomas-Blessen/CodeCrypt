import React, { useState } from 'react';
import Navbar from "../components/nav2";
import AlgorithmCard from "../components/ac";
import CopyableInput from "../components/ci";
import sharedClasses from '../styles/sharedClasses'; // Importing the shared classes

const Encrypt = () => {
  const [inputType, setInputType] = useState('text');

  return (
    <div className={sharedClasses.container}>
      <Navbar />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <AlgorithmCard title="RSA" details="A widely used public-key encryption algorithm that secures data by encrypting it with a public key and decrypting it with a private key." />
        <AlgorithmCard title="AES" details="A symmetric encryption algorithm known for its speed and security, used worldwide to protect sensitive data." />
        <AlgorithmCard title="DES" details="An older symmetric-key algorithm that encrypts data in 64-bit blocks, now considered insecure due to its short key length." />
        <AlgorithmCard title="SHA" details="A family of cryptographic hash functions that ensure data integrity by generating a unique fixed-size hash from input data." />
      </div>
      <div className="flex justify-center space-x-4 mb-8">
        <button onClick={() => setInputType('text')} className={sharedClasses.button}>Encryption</button>
        <button onClick={() => setInputType('number')} className={sharedClasses.button}>Decryption</button>
      </div>
      <div className="space-y-4">
        <div>
          <label htmlFor="inputText" className={sharedClasses.label}>Input Text</label>
          <textarea id="inputText" rows="4" className={sharedClasses.textarea} type={inputType}></textarea>
        </div>
        <div>
          <label htmlFor="outputText" className={sharedClasses.label}>Output Text</label>
          <textarea id="outputText" rows="4" className={sharedClasses.textarea} readOnly></textarea>
        </div>
      </div>
      <div className="mt-8 space-y-4">
        <CopyableInput id="smallOutput1" label="Public Key" />
        <CopyableInput id="smallOutput2" label="Private Key" />
      </div>
    </div>
  );
};

export default Encrypt;
