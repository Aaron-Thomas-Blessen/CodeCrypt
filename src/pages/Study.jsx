import React, { useState } from 'react';
import Navbar from "../components/nav2";
import AlgorithmCard from "../components/ac2";
import sharedClasses from '../styles/sharedClasses'; // Importing the shared classes
import CopyableInput from "../components/ci"; // Assuming this is a component to copy code easily

const Study = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
  const [completedAlgorithms, setCompletedAlgorithms] = useState([]);

  const algorithmDescriptions = {
    RSA: 'Click to view RSA details and steps.',
    AES: 'Click to view AES details and steps.',
    DES: 'Click to view DES details and steps.',
    SHA: 'Click to view SHA details and steps.',
  };

  const algorithmDetails = {
    RSA: {
      description: [
        {
          text: 'RSA(Rivest–Shamir–Adleman) is an asymmetric cryptographic algorithm used for secure data transmission. It uses a pair of keys: a public key for encryption and a private key for decryption.',
        },
        {
          text: 'Historical Context',
          subpoints: [
            'Introduced in 1977 by Ron Rivest, Adi Shamir, and Leonard Adleman.',
            'Widely used in digital signatures and key exchanges.'
          ]
        }
      ],
      steps: [
        'Step 1: Key Generation - Generate two large prime numbers and compute their product.',
        'Step 2: Encryption - Use the public key to encrypt the data.',
        'Step 3: Decryption - Use the private key to decrypt the data.'
      ],
      example: 'Example: Encrypting a message "HELLO" using RSA with a given public key.',
      code: `// RSA Encryption Example
  const encrypt = (publicKey, message) => {
    // encryption logic
  };
  const decrypt = (privateKey, encryptedMessage) => {
    // decryption logic
  };`
    },
    AES: {
      description: 'AES (Advanced Encryption Standard) is a symmetric encryption algorithm widely used across the globe. It encrypts data in blocks using a series of transformations.',
      steps: [
        'Step 1: Key Expansion - Generate a series of round keys from the initial key.',
        'Step 2: Initial Round - AddRoundKey operation.',
        'Step 3: Main Rounds - Series of SubBytes, ShiftRows, MixColumns, and AddRoundKey operations.',
        'Step 4: Final Round - SubBytes, ShiftRows, and AddRoundKey operations.'
      ],
      example: 'Example: Encrypting a 128-bit block of data using a 128-bit AES key.',
      code: `// AES Encryption Example
const encrypt = (key, data) => {
  // encryption logic
};
const decrypt = (key, encryptedData) => {
  // decryption logic
};`
    },
    DES: {
      description: 'DES (Data Encryption Standard) is a symmetric-key algorithm for the encryption of digital data. It operates on a block of data using a 56-bit key.',
      steps: [
        'Step 1: Key Generation - Generate a 56-bit key.',
        'Step 2: Initial Permutation - Initial rearrangement of the data block.',
        'Step 3: Round Function - 16 rounds of Feistel cipher involving substitution and permutation.',
        'Step 4: Final Permutation - Final rearrangement of the data block.'
      ],
      example: 'Example: Encrypting a 64-bit block of data using a 56-bit DES key.',
      code: `// DES Encryption Example
const encrypt = (key, data) => {
  // encryption logic
};
const decrypt = (key, encryptedData) => {
  // decryption logic
};`
    },
    SHA: {
      description: 'SHA (Secure Hash Algorithm) is a family of cryptographic hash functions designed to ensure data integrity. It produces a fixed-size hash value from variable input data.',
      steps: [
        'Step 1: Padding - Pad the data to ensure its length is a multiple of 512 bits.',
        'Step 2: Parsing - Divide the padded data into 512-bit blocks.',
        'Step 3: Hash Computation - Initialize hash values and perform compression on each block.'
      ],
      example: 'Example: Generating a SHA-256 hash of the message "Hello, World!".',
      code: `// SHA-256 Hash Example
const hash = (data) => {
  // hashing logic
};`
    },
  };

  const handleAlgorithmClick = (algorithm) => {
    setSelectedAlgorithm(algorithm);
  };

  const handleCompletion = (algorithm) => {
    if (!completedAlgorithms.includes(algorithm)) {
      setCompletedAlgorithms([...completedAlgorithms, algorithm]);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />
      <div className={`${sharedClasses.container} flex-grow pt-0`}>
        <div className="container mx-auto px-4 py-2 mt-0">
          <h1 className="text-3xl font-bold text-center dark:text-zinc-200 mb-8">Study Area</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {Object.keys(algorithmDescriptions).map((algorithm) => (
              <AlgorithmCard
                key={algorithm}
                title={algorithm}
                details={algorithmDescriptions[algorithm]}
                onClick={() => handleAlgorithmClick(algorithm)}
                completed={completedAlgorithms.includes(algorithm)}
              />
            ))}
          </div>
          {!selectedAlgorithm && (
            <div className="text-center mt-8">
              <h2 className="text-2xl font-semibold">Welcome to the Study Area</h2>
              <p className="text-lg mt-4">Click on any algorithm card to learn more about it.</p>
            </div>
          )}
          {selectedAlgorithm && (
          <div className="text-center mt-8">
            <h2 className="text-2xl font-semibold">{selectedAlgorithm} Algorithm </h2>
            <div className="bg-gray-800 p-4 rounded-lg mt-4" style={{ textAlign: 'justify' }}>
              <ul className="list-disc list-inside text-lg">
                {algorithmDetails[selectedAlgorithm].description.map((descriptionPoint, index) => (
                  <li key={index}>
                    {descriptionPoint.text}
                    {descriptionPoint.subpoints && (
                      <ul className="list-disc list-inside ml-8">
                        {descriptionPoint.subpoints.map((subpoint, subIndex) => (
                          <li key={subIndex}>{subpoint}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
           <div className="mt-6">
             <h3 className="text-xl font-semibold">Steps to Achieve</h3>
             <div className="bg-gray-800 p-4 rounded-lg mt-4" style={{ textAlign: 'justify' }}>
               <ul className="list-disc list-inside text-lg">
                 {algorithmDetails[selectedAlgorithm].steps.map((step, index) => (
                   <li key={index} className="mt-2">{step}</li>
                 ))}
               </ul>
             </div>
           </div>
              <h3 className="text-xl font-semibold mt-6">Example</h3>
              <div className="bg-gray-800 p-4 rounded-lg mt-4" style={{ textAlign: 'justify' }}>
                <p className="text-lg whitespace-pre-wrap">{algorithmDetails[selectedAlgorithm].example}</p>
              </div>
              <h3 className="text-xl font-semibold mt-6">Sample Code</h3>
              <CopyableInput
                id={`${selectedAlgorithm}-code`}
                className="bg-gray-800 p-4 rounded-lg mt-4 text-left"
                readOnly
                value={algorithmDetails[selectedAlgorithm].code}
              />
              <button
                onClick={() => handleCompletion(selectedAlgorithm)}
                className={`${sharedClasses.button} mt-8`}
              >
                Mark as Completed
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Study;
