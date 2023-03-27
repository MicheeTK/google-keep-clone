const CryptoJS = require("crypto-js");

function sha256(message) {
  const hash = CryptoJS.SHA256(message);
  return hash.toString(CryptoJS.enc.Hex);
}

const uuidCryptoJS = sha256("what's up?");
console.log(uuidCryptoJS);
