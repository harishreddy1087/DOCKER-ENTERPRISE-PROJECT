// server.js
const os = require('os');

console.log("--- Security Check ---");
console.log("Current User UID:", process.getuid());
console.log("Current Username:", os.userInfo().username);

if (process.getuid() === 0) {
    console.log("WARNING: Running as ROOT! (Unsafe)");
} else {
    console.log("SUCCESS: Running as a non-privileged user. (Secure)");
}