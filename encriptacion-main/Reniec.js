#!/usr/bin/env node
/**
 * Laboratorio – Votación electrónica simulada
 * • Autentica 6 votantes de un padrón ficticio
 * • Elige aleatoriamente uno de 3 candidatos
 * • Cifra el voto con AES-256-GCM
 * • Imprime comprobante (hash SHA-256 + QR base64)
 * • Registra logs firmados (HMAC-SHA-256)
 */

const crypto = require('crypto');
const qrcode = require('qrcode');        // npm i qrcode
const bcrypt = require('bcrypt');        // npm i bcrypt

/* ╔══ 1.  Padrón simulado ──────────────────────────────────────────────── */
const padron = [
  { dni: '12345678', pin: '1234', nombre: 'María Quispe', distrito: 'CUSCO 01' },
  { dni: '87654321', pin: '5678', nombre: 'José Huamán', distrito: 'PIURA 05' },
  { dni: '11223344', pin: '9012', nombre: 'Ana Torres',  distrito: 'LIMA 03'  },
  { dni: '44332211', pin: '3456', nombre: 'Luis Ramos',  distrito: 'AREQUIPA 02' },
  { dni: '55667788', pin: '7890', nombre: 'Carla Díaz',  distrito: 'PUNO 04' },
  { dni: '88776655', pin: '2468', nombre: 'Marco León',  distrito: 'LAMAS 06' }
];

/* ║══ 2.  Config AES & HMAC (se guardarían en módulo HSM/TPM) ─────────── */
const AES_KEY = crypto.randomBytes(32);            // 256-bit
const HMAC_KEY = crypto.randomBytes(32);

/* ║══ 3.  Candidatos disponibles ───────────────────────────────────────── */
const candidatos = ['A-Progreso', 'B-Unidad', 'C-Futuro'];

/* ║══ 4.  Funciones auxiliares ─────────────────────────────────────────── */
const cifrarVoto = (voto) => {
  const iv = crypto.randomBytes(12);               // GCM nonce
  const cipher = crypto.createCipheriv('aes-256-gcm', AES_KEY, iv);
  const cifrado = Buffer.concat([cipher.update(voto, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return { iv, cifrado, tag };
};

const firmarLog = (mensaje) =>
  crypto.createHmac('sha256', HMAC_KEY).update(mensaje).digest('hex');

/* ╚══ 5.  Simulación completa ──────────────────────────────────────────── */
(async () => {
  console.log('⏳  Iniciando simulación de voto electrónico...\n');

  for (const ciudadano of padron) {
    /* 5.1 Autenticación */
    const pinHash = await bcrypt.hash(ciudadano.pin, 10);    // guardado en BD
    const coincide = await bcrypt.compare(ciudadano.pin, pinHash); // demo always true
    if (!coincide) throw new Error('PIN incorrecto');        // no ocurrirá aquí

    /* 5.2 Registro de voto */
    const eleccion = candidatos[Math.floor(Math.random() * candidatos.length)];
    const { iv, cifrado, tag } = cifrarVoto(eleccion);

    /* 5.3 Hash para comprobante (no incluye voto -> anonimato) */
    const comprobanteHash = crypto
      .createHash('sha256')
      .update(ciudadano.dni + iv.toString('hex') + tag.toString('hex'))
      .digest('hex');

    /* 5.4 QR del comprobante (se imprimiría) */
    const qr = await qrcode.toDataURL(comprobanteHash);

    /* 5.5 Log firmado inmutable */
    const logLine = `${Date.now()}|${ciudadano.dni}|${iv.toString('hex')}`;
    const firma = firmarLog(logLine);

    /* 5.6 “Almacenar” (aquí solo mostramos en consola) */
    console.log(`✅  ${ciudadano.nombre} (${ciudadano.distrito}) votó → [CIFRADO]`);
    console.log('    Comprobante SHA-256:', comprobanteHash.slice(0, 16), '...');
    console.log('    QR base64 (recortado):', qr.slice(0, 30), '...');
    console.log('    Log firmado:', firma.slice(0, 16), '...\n');
  }

  console.log('🚀  Simulación terminada. Todos los votos cifrados y auditados.');
})();
