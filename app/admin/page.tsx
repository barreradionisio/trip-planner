"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Logo from "../components/Logo";

const reservas = [
  { id: "TP-2024-8847", cliente: "Juan García", destinos: "París · Roma", fechas: "12–17 Jul", monto: "$3,716", estado: "confirmado", fecha: "Hoy 10:32" },
  { id: "TP-2024-9021", cliente: "María López", destinos: "Tokio", fechas: "03–10 Sep", monto: "$2,100", estado: "pendiente", fecha: "Hoy 09:15" },
  { id: "TP-2024-9022", cliente: "Carlos Ruiz", destinos: "Nueva York", fechas: "20–25 Jul", monto: "$1,840", estado: "confirmado", fecha: "Ayer 18:40" },
  { id: "TP-2024-9023", cliente: "Ana Martínez", destinos: "Barcelona", fechas: "01–08 Ago", monto: "$2,560", estado: "confirmado", fecha: "Ayer 14:20" },
  { id: "TP-2024-9024", cliente: "Luis Torres", destinos: "Dubai", fechas: "15–22 Ago", monto: "$3,200", estado: "cancelado", fecha: "Hace 2 días" },
];

const estadoConfig: { [key: string]: { label: string; bg: string; color: string } } = {
  confirmado: { label: "Confirmado", bg: "#e8fff5", color: "#085041" },
  pendiente: { label: "Pendiente", bg: "#fff8e0", color: "#7a4800" },
  cancelado: { label: "Cancelado", bg: "#ffeaea", color: "#c0392b" },
};

const kpis = [
  { label: "Reservas este mes", value: "48", delta: "+12%", positive: true },
  { label: "Ingresos este mes", value: "$94,320", delta: "+8%", positive: true },
  { label: "Clientes activos", value: "312", delta: "+5%", positive: true },
  { label: "Cancelaciones", value: "3", delta: "-2", positive: true },
];

const navItems = [
  { key: "dashboard", label: "Dashboard" },
  { key: "reservas", label: "Reservas" },
  { key: "clientes", label: "Clientes" },
  { key: "reportes", label: "Reportes" },
];

function AdminContent() {
  const searchParams = useSearchParams();
const [seccion, setSeccion] = useState(searchParams.get("seccion") || "dashboard");
const [filtroEstado, setFiltroEstado] = useState("todos");

  const reservasFiltradas = reservas.filter(r => filtroEstado === "todos" || r.estado === filtroEstado);

  return (
    <div style={{ minHeight: "100vh", display: "flex", fontFamily: "'Montserrat',sans-serif", background: "#f5f7ff" }}>

      {/* SIDEBAR */}
      <div style={{ width: "220px", background: "#0D0C56", display: "flex", flexDirection: "column", flexShrink: 0, minHeight: "100vh" }}>
        <div style={{ padding: "20px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <Logo variant="teal" />
          <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", marginTop: "8px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px" }}>Panel de administrador</div>
        </div>
        <div style={{ padding: "12px 8px", flex: 1 }}>
          {navItems.map(n => (
            <button
              key={n.key}
              onClick={() => setSeccion(n.key)}
              style={{ width: "100%", padding: "10px 12px", border: "none", borderRadius: "8px", background: seccion === n.key ? "#1667E6" : "transparent", color: seccion === n.key ? "#fff" : "rgba(255,255,255,0.6)", fontWeight: seccion === n.key ? "700" : "600", fontSize: "12px", cursor: "pointer", textAlign: "left", marginBottom: "2px" }}
            >
              {n.label}
            </button>
          ))}
        </div>
        <div style={{ padding: "16px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#1667E6", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "12px", color: "#fff" }}>AD</div>
            <div>
              <div style={{ fontSize: "11px", fontWeight: "700", color: "#fff" }}>Administrador</div>
              <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)" }}>admin@tripplanner.mx</div>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENIDO */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>

        {/* TOPBAR */}
        <div style={{ background: "#fff", padding: "12px 24px", borderBottom: "1px solid #e8edf8", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "16px", color: "#0D0C56" }}>
            {navItems.find(n => n.key === seccion)?.label}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ fontSize: "12px", color: "#888" }}>Jueves 11 Jun 2026</div>
            <a href="/" style={{ fontSize: "12px", background: "#f0f5ff", color: "#1667E6", textDecoration: "none", fontWeight: "700", padding: "7px 14px", borderRadius: "8px" }}>Ver sitio</a>
          </div>
        </div>

        <div style={{ padding: "24px", flex: 1 }}>

          {/* DASHBOARD */}
          {seccion === "dashboard" && (
            <div>
              {/* KPIs */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "14px", marginBottom: "24px" }}>
                {kpis.map(k => (
                  <div key={k.label} style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", padding: "16px 18px" }}>
                    <div style={{ fontSize: "11px", color: "#888", marginBottom: "8px" }}>{k.label}</div>
                    <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "24px", color: "#0D0C56", marginBottom: "4px" }}>{k.value}</div>
                    <div style={{ fontSize: "11px", fontWeight: "700", color: k.positive ? "#3ED5A9" : "#E24B4A" }}>{k.delta} vs mes anterior</div>
                  </div>
                ))}
              </div>

              {/* GRÁFICA SIMPLE */}
              <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", padding: "16px 18px", marginBottom: "24px" }}>
                <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "13px", color: "#0D0C56", marginBottom: "16px" }}>Reservas por mes</div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", height: "80px" }}>
                  {[22, 35, 28, 42, 38, 48].map((v, i) => (
                    <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                      <div style={{ width: "100%", background: i === 5 ? "#1667E6" : "#e8edf8", borderRadius: "4px 4px 0 0", height: `${(v / 48) * 70}px`, transition: "background 0.2s" }} />
                      <div style={{ fontSize: "10px", color: "#888" }}>{["Ene", "Feb", "Mar", "Abr", "May", "Jun"][i]}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ACTIVIDAD RECIENTE */}
              <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", overflow: "hidden" }}>
                <div style={{ padding: "12px 18px", borderBottom: "1px solid #f0f2fa", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "13px", color: "#0D0C56" }}>Reservas recientes</div>
                  <button onClick={() => setSeccion("reservas")} style={{ fontSize: "11px", color: "#1667E6", fontWeight: "700", background: "none", border: "none", cursor: "pointer" }}>Ver todas →</button>
                </div>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
                    <thead>
                      <tr style={{ background: "#f5f7ff" }}>
                        {["Reserva", "Cliente", "Destinos", "Fechas", "Monto", "Estado", "Fecha"].map(h => (
                          <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: "10px", fontWeight: "700", color: "#888", textTransform: "uppercase", letterSpacing: "0.4px" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {reservas.slice(0, 3).map((r, i) => {
                        const estado = estadoConfig[r.estado];
                        return (
                          <tr key={r.id} style={{ borderTop: "1px solid #f5f7ff" }}>
                            <td style={{ padding: "12px 16px", fontWeight: "700", color: "#1667E6" }}>{r.id}</td>
                            <td style={{ padding: "12px 16px", color: "#0D0C56" }}>{r.cliente}</td>
                            <td style={{ padding: "12px 16px", color: "#0D0C56" }}>{r.destinos}</td>
                            <td style={{ padding: "12px 16px", color: "#888" }}>{r.fechas}</td>
                            <td style={{ padding: "12px 16px", fontWeight: "700", color: "#0D0C56" }}>{r.monto}</td>
                            <td style={{ padding: "12px 16px" }}>
                              <span style={{ fontSize: "10px", background: estado.bg, color: estado.color, padding: "2px 10px", borderRadius: "50px", fontWeight: "700" }}>{estado.label}</span>
                            </td>
                            <td style={{ padding: "12px 16px", color: "#aaa", fontSize: "11px" }}>{r.fecha}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* RESERVAS */}
          {seccion === "reservas" && (
            <div>
              <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
                {["todos", "confirmado", "pendiente", "cancelado"].map(f => (
                  <button
                    key={f}
                    onClick={() => setFiltroEstado(f)}
                    style={{ padding: "7px 16px", border: `1.5px solid ${filtroEstado === f ? "#1667E6" : "#e8edf8"}`, borderRadius: "50px", fontSize: "12px", fontWeight: "700", cursor: "pointer", background: filtroEstado === f ? "#1667E6" : "#fff", color: filtroEstado === f ? "#fff" : "#0D0C56" }}
                  >
                    {f === "todos" ? "Todas" : estadoConfig[f]?.label}
                  </button>
                ))}
              </div>
              <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", overflow: "hidden" }}>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
                    <thead>
                      <tr style={{ background: "#f5f7ff" }}>
                        {["Reserva", "Cliente", "Destinos", "Fechas", "Monto", "Estado", "Fecha", "Acciones"].map(h => (
                          <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: "10px", fontWeight: "700", color: "#888", textTransform: "uppercase", letterSpacing: "0.4px" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {reservasFiltradas.map(r => {
                        const estado = estadoConfig[r.estado];
                        return (
                          <tr key={r.id} style={{ borderTop: "1px solid #f5f7ff" }}>
                            <td style={{ padding: "12px 16px", fontWeight: "700", color: "#1667E6" }}>{r.id}</td>
                            <td style={{ padding: "12px 16px", color: "#0D0C56" }}>{r.cliente}</td>
                            <td style={{ padding: "12px 16px", color: "#0D0C56" }}>{r.destinos}</td>
                            <td style={{ padding: "12px 16px", color: "#888" }}>{r.fechas}</td>
                            <td style={{ padding: "12px 16px", fontWeight: "700", color: "#0D0C56" }}>{r.monto}</td>
                            <td style={{ padding: "12px 16px" }}>
                              <span style={{ fontSize: "10px", background: estado.bg, color: estado.color, padding: "2px 10px", borderRadius: "50px", fontWeight: "700" }}>{estado.label}</span>
                            </td>
                            <td style={{ padding: "12px 16px", color: "#aaa", fontSize: "11px" }}>{r.fecha}</td>
                            <td style={{ padding: "12px 16px" }}>
                              <Link href="/admin/reserva" style={{ padding: "5px 12px", background: "#f0f5ff", color: "#1667E6", border: "none", borderRadius: "6px", fontSize: "11px", fontWeight: "700", cursor: "pointer", textDecoration: "none" }}>Ver</Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* CLIENTES */}
          {seccion === "clientes" && (
            <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", overflow: "hidden" }}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
                  <thead>
                    <tr style={{ background: "#f5f7ff" }}>
                      {["Cliente", "Correo", "Viajes", "Total gastado", "Último viaje", "Acciones"].map(h => (
                        <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: "10px", fontWeight: "700", color: "#888", textTransform: "uppercase", letterSpacing: "0.4px" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { nombre: "Juan García", correo: "juan@email.com", viajes: 3, total: "$7,856", ultimo: "Jul 2026" },
                      { nombre: "María López", correo: "maria@email.com", viajes: 1, total: "$2,100", ultimo: "Sep 2026" },
                      { nombre: "Carlos Ruiz", correo: "carlos@email.com", viajes: 2, total: "$4,640", ultimo: "Jul 2026" },
                      { nombre: "Ana Martínez", correo: "ana@email.com", viajes: 1, total: "$2,560", ultimo: "Ago 2026" },
                      { nombre: "Luis Torres", correo: "luis@email.com", viajes: 1, total: "$3,200", ultimo: "Ago 2026" },
                    ].map((c, i) => (
                      <tr key={i} style={{ borderTop: "1px solid #f5f7ff" }}>
                        <td style={{ padding: "12px 16px", fontWeight: "700", color: "#0D0C56" }}>{c.nombre}</td>
                        <td style={{ padding: "12px 16px", color: "#888" }}>{c.correo}</td>
                        <td style={{ padding: "12px 16px", color: "#0D0C56", fontWeight: "600" }}>{c.viajes}</td>
                        <td style={{ padding: "12px 16px", fontWeight: "700", color: "#1667E6" }}>{c.total}</td>
                        <td style={{ padding: "12px 16px", color: "#888" }}>{c.ultimo}</td>
                        <td style={{ padding: "12px 16px" }}>
                          <button style={{ padding: "5px 12px", background: "#f0f5ff", color: "#1667E6", border: "none", borderRadius: "6px", fontSize: "11px", fontWeight: "700", cursor: "pointer" }}>Ver perfil</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* REPORTES */}
          {seccion === "reportes" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              {[
                { titulo: "Reporte de ventas", desc: "Ingresos por mes, destino y tipo de reserva", icono: "📊" },
                { titulo: "Reservas por destino", desc: "Los destinos más populares del período", icono: "🗺" },
                { titulo: "Clientes frecuentes", desc: "Usuarios con más de una reserva", icono: "👥" },
                { titulo: "Cancelaciones", desc: "Análisis de cancelaciones y motivos", icono: "📋" },
              ].map(r => (
                <div key={r.titulo} style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", padding: "20px", cursor: "pointer" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "#1667E6"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "#e8edf8"}
                >
                  <div style={{ fontSize: "28px", marginBottom: "10px" }}>{r.icono}</div>
                  <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "14px", color: "#0D0C56", marginBottom: "4px" }}>{r.titulo}</div>
                  <div style={{ fontSize: "12px", color: "#888", marginBottom: "14px" }}>{r.desc}</div>
                  <button style={{ padding: "7px 16px", background: "#f0f5ff", color: "#1667E6", border: "none", borderRadius: "8px", fontSize: "11px", fontWeight: "700", cursor: "pointer" }}>Generar reporte</button>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
} 
export default function Admin() {
  return (
    <Suspense>
      <AdminContent />
    </Suspense>
  );
}

