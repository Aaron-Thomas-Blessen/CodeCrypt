import React, { useState } from "react";

function DESDecryptImage() {
  const [encryptedFile, setEncryptedFile] = useState(null);
  const [desKeyBase64, setDesKeyBase64] = useState("");
  const [decryptedFile, setDecryptedFile] = useState(null);

  const handleFileChange = (e) => {
    setEncryptedFile(e.target.files[0]);
  };

  const handleDesKeyChange = (e) => {
    setDesKeyBase64(e.target.value);
  };

  const base64ToArrayBuffer = (base64) => {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  };

  const handleDecryptButtonClick = async () => {
    if (!encryptedFile) {
      alert("Please select an encrypted image file first.");
      return;
    }

    try {
      const desKeyData = base64ToArrayBuffer(desKeyBase64);

      const importedKey = await window.crypto.subtle.importKey(
        "raw",
        desKeyData,
        {
          name: "DES-CBC",
        },
        false,
        ["decrypt"]
      );

      const fileReader = new FileReader();
      fileReader.onload = async (event) => {
        const combinedBuffer = new Uint8Array(event.target.result);

        // Extract IV
        const iv = combinedBuffer.slice(0, 8);

        // Extract encrypted file data
        const encryptedData = combinedBuffer.slice(8);

        // Decrypt the file data using DES
        const decryptedBuffer = await window.crypto.subtle.decrypt(
          {
            name: "DES-CBC",
            iv: iv,
          },
          importedKey,
          encryptedData
        );

        const blob = new Blob([new Uint8Array(decryptedBuffer)], {
          type: "image/png", // Change to the correct MIME type for your images
        });
        setDecryptedFile(blob);
      };

      fileReader.readAsArrayBuffer(encryptedFile);
    } catch (error) {
      console.error("Decryption Error:", error);
    }
  };

  return (
    <div className="w-full max-w-lg">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="p-2 mb-4 border rounded-md w-full bg-gray-800 text-white"
      />
      <textarea
        value={desKeyBase64}
        rows={4}
        onChange={handleDesKeyChange}
        placeholder="Enter DES key here..."
        className="p-2 mb-4 border rounded-md w-full bg-gray-800 text-white"
      />
      <button
        onClick={handleDecryptButtonClick}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Decrypt Image File
      </button>
      {decryptedFile && (
        <div className="mt-4">
          <label className="block font-semibold mb-2">
            Decrypted Image File:
          </label>
          <a
            href={URL.createObjectURL(decryptedFile)}
            download="decrypted_image"
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Download Decrypted Image
          </a>
        </div>
      )}
    </div>
  );
}

export default DESDecryptImage;
