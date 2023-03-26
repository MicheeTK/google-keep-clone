// const CryptoJS = require("crypto-js");

// function sha256(message) {
//   const hash = CryptoJS.SHA256(message);
//   return hash.toString(CryptoJS.enc.Hex);
// }

// const hash = sha256("1");
// console.log(hash);

export default function generateUUID() {
  let d = new Date().getTime();
  if (typeof performance !== "undefined" && typeof performance.now === "function") {
    d += performance.now(); // use high-precision timer if available
  }
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}

const uuid = generateUUID();
console.log(uuid); // Output: a7b49f20-3f3d-46f1-bc9e-030d7b8c2b3e
