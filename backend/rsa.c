#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <openssl/rsa.h>
#include <openssl/pem.h>
#include <openssl/err.h>

#define KEY_LENGTH 2048
#define PUBLIC_EXPONENT 65537
#define PADDING RSA_PKCS1_OAEP_PADDING

void handleErrors() {
    ERR_print_errors_fp(stderr);
    abort();
}

RSA* generate_keypair() {
    RSA *rsa = RSA_new();
    BIGNUM *e = BN_new();

    if (!BN_set_word(e, PUBLIC_EXPONENT)) {
        handleErrors();
    }

    if (!RSA_generate_key_ex(rsa, KEY_LENGTH, e, NULL)) {
        handleErrors();
    }

    BN_free(e);
    return rsa;
}

char* get_key_pem(RSA *rsa, int is_public) {
    BIO *bio = BIO_new(BIO_s_mem());
    if (is_public) {
        if (!PEM_write_bio_RSA_PUBKEY(bio, rsa)) {
            handleErrors();
        }
    } else {
        if (!PEM_write_bio_RSAPrivateKey(bio, rsa, NULL, NULL, 0, NULL, NULL)) {
            handleErrors();
        }
    }
    char *key_pem;
    long key_length = BIO_get_mem_data(bio, &key_pem);
    char *key = (char *)malloc(key_length + 1);
    memcpy(key, key_pem, key_length);
    key[key_length] = '\0';
    BIO_free(bio);
    return key;
}

int main(int argc, char *argv[]) {
    if (argc != 3) {
        fprintf(stderr, "Usage: %s <encrypt> <message>\n", argv[0]);
        exit(EXIT_FAILURE);
    }

    const char *mode = argv[1];
    const char *message = argv[2];

    OpenSSL_add_all_algorithms();
    ERR_load_BIO_strings();
    ERR_load_crypto_strings();

    if (strcmp(mode, "encrypt") == 0) {
        // Generate RSA key pair
        RSA *rsa = generate_keypair();

        // Get PEM formatted keys
        char *public_key_pem = get_key_pem(rsa, 1);
        char *private_key_pem = get_key_pem(rsa, 0);

        // Encrypt the message
        unsigned char encrypted[KEY_LENGTH/8];
        int encrypted_length = RSA_public_encrypt(strlen(message), (unsigned char*)message, encrypted, rsa, PADDING);
        if (encrypted_length == -1) {
            handleErrors();
        }

        // Print the encrypted message as a hex string
        for (int i = 0; i < encrypted_length; i++) {
            printf("%02x", encrypted[i]);
        }
        printf("\n");

        // Print the public and private keys
        printf("%s\n", public_key_pem);
        printf("%s\n", private_key_pem);

        free(public_key_pem);
        free(private_key_pem);
        RSA_free(rsa);
    } else {
        fprintf(stderr, "Invalid mode: %s. Use 'encrypt'.\n", mode);
        exit(EXIT_FAILURE);
    }

    return 0;
}
