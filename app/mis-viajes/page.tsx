"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "../components/Logo";

const viajes = [
  {
    id: 1,
    destinos: "París · Roma",
    fechas: "12 – 17 Jul 2026",
    pasajeros: 2,
    total: "$3,716 USD",
    estado: "confirmado",
    reserva: "TP-2024-8847",
    diasRestantes: 32,
    vuelos: 3,
    hoteles: 2,
  },
  {
    id: 2,
    destinos: "Tokio",
    fechas: "03 – 10 Sep 2026",
    pasajeros: 1,
    total: "$2,100 USD",
    estado: "pendiente",
    reserva: "TP-2024-9021",
    diasRestantes: 85,
    vuelos: 2,
    hoteles: 1,
  },
  {
    id: 3,
    destinos: "Nueva York",
    fechas: "15 – 20 Dic 2025",
    pasajeros: 4,
    total: "$5,240 USD",
    estado: "completado",
    reserva: "TP-2023-7712",
    diasRestantes: 0,
    vuelos: 2,
    hoteles: 1,
  },
];

const estadoConfig: { [key: string]: { label: string; bg: string; color: string } } = {
  confirmado: { label: "Confirmado", bg: "#e8fff5", color: "#085041" },
  pendiente: { label: "Pago pendiente", bg: "#fff8e0", color: "#7a4800" },
  completado: { label: "Completado", bg: "#f0f5ff", color: "#1667E6" },
  cancelado: { label: "Cancelado", bg: "#ffeaea", color: "#c0392b" },
};

export default function MisViajes() {
  const [filtro, setFiltro] = useState("todos");
  const filtrados = viajes.filter(v => filtro === "todos" || v.estado === filtro);

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
          background: #1667E6;
          padding: 12px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
        }
        .mv-nav-center {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 28px;
          align-items: center;
        }
        .mv-hero {
          background: #1667E6;
          padding: 28px 32px 48px;
          margin-bottom: -28px;
        }
        .mv-content {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 20px 40px;
          width: 100%;
          flex: 1;
        }
        .mv-stats {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          gap: 12px;
          margin-bottom: 20px;
        }
        .mv-filtros {
          display: flex;
          gap: 8px;
          margin-bottom: 16px;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        .mv-card-info {
          display: flex;
          gap: 16px;
          font-size: 12px;
          color: #888;
          flex-wrap: wrap;
        }
        .mv-acciones {
          padding: 10px 20px;
          border-top: 1px solid #f5f7ff;
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .mv-footer {
          background: #0D0C56;
          padding: 32px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
        }
        .mv-footer-links {
          display: flex;
          gap: 24px;
        }

        @media (max-width: 768px) {
          .mv-nav { padding: 12px 16px; }
          .mv-nav-center { display: none; }
          .mv-hero { padding: 20px 16px 40px; }
          .mv-content { padding: 0 12px 24px; }
          .mv-stats { grid-template-columns: 1fr 1fr; gap: 10px; }
          .mv-card-info { gap: 8px; }
          .mv-footer-links { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 24px; }
          .mv-footer { flex-direction: column; gap: 20px; padding: 24px 16px; align-items: flex-start; }
      `}</style>

      <div className="mv-wrap">

        {/* NAV */}
        <nav className="mv-nav">
          <Link href="/"><Logo variant="naranja" /></Link>
          <div className="mv-nav-center">
            <Link href="/mis-viajes" style={{ fontSize: "13px", color: "#fff", textDecoration: "none", fontWeight: "700" }}>Mis viajes</Link>
            <Link href="/perfil" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none", fontWeight: "600" }}>Perfil</Link>
            <Link href="/soporte" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none", fontWeight: "600" }}>Soporte</Link>
          </div>
          <Link href="/destinos" style={{ fontSize: "13px", background: "rgba(255,255,255,0.15)", color: "#fff", textDecoration: "none", fontWeight: "700", padding: "8px 18px", borderRadius: "50px" }}>+ Nuevo viaje</Link>
        </nav>

        {/* HERO */}
        <div className="mv-hero">
          <h1 style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "24px", color: "#fff", marginBottom: "4px" }}>Mis viajes</h1>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)" }}>Gestiona tus reservas, itinerarios y documentos de viaje</p>
        </div>

        {/* CONTENIDO */}
        <div className="mv-content">

          {/* STATS */}
          <div className="mv-stats">
            {[
              { label: "Total viajes", value: viajes.length },
              { label: "Confirmados", value: viajes.filter(v => v.estado === "confirmado").length },
              { label: "Próximo viaje", value: "32 días" },
              { label: "Países visitados", value: "5" },
            ].map(s => (
              <div key={s.label} style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", padding: "16px", textAlign: "center" }}>
                <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "28px", color: "#FF5C00" }}>{s.value}</div>
                <div style={{ fontSize: "11px", color: "#888", marginTop: "4px" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* FILTROS */}
          <div className="mv-filtros">
            {["todos", "confirmado", "pendiente", "completado"].map(f => (
              <button key={f} onClick={() => setFiltro(f)} style={{ padding: "7px 16px", border: `1.5px solid ${filtro === f ? "#1667E6" : "#e8edf8"}`, borderRadius: "50px", fontSize: "12px", fontWeight: "700", cursor: "pointer", background: filtro === f ? "#1667E6" : "#fff", color: filtro === f ? "#fff" : "#0D0C56", whiteSpace: "nowrap", flexShrink: 0, fontFamily: "Montserrat, sans-serif" }}>
                {f === "todos" ? "Todos" : estadoConfig[f]?.label}
              </button>
            ))}
          </div>

          {/* LISTA DE VIAJES */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {filtrados.map(v => {
              const estado = estadoConfig[v.estado];
              return (
                <div key={v.id} style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", overflow: "hidden", transition: "border-color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "#1667E6"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "#e8edf8"}
                >
                  <div style={{ padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px", flexWrap: "wrap" }}>
                        <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "16px", color: "#0D0C56" }}>{v.destinos}</div>
                        <span style={{ fontSize: "10px", background: estado.bg, color: estado.color, padding: "2px 10px", borderRadius: "50px", fontWeight: "700", whiteSpace: "nowrap" }}>{estado.label}</span>
                      </div>
                      <div className="mv-card-info">
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#FF5C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                          </svg>
                          {v.fechas}
                        </span>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#FF5C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                          </svg>
                          {v.pasajeros} {v.pasajeros === 1 ? "persona" : "personas"}
                        </span>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#FF5C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-1 .1-1.3.5l-.4.4c-.4.4-.3 1 .2 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.4 5.8c.3.5.9.6 1.3.2l.4-.4c.4-.3.6-.8.5-1.3z"/>
                          </svg>
                          {v.vuelos} vuelos
                        </span>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#FF5C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                          </svg>
                          {v.hoteles} {v.hoteles === 1 ? "hotel" : "hoteles"}
                        </span>
                      </div>
                      <div style={{ marginTop: "6px", fontSize: "11px", color: "#aaa" }}>Reserva: {v.reserva}</div>
                    </div>

                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "18px", color: "#1667E6", marginBottom: "4px" }}>{v.total}</div>
                      {v.estado === "confirmado" && v.diasRestantes > 0 && (
                        <div style={{ background: "#f0f5ff", borderRadius: "8px", padding: "4px 10px", fontSize: "11px", fontWeight: "700", color: "#1667E6" }}>
                          {v.diasRestantes} días
                        </div>
                      )}
                      {v.estado === "completado" && (
                        <div style={{ fontSize: "11px", color: "#3ED5A9", fontWeight: "700" }}>Viaje realizado ✓</div>
                      )}
                    </div>
                  </div>

                  <div className="mv-acciones">
                    <Link href="/reserva" style={{ padding: "7px 16px", background: "#1667E6", color: "#fff", border: "none", borderRadius: "8px", fontSize: "11px", fontWeight: "700", cursor: "pointer", textDecoration: "none" }}>Ver detalle</Link>
                    {v.estado !== "completado" && (
                      <Link href="/mis-viajes/itinerario" style={{ padding: "7px 16px", background: "#f0f5ff", color: "#1667E6", border: "1.5px solid #e0eaff", borderRadius: "8px", fontSize: "11px", fontWeight: "700", cursor: "pointer", textDecoration: "none" }}>Editar itinerario</Link>
                    )}
                    <Link href="/mis-viajes/documentos" style={{ padding: "7px 16px", background: "#f0f5ff", color: "#1667E6", border: "1.5px solid #e0eaff", borderRadius: "8px", fontSize: "11px", fontWeight: "700", cursor: "pointer", textDecoration: "none" }}>Descargar docs</Link>
                    {v.estado === "completado" && (
                      <Link href="/mis-viajes/calificar" style={{ padding: "7px 16px", background: "#f0f5ff", color: "#1667E6", border: "1.5px solid #e0eaff", borderRadius: "8px", fontSize: "11px", fontWeight: "700", cursor: "pointer", textDecoration: "none" }}>Calificar viaje</Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {filtrados.length === 0 && (
            <div style={{ textAlign: "center", padding: "48px 0" }}>
              <div style={{ fontWeight: "700", fontSize: "14px", color: "#888" }}>No hay viajes en esta categoría</div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <footer className="mv-footer">
          <div>
            <Logo variant="teal" />
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginTop: "12px" }}>© 2026 Trip Planner · no-reply@tripplanner.com.mx</p>
          </div>
          <div className="mv-footer-links">
            <Link href="/soporte?tab=faq" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Centro de ayuda</Link>
            <Link href="/soporte?tab=chat" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Contacto</Link>
            <Link href="/privacidad" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Política de privacidad</Link>
          </div>
        </footer>
      </div>
    </>
  );
}
