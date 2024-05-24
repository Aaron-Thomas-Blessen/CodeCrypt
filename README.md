# Cryptography Simulation with mbedTLS/OpenSSL

## Overview

Welcome to the Cryptography Simulation Project! This project is designed to provide an interactive simulation of cryptographic techniques using C code and the mbedTLS/OpenSSL libraries. The goal is to enable users to understand and experiment with different aspects of cryptography, including encryption, decryption, key generation, and cryptographic algorithms.

## Objective

The primary objective of this project is to develop an educational tool that helps users, especially students in the 5th-8th semesters of their computer science studies, to grasp fundamental concepts of cryptography through hands-on experience.

## Key Features

1. **Algorithm Implementation:** Accurate implementation of various cryptographic algorithms such as RSA, AES, DES, and SHA using mbedTLS/OpenSSL libraries.
2. **Interactive Encryption/Decryption:** Users can input text or data, select an encryption method, view the encrypted result, and then decrypt it back to the original text or data.
3. **Key Generation and Management:** Simulation of cryptographic key generation, exchange, and management processes.
4. **User-Friendly Visualization:** The application features a command line or graphical user interface (based on user interest and skill) to take user input.
5. **Educational Content:** Interactive tutorials and educational content on fundamental security concepts like public/private keys, symmetric/asymmetric encryption, key derivation functions, digital signatures, and hash functions.
6. **User Interaction:** Interactive elements for users to experiment with different algorithms, key sizes, and encryption parameters.

## Deliverables

1. **Cryptography Engine:** A C-based backend handling the implementation of cryptographic algorithms and processes.
2. **Interactive User Interface:** A user interface, either command line or graphical, demonstrating the project's key challenges and educational content.
3. **Documentation:** Comprehensive documentation detailing the implemented cryptographic algorithms, usage guide, and technical details.

## Constraints

- **Simplicity vs. Depth:** Balancing a simple, intuitive user interface with the need to offer in-depth exploration of complex cryptographic concepts.
- **Accuracy and Reliability:** Ensuring the cryptographic algorithms are implemented accurately and reliably demonstrate their intended behavior.
- **Educational Value:** Designing the simulation to be educational for users with varying levels of prior knowledge in cryptography.

## Expected Outcomes

The successful completion of this project will result in an interactive tool serving as an educational resource for understanding and experimenting with cryptography. It will be particularly valuable for students and professionals in the field of cybersecurity, providing a hands-on experience with cryptographic concepts and techniques. The tool will facilitate a deeper understanding of how cryptography secures digital communication and data.

## Getting Started

### Prerequisites

- **C Compiler:** Ensure you have a C compiler installed (e.g., GCC).
- **mbedTLS/OpenSSL Libraries:** Install the mbedTLS or OpenSSL libraries on your system.

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/cryptography-simulation.git
   cd cryptography-simulation
   ```

2. Install dependencies (mbedTLS or OpenSSL):
   ```sh
   # For mbedTLS
   sudo apt-get install libmbedtls-dev

   # For OpenSSL
   sudo apt-get install libssl-dev
   ```

3. Compile the project:
   ```sh
   make
   ```

### Usage

Run the application:
```sh
./cryptography-simulation
```

Follow the on-screen instructions to interact with the various cryptographic algorithms and educational content.

## Documentation

Comprehensive documentation is available in the `docs/` directory, including:

- **Algorithm Descriptions:** Detailed descriptions of each cryptographic algorithm implemented.
- **Usage Guide:** Step-by-step instructions on using the interactive tool.
- **Technical Details:** In-depth technical details of the implementation.

## Contributing

We welcome contributions from the community! Please read the `CONTRIBUTING.md` file for guidelines on how to contribute to this project.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

## Contact

For any questions or feedback, please contact us at [your email address].

---

We hope this tool helps you understand and appreciate the fascinating field of cryptography!
