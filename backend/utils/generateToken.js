function generateToken(size = 8) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < size; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

module.exports = generateToken;
