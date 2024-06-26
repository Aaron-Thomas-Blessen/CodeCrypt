import React, { useState } from "react";

function App() {
  const [inputText, setInputText] = useState("");
  const [encryptedText, setEncryptedText] = useState("");
  const [key, setKey] = useState("");
  const [iv, setIv] = useState("");
  const [file, setFile] = useState(null);
  const [encryptedFile, setEncryptedFile] = useState("");

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const encryptText = async () => {
    try {
      const key = await window.crypto.subtle.generateKey(
        {
          name: "AES-CBC",
          length: 256,
        },
        true,
        ["encrypt", "decrypt"]
      );

      const encoder = new TextEncoder();
      const data = encoder.encode(inputText);
      const iv = window.crypto.getRandomValues(new Uint8Array(16));

      const encryptedBuffer = await window.crypto.subtle.encrypt(
        {
          name: "AES-CBC",
          iv: iv,
        },
        key,
        data
      );

      const encryptedArray = new Uint8Array(encryptedBuffer);
      const encryptedHex = Array.from(encryptedArray, (x) =>
        ("00" + x.toString(16)).slice(-2)
      ).join("");

      const keyData = await window.crypto.subtle.exportKey("raw", key);
      const keyHex = Array.from(new Uint8Array(keyData), (x) =>
        ("00" + x.toString(16)).slice(-2)
      ).join("");

      setEncryptedText(encryptedHex);
      setKey(keyHex);
      setIv(Array.from(iv, (x) => ("00" + x.toString(16)).slice(-2)).join(""));
    } catch (error) {
      console.error("Encryption Error:", error);
    }
  };

  const encryptFile = async () => {
    if (!file) {
      alert("Please select a file to encrypt.");
      return;
    }

    try {
      const key = await window.crypto.subtle.generateKey(
        {
          name: "AES-CBC",
          length: 256,
        },
        true,
        ["encrypt", "decrypt"]
      );

      const iv = window.crypto.getRandomValues(new Uint8Array(16));
      const fileArrayBuffer = await file.arrayBuffer();

      const encryptedBuffer = await window.crypto.subtle.encrypt(
        {
          name: "AES-CBC",
          iv: iv,
        },
        key,
        fileArrayBuffer
      );

      const encryptedBlob = new Blob([encryptedBuffer]);

      const keyData = await window.crypto.subtle.exportKey("raw", key);
      const keyHex = Array.from(new Uint8Array(keyData), (x) =>
        ("00" + x.toString(16)).slice(-2)
      ).join("");

      setEncryptedFile(URL.createObjectURL(encryptedBlob));
      setKey(keyHex);
      setIv(Array.from(iv, (x) => ("00" + x.toString(16)).slice(-2)).join(""));
    } catch (error) {
      console.error("Encryption Error:", error);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-10">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Encrypt Text</h2>
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Enter text here..."
          className="p-2 mb-4 border rounded-md w-full"
        />
        <button
          onClick={encryptText}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Encrypt Text
        </button>
        {encryptedText && (
          <div className="mt-4">
            <label className="block font-semibold mb-2">Encrypted Text:</label>
            <textarea
              value={encryptedText}
              readOnly
              rows={4}
              className="p-2 w-full border rounded-md mb-2"
            />
            <button
              onClick={() => navigator.clipboard.writeText(encryptedText)}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Copy Encrypted Text
            </button>
          </div>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Encrypt File</h2>
        <input type="file" onChange={handleFileChange} className="mb-4" />
        <button
          onClick={encryptFile}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Encrypt File
        </button>
        {encryptedFile && (
          <div className="mt-4">
            <a
              href={encryptedFile}
              download="encrypted-file.enc"
              className="block font-semibold mb-2"
            >
              Download Encrypted File
            </a>
          </div>
        )}
      </div>

      {key && (
        <div className="mt-4">
          <label className="block font-semibold mb-2">Key:</label>
          <textarea
            value={key}
            readOnly
            rows={2}
            className="p-2 w-full border rounded-md mb-2"
          />
          <button
            onClick={() => navigator.clipboard.writeText(key)}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Copy Key
          </button>
        </div>
      )}
      {iv && (
        <div className="mt-4">
          <label className="block font-semibold mb-2">IV:</label>
          <textarea
            value={iv}
            readOnly
            rows={2}
            className="p-2 w-full border rounded-md mb-2"
          />
          <button
            onClick={() => navigator.clipboard.writeText(iv)}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Copy IV
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
