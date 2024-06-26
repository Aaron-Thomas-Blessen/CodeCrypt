import React, { useState } from "react";
import Navbar from "../components/nav";
import AESDecryptComponent from "../components/AESDecryptComponent";
import RSADecryptComponent from "../components/RSADecryptComponent";
import DSADecryptComponent from "../components/DSADecryptComponent";
import SHADecryptComponent from "../components/SHAVerifyComponent";
import sharedClasses from "../styles/sharedClasses";

import FileAESDecryptComponent from "../components/file/FileAESDecryptComponent";
import RSAFileDecryptComponent from "../components/file/RSAFileDecryptComponent";

function DecryptComponent() {
  const [decryptionType, setDecryptionType] = useState(null); // null means no decryption type selected
  const [decryptionAlgorithm, setDecryptionAlgorithm] = useState(null); // null means no specific algorithm selected

  const handleTypeSelection = (type) => {
    setDecryptionType(type);
    setDecryptionAlgorithm(null); // Reset algorithm selection when switching type
  };

  const handleAlgorithmSelection = (algorithm) => {
    setDecryptionAlgorithm(algorithm);
  };

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
              onClick={() => handleTypeSelection("text")}
              className={`px-6 py-3 ${
                decryptionType === "text" ? "bg-blue-500" : "bg-gray-700"
              } text-white rounded-md hover:bg-blue-600`}
            >
              Text Decryption
            </button>
            <button
              onClick={() => handleTypeSelection("file")}
              className={`px-6 py-3 ${
                decryptionType === "file" ? "bg-blue-500" : "bg-gray-700"
              } text-white rounded-md hover:bg-blue-600`}
            >
              File Decryption
            </button>
          </div>
          {decryptionType && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              {decryptionType === "text" && (
                <>
                  <button
                    onClick={() => handleAlgorithmSelection("aes")}
                    className={`px-6 py-3 ${
                      decryptionAlgorithm === "aes"
                        ? "bg-blue-500"
                        : "bg-gray-700"
                    } text-white rounded-md hover:bg-blue-600`}
                  >
                    AES
                  </button>
                  <button
                    onClick={() => handleAlgorithmSelection("rsa")}
                    className={`px-6 py-3 ${
                      decryptionAlgorithm === "rsa"
                        ? "bg-blue-500"
                        : "bg-gray-700"
                    } text-white rounded-md hover:bg-blue-600`}
                  >
                    RSA
                  </button>
                  <button
                    onClick={() => handleAlgorithmSelection("dsa")}
                    className={`px-6 py-3 ${
                      decryptionAlgorithm === "dsa"
                        ? "bg-blue-500"
                        : "bg-gray-700"
                    } text-white rounded-md hover:bg-blue-600`}
                  >
                    DSA
                  </button>
                  <button
                    onClick={() => handleAlgorithmSelection("sha")}
                    className={`px-6 py-3 ${
                      decryptionAlgorithm === "sha"
                        ? "bg-blue-500"
                        : "bg-gray-700"
                    } text-white rounded-md hover:bg-blue-600`}
                  >
                    SHA
                  </button>
                </>
              )}
              {decryptionType === "file" && (
                <>
                  <button
                    onClick={() => handleAlgorithmSelection("fileAes")}
                    className={`px-6 py-3 ${
                      decryptionAlgorithm === "fileAes"
                        ? "bg-blue-500"
                        : "bg-gray-700"
                    } text-white rounded-md hover:bg-blue-600`}
                  >
                    AES (File)
                  </button>
                  <button
                    onClick={() => handleAlgorithmSelection("fileRsa")}
                    className={`px-6 py-3 ${
                      decryptionAlgorithm === "fileRsa"
                        ? "bg-blue-500"
                        : "bg-gray-700"
                    } text-white rounded-md hover:bg-blue-600`}
                  >
                    RSA (File)
                  </button>
                  {/* Add more file decryption algorithm buttons as needed */}
                </>
              )}
            </div>
          )}
          {decryptionType && decryptionAlgorithm && (
            <div className="mt-8">
              {decryptionType === "text" && decryptionAlgorithm === "aes" && (
                <AESDecryptComponent />
              )}
              {decryptionType === "text" && decryptionAlgorithm === "rsa" && (
                <RSADecryptComponent />
              )}
              {decryptionType === "text" && decryptionAlgorithm === "dsa" && (
                <DSADecryptComponent />
              )}
              {decryptionType === "text" && decryptionAlgorithm === "sha" && (
                <SHADecryptComponent />
              )}
              {decryptionType === "file" &&
                decryptionAlgorithm === "fileAes" && (
                  <FileAESDecryptComponent />
                )}
              {decryptionType === "file" &&
                decryptionAlgorithm === "fileRsa" && (
                  <RSAFileDecryptComponent />
                )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DecryptComponent;
