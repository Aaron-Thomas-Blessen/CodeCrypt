import React, { useState } from "react";
import Navbar from "../components/nav2";
import AESDecryptComponent from "../components/AESDecryptComponent";
import RSADecryptComponent from "../components/RSADecryptComponent";
import DSADecryptComponent from "../components/DSADecryptComponent";
import SHAVerifyComponent from "../components/SHAVerifyComponent";

function DecryptComponent() {
  const [decryptionType, setDecryptionType] = useState("aes");

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center p-6 bg-black min-h-screen text-white">
        <h1 className="text-2xl font-bold mb-4">Decrypt Text</h1>
        <div className="mb-4">
          <button
            onClick={() => setDecryptionType("aes")}
            className={`px-4 py-2 mr-2 ${
              decryptionType === "aes" ? "bg-blue-500" : "bg-gray-700"
            } text-white rounded-md hover:bg-blue-600`}
          >
            AES
          </button>
          <button
            onClick={() => setDecryptionType("rsa")}
            className={`px-4 py-2 mr-2 ${
              decryptionType === "rsa" ? "bg-blue-500" : "bg-gray-700"
            } text-white rounded-md hover:bg-blue-600`}
          >
            RSA
          </button>
          <button
            onClick={() => setDecryptionType("dsa")}
            className={`px-4 py-2 mr-2 ${
              decryptionType === "dsa" ? "bg-blue-500" : "bg-gray-700"
            } text-white rounded-md hover:bg-blue-600`}
          >
            DSA
          </button>
          <button
            onClick={() => setDecryptionType("sha")}
            className={`px-4 py-2 ${
              decryptionType === "sha" ? "bg-blue-500" : "bg-gray-700"
            } text-white rounded-md hover:bg-blue-600`}
          >
            SHA
          </button>
        </div>
        {decryptionType === "aes" && <AESDecryptComponent />}
        {decryptionType === "rsa" && <RSADecryptComponent />}
        {decryptionType === "dsa" && <DSADecryptComponent />}
        {decryptionType === "sha" && <SHAVerifyComponent />}
      </div>
    </div>
  );
}

export default DecryptComponent;
