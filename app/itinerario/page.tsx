"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "../components/Logo";
import { useIsMobile } from "../hooks/useIsMobile";

const itinerario = [
  {
    ciudad: "París",
    dias: [
      { dia: 1, fecha: "12 Jul", actividades: [
        { id: 1, hora: "09:00", tipo: "cultura", titulo: "Torre Eiffel", desc: "El monumento más icónico de París." },
        { id: 2, hora: "12:00", tipo: "comida", titulo: "Almuerzo en Le Procope", desc: "El café más antiguo de París." },
        { id: 3, hora: "15:00", tipo: "cultura", titulo: "Museo del Louvre", desc: "El museo más visitado del mundo." },
        { id: 4, hora: "20:00", tipo: "cena", titulo: "Cena en Montmartre", desc: "Barrio bohemio y pintoresco." },
      ]},
      { dia: 2, fecha: "13 Jul", actividades: [
        { id: 5, hora: "10:00", tipo: "cultura", titulo: "Palacio de Versalles", desc: "El palacio real más impresionante." },
        { id: 6, hora: "15:00", tipo: "compras", titulo: "Champs-Élysées", desc: "La avenida más famosa del mundo." },
        { id: 7, hora: "19:00", tipo: "ocio", titulo: "Crucero por el Sena", desc: "Vistas únicas de París desde el río." },
      ]},
      { dia: 3, fecha: "14 Jul", actividades: [
        { id: 8, hora: "10:00", tipo: "cultura", titulo: "Musée d'Orsay", desc: "Arte impresionista de clase mundial." },
        { id: 9, hora: "14:00", tipo: "ocio", titulo: "Jardín de Luxemburgo", desc: "El parque más elegante de París." },
      ]},
    ]
  },
  {
    ciudad: "Roma",
    dias: [
      { dia: 1, fecha: "15 Jul", actividades: [
        { id: 10, hora: "09:00", tipo: "cultura", titulo: "Coliseo Romano", desc: "El anfiteatro más grande del Imperio Romano." },
        { id: 11, hora: "12:00", tipo: "comida", titulo: "Almuerzo en Trastevere", desc: "El barrio más auténtico de Roma." },
        { id: 12, hora: "19:00", tipo: "ocio", titulo: "Fontana di Trevi", desc: "Lanza una moneda y pide un deseo." },
      ]},
      { dia: 2, fecha: "16 Jul", actividades: [
        { id: 13, hora: "09:00", tipo: "cultura", titulo: "Vaticano y Capilla Sixtina", desc: "Arte y espiritualidad en el corazón de Roma." },
        { id: 14, hora: "15:00", tipo: "compras", titulo: "Via Condotti", desc: "Las mejores tiendas de lujo de Roma." },
      ]},
    ]
  },
];

const tipoColores: { [key: string]: { bg: string; color: string; emoji: string } } = {
  cultura: { bg: "#f0f5ff", color: "#1667E6", emoji: "🏛" },
  comida: { bg: "#fff8e0", color: "#7a4800", emoji: "🍽" },
  cena: { bg: "#fff0f0", color: "#c0392b", emoji: "🍷" },
  compras: { bg: "#f0fff8", color: "#085041", emoji: "🛍" },
  ocio: { bg: "#f5f0ff", color: "#6b21a8", emoji: "🎭" },
};

export default function Itinerario() {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [ciudadActiva, setCiudadActiva] = useState("París");
  const [diaActivo, setDiaActivo] = useState(1);
  const [vista, setVista] = useState("dia");

  const ciudadData = itinerario.find(c => c.ciudad === ciudadActiva)!;
  const diaData = ciudadData.dias.find(d => d.dia === diaActivo)!;

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Montserrat',sans-serif", background: "#f5f7ff" }}>

      {/* TOPBAR */}
      <div style={{ background: "#0D0C56", padding: "11px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <Logo variant="teal" />
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <button onClick={() => router.back()} style={{ background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "50%", color: "rgba(255,255,255,0.8)", cursor: "pointer", marginRight: "8px", display: "flex", alignItems: "center", justifyContent: "center", width: "30px", height: "30px" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.18)"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)"}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          {!isMobile ? (
            ["Destinos", "Vuelos", "Hospedaje", "Itinerario", "Pasajeros", "Pago"].map((s, i) => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <div style={{ width: "22px", height: "22px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "800", background: i < 3 ? "#3ED5A9" : i === 3 ? "#1667E6" : "rgba(255,255,255,0.15)", color: i < 4 ? "#0D0C56" : "rgba(255,255,255,0.4)" }}>{i < 3 ? "✓" : i + 1}</div>
                  <span style={{ fontSize: "11px", fontWeight: "600", color: i === 3 ? "#fff" : i < 3 ? "#3ED5A9" : "rgba(255,255,255,0.4)" }}>{s}</span>
                </div>
                {i < 5 && <div style={{ width: "16px", height: "1px", background: "rgba(255,255,255,0.15)" }} />}
              </div>
            ))
          ) : (
            <div style={{ fontSize: "11px", fontWeight: "700", color: "#fff" }}>Paso 4 de 6 · Itinerario</div>
          )}
        </div>
        <div style={{ width: isMobile ? "0" : "120px" }} />
      </div>

      {/* BODY */}
      <div style={{ display: isMobile ? "flex" : "grid", flexDirection: isMobile ? "column" : undefined, gridTemplateColumns: isMobile ? undefined : "1fr 300px", gap: "20px", padding: isMobile ? "16px" : "20px", flex: 1, maxWidth: "1100px", margin: "0 auto", width: "100%", boxSizing: "border-box" }}>

        {/* IZQUIERDA */}
        <div>
          {/* TABS CIUDADES */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
            {itinerario.map(c => (
              <button
                key={c.ciudad}
                onClick={() => { setCiudadActiva(c.ciudad); setDiaActivo(1); }}
                style={{ padding: "8px 16px", border: `1.5px solid ${ciudadActiva === c.ciudad ? "#1667E6" : "#e8edf8"}`, borderRadius: "50px", fontSize: "12px", fontWeight: "700", cursor: "pointer", background: ciudadActiva === c.ciudad ? "#1667E6" : "#fff", color: ciudadActiva === c.ciudad ? "#fff" : "#0D0C56" }}
              >
                {c.ciudad}
              </button>
            ))}
          </div>

          {/* TABS DÍAS */}
          <div style={{ display: "flex", gap: "6px", marginBottom: "16px", overflowX: "auto" }}>
            {ciudadData.dias.map(d => (
              <button
                key={d.dia}
                onClick={() => setDiaActivo(d.dia)}
                style={{ padding: "6px 12px", border: `1.5px solid ${diaActivo === d.dia ? "#1667E6" : "#e8edf8"}`, borderRadius: "50px", fontSize: "11px", fontWeight: "700", cursor: "pointer", background: diaActivo === d.dia ? "#f0f5ff" : "#fff", color: diaActivo === d.dia ? "#1667E6" : "#888", whiteSpace: "nowrap", flexShrink: 0 }}
              >
                Día {d.dia} · {d.fecha}
              </button>
            ))}
          </div>

          {/* ACTIVIDADES */}
          <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid #f0f2fa", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "13px", color: "#0D0C56" }}>{ciudadActiva} · Día {diaActivo}</div>
                <div style={{ fontSize: "11px", color: "#888", marginTop: "2px" }}>{diaData.fecha} · {diaData.actividades.length} actividades</div>
              </div>
            </div>

            <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
              {diaData.actividades.map(a => {
                const tipo = tipoColores[a.tipo] || tipoColores.cultura;
                return (
                  <div key={a.id} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <div style={{ fontWeight: "700", fontSize: "11px", color: "#888", width: "44px", flexShrink: 0, paddingTop: "10px" }}>{a.hora}</div>
                    <div style={{ flex: 1, background: tipo.bg, borderRadius: "10px", padding: "10px 12px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "2px" }}>
                        <span style={{ fontSize: "14px" }}>{tipo.emoji}</span>
                        <span style={{ fontWeight: "800", fontSize: "12px", color: "#0D0C56" }}>{a.titulo}</span>
                      </div>
                      <div style={{ fontSize: "11px", color: "#666" }}>{a.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ padding: "12px 16px", borderTop: "1px solid #f0f2fa" }}>
              <div style={{ background: "#f0f5ff", border: "1.5px solid #e0eaff", borderRadius: "10px", padding: "10px 12px", fontSize: "11px", color: "#1667E6" }}>
                ✨ <strong>Itinerario automático.</strong> Podrás editar actividades desde <strong>Mis viajes</strong> después de tu compra.
              </div>
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div>
          <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", overflow: "hidden", marginBottom: "12px" }}>
            <div style={{ padding: "10px 14px", background: "#0D0C56" }}>
              <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "12px", color: "#fff" }}>Tu viaje</div>
            </div>
            <div style={{ padding: "12px 14px" }}>
              {itinerario.map(c => (
                <div key={c.ciudad} style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", padding: "5px 0", borderBottom: "1px solid #f5f7ff" }}>
                  <span style={{ color: "#888" }}>{c.ciudad}</span>
                  <span style={{ fontWeight: "600", color: "#0D0C56" }}>{c.dias.length} días</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "8px" }}>
                <span style={{ fontWeight: "700", fontSize: "12px", color: "#0D0C56" }}>Total</span>
                <span style={{ fontWeight: "700", fontSize: "12px", color: "#1667E6" }}>5 días</span>
              </div>
            </div>
          </div>

          <Link
            href="/pasajeros-flujo"
            style={{ width: "100%", padding: "13px", backgroundColor: "#FF5C00", color: "#fff", border: "none", borderRadius: "13px", fontFamily: "sans-serif", fontWeight: "800", fontSize: "14px", cursor: "pointer", textDecoration: "none", display: "block", textAlign: "center", boxSizing: "border-box" as const }}
          >
            Continuar → Pasajeros
          </Link>
        </div>
      </div>
    </div>
  );
}
