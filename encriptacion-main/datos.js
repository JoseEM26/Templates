#!/usr/bin/env node
/**
 * generaHashes.js
 * ----------------------------------------------------------------
 * Crea un arreglo con { email, passwordPlano, passwordHash }
 * y lo muestra en consola en formato JSON.
 * ----------------------------------------------------------------
 * 1) npm i bcrypt
 * 2) node generaHashes     # imprime el array
 *    └─ Usa saltRounds = 10     (puedes subirlo a 12-14 en prod)
 */

const bcrypt = require('bcrypt');

// ⇢ 1.  Credenciales (texto plano) ───────────
const usuarios = [
  { email: 'walter.salcedo@entel-b2b.com',  password: 'WalterSalcedoMobilenetBruCorp815!' },
  { email: 'sandra.diaz@entel-b2b.com',     password: 'SandraDiazMobilenetBruCorp462@'   },
  { email: 'jaqueline.paredes@entel-b2b.com', password: 'JaquelineParedesMobilenetBruCorp729$' },
  { email: 'jaime.zuniga@entel-b2b.com',    password: 'JaimeZunigaMobilenetBruCorp384%'  },
  { email: 'gary.bonilla@entel-b2b.com',    password: 'GaryBonillaMobilenetBruCorp957&'  },
  { email: 'dante.ramos@entel-b2b.com',     password: 'DanteRamosMobilenetBruCorp618*'   },
];

// ⇢ 2.  Hash + salida ─────────────────────────
(async () => {
  const saltRounds = 10;

  const resultados = [];
  for (const { email, password } of usuarios) {
    const hash = await bcrypt.hash(password, saltRounds);
    resultados.push({ email, password, passwordHash: hash });
  }

  // Muestra todo formateado
  console.log(JSON.stringify(resultados, null, 2));
})();
