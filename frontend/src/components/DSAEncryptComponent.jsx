import React, { useState, useEffect } from "react";

function DSAEncryptComponent() {
  const [inputText, setInputText] = useState("");
  const [signature, setSignature] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState(null);
  const [keyGenerated, setKeyGenerated] = useState(false);
  const [messageSigned, setMessageSigned] = useState(false);

  useEffect(() => {
    // Generate key pair when the component mounts
    const generateKeyPair = async () => {
      const keyPair = await window.crypto.subtle.generateKey(
        {
          name: "ECDSA",
          namedCurve: "P-256",
        },
        true,
        ["sign", "verify"]
      );

      const publicKeyArrayBuffer = await window.crypto.subtle.exportKey(
        "spki",
        keyPair.publicKey
      );
      const publicKeyBase64 = window.btoa(
        String.fromCharCode(...new Uint8Array(publicKeyArrayBuffer))
      );
      setPublicKey(publicKeyBase64);
      setPrivateKey(keyPair.privateKey);
      setKeyGenerated(true);
    };

    generateKeyPair();
  }, []);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSignButtonClick = async () => {
    if (!privateKey) return;

    const encoder = new TextEncoder();
    const data = encoder.encode(inputText);

    const signatureArrayBuffer = await window.crypto.subtle.sign(
      {
        name: "ECDSA",
        hash: { name: "SHA-256" },
      },
      privateKey,
      data
    );

    setSignature(
      window.btoa(String.fromCharCode(...new Uint8Array(signatureArrayBuffer)))
    );
    setMessageSigned(true);
  };

  const handleCopyToClipboard = (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(
        () => {
          console.log("Text copied to clipboard successfully!");
        },
        (err) => {
          console.error("Failed to copy text: ", err);
        }
      );
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed"; // Prevent scrolling to bottom of page in MS Edge.
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        const successful = document.execCommand("copy");
        if (successful) {
          console.log("Text copied to clipboard successfully!");
        } else {
          console.error("Failed to copy text.");
        }
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="w-full max-w-lg">
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Enter message here..."
        className="p-2 mb-4 border rounded-md w-full bg-gray-800 text-white placeholder-gray-400"
      />
      <button
        onClick={handleSignButtonClick}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Sign Message
      </button>
      {signature && (
        <div className="mt-4">
          <label className="block font-semibold mb-2">Signature:</label>
          <textarea
            value={signature}
            readOnly
            rows={4}
            className="p-2 w-full border rounded-md bg-gray-800 text-white mb-2"
          />
          <button
            onClick={() => handleCopyToClipboard(signature)}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Copy Signature
          </button>
        </div>
      )}
      {messageSigned && (
        <div className="mt-4">
          <label className="block font-semibold mb-2">Public Key:</label>
          <textarea
            value={publicKey}
            readOnly
            rows={10}
            className="p-2 w-full border rounded-md bg-gray-800 text-white mb-2"
          />
          <button
            onClick={() => handleCopyToClipboard(publicKey)}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Copy Public Key
          </button>
        </div>
      )}
    </div>
  );
}

export default DSAEncryptComponent;
