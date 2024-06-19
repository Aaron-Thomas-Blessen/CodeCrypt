import React, { useState } from "react";
import Navbar from "../components/nav";
import AlgorithmCard from "../components/ac2";
import sharedClasses from "../styles/sharedClasses";
import StudyRSA from "../components/StudyRSA";
import StudyAES from "../components/StudyAES";

const Study = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
  const [completedAlgorithms, setCompletedAlgorithms] = useState([]);

  const algorithmDescriptions = {
    RSA: "Click to view RSA details and steps.",
    AES: "Click to view AES details and steps.",
    DES: "Click to view DES details and steps.",
    SHA: "Click to view SHA details and steps.",
  };

  const handleAlgorithmClick = (algorithm) => {
    setSelectedAlgorithm(algorithm);
  };

  const handleCompletion = (algorithm) => {
    if (!completedAlgorithms.includes(algorithm)) {
      setCompletedAlgorithms([...completedAlgorithms, algorithm]);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />
      <div className={`${sharedClasses.container} flex-grow pt-0`}>
        <div className="container mx-auto px-1 py-2 mt-0">
          <h1 className="text-3xl font-bold text-center dark:text-zinc-100">
            Cryptographic Algorithms
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {Object.keys(algorithmDescriptions).map((algorithm) => (
              <AlgorithmCard
                key={algorithm}
                title={algorithm}
                details={algorithmDescriptions[algorithm]}
                description={algorithmDescriptions[algorithm]}
                onClick={() => handleAlgorithmClick(algorithm)}
                completed={completedAlgorithms.includes(algorithm)}
              />
            ))}
          </div>
          {!selectedAlgorithm && (
            <div className="text-center mt-8">
              <h1 className="text-3xl font-bold">Welcome to the Study Area</h1>
              <p className="text-lg mt-4">
                Here you can explore the various cryptographic algorithms. Click
                on any algorithm to learn more about it.
              </p>
            </div>
          )}

          {selectedAlgorithm && (
            <div className="bg-gray-800 p-6 mt-8 rounded-md">
              <h2 className="text-4xl font-bold mb-4">{selectedAlgorithm}</h2>
              {selectedAlgorithm === "RSA" && <StudyRSA />}
              {selectedAlgorithm === "AES" && <StudyAES />}
              {selectedAlgorithm === "DES" && (
                <>
                  <h1 className="text-3xl font-bold mb-2">
                    Introduction and Key Generation
                  </h1>
                  <div className="bg-green-800 p-6 mt-4 rounded-md">
                    <h1 className="text-xl font-bold mb-2">Introduction</h1>
                    <p>
                      <strong>DES (Data Encryption Standard)</strong> is a
                      symmetric-key algorithm for the encryption of electronic
                      data.
                    </p>
                    <h2 className="text-l font-bold mt-2">
                      Historical Context
                    </h2>
                    <ul className="list-disc pl-5">
                      <li>
                        Developed in the early 1970s by IBM and standardized by
                        NIST in 1977.
                      </li>
                    </ul>
                    <h1 className="text-xl font-bold mt-2">Key Features</h1>
                    <ul className="list-disc pl-5">
                      <li>64-bit block size.</li>
                      <li>56-bit key (input as 64 bits with parity bits).</li>
                    </ul>
                  </div>
                  <div className="bg-green-800 p-6 mt-4 rounded-md">
                    <h1 className="text-xl font-bold mt-2 mb-2">
                      Key Generation Steps
                    </h1>
                    <ol className="list-decimal pl-5">
                      <li>
                        <strong>
                          Input 64-bit key (56 bits + 8 parity bits).
                        </strong>
                      </li>
                      <ul className="list-disc pl-5">
                        <li>Example: `133457799BBCDFF1`.</li>
                      </ul>
                      <li>
                        <strong>
                          Permute and divide the key into two halves.
                        </strong>
                      </li>
                      <li>
                        <strong>
                          Generate 16 subkeys using left shifts and permuted
                          choice functions.
                        </strong>
                      </li>
                    </ol>
                    <h1 className="text-xl font-bold mt-2 mb-2">
                      Interactive Section: Key Generation
                    </h1>
                    <ul className="list-disc pl-5">
                      <li>Input: 64-bit key.</li>
                      <li>Output: 16 subkeys.</li>
                      <li>Code Example (Python):</li>
                    </ul>
                    <CopyableInput
                      value={`from Crypto.Cipher import DES\n\ndef generate_des_subkeys(key):\n    des = DES.new(binascii.unhexlify(key), DES.MODE_ECB)\n    subkeys = des.key_schedule()\n    return [binascii.hexlify(k) for k in subkeys]\n\nkey = "133457799BBCDFF1"\nsubkeys = generate_des_subkeys(key)\nprint("Subkeys:", subkeys)`}
                    />
                  </div>
                  <h1 className="text-3xl font-bold mb-2 mt-2">
                    Encryption and Decryption
                  </h1>
                  <div className="bg-green-800 p-6 mt-4 rounded-md">
                    <h1 className="text-xl font-bold mb-2">
                      Encryption Process
                    </h1>
                    <ol className="list-decimal pl-5">
                      <li>
                        <strong>Divide plaintext into 64-bit blocks.</strong>
                      </li>
                      <li>
                        <strong>Initial Permutation (IP).</strong>
                      </li>
                      <li>
                        <strong>16 rounds of Feistel structure:</strong>
                      </li>
                      <ul className="list-disc pl-5">
                        <li>
                          Expansion, key mixing, substitution, and permutation.
                        </li>
                      </ul>
                      <li>
                        <strong>Final Permutation (FP).</strong>
                      </li>
                    </ol>
                    <h1 className="text-xl font-bold mb-2 mt-2">
                      Decryption Process
                    </h1>
                    <ol className="list-decimal pl-5">
                      <li>
                        <strong>Initial Permutation (IP).</strong>
                      </li>
                      <li>
                        <strong>
                          16 rounds of Feistel structure (in reverse order).
                        </strong>
                      </li>
                      <li>
                        <strong>Final Permutation (FP).</strong>
                      </li>
                    </ol>
                  </div>
                  <div className="bg-green-800 p-6 mt-4 rounded-md">
                    <h1 className="text-2xl font-bold mb-2">Example</h1>
                    <ul className="list-disc pl-5">
                      <li>Key: `133457799BBCDFF1`</li>
                      <li>Plaintext: `0123456789ABCDEF`</li>
                    </ul>
                    <h1 className="text-xl font-bold mb-2 mt-2">Encryption:</h1>
                    <ul className="list-disc pl-5">
                      <li>
                        Initial permutation and 16 rounds of transformation.
                      </li>
                    </ul>
                    <h1 className="text-xl font-bold mb-2 mt-2">Decryption:</h1>
                    <ul className="list-disc pl-5">
                      <li>Reverse the encryption rounds.</li>
                    </ul>
                    <h1 className="text-xl font-bold mb-2 mt-2">
                      Interactive Section: Encryption/Decryption
                    </h1>
                    <ul className="list-disc pl-5">
                      <li>
                        Input: Plaintext and Key for encryption; Ciphertext and
                        Key for decryption.
                      </li>
                      <li>
                        Output: Ciphertext for encryption; Plaintext for
                        decryption.
                      </li>
                      <li>Code Example (Python):</li>
                    </ul>
                    <CopyableInput
                      value={`def des_encrypt(plaintext, key):\n    des = DES.new(binascii.unhexlify(key), DES.MODE_ECB)\n    ciphertext = des.encrypt(binascii.unhexlify(plaintext))\n    return binascii.hexlify(ciphertext)\n\ndef des_decrypt(ciphertext, key):\n    des = DES.new(binascii.unhexlify(key), DES.MODE_ECB)\n    decrypted_text = des.decrypt(binascii.unhexlify(ciphertext))\n    return binascii.hexlify(decrypted_text)\n\nkey = "133457799BBCDFF1"\nplaintext = "0123456789ABCDEF"\nciphertext = des_encrypt(plaintext, key)\nprint("Ciphertext:", ciphertext)\ndecrypted_text = des_decrypt(ciphertext, key)\nprint("Decrypted Text:", decrypted_text)`}
                    />
                  </div>
                  <h2 className="text-3xl font-bold mb-2 mt-2">
                    Related YouTube Videos
                  </h2>
                  <div className="bg-green-800 p-6 mt-4 rounded-md">
                    <div className="mt-2">
                      <div className="flex justify-center">
                        <div className="grid grid-cols-3 gap-4">
                          <a
                            href={`https://www.youtube.com/watch?v=j53iXhTSi_s`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ display: "block", textDecoration: "none" }}
                          >
                            <img
                              src={`https://i.ytimg.com/vi/j53iXhTSi_s/hqdefault.jpg`}
                              alt={
                                algorithmDetails[selectedAlgorithm].videoTitle
                              }
                              style={{
                                width: "90%",
                                height: "80%",
                                borderRadius: "8px",
                              }}
                            />
                            <p style={{ marginTop: "8px", fontSize: "14px" }}>
                              Introduction to Data Encryption Standard (DES)
                            </p>
                          </a>
                          <a
                            href={`https://www.youtube.com/watch?v=jTyiIHC51_w`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ display: "block", textDecoration: "none" }}
                          >
                            <img
                              src={`https://i.ytimg.com/vi/jTyiIHC51_w/hqdefault.jpg`}
                              alt={
                                algorithmDetails[selectedAlgorithm].videoTitle
                              }
                              style={{
                                width: "90%",
                                height: "80%",
                                borderRadius: "8px",
                              }}
                            />
                            <p style={{ marginTop: "8px", fontSize: "14px" }}>
                              Data Encryption Standard ( DES ) Algorithm |CNS|
                            </p>
                          </a>
                          <a
                            href={`https://www.youtube.com/watch?v=S918rR4VdqQ`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ display: "block", textDecoration: "none" }}
                          >
                            <img
                              src={`https://i.ytimg.com/vi/S918rR4VdqQ/hqdefault.jpg`}
                              alt={
                                algorithmDetails[selectedAlgorithm].videoTitle
                              }
                              style={{
                                width: "90%",
                                height: "80%",
                                borderRadius: "8px",
                              }}
                            />
                            <p style={{ marginTop: "8px", fontSize: "14px" }}>
                              DES - Data Encryption Standard | Data Encryption
                              Standard In Cryptography |DES
                              Algorithm|Simplilearn
                            </p>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {selectedAlgorithm === "SHA" && (
                <>
                  <h1 className="text-3xl font-bold mb-2">
                    Introduction and Message Preparation
                  </h1>
                  <div className="bg-green-800 p-6 mt-4 rounded-md">
                    <h1 className="text-xl font-bold mb-2">Introduction</h1>
                    <p>
                      <strong>SHA (Secure Hash Algorithm)</strong> is a family
                      of cryptographic hash functions designed to provide data
                      integrity.
                    </p>
                    <h2 className="text-l font-bold mt-2">
                      Historical Context
                    </h2>
                    <ul className="list-disc pl-5">
                      <li>
                        Developed by the National Security Agency (NSA) and
                        published by NIST.
                      </li>
                    </ul>
                    <h1 className="text-xl font-bold mt-2">Key Features</h1>
                    <ul className="list-disc pl-5">
                      <li>Produces a fixed-size hash value from input data.</li>
                      <li>Commonly used versions: SHA-1, SHA-256, SHA-512.</li>
                    </ul>
                  </div>
                  <div className="bg-green-800 p-6 mt-4 rounded-md">
                    <h1 className="text-xl font-bold mt-2 mb-2">
                      Message Preparation
                    </h1>
                    <ol className="list-decimal pl-5">
                      <li>
                        <strong>Padding</strong>
                      </li>
                      <ul className="list-disc pl-5">
                        <li>
                          Pad the message to make its length congruent to 448
                          modulo 512.
                        </li>
                        <li>
                          Append the original message length as a 64-bit number.
                        </li>
                      </ul>
                      <li>
                        <strong>Divide message into 512-bit blocks.</strong>
                      </li>
                    </ol>
                    <h1 className="text-xl font-bold mt-2 mb-2">
                      Interactive Section: Message Preparation
                    </h1>
                    <ul className="list-disc pl-5">
                      <li>Input: Message.</li>
                      <li>Output: Padded and divided message.</li>
                      <li>Code Example (Python):</li>
                    </ul>
                    <CopyableInput
                      value={`import hashlib\n\ndef prepare_message(message):\n    original_length = len(message) * 8\n    message += b'\\x80'\n    while (len(message) * 8) % 512 != 448:\n        message += b'\\x00'\n    message += original_length.to_bytes(8, byteorder='big')\n    return message\n\nmessage = b"hello"\nprepared_message = prepare_message(message)\nprint("Prepared Message:", prepared_message)`}
                    />
                  </div>
                  <h1 className="text-3xl font-bold mb-2 mt-2">
                    Hash Computation
                  </h1>
                  <div className="bg-green-800 p-6 mt-4 rounded-md">
                    <h1 className="text-xl font-bold mb-2">
                      Hash Computation Steps
                    </h1>
                    <ol className="list-decimal pl-5">
                      <li>
                        <strong>Initialize Hash Values</strong>
                      </li>
                      <ul className="list-disc pl-5">
                        <li>
                          Use initial hash values specific to the SHA variant
                          (e.g., SHA-256).
                        </li>
                      </ul>
                      <li>
                        <strong>Process Each 512-bit Block</strong>
                      </li>
                      <ul className="list-disc pl-5">
                        <li>Divide block into 16 words (32 bits each).</li>
                        <li>
                          Extend the 16 words into 64 words (for SHA-256).
                        </li>
                        <li>
                          Initialize working variables (a, b, c, d, e, f, g, h).
                        </li>
                        <li>Perform 64 rounds of the compression function.</li>
                      </ul>
                    </ol>
                  </div>
                  <div className="bg-green-800 p-6 mt-4 rounded-md">
                    <h1 className="text-2xl font-bold mb-2">Example</h1>
                    <ul className="list-disc pl-5">
                      <li>
                        <strong>Initial Hash Values</strong>
                      </li>
                      <ul className="list-disc pl-5">
                        <li>Eight 32-bit words.</li>
                      </ul>
                      <li>
                        <strong>Message Schedule Array</strong>
                      </li>
                      <ul className="list-disc pl-5">
                        <li>64 words derived from the 512-bit input block.</li>
                      </ul>
                      <li>
                        <strong>Compression Function</strong>
                      </li>
                      <ul className="list-disc pl-5">
                        <li>
                          Update hash values with bitwise operations and modular
                          additions.
                        </li>
                      </ul>
                    </ul>
                    <h1 className="text-xl font-bold mb-2 mt-2">
                      Interactive Section: Hash Computation
                    </h1>
                    <ul className="list-disc pl-5">
                      <li>Input: Prepared message.</li>
                      <li>Output: Hash value.</li>
                      <li>Code Example (Python):</li>
                    </ul>
                    <CopyableInput
                      value={`def compute_sha256(message):\n    sha256 = hashlib.sha256()\n    sha256.update(message)\n    return sha256.hexdigest()\n\nmessage = prepare_message(b"hello")\nhash_value = compute_sha256(message)\nprint("SHA-256 Hash:", hash_value)`}
                    />
                  </div>
                  <h2 className="text-3xl font-bold mb-2 mt-2">
                    Related YouTube Videos
                  </h2>
                  <div className="bg-green-800 p-6 mt-4 rounded-md">
                    <div className="mt-2">
                      <div className="flex justify-center">
                        <div className="grid grid-cols-3 gap-4">
                          <a
                            href={`https://www.youtube.com/watch?v=YBZRHb1o8x0`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ display: "block", textDecoration: "none" }}
                          >
                            <img
                              src={`https://i.ytimg.com/vi/YBZRHb1o8x0/hqdefault.jpg`}
                              alt={
                                algorithmDetails[selectedAlgorithm].videoTitle
                              }
                              style={{
                                width: "90%",
                                height: "80%",
                                borderRadius: "8px",
                              }}
                            />
                            <p style={{ marginTop: "8px", fontSize: "14px" }}>
                              SHA ( Secure Hash Algorithm )Algorithm with
                              example |CNS|
                            </p>
                          </a>
                          <a
                            href={`https://www.youtube.com/watch?v=nduoUEHrK_4`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ display: "block", textDecoration: "none" }}
                          >
                            <img
                              src={`https://i.ytimg.com/vi/nduoUEHrK_4/hqdefault.jpg`}
                              alt={
                                algorithmDetails[selectedAlgorithm].videoTitle
                              }
                              style={{
                                width: "90%",
                                height: "80%",
                                borderRadius: "8px",
                              }}
                            />
                            <p style={{ marginTop: "8px", fontSize: "14px" }}>
                              SHA 256 | SHA 256 Algorithm Explanation | How SHA
                              256 Algorithm Works | Cryptography | Simplilearn
                            </p>
                          </a>
                          <a
                            href={`https://www.youtube.com/watch?v=Qvk9Bptdh_U`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ display: "block", textDecoration: "none" }}
                          >
                            <img
                              src={`https://i.ytimg.com/vi/Qvk9Bptdh_U/hqdefault.jpg`}
                              alt={
                                algorithmDetails[selectedAlgorithm].videoTitle
                              }
                              style={{
                                width: "90%",
                                height: "80%",
                                borderRadius: "8px",
                              }}
                            />
                            <p style={{ marginTop: "8px", fontSize: "14px" }}>
                              SHA 1 | Secure Hash Algorithm | Working of SHA 1 |
                              Parameters of SHA512 and SHA 256
                            </p>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
              <button
                onClick={() => handleCompletion(selectedAlgorithm)}
                className={`mt-4 px-4 py-2 rounded-md text-white ${
                  completedAlgorithms.includes(selectedAlgorithm)
                    ? "bg-green-500"
                    : "bg-blue-500"
                } hover:bg-blue-700`}
              >
                {completedAlgorithms.includes(selectedAlgorithm)
                  ? "Completed"
                  : "Mark as Completed"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Study;
