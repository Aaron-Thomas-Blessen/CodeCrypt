#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <openssl/conf.h>
#include <openssl/evp.h>
#include <openssl/err.h>
#include <openssl/aes.h>
#include <openssl/rand.h> // Include this header for RAND_bytes

// Error handling function
void handleErrors(void) {
    ERR_print_errors_fp(stderr);
    abort();
}

// Function to print array in hexadecimal format
void printHex(const char *title, const unsigned char *s, int len) {
    printf("%s: ", title);
    for (int i = 0; i < len; i++) {
        printf("%02x", s[i]);
    }
    printf("\n");
}

// Function to encrypt data
int encrypt(unsigned char *plaintext, int plaintext_len, unsigned char *key,
            unsigned char *iv, unsigned char *ciphertext) {
    EVP_CIPHER_CTX *ctx;
    int len;
    int ciphertext_len;

    // Create and initialize the context
    if (!(ctx = EVP_CIPHER_CTX_new())) handleErrors();

    // Initialize the encryption operation.
    if (1 != EVP_EncryptInit_ex(ctx, EVP_aes_256_cbc(), NULL, key, iv))
        handleErrors();

    // Provide the message to be encrypted, and obtain the encrypted output.
    if (1 != EVP_EncryptUpdate(ctx, ciphertext, &len, plaintext, plaintext_len))
        handleErrors();
    ciphertext_len = len;

    // Finalize the encryption.
    if (1 != EVP_EncryptFinal_ex(ctx, ciphertext + len, &len)) handleErrors();
    ciphertext_len += len;

    // Clean up
    EVP_CIPHER_CTX_free(ctx);

    return ciphertext_len;
}

// Function to decrypt data
int decrypt(unsigned char *ciphertext, int ciphertext_len, unsigned char *key,
            unsigned char *iv, unsigned char *plaintext) {
    EVP_CIPHER_CTX *ctx;
    int len;
    int plaintext_len;

    // Create and initialize the context
    if (!(ctx = EVP_CIPHER_CTX_new())) handleErrors();

    // Initialize the decryption operation.
    if (1 != EVP_DecryptInit_ex(ctx, EVP_aes_256_cbc(), NULL, key, iv))
        handleErrors();

    // Provide the message to be decrypted, and obtain the plaintext output.
    if (1 != EVP_DecryptUpdate(ctx, plaintext, &len, ciphertext, ciphertext_len))
        handleErrors();
    plaintext_len = len;

    // Finalize the decryption.
    if (1 != EVP_DecryptFinal_ex(ctx, plaintext + len, &len)) handleErrors();
    plaintext_len += len;

    // Clean up
    EVP_CIPHER_CTX_free(ctx);

    return plaintext_len;
}

int main(void) {
    // Hardcoded key and IV (in a real application, use a secure key exchange)
    unsigned char key[32];
    unsigned char iv[16];

    // Generate random key and IV
    if (!RAND_bytes(key, sizeof(key)) || !RAND_bytes(iv, sizeof(iv))) {
        fprintf(stderr, "Error generating random key or IV\n");
        return 1;
    }

    // Buffer for plaintext input
    char plaintext[128];
    
    // Prompt the user for input
    printf("Enter text to encrypt: ");
    if (fgets(plaintext, sizeof(plaintext), stdin) == NULL) {
        fprintf(stderr, "Error reading input\n");
        return 1;
    }
    
    // Remove newline character if present
    size_t len = strlen(plaintext);
    if (plaintext[len - 1] == '\n') {
        plaintext[len - 1] = '\0';
    }

    // Buffer for ciphertext. Ensure the buffer is long enough for the ciphertext
    unsigned char ciphertext[128];

    // Buffer for the decrypted text
    unsigned char decryptedtext[128];

    int decryptedtext_len, ciphertext_len;

    // Print input array (plaintext)
    printHex("Input array (plaintext)", (unsigned char *)plaintext, strlen((char *)plaintext));
    
    // Print key array
    printHex("Key array", key, sizeof(key));

    // Encrypt the plaintext
    ciphertext_len = encrypt((unsigned char *)plaintext, strlen((char *)plaintext), key, iv, ciphertext);

    // Print state array after encryption (ciphertext)
    printHex("State array (ciphertext)", ciphertext, ciphertext_len);

    // Add a NULL terminator to the ciphertext for display purposes
    ciphertext[ciphertext_len] = '\0';

    printf("Ciphertext (hex format):\n");
    BIO_dump_fp(stdout, (const char *)ciphertext, ciphertext_len);

    // Decrypt the ciphertext
    decryptedtext_len = decrypt(ciphertext, ciphertext_len, key, iv, decryptedtext);

    // Add a NULL terminator to the decrypted text for display purposes
    decryptedtext[decryptedtext_len] = '\0';

    printf("Decrypted text is:\n");
    printf("%s\n", decryptedtext);

    return 0;
}
