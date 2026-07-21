import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { to, tipo, datos } = await req.json();

  const plantillas: { [key: string]: { subject: string; html: string } } = {

    // ─── CUENTA ───────────────────────────────────────────────
    bienvenida: {
      subject: `¡Bienvenido a Trip Planner, ${datos.nombre}!`,
      html: `
        <div style="font-family:Montserrat,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#0D0C56;padding:24px;text-align:center;">
            <h1 style="color:#fff;font-size:24px;margin:0;">Trip Planner</h1>
          </div>
          <div style="padding:32px;background:#f5f7ff;">
            <h2 style="color:#0D0C56;">¡Bienvenido, ${datos.nombre}! 🌍</h2>
            <p style="color:#555;">Tu cuenta ha sido creada exitosamente. Ya puedes empezar a planear tu próximo viaje.</p>
            <a href="https://tripplanner.com.mx/destinos" style="display:block;background:#1667E6;color:#fff;text-align:center;padding:14px;border-radius:10px;text-decoration:none;font-weight:800;margin-top:20px;">Armar mi viaje</a>
          </div>
          <div style="background:#0D0C56;padding:16px;text-align:center;">
            <p style="color:rgba(255,255,255,0.4);font-size:11px;margin:0;">© 2026 Trip Planner · no-reply@tripplanner.com.mx</p>
          </div>
        </div>`
    },

    recuperar_password: {
      subject: `Recupera tu contraseña · Trip Planner`,
      html: `
        <div style="font-family:Montserrat,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#0D0C56;padding:24px;text-align:center;">
            <h1 style="color:#fff;font-size:24px;margin:0;">Trip Planner</h1>
          </div>
          <div style="padding:32px;background:#f5f7ff;">
            <h2 style="color:#0D0C56;">Recupera tu contraseña 🔐</h2>
            <p style="color:#555;">Hola <strong>${datos.nombre}</strong>, recibimos una solicitud para restablecer tu contraseña.</p>
            <a href="${datos.link}" style="display:block;background:#1667E6;color:#fff;text-align:center;padding:14px;border-radius:10px;text-decoration:none;font-weight:800;margin:20px 0;">Restablecer contraseña</a>
            <p style="color:#aaa;font-size:11px;">Este link expira en 60 minutos. Si no solicitaste esto, ignora este correo.</p>
          </div>
          <div style="background:#0D0C56;padding:16px;text-align:center;">
            <p style="color:rgba(255,255,255,0.4);font-size:11px;margin:0;">© 2026 Trip Planner · no-reply@tripplanner.com.mx</p>
          </div>
        </div>`
    },

    password_cambiado: {
      subject: `Tu contraseña fue actualizada · Trip Planner`,
      html: `
        <div style="font-family:Montserrat,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#0D0C56;padding:24px;text-align:center;">
            <h1 style="color:#fff;font-size:24px;margin:0;">Trip Planner</h1>
          </div>
          <div style="padding:32px;background:#f5f7ff;">
            <h2 style="color:#0D0C56;">Contraseña actualizada ✓</h2>
            <p style="color:#555;">Hola <strong>${datos.nombre}</strong>, tu contraseña fue cambiada exitosamente el ${datos.fecha}.</p>
            <p style="color:#555;">Si no realizaste este cambio, contáctanos de inmediato.</p>
            <a href="https://tripplanner.com.mx/soporte" style="display:block;background:#FF5C00;color:#fff;text-align:center;padding:14px;border-radius:10px;text-decoration:none;font-weight:800;margin-top:20px;">Contactar soporte</a>
          </div>
          <div style="background:#0D0C56;padding:16px;text-align:center;">
            <p style="color:rgba(255,255,255,0.4);font-size:11px;margin:0;">© 2026 Trip Planner · no-reply@tripplanner.com.mx</p>
          </div>
        </div>`
    },

    correo_actualizado: {
      subject: `Tu correo fue actualizado · Trip Planner`,
      html: `
        <div style="font-family:Montserrat,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#0D0C56;padding:24px;text-align:center;">
            <h1 style="color:#fff;font-size:24px;margin:0;">Trip Planner</h1>
          </div>
          <div style="padding:32px;background:#f5f7ff;">
            <h2 style="color:#0D0C56;">Correo actualizado ✓</h2>
            <p style="color:#555;">Hola <strong>${datos.nombre}</strong>, tu correo electrónico fue actualizado a <strong>${datos.nuevo_correo}</strong>.</p>
            <p style="color:#555;">Si no realizaste este cambio, contáctanos de inmediato.</p>
            <a href="https://tripplanner.com.mx/soporte" style="display:block;background:#FF5C00;color:#fff;text-align:center;padding:14px;border-radius:10px;text-decoration:none;font-weight:800;margin-top:20px;">Contactar soporte</a>
          </div>
          <div style="background:#0D0C56;padding:16px;text-align:center;">
            <p style="color:rgba(255,255,255,0.4);font-size:11px;margin:0;">© 2026 Trip Planner · no-reply@tripplanner.com.mx</p>
          </div>
        </div>`
    },

    // ─── RESERVAS ─────────────────────────────────────────────
    confirmacion: {
      subject: `✈ Reserva confirmada · ${datos.codigo}`,
      html: `
        <div style="font-family:Montserrat,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#0D0C56;padding:24px;text-align:center;">
            <h1 style="color:#fff;font-size:24px;margin:0;">Trip Planner</h1>
          </div>
          <div style="padding:32px;background:#f5f7ff;">
            <h2 style="color:#0D0C56;">¡Tu reserva está confirmada! 🎉</h2>
            <p style="color:#555;">Hola <strong>${datos.nombre}</strong>, tu reserva ha sido confirmada exitosamente.</p>
            <div style="background:#fff;border-radius:13px;padding:20px;margin:20px 0;">
              <p style="margin:0 0 8px;color:#888;font-size:12px;">NÚMERO DE RESERVA</p>
              <p style="margin:0;font-size:20px;font-weight:800;color:#1667E6;">${datos.codigo}</p>
            </div>
            <div style="background:#fff;border-radius:13px;padding:20px;margin:20px 0;">
              <p style="margin:4px 0;color:#555;"><strong>Destinos:</strong> ${datos.destinos}</p>
              <p style="margin:4px 0;color:#555;"><strong>Fechas:</strong> ${datos.fechas}</p>
              <p style="margin:4px 0;color:#555;"><strong>Total:</strong> ${datos.total}</p>
            </div>
            <a href="https://tripplanner.com.mx/mis-viajes" style="display:block;background:#FF5C00;color:#fff;text-align:center;padding:14px;border-radius:10px;text-decoration:none;font-weight:800;">Ver mi reserva</a>
          </div>
          <div style="background:#0D0C56;padding:16px;text-align:center;">
            <p style="color:rgba(255,255,255,0.4);font-size:11px;margin:0;">© 2026 Trip Planner · no-reply@tripplanner.com.mx</p>
          </div>
        </div>`
    },

    cancelacion: {
      subject: `Reserva cancelada · ${datos.codigo}`,
      html: `
        <div style="font-family:Montserrat,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#0D0C56;padding:24px;text-align:center;">
            <h1 style="color:#fff;font-size:24px;margin:0;">Trip Planner</h1>
          </div>
          <div style="padding:32px;background:#f5f7ff;">
            <h2 style="color:#0D0C56;">Reserva cancelada</h2>
            <p style="color:#555;">Hola <strong>${datos.nombre}</strong>, tu reserva <strong>${datos.codigo}</strong> ha sido cancelada.</p>
            <div style="background:#fff;border-radius:13px;padding:20px;margin:20px 0;">
              <p style="margin:4px 0;color:#555;"><strong>Destinos:</strong> ${datos.destinos}</p>
              <p style="margin:4px 0;color:#555;"><strong>Motivo:</strong> ${datos.motivo || "Cancelación solicitada por el usuario"}</p>
              <p style="margin:4px 0;color:#555;"><strong>Reembolso:</strong> ${datos.reembolso || "En proceso (3-5 días hábiles)"}</p>
            </div>
            <a href="https://tripplanner.com.mx/soporte" style="display:block;background:#1667E6;color:#fff;text-align:center;padding:14px;border-radius:10px;text-decoration:none;font-weight:800;">Contactar soporte</a>
          </div>
          <div style="background:#0D0C56;padding:16px;text-align:center;">
            <p style="color:rgba(255,255,255,0.4);font-size:11px;margin:0;">© 2026 Trip Planner · no-reply@tripplanner.com.mx</p>
          </div>
        </div>`
    },

    cambio_reserva: {
      subject: `Cambio en tu reserva · ${datos.codigo}`,
      html: `
        <div style="font-family:Montserrat,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#0D0C56;padding:24px;text-align:center;">
            <h1 style="color:#fff;font-size:24px;margin:0;">Trip Planner</h1>
          </div>
          <div style="padding:32px;background:#f5f7ff;">
            <h2 style="color:#0D0C56;">Tu reserva fue modificada</h2>
            <p style="color:#555;">Hola <strong>${datos.nombre}</strong>, se realizaron cambios en tu reserva <strong>${datos.codigo}</strong>.</p>
            <div style="background:#fff;border-radius:13px;padding:20px;margin:20px 0;">
              <p style="margin:4px 0;color:#555;"><strong>Cambio:</strong> ${datos.cambio}</p>
              <p style="margin:4px 0;color:#555;"><strong>Fecha del cambio:</strong> ${datos.fecha}</p>
            </div>
            <a href="https://tripplanner.com.mx/mis-viajes" style="display:block;background:#1667E6;color:#fff;text-align:center;padding:14px;border-radius:10px;text-decoration:none;font-weight:800;">Ver mi reserva</a>
          </div>
          <div style="background:#0D0C56;padding:16px;text-align:center;">
            <p style="color:rgba(255,255,255,0.4);font-size:11px;margin:0;">© 2026 Trip Planner · no-reply@tripplanner.com.mx</p>
          </div>
        </div>`
    },

    recordatorio_7dias: {
      subject: `¡Tu viaje a ${datos.destinos} es en 7 días! ✈`,
      html: `
        <div style="font-family:Montserrat,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#0D0C56;padding:24px;text-align:center;">
            <h1 style="color:#fff;font-size:24px;margin:0;">Trip Planner</h1>
          </div>
          <div style="padding:32px;background:#f5f7ff;">
            <h2 style="color:#0D0C56;">¡Faltan 7 días para tu viaje! 🗓</h2>
            <p style="color:#555;">Hola <strong>${datos.nombre}</strong>, tu viaje a <strong>${datos.destinos}</strong> está a la vuelta de la esquina.</p>
            <div style="background:#fff;border-radius:13px;padding:20px;margin:20px 0;">
              <p style="margin:4px 0;color:#555;"><strong>Destinos:</strong> ${datos.destinos}</p>
              <p style="margin:4px 0;color:#555;"><strong>Fecha de salida:</strong> ${datos.fecha_salida}</p>
              <p style="margin:4px 0;color:#555;"><strong>Reserva:</strong> ${datos.codigo}</p>
            </div>
            <a href="https://tripplanner.com.mx/mis-viajes" style="display:block;background:#FF5C00;color:#fff;text-align:center;padding:14px;border-radius:10px;text-decoration:none;font-weight:800;">Ver mi itinerario</a>
          </div>
          <div style="background:#0D0C56;padding:16px;text-align:center;">
            <p style="color:rgba(255,255,255,0.4);font-size:11px;margin:0;">© 2026 Trip Planner · no-reply@tripplanner.com.mx</p>
          </div>
        </div>`
    },

    recordatorio_24hrs: {
      subject: `¡Tu vuelo sale mañana! · ${datos.codigo}`,
      html: `
        <div style="font-family:Montserrat,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#0D0C56;padding:24px;text-align:center;">
            <h1 style="color:#fff;font-size:24px;margin:0;">Trip Planner</h1>
          </div>
          <div style="padding:32px;background:#f5f7ff;">
            <h2 style="color:#0D0C56;">¡Tu vuelo sale mañana! ✈</h2>
            <p style="color:#555;">Hola <strong>${datos.nombre}</strong>, recuerda que mañana comienza tu aventura.</p>
            <div style="background:#fff;border-radius:13px;padding:20px;margin:20px 0;">
              <p style="margin:4px 0;color:#555;"><strong>Vuelo:</strong> ${datos.vuelo}</p>
              <p style="margin:4px 0;color:#555;"><strong>Hora de salida:</strong> ${datos.hora_salida}</p>
              <p style="margin:4px 0;color:#555;"><strong>Aeropuerto:</strong> ${datos.aeropuerto}</p>
            </div>
            <a href="https://tripplanner.com.mx/mis-viajes/documentos" style="display:block;background:#1667E6;color:#fff;text-align:center;padding:14px;border-radius:10px;text-decoration:none;font-weight:800;">Ver mis documentos</a>
          </div>
          <div style="background:#0D0C56;padding:16px;text-align:center;">
            <p style="color:rgba(255,255,255,0.4);font-size:11px;margin:0;">© 2026 Trip Planner · no-reply@tripplanner.com.mx</p>
          </div>
        </div>`
    },

    // ─── VUELOS ───────────────────────────────────────────────
    checkin_disponible: {
      subject: `Check-in disponible para tu vuelo · ${datos.vuelo}`,
      html: `
        <div style="font-family:Montserrat,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#0D0C56;padding:24px;text-align:center;">
            <h1 style="color:#fff;font-size:24px;margin:0;">Trip Planner</h1>
          </div>
          <div style="padding:32px;background:#f5f7ff;">
            <h2 style="color:#0D0C56;">¡El check-in está disponible! 🎫</h2>
            <p style="color:#555;">Hola <strong>${datos.nombre}</strong>, ya puedes hacer tu check-in en línea para tu vuelo.</p>
            <div style="background:#fff;border-radius:13px;padding:20px;margin:20px 0;">
              <p style="margin:4px 0;color:#555;"><strong>Vuelo:</strong> ${datos.vuelo}</p>
              <p style="margin:4px 0;color:#555;"><strong>Ruta:</strong> ${datos.ruta}</p>
              <p style="margin:4px 0;color:#555;"><strong>Fecha:</strong> ${datos.fecha}</p>
              <p style="margin:4px 0;color:#555;"><strong>Aerolínea:</strong> ${datos.aerolinea}</p>
            </div>
            <a href="${datos.link_checkin}" style="display:block;background:#FF5C00;color:#fff;text-align:center;padding:14px;border-radius:10px;text-decoration:none;font-weight:800;">Hacer check-in</a>
          </div>
          <div style="background:#0D0C56;padding:16px;text-align:center;">
            <p style="color:rgba(255,255,255,0.4);font-size:11px;margin:0;">© 2026 Trip Planner · no-reply@tripplanner.com.mx</p>
          </div>
        </div>`
    },

    boletos_vuelo: {
      subject: `Tus boletos de vuelo · ${datos.codigo}`,
      html: `
        <div style="font-family:Montserrat,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#0D0C56;padding:24px;text-align:center;">
            <h1 style="color:#fff;font-size:24px;margin:0;">Trip Planner</h1>
          </div>
          <div style="padding:32px;background:#f5f7ff;">
            <h2 style="color:#0D0C56;">Tus boletos de vuelo están listos 🎫</h2>
            <p style="color:#555;">Hola <strong>${datos.nombre}</strong>, adjunto encontrarás tus boletos de vuelo para la reserva <strong>${datos.codigo}</strong>.</p>
            <a href="https://tripplanner.com.mx/mis-viajes/documentos" style="display:block;background:#1667E6;color:#fff;text-align:center;padding:14px;border-radius:10px;text-decoration:none;font-weight:800;margin-top:20px;">Ver documentos</a>
          </div>
          <div style="background:#0D0C56;padding:16px;text-align:center;">
            <p style="color:rgba(255,255,255,0.4);font-size:11px;margin:0;">© 2026 Trip Planner · no-reply@tripplanner.com.mx</p>
          </div>
        </div>`
    },

    // ─── HOTELES ──────────────────────────────────────────────
    voucher_hotel: {
      subject: `Voucher de hotel · ${datos.hotel}`,
      html: `
        <div style="font-family:Montserrat,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#0D0C56;padding:24px;text-align:center;">
            <h1 style="color:#fff;font-size:24px;margin:0;">Trip Planner</h1>
          </div>
          <div style="padding:32px;background:#f5f7ff;">
            <h2 style="color:#0D0C56;">Tu voucher de hotel está listo 🏨</h2>
            <p style="color:#555;">Hola <strong>${datos.nombre}</strong>, aquí está tu voucher para el hotel.</p>
            <div style="background:#fff;border-radius:13px;padding:20px;margin:20px 0;">
              <p style="margin:4px 0;color:#555;"><strong>Hotel:</strong> ${datos.hotel}</p>
              <p style="margin:4px 0;color:#555;"><strong>Ciudad:</strong> ${datos.ciudad}</p>
              <p style="margin:4px 0;color:#555;"><strong>Check-in:</strong> ${datos.checkin}</p>
              <p style="margin:4px 0;color:#555;"><strong>Check-out:</strong> ${datos.checkout}</p>
              <p style="margin:4px 0;color:#555;"><strong>Habitación:</strong> ${datos.habitacion}</p>
            </div>
            <a href="https://tripplanner.com.mx/mis-viajes/documentos" style="display:block;background:#1667E6;color:#fff;text-align:center;padding:14px;border-radius:10px;text-decoration:none;font-weight:800;">Ver documentos</a>
          </div>
          <div style="background:#0D0C56;padding:16px;text-align:center;">
            <p style="color:rgba(255,255,255,0.4);font-size:11px;margin:0;">© 2026 Trip Planner · no-reply@tripplanner.com.mx</p>
          </div>
        </div>`
    },

    // ─── PAGOS ────────────────────────────────────────────────
    pago_procesado: {
      subject: `Pago procesado · ${datos.codigo}`,
      html: `
        <div style="font-family:Montserrat,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#0D0C56;padding:24px;text-align:center;">
            <h1 style="color:#fff;font-size:24px;margin:0;">Trip Planner</h1>
          </div>
          <div style="padding:32px;background:#f5f7ff;">
            <h2 style="color:#0D0C56;">Pago procesado exitosamente ✓</h2>
            <p style="color:#555;">Hola <strong>${datos.nombre}</strong>, tu pago ha sido procesado correctamente.</p>
            <div style="background:#fff;border-radius:13px;padding:20px;margin:20px 0;">
              <p style="margin:4px 0;color:#555;"><strong>Reserva:</strong> ${datos.codigo}</p>
              <p style="margin:4px 0;color:#555;"><strong>Monto:</strong> ${datos.monto}</p>
              <p style="margin:4px 0;color:#555;"><strong>Método:</strong> ${datos.metodo}</p>
              <p style="margin:4px 0;color:#555;"><strong>Fecha:</strong> ${datos.fecha}</p>
            </div>
            <a href="https://tripplanner.com.mx/mis-viajes" style="display:block;background:#FF5C00;color:#fff;text-align:center;padding:14px;border-radius:10px;text-decoration:none;font-weight:800;">Ver mi reserva</a>
          </div>
          <div style="background:#0D0C56;padding:16px;text-align:center;">
            <p style="color:rgba(255,255,255,0.4);font-size:11px;margin:0;">© 2026 Trip Planner · no-reply@tripplanner.com.mx</p>
          </div>
        </div>`
    },

    pago_fallido: {
      subject: `Problema con tu pago · Trip Planner`,
      html: `
        <div style="font-family:Montserrat,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#0D0C56;padding:24px;text-align:center;">
            <h1 style="color:#fff;font-size:24px;margin:0;">Trip Planner</h1>
          </div>
          <div style="padding:32px;background:#f5f7ff;">
            <h2 style="color:#0D0C56;">Hubo un problema con tu pago ⚠</h2>
            <p style="color:#555;">Hola <strong>${datos.nombre}</strong>, no pudimos procesar tu pago para la reserva <strong>${datos.codigo}</strong>.</p>
            <div style="background:#fff;border-radius:13px;padding:20px;margin:20px 0;">
              <p style="margin:4px 0;color:#555;"><strong>Motivo:</strong> ${datos.motivo || "Tarjeta rechazada"}</p>
            </div>
            <a href="https://tripplanner.com.mx/pago" style="display:block;background:#1667E6;color:#fff;text-align:center;padding:14px;border-radius:10px;text-decoration:none;font-weight:800;">Intentar de nuevo</a>
          </div>
          <div style="background:#0D0C56;padding:16px;text-align:center;">
            <p style="color:rgba(255,255,255,0.4);font-size:11px;margin:0;">© 2026 Trip Planner · no-reply@tripplanner.com.mx</p>
          </div>
        </div>`
    },

    reembolso: {
      subject: `Reembolso procesado · ${datos.codigo}`,
      html: `
        <div style="font-family:Montserrat,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#0D0C56;padding:24px;text-align:center;">
            <h1 style="color:#fff;font-size:24px;margin:0;">Trip Planner</h1>
          </div>
          <div style="padding:32px;background:#f5f7ff;">
            <h2 style="color:#0D0C56;">Reembolso en proceso ✓</h2>
            <p style="color:#555;">Hola <strong>${datos.nombre}</strong>, hemos iniciado el reembolso de tu reserva <strong>${datos.codigo}</strong>.</p>
            <div style="background:#fff;border-radius:13px;padding:20px;margin:20px 0;">
              <p style="margin:4px 0;color:#555;"><strong>Monto:</strong> ${datos.monto}</p>
              <p style="margin:4px 0;color:#555;"><strong>Método:</strong> ${datos.metodo}</p>
              <p style="margin:4px 0;color:#555;"><strong>Tiempo estimado:</strong> 3-5 días hábiles</p>
            </div>
          </div>
          <div style="background:#0D0C56;padding:16px;text-align:center;">
            <p style="color:rgba(255,255,255,0.4);font-size:11px;margin:0;">© 2026 Trip Planner · no-reply@tripplanner.com.mx</p>
          </div>
        </div>`
    },

    // ─── SOPORTE ──────────────────────────────────────────────
    ticket_recibido: {
      subject: `Ticket recibido · #${datos.ticket_id}`,
      html: `
        <div style="font-family:Montserrat,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#0D0C56;padding:24px;text-align:center;">
            <h1 style="color:#fff;font-size:24px;margin:0;">Trip Planner</h1>
          </div>
          <div style="padding:32px;background:#f5f7ff;">
            <h2 style="color:#0D0C56;">Recibimos tu mensaje ✓</h2>
            <p style="color:#555;">Hola <strong>${datos.nombre}</strong>, hemos recibido tu ticket de soporte.</p>
            <div style="background:#fff;border-radius:13px;padding:20px;margin:20px 0;">
              <p style="margin:4px 0;color:#555;"><strong>Ticket:</strong> #${datos.ticket_id}</p>
              <p style="margin:4px 0;color:#555;"><strong>Asunto:</strong> ${datos.asunto}</p>
              <p style="margin:4px 0;color:#555;"><strong>Tiempo de respuesta:</strong> Menos de 24 horas hábiles</p>
            </div>
          </div>
          <div style="background:#0D0C56;padding:16px;text-align:center;">
            <p style="color:rgba(255,255,255,0.4);font-size:11px;margin:0;">© 2026 Trip Planner · no-reply@tripplanner.com.mx</p>
          </div>
        </div>`
    },

    ticket_respondido: {
      subject: `Respuesta a tu ticket · #${datos.ticket_id}`,
      html: `
        <div style="font-family:Montserrat,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#0D0C56;padding:24px;text-align:center;">
            <h1 style="color:#fff;font-size:24px;margin:0;">Trip Planner</h1>
          </div>
          <div style="padding:32px;background:#f5f7ff;">
            <h2 style="color:#0D0C56;">Respondimos tu ticket 💬</h2>
            <p style="color:#555;">Hola <strong>${datos.nombre}</strong>, hemos respondido tu ticket <strong>#${datos.ticket_id}</strong>.</p>
            <div style="background:#fff;border-radius:13px;padding:20px;margin:20px 0;">
              <p style="margin:0 0 8px;color:#888;font-size:12px;">RESPUESTA DE SOPORTE</p>
              <p style="margin:0;color:#555;">${datos.respuesta}</p>
            </div>
            <a href="https://tripplanner.com.mx/soporte" style="display:block;background:#1667E6;color:#fff;text-align:center;padding:14px;border-radius:10px;text-decoration:none;font-weight:800;">Ver en soporte</a>
          </div>
          <div style="background:#0D0C56;padding:16px;text-align:center;">
            <p style="color:rgba(255,255,255,0.4);font-size:11px;margin:0;">© 2026 Trip Planner · no-reply@tripplanner.com.mx</p>
          </div>
        </div>`
    },
  };

  const plantilla = plantillas[tipo];
  if (!plantilla) return NextResponse.json({ error: 'Tipo de correo no válido' }, { status: 400 });

  const { data, error } = await resend.emails.send({
    from: 'Trip Planner <no-reply@tripplanner.com.mx>',
    to,
    subject: plantilla.subject,
    html: plantilla.html,
  });

  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ data });
}