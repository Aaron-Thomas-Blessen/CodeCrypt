import React, { useState } from "react";
import crypto from "crypto";
import { saveAs } from "file-saver";

function VideoDecryption() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [decryptionAlgorithm, setDecryptionAlgorithm] = useState("aes");
  const [privateKey, setPrivateKey] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleAlgorithmChange = (e) => {
    setDecryptionAlgorithm(e.target.value);
  };

  const handlePrivateKeyChange = (e) => {
    setPrivateKey(e.target.value);
  };

  const decryptFile = () => {
    if (!selectedFile) return alert("Please select a file first");

    const reader = new FileReader();
    reader.onload = () => {
      const arrayBuffer = reader.result;
      const buffer = Buffer.from(arrayBuffer);

      let decrypted;
      if (decryptionAlgorithm === "aes") {
        const iv = buffer.slice(0, 16);
        const key = buffer.slice(16, 48);
        const encrypted = buffer.slice(48);

        const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
        decrypted = Buffer.concat([
          decipher.update(encrypted),
          decipher.final(),
        ]);

        saveAs(new Blob([decrypted]), "decrypted_video.mp4");
      } else if (decryptionAlgorithm === "rsa") {
        if (!privateKey) return alert("Please provide a private key");

        decrypted = crypto.privateDecrypt(
          { key: privateKey, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING },
          buffer
        );

        saveAs(new Blob([decrypted]), "decrypted_video.mp4");
      }
    };

    reader.readAsArrayBuffer(selectedFile);
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-800 text-white">
      <h1 className="text-2xl mb-4">Video Decryption</h1>
      <div className="mb-4">
        <label className="block mb-2">Select encrypted video file:</label>
        <input type="file" onChange={handleFileChange} />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Select decryption algorithm:</label>
        <select value={decryptionAlgorithm} onChange={handleAlgorithmChange}>
          <option value="aes">AES</option>
          <option value="rsa">RSA</option>
        </select>
      </div>
      {decryptionAlgorithm === "rsa" && (
        <div className="mb-4">
          <label className="block mb-2">Private Key:</label>
          <textarea
            value={privateKey}
            onChange={handlePrivateKeyChange}
            className="w-full p-2 bg-gray-700 text-white"
            rows="4"
          />
        </div>
      )}
      <button onClick={decryptFile} className="px-4 py-2 bg-green-500 rounded">
        Decrypt
      </button>
    </div>
  );
}

export default VideoDecryption;
