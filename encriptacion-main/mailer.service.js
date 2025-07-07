// services/mailer.service.js
require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true, // SSL (puerto 465)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false, // solo si usas certificado autofirmado
  },
});

/**
 * Envía un correo usando SMTP
 * @param {string|string[]} to      - Destinatario(s)
 * @param {string}          subject - Asunto del correo
 * @param {string}          html    - Cuerpo HTML
 */
async function enviarCorreo(to, subject, html) {
  try {
    const info = await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
      to,
      subject,
      html,
    });

    console.log('✅ Correo enviado. ID:', info.messageId);
  } catch (err) {
    console.error('❌ Error al enviar correo:', err.message);
    throw err;
  }
}

module.exports = { enviarCorreo };
