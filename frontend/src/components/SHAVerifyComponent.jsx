import React, { useState } from "react";

function SHAVerifyComponent() {
  const [message, setMessage] = useState("");
  const [hash, setHash] = useState("");
  const [isValid, setIsValid] = useState(null);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleHashChange = (e) => {
    setHash(e.target.value);
  };

  const handleVerifyButtonClick = async () => {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);

    const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const newHashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    setIsValid(newHashHex === hash);
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
        value={hash}
        rows={4}
        onChange={handleHashChange}
        placeholder="Enter hash here..."
        className="p-2 mb-4 border rounded-md w-full bg-gray-800 text-white placeholder-gray-400"
      />
      <button
        onClick={handleVerifyButtonClick}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mb-4"
      >
        Verify Hash
      </button>
      {isValid !== null && (
        <div className="w-full max-w-lg">
          <label className="block font-semibold mb-2">
            Verification Result:
          </label>
          <textarea
            value={isValid ? "Valid Hash" : "Invalid Hash"}
            readOnly
            rows={4}
            className="p-2 w-full border rounded-md bg-gray-800 text-white mb-2"
          />
          <button
            onClick={() =>
              navigator.clipboard.writeText(
                isValid ? "Valid Hash" : "Invalid Hash"
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

export default SHAVerifyComponent;
