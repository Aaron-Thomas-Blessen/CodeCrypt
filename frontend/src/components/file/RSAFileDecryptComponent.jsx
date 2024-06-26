import React, { useState } from "react";
import crypto from "crypto";

function RSAFileDecryptComponent() {
  const [selectedEncryptedFile, setSelectedEncryptedFile] = useState(null);
  const [decryptedFile, setDecryptedFile] = useState(null);
  const [privateKey, setPrivateKey] = useState("");

  const handleFileChange = (e) => {
    setSelectedEncryptedFile(e.target.files[0]);
  };

  const handlePrivateKeyChange = (e) => {
    setPrivateKey(e.target.value);
  };

  const decryptFile = async () => {
    if (!selectedEncryptedFile || !privateKey) {
      alert("Please select an encrypted file and enter your private key.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const encryptedData = new Uint8Array(reader.result);

      try {
        const privateKeyObj = crypto.createPrivateKey({
          key: privateKey,
          format: "pem",
          type: "pkcs8",
        });

        const decryptedData = crypto.privateDecrypt(
          {
            key: privateKeyObj,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
          },
          encryptedData
        );

        const decryptedBlob = new Blob([decryptedData]);
        setDecryptedFile(decryptedBlob);
      } catch (error) {
        console.error("Decryption Error:", error);
        alert("Decryption failed. Check your private key or encrypted file.");
      }
    };

    reader.readAsArrayBuffer(selectedEncryptedFile);
  };

  const downloadDecryptedFile = () => {
    if (decryptedFile) {
      const url = URL.createObjectURL(decryptedFile);
      const a = document.createElement("a");
      a.href = url;
      a.download = "decrypted-file";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="w-full max-w-lg">
      <input
        type="file"
        onChange={handleFileChange}
        className="p-2 mb-4 border rounded-md w-full"
      />
      <input
        type="text"
        value={privateKey}
        onChange={handlePrivateKeyChange}
        placeholder="Enter your private key"
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
          <button
            onClick={downloadDecryptedFile}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Download Decrypted File
          </button>
        </div>
      )}
    </div>
  );
}

export default RSAFileDecryptComponent;
