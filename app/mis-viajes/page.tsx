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
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Montserrat',sans-serif", background: "#f5f7ff" }}>

      {/* NAV */}
      <nav style={{ background: "#1667E6", padding: "12px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" }}>
  <Logo variant="naranja" />
  <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "28px", alignItems: "center" }}>
    <Link href="/mis-viajes" style={{ fontSize: "13px", color: "#fff", textDecoration: "none", fontWeight: "700" }}>Mis viajes</Link>
    <Link href="/perfil" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none", fontWeight: "600" }}>Perfil</Link>
    <Link href="/soporte" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none", fontWeight: "600" }}>Soporte</Link>
  </div>
  <Link href="/destinos" style={{ fontSize: "13px", background: "rgba(255,255,255,0.15)", color: "#fff", textDecoration: "none", fontWeight: "700", padding: "8px 18px", borderRadius: "50px" }}>+ Nuevo viaje</Link>
</nav>

      {/* HEADER */}
      <div style={{ background: "#1667E6", padding: "28px 32px 48px", marginBottom: "-28px" }}>
        <h1 style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "24px", color: "#fff", marginBottom: "4px" }}>Mis viajes</h1>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)" }}>Gestiona tus reservas, itinerarios y documentos de viaje</p>
      </div>

      {/* CONTENIDO */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 20px 40px", width: "100%" }}>

        {/* STATS */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "12px", marginBottom: "20px" }}>
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
        <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
          {["todos", "confirmado", "pendiente", "completado"].map(f => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              style={{ padding: "7px 16px", border: `1.5px solid ${filtro === f ? "#1667E6" : "#e8edf8"}`, borderRadius: "50px", fontSize: "12px", fontWeight: "700", cursor: "pointer", background: filtro === f ? "#1667E6" : "#fff", color: filtro === f ? "#fff" : "#0D0C56" }}
            >
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

                  {/* INFO */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                      <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "16px", color: "#0D0C56" }}>{v.destinos}</div>
                      <span style={{ fontSize: "10px", background: estado.bg, color: estado.color, padding: "2px 10px", borderRadius: "50px", fontWeight: "700" }}>{estado.label}</span>
                    </div>
                    <div style={{ display: "flex", gap: "16px", fontSize: "12px", color: "#888" }}>
  <span>📅 {v.fechas}</span>
  <span>👥 {v.pasajeros} {v.pasajeros === 1 ? "persona" : "personas"}</span>
  <span>✈️ {v.vuelos} vuelos</span>
  <span>🏨 {v.hoteles} {v.hoteles === 1 ? "hotel" : "hoteles"}</span>
</div>
                    <div style={{ marginTop: "6px", fontSize: "11px", color: "#aaa" }}>Reserva: {v.reserva}</div>
                  </div>

                  {/* PRECIO Y COUNTDOWN */}
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

                {/* ACCIONES */}
                <div style={{ padding: "10px 20px", borderTop: "1px solid #f5f7ff", display: "flex", gap: "8px" }}>
                  <button style={{ padding: "7px 16px", background: "#1667E6", color: "#fff", border: "none", borderRadius: "8px", fontSize: "11px", fontWeight: "700", cursor: "pointer" }}>Ver detalle</button>
                  {v.estado !== "completado" && (
                    <button style={{ padding: "7px 16px", background: "#f0f5ff", color: "#1667E6", border: "1.5px solid #e0eaff", borderRadius: "8px", fontSize: "11px", fontWeight: "700", cursor: "pointer" }}>Editar itinerario</button>
                  )}
                  <button style={{ padding: "7px 16px", background: "#f5f7ff", color: "#888", border: "1.5px solid #e8edf8", borderRadius: "8px", fontSize: "11px", fontWeight: "700", cursor: "pointer" }}>Descargar docs</button>
                  {v.estado === "completado" && (
                    <button style={{ padding: "7px 16px", background: "#f5f7ff", color: "#888", border: "1.5px solid #e8edf8", borderRadius: "8px", fontSize: "11px", fontWeight: "700", cursor: "pointer" }}>Calificar viaje</button>
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
      <footer style={{ background: "#0D0C56", padding: "32px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
        <div>
          <Logo variant="teal" />
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginTop: "12px" }}>© 2026 Trip Planner · no-reply@tripplanner.mx</p>
        </div>
        <div style={{ display: "flex", gap: "24px" }}>
          <a href="#" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Centro de ayuda</a>
          <a href="#" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Contacto</a>
          <a href="#" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Política de privacidad</a>
        </div>
      </footer>
    </div>
  );
}
