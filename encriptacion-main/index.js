#!/usr/bin/env node
const bcrypt = require('bcrypt');      // ← CommonJS

const [, , password] = process.argv;

if (!password) {
  console.error('Uso: node index.js <contraseña>');
  process.exit(1);
}

bcrypt.hash(password, 10)
  .then(hash => console.log('🔑 Hash:\n', hash))
  .catch(err  => console.error('❌ Error:', err));
