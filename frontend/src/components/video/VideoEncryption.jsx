import React, { useState } from "react";
import crypto from "crypto";
import { saveAs } from "file-saver";

function VideoEncryption() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [encryptionAlgorithm, setEncryptionAlgorithm] = useState("aes");
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleAlgorithmChange = (e) => {
    setEncryptionAlgorithm(e.target.value);
  };

  const handlePublicKeyChange = (e) => {
    setPublicKey(e.target.value);
  };

  const handlePrivateKeyChange = (e) => {
    setPrivateKey(e.target.value);
  };

  const generateRSAKeys = () => {
    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
      modulusLength: 2048,
    });
    setPublicKey(publicKey.export({ type: "pkcs1", format: "pem" }));
    setPrivateKey(privateKey.export({ type: "pkcs1", format: "pem" }));
  };

  const encryptFile = () => {
    if (!selectedFile) return alert("Please select a file first");

    const reader = new FileReader();
    reader.onload = () => {
      const arrayBuffer = reader.result;
      const buffer = Buffer.from(arrayBuffer);

      let encrypted;
      if (encryptionAlgorithm === "aes") {
        const key = crypto.randomBytes(32);
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
        encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);

        const encryptedKey = Buffer.concat([iv, key, encrypted]);
        saveAs(new Blob([encryptedKey]), "encrypted_video.aes");
      } else if (encryptionAlgorithm === "rsa") {
        if (!publicKey) return alert("Please provide a public key");

        const key = crypto.publicEncrypt(
          { key: publicKey, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING },
          buffer
        );
        saveAs(new Blob([key]), "encrypted_video.rsa");
      }
    };

    reader.readAsArrayBuffer(selectedFile);
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-800 text-white">
      <h1 className="text-2xl mb-4">Video Encryption</h1>
      <div className="mb-4">
        <label className="block mb-2">Select video file:</label>
        <input type="file" accept="video/*" onChange={handleFileChange} />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Select encryption algorithm:</label>
        <select value={encryptionAlgorithm} onChange={handleAlgorithmChange}>
          <option value="aes">AES</option>
          <option value="rsa">RSA</option>
        </select>
      </div>
      {encryptionAlgorithm === "rsa" && (
        <div className="mb-4">
          <label className="block mb-2">Public Key:</label>
          <textarea
            value={publicKey}
            onChange={handlePublicKeyChange}
            className="w-full p-2 bg-gray-700 text-white"
            rows="4"
          />
          <button
            onClick={generateRSAKeys}
            className="mt-2 px-4 py-2 bg-blue-500 rounded"
          >
            Generate RSA Keys
          </button>
        </div>
      )}
      <button onClick={encryptFile} className="px-4 py-2 bg-green-500 rounded">
        Encrypt
      </button>
    </div>
  );
}

export default VideoEncryption;
