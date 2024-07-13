import React, { useState } from "react";
import CopyableInput from "../components/ci2";
import ProgressButton from "../components/ProgressButton";
import { useAuth } from "../context/AuthContext"; // Import the useAuth hook

const StudyAES = () => {
  const { user, updateProgress } = useAuth(); // Destructure updateProgress from useAuth
  const [progress, setProgress] = useState(user?.progress?.AES || 0);
  const [currentButton, setCurrentButton] = useState(0);

  const handleUpdateProgress = async (buttonIndex) => {
    if (buttonIndex === currentButton) {
      let newProgress = progress;
      // Increment progress by 33% for each button click
      newProgress = Math.min(progress + 33, 100);
      setProgress(newProgress);
      setCurrentButton(currentButton + 1);

      // Ensure progress reaches 100% on the last button click
      if (buttonIndex === 2) {
        setProgress(100);
        setCurrentButton(3);
      }

      // Update progress in Firebase
      await updateProgress("AES", newProgress);
    }
  };

  return (
    <div>
      <div className="relative mt-4">
        <div className="h-2 bg-gray-200 rounded-md overflow-hidden">
          <div
            className={`h-full ${
              progress === 100 ? "bg-green-500" : "bg-red-600"
            }`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="absolute top-0 right-0 p-2 bg-gray-200 rounded-md">
          <span className="text-s font-bold text-black">{progress}%</span>
        </div>
      </div>
      <h1 className="text-3xl font-bold mb-2">
        Introduction and Key Expansion
      </h1>
      <div className="bg-green-800 p-6 mt-4 rounded-md">
        <h1 className="text-xl font-bold mb-2">Introduction</h1>
        <p>
          <strong>AES (Advanced Encryption Standard)</strong> is a symmetric
          encryption algorithm used globally to secure data.
        </p>
        <h2 className="text-l font-bold mt-2">Historical Context</h2>
        <ul className="list-disc pl-5">
          <li>
            Standardized by NIST in 2001, developed by Joan Daemen and Vincent
            Rijmen.
          </li>
        </ul>
        <h1 className="text-xl font-bold mt-2">Key Features</h1>
        <ul className="list-disc pl-5">
          <li>Symmetric key algorithm.</li>
          <li>Block cipher with 128-bit blocks.</li>
          <li>Key sizes: 128, 192, or 256 bits.</li>
        </ul>
      </div>
      <div className="bg-green-800 p-6 mt-4 rounded-md">
        <h1 className="text-xl font-bold mt-2 mb-2">Key Expansion</h1>
        <ul className="list-disc pl-5">
          <li>
            <strong>Key Schedule</strong>
          </li>
          <ul className="list-disc pl-5">
            <li>Expands the cipher key into a series of round keys.</li>
            <li>
              The number of rounds depends on the key size: 10, 12, or 14
              rounds.
            </li>
          </ul>
        </ul>
        <h1 className="text-xl font-bold mt-2 mb-2">Steps for 128-bit Key</h1>
        <ol className="list-decimal pl-5">
          <li>
            <strong>Initial Key</strong>
          </li>
          <ul className="list-disc pl-5">
            <li>Example: `2b7e151628aed2a6abf7158809cf4f3c`.</li>
          </ul>
          <li>
            <strong>Key Expansion Process</strong>
          </li>
          <ul className="list-disc pl-5">
            <li>
              Generate an array of words (32-bit each) from the initial key.
            </li>
            <li>
              Perform transformations on the initial key to produce round keys.
            </li>
          </ul>
        </ol>
        <h1 className="text-xl font-bold mt-2 mb-2">
          Interactive Section: Key Expansion
        </h1>
        <ul className="list-disc pl-5">
          <li>Input: 128-bit key.</li>
          <li>Output: Expanded key schedule.</li>
          <li>Code Example (Python):</li>
        </ul>
        <CopyableInput
          value={`from Crypto.Cipher import AES\nimport binascii\n\ndef expand_key_128bit(key):\n    key_bytes = binascii.unhexlify(key)\n    cipher = AES.new(key_bytes, AES.MODE_ECB)\n    expanded_key = cipher.expand_key(key_bytes)\n    return binascii.hexlify(expanded_key)\n\nkey = "2b7e151628aed2a6abf7158809cf4f3c"\nexpanded_key = expand_key_128bit(key)\nprint("Expanded Key:", expanded_key)`}
        />
      </div>
      <div className="mt-4 space-y-4 flex justify-end space-x-4">
        <ProgressButton
          onClick={() => handleUpdateProgress(0)}
          progress={progress}
          isCompleted={progress >= 33}
          disabled={currentButton !== 0}
        />
      </div>
      <h1 className="text-3xl font-bold mb-2 mt-2">
        Encryption and Decryption
      </h1>
      <div className="bg-green-800 p-6 mt-4 rounded-md">
        <h1 className="text-xl font-bold mb-2">Encryption Process</h1>
        <ol className="list-decimal pl-5">
          <li>
            <strong>Divide plaintext into 128-bit blocks.</strong>
          </li>
          <li>
            <strong>Initial AddRoundKey step.</strong>
          </li>
          <li>
            <strong>For each round:</strong>
          </li>
          <ul className="list-disc pl-5">
            <li>SubBytes</li>
            <li>ShiftRows</li>
            <li>MixColumns (except final round)</li>
            <li>AddRoundKey</li>
          </ul>
        </ol>
        <h1 className="text-xl font-bold mb-2 mt-2">Decryption Process</h1>
        <ol className="list-decimal pl-5">
          <li>
            <strong>Initial AddRoundKey step.</strong>
          </li>
          <li>
            <strong>For each round (in reverse):</strong>
          </li>
          <ul className="list-disc pl-5">
            <li>InvShiftRows</li>
            <li>InvSubBytes</li>
            <li>InvAddRoundKey</li>
            <li>InvMixColumns (except final round)</li>
          </ul>
          <li>
            <strong>Combine decrypted blocks to form plaintext.</strong>
          </li>
        </ol>
        <h1 className="text-xl font-bold mb-2 mt-2">
          Interactive Section: Encrypt/Decrypt
        </h1>
        <ul className="list-disc pl-5">
          <li>Input: 128-bit plaintext and key.</li>
          <li>Output: Encrypted ciphertext and decrypted plaintext.</li>
          <li>Code Example (Python):</li>
        </ul>
        <CopyableInput
          value={`from Crypto.Cipher import AES\nimport binascii\n\ndef encrypt_decrypt_aes_128bit(plaintext, key):\n    key_bytes = binascii.unhexlify(key)\n    cipher = AES.new(key_bytes, AES.MODE_ECB)\n    plaintext_bytes = binascii.unhexlify(plaintext)\n    ciphertext = cipher.encrypt(plaintext_bytes)\n    decrypted_plaintext = cipher.decrypt(ciphertext)\n    return binascii.hexlify(ciphertext), binascii.hexlify(decrypted_plaintext)\n\nkey = "2b7e151628aed2a6abf7158809cf4f3c"\nplaintext = "3243f6a8885a308d313198a2e0370734"\nciphertext, decrypted_plaintext = encrypt_decrypt_aes_128bit(plaintext, key)\nprint("Ciphertext:", ciphertext)\nprint("Decrypted Plaintext:", decrypted_plaintext)`}
        />
      </div>
      <div className="mt-4 space-y-4 flex justify-end space-x-4">
        <ProgressButton
          onClick={() => handleUpdateProgress(1)}
          progress={progress}
          isCompleted={progress >= 66}
          disabled={currentButton !== 1}
        />
      </div>
      <h1 className="text-3xl font-bold mb-2 mt-2">Real-world Applications</h1>
      <div className="bg-green-800 p-6 mt-4 rounded-md">
        <h1 className="text-xl font-bold mb-2">
          Use Cases of AES in Real-world Applications
        </h1>
        <ul className="list-disc pl-5">
          <li>
            <strong>Data Security:</strong> AES is widely used to secure
            sensitive data.
          </li>
          <li>
            <strong>SSL/TLS:</strong> AES is used in securing web traffic.
          </li>
          <li>
            <strong>Disk Encryption:</strong> Used by tools like BitLocker and
            FileVault.
          </li>
        </ul>
      </div>
      <div className="mt-4 space-y-4 flex justify-end space-x-4">
        <ProgressButton
          onClick={() => handleUpdateProgress(2)}
          progress={progress}
          isCompleted={progress === 100}
          disabled={currentButton !== 2}
        />
      </div>
    </div>
  );
};

export default StudyAES;
