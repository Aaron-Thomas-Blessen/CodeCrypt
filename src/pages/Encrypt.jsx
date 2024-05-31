import React, { useState } from 'react';
import Navbar from "../components/nav2";
import AlgorithmCard from "../components/ac";
import CopyableInput from "../components/ci";
import sharedClasses from '../styles/sharedClasses'; // Importing the shared classes

const Encrypt = () => {
  const [inputType, setInputType] = useState('text');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');

  const handleEncryptDecrypt = () => {
    if (inputType === 'text') {
      // Placeholder for encryption logic
      setOutputText(btoa(inputText)); // Using base64 encoding as a placeholder for encryption
    } else {
      // Placeholder for decryption logic
      try {
        setOutputText(atob(inputText)); // Using base64 decoding as a placeholder for decryption
      } catch (error) {
        setOutputText('Invalid input for decryption');
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar />
      <div className={`${sharedClasses.container} flex-grow pt-0`}>
        <div className="container mx-auto px-4 py-2 mt-0">
          <h1 className="text-3xl font-bold text-center dark:text-zinc-200 mb-8">Cryptography Simulation</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <AlgorithmCard title="RSA" details="A widely used public-key encryption algorithm that secures data by encrypting it with a public key and decrypting it with a private key." />
            <AlgorithmCard title="AES" details="A symmetric encryption algorithm known for its speed and security, used worldwide to protect sensitive data." />
            <AlgorithmCard title="DES" details="An older symmetric-key algorithm that encrypts data in 64-bit blocks, now considered insecure due to its short key length." />
            <AlgorithmCard title="SHA" details="A family of cryptographic hash functions that ensure data integrity by generating a unique fixed-size hash from input data." />
          </div>
          <div className="flex justify-center space-x-4 mb-8">
            <button onClick={() => setInputType('text')} className={sharedClasses.button}>Encryption</button>
            <button onClick={() => setInputType('decrypt')} className={sharedClasses.button}>Decryption</button>
          </div>
          <div className="space-y-4">
            <div>
              <label htmlFor="inputText" className={sharedClasses.label}>
                {inputType === 'text' ? 'Input Text' : 'Cipher Text'}
              </label>
              <textarea
                id="inputText"
                rows="4"
                className={sharedClasses.textarea}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              ></textarea>
              {inputType === 'decrypt' && (
                <>
                  <div className="mt-4">
                    <label htmlFor="publicKey" className={sharedClasses.label}>Public Key</label>
                    <textarea
                      id="publicKey"
                      rows="2"
                      className={sharedClasses.textarea}
                      value={publicKey}
                      onChange={(e) => setPublicKey(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="mt-4">
                    <label htmlFor="privateKey" className={sharedClasses.label}>Private Key</label>
                    <textarea
                      id="privateKey"
                      rows="2"
                      className={sharedClasses.textarea}
                      value={privateKey}
                      onChange={(e) => setPrivateKey(e.target.value)}
                    ></textarea>
                  </div>
                </>
              )}
              <div className="flex justify-center space-x-4 mb-2 mt-1">
                <button onClick={handleEncryptDecrypt} className={`${sharedClasses.button} mt-2`}>
                  {inputType === 'text' ? 'Encrypt' : 'Decrypt'}
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="outputText" className={sharedClasses.label}>
                {inputType === 'text' ? 'Cipher Text' : 'Original Text'}
              </label>
              <CopyableInput
                id="outputText"
                rows="4"
                className={sharedClasses.textarea}
                readOnly
                value={outputText}
              />
            </div>
          </div>
          <div className="mt-8 space-y-2">
            {inputType === 'text' && (
              <>
                <CopyableInput id="smallOutput1" label="Public Key" />
                <CopyableInput id="smallOutput2" label="Private Key" />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Encrypt;
