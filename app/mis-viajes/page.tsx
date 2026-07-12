"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "../components/Logo";

const viajes = [
  {
    id: 1,
    destinos: ["París", "Roma"],
    fechas: "12 – 17 Jul 2026",
    estado: "confirmado",
    total: "$3,716 USD",
    codigo: "TP-2024-8847",
    vuelos: [
      { tramo: "CDMX → París", fecha: "12 Jul", hora: "06:30", aerolinea: "Aeroméxico" },
      { tramo: "París → Roma", fecha: "15 Jul", hora: "09:15", aerolinea: "Air France" },
      { tramo: "Roma → CDMX", fecha: "17 Jul", hora: "11:00", aerolinea: "Iberia" },
    ],
    hoteles: [
      { ciudad: "París", nombre: "Hotel Le Marais", noches: 3 },
      { ciudad: "Roma", nombre: "Hotel Roma Centro", noches: 2 },
    ],
  },
  {
    id: 2,
    destinos: ["Cancún"],
    fechas: "20 – 25 Ago 2025",
    estado: "completado",
    total: "$1,240 USD",
    codigo: "TP-2024-5521",
    vuelos: [
      { tramo: "CDMX → Cancún", fecha: "20 Ago", hora: "08:00", aerolinea: "Volaris" },
      { tramo: "Cancún → CDMX", fecha: "25 Ago", hora: "17:30", aerolinea: "Volaris" },
    ],
    hoteles: [
      { ciudad: "Cancún", nombre: "Hotel Xcaret", noches: 5 },
    ],
  },
];

const estadoColor: { [key: string]: { bg: string; color: string; label: string } } = {
  confirmado: { bg: "#e8fff5", color: "#085041", label: "Confirmado" },
  completado: { bg: "#f0f5ff", color: "#1667E6", label: "Completado" },
  cancelado: { bg: "#fff0f0", color: "#c0392b", label: "Cancelado" },
};

export default function MisViajes() {
  const [tab, setTab] = useState("viajes");
  const [viajeExpandido, setViajeExpandido] = useState<number | null>(1);

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        .mv-wrap {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          font-family: 'Montserrat', sans-serif;
          background: #f5f7ff;
          width: 100%;
          max-width: 100vw;
          overflow-x: hidden;
        }
        .mv-nav {
          background: #0D0C56;
          padding: 12px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
        }
        .mv-nav-links {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 4px;
          align-items: center;
        }
        .mv-body {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 20px;
          padding: 20px;
          flex: 1;
          max-width: 1100px;
          margin: 0 auto;
          width: 100%;
        }
        .mv-sidebar { display: flex; flex-direction: column; gap: 8px; }
        .mv-sidebar-mobile { display: none; margin-bottom: 16px; }
        .mv-tabs-mobile {
          display: none;
          gap: 8px;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        @media (max-width: 768px) {
          .mv-nav { padding: 12px 16px; }
          .mv-nav-links { display: none; }
          .mv-body { grid-template-columns: 1fr; padding: 12px; }
          .mv-sidebar { display: none; }
          .mv-sidebar-mobile { display: block; }
          .mv-tabs-mobile { display: flex; }
        }
      `}</style>

      <div className="mv-wrap">

        {/* NAV */}
        <nav className="mv-nav">
          <Link href="/"><Logo variant="teal" /></Link>
          <div className="mv-nav-links">
            {["mis-viajes", "perfil", "soporte"].map((item, i) => {
              const labels = ["Mis viajes", "Perfil", "Soporte"];
              const hrefs = ["/mis-viajes", "/perfil", "/soporte"];
              const activo = item === "mis-viajes";
              return (
                <Link key={item} href={hrefs[i]} style={{ fontSize: "13px", color: activo ? "#fff" : "rgba(255,255,255,0.6)", textDecoration: "none", fontWeight: activo ? "700" : "600", padding: "6px 14px", borderRadius: "50px", background: activo ? "rgba(255,255,255,0.15)" : "transparent" }}>
                  {labels[i]}
                </Link>
              );
            })}
          </div>
          <Link href="/" style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", textDecoration: "none", fontWeight: "600" }}>← Inicio</Link>
        </nav>

        {/* BODY */}
        <div className="mv-body">

          {/* SIDEBAR DESKTOP */}
          <div className="mv-sidebar">
            {[
              { key: "viajes", label: "Mis viajes", icon: "✈" },
              { key: "documentos", label: "Documentos", icon: "📄" },
              { key: "calificar", label: "Calificar", icon: "⭐" },
            ].map(item => (
              <button key={item.key} onClick={() => setTab(item.key)} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 16px", borderRadius: "10px", background: tab === item.key ? "#1667E6" : "#fff", color: tab === item.key ? "#fff" : "#0D0C56", fontWeight: "700", fontSize: "13px", cursor: "pointer", textAlign: "left", fontFamily: "Montserrat, sans-serif", border: `1.5px solid ${tab === item.key ? "#1667E6" : "#e8edf8"}` }}>
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
            <div style={{ marginTop: "8px", borderTop: "1px solid #e8edf8", paddingTop: "8px" }}>
              <Link href="/soporte" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 16px", border: "1.5px solid #e8edf8", borderRadius: "10px", background: "#fff", color: "#0D0C56", fontWeight: "700", fontSize: "13px", textDecoration: "none" }}>
                <span>💬</span> Soporte
              </Link>
            </div>
          </div>

          {/* TABS MÓVIL */}
          <div className="mv-sidebar-mobile">
            <div className="mv-tabs-mobile">
              {[
                { key: "viajes", label: "Mis viajes" },
                { key: "documentos", label: "Documentos" },
                { key: "calificar", label: "Calificar" },
              ].map(item => (
                <button key={item.key} onClick={() => setTab(item.key)} style={{ padding: "8px 16px", border: `1.5px solid ${tab === item.key ? "#1667E6" : "#e8edf8"}`, borderRadius: "50px", fontSize: "12px", fontWeight: "700", cursor: "pointer", background: tab === item.key ? "#1667E6" : "#fff", color: tab === item.key ? "#fff" : "#0D0C56", whiteSpace: "nowrap", flexShrink: 0, fontFamily: "Montserrat, sans-serif" }}>
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* CONTENIDO */}
          <div style={{ overflow: "hidden", width: "100%" }}>

            {/* MIS VIAJES */}
            {tab === "viajes" && (
              <div>
                <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "18px", color: "#0D0C56", marginBottom: "16px" }}>Mis viajes</div>
                {viajes.map(v => {
                  const estado = estadoColor[v.estado];
                  const expandido = viajeExpandido === v.id;
                  return (
                    <div key={v.id} style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", overflow: "hidden", marginBottom: "12px" }}>
                      <button onClick={() => setViajeExpandido(expandido ? null : v.id)} style={{ width: "100%", padding: "16px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", cursor: "pointer", fontFamily: "Montserrat, sans-serif" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px", textAlign: "left" }}>
                          <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: "#f0f5ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", flexShrink: 0 }}>✈</div>
                          <div>
                            <div style={{ fontWeight: "800", fontSize: "14px", color: "#0D0C56", marginBottom: "2px" }}>{v.destinos.join(" · ")}</div>
                            <div style={{ fontSize: "11px", color: "#888" }}>{v.fechas} · {v.codigo}</div>
                          </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
                          <span style={{ fontSize: "10px", fontWeight: "700", background: estado.bg, color: estado.color, padding: "3px 10px", borderRadius: "50px" }}>{estado.label}</span>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d={expandido ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"}/>
                          </svg>
                        </div>
                      </button>

                      {expandido && (
                        <div style={{ borderTop: "1px solid #f0f2fa" }}>
                          <div style={{ padding: "14px 18px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                            <div>
                              <div style={{ fontSize: "10px", fontWeight: "700", color: "#1667E6", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "8px" }}>Vuelos</div>
                              {v.vuelos.map((vuelo, i) => (
                                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px solid #f5f7ff", fontSize: "11px" }}>
                                  <div>
                                    <div style={{ fontWeight: "700", color: "#0D0C56" }}>{vuelo.tramo}</div>
                                    <div style={{ color: "#888" }}>{vuelo.aerolinea} · {vuelo.fecha} {vuelo.hora}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div>
                              <div style={{ fontSize: "10px", fontWeight: "700", color: "#1667E6", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "8px" }}>Hospedaje</div>
                              {v.hoteles.map((hotel, i) => (
                                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px solid #f5f7ff", fontSize: "11px" }}>
                                  <div>
                                    <div style={{ fontWeight: "700", color: "#0D0C56" }}>{hotel.ciudad}</div>
                                    <div style={{ color: "#888" }}>{hotel.nombre} · {hotel.noches} noches</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div style={{ padding: "12px 18px", borderTop: "1px solid #f0f2fa", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
                            <div style={{ fontWeight: "800", fontSize: "14px", color: "#0D0C56" }}>{v.total}</div>
                            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                              <Link href={`/mis-viajes/itinerario?id=${v.id}`} style={{ padding: "7px 14px", background: "#f0f5ff", color: "#1667E6", borderRadius: "8px", fontSize: "12px", fontWeight: "700", textDecoration: "none" }}>Ver itinerario</Link>
                              <Link href={`/mis-viajes/documentos?id=${v.id}`} style={{ padding: "7px 14px", background: "#f0f5ff", color: "#1667E6", borderRadius: "8px", fontSize: "12px", fontWeight: "700", textDecoration: "none" }}>Documentos</Link>
                              {v.estado === "completado" && (
                                <Link href={`/mis-viajes/calificar?id=${v.id}`} style={{ padding: "7px 14px", background: "#FF5C00", color: "#fff", borderRadius: "8px", fontSize: "12px", fontWeight: "700", textDecoration: "none" }}>Calificar</Link>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* DOCUMENTOS */}
            {tab === "documentos" && (
              <div>
                <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "18px", color: "#0D0C56", marginBottom: "16px" }}>Documentos</div>
                {viajes.map(v => (
                  <div key={v.id} style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", padding: "16px 18px", marginBottom: "12px" }}>
                    <div style={{ fontWeight: "700", fontSize: "13px", color: "#0D0C56", marginBottom: "4px" }}>{v.destinos.join(" · ")}</div>
                    <div style={{ fontSize: "11px", color: "#888", marginBottom: "12px" }}>{v.fechas} · {v.codigo}</div>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      <button style={{ padding: "8px 14px", background: "#f0f5ff", color: "#1667E6", border: "none", borderRadius: "8px", fontSize: "12px", fontWeight: "700", cursor: "pointer", fontFamily: "Montserrat, sans-serif" }}>📄 Itinerario PDF</button>
                      <button style={{ padding: "8px 14px", background: "#f0f5ff", color: "#1667E6", border: "none", borderRadius: "8px", fontSize: "12px", fontWeight: "700", cursor: "pointer", fontFamily: "Montserrat, sans-serif" }}>✈ Boletos de vuelo</button>
                      <button style={{ padding: "8px 14px", background: "#f0f5ff", color: "#1667E6", border: "none", borderRadius: "8px", fontSize: "12px", fontWeight: "700", cursor: "pointer", fontFamily: "Montserrat, sans-serif" }}>🏨 Voucher hotel</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* CALIFICAR */}
            {tab === "calificar" && (
              <div>
                <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "18px", color: "#0D0C56", marginBottom: "16px" }}>Calificar</div>
                {viajes.filter(v => v.estado === "completado").map(v => (
                  <div key={v.id} style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", padding: "16px 18px", marginBottom: "12px" }}>
                    <div style={{ fontWeight: "700", fontSize: "13px", color: "#0D0C56", marginBottom: "4px" }}>{v.destinos.join(" · ")}</div>
                    <div style={{ fontSize: "11px", color: "#888", marginBottom: "12px" }}>{v.fechas}</div>
                    <div style={{ display: "flex", gap: "6px", marginBottom: "12px" }}>
                      {[1,2,3,4,5].map(star => (
                        <button key={star} style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer", color: "#F5A623" }}>★</button>
                      ))}
                    </div>
                    <textarea placeholder="Cuéntanos tu experiencia..." style={{ width: "100%", border: "1.5px solid #e8edf8", borderRadius: "8px", padding: "10px 12px", fontSize: "12px", outline: "none", fontFamily: "Montserrat, sans-serif", resize: "vertical", minHeight: "80px", color: "#0D0C56" }} />
                    <button style={{ marginTop: "10px", padding: "10px 20px", background: "#FF5C00", color: "#fff", border: "none", borderRadius: "8px", fontSize: "12px", fontWeight: "700", cursor: "pointer", fontFamily: "Montserrat, sans-serif" }}>Enviar calificación</button>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>

        {/* FOOTER */}
        <footer style={{ background: "#0D0C56", padding: "24px 32px", display: "flex", flexDirection: "column", gap: "8px", marginTop: "auto" }}>
          <Logo variant="teal" />
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", margin: 0 }}>© 2026 Trip Planner · no-reply@tripplanner.com.mx</p>
        </footer>
      </div>
    </>
  );
}
