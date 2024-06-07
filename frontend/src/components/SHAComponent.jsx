import React, { useState } from "react";

function SHAComponent() {
  const [inputText, setInputText] = useState("");
  const [hash, setHash] = useState("");

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleHashButtonClick = () => {
    fetch("http://localhost:5000/hash", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: inputText }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setHash(data.hash);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(`Error: ${error.message}`);
      });
  };

  return (
    <div className="w-full max-w-lg">
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Enter text here..."
        className="p-2 mb-4 border rounded-md w-full bg-gray-800 text-white placeholder-gray-400"
      />
      <button
        onClick={handleHashButtonClick}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Hash Text
      </button>
      {hash && (
        <div className="mt-4">
          <label className="block font-semibold mb-2">Hash:</label>
          <textarea
            value={hash}
            readOnly
            rows={4}
            className="p-2 w-full border rounded-md bg-gray-800 text-white mb-2"
          />
          <button
            onClick={() => navigator.clipboard.writeText(hash)}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Copy Hash
          </button>
        </div>
      )}
    </div>
  );
}

export default SHAComponent;
