import React, { useState } from "react";
import crypto from "crypto";

function RSAFileEncryptComponent() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [encryptedFile, setEncryptedFile] = useState(null);
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    generateNewKeyPair(); // Generate new key pair when file is selected
  };

  const encryptFile = async () => {
    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }

    try {
      const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
        modulusLength: 2048,
      });

      setPublicKey(publicKey.export({ type: "spki", format: "pem" }));
      setPrivateKey(privateKey.export({ type: "pkcs8", format: "pem" }));

      const fileBuffer = await selectedFile.arrayBuffer();
      const encryptedData = crypto.publicEncrypt(publicKey, fileBuffer);

      setEncryptedFile(new Blob([encryptedData], { type: selectedFile.type }));
    } catch (error) {
      console.error("Encryption Error:", error);
      alert("Encryption failed. Please try again.");
    }
  };

  const downloadEncryptedFile = () => {
    if (encryptedFile) {
      const url = URL.createObjectURL(encryptedFile);
      const a = document.createElement("a");
      a.href = url;
      a.download = "encrypted-file.enc";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const generateNewKeyPair = () => {
    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
      modulusLength: 2048,
    });

    setPublicKey(publicKey.export({ type: "spki", format: "pem" }));
    setPrivateKey(privateKey.export({ type: "pkcs8", format: "pem" }));
  };

  return (
    <div className="w-full max-w-lg">
      <input
        type="file"
        onChange={handleFileChange}
        className="p-2 mb-4 border rounded-md w-full"
      />
      <button
        onClick={encryptFile}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Encrypt File
      </button>
      {encryptedFile && (
        <div className="mt-4">
          <button
            onClick={downloadEncryptedFile}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Download Encrypted File
          </button>
        </div>
      )}
      {publicKey && (
        <div className="mt-4">
          <label className="block font-semibold mb-2">Public Key:</label>
          <textarea
            value={publicKey}
            readOnly
            rows={4}
            className="p-2 w-full border rounded-md mb-2"
          />
          <button
            onClick={() => navigator.clipboard.writeText(publicKey)}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Copy Public Key
          </button>
        </div>
      )}
      {privateKey && (
        <div className="mt-4">
          <label className="block font-semibold mb-2">Private Key:</label>
          <textarea
            value={privateKey}
            readOnly
            rows={4}
            className="p-2 w-full border rounded-md mb-2"
          />
          <button
            onClick={() => navigator.clipboard.writeText(privateKey)}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Copy Private Key
          </button>
        </div>
      )}
    </div>
  );
}

export default RSAFileEncryptComponent;
