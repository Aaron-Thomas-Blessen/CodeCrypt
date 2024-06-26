import React, { useState } from "react";
import Navbar from "../components/nav";
import AESDecryptComponent from "../components/AESDecryptComponent";
import RSADecryptComponent from "../components/RSADecryptComponent";
import DSADecryptComponent from "../components/DSADecryptComponent";
import SHAVerifyComponent from "../components/SHAVerifyComponent";
import sharedClasses from "../styles/sharedClasses";

function DecryptComponent() {
  const [decryptionType, setDecryptionType] = useState("aes");

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />
      <div className={`${sharedClasses.container} flex-grow pt-0`}>
        <div className="container mx-auto px-1 py-2 mt-0">
          <h1 className="text-3xl font-bold text-center dark:text-zinc-100">
            Decryption
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <button
              onClick={() => setDecryptionType("aes")}
              className={`px-6 py-3 ${
                decryptionType === "aes" ? "bg-blue-500" : "bg-gray-700"
              } text-white rounded-md hover:bg-blue-600`}
            >
              AES
            </button>
            <button
              onClick={() => setDecryptionType("rsa")}
              className={`px-6 py-3 ${
                decryptionType === "rsa" ? "bg-blue-500" : "bg-gray-700"
              } text-white rounded-md hover:bg-blue-600`}
            >
              RSA
            </button>
            <button
              onClick={() => setDecryptionType("dsa")}
              className={`px-6 py-3 ${
                decryptionType === "dsa" ? "bg-blue-500" : "bg-gray-700"
              } text-white rounded-md hover:bg-blue-600`}
            >
              DES
            </button>
            <button
              onClick={() => setDecryptionType("sha")}
              className={`px-6 py-3 ${
                decryptionType === "sha" ? "bg-blue-500" : "bg-gray-700"
              } text-white rounded-md hover:bg-blue-600`}
            >
              SHA
            </button>
          </div>
          <div className="mt-8">
            {decryptionType === "aes" && <AESDecryptComponent />}
            {decryptionType === "rsa" && <RSADecryptComponent />}
            {decryptionType === "dsa" && <DSADecryptComponent />}
            {decryptionType === "sha" && <SHAVerifyComponent />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DecryptComponent;
