#include <openssl/evp.h>
#include <openssl/pem.h>
#include <openssl/dsa.h>
#include <openssl/err.h>
#include <string.h>
#include <stdio.h>
#include <stdlib.h>

void handleErrors(void) {
    ERR_print_errors_fp(stderr);
    abort();
}

void generate_dsa_keys() {
    DSA *dsa = DSA_new();
    DSA_generate_parameters_ex(dsa, 1024, NULL, 0, NULL, NULL, NULL);
    DSA_generate_key(dsa);

    FILE *private_fp = fopen("private_key.pem", "w");
    PEM_write_DSAPrivateKey(private_fp, dsa, NULL, NULL, 0, NULL, NULL);
    fclose(private_fp);

    FILE *public_fp = fopen("public_key.pem", "w");
    PEM_write_DSA_PUBKEY(public_fp, dsa);
    fclose(public_fp);

    DSA_free(dsa);
}

void dsa_sign(const char *msg) {
    FILE *private_fp = fopen("private_key.pem", "r");
    if (!private_fp) {
        generate_dsa_keys();
        private_fp = fopen("private_key.pem", "r");
    }
    DSA *dsa = PEM_read_DSAPrivateKey(private_fp, NULL, NULL, NULL);
    fclose(private_fp);

    unsigned char *sig = malloc(DSA_size(dsa));
    unsigned int sig_len;

    DSA_sign(0, (unsigned char *)msg, strlen(msg), sig, &sig_len, dsa);

    printf("%s\n", sig);

    DSA_free(dsa);
    free(sig);
}

void dsa_verify(const char *msg, const char *sig) {
    FILE *public_fp = fopen("public_key.pem", "r");
    if (!public_fp) {
        generate_dsa_keys();
        public_fp = fopen("public_key.pem", "r");
    }
    DSA *dsa = PEM_read_DSA_PUBKEY(public_fp, NULL, NULL, NULL);
    fclose(public_fp);

    int ret = DSA_verify(0, (unsigned char *)msg, strlen(msg), (unsigned char *)sig, strlen(sig), dsa);

    printf("%s\n", ret == 1 ? "Verified" : "Failed");

    DSA_free(dsa);
}

int main(int argc, char *argv[]) {
    if (argc < 2) {
        fprintf(stderr, "Usage: %s [generate|sign|verify] [message|signature]\n", argv[0]);
        return 1;
    }

    if (strcmp(argv[1], "generate") == 0) {
        generate_dsa_keys();
    } else if (strcmp(argv[1], "sign") == 0 && argc == 3) {
        dsa_sign(argv[2]);
    } else if (strcmp(argv[1], "verify") == 0 && argc == 4) {
        dsa_verify(argv[2], argv[3]);
    } else {
        fprintf(stderr, "Invalid command or parameters.\n");
        return 1;
    }

    return 0;
}
