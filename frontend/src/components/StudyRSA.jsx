import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import CopyableInput from "../components/ci2";
import ProgressButton from "../components/ProgressButton";

const StudyRSA = () => {
  const [progress, setProgress] = useState(0);
  const [currentButton, setCurrentButton] = useState(0);
  const { updateProgress, user } = useAuth();

  useEffect(() => {
    // Load the user's progress when the component mounts
    if (user && user.progress && user.progress.RSA) {
      setProgress(user.progress.RSA);
    }
  }, [user]);

  const handleUpdateProgress = (buttonIndex) => {
    if (buttonIndex === currentButton) {
      let newProgress = progress;
      // Increment progress by 33% for each button click
      newProgress = Math.min(progress + 33, 100);
      if (newProgress >= 99) {
        newProgress = 100;
      }
      setProgress(newProgress);
      setCurrentButton(currentButton + 1);

      // Update progress in Firestore
      updateProgress("RSA", newProgress);

      if (buttonIndex === 2) {
        setProgress(100);
        setCurrentButton(3);
      }
    }
  };

  return (
    <div>
      <div className="relative mt-4">
        <div className="h-2 bg-gray-200 rounded-md overflow-hidden">
          <div
            className={`h-full ${
              progress === 100 ? "bg-green-500" : "bg-red-600"
            }`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="absolute top-0 right-0 p-2 bg-gray-200 rounded-md">
          <span className="text-s font-bold text-black">{progress}%</span>
        </div>
      </div>
      <h1 className="text-3xl font-bold mb-2">
        Introduction and Key Generation
      </h1>
      <div className="bg-green-800 p-6 mt-4 rounded-md">
        <h1 className="text-xl font-bold mb-2">Introduction</h1>
        <p>
          <strong>RSA (Rivest–Shamir–Adleman)</strong> is an asymmetric
          cryptographic algorithm used for secure data transmission. It uses a
          pair of keys: a public key for encryption and a private key for
          decryption.
        </p>
        <h2 className="text-l font-bold mt-2">Historical Context</h2>
        <ul className="list-disc pl-5">
          <li>
            Introduced in 1977 by Ron Rivest, Adi Shamir, and Leonard Adleman.
          </li>
          <li>Widely used in digital signatures and key exchanges</li>
        </ul>
        <h1 className="text-xl font-bold mt-2">Mathematical Background</h1>
        <ul className="list-disc pl-5">
          <li className="text-l font-bold mt-2">Prime Numbers and Factoring</li>
          <ul className="list-disc pl-5">
            <li>
              The security of RSA relies on the difficulty of factoring large
              composite numbers.
            </li>
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
          <li>
            <strong>Select two large prime numbers 𝑝 and 𝑞.</strong>
          </li>
          <ul className="list-disc pl-5">
            <li>Example: p=61,q=53.</li>
          </ul>
          <li>
            <strong>Compute n = p x q.</strong>
          </li>
          <ul className="list-disc pl-5">
            <li>Example: n=61×53=3233.</li>
          </ul>
          <li>
            <strong>Compute Euler’s totient function ϕ(n)=(p−1)(q−1).</strong>
          </li>
          <ul className="list-disc pl-5">
            <li>Example: ϕ(n)=(61−1)(53−1)=3120.</li>
          </ul>
          <li>
            <strong>
              Choose an integer e such that 1‹e‹ϕ(n) and gcd(e,ϕ(n))=1.
            </strong>
          </li>
          <ul className="list-disc pl-5">
            <li>Example: e=17.</li>
          </ul>
          <li>
            <strong>Compute d such that d×e≡1modϕ(n).</strong>
          </li>
          <ul className="list-disc pl-5">
            <li>Example: d=2753 (found using Extended Euclidean Algorithm).</li>
          </ul>
        </ol>
        <h1 className="text-xl font-bold mt-2 mb-2">Key Pairs</h1>
        <ul className="list-disc pl-5">
          <li>Public Key: (e,n) = (17, 3233)</li>
          <li>Private Key: (d,n) = (2753, 3233)</li>
        </ul>
        <h1 className="text-xl font-bold mt-2 mb-2">
          Interactive Section: Key Generation
        </h1>
        <ul className="list-disc pl-5">
          <li>Input: Two prime numbers p and q.</li>
          <li>Output: n,ϕ(n),e,d, Public Key, Private Key.</li>
          <li>Code Example (Python):</li>
        </ul>
        <CopyableInput
          value={`import sympy\n\ndef generate_rsa_keys(p, q):\n    n = p * q\n    phi = (p - 1) * (q - 1)\n    e = sympy.randprime(1, phi)\n    d = pow(e, -1, phi)\n    return (e, n), (d, n)\n\np = 61\nq = 53\npublic_key, private_key = generate_rsa_keys(p, q)\nprint("Public Key:", public_key)\nprint("Private Key:", private_key)`}
        />
      </div>
      <div className="mt-4 space-y-4 flex justify-end space-x-4">
        <ProgressButton
          onClick={() => handleUpdateProgress(0)}
          progress={progress}
          isCompleted={progress >= 33}
          disabled={currentButton !== 0}
        />
      </div>
      <h1 className="text-3xl font-bold mb-2 mt-2">
        Encryption and Decryption
      </h1>
      <div className="bg-green-800 p-6 mt-4 rounded-md">
        <h1 className="text-xl font-bold mb-2">Encryption Process</h1>
        <ol className="list-decimal pl-5">
          <li>
            <strong>Convert plaintext message to a number m.</strong>
          </li>
          <ul className="list-disc pl-5">
            <li>Example: HELLO → m.</li>
          </ul>
          <li>
            <strong>
              Compute ciphertext c using the public key (e,n): c = m^e mod n.
            </strong>
          </li>
          <ul className="list-disc pl-5">
            <li>Example: c=123^17mod3233.</li>
          </ul>
        </ol>
        <h1 className="text-xl font-bold mt-2 mb-2">Decryption Process</h1>
        <ol className="list-decimal pl-5">
          <li>
            <strong>
              Compute plaintext message m using the private key (d,n): m = c^d
              mod n.
            </strong>
          </li>
          <ul className="list-disc pl-5">
            <li>Example: m=855^2753mod3233.</li>
          </ul>
        </ol>
        <h1 className="text-xl font-bold mt-2 mb-2">
          Interactive Section: Encryption/Decryption
        </h1>
        <ul className="list-disc pl-5">
          <li>Input: Plaintext message, Public Key (e,n).</li>
          <li>Output: Ciphertext c.</li>
          <li>Input: Ciphertext c, Private Key (d,n).</li>
          <li>Output: Decrypted message m.</li>
          <li>Code Example (Python):</li>
        </ul>
        <CopyableInput
          value={`def encrypt_rsa(m, e, n):\n    return pow(m, e, n)\n\ndef decrypt_rsa(c, d, n):\n    return pow(c, d, n)\n\nmessage = 123\npublic_key = (17, 3233)\nprivate_key = (2753, 3233)\n\nciphertext = encrypt_rsa(message, *public_key)\ndecrypted_message = decrypt_rsa(ciphertext, *private_key)\nprint("Ciphertext:", ciphertext)\nprint("Decrypted Message:", decrypted_message)`}
        />
      </div>
      <div className="mt-4 space-y-4 flex justify-end space-x-4">
        <ProgressButton
          onClick={() => handleUpdateProgress(1)}
          progress={progress}
          isCompleted={progress >= 66}
          disabled={currentButton !== 1}
        />
      </div>
      <h1 className="text-3xl font-bold mb-2 mt-2">
        Security and Applications
      </h1>
      <div className="bg-green-800 p-6 mt-4 rounded-md">
        <h1 className="text-xl font-bold mb-2">Security Aspects</h1>
        <ul className="list-disc pl-5">
          <li className="text-l font-bold mt-2">Strengths of RSA Encryption</li>
          <ul className="list-disc pl-5">
            <li>Strong security due to mathematical complexity</li>
            <li>Widely trusted and studied</li>
          </ul>
          <li className="text-l font-bold mt-2">Potential Vulnerabilities</li>
          <ul className="list-disc pl-5">
            <li>Susceptible to brute-force attacks if keys are too short</li>
            <li>Implementation flaws can lead to security breaches</li>
          </ul>
        </ul>
        <h1 className="text-xl font-bold mt-2 mb-2">Real-World Applications</h1>
        <ul className="list-disc pl-5">
          <li>Digital signatures for authenticity</li>
          <li>Secure key exchange in SSL/TLS</li>
          <li>Encryption of sensitive data</li>
        </ul>
        <h1 className="text-xl font-bold mt-2 mb-2">
          Interactive Section: Security Analysis
        </h1>
        <ul className="list-disc pl-5">
          <li>Input: Key size, Attack method.</li>
          <li>Output: Time to break encryption.</li>
          <li>Code Example (Python):</li>
        </ul>
        <CopyableInput
          value={`import time\n\ndef security_analysis(key_size):\n    start_time = time.time()\n    # Simulated attack time based on key size\n    attack_time = 2 ** (key_size / 10)\n    end_time = time.time() + attack_time\n    return end_time - start_time\n\nkey_size = 2048\nattack_time = security_analysis(key_size)\nprint(f"Time to break {key_size}-bit RSA: {attack_time} seconds")`}
        />
      </div>
      <div className="mt-4 space-y-4 flex justify-end space-x-4">
        <ProgressButton
          onClick={() => handleUpdateProgress(2)}
          progress={progress}
          isCompleted={progress === 100}
          disabled={currentButton !== 2}
        />
      </div>
    </div>
  );
};

export default StudyRSA;
