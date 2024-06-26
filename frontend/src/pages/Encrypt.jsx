import React, { useState } from "react";
import Navbar from "../components/nav";
import AESComponent from "../components/AESComponent";
import RSAComponent from "../components/RSAComponent";
import DSAEncryptComponent from "../components/DSAEncryptComponent";
import SHAComponent from "../components/SHAComponent";
import sharedClasses from "../styles/sharedClasses";

import FileAESComponent from "../components/file/FileAESComponent";
import RSAFileEncryptComponent from "../components/file/RSAFileEncryptComponent";

function EncryptComponent() {
  const [encryptionType, setEncryptionType] = useState(null); // null means neither text nor file encryption selected
  const [encryptionAlgorithm, setEncryptionAlgorithm] = useState(null); // null means no specific algorithm selected

  const handleTypeSelection = (type) => {
    setEncryptionType(type);
    setEncryptionAlgorithm(null); // Reset algorithm selection when switching type
  };

  const handleAlgorithmSelection = (algorithm) => {
    setEncryptionAlgorithm(algorithm);
  };

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
              onClick={() => handleTypeSelection("text")}
              className={`px-6 py-3 ${
                encryptionType === "text" ? "bg-blue-500" : "bg-gray-700"
              } text-white rounded-md hover:bg-blue-600`}
            >
              Text Encryption
            </button>
            <button
              onClick={() => handleTypeSelection("file")}
              className={`px-6 py-3 ${
                encryptionType === "file" ? "bg-blue-500" : "bg-gray-700"
              } text-white rounded-md hover:bg-blue-600`}
            >
              File Encryption
            </button>
          </div>
          {encryptionType && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              {encryptionType === "text" && (
                <>
                  <button
                    onClick={() => handleAlgorithmSelection("aes")}
                    className={`px-6 py-3 ${
                      encryptionAlgorithm === "aes"
                        ? "bg-blue-500"
                        : "bg-gray-700"
                    } text-white rounded-md hover:bg-blue-600`}
                  >
                    AES
                  </button>
                  <button
                    onClick={() => handleAlgorithmSelection("rsa")}
                    className={`px-6 py-3 ${
                      encryptionAlgorithm === "rsa"
                        ? "bg-blue-500"
                        : "bg-gray-700"
                    } text-white rounded-md hover:bg-blue-600`}
                  >
                    RSA
                  </button>
                  <button
                    onClick={() => handleAlgorithmSelection("dsa")}
                    className={`px-6 py-3 ${
                      encryptionAlgorithm === "dsa"
                        ? "bg-blue-500"
                        : "bg-gray-700"
                    } text-white rounded-md hover:bg-blue-600`}
                  >
                    DSA
                  </button>
                  <button
                    onClick={() => handleAlgorithmSelection("sha")}
                    className={`px-6 py-3 ${
                      encryptionAlgorithm === "sha"
                        ? "bg-blue-500"
                        : "bg-gray-700"
                    } text-white rounded-md hover:bg-blue-600`}
                  >
                    SHA
                  </button>
                </>
              )}
              {encryptionType === "file" && (
                <>
                  <button
                    onClick={() => handleAlgorithmSelection("aes")}
                    className={`px-6 py-3 ${
                      encryptionAlgorithm === "aes"
                        ? "bg-blue-500"
                        : "bg-gray-700"
                    } text-white rounded-md hover:bg-blue-600`}
                  >
                    AES
                  </button>
                  <button
                    onClick={() => handleAlgorithmSelection("rsa")}
                    className={`px-6 py-3 ${
                      encryptionAlgorithm === "rsa"
                        ? "bg-blue-500"
                        : "bg-gray-700"
                    } text-white rounded-md hover:bg-blue-600`}
                  >
                    RSA
                  </button>
                  {/* Add more file encryption algorithms if needed */}
                </>
              )}
            </div>
          )}
          {encryptionType && encryptionAlgorithm && (
            <div className="mt-8">
              {encryptionType === "text" && encryptionAlgorithm === "aes" && (
                <AESComponent />
              )}
              {encryptionType === "text" && encryptionAlgorithm === "rsa" && (
                <RSAComponent />
              )}
              {encryptionType === "text" && encryptionAlgorithm === "dsa" && (
                <DSAEncryptComponent />
              )}
              {encryptionType === "text" && encryptionAlgorithm === "sha" && (
                <SHAComponent />
              )}
              {encryptionType === "file" && encryptionAlgorithm === "aes" && (
                <FileAESComponent />
              )}
              {encryptionType === "file" && encryptionAlgorithm === "rsa" && (
                <RSAFileEncryptComponent />
              )}
              {/* Add more file encryption components for other algorithms */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EncryptComponent;
