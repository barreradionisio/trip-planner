"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "../../components/Logo";

const IconPlane = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1667E6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-1 .1-1.3.5l-.4.4c-.4.4-.3 1 .2 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.4 5.8c.3.5.9.6 1.3.2l.4-.4c.4-.3.6-.8.5-1.3z"/>
  </svg>
);

const IconHotelAspecto = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1667E6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const IconMap = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1667E6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
    <line x1="8" y1="2" x2="8" y2="18"/>
    <line x1="16" y1="6" x2="16" y2="22"/>
  </svg>
);

const IconLaptop = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1667E6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
    <line x1="2" y1="21" x2="22" y2="21"/>
  </svg>
);

const IconChat = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1667E6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
  </svg>
);

const aspectos = [
  { key: "vuelos", label: "Vuelos", icono: <IconPlane /> },
  { key: "hoteles", label: "Hoteles", icono: <IconHotelAspecto /> },
  { key: "itinerario", label: "Itinerario", icono: <IconMap /> },
  { key: "plataforma", label: "Plataforma", icono: <IconLaptop /> },
  { key: "atencion", label: "Atención al cliente", icono: <IconChat /> },
];

export default function CalificarViaje() {
  const [calificaciones, setCalificaciones] = useState<{ [key: string]: number }>({});
  const [hover, setHover] = useState<{ [key: string]: number }>({});
  const [comentario, setComentario] = useState("");
  const [recomendaria, setRecomendaria] = useState<boolean | null>(null);
  const [enviado, setEnviado] = useState(false);

  const setCalificacion = (key: string, valor: number) => {
    setCalificaciones(prev => ({ ...prev, [key]: valor }));
  };

  const promedioCalificacion = () => {
    const vals = Object.values(calificaciones);
    if (vals.length === 0) return 0;
    return (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1);
  };

  const puedeEnviar = Object.keys(calificaciones).length === aspectos.length && recomendaria !== null;

  const enviar = () => {
    if (!puedeEnviar) return;
    setEnviado(true);
  };

  if (enviado) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Montserrat',sans-serif", background: "#f5f7ff" }}>
        <nav style={{ background: "#1667E6", padding: "12px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" }}>
          <Logo variant="naranja" />
          <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "28px", alignItems: "center" }}>
            <Link href="/mis-viajes" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none", fontWeight: "600" }}>Mis viajes</Link>
            <Link href="/perfil" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none", fontWeight: "600" }}>Perfil</Link>
            <Link href="/soporte" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none", fontWeight: "600" }}>Soporte</Link>
          </div>
          <Link href="/mis-viajes" style={{ fontSize: "13px", background: "rgba(255,255,255,0.15)", color: "#fff", textDecoration: "none", fontWeight: "700", padding: "8px 18px", borderRadius: "50px" }}>‹ Mis viajes</Link>
        </nav>
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
        <div style={{ background: "#fff", borderRadius: "16px", border: "1.5px solid #e8edf8", padding: "48px", textAlign: "center", maxWidth: "480px", width: "100%" }}>
  <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "#e8fff5", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
    <svg width="36" height="36" viewBox="0 0 24 24" fill="#085041" stroke="none">
      <path d="M12 2l2.59 6.36L21 9.27l-5 4.36L17.18 21 12 17.27 6.82 21 8 13.63l-5-4.36 6.41-.91L12 2z"/>
    </svg>
  </div>
  <h2 style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "22px", color: "#0D0C56", marginBottom: "8px" }}>¡Gracias por tu opinión!</h2>
  <p style={{ fontSize: "13px", color: "#888", lineHeight: "1.6", marginBottom: "12px" }}>
    Tu calificación de <strong style={{ color: "#FF5C00" }}>{promedioCalificacion()} ⭐</strong> nos ayuda a mejorar para futuros viajeros.
  </p>
  <p style={{ fontSize: "12px", color: "#aaa", marginBottom: "28px" }}>Cuando se integre la API, tu reseña quedará guardada en tu historial de viajes.</p>
  <Link href="/mis-viajes" style={{ display: "block", padding: "12px 24px", background: "#FF5C00", color: "#fff", borderRadius: "10px", fontWeight: "800", fontSize: "13px", textDecoration: "none" }}>Volver a Mis viajes</Link>
</div>  
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Montserrat',sans-serif", background: "#f5f7ff" }}>

      {/* NAV */}
      <nav style={{ background: "#1667E6", padding: "12px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" }}>
        <Logo variant="naranja" />
        <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "28px", alignItems: "center" }}>
          <Link href="/mis-viajes" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none", fontWeight: "600" }}>Mis viajes</Link>
          <Link href="/perfil" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none", fontWeight: "600" }}>Perfil</Link>
          <Link href="/soporte" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none", fontWeight: "600" }}>Soporte</Link>
        </div>
        <Link href="/mis-viajes" style={{ fontSize: "13px", background: "rgba(255,255,255,0.15)", color: "#fff", textDecoration: "none", fontWeight: "700", padding: "8px 18px", borderRadius: "50px" }}>‹ Mis viajes</Link>
      </nav>

      {/* HEADER */}
      <div style={{ background: "#1667E6", padding: "20px 32px 40px", marginBottom: "-20px" }}>
        <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", marginBottom: "4px" }}>Reserva TP-2023-7712</div>
        <h1 style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "22px", color: "#fff", marginBottom: "2px" }}>Califica tu viaje</h1>
        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)" }}>Nueva York · 15–20 Dic 2025</p>
      </div>

      {/* CONTENIDO */}
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "0 20px 40px", width: "100%" }}>

        {/* CALIFICACIONES POR ASPECTO */}
        <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", overflow: "hidden", marginBottom: "16px" }}>
          <div style={{ padding: "14px 18px", borderBottom: "1px solid #f0f2fa" }}>
            <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "14px", color: "#0D0C56" }}>¿Cómo calificarías cada aspecto?</div>
            <div style={{ fontSize: "11px", color: "#888", marginTop: "2px" }}>Califica del 1 al 5 cada elemento de tu viaje</div>
          </div>
          <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: "16px" }}>
            {aspectos.map(a => (
              <div key={a.key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "20px" }}>{a.icono}</span>
                  <span style={{ fontWeight: "700", fontSize: "13px", color: "#0D0C56" }}>{a.label}</span>
                </div>
                <div style={{ display: "flex", gap: "4px" }}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <span
                      key={star}
                      onClick={() => setCalificacion(a.key, star)}
                      onMouseEnter={() => setHover(prev => ({ ...prev, [a.key]: star }))}
                      onMouseLeave={() => setHover(prev => ({ ...prev, [a.key]: 0 }))}
                      style={{ fontSize: "28px", cursor: "pointer", color: star <= (hover[a.key] || calificaciones[a.key] || 0) ? "#FF5C00" : "#e8edf8", transition: "color 0.1s" }}
                    >★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {Object.keys(calificaciones).length === aspectos.length && (
            <div style={{ padding: "12px 18px", borderTop: "1px solid #f0f2fa", background: "#f5f7ff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "12px", color: "#888" }}>Calificación promedio</span>
              <span style={{ fontWeight: "800", fontSize: "18px", color: "#FF5C00" }}>{promedioCalificacion()} ⭐</span>
            </div>
          )}
        </div>

        {/* RECOMENDARÍA */}
        <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", padding: "16px 18px", marginBottom: "16px" }}>
  <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "14px", color: "#0D0C56", marginBottom: "12px" }}>¿Recomendarías Trip Planner?</div>
  <div style={{ display: "flex", gap: "12px" }}>
    <button
      onClick={() => setRecomendaria(true)}
      style={{ flex: 1, padding: "16px", border: `1.5px solid ${recomendaria === true ? "#3ED5A9" : "#e8edf8"}`, borderRadius: "10px", background: recomendaria === true ? "#e8fff5" : "#fff", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={recomendaria === true ? "#085041" : "#888"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3z"/>
        <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
      </svg>
      <span style={{ fontSize: "12px", fontWeight: "700", color: recomendaria === true ? "#085041" : "#888" }}>Sí, sin duda</span>
    </button>
    <button
      onClick={() => setRecomendaria(false)}
      style={{ flex: 1, padding: "16px", border: `1.5px solid ${recomendaria === false ? "#E24B4A" : "#e8edf8"}`, borderRadius: "10px", background: recomendaria === false ? "#ffeaea" : "#fff", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={recomendaria === false ? "#c0392b" : "#888"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3z"/>
        <path d="M17 2h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3"/>
      </svg>
      <span style={{ fontSize: "12px", fontWeight: "700", color: recomendaria === false ? "#c0392b" : "#888" }}>No por ahora</span>
    </button>
  </div>
</div>

        {/* COMENTARIO */}
        <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", padding: "16px 18px", marginBottom: "16px" }}>
          <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "14px", color: "#0D0C56", marginBottom: "4px" }}>Cuéntanos más <span style={{ fontSize: "12px", fontWeight: "400", color: "#aaa" }}>(opcional)</span></div>
          <div style={{ fontSize: "11px", color: "#888", marginBottom: "10px" }}>Tu comentario nos ayuda a mejorar la experiencia para todos</div>
          <textarea
            value={comentario}
            onChange={e => setComentario(e.target.value)}
            placeholder="¿Qué fue lo mejor de tu viaje? ¿Hay algo que podríamos mejorar?"
            rows={4}
            style={{ width: "100%", border: "1.5px solid #e8edf8", borderRadius: "8px", padding: "10px 12px", fontSize: "12px", outline: "none", resize: "vertical", boxSizing: "border-box" as const, fontFamily: "'Montserrat',sans-serif", lineHeight: "1.6" }}
          />
          <div style={{ fontSize: "10px", color: "#aaa", marginTop: "4px", textAlign: "right" }}>{comentario.length}/500</div>
        </div>

        {/* BOTÓN ENVIAR */}
        <button
          onClick={enviar}
          disabled={!puedeEnviar}
          style={{ width: "100%", padding: "13px", backgroundColor: "#FF5C00", color: "#fff", border: "none", borderRadius: "13px", fontFamily: "sans-serif", fontWeight: "800", fontSize: "14px", cursor: !puedeEnviar ? "not-allowed" : "pointer", opacity: !puedeEnviar ? 0.4 : 1 }}
        >
          Enviar calificación
        </button>
        {!puedeEnviar && (
          <div style={{ fontSize: "11px", color: "#888", textAlign: "center", marginTop: "8px" }}>
            {Object.keys(calificaciones).length < aspectos.length ? "Califica todos los aspectos para continuar" : "Indica si recomendarías Trip Planner"}
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer style={{ background: "#0D0C56", padding: "32px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
        <div>
          <Logo variant="teal" />
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginTop: "12px" }}>© 2026 Trip Planner · no-reply@tripplaner.com.mx</p>
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
