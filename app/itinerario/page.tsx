"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "../components/Logo";

const itinerarioData = [
  {
    ciudad: "París",
    dias: [
      {
        dia: 1,
        fecha: "12 Jul",
        actividades: [
          { hora: "09:00", tipo: "cultura", titulo: "Torre Eiffel", desc: "Visita al monumento más icónico de París. Se recomienda ir temprano.", duracion: "2h" },
          { hora: "12:00", tipo: "comida", titulo: "Almuerzo en Le Procope", desc: "El café más antiguo de París, cerca del Barrio Latino.", duracion: "1.5h" },
          { hora: "15:00", tipo: "cultura", titulo: "Museo del Louvre", desc: "El museo más visitado del mundo. No te pierdas la Mona Lisa.", duracion: "3h" },
          { hora: "20:00", tipo: "cena", titulo: "Cena en Montmartre", desc: "Cena en uno de los barrios más bohemios y pintorescos de París.", duracion: "2h" },
        ]
      },
      {
        dia: 2,
        fecha: "13 Jul",
        actividades: [
          { hora: "10:00", tipo: "cultura", titulo: "Palacio de Versalles", desc: "Excursión de día completo al palacio real más impresionante de Europa.", duracion: "4h" },
          { hora: "15:00", tipo: "compras", titulo: "Champs-Élysées", desc: "La avenida más famosa del mundo para compras y paseo.", duracion: "2h" },
          { hora: "19:00", tipo: "ocio", titulo: "Crucero por el Sena", desc: "Paseo en barco con vistas panorámicas de París al atardecer.", duracion: "1.5h" },
        ]
      },
      {
        dia: 3,
        fecha: "14 Jul",
        actividades: [
          { hora: "09:00", tipo: "cultura", titulo: "Catedral Notre-Dame", desc: "Visita a la restaurada catedral gótica más famosa de Francia.", duracion: "1.5h" },
          { hora: "11:00", tipo: "cultura", titulo: "Centro Pompidou", desc: "Arte moderno y contemporáneo en un edificio arquitectónicamente único.", duracion: "2h" },
          { hora: "15:00", tipo: "ocio", titulo: "Jardín de Luxemburgo", desc: "Tarde relajada en los jardines más bellos de París.", duracion: "2h" },
        ]
      },
    ]
  },
  {
    ciudad: "Roma",
    dias: [
      {
        dia: 1,
        fecha: "15 Jul",
        actividades: [
          { hora: "09:00", tipo: "cultura", titulo: "Coliseo Romano", desc: "El anfiteatro más grande del Imperio Romano. Reserva con anticipación.", duracion: "2h" },
          { hora: "12:00", tipo: "comida", titulo: "Almuerzo en Trastevere", desc: "El barrio más auténtico de Roma con las mejores trattorias.", duracion: "1.5h" },
          { hora: "15:00", tipo: "cultura", titulo: "Foro Romano", desc: "El corazón de la antigua Roma. Historia a cada paso.", duracion: "2h" },
          { hora: "19:00", tipo: "ocio", titulo: "Fontana di Trevi", desc: "Lanza una moneda y pide un deseo al anochecer.", duracion: "1h" },
        ]
      },
      {
        dia: 2,
        fecha: "16 Jul",
        actividades: [
          { hora: "08:00", tipo: "cultura", titulo: "Museos Vaticanos", desc: "La mayor colección de arte del mundo. Reserva con meses de anticipación.", duracion: "4h" },
          { hora: "13:00", tipo: "comida", titulo: "Pizza en el Vaticano", desc: "Las mejores pizzerias están justo afuera de los muros vaticanos.", duracion: "1h" },
          { hora: "15:00", tipo: "cultura", titulo: "Basílica de San Pedro", desc: "La iglesia más grande del mundo y residencia del Papa.", duracion: "2h" },
        ]
      },
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
  const [ciudadActiva, setCiudadActiva] = useState("París");
  const [diaActivo, setDiaActivo] = useState(1);
  const [vista, setVista] = useState<"dia" | "resumen">("dia");

  const ciudadData = itinerarioData.find(i => i.ciudad === ciudadActiva)!;
  const diaData = ciudadData.dias.find(d => d.dia === diaActivo)!;

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Montserrat',sans-serif", background: "#f5f7ff" }}>

      {/* TOPBAR */}
      <div style={{ background: "#0D0C56", padding: "11px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <Logo variant="teal" />
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {["Destinos", "Vuelos", "Hospedaje", "Itinerario", "Pago"].map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "22px", height: "22px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "800", background: i < 3 ? "#3ED5A9" : i === 3 ? "#1667E6" : "rgba(255,255,255,0.15)", color: i < 4 ? "#0D0C56" : "rgba(255,255,255,0.4)" }}>{i < 3 ? "✓" : i + 1}</div>
                <span style={{ fontSize: "11px", fontWeight: "600", color: i === 3 ? "#fff" : i < 3 ? "#3ED5A9" : "rgba(255,255,255,0.4)" }}>{s}</span>
              </div>
              {i < 4 && <div style={{ width: "24px", height: "1px", background: "rgba(255,255,255,0.15)" }} />}
            </div>
          ))}
        </div>
        <div style={{ width: "120px" }} />
      </div>

      {/* BODY */}
      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "20px", padding: "20px", flex: 1, maxWidth: "1100px", margin: "0 auto", width: "100%" }}>

        {/* SIDEBAR IZQUIERDO */}
        <div>
          {/* CIUDADES */}
          <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", overflow: "hidden", marginBottom: "12px" }}>
            <div style={{ padding: "10px 14px", background: "#0D0C56" }}>
              <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "12px", color: "#fff" }}>Ciudades</div>
            </div>
            <div style={{ padding: "8px" }}>
              {itinerarioData.map(c => (
                <button
                  key={c.ciudad}
                  onClick={() => { setCiudadActiva(c.ciudad); setDiaActivo(1); }}
                  style={{ width: "100%", padding: "10px 12px", border: "none", borderRadius: "8px", background: ciudadActiva === c.ciudad ? "#f0f5ff" : "transparent", color: ciudadActiva === c.ciudad ? "#1667E6" : "#0D0C56", fontWeight: ciudadActiva === c.ciudad ? "700" : "600", fontSize: "12px", cursor: "pointer", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                  {c.ciudad}
                  <span style={{ fontSize: "10px", color: "#888" }}>{c.dias.length} días</span>
                </button>
              ))}
            </div>
          </div>

          {/* DÍAS */}
          <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", overflow: "hidden", marginBottom: "12px" }}>
            <div style={{ padding: "10px 14px", background: "#0D0C56" }}>
              <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "12px", color: "#fff" }}>Días en {ciudadActiva}</div>
            </div>
            <div style={{ padding: "8px" }}>
              {ciudadData.dias.map(d => (
                <button
                  key={d.dia}
                  onClick={() => { setDiaActivo(d.dia); setVista("dia"); }}
                  style={{ width: "100%", padding: "10px 12px", border: "none", borderRadius: "8px", background: diaActivo === d.dia && vista === "dia" ? "#f0f5ff" : "transparent", color: diaActivo === d.dia && vista === "dia" ? "#1667E6" : "#0D0C56", fontWeight: diaActivo === d.dia && vista === "dia" ? "700" : "600", fontSize: "12px", cursor: "pointer", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                  <span>Día {d.dia}</span>
                  <span style={{ fontSize: "10px", color: "#888" }}>{d.fecha} · {d.actividades.length} act.</span>
                </button>
              ))}
            </div>
          </div>

          {/* VISTA RESUMEN */}
          <button
            onClick={() => setVista("resumen")}
            style={{ width: "100%", padding: "10px", border: `1.5px solid ${vista === "resumen" ? "#1667E6" : "#e8edf8"}`, borderRadius: "10px", background: vista === "resumen" ? "#f0f5ff" : "#fff", color: vista === "resumen" ? "#1667E6" : "#0D0C56", fontWeight: "700", fontSize: "12px", cursor: "pointer" }}
          >
            📋 Ver resumen completo
          </button>
          <div style={{ marginTop: "10px", background: "#f0f5ff", border: "1.5px solid #e0eaff", borderRadius: "10px", padding: "10px 12px", fontSize: "11px", color: "#888", lineHeight: "1.5" }}>
  ✨ <strong style={{ color: "#1667E6" }}>Itinerario automático.</strong> Podrás editar actividades desde <strong style={{ color: "#1667E6" }}>Mis viajes</strong> después de tu compra.
</div>
        </div>

        {/* CONTENIDO PRINCIPAL */}
        <div>

          {/* VISTA DÍA */}
          {vista === "dia" && (
            <div>
              <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", overflow: "hidden", marginBottom: "16px" }}>
                <div style={{ padding: "14px 18px", borderBottom: "1px solid #f0f2fa", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "16px", color: "#0D0C56" }}>{ciudadActiva} · Día {diaActivo}</div>
                    <div style={{ fontSize: "12px", color: "#888", marginTop: "2px" }}>{diaData.fecha} · {diaData.actividades.length} actividades</div>
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    {diaActivo > 1 && (
                      <button onClick={() => setDiaActivo(diaActivo - 1)} style={{ padding: "7px 14px", border: "1.5px solid #e8edf8", borderRadius: "8px", background: "#fff", fontSize: "12px", fontWeight: "600", cursor: "pointer", color: "#0D0C56" }}>‹ Anterior</button>
                    )}
                    {diaActivo < ciudadData.dias.length && (
                      <button onClick={() => setDiaActivo(diaActivo + 1)} style={{ padding: "7px 14px", border: "1.5px solid #1667E6", borderRadius: "8px", background: "#1667E6", fontSize: "12px", fontWeight: "600", cursor: "pointer", color: "#fff" }}>Siguiente ›</button>
                    )}
                  </div>
                </div>
                <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: "12px" }}>
                  {diaData.actividades.map((a, idx) => {
                    const tipo = tipoColores[a.tipo] || tipoColores.cultura;
                    return (
                      <div key={idx} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                        {/* LÍNEA DE TIEMPO */}
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                          <div style={{ fontWeight: "700", fontSize: "11px", color: "#888", marginBottom: "6px", width: "44px", textAlign: "center" }}>{a.hora}</div>
                          <div style={{ width: "2px", flex: 1, background: idx < diaData.actividades.length - 1 ? "#e8edf8" : "transparent", minHeight: "40px" }} />
                        </div>
                        {/* ACTIVIDAD */}
                        <div style={{ flex: 1, background: tipo.bg, borderRadius: "10px", padding: "12px 14px", border: `1px solid ${tipo.color}20` }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                            <span style={{ fontSize: "16px" }}>{tipo.emoji}</span>
                            <span style={{ fontWeight: "800", fontSize: "13px", color: "#0D0C56" }}>{a.titulo}</span>
                            <span style={{ fontSize: "10px", background: "#fff", color: tipo.color, padding: "2px 8px", borderRadius: "50px", fontWeight: "600", border: `1px solid ${tipo.color}30`, marginLeft: "auto" }}>{a.duracion}</span>
                          </div>
                          <div style={{ fontSize: "12px", color: "#666", lineHeight: "1.5" }}>{a.desc}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* VISTA RESUMEN */}
          {vista === "resumen" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {itinerarioData.map(c => (
                <div key={c.ciudad} style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", overflow: "hidden" }}>
                  <div style={{ padding: "12px 18px", background: "#0D0C56", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "14px", color: "#fff" }}>{c.ciudad}</div>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>{c.dias.length} días · {c.dias.reduce((a, d) => a + d.actividades.length, 0)} actividades</div>
                  </div>
                  <div style={{ padding: "14px 18px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
                    {c.dias.map(d => (
                      <div key={d.dia} style={{ border: "1.5px solid #e8edf8", borderRadius: "10px", padding: "12px" }}>
                        <div style={{ fontWeight: "800", fontSize: "12px", color: "#0D0C56", marginBottom: "8px" }}>Día {d.dia} · {d.fecha}</div>
                        {d.actividades.map((a, i) => {
                          const tipo = tipoColores[a.tipo] || tipoColores.cultura;
                          return (
                            <div key={i} style={{ display: "flex", gap: "6px", alignItems: "center", marginBottom: "4px" }}>
                              <span style={{ fontSize: "12px" }}>{tipo.emoji}</span>
                              <span style={{ fontSize: "11px", color: "#555" }}>{a.hora} · {a.titulo}</span>
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* BOTÓN CONTINUAR */}
          <div style={{ marginTop: "16px" }}>
            <button style={{ width: "100%", padding: "13px", backgroundColor: "#FF5C00", color: "#fff", border: "none", borderRadius: "13px", fontFamily: "sans-serif", fontWeight: "800", fontSize: "14px", cursor: "pointer" }}>
              <Link href="/pago" style={{ width: "100%", padding: "13px", backgroundColor: "#FF5C00", color: "#fff", border: "none", borderRadius: "13px", fontFamily: "sans-serif", fontWeight: "800", fontSize: "14px", cursor: "pointer", textDecoration: "none", display: "block", textAlign: "center", boxSizing: "border-box" as const }}>
  Continuar → Pago
</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
