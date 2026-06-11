"use client";

import Logo from "../components/Logo";

const secciones = [
  {
    titulo: "1. Información que recopilamos",
    contenido: `Recopilamos información que usted nos proporciona directamente al crear una cuenta, realizar una reserva o contactarnos. Esto incluye:

• Datos personales: nombre completo, fecha de nacimiento, nacionalidad y número de pasaporte.
• Datos de contacto: correo electrónico, número de teléfono y dirección.
• Datos de pago: información de tarjeta de crédito o débito (procesada de forma segura a través de nuestros proveedores de pago). Trip Planner no almacena datos completos de tarjetas.
• Datos de uso: páginas visitadas, búsquedas realizadas y preferencias de viaje dentro de la plataforma.`
  },
  {
    titulo: "2. Cómo usamos su información",
    contenido: `Utilizamos la información recopilada para los siguientes fines:

• Procesar y gestionar sus reservas de vuelos y hoteles.
• Enviar confirmaciones, actualizaciones y documentos de viaje a su correo electrónico.
• Notificarle sobre el estado de su reserva, recordatorios de check-in y cambios relevantes.
• Mejorar nuestra plataforma y personalizar su experiencia.
• Cumplir con obligaciones legales y fiscales aplicables.
• Prevenir fraudes y garantizar la seguridad de las transacciones.`
  },
  {
    titulo: "3. Compartición de información con terceros",
    contenido: `Trip Planner opera como plataforma referidora. Para procesar sus reservas, compartimos los datos necesarios con:

• Aerolíneas y proveedores de vuelos para emitir sus boletos.
• Hoteles y proveedores de hospedaje para confirmar su reserva.
• Procesadores de pago (como Stripe) para gestionar transacciones de forma segura.
• Proveedores de correo electrónico transaccional para enviar confirmaciones y notificaciones.

No vendemos, alquilamos ni compartimos su información personal con terceros para fines publicitarios.`
  },
  {
    titulo: "4. Seguridad de los datos",
    contenido: `Implementamos medidas técnicas y organizativas para proteger su información personal:

• Cifrado SSL/TLS en todas las comunicaciones con nuestra plataforma.
• Almacenamiento seguro de datos con acceso restringido al personal autorizado.
• Los datos de pago son procesados con cifrado de 256 bits y nunca se almacenan en nuestros servidores.
• Revisiones periódicas de seguridad y auditorías de acceso.

A pesar de estas medidas, ningún sistema de transmisión por internet es 100% seguro. Le recomendamos mantener la confidencialidad de sus credenciales de acceso.`
  },
  {
    titulo: "5. Cookies y tecnologías similares",
    contenido: `Utilizamos cookies y tecnologías similares para:

• Mantener su sesión iniciada y recordar sus preferencias.
• Analizar el uso de la plataforma mediante herramientas de analítica (como Google Analytics).
• Mejorar el rendimiento y la experiencia de navegación.

Puede configurar su navegador para rechazar cookies, aunque esto puede afectar el funcionamiento de algunas funciones de la plataforma.`
  },
  {
    titulo: "6. Retención de datos",
    contenido: `Conservamos su información personal durante el tiempo necesario para cumplir con los fines descritos en esta política, y en cualquier caso durante el período requerido por la legislación aplicable en materia fiscal y comercial.

Cuando su cuenta sea eliminada o inactiva por más de 5 años, procederemos a eliminar o anonimizar sus datos personales, salvo que exista una obligación legal de conservarlos.`
  },
  {
    titulo: "7. Sus derechos",
    contenido: `De acuerdo con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (México) y normativas aplicables, usted tiene derecho a:

• Acceder a sus datos personales que poseemos.
• Rectificar datos inexactos o incompletos.
• Cancelar o eliminar sus datos cuando ya no sean necesarios.
• Oponerse al tratamiento de sus datos para fines específicos.

Para ejercer estos derechos, escríbanos a no-reply@tripplanner.mx con el asunto "Derechos ARCO". Responderemos en un plazo máximo de 20 días hábiles.`
  },
  {
    titulo: "8. Transferencias internacionales de datos",
    contenido: `Algunos de nuestros proveedores de servicios pueden estar ubicados fuera de México. En estos casos, nos aseguramos de que dichas transferencias se realicen con las garantías adecuadas de protección de datos, incluyendo cláusulas contractuales estándar o mediante proveedores certificados bajo marcos de privacidad reconocidos.`
  },
  {
    titulo: "9. Menores de edad",
    contenido: `Nuestra plataforma no está dirigida a menores de 18 años. No recopilamos intencionalmente información personal de menores sin el consentimiento verificable de sus padres o tutores legales. Si usted es padre o tutor y cree que su hijo nos ha proporcionado información personal, contáctenos para eliminarla.`
  },
  {
    titulo: "10. Cambios a esta política",
    contenido: `Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier momento. Cuando realicemos cambios significativos, le notificaremos por correo electrónico y/o mediante un aviso destacado en nuestra plataforma con al menos 15 días de anticipación.

Le recomendamos revisar esta política periódicamente. El uso continuado de nuestra plataforma después de la publicación de cambios constituye su aceptación de dichos cambios.`
  },
  {
    titulo: "11. Contacto",
    contenido: `Si tiene preguntas, comentarios o solicitudes relacionadas con esta Política de Privacidad, puede contactarnos en:

Trip Planner S.A. de C.V.
Correo electrónico: no-reply@tripplanner.mx
Sitio web: tripplanner.mx

Última actualización: 11 de junio de 2026`
  },
];

export default function Privacidad() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Montserrat',sans-serif", background: "#f5f7ff" }}>

      {/* NAV */}
      <nav style={{ background: "#fff", padding: "12px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #e8edf8", position: "relative" }}>
        <Logo variant="color" />
        <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "28px", alignItems: "center" }}>
          <a href="/" style={{ fontSize: "13px", color: "#0D0C56", textDecoration: "none", fontWeight: "600" }}>Inicio</a>
          <a href="/soporte" style={{ fontSize: "13px", color: "#0D0C56", textDecoration: "none", fontWeight: "600" }}>Soporte</a>
          <a href="/privacidad" style={{ fontSize: "13px", color: "#1667E6", textDecoration: "none", fontWeight: "700", background: "#f0f5ff", padding: "6px 14px", borderRadius: "50px" }}>Privacidad</a>
        </div>
        <a href="/login" style={{ fontSize: "13px", background: "#1667E6", color: "#fff", textDecoration: "none", fontWeight: "700", padding: "8px 18px", borderRadius: "50px" }}>Iniciar sesión</a>
      </nav>

      {/* HERO */}
      <div style={{ background: "linear-gradient(135deg,#0D0C56,#1667E6)", padding: "40px 24px", textAlign: "center" }}>
        <h1 style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "28px", color: "#fff", marginBottom: "8px" }}>Política de Privacidad</h1>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)" }}>Tu privacidad es importante para nosotros. Última actualización: 11 de junio de 2026</p>
      </div>

      {/* CONTENIDO */}
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px", width: "100%", display: "grid", gridTemplateColumns: "200px 1fr", gap: "32px" }}>

        {/* ÍNDICE */}
        <div style={{ position: "sticky", top: "20px", alignSelf: "flex-start" }}>
          <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", padding: "14px" }}>
            <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "12px", color: "#0D0C56", marginBottom: "10px" }}>Contenido</div>
            {secciones.map((s, i) => (
              <a
                key={i}
                href={`#seccion-${i}`}
                style={{ display: "block", fontSize: "11px", color: "#888", textDecoration: "none", padding: "4px 0", borderBottom: i < secciones.length - 1 ? "1px solid #f5f7ff" : "none", lineHeight: "1.4" }}
              >
                {s.titulo}
              </a>
            ))}
          </div>
        </div>

        {/* TEXTO */}
        <div>
          {/* INTRO */}
          <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", padding: "20px 24px", marginBottom: "16px" }}>
            <p style={{ fontSize: "13px", color: "#555", lineHeight: "1.8" }}>
              En <strong>Trip Planner S.A. de C.V.</strong> nos comprometemos a proteger y respetar su privacidad. Esta Política de Privacidad describe cómo recopilamos, usamos y protegemos su información personal cuando utiliza nuestra plataforma en <strong>tripplanner.mx</strong>.
            </p>
            <p style={{ fontSize: "13px", color: "#555", lineHeight: "1.8", marginTop: "10px" }}>
              Al usar nuestros servicios, usted acepta las prácticas descritas en esta política. Si no está de acuerdo con alguno de los términos, le pedimos no utilizar nuestra plataforma.
            </p>
          </div>

          {/* SECCIONES */}
          {secciones.map((s, i) => (
            <div key={i} id={`seccion-${i}`} style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", padding: "20px 24px", marginBottom: "12px" }}>
              <h2 style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "15px", color: "#0D0C56", marginBottom: "12px" }}>{s.titulo}</h2>
              <div style={{ fontSize: "13px", color: "#555", lineHeight: "1.8", whiteSpace: "pre-line" }}>{s.contenido}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: "#0D0C56", padding: "32px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
        <div>
          <Logo variant="teal" />
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginTop: "12px" }}>© 2026 Trip Planner · no-reply@tripplanner.mx</p>
        </div>
        <div style={{ display: "flex", gap: "24px" }}>
          <a href="/soporte" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Centro de ayuda</a>
          <a href="/soporte" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Contacto</a>
          <a href="/privacidad" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Política de privacidad</a>
        </div>
      </footer>
    </div>
  );
}
