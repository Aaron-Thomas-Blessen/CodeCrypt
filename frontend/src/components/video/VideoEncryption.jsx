import React, { useState } from "react";

function DESEncryptVideo() {
  const [file, setFile] = useState(null);
  const [encryptedFile, setEncryptedFile] = useState(null);
  const [desKeyBase64, setDesKeyBase64] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleEncryptButtonClick = async () => {
    if (!file) {
      alert("Please select a video file first.");
      return;
    }

    try {
      // Generate 3DES key
      const desKey = await window.crypto.subtle.generateKey(
        {
          name: "AES-CBC",
          length: 256,
        },
        true,
        ["encrypt", "decrypt"]
      );

      const fileReader = new FileReader();
      fileReader.onload = async (event) => {
        const arrayBuffer = event.target.result;

        // Encrypt the file data using 3DES
        const iv = window.crypto.getRandomValues(new Uint8Array(16)); // Initialization vector
        const encryptedBuffer = await window.crypto.subtle.encrypt(
          {
            name: "AES-CBC",
            iv: iv,
          },
          desKey,
          arrayBuffer
        );

        // Export the 3DES key
        const desKeyData = await window.crypto.subtle.exportKey("raw", desKey);
        const desKeyBase64 = btoa(
          String.fromCharCode.apply(null, new Uint8Array(desKeyData))
        );

        // Combine IV and encrypted file data
        const combinedBuffer = new Uint8Array(
          iv.byteLength + encryptedBuffer.byteLength
        );
        combinedBuffer.set(iv, 0);
        combinedBuffer.set(new Uint8Array(encryptedBuffer), iv.byteLength);

        const blob = new Blob([combinedBuffer], {
          type: "application/octet-stream",
        });
        setEncryptedFile(blob);
        setDesKeyBase64(desKeyBase64);
      };

      fileReader.readAsArrayBuffer(file);
    } catch (error) {
      console.error("Encryption Error:", error);
    }
  };

  return (
    <div className="w-full max-w-lg">
      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        className="p-2 mb-4 border rounded-md w-full bg-gray-800 text-white"
      />
      <button
        onClick={handleEncryptButtonClick}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Encrypt Video File
      </button>
      {encryptedFile && (
        <div className="mt-4">
          <label className="block font-semibold mb-2">
            Encrypted Video File:
          </label>
          <a
            href={URL.createObjectURL(encryptedFile)}
            download="encrypted_video"
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Download Encrypted Video
          </a>
        </div>
      )}
      {desKeyBase64 && (
        <div className="mt-4">
          <label className="block font-semibold mb-2">AES Key:</label>
          <textarea
            value={desKeyBase64}
            readOnly
            rows={4}
            className="p-2 w-full border rounded-md bg-gray-800 text-white mb-2"
          />
          <button
            onClick={() => navigator.clipboard.writeText(desKeyBase64)}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Copy AES Key
          </button>
        </div>
      )}
    </div>
  );
}

export default DESEncryptVideo;
