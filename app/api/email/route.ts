import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { to, tipo, datos } = await req.json();

  const plantillas: { [key: string]: { subject: string; html: string } } = {
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
              <p><strong>Destinos:</strong> ${datos.destinos}</p>
              <p><strong>Fechas:</strong> ${datos.fechas}</p>
              <p><strong>Total:</strong> ${datos.total}</p>
            </div>
            <a href="https://tripplanner.com.mx/mis-viajes" style="display:block;background:#FF5C00;color:#fff;text-align:center;padding:14px;border-radius:10px;text-decoration:none;font-weight:800;">Ver mi reserva</a>
          </div>
          <div style="background:#0D0C56;padding:16px;text-align:center;">
            <p style="color:rgba(255,255,255,0.4);font-size:11px;margin:0;">© 2026 Trip Planner · no-reply@tripplanner.com.mx</p>
          </div>
        </div>
      `
    },
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
            <a href="https://tripplanner.com.mx/destinos" style="display:block;background:#1667E6;color:#fff;text-align:center;padding:14px;border-radius:10px;text-decoration:none;font-weight:800;">Armar mi viaje</a>
          </div>
          <div style="background:#0D0C56;padding:16px;text-align:center;">
            <p style="color:rgba(255,255,255,0.4);font-size:11px;margin:0;">© 2026 Trip Planner · no-reply@tripplanner.com.mx</p>
          </div>
        </div>
      `
    }
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