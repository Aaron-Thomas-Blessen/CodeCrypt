import React, { useState } from "react";

function DecryptComponent() {
  const [encryptedText, setEncryptedText] = useState("");
  const [decryptedText, setDecryptedText] = useState("");
  const [key, setKey] = useState("");
  const [iv, setIv] = useState("");
  const [file, setFile] = useState(null);
  const [decryptedFile, setDecryptedFile] = useState(null);

  const handleEncryptedTextChange = (e) => {
    setEncryptedText(e.target.value);
  };

  const handleKeyChange = (e) => {
    setKey(e.target.value);
  };

  const handleIvChange = (e) => {
    setIv(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const decryptText = async () => {
    try {
      const keyBuffer = new Uint8Array(
        key.match(/.{1,2}/g).map((byte) => parseInt(byte, 16))
      );
      const ivBuffer = new Uint8Array(
        iv.match(/.{1,2}/g).map((byte) => parseInt(byte, 16))
      );
      const encryptedBuffer = new Uint8Array(
        encryptedText.match(/.{1,2}/g).map((byte) => parseInt(byte, 16))
      );

      const cryptoKey = await window.crypto.subtle.importKey(
        "raw",
        keyBuffer,
        { name: "AES-CBC" },
        false,
        ["decrypt"]
      );

      const decryptedBuffer = await window.crypto.subtle.decrypt(
        {
          name: "AES-CBC",
          iv: ivBuffer,
        },
        cryptoKey,
        encryptedBuffer
      );

      const decoder = new TextDecoder();
      const decryptedText = decoder.decode(decryptedBuffer);
      setDecryptedText(decryptedText);
    } catch (error) {
      console.error("Decryption Error:", error);
    }
  };

  const decryptFile = async () => {
    if (!file) {
      alert("Please select an encrypted file to decrypt.");
      return;
    }

    try {
      const keyBuffer = new Uint8Array(
        key.match(/.{1,2}/g).map((byte) => parseInt(byte, 16))
      );
      const ivBuffer = new Uint8Array(
        iv.match(/.{1,2}/g).map((byte) => parseInt(byte, 16))
      );
      const encryptedFileArrayBuffer = await file.arrayBuffer();

      const cryptoKey = await window.crypto.subtle.importKey(
        "raw",
        keyBuffer,
        { name: "AES-CBC" },
        false,
        ["decrypt"]
      );

      const decryptedBuffer = await window.crypto.subtle.decrypt(
        {
          name: "AES-CBC",
          iv: ivBuffer,
        },
        cryptoKey,
        encryptedFileArrayBuffer
      );

      const decryptedBlob = new Blob([decryptedBuffer]);
      setDecryptedFile(URL.createObjectURL(decryptedBlob));
    } catch (error) {
      console.error("Decryption Error:", error);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-10">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Decrypt Text</h2>
        <textarea
          value={encryptedText}
          onChange={handleEncryptedTextChange}
          placeholder="Enter encrypted text here..."
          className="p-2 mb-4 border rounded-md w-full"
          rows={4}
        />
        <input
          type="text"
          value={key}
          onChange={handleKeyChange}
          placeholder="Enter key here..."
          className="p-2 mb-4 border rounded-md w-full"
        />
        <input
          type="text"
          value={iv}
          onChange={handleIvChange}
          placeholder="Enter IV here..."
          className="p-2 mb-4 border rounded-md w-full"
        />
        <button
          onClick={decryptText}
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
              className="p-2 w-full border rounded-md mb-2"
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

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Decrypt File</h2>
        <input type="file" onChange={handleFileChange} className="mb-4" />
        <input
          type="text"
          value={key}
          onChange={handleKeyChange}
          placeholder="Enter key here..."
          className="p-2 mb-4 border rounded-md w-full"
        />
        <input
          type="text"
          value={iv}
          onChange={handleIvChange}
          placeholder="Enter IV here..."
          className="p-2 mb-4 border rounded-md w-full"
        />
        <button
          onClick={decryptFile}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Decrypt File
        </button>
        {decryptedFile && (
          <div className="mt-4">
            <a
              href={decryptedFile}
              download="decrypted-file"
              className="block font-semibold mb-2"
            >
              Download Decrypted File
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default DecryptComponent;
