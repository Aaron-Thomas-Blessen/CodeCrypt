# Cryptography Simulation with mbedTLS/OpenSSL

This project is an interactive simulation of cryptographic techniques using C and the mbedTLS/OpenSSL library. It enables users to understand and experiment with various aspects of cryptography, including encryption, decryption, key generation, and different cryptographic algorithms. The frontend is built using Vite and React, providing an intuitive and user-friendly interface.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Introduction

Cryptography is essential for securing communication in the digital world. This project aims to educate users on cryptographic concepts through an interactive tool that allows experimentation with various cryptographic algorithms and techniques. It is particularly valuable for students and professionals in the field of cybersecurity.

## Features

- **Algorithm Implementation**: Implementation of various cryptographic algorithms like RSA, AES, DES, and SHA using mbedTLS/OpenSSL.
- **Interactive Encryption/Decryption**: Input text or data, select an encryption method, view the encrypted result, and decrypt it back to the original text or data.
- **Key Generation and Management**: Simulation of cryptographic key generation, exchange, and management.
- **User-Friendly Interface**: Command line or UI-based interface for user interaction.
- **Educational Content**: Interactive tutorials and educational content on fundamental security concepts like public/private keys, symmetric/asymmetric encryption, key derivation function, digital signatures, and hash functions.
- **User Interaction**: Experiment with different algorithms, key sizes, and encryption parameters.

## Technologies Used

- **Frontend**: Vite, React
- **Backend**: C, mbedTLS/OpenSSL

## Getting Started

### Prerequisites

- Node.js and npm (for running the frontend)
- A C compiler (e.g., GCC)
- OpenSSL library

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/cryptography-simulation.git
   cd cryptography-simulation
   ```

2. **Install frontend dependencies:**

   ```bash
   cd frontend
   npm install
   ```

3. **Build the backend:**

   ```bash
   cd ../backend
   make
   ```

### Running the Application

1. **Start the backend server:**

   ```bash
   ./backend/server
   ```

2. **Start the frontend development server:**

   ```bash
   cd frontend
   npm run dev
   ```

3. **Open the application in your browser:**

   Navigate to `http://localhost:3000` to view and interact with the application.

## Usage

- **Select an Algorithm**: Choose a cryptographic algorithm from the available options.
- **Input Data**: Enter the text or data you want to encrypt or decrypt.
- **Generate Keys**: Generate cryptographic keys if required by the chosen algorithm.
- **Encrypt/Decrypt**: Perform encryption or decryption and view the results.
- **Explore Concepts**: Access tutorials and educational content to learn more about cryptographic principles and techniques.

## Contributing

Contributions are welcome! Please read the [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute to this project.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [mbedTLS](https://github.com/ARMmbed/mbedtls)
- [OpenSSL](https://www.openssl.org/)
- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)

---

For any questions or feedback, please feel free to open an issue or contact the project maintainers.

---

Happy coding and learning about cryptography!
