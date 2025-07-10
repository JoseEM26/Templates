// usecases/reset-password.usecase.js
const { generatePassword, hashPassword } = require('../services/password.service');
const { enviarCorreo } = require('../services/mailer.service');

/**
 * Resetea la clave de un usuario y devuelve la contraseña en texto plano
 * @param {Object} user (documento Mongoose)
 * @returns {string} nueva contraseña
 */
async function resetPasswordForUser(user) {
  const newPassword = generatePassword(user.username);
  const hashed      = hashPassword(newPassword);

  user.password = hashed;
  user.passwordChangedAt = new Date();
  await user.save();

  /* ───── HTML con branding Entel Empresas ───── */
  const html = `
    <div style="font-family: Arial, sans-serif; color:#4D4D4D; line-height:1.5;">
        <div style="text-align:center; margin-bottom:24px;">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH0XHb2am0VZCN0YNPDH9FyPpbiGk0c8yyrA&s"
            alt="Entel Empresas" style="max-width:180px;"/>
        </div>

        <p style="background-color:#FFF3CD; border-left:5px solid #E75A24; padding:10px 15px; font-size:14px;">
        ⚠️ Esta medida forma parte de un refuerzo preventivo. Registramos la actividad por dirección IP
        en cada sesión, lo que permite identificar accesos indebidos. Evite inconvenientes siguiendo las
        políticas de uso personal de credenciales.
        </p>

        <h2 style="color:#005CB9;">Estimado(a) ${user.fullName},</h2>

        <p>
        Como parte de nuestro compromiso con la <strong>seguridad de la información</strong> y en
        cumplimiento de las políticas internas de Entel&nbsp;Empresas, hemos actualizado los
        mecanismos de autenticación de nuestros sistemas.
        </p>

        <p style="margin:16px 0; font-size:15px;">
        Su nueva clave de acceso personal es:
        </p>

        <div style="background:#F2F7FF; border-left:6px solid #005CB9; padding:12px 16px; font-size:18px; font-weight:bold;">
        🔐 ${newPassword}
        </div>

        <ul style="margin-top:20px;">
        <li>No podrá ser modificada por el usuario sin autorización.</li>
        <li>Está prohibida su divulgación o compartición bajo cualquier circunstancia.</li>
        <li>Su uso es exclusivo y personal conforme a las disposiciones internas de la organización.</li>
        </ul>

        <p>
        Esta medida se alinea a las buenas prácticas establecidas en
        <strong>ISO/IEC&nbsp;27001</strong> y <strong>ISO/IEC&nbsp;27701</strong>,
        reforzando la gobernanza digital y la protección de datos.
        </p>

        <p style="color:#E75A24; font-weight:bold;">
        Compartir credenciales constituye una falta grave y puede acarrear sanciones.
        </p>

        <br/>
        <p style="font-size:14px;">
        Para cualquier duda o incidente relacionado al acceso, puede contactar directamente al área de Tecnología de la Información o visitar<br/>
        👉 <a href="https://consultasmobilenet.es" target="_blank">https://consultasmobilenet.es</a>
        </p>
    </div>
    `;


  // Enviar correo
  await enviarCorreo(
    user.email,
    '🔐 Nueva contraseña asignada - Entel Empresas',
    html
  );

  return newPassword;
}

module.exports = { resetPasswordForUser };
