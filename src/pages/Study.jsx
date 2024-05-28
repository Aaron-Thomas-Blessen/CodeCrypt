import React, { useState } from 'react';
import Navbar from "../components/nav2";
import AlgorithmCard from "../components/ac2";

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
      description: 'RSA is a public-key cryptosystem that is widely used for secure data transmission. It involves generating a public and private key, encrypting data with the public key, and decrypting it with the private key.',
      steps: [
        'Step 1: Key Generation - Generate two large prime numbers and compute their product.',
        'Step 2: Encryption - Use the public key to encrypt the data.',
        'Step 3: Decryption - Use the private key to decrypt the data.'
      ],
      example: 'Example: Encrypting a message "HELLO" using RSA with a given public key.'
    },
    AES: {
      description: 'AES (Advanced Encryption Standard) is a symmetric encryption algorithm widely used across the globe. It encrypts data in blocks using a series of transformations.',
      steps: [
        'Step 1: Key Expansion - Generate a series of round keys from the initial key.',
        'Step 2: Initial Round - AddRoundKey operation.',
        'Step 3: Main Rounds - Series of SubBytes, ShiftRows, MixColumns, and AddRoundKey operations.',
        'Step 4: Final Round - SubBytes, ShiftRows, and AddRoundKey operations.'
      ],
      example: 'Example: Encrypting a 128-bit block of data using a 128-bit AES key.'
    },
    DES: {
      description: 'DES (Data Encryption Standard) is a symmetric-key algorithm for the encryption of digital data. It operates on a block of data using a 56-bit key.',
      steps: [
        'Step 1: Key Generation - Generate a 56-bit key.',
        'Step 2: Initial Permutation - Initial rearrangement of the data block.',
        'Step 3: Round Function - 16 rounds of Feistel cipher involving substitution and permutation.',
        'Step 4: Final Permutation - Final rearrangement of the data block.'
      ],
      example: 'Example: Encrypting a 64-bit block of data using a 56-bit DES key.'
    },
    SHA: {
      description: 'SHA (Secure Hash Algorithm) is a family of cryptographic hash functions designed to ensure data integrity. It produces a fixed-size hash value from variable input data.',
      steps: [
        'Step 1: Padding - Pad the data to ensure its length is a multiple of 512 bits.',
        'Step 2: Parsing - Divide the padded data into 512-bit blocks.',
        'Step 3: Hash Computation - Initialize hash values and perform compression on each block.'
      ],
      example: 'Example: Generating a SHA-256 hash of the message "Hello, World!".'
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
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {Object.keys(algorithmDescriptions).map((algorithm) => (
          <div key={algorithm} className="w-full">
            <AlgorithmCard
              title={algorithm}
              details={algorithmDescriptions[algorithm]}
              onClick={() => handleAlgorithmClick(algorithm)}
              completed={completedAlgorithms.includes(algorithm)}
            />
          </div>
        ))}
      </div>
      {!selectedAlgorithm && (
        <div className="text-center mt-8">
          <h1 className="text-3xl font-bold">Welcome to the Study Area</h1>
          <p className="text-lg mt-4">
            Here you can explore the steps involved in various cryptographic algorithms.
            Click on any algorithm card to learn more about it.
          </p>
        </div>
      )}
      {selectedAlgorithm && (
        <div className="text-center mt-8">
          <h2 className="text-2xl font-semibold">{selectedAlgorithm} Algorithm Details</h2>
          <p className="text-lg mt-4">{algorithmDetails[selectedAlgorithm].description}</p>
          <div className="mt-6">
            <h3 className="text-xl font-semibold">Steps to Achieve</h3>
            <ul className="list-disc list-inside mt-2 text-center">
              {algorithmDetails[selectedAlgorithm].steps.map((step, index) => (
                <li key={index} className="mt-2">{step}</li>
              ))}
            </ul>
          </div>
          <h3 className="text-xl font-semibold mt-6">Example</h3>
          <p className="text-lg mt-4 whitespace-pre-wrap">{algorithmDetails[selectedAlgorithm].example}</p>
          <button
            onClick={() => handleCompletion(selectedAlgorithm)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8"
          >
            Completed
          </button>
        </div>
      )}
    </div>
  );
};

export default Study;
