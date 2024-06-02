import React, { useState } from 'react';
import Navbar from "../components/nav2";
import AlgorithmCard from "../components/ac2";
import sharedClasses from '../styles/sharedClasses';
import CopyableInput from "../components/ci2";

const Study = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
  const [completedAlgorithms, setCompletedAlgorithms] = useState([]);

  const algorithmDescriptions = {
    RSA: 'Click to view RSA details and steps.',
    AES: 'Click to view AES details and steps.',
    DES: 'Click to view DES details and steps.',
    SHA: 'Click to view SHA details and steps.',
  };

  const algorithmDetails = {
    RSA: {},
    AES: {},
    DES: {},
    SHA: {},
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
      <div className={`${sharedClasses.container} flex-grow pt-0 `}>
        <div className="container mx-auto px-1 py-2 mt-0">
          <h1 className="text-3xl font-bold text-center dark:text-zinc-100">Cryptographic Algorithms</h1>
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
            Here you can explore the various cryptographic algorithms.
            Click on any algorithm to learn more about it.
          </p>
        </div>
          )}

          {selectedAlgorithm && (
            <div className="bg-gray-800 p-6 mt-8 rounded-md">
              <h2 className="text-4xl font-bold mb-4">{selectedAlgorithm}</h2>
              {selectedAlgorithm === 'RSA' && (
              <>
                <h1 className="text-3xl font-bold mb-2">Introduction and Key Generation</h1>
                <div className="bg-green-800 p-6 mt-4 rounded-md">
                <h1 className="text-xl font-bold mb-2">Introduction</h1>
                <p><strong>RSA (Rivest–Shamir–Adleman)</strong> is an asymmetric cryptographic algorithm used for secure data transmission. It uses a pair of keys: a public key for encryption and a private key for decryption.</p>
                <h2 className="text-l font-bold mt-2">Historical Context</h2>
                <ul className="list-disc pl-5">
                    <li>Introduced in 1977 by Ron Rivest, Adi Shamir, and Leonard Adleman.</li>
                    <li>Widely used in digital signatures and key exchanges</li>
                </ul>
                <h1 className="text-xl font-bold mt-2">Mathematical Background</h1>
                <ul className="list-disc pl-5">
                    <li className="text-l font-bold mt-2">Prime Numbers and Factoring</li>
                    <ul className="list-disc pl-5">
                    <li>The security of RSA relies on the difficulty of factoring large composite numbers.</li>
                    </ul>
                    <li className="text-l font-bold mt-2">Euler’s Totient Function</li>
                    <ul className="list-disc pl-5">
                    <li>ϕ(n)=(p−1)(q−1) where 𝑝 and q are prime numbers.</li>
                    </ul>
                </ul>
                </div>
                <div className="bg-green-800 p-6 mt-4 rounded-md">
                <h1 className="text-xl font-bold mt-2 mb-2">Key Generation Steps</h1>
                <ol className="list-decimal pl-5">
                    <li><strong>Select two large prime numbers 𝑝 and 𝑞.</strong></li>
                    <ul className="list-disc pl-5">
                    <li>Example: p=61,q=53.</li>
                    </ul>
                    <li><strong>Compute n = p x q.</strong></li>
                    <ul className="list-disc pl-5">
                    <li>Example: n=61×53=3233.</li>
                    </ul>
                    <li><strong>Compute Euler’s totient function ϕ(n)=(p−1)(q−1).</strong></li>
                    <ul className="list-disc pl-5">
                    <li>Example: ϕ(n)=(61−1)(53−1)=3120.</li>
                    </ul>
                    <li><strong>Choose an integer e such that 1‹e‹ϕ(n) and gcd(e,ϕ(n))=1.</strong></li>
                    <ul className="list-disc pl-5">
                    <li>Example: e=17.</li>
                    </ul>
                    <li><strong>Compute d such that d×e≡1modϕ(n).</strong></li>
                    <ul className="list-disc pl-5">
                    <li>Example: d=2753 (found using Extended Euclidean Algorithm).</li>
                    </ul>
                </ol>
                <h1 className="text-xl font-bold mt-2 mb-2">Key Pairs</h1>
                <ul className="list-disc pl-5">
                    <li>Public Key: (e,n) = (17, 3233)</li>
                    <li>Private Key: (d,n) = (2753, 3233)</li>
                    </ul>
                <h1 className="text-xl font-bold mt-2 mb-2">Interactive Section: Key Generation</h1>
                <ul className="list-disc pl-5">
                    <li>Input: Two prime numbers p and q.</li>
                    <li>Output: n,ϕ(n),e,d, Public Key, Private Key.</li>
                    <li>Code Example (Python):</li>
                    </ul>    
                    <CopyableInput value={`import sympy\n\ndef generate_rsa_keys(p, q):\n    n = p * q\n    phi = (p - 1) * (q - 1)\n    e = sympy.randprime(1, phi)\n    d = pow(e, -1, phi)\n    return (e, n), (d, n)\n\np = 61\nq = 53\npublic_key, private_key = generate_rsa_keys(p, q)\nprint("Public Key:", public_key)\nprint("Private Key:", private_key)`} />
              </div>
              <h1 className="text-3xl font-bold mb-2 mt-2">Encryption and Decryption</h1>
              <div className="bg-green-800 p-6 mt-4 rounded-md">
              <h1 className="text-xl font-bold mb-2">Encryption Process</h1>
              <ol className="list-decimal pl-5">
              <li><strong>Convert plaintext message to an integer 0≤m‹n.</strong></li> 
              <ul className="list-disc pl-5">
                    <li>Example: Plaintext "HI" converted to numeric m=72.</li>
              </ul>
              <li><strong>Compute the ciphertext c using c=m^e modn.</strong></li> 
              <ul className="list-disc pl-5">
                    <li>Example: c=72^17 mod 3233=3000.</li>
              </ul>
              </ol>
              <h1 className="text-xl font-bold mb-2 mt-2">Decryption Process</h1> 
              <ol className="list-decimal pl-5">
              <li><strong>Compute the original message m using m=c^d mod n.</strong></li> 
              <ul className="list-disc pl-5">
                    <li>Example: m=3000^2753 mod 3233 = 72.</li>
              </ul>
              </ol>
              </div> 
              <div className="bg-green-800 p-6 mt-4 rounded-md">
              <h1 className="text-2xl font-bold mb-2">Example</h1> 
              <ul className="list-disc pl-5">
                    <li>Plaintext: "HI" (convert to numeric: 72)</li>
                    <li>Public Key: (17, 3233)</li>
                    <li>Private Key: (2753, 3233)</li>
              </ul>
              <h1 className="text-xl font-bold mb-2 mt-2">Encryption:</h1> 
              <ul className="list-disc pl-5">
                    <li>m = 72</li>
                    <li>c = 72^17 mod 3233 = 3000</li>
              </ul>
              <h1 className="text-xl font-bold mb-2 mt-2">Decryption:</h1> 
              <ul className="list-disc pl-5">
                    <li>m = 3000^2753 mod 3233 = 72</li>
                    <li>Convert back to texxt: "HI"</li>
              </ul>
              <h1 className="text-xl font-bold mb-2 mt-2">Interactive Section: Encryption/Decryption</h1> 
              <ul className="list-disc pl-5">
                    <li>Input: Plaintext and Public Key for encryption; Ciphertext and Private Key for decryption.</li>
                    <li>Output: Ciphertext for encryption; Plaintext for decryption.</li>
                    <li>Code Example (Python):</li>
              </ul>
              <CopyableInput value={`def rsa_encrypt(plaintext, public_key):\n    e, n = public_key\n    plaintext_int = [ord(char) for char in plaintext]\n    ciphertext = [pow(m, e, n) for m in plaintext_int]\n    return ciphertext\n\ndef rsa_decrypt(ciphertext, private_key):\n    d, n = private_key\n    decrypted_int = [pow(c, d, n) for c in ciphertext]\n    decrypted_text = ''.join([chr(m) for m in decrypted_int])\n    return decrypted_text\n\npublic_key = (17, 3233)\nprivate_key = (2753, 3233)\nplaintext = "HI"\nciphertext = rsa_encrypt(plaintext, public_key)\nprint("Ciphertext:", ciphertext)\ndecrypted_text = rsa_decrypt(ciphertext, private_key)\nprint("Decrypted Text:", decrypted_text)`} />
              </div>
              <h2 className="text-3xl font-bold mb-2 mt-2">Related YouTube Videos</h2>
              <div className="bg-green-800 p-6 mt-4 rounded-md">
              <div className="mt-2">
                <div className="flex justify-center">
                <div className="grid grid-cols-3 gap-4">
                <a
                  href={`https://www.youtube.com/watch?v=JFQAHDOHjfM`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'block', textDecoration: 'none' }}
                >
                  <img
                    src={`https://i.ytimg.com/vi/JFQAHDOHjfM/hqdefault.jpg`}
                    alt={algorithmDetails[selectedAlgorithm].videoTitle}
                    style={{ width: '90%', height: '80%', borderRadius: '8px' }}
                  />
                  <p style={{ marginTop: '8px', fontSize: '14px' }}>RSA Algorithm - Asymmetric key cryptography |CNS|</p>
                </a>
                <a
                  href={`https://www.youtube.com/watch?v=vf1z7GlG6Qo`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'block', textDecoration: 'none' }}
                >
                  <img
                    src={`https://i.ytimg.com/vi/vf1z7GlG6Qo/maxresdefault.jpg`}
                    alt={algorithmDetails[selectedAlgorithm].videoTitle}
                    style={{ width: '90%', height: '80%', borderRadius: '8px' }}
                  />
                  <p style={{ marginTop: '8px', fontSize: '14px' }}>RSA Encryption Algorithm | Rivest–Shamir–Adleman | RSA Algorithm Explained | Simplilearn</p>
                </a>
                <a
                  href={`https://www.youtube.com/watch?v=qph77bTKJTM`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'block', textDecoration: 'none' }}
                >
                  <img
                    src={`https://i.ytimg.com/vi/qph77bTKJTM/maxresdefault.jpg`}
                    alt={algorithmDetails[selectedAlgorithm].videoTitle}
                    style={{ width: '90%', height: '80%', borderRadius: '8px' }}
                  />
                  <p style={{ marginTop: '8px', fontSize: '14px' }}>How does RSA Cryptography work?</p>
                </a>
              </div>  
              </div>  
              </div>
              </div>
              </>
              )}
              
              {selectedAlgorithm === 'AES' && (
              <>
                <h1 className="text-3xl font-bold mb-2">Introduction and Key Expansion</h1>
                <div className="bg-green-800 p-6 mt-4 rounded-md">
                <h1 className="text-xl font-bold mb-2">Introduction</h1>
                <p><strong>AES (Advanced Encryption Standard)</strong> is a symmetric encryption algorithm used globally to secure data.</p>
                <h2 className="text-l font-bold mt-2">Historical Context</h2>
                <ul className="list-disc pl-5">
                    <li>Standardized by NIST in 2001, developed by Joan Daemen and Vincent Rijmen.</li>
                </ul>
                <h1 className="text-xl font-bold mt-2">Key Features</h1>
                <ul className="list-disc pl-5">  
                    <li>Symmetric key algorithm.</li>
                    <li>Block cipher with 128-bit blocks.</li>
                    <li>Key sizes: 128, 192, or 256 bits.</li>   
                </ul>
                </div>
                <div className="bg-green-800 p-6 mt-4 rounded-md">
                <h1 className="text-xl font-bold mt-2 mb-2">Key Expansion</h1>
                <ul className="list-disc pl-5">
                    <li><strong>Key Schedule</strong></li>
                    <ul className="list-disc pl-5">  
                    <li>Expands the cipher key into a series of round keys.</li>
                    <li>The number of rounds depends on the key size: 10, 12, or 14 rounds.</li>
                </ul>
                </ul>
                <h1 className="text-xl font-bold mt-2 mb-2">Steps for 128-bit Key</h1>
                <ol className="list-decimal pl-5">
                    <li><strong>Initial Key</strong></li>
                    <ul className="list-disc pl-5">
                    <li>Example: `2b7e151628aed2a6abf7158809cf4f3c`.</li>
                    </ul>
                    <li><strong>Key Expansion Process</strong></li>
                    <ul className="list-disc pl-5">
                    <li>Generate an array of words (32-bit each) from the initial key.</li>
                    <li>Perform transformations on the initial key to produce round keys.</li>
                    </ul>     
                </ol>
                <h1 className="text-xl font-bold mt-2 mb-2">Interactive Section: Key Expansion</h1>
                <ul className="list-disc pl-5">
                    <li>Input: 128-bit key.</li>
                    <li>Output: Expanded key schedule.</li>
                    <li>Code Example (Python):</li>
                    </ul>    
                    <CopyableInput value={`from Crypto.Cipher import AES\nimport binascii\n\ndef expand_key_128bit(key):\n    key_bytes = binascii.unhexlify(key)\n    cipher = AES.new(key_bytes, AES.MODE_ECB)\n    expanded_key = cipher.expand_key(key_bytes)\n    return binascii.hexlify(expanded_key)\n\nkey = "2b7e151628aed2a6abf7158809cf4f3c"\nexpanded_key = expand_key_128bit(key)\nprint("Expanded Key:", expanded_key)`} />
                </div>  
              <h1 className="text-3xl font-bold mb-2 mt-2">Encryption and Decryption</h1>
              <div className="bg-green-800 p-6 mt-4 rounded-md">
              <h1 className="text-xl font-bold mb-2">Encryption Process</h1>
              <ol className="list-decimal pl-5">
              <li><strong>Divide plaintext into 128-bit blocks.</strong></li>
              <li><strong>Initial AddRoundKey step.</strong></li> 
              <li><strong>For each round:</strong></li>  
              <ul className="list-disc pl-5">
                    <li>SubBytes</li>
                    <li>ShiftRows</li>
                    <li>MixColumns (except final round)</li>
                    <li>AddRoundKey</li>
              </ul>
              </ol>
              <h1 className="text-xl font-bold mb-2 mt-2">Decryption Process</h1> 
              <ol className="list-decimal pl-5">
              <li><strong>Initial AddRoundKey step.</strong></li>
              <li><strong>For each round (in reverse):</strong></li>  
              <ul className="list-disc pl-5">
                    <li>InvShiftRows</li>
                    <li>InvSubBytes</li>
                    <li>AddRoundKey</li>
                    <li>InvMixColumns (except final round)</li>
              </ul>
              </ol>
              </div> 
              <div className="bg-green-800 p-6 mt-4 rounded-md">
              <h1 className="text-2xl font-bold mb-2">Example</h1> 
              <ul className="list-disc pl-5">
                    <li>Key: `2b7e151628aed2a6abf7158809cf4f3c` (128-bit)</li>
                    <li>Plaintext: `3243f6a8885a308d313198a2e0370734`</li>
              </ul>
              <h1 className="text-xl font-bold mb-2 mt-2">Encryption:</h1> 
              <ul className="list-disc pl-5">
                    <li>Initial AddRoundKey and 10 rounds of transformations.</li>
              </ul>
              <h1 className="text-xl font-bold mb-2 mt-2">Decryption:</h1> 
              <ul className="list-disc pl-5">
                    <li>Inverse of the encryption process.</li>
              </ul>
              <h1 className="text-xl font-bold mb-2 mt-2">Interactive Section: Encryption/Decryption</h1> 
              <ul className="list-disc pl-5">
                    <li>Input: Plaintext and Public Key for encryption; Ciphertext and Key for decryption.</li>
                    <li>Output: Ciphertext for encryption; Plaintext for decryption.</li>
                    <li>Code Example (Python):</li>
              </ul>
              <CopyableInput value={`from Crypto.Cipher import AES\n\ndef aes_encrypt(plaintext, key):\n    cipher = AES.new(binascii.unhexlify(key), AES.MODE_ECB)\n    ciphertext = cipher.encrypt(binascii.unhexlify(plaintext))\n    return binascii.hexlify(ciphertext)\n\ndef aes_decrypt(ciphertext, key):\n    cipher = AES.new(binascii.unhexlify(key), AES.MODE_ECB)\n    decrypted_text = cipher.decrypt(binascii.unhexlify(ciphertext))\n    return binascii.hexlify(decrypted_text)\n\nkey = "2b7e151628aed2a6abf7158809cf4f3c"\nplaintext = "3243f6a8885a308d313198a2e0370734"\nciphertext = aes_encrypt(plaintext, key)\nprint("Ciphertext:", ciphertext)\ndecrypted_text = aes_decrypt(ciphertext, key)\nprint("Decrypted Text:", decrypted_text)`} />
              </div>
              <h2 className="text-3xl font-bold mb-2 mt-2">Related YouTube Videos</h2>
              <div className="bg-green-800 p-6 mt-4 rounded-md">
              <div className="mt-2">
                <div className="flex justify-center">
                <div className="grid grid-cols-3 gap-4">
                <a
                  href={`https://www.youtube.com/watch?v=3MPkc-PFSRI`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'block', textDecoration: 'none' }}
                >
                  <img
                    src={`https://i.ytimg.com/vi/3MPkc-PFSRI/hqdefault.jpg`}
                    alt={algorithmDetails[selectedAlgorithm].videoTitle}
                    style={{ width: '90%', height: '80%', borderRadius: '8px' }}
                  />
                  <p style={{ marginTop: '8px', fontSize: '14px' }}>Introduction to Advanced Encryption Standard (AES)</p>
                </a>
                <a
                  href={`https://www.youtube.com/watch?v=Z_7aOkS8tOA`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'block', textDecoration: 'none' }}
                >
                  <img
                    src={`https://i.ytimg.com/vi/Z_7aOkS8tOA/hqdefault.jpg`}
                    alt={algorithmDetails[selectedAlgorithm].videoTitle}
                    style={{ width: '90%', height: '80%', borderRadius: '8px' }}
                  />
                  <p style={{ marginTop: '8px', fontSize: '14px' }}>AES - Advanced Encryption Standard Algorithm In Cryptography | AES Explained | Simplilearn</p>
                </a>
                <a
                  href={`https://www.youtube.com/watch?v=mX625uCU1bc`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'block', textDecoration: 'none' }}
                >
                  <img
                    src={`https://i.ytimg.com/vi/mX625uCU1bc/hqdefault.jpg`}
                    alt={algorithmDetails[selectedAlgorithm].videoTitle}
                    style={{ width: '90%', height: '80%', borderRadius: '8px' }}
                  />
                  <p style={{ marginTop: '8px', fontSize: '14px' }}>Advanced Encryption Standard ( AES ) Algorithm - Block Cipher Algorithm |CNS|</p>
                </a>
              </div>  
              </div>  
              </div>
              </div>
              </>
              )}

              {selectedAlgorithm === 'DES' && (
              <>
                <h1 className="text-3xl font-bold mb-2">Introduction and Key Generation</h1>
                <div className="bg-green-800 p-6 mt-4 rounded-md">
                <h1 className="text-xl font-bold mb-2">Introduction</h1>
                <p><strong>DES (Data Encryption Standard)</strong> is a symmetric-key algorithm for the encryption of electronic data.</p>
                <h2 className="text-l font-bold mt-2">Historical Context</h2>
                <ul className="list-disc pl-5">
                    <li>Developed in the early 1970s by IBM and standardized by NIST in 1977.</li>
                </ul>
                <h1 className="text-xl font-bold mt-2">Key Features</h1>
                <ul className="list-disc pl-5">  
                    <li>64-bit block size.</li>
                    <li>56-bit key (input as 64 bits with parity bits).</li>
                </ul>
                </div>
                <div className="bg-green-800 p-6 mt-4 rounded-md">
                <h1 className="text-xl font-bold mt-2 mb-2">Key Generation Steps</h1>
                <ol className="list-decimal pl-5">
                    <li><strong>Input 64-bit key (56 bits + 8 parity bits).</strong></li>
                    <ul className="list-disc pl-5">
                    <li>Example: `133457799BBCDFF1`.</li>
                    </ul>
                    <li><strong>Permute and divide the key into two halves.</strong></li>
                    <li><strong>Generate 16 subkeys using left shifts and permuted choice functions.</strong></li>
                </ol>
                <h1 className="text-xl font-bold mt-2 mb-2">Interactive Section: Key Generation</h1>
                <ul className="list-disc pl-5">
                    <li>Input: 64-bit key.</li>
                    <li>Output: 16 subkeys.</li>
                    <li>Code Example (Python):</li>
                    </ul>    
                    <CopyableInput value={`from Crypto.Cipher import DES\n\ndef generate_des_subkeys(key):\n    des = DES.new(binascii.unhexlify(key), DES.MODE_ECB)\n    subkeys = des.key_schedule()\n    return [binascii.hexlify(k) for k in subkeys]\n\nkey = "133457799BBCDFF1"\nsubkeys = generate_des_subkeys(key)\nprint("Subkeys:", subkeys)`} />
                </div>  
              <h1 className="text-3xl font-bold mb-2 mt-2">Encryption and Decryption</h1>
              <div className="bg-green-800 p-6 mt-4 rounded-md">
              <h1 className="text-xl font-bold mb-2">Encryption Process</h1>
              <ol className="list-decimal pl-5">
              <li><strong>Divide plaintext into 64-bit blocks.</strong></li>
              <li><strong>Initial Permutation (IP).</strong></li> 
              <li><strong>16 rounds of Feistel structure:</strong></li>  
              <ul className="list-disc pl-5">
                    <li>Expansion, key mixing, substitution, and permutation.</li>
              </ul>
              <li><strong>Final Permutation (FP).</strong></li>
              </ol>
              <h1 className="text-xl font-bold mb-2 mt-2">Decryption Process</h1> 
              <ol className="list-decimal pl-5">
              <li><strong>Initial Permutation (IP).</strong></li>
              <li><strong>16 rounds of Feistel structure (in reverse order).</strong></li>
              <li><strong>Final Permutation (FP).</strong></li>   
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
                    <li>Initial permutation and 16 rounds of transformation.</li>
              </ul>
              <h1 className="text-xl font-bold mb-2 mt-2">Decryption:</h1> 
              <ul className="list-disc pl-5">
                    <li>Reverse the encryption rounds.</li>
              </ul>
              <h1 className="text-xl font-bold mb-2 mt-2">Interactive Section: Encryption/Decryption</h1> 
              <ul className="list-disc pl-5">
                    <li>Input: Plaintext and Key for encryption; Ciphertext and Key for decryption.</li>
                    <li>Output: Ciphertext for encryption; Plaintext for decryption.</li>
                    <li>Code Example (Python):</li>
              </ul>
              <CopyableInput value={`def des_encrypt(plaintext, key):\n    des = DES.new(binascii.unhexlify(key), DES.MODE_ECB)\n    ciphertext = des.encrypt(binascii.unhexlify(plaintext))\n    return binascii.hexlify(ciphertext)\n\ndef des_decrypt(ciphertext, key):\n    des = DES.new(binascii.unhexlify(key), DES.MODE_ECB)\n    decrypted_text = des.decrypt(binascii.unhexlify(ciphertext))\n    return binascii.hexlify(decrypted_text)\n\nkey = "133457799BBCDFF1"\nplaintext = "0123456789ABCDEF"\nciphertext = des_encrypt(plaintext, key)\nprint("Ciphertext:", ciphertext)\ndecrypted_text = des_decrypt(ciphertext, key)\nprint("Decrypted Text:", decrypted_text)`} />
              </div>
              <h2 className="text-3xl font-bold mb-2 mt-2">Related YouTube Videos</h2>
              <div className="bg-green-800 p-6 mt-4 rounded-md">
              <div className="mt-2">
                <div className="flex justify-center">
                <div className="grid grid-cols-3 gap-4">
                <a
                  href={`https://www.youtube.com/watch?v=j53iXhTSi_s`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'block', textDecoration: 'none' }}
                >
                  <img
                    src={`https://i.ytimg.com/vi/j53iXhTSi_s/hqdefault.jpg`}
                    alt={algorithmDetails[selectedAlgorithm].videoTitle}
                    style={{ width: '90%', height: '80%', borderRadius: '8px' }}
                  />
                  <p style={{ marginTop: '8px', fontSize: '14px' }}>Introduction to Data Encryption Standard (DES)</p>
                </a>
                <a
                  href={`https://www.youtube.com/watch?v=jTyiIHC51_w`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'block', textDecoration: 'none' }}
                >
                  <img
                    src={`https://i.ytimg.com/vi/jTyiIHC51_w/hqdefault.jpg`}
                    alt={algorithmDetails[selectedAlgorithm].videoTitle}
                    style={{ width: '90%', height: '80%', borderRadius: '8px' }}
                  />
                  <p style={{ marginTop: '8px', fontSize: '14px' }}>Data Encryption Standard ( DES ) Algorithm |CNS|</p>
                </a>
                <a
                  href={`https://www.youtube.com/watch?v=S918rR4VdqQ`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'block', textDecoration: 'none' }}
                >
                  <img
                    src={`https://i.ytimg.com/vi/S918rR4VdqQ/hqdefault.jpg`}
                    alt={algorithmDetails[selectedAlgorithm].videoTitle}
                    style={{ width: '90%', height: '80%', borderRadius: '8px' }}
                  />
                  <p style={{ marginTop: '8px', fontSize: '14px' }}>DES - Data Encryption Standard | Data Encryption Standard In Cryptography |DES Algorithm|Simplilearn</p>
                </a>
              </div>  
              </div>  
              </div>
              </div>
              </>
              )}

              {selectedAlgorithm === 'SHA' && (
              <>
                <h1 className="text-3xl font-bold mb-2">Introduction and Message Preparation</h1>
                <div className="bg-green-800 p-6 mt-4 rounded-md">
                <h1 className="text-xl font-bold mb-2">Introduction</h1>
                <p><strong>SHA (Secure Hash Algorithm)</strong> is a family of cryptographic hash functions designed to provide data integrity.</p>
                <h2 className="text-l font-bold mt-2">Historical Context</h2>
                <ul className="list-disc pl-5">
                    <li>Developed by the National Security Agency (NSA) and published by NIST.</li>
                </ul>
                <h1 className="text-xl font-bold mt-2">Key Features</h1>
                <ul className="list-disc pl-5">  
                    <li>Produces a fixed-size hash value from input data.</li>
                    <li>Commonly used versions: SHA-1, SHA-256, SHA-512.</li>
                </ul>
                </div>
                <div className="bg-green-800 p-6 mt-4 rounded-md">
                <h1 className="text-xl font-bold mt-2 mb-2">Message Preparation</h1>
                <ol className="list-decimal pl-5">
                    <li><strong>Padding</strong></li>
                    <ul className="list-disc pl-5">
                    <li>Pad the message to make its length congruent to 448 modulo 512.</li>
                    <li>Append the original message length as a 64-bit number.</li>
                    </ul>
                    <li><strong>Divide message into 512-bit blocks.</strong></li>
                </ol>
                <h1 className="text-xl font-bold mt-2 mb-2">Interactive Section: Message Preparation</h1>
                <ul className="list-disc pl-5">
                    <li>Input: Message.</li>
                    <li>Output: Padded and divided message.</li>
                    <li>Code Example (Python):</li>
                    </ul>    
                    <CopyableInput value={`import hashlib\n\ndef prepare_message(message):\n    original_length = len(message) * 8\n    message += b'\\x80'\n    while (len(message) * 8) % 512 != 448:\n        message += b'\\x00'\n    message += original_length.to_bytes(8, byteorder='big')\n    return message\n\nmessage = b"hello"\nprepared_message = prepare_message(message)\nprint("Prepared Message:", prepared_message)`} />
                </div>  
              <h1 className="text-3xl font-bold mb-2 mt-2">Hash Computation</h1>
              <div className="bg-green-800 p-6 mt-4 rounded-md">
              <h1 className="text-xl font-bold mb-2">Hash Computation Steps</h1>
              <ol className="list-decimal pl-5">
              <li><strong>Initialize Hash Values</strong></li>
              <ul className="list-disc pl-5">
                    <li>Use initial hash values specific to the SHA variant (e.g., SHA-256).</li>
              </ul>
              <li><strong>Process Each 512-bit Block</strong></li>  
              <ul className="list-disc pl-5">
                    <li>Divide block into 16 words (32 bits each).</li>
                    <li>Extend the 16 words into 64 words (for SHA-256).</li>
                    <li>Initialize working variables (a, b, c, d, e, f, g, h).</li>
                    <li>Perform 64 rounds of the compression function.</li>
              </ul>
              </ol>
              </div> 
              <div className="bg-green-800 p-6 mt-4 rounded-md">
              <h1 className="text-2xl font-bold mb-2">Example</h1> 
              <ul className="list-disc pl-5">
              <li><strong>Initial Hash Values</strong></li>
              <ul className="list-disc pl-5">
                    <li>Eight 32-bit words.</li>
              </ul>
              <li><strong>Message Schedule Array</strong></li>
              <ul className="list-disc pl-5">
                    <li>64 words derived from the 512-bit input block.</li>
              </ul>
              <li><strong>Compression Function</strong></li>
              <ul className="list-disc pl-5">
                    <li>Update hash values with bitwise operations and modular additions.</li>
              </ul>  
              </ul>
              <h1 className="text-xl font-bold mb-2 mt-2">Interactive Section: Hash Computation</h1> 
              <ul className="list-disc pl-5">
                    <li>Input: Prepared message.</li>
                    <li>Output: Hash value.</li>
                    <li>Code Example (Python):</li>
              </ul>
              <CopyableInput value={`def compute_sha256(message):\n    sha256 = hashlib.sha256()\n    sha256.update(message)\n    return sha256.hexdigest()\n\nmessage = prepare_message(b"hello")\nhash_value = compute_sha256(message)\nprint("SHA-256 Hash:", hash_value)`} />
              </div>
              <h2 className="text-3xl font-bold mb-2 mt-2">Related YouTube Videos</h2>
              <div className="bg-green-800 p-6 mt-4 rounded-md">
              <div className="mt-2">
                <div className="flex justify-center">
                <div className="grid grid-cols-3 gap-4">
                <a
                  href={`https://www.youtube.com/watch?v=YBZRHb1o8x0`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'block', textDecoration: 'none' }}
                >
                  <img
                    src={`https://i.ytimg.com/vi/YBZRHb1o8x0/hqdefault.jpg`}
                    alt={algorithmDetails[selectedAlgorithm].videoTitle}
                    style={{ width: '90%', height: '80%', borderRadius: '8px' }}
                  />
                  <p style={{ marginTop: '8px', fontSize: '14px' }}>SHA ( Secure Hash Algorithm )Algorithm with example |CNS|</p>
                </a>
                <a
                  href={`https://www.youtube.com/watch?v=nduoUEHrK_4`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'block', textDecoration: 'none' }}
                >
                  <img
                    src={`https://i.ytimg.com/vi/nduoUEHrK_4/hqdefault.jpg`}
                    alt={algorithmDetails[selectedAlgorithm].videoTitle}
                    style={{ width: '90%', height: '80%', borderRadius: '8px' }}
                  />
                  <p style={{ marginTop: '8px', fontSize: '14px' }}>SHA 256 | SHA 256 Algorithm Explanation | How SHA 256 Algorithm Works | Cryptography | Simplilearn</p>
                </a>
                <a
                  href={`https://www.youtube.com/watch?v=Qvk9Bptdh_U`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'block', textDecoration: 'none' }}
                >
                  <img
                    src={`https://i.ytimg.com/vi/Qvk9Bptdh_U/hqdefault.jpg`}
                    alt={algorithmDetails[selectedAlgorithm].videoTitle}
                    style={{ width: '90%', height: '80%', borderRadius: '8px' }}
                  />
                  <p style={{ marginTop: '8px', fontSize: '14px' }}>SHA 1 | Secure Hash Algorithm | Working of SHA 1 | Parameters of SHA512 and SHA 256</p>
                </a>
              </div>  
              </div>  
              </div>
              </div>

              </>
              )}

              <button
                onClick={() => handleCompletion(selectedAlgorithm)}
                className={`mt-4 px-4 py-2 rounded-md text-white ${completedAlgorithms.includes(selectedAlgorithm) ? 'bg-green-500' : 'bg-blue-500'} hover:bg-blue-700`}> 
                {completedAlgorithms.includes(selectedAlgorithm) ? 'Completed' : 'Mark as Completed'}
              </button>
              
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Study;
