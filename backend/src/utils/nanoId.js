import { customAlphabet } from "nanoid";
import crypto from "crypto";
const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 8);
const id = nanoid();

console.log(id);

// Generate key pair
const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: "spki",
    format: "pem",
  },
  privateKeyEncoding: {
    type: "pkcs8",
    format: "pem",
  },
});

console.log("Public Key:");
console.log(publicKey);

console.log("Private Key:");
console.log(privateKey);
