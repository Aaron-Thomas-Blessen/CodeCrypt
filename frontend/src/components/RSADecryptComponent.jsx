import React, { useState } from "react";

function RSADecryptComponent() {
  const [encryptedText, setEncryptedText] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [decryptedText, setDecryptedText] = useState("");

  const handleEncryptedTextChange = (e) => {
    setEncryptedText(e.target.value);
  };

  const handlePrivateKeyChange = (e) => {
    setPrivateKey(e.target.value);
  };

  const base64ToArrayBuffer = (base64) => {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  };

  const hexToBytes = (hex) =>
    new Uint8Array(hex.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));

  const handleDecryptButtonClick = async () => {
    try {
      const privateKeyData = base64ToArrayBuffer(privateKey);
      const encryptedData = hexToBytes(encryptedText);

      const importedKey = await window.crypto.subtle.importKey(
        "pkcs8",
        privateKeyData,
        {
          name: "RSA-OAEP",
          hash: { name: "SHA-256" },
        },
        false,
        ["decrypt"]
      );

      const decryptedBuffer = await window.crypto.subtle.decrypt(
        {
          name: "RSA-OAEP",
        },
        importedKey,
        encryptedData
      );

      const decoder = new TextDecoder();
      const decryptedText = decoder.decode(decryptedBuffer);

      setDecryptedText(decryptedText);
    } catch (error) {
      console.error("Decryption Error:", error);
    }
  };

  return (
    <div className="w-full max-w-lg">
      <textarea
        value={encryptedText}
        rows={4}
        onChange={handleEncryptedTextChange}
        placeholder="Enter encrypted text here..."
        className="p-2 mb-4 border rounded-md w-full bg-gray-800 text-white placeholder-gray-400"
      />
      <textarea
        value={privateKey}
        rows={10}
        onChange={handlePrivateKeyChange}
        placeholder="Enter private key here..."
        className="p-2 mb-4 border rounded-md w-full bg-gray-800 text-white placeholder-gray-400"
      />
      <button
        onClick={handleDecryptButtonClick}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Decrypt Text
      </button>
      {decryptedText && (
        <div className="mt-4">
          <label className="block font-semibold mb-2">Decrypted Text:</label>
          <textarea
            value={decryptedText}
            readOnly
            rows={4}
            className="p-2 w-full border rounded-md bg-gray-800 text-white mb-2"
          />
          <button
            onClick={() => navigator.clipboard.writeText(decryptedText)}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Copy Decrypted Text
          </button>
        </div>
      )}
    </div>
  );
}

export default RSADecryptComponent;
