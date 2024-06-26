import React, { useState } from "react";
import Navbar from "../components/nav";
import AESComponent from "../components/AESComponent";
import RSAComponent from "../components/RSAComponent";
import DSAEncryptComponent from "../components/DSAEncryptComponent";
import SHAComponent from "../components/SHAComponent";
import sharedClasses from "../styles/sharedClasses";

function EncryptComponent() {
  const [encryptionType, setEncryptionType] = useState("aes");

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />
      <div className={`${sharedClasses.container} flex-grow pt-0`}>
        <div className="container mx-auto px-1 py-2 mt-0">
          <h1 className="text-3xl font-bold text-center dark:text-zinc-100">
            Encryption
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <button
              onClick={() => setEncryptionType("aes")}
              className={`px-6 py-3 ${
                encryptionType === "aes" ? "bg-blue-500" : "bg-gray-700"
              } text-white rounded-md hover:bg-blue-600`}
            >
              AES
            </button>
            <button
              onClick={() => setEncryptionType("rsa")}
              className={`px-6 py-3 ${
                encryptionType === "rsa" ? "bg-blue-500" : "bg-gray-700"
              } text-white rounded-md hover:bg-blue-600`}
            >
              RSA
            </button>
            <button
              onClick={() => setEncryptionType("dsa")}
              className={`px-6 py-3 ${
                encryptionType === "dsa" ? "bg-blue-500" : "bg-gray-700"
              } text-white rounded-md hover:bg-blue-600`}
            >
              DES
            </button>
            <button
              onClick={() => setEncryptionType("sha")}
              className={`px-6 py-3 ${
                encryptionType === "sha" ? "bg-blue-500" : "bg-gray-700"
              } text-white rounded-md hover:bg-blue-600`}
            >
              SHA
            </button>
          </div>
          <div className="mt-8">
            {encryptionType === "aes" && <AESComponent />}
            {encryptionType === "rsa" && <RSAComponent />}
            {encryptionType === "dsa" && <DSAEncryptComponent />}
            {encryptionType === "sha" && <SHAComponent />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EncryptComponent;
