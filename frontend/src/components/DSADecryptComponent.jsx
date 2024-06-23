import React, { useState } from "react";

function DSADecryptComponent() {
  const [message, setMessage] = useState("");
  const [signature, setSignature] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [isValid, setIsValid] = useState(null);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSignatureChange = (e) => {
    setSignature(e.target.value);
  };

  const handlePublicKeyChange = (e) => {
    setPublicKey(e.target.value);
  };

  const handleVerifyButtonClick = async () => {
    const publicKeyArrayBuffer = Uint8Array.from(atob(publicKey), (c) =>
      c.charCodeAt(0)
    ).buffer;

    const publicKeyObject = await window.crypto.subtle.importKey(
      "spki",
      publicKeyArrayBuffer,
      {
        name: "ECDSA",
        namedCurve: "P-256",
      },
      true,
      ["verify"]
    );

    const encoder = new TextEncoder();
    const data = encoder.encode(message);

    const signatureArrayBuffer = Uint8Array.from(atob(signature), (c) =>
      c.charCodeAt(0)
    ).buffer;

    const isValid = await window.crypto.subtle.verify(
      {
        name: "ECDSA",
        hash: { name: "SHA-256" },
      },
      publicKeyObject,
      signatureArrayBuffer,
      data
    );

    setIsValid(isValid);
  };

  return (
    <div className="w-full max-w-lg">
      <textarea
        value={message}
        rows={4}
        onChange={handleMessageChange}
        placeholder="Enter message here..."
        className="p-2 mb-4 border rounded-md w-full bg-gray-800 text-white placeholder-gray-400"
      />
      <textarea
        value={signature}
        rows={4}
        onChange={handleSignatureChange}
        placeholder="Enter signature here..."
        className="p-2 mb-4 border rounded-md w-full bg-gray-800 text-white placeholder-gray-400"
      />
      <textarea
        value={publicKey}
        rows={4}
        onChange={handlePublicKeyChange}
        placeholder="Enter public key here..."
        className="p-2 mb-4 border rounded-md w-full bg-gray-800 text-white placeholder-gray-400"
      />
      <button
        onClick={handleVerifyButtonClick}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mb-4"
      >
        Verify Message
      </button>
      {isValid !== null && (
        <div className="w-full max-w-lg mt-4">
          <label className="block font-semibold mb-2">
            Verification Result:
          </label>
          <textarea
            value={isValid ? "Valid Signature" : "Invalid Signature"}
            readOnly
            rows={4}
            className="p-2 w-full border rounded-md bg-gray-800 text-white mb-2"
          />
          <button
            onClick={() =>
              navigator.clipboard.writeText(
                isValid ? "Valid Signature" : "Invalid Signature"
              )
            }
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Copy Result
          </button>
        </div>
      )}
    </div>
  );
}

export default DSADecryptComponent;
