"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "../../components/Logo";

const aspectos = [
  { key: "vuelos", label: "Vuelos", emoji: "✈️" },
  { key: "hoteles", label: "Hoteles", emoji: "🏨" },
  { key: "itinerario", label: "Itinerario", emoji: "🗺" },
  { key: "plataforma", label: "Plataforma", emoji: "💻" },
  { key: "atencion", label: "Atención al cliente", emoji: "💬" },
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
            <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "#e8fff5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "36px", margin: "0 auto 20px" }}>⭐</div>
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
                  <span style={{ fontSize: "20px" }}>{a.emoji}</span>
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
              style={{ flex: 1, padding: "12px", border: `1.5px solid ${recomendaria === true ? "#3ED5A9" : "#e8edf8"}`, borderRadius: "10px", background: recomendaria === true ? "#e8fff5" : "#fff", cursor: "pointer", fontSize: "20px" }}
            >
              👍<br/><span style={{ fontSize: "12px", fontWeight: "700", color: recomendaria === true ? "#085041" : "#888" }}>Sí, sin duda</span>
            </button>
            <button
              onClick={() => setRecomendaria(false)}
              style={{ flex: 1, padding: "12px", border: `1.5px solid ${recomendaria === false ? "#E24B4A" : "#e8edf8"}`, borderRadius: "10px", background: recomendaria === false ? "#ffeaea" : "#fff", cursor: "pointer", fontSize: "20px" }}
            >
              👎<br/><span style={{ fontSize: "12px", fontWeight: "700", color: recomendaria === false ? "#c0392b" : "#888" }}>No por ahora</span>
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
