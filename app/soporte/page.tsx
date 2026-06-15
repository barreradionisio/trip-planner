"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Logo from "../components/Logo";

const faqs = [
  {
    pregunta: "¿Puedo modificar mi reserva después de confirmar?",
    respuesta: "Sí, puedes editar tu itinerario desde Mis viajes en cualquier momento. Para cambios en vuelos u hoteles, contáctanos con al menos 72h de anticipación. Los cambios están sujetos a disponibilidad de vuelos y hoteles, y pueden aplicarse cargos adicionales según la tarifa contratada en tu reserva original.",
  },
  {
    pregunta: "¿Cómo funciona la cancelación?",
    respuesta: "Las condiciones de cancelación dependen de la tarifa contratada en cada vuelo y hotel. Consulta los detalles de tu reserva en Mis viajes o escríbenos a no-reply@tripplanner.mx.",
  },
  {
    pregunta: "¿Cuándo recibo mis boletos de vuelo?",
    respuesta: "Recibirás tus boletos por correo electrónico. Mantente al pendiente y recuerda hacer tu check-in en línea con la aerolínea según sus tiempos indicados.",
  },
  {
    pregunta: "¿Qué métodos de pago aceptan?",
    respuesta: "Aceptamos tarjetas de crédito y débito (Visa y Mastercard), transferencia SPEI y Apple Pay.",
  },
  {
    pregunta: "¿Puedo agregar pasajeros a una reserva existente?",
    respuesta: "Agregar pasajeros después de confirmar depende de la disponibilidad y política de cada aerolínea y hotel. Contáctanos y lo revisamos caso por caso.",
  },
  {
    pregunta: "¿Trip Planner es una agencia de viajes registrada?",
    respuesta: "Trip Planner opera como plataforma referidora. Gestionamos tu reserva conectándote con aerolíneas y hoteles directamente. Tu contrato de servicio es con cada proveedor.",
  },
];

function SoporteContent() {
  const searchParams = useSearchParams();
const [tab, setTab] = useState(searchParams.get("tab") || "chat");

useEffect(() => {
  const tabParam = searchParams.get("tab");
  if (tabParam) setTab(tabParam);
}, [searchParams]);

  const [faqAbierto, setFaqAbierto] = useState<number | null>(null);
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState([
    { tipo: "agente", texto: "¡Hola! Soy el asistente de Trip Planner. ¿En qué puedo ayudarte hoy?" },
  ]);
  const [asunto, setAsunto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [ticketEnviado, setTicketEnviado] = useState(false);

  const enviarMensaje = () => {
    if (!mensaje.trim()) return;
    setMensajes([...mensajes, { tipo: "usuario", texto: mensaje }]);
    setMensaje("");
    setTimeout(() => {
      setMensajes(prev => [...prev, { tipo: "agente", texto: "Gracias por tu mensaje. Un agente te responderá en breve. Si es urgente, escríbenos a no-reply@tripplanner.mx" }]);
    }, 1000);
  };

  const enviarTicket = () => {
    if (!asunto.trim() || !descripcion.trim()) return;
    setTicketEnviado(true);
  };

  const tabs = [
    { key: "chat", label: "Chat en vivo" },
    { key: "faq", label: "Preguntas frecuentes" },
    { key: "ticket", label: "Enviar ticket" },
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Montserrat',sans-serif", background: "#f5f7ff" }}>

      {/* NAV */}
      <nav style={{ background: "#fff", padding: "12px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #e8edf8", position: "relative" }}>
  <Link href="/"><Logo variant="color" /></Link>
  <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "16px", alignItems: "center", width: "440px", justifyContent: "center" }}>
  <Link href="/destinos" style={{ fontSize: "13px", color: "#0D0C56", textDecoration: "none", fontWeight: "600", padding: "6px 14px", borderRadius: "50px" }}>Arma tu viaje</Link>
  <Link href="/solo-vuelos" style={{ fontSize: "13px", color: "#0D0C56", textDecoration: "none", fontWeight: "600", padding: "6px 14px", borderRadius: "50px" }}>Vuelos</Link>
  <Link href="/solo-hoteles" style={{ fontSize: "13px", color: "#0D0C56", textDecoration: "none", fontWeight: "600", padding: "6px 14px", borderRadius: "50px" }}>Hoteles</Link>
  <Link href="/soporte" style={{ fontSize: "13px", color: "#0D0C56", textDecoration: "none", fontWeight: "600", padding: "6px 14px", borderRadius: "50px" }}>Soporte</Link>
</div>
  <Link href="/login" style={{ fontSize: "13px", background: "#1667E6", color: "#fff", textDecoration: "none", fontWeight: "700", padding: "8px 18px", borderRadius: "50px" }}>Iniciar sesión</Link>
</nav>

      {/* HEADER */}
      <div style={{ background: "linear-gradient(135deg,#0D0C56,#1667E6)", padding: "40px 24px", textAlign: "center" }}>
        <h1 style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "28px", color: "#fff", marginBottom: "8px" }}>¿En qué podemos ayudarte?</h1>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)" }}>Estamos aquí para resolver tus dudas y apoyarte en tu viaje</p>
      </div>

      {/* CONTENIDO */}
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "28px 20px 40px", width: "100%" }}>

        {/* TABS */}
        <div style={{ display: "flex", background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", padding: "4px", marginBottom: "20px", gap: "4px" }}>
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              style={{ flex: 1, padding: "10px", border: "none", borderRadius: "10px", fontSize: "13px", fontWeight: "700", cursor: "pointer", background: tab === t.key ? "#1667E6" : "transparent", color: tab === t.key ? "#fff" : "#888", transition: "all 0.2s" }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* CHAT */}
        {tab === "chat" && (
          <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid #f0f2fa", display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#3ED5A9" }} />
              <div style={{ fontWeight: "700", fontSize: "13px", color: "#0D0C56" }}>Asistente Trip Planner</div>
              <div style={{ fontSize: "11px", color: "#3ED5A9", fontWeight: "600" }}>En línea</div>
            </div>
            <div style={{ height: "320px", overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
              {mensajes.map((m, i) => (
                <div key={i} style={{ display: "flex", justifyContent: m.tipo === "usuario" ? "flex-end" : "flex-start" }}>
                  <div style={{ maxWidth: "70%", padding: "10px 14px", borderRadius: m.tipo === "usuario" ? "14px 14px 2px 14px" : "14px 14px 14px 2px", background: m.tipo === "usuario" ? "#1667E6" : "#f5f7ff", color: m.tipo === "usuario" ? "#fff" : "#0D0C56", fontSize: "12px", lineHeight: "1.5" }}>
                    {m.texto}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ padding: "12px 16px", borderTop: "1px solid #f0f2fa", display: "flex", gap: "10px" }}>
              <input
                value={mensaje}
                onChange={e => setMensaje(e.target.value)}
                onKeyDown={e => e.key === "Enter" && enviarMensaje()}
                placeholder="Escribe tu mensaje..."
                style={{ flex: 1, border: "1.5px solid #e8edf8", borderRadius: "8px", padding: "9px 12px", fontSize: "12px", outline: "none" }}
              />
              <button onClick={enviarMensaje} style={{ padding: "9px 18px", background: "#1667E6", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "700", fontSize: "12px", cursor: "pointer" }}>Enviar</button>
            </div>
          </div>
        )}

        {/* FAQ */}
        {tab === "faq" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {faqs.map((f, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: "13px", border: `1.5px solid ${faqAbierto === i ? "#1667E6" : "#e8edf8"}`, overflow: "hidden", transition: "border-color 0.2s" }}>
                <button
                  onClick={() => setFaqAbierto(faqAbierto === i ? null : i)}
                  style={{ width: "100%", padding: "14px 18px", border: "none", background: "transparent", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "left" }}
                >
                  <span style={{ fontWeight: "700", fontSize: "13px", color: "#0D0C56" }}>{f.pregunta}</span>
                  <span style={{ fontSize: "18px", color: "#1667E6", fontWeight: "700", flexShrink: 0, marginLeft: "12px" }}>{faqAbierto === i ? "−" : "+"}</span>
                </button>
                {faqAbierto === i && (
                  <div style={{ padding: "0 18px 14px", fontSize: "12px", color: "#666", lineHeight: "1.6", borderTop: "1px solid #f5f7ff" }}>
                    <div style={{ paddingTop: "12px" }}>{f.respuesta}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* TICKET */}
        {tab === "ticket" && (
          <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", overflow: "hidden" }}>
            {!ticketEnviado ? (
              <>
                <div style={{ padding: "14px 18px", borderBottom: "1px solid #f0f2fa" }}>
                  <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "14px", color: "#0D0C56" }}>Enviar ticket de soporte</div>
                  <div style={{ fontSize: "12px", color: "#888", marginTop: "2px" }}>Te responderemos en menos de 24 horas hábiles</div>
                </div>
                <div style={{ padding: "18px", display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div>
                    <div style={{ fontSize: "10px", fontWeight: "700", color: "#1667E6", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "4px" }}>Categoría</div>
                    <select style={{ width: "100%", border: "1.5px solid #e8edf8", borderRadius: "8px", padding: "9px 11px", fontSize: "12px", outline: "none", background: "#fff" }}>
                      <option>Cambio o cancelación de reserva</option>
                      <option>Problema con el pago</option>
                      <option>Documentos de viaje</option>
                      <option>Itinerario</option>
                      <option>Otro</option>
                    </select>
                  </div>
                  <div>
                    <div style={{ fontSize: "10px", fontWeight: "700", color: "#1667E6", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "4px" }}>Número de reserva (opcional)</div>
                    <input placeholder="TP-2024-XXXX" style={{ width: "100%", border: "1.5px solid #e8edf8", borderRadius: "8px", padding: "9px 11px", fontSize: "12px", outline: "none", boxSizing: "border-box" }} />
                  </div>
                  <div>
                    <div style={{ fontSize: "10px", fontWeight: "700", color: "#1667E6", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "4px" }}>Asunto</div>
                    <input value={asunto} onChange={e => setAsunto(e.target.value)} placeholder="Describe brevemente tu problema" style={{ width: "100%", border: "1.5px solid #e8edf8", borderRadius: "8px", padding: "9px 11px", fontSize: "12px", outline: "none", boxSizing: "border-box" }} />
                  </div>
                  <div>
                    <div style={{ fontSize: "10px", fontWeight: "700", color: "#1667E6", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "4px" }}>Descripción</div>
                    <textarea value={descripcion} onChange={e => setDescripcion(e.target.value)} placeholder="Cuéntanos con detalle qué ocurrió..." rows={4} style={{ width: "100%", border: "1.5px solid #e8edf8", borderRadius: "8px", padding: "9px 11px", fontSize: "12px", outline: "none", resize: "vertical", boxSizing: "border-box", fontFamily: "'Montserrat',sans-serif" }} />
                  </div>
                </div>
                <div style={{ padding: "14px 18px", borderTop: "1px solid #f0f2fa", display: "flex", justifyContent: "flex-end" }}>
                  <button onClick={enviarTicket} style={{ padding: "10px 24px", backgroundColor: "#FF5C00", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "700", fontSize: "12px", cursor: "pointer" }}>Enviar ticket</button>
                </div>
              </>
            ) : (
              <div style={{ padding: "48px 24px", textAlign: "center" }}>
                <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#e8fff5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", margin: "0 auto 16px" }}>✅</div>
                <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "18px", color: "#0D0C56", marginBottom: "8px" }}>¡Ticket enviado!</div>
                <div style={{ fontSize: "12px", color: "#888", lineHeight: "1.6", marginBottom: "20px" }}>Recibirás una respuesta en menos de 24 horas hábiles en tu correo registrado.</div>
                <button onClick={() => { setTicketEnviado(false); setAsunto(""); setDescripcion(""); }} style={{ padding: "10px 24px", background: "#1667E6", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "700", fontSize: "12px", cursor: "pointer" }}>Enviar otro ticket</button>
              </div>
            )}
          </div>
        )}

        {/* CONTACTO DIRECTO */}
        <div style={{ marginTop: "20px", background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", padding: "16px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontWeight: "700", fontSize: "13px", color: "#0D0C56", marginBottom: "2px" }}>¿Prefieres escribirnos directamente?</div>
            <div style={{ fontSize: "12px", color: "#888" }}>no-reply@tripplanner.mx · Respuesta en menos de 24h</div>
          </div>
          <a href="mailto:no-reply@tripplanner.mx" style={{ padding: "9px 18px", background: "#f0f5ff", color: "#1667E6", border: "1.5px solid #e0eaff", borderRadius: "8px", fontWeight: "700", fontSize: "12px", textDecoration: "none" }}>Escribir correo</a>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: "#0D0C56", padding: "32px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
        <div>
          <Logo variant="teal" />
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginTop: "12px" }}>© 2026 Trip Planner · no-reply@tripplanner.mx</p>
        </div>
        <div style={{ display: "flex", gap: "24px" }}>
          <Link href="/soporte?tab=faq" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Centro de ayuda</Link>
<Link href="/soporte?tab=chat" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Contacto</Link>
<Link href="/privacidad" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Política de privacidad</Link>
        </div>
      </footer>
    </div>
  );
  }
export default function Soporte() {
  return (
    <Suspense>
      <SoporteContent />
    </Suspense>
  );
}