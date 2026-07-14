"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "../../components/Logo";

const actividadesIniciales = [
  {
    ciudad: "París",
    dias: [
      {
        dia: 1, fecha: "12 Jul",
        actividades: [
          { id: 1, hora: "09:00", tipo: "cultura", titulo: "Torre Eiffel", desc: "Visita al monumento más icónico de París." },
          { id: 2, hora: "12:00", tipo: "comida", titulo: "Almuerzo en Le Procope", desc: "El café más antiguo de París." },
          { id: 3, hora: "15:00", tipo: "cultura", titulo: "Museo del Louvre", desc: "El museo más visitado del mundo." },
          { id: 4, hora: "20:00", tipo: "cena", titulo: "Cena en Montmartre", desc: "Barrio bohemio y pintoresco." },
        ]
      },
      {
        dia: 2, fecha: "13 Jul",
        actividades: [
          { id: 5, hora: "10:00", tipo: "cultura", titulo: "Palacio de Versalles", desc: "El palacio real más impresionante de Europa." },
          { id: 6, hora: "15:00", tipo: "compras", titulo: "Champs-Élysées", desc: "La avenida más famosa del mundo." },
        ]
      },
    ]
  },
  {
    ciudad: "Roma",
    dias: [
      {
        dia: 1, fecha: "15 Jul",
        actividades: [
          { id: 7, hora: "09:00", tipo: "cultura", titulo: "Coliseo Romano", desc: "El anfiteatro más grande del Imperio Romano." },
          { id: 8, hora: "12:00", tipo: "comida", titulo: "Almuerzo en Trastevere", desc: "El barrio más auténtico de Roma." },
          { id: 9, hora: "19:00", tipo: "ocio", titulo: "Fontana di Trevi", desc: "Lanza una moneda y pide un deseo." },
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

const tiposActividad = ["cultura", "comida", "cena", "compras", "ocio"];

export default function EditarItinerario() {
  const [itinerario, setItinerario] = useState(actividadesIniciales);
  const [ciudadActiva, setCiudadActiva] = useState("París");
  const [diaActivo, setDiaActivo] = useState(1);
  const [guardado, setGuardado] = useState(false);
  const [agregando, setAgregando] = useState(false);
  const [nueva, setNueva] = useState({ hora: "", tipo: "cultura", titulo: "", desc: "" });

  const ciudadData = itinerario.find(c => c.ciudad === ciudadActiva)!;
  const diaData = ciudadData.dias.find(d => d.dia === diaActivo)!;

  const eliminarActividad = (id: number) => {
    setItinerario(itinerario.map(c => ({
      ...c,
      dias: c.dias.map(d => ({
        ...d,
        actividades: d.actividades.filter(a => a.id !== id)
      }))
    })));
  };

  const agregarActividad = () => {
    if (!nueva.titulo || !nueva.hora) return;
    const newId = Math.max(...itinerario.flatMap(c => c.dias.flatMap(d => d.actividades.map(a => a.id)))) + 1;
    setItinerario(itinerario.map(c =>
      c.ciudad === ciudadActiva ? {
        ...c,
        dias: c.dias.map(d =>
          d.dia === diaActivo ? {
            ...d,
            actividades: [...d.actividades, { id: newId, ...nueva }].sort((a, b) => a.hora.localeCompare(b.hora))
          } : d
        )
      } : c
    ));
    setNueva({ hora: "", tipo: "cultura", titulo: "", desc: "" });
    setAgregando(false);
  };

  const guardar = () => {
    setGuardado(true);
    setTimeout(() => setGuardado(false), 2000);
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        .itin-wrap {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          font-family: 'Montserrat', sans-serif;
          background: #f5f7ff;
          width: 100%;
          max-width: 100vw;
          overflow-x: hidden;
        }
        .itin-nav {
          background: #1667E6;
          padding: 12px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
        }
        .itin-nav-center {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 28px;
          align-items: center;
        }
        .itin-nav-mobile { display: none; }
        .itin-hero {
          background: #1667E6;
          padding: 20px 32px 40px;
          margin-bottom: -20px;
        }
        .itin-body {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 20px 40px;
          width: 100%;
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 20px;
        }
        .itin-sidebar { padding-top: 28px; }
        .itin-sidebar-mobile { display: none; }
        .itin-content { padding-top: 28px; overflow: hidden; }
        .itin-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 10px;
        }
        .itin-footer {
          background: #0D0C56;
          padding: 32px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
        }
        .itin-footer-links { display: flex; gap: 24px; }

        @media (max-width: 768px) {
          .itin-nav { padding: 12px 16px; }
          .itin-nav-center { display: none; }
          .itin-nav-mobile { display: flex; background: #1667E6; padding: 8px 16px; gap: 16px; border-top: 1px solid rgba(255,255,255,0.1); }
          .itin-hero { padding: 16px 16px 36px; }
          .itin-body { grid-template-columns: 1fr; padding: 0 12px 24px; }
          .itin-sidebar { display: none; }
          .itin-sidebar-mobile { display: block; padding-top: 28px; }
          .itin-content { padding-top: 12px; }
          .itin-form-grid { grid-template-columns: 1fr; }
          .itin-footer { flex-direction: column; gap: 16px; padding: 24px 16px; align-items: flex-start; }
          .itin-footer-links { flex-direction: column; gap: 8px; }
        }
      `}</style>

      <div className="itin-wrap">

        {/* NAV */}
        <nav className="itin-nav">
          <Link href="/"><Logo variant="naranja" /></Link>
          <div className="itin-nav-center">
            <Link href="/mis-viajes" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none", fontWeight: "600" }}>Mis viajes</Link>
            <Link href="/perfil" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none", fontWeight: "600" }}>Perfil</Link>
            <Link href="/soporte" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none", fontWeight: "600" }}>Soporte</Link>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button onClick={() => window.history.back()} style={{ background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "50%", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", width: "30px", height: "30px" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
            <Link href="/mis-viajes" style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", textDecoration: "none", fontWeight: "600" }}>Mis viajes</Link>
          </div>
        </nav>
        <div className="itin-nav-mobile">
          <Link href="/mis-viajes" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none", fontWeight: "600" }}>Mis viajes</Link>
          <Link href="/perfil" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none", fontWeight: "600" }}>Perfil</Link>
          <Link href="/soporte" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none", fontWeight: "600" }}>Soporte</Link>
        </div>

        {/* HERO */}
        <div className="itin-hero">
          <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", marginBottom: "4px" }}>Reserva TP-2024-8847</div>
          <h1 style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "22px", color: "#fff", marginBottom: "2px" }}>Editar itinerario</h1>
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)" }}>París · Roma · 12–17 Jul 2026</p>
        </div>

        {/* BODY */}
        <div className="itin-body">

          {/* SIDEBAR DESKTOP */}
          <div className="itin-sidebar">
            <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", overflow: "hidden", marginBottom: "12px" }}>
              <div style={{ padding: "10px 14px", background: "#0D0C56" }}>
                <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "12px", color: "#fff" }}>Ciudades</div>
              </div>
              <div style={{ padding: "8px" }}>
                {itinerario.map(c => (
                  <button key={c.ciudad} onClick={() => { setCiudadActiva(c.ciudad); setDiaActivo(1); }} style={{ width: "100%", padding: "10px 12px", border: "none", borderRadius: "8px", background: ciudadActiva === c.ciudad ? "#f0f5ff" : "transparent", color: ciudadActiva === c.ciudad ? "#1667E6" : "#0D0C56", fontWeight: ciudadActiva === c.ciudad ? "700" : "600", fontSize: "12px", cursor: "pointer", textAlign: "left", display: "flex", justifyContent: "space-between", fontFamily: "Montserrat, sans-serif" }}>
                    {c.ciudad}
                    <span style={{ fontSize: "10px", color: "#888" }}>{c.dias.length} días</span>
                  </button>
                ))}
              </div>
            </div>
            <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", overflow: "hidden" }}>
              <div style={{ padding: "10px 14px", background: "#0D0C56" }}>
                <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "12px", color: "#fff" }}>Días</div>
              </div>
              <div style={{ padding: "8px" }}>
                {ciudadData.dias.map(d => (
                  <button key={d.dia} onClick={() => setDiaActivo(d.dia)} style={{ width: "100%", padding: "10px 12px", border: "none", borderRadius: "8px", background: diaActivo === d.dia ? "#f0f5ff" : "transparent", color: diaActivo === d.dia ? "#1667E6" : "#0D0C56", fontWeight: diaActivo === d.dia ? "700" : "600", fontSize: "12px", cursor: "pointer", textAlign: "left", display: "flex", justifyContent: "space-between", fontFamily: "Montserrat, sans-serif" }}>
                    <span>Día {d.dia}</span>
                    <span style={{ fontSize: "10px", color: "#888" }}>{d.fecha}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* SIDEBAR MÓVIL */}
          <div className="itin-sidebar-mobile">
            <div style={{ display: "flex", gap: "8px", marginBottom: "12px", overflowX: "auto" }}>
              {itinerario.map(c => (
                <button key={c.ciudad} onClick={() => { setCiudadActiva(c.ciudad); setDiaActivo(1); }} style={{ padding: "7px 14px", border: `1.5px solid ${ciudadActiva === c.ciudad ? "#1667E6" : "#e8edf8"}`, borderRadius: "50px", fontSize: "12px", fontWeight: "700", cursor: "pointer", background: ciudadActiva === c.ciudad ? "#1667E6" : "#fff", color: ciudadActiva === c.ciudad ? "#fff" : "#0D0C56", whiteSpace: "nowrap", fontFamily: "Montserrat, sans-serif" }}>
                  {c.ciudad}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: "8px", marginBottom: "12px", overflowX: "auto" }}>
              {ciudadData.dias.map(d => (
                <button key={d.dia} onClick={() => setDiaActivo(d.dia)} style={{ padding: "7px 14px", border: `1.5px solid ${diaActivo === d.dia ? "#1667E6" : "#e8edf8"}`, borderRadius: "50px", fontSize: "12px", fontWeight: "700", cursor: "pointer", background: diaActivo === d.dia ? "#1667E6" : "#fff", color: diaActivo === d.dia ? "#fff" : "#0D0C56", whiteSpace: "nowrap", fontFamily: "Montserrat, sans-serif" }}>
                  Día {d.dia} · {d.fecha}
                </button>
              ))}
            </div>
          </div>

          {/* CONTENIDO */}
          <div className="itin-content">
            <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", overflow: "hidden" }}>
              <div style={{ padding: "14px 18px", borderBottom: "1px solid #f0f2fa", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
                <div>
                  <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "14px", color: "#0D0C56" }}>{ciudadActiva} · Día {diaActivo}</div>
                  <div style={{ fontSize: "11px", color: "#888", marginTop: "2px" }}>{diaData.fecha} · {diaData.actividades.length} actividades</div>
                </div>
                <button onClick={() => setAgregando(!agregando)} style={{ padding: "8px 16px", background: "#1667E6", color: "#fff", border: "none", borderRadius: "8px", fontSize: "12px", fontWeight: "700", cursor: "pointer", fontFamily: "Montserrat, sans-serif" }}>
                  + Agregar actividad
                </button>
              </div>

              {agregando && (
                <div style={{ padding: "14px 18px", background: "#f0f5ff", borderBottom: "1px solid #e0eaff" }}>
                  <div className="itin-form-grid">
                    <div>
                      <div style={{ fontSize: "10px", fontWeight: "700", color: "#1667E6", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "4px" }}>Hora</div>
                      <input type="time" value={nueva.hora} onChange={e => setNueva({ ...nueva, hora: e.target.value })} style={{ width: "100%", border: "1.5px solid #e0eaff", borderRadius: "8px", padding: "8px 10px", fontSize: "12px", outline: "none", boxSizing: "border-box" as const }} />
                    </div>
                    <div>
                      <div style={{ fontSize: "10px", fontWeight: "700", color: "#1667E6", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "4px" }}>Tipo</div>
                      <select value={nueva.tipo} onChange={e => setNueva({ ...nueva, tipo: e.target.value })} style={{ width: "100%", border: "1.5px solid #e0eaff", borderRadius: "8px", padding: "8px 10px", fontSize: "12px", outline: "none", background: "#fff", boxSizing: "border-box" as const }}>
                        {tiposActividad.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                      </select>
                    </div>
                  </div>
                  <div style={{ marginBottom: "10px" }}>
                    <div style={{ fontSize: "10px", fontWeight: "700", color: "#1667E6", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "4px" }}>Título</div>
                    <input value={nueva.titulo} onChange={e => setNueva({ ...nueva, titulo: e.target.value })} placeholder="Nombre de la actividad" style={{ width: "100%", border: "1.5px solid #e0eaff", borderRadius: "8px", padding: "8px 10px", fontSize: "12px", outline: "none", boxSizing: "border-box" as const }} />
                  </div>
                  <div style={{ marginBottom: "12px" }}>
                    <div style={{ fontSize: "10px", fontWeight: "700", color: "#1667E6", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "4px" }}>Descripción</div>
                    <input value={nueva.desc} onChange={e => setNueva({ ...nueva, desc: e.target.value })} placeholder="Descripción breve" style={{ width: "100%", border: "1.5px solid #e0eaff", borderRadius: "8px", padding: "8px 10px", fontSize: "12px", outline: "none", boxSizing: "border-box" as const }} />
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button onClick={agregarActividad} style={{ padding: "8px 20px", background: "#FF5C00", color: "#fff", border: "none", borderRadius: "8px", fontSize: "12px", fontWeight: "700", cursor: "pointer", fontFamily: "Montserrat, sans-serif" }}>Agregar</button>
                    <button onClick={() => setAgregando(false)} style={{ padding: "8px 16px", background: "#fff", color: "#888", border: "1.5px solid #e8edf8", borderRadius: "8px", fontSize: "12px", fontWeight: "600", cursor: "pointer", fontFamily: "Montserrat, sans-serif" }}>Cancelar</button>
                  </div>
                </div>
              )}

              <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: "10px" }}>
                {diaData.actividades.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "32px 0", color: "#aaa", fontSize: "12px" }}>
                    No hay actividades — agrega una con el botón de arriba
                  </div>
                ) : (
                  diaData.actividades.map(a => {
                    const tipo = tipoColores[a.tipo] || tipoColores.cultura;
                    return (
                      <div key={a.id} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                        <div style={{ fontWeight: "700", fontSize: "11px", color: "#888", width: "44px", flexShrink: 0, paddingTop: "12px" }}>{a.hora}</div>
                        <div style={{ flex: 1, background: tipo.bg, borderRadius: "10px", padding: "12px 14px", border: `1px solid ${tipo.color}20` }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px", flexWrap: "wrap" }}>
                            <span style={{ fontSize: "16px" }}>{tipo.emoji}</span>
                            <span style={{ fontWeight: "800", fontSize: "13px", color: "#0D0C56" }}>{a.titulo}</span>
                            <span style={{ fontSize: "10px", background: "#fff", color: tipo.color, padding: "2px 8px", borderRadius: "50px", fontWeight: "600", marginLeft: "auto" }}>{a.tipo}</span>
                          </div>
                          <div style={{ fontSize: "12px", color: "#666" }}>{a.desc}</div>
                        </div>
                        <button onClick={() => eliminarActividad(a.id)} style={{ width: "32px", height: "32px", borderRadius: "50%", border: "1.5px solid #ffd0d0", background: "#ffeaea", color: "#c0392b", fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "8px" }}>×</button>
                      </div>
                    );
                  })
                )}
              </div>

              <div style={{ padding: "14px 18px", borderTop: "1px solid #f0f2fa", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <Link href="/mis-viajes" style={{ padding: "10px 20px", background: "#f5f7ff", color: "#888", border: "1.5px solid #e8edf8", borderRadius: "8px", fontSize: "12px", fontWeight: "700", textDecoration: "none" }}>Cancelar</Link>
                <button onClick={guardar} style={{ padding: "10px 24px", background: guardado ? "#3ED5A9" : "#FF5C00", color: "#fff", border: "none", borderRadius: "8px", fontSize: "12px", fontWeight: "700", cursor: "pointer", transition: "background 0.3s", fontFamily: "Montserrat, sans-serif" }}>
                  {guardado ? "✓ Guardado" : "Guardar cambios"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="itin-footer">
          <div>
            <Logo variant="teal" />
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginTop: "12px" }}>© 2026 Trip Planner · no-reply@tripplanner.com.mx</p>
          </div>
          <div className="itin-footer-links">
            <Link href="/soporte?tab=faq" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Centro de ayuda</Link>
            <Link href="/soporte?tab=chat" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Contacto</Link>
            <Link href="/privacidad" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Política de privacidad</Link>
          </div>
        </footer>
      </div>
    </>
  );
}
