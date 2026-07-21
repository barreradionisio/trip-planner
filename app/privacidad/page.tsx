"use client";

import Link from "next/link";
import Logo from "../components/Logo";
import NavUsuario from "../components/NavUsuario";

const secciones = [
  {
    titulo: "1. Información que recopilamos",
    contenido: `Recopilamos información que usted nos proporciona directamente al crear una cuenta, realizar una reserva o contactarnos. Esto incluye:\n\n• Datos personales: nombre completo, fecha de nacimiento, nacionalidad y número de pasaporte.\n• Datos de contacto: correo electrónico, número de teléfono y dirección.\n• Datos de pago: información de tarjeta de crédito o débito (procesada de forma segura a través de nuestros proveedores de pago). Trip Planner no almacena datos completos de tarjetas.\n• Datos de uso: páginas visitadas, búsquedas realizadas y preferencias de viaje dentro de la plataforma.`
  },
  {
    titulo: "2. Cómo usamos su información",
    contenido: `Utilizamos la información recopilada para los siguientes fines:\n\n• Procesar y gestionar sus reservas de vuelos y hoteles.\n• Enviar confirmaciones, actualizaciones y documentos de viaje a su correo electrónico.\n• Notificarle sobre el estado de su reserva, recordatorios de check-in y cambios relevantes.\n• Mejorar nuestra plataforma y personalizar su experiencia.\n• Cumplir con obligaciones legales y fiscales aplicables.\n• Prevenir fraudes y garantizar la seguridad de las transacciones.`
  },
  {
    titulo: "3. Compartición de información con terceros",
    contenido: `Trip Planner opera como plataforma referidora. Para procesar sus reservas, compartimos los datos necesarios con:\n\n• Aerolíneas y proveedores de vuelos para emitir sus boletos.\n• Hoteles y proveedores de hospedaje para confirmar su reserva.\n• Procesadores de pago (como Stripe) para gestionar transacciones de forma segura.\n• Proveedores de correo electrónico transaccional para enviar confirmaciones y notificaciones.\n\nNo vendemos, alquilamos ni compartimos su información personal con terceros para fines publicitarios.`
  },
  {
    titulo: "4. Seguridad de los datos",
    contenido: `Implementamos medidas técnicas y organizativas para proteger su información personal:\n\n• Cifrado SSL/TLS en todas las comunicaciones con nuestra plataforma.\n• Almacenamiento seguro de datos con acceso restringido al personal autorizado.\n• Los datos de pago son procesados con cifrado de 256 bits y nunca se almacenan en nuestros servidores.\n• Revisiones periódicas de seguridad y auditorías de acceso.`
  },
  {
    titulo: "5. Cookies y tecnologías similares",
    contenido: `Utilizamos cookies y tecnologías similares para:\n\n• Mantener su sesión iniciada y recordar sus preferencias.\n• Analizar el uso de la plataforma mediante herramientas de analítica.\n• Mejorar el rendimiento y la experiencia de navegación.\n\nPuede configurar su navegador para rechazar cookies, aunque esto puede afectar el funcionamiento de algunas funciones.`
  },
  {
    titulo: "6. Retención de datos",
    contenido: `Conservamos su información personal durante el tiempo necesario para cumplir con los fines descritos en esta política, y en cualquier caso durante el período requerido por la legislación aplicable.\n\nCuando su cuenta sea eliminada o inactiva por más de 5 años, procederemos a eliminar o anonimizar sus datos personales.`
  },
  {
    titulo: "7. Sus derechos",
    contenido: `De acuerdo con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (México), usted tiene derecho a:\n\n• Acceder a sus datos personales que poseemos.\n• Rectificar datos inexactos o incompletos.\n• Cancelar o eliminar sus datos cuando ya no sean necesarios.\n• Oponerse al tratamiento de sus datos para fines específicos.\n\nPara ejercer estos derechos, escríbanos a soporte@tripplanner.com.mx con el asunto "Derechos ARCO".`
  },
  {
    titulo: "8. Transferencias internacionales de datos",
    contenido: `Algunos de nuestros proveedores de servicios pueden estar ubicados fuera de México. En estos casos, nos aseguramos de que dichas transferencias se realicen con las garantías adecuadas de protección de datos.`
  },
  {
    titulo: "9. Menores de edad",
    contenido: `Nuestra plataforma no está dirigida a menores de 18 años. No recopilamos intencionalmente información personal de menores sin el consentimiento verificable de sus padres o tutores legales.`
  },
  {
    titulo: "10. Cambios a esta política",
    contenido: `Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier momento. Cuando realicemos cambios significativos, le notificaremos por correo electrónico con al menos 15 días de anticipación.`
  },
  {
    titulo: "11. Contacto",
    contenido: `Si tiene preguntas relacionadas con esta Política de Privacidad:\n\nTrip Planner S.A. de C.V.\nCorreo electrónico: soporte@tripplanner.com.mx\nSitio web: tripplanner.com.mx\n\nÚltima actualización: 11 de junio de 2026`
  },
];

export default function Privacidad() {
  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        .priv-wrap {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          font-family: 'Montserrat', sans-serif;
          background: #f5f7ff;
          width: 100%;
          max-width: 100vw;
          overflow-x: hidden;
        }
        .priv-nav {
          background: #fff;
          padding: 12px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #e8edf8;
          position: relative;
        }
        .priv-nav-center {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 28px;
          align-items: center;
        }
        .priv-hero {
          background: linear-gradient(135deg,#0D0C56,#1667E6);
          padding: 40px 24px;
          text-align: center;
        }
        .priv-body {
          max-width: 800px;
          margin: 0 auto;
          padding: 40px 20px;
          width: 100%;
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 32px;
          flex: 1;
        }
        .priv-indice {
          position: sticky;
          top: 20px;
          align-self: flex-start;
        }
        .priv-indice-mobile { display: none; margin-bottom: 16px; }
        .priv-footer {
          background: #0D0C56;
          padding: 32px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
        }
        .priv-footer-links { display: flex; gap: 24px; }

        @media (max-width: 768px) {
          .priv-nav { padding: 12px 16px; }
          .priv-nav-center { display: none; }
          .priv-hero { padding: 28px 16px; }
          .priv-body { grid-template-columns: 1fr; padding: 16px 12px 32px; gap: 0; }
          .priv-indice { display: none; }
          .priv-indice-mobile { display: block; }
          .priv-footer { flex-direction: column; gap: 16px; padding: 24px 16px; align-items: flex-start; }
          .priv-footer-links { flex-direction: column; gap: 8px; }
        }
      `}</style>

      <div className="priv-wrap">

        {/* NAV */}
        <nav className="priv-nav">
          <Link href="/"><Logo variant="color" /></Link>
          <div className="priv-nav-center">
            <Link href="/destinos" style={{ fontSize: "13px", color: "#0D0C56", textDecoration: "none", fontWeight: "600" }}>Arma tu viaje</Link>
            <Link href="/soporte" style={{ fontSize: "13px", color: "#0D0C56", textDecoration: "none", fontWeight: "600" }}>Soporte</Link>
            <Link href="/privacidad" style={{ fontSize: "13px", color: "#1667E6", textDecoration: "none", fontWeight: "700", background: "#f0f5ff", padding: "6px 14px", borderRadius: "50px" }}>Privacidad</Link>
          </div>
          <NavUsuario />
        </nav>

        {/* HERO */}
        <div className="priv-hero">
          <h1 style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "18px", color: "#fff", marginBottom: "8px" }}>Política de privacidad</h1>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)" }}>Tu privacidad es importante para nosotros. Última actualización: 11 de junio de 2026</p>
        </div>

        {/* BODY */}
        <div className="priv-body">

          {/* ÍNDICE DESKTOP */}
          <div className="priv-indice">
            <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", padding: "14px" }}>
              <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "12px", color: "#0D0C56", marginBottom: "10px" }}>Contenido</div>
              {secciones.map((s, i) => (
                <a key={i} href={`#seccion-${i}`} style={{ display: "block", fontSize: "11px", color: "#888", textDecoration: "none", padding: "4px 0", borderBottom: i < secciones.length - 1 ? "1px solid #f5f7ff" : "none", lineHeight: "1.4" }}>
                  {s.titulo}
                </a>
              ))}
            </div>
          </div>

          {/* TEXTO */}
          <div>
            {/* ÍNDICE MÓVIL */}
            <div className="priv-indice-mobile">
              <details style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", padding: "14px" }}>
                <summary style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "12px", color: "#0D0C56", cursor: "pointer", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
  Contenido
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1667E6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
</summary>
                <div style={{ marginTop: "10px" }}>
                  {secciones.map((s, i) => (
                    <a key={i} href={`#seccion-${i}`} style={{ display: "block", fontSize: "11px", color: "#888", textDecoration: "none", padding: "4px 0", borderBottom: i < secciones.length - 1 ? "1px solid #f5f7ff" : "none", lineHeight: "1.4" }}>
                      {s.titulo}
                    </a>
                  ))}
                </div>
              </details>
            </div>

            {/* INTRO */}
            <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", padding: "20px 24px", marginBottom: "16px" }}>
              <p style={{ fontSize: "13px", color: "#555", lineHeight: "1.8" }}>
                En <strong>Trip Planner S.A. de C.V.</strong> nos comprometemos a proteger y respetar su privacidad. Esta Política de Privacidad describe cómo recopilamos, usamos y protegemos su información personal cuando utiliza nuestra plataforma en <strong>tripplanner.com.mx</strong>.
              </p>
              <p style={{ fontSize: "13px", color: "#555", lineHeight: "1.8", marginTop: "10px" }}>
                Al usar nuestros servicios, usted acepta las prácticas descritas en esta política.
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
        <footer className="priv-footer">
          <div>
            <Logo variant="teal" />
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginTop: "12px" }}>© 2026 Trip Planner · no-reply@tripplanner.com.mx</p>
          </div>
          <div className="priv-footer-links">
            <Link href="/soporte?tab=faq" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Centro de ayuda</Link>
            <Link href="/soporte?tab=chat" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Contacto</Link>
            <Link href="/privacidad" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Política de privacidad</Link>
          </div>
        </footer>
      </div>
    </>
  );
}
