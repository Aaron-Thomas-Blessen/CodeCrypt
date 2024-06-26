import React, { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [decryptedFile, setDecryptedFile] = useState("");
  const [key, setKey] = useState("");
  const [iv, setIv] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleKeyChange = (e) => {
    setKey(e.target.value);
  };

  const handleIvChange = (e) => {
    setIv(e.target.value);
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

export default App;
