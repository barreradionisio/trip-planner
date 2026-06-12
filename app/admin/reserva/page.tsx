"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "../../components/Logo";

export default function AdminReserva() {
  const [estado, setEstado] = useState("confirmado");
  const [nota, setNota] = useState("");
  const [notas, setNotas] = useState([
    { texto: "Cliente solicitó habitación en piso alto.", fecha: "10 Jun 2026 · 09:15", autor: "Admin" },
  ]);

  const agregarNota = () => {
    if (!nota.trim()) return;
    setNotas([...notas, { texto: nota, fecha: "Ahora", autor: "Admin" }]);
    setNota("");
  };

  const estadoConfig: { [key: string]: { label: string; bg: string; color: string } } = {
    confirmado: { label: "Confirmado", bg: "#e8fff5", color: "#085041" },
    pendiente: { label: "Pendiente", bg: "#fff8e0", color: "#7a4800" },
    cancelado: { label: "Cancelado", bg: "#ffeaea", color: "#c0392b" },
    completado: { label: "Completado", bg: "#f0f5ff", color: "#1667E6" },
  };

  const navItems = [
    { key: "dashboard", label: "Dashboard" },
    { key: "reservas", label: "Reservas" },
    { key: "clientes", label: "Clientes" },
    { key: "reportes", label: "Reportes" },
  ];

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
              style={{ width: "100%", padding: "10px 12px", border: "none", borderRadius: "8px", background: n.key === "reservas" ? "#1667E6" : "transparent", color: n.key === "reservas" ? "#fff" : "rgba(255,255,255,0.6)", fontWeight: n.key === "reservas" ? "700" : "600", fontSize: "12px", cursor: "pointer", textAlign: "left", marginBottom: "2px" }}
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
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Link href="/admin?seccion=reservas" style={{ fontSize: "12px", color: "#1667E6", fontWeight: "700", textDecoration: "none" }}>‹ Reservas</Link>
            <span style={{ color: "#e8edf8" }}>|</span>
            <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "14px", color: "#0D0C56" }}>TP-2024-8847</div>
            <span style={{ fontSize: "10px", background: estadoConfig[estado].bg, color: estadoConfig[estado].color, padding: "2px 10px", borderRadius: "50px", fontWeight: "700" }}>{estadoConfig[estado].label}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <select
              value={estado}
              onChange={e => setEstado(e.target.value)}
              style={{ border: "1.5px solid #e8edf8", borderRadius: "8px", padding: "7px 12px", fontSize: "12px", outline: "none", background: "#fff", fontWeight: "600" }}
            >
              <option value="confirmado">Confirmado</option>
              <option value="pendiente">Pendiente</option>
              <option value="completado">Completado</option>
              <option value="cancelado">Cancelado</option>
            </select>
            <button style={{ padding: "7px 16px", background: "#1667E6", color: "#fff", border: "none", borderRadius: "8px", fontSize: "12px", fontWeight: "700", cursor: "pointer" }}>Guardar</button>
          </div>
        </div>

        <div style={{ padding: "20px 24px", flex: 1, display: "grid", gridTemplateColumns: "1fr 300px", gap: "20px" }}>

          {/* IZQUIERDA */}
          <div>

            {/* CLIENTE Y PAGO */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
              <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", overflow: "hidden" }}>
                <div style={{ padding: "10px 16px", borderBottom: "1px solid #f0f2fa" }}>
                  <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "12px", color: "#0D0C56" }}>Cliente</div>
                </div>
                <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: "6px", fontSize: "12px" }}>
                  <div style={{ fontWeight: "700", color: "#0D0C56" }}>Juan García López</div>
                  <div style={{ color: "#888" }}>juan@email.com</div>
                  <div style={{ color: "#888" }}>+52 55 1234 5678</div>
                  <div style={{ color: "#888" }}>Ciudad de México · México</div>
                  <button style={{ marginTop: "4px", padding: "6px 12px", background: "#f0f5ff", color: "#1667E6", border: "none", borderRadius: "6px", fontSize: "11px", fontWeight: "700", cursor: "pointer", alignSelf: "flex-start" }}>Ver perfil</button>
                </div>
              </div>
              <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", overflow: "hidden" }}>
                <div style={{ padding: "10px 16px", borderBottom: "1px solid #f0f2fa" }}>
                  <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "12px", color: "#0D0C56" }}>Pago</div>
                </div>
                <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: "6px", fontSize: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "#888" }}>Método</span><span style={{ fontWeight: "600" }}>Visa •••• 4521</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "#888" }}>Vuelos</span><span style={{ fontWeight: "600" }}>$2,856 USD</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "#888" }}>Hospedaje</span><span style={{ fontWeight: "600" }}>$860 USD</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "#888" }}>Comisión</span><span style={{ fontWeight: "600", color: "#3ED5A9" }}>$0</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #f5f7ff", paddingTop: "6px" }}><span style={{ fontWeight: "800" }}>Total</span><span style={{ fontWeight: "800", color: "#1667E6" }}>$3,716 USD</span></div>
                </div>
              </div>
            </div>

            {/* VUELOS */}
            <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", overflow: "hidden", marginBottom: "14px" }}>
              <div style={{ padding: "10px 16px", borderBottom: "1px solid #f0f2fa" }}>
                <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "12px", color: "#0D0C56" }}>Vuelos · 3 tramos</div>
              </div>
              <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: "8px" }}>
                {[
                  { ruta: "CDMX → París", aerolinea: "Aeroméxico · AM", fecha: "12 Jul · 06:30 → 14:45", escala: "1 escala" },
                  { ruta: "París → Roma", aerolinea: "Air France · AF", fecha: "15 Jul · 09:15 → 11:20", escala: "Directo" },
                  { ruta: "Roma → CDMX", aerolinea: "Iberia · IB", fecha: "17 Jul · 11:00 → 22:10", escala: "Directo" },
                ].map((v, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px", background: "#f5f7ff", borderRadius: "8px", fontSize: "12px" }}>
                    <div>
                      <div style={{ fontWeight: "700", color: "#0D0C56" }}>{v.ruta}</div>
                      <div style={{ color: "#888", fontSize: "11px" }}>{v.aerolinea} · {v.fecha}</div>
                    </div>
                    <span style={{ fontSize: "10px", color: v.escala === "Directo" ? "#3ED5A9" : "#F5A623", fontWeight: "700", background: v.escala === "Directo" ? "#e8fff5" : "#fff8e0", padding: "2px 8px", borderRadius: "50px" }}>{v.escala}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* HOTELES */}
            <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", overflow: "hidden", marginBottom: "14px" }}>
              <div style={{ padding: "10px 16px", borderBottom: "1px solid #f0f2fa" }}>
                <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "12px", color: "#0D0C56" }}>Hoteles · 2 ciudades</div>
              </div>
              <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: "8px" }}>
                {[
                  { ciudad: "París", hotel: "Hotel Le Marais ★★★★", fechas: "12–15 Jul · 3 noches · Doble" },
                  { ciudad: "Roma", hotel: "Hotel Roma Centro ★★★★", fechas: "15–17 Jul · 2 noches · Doble" },
                ].map((h, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px", background: "#f5f7ff", borderRadius: "8px", fontSize: "12px" }}>
                    <div>
                      <div style={{ fontWeight: "700", color: "#0D0C56" }}>{h.ciudad} · {h.hotel}</div>
                      <div style={{ color: "#888", fontSize: "11px" }}>{h.fechas}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PASAJEROS */}
            <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", overflow: "hidden", marginBottom: "14px" }}>
              <div style={{ padding: "10px 16px", borderBottom: "1px solid #f0f2fa" }}>
                <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "12px", color: "#0D0C56" }}>Pasajeros · 2 adultos</div>
              </div>
              <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: "6px", fontSize: "12px" }}>
                {[
                  { nombre: "Juan García López", pasaporte: "A12345678", nac: "15/03/1990" },
                  { nombre: "María García López", pasaporte: "B98765432", nac: "22/07/1992" },
                ].map((p, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px", background: "#f5f7ff", borderRadius: "8px" }}>
                    <span style={{ fontWeight: "700", color: "#0D0C56" }}>{p.nombre}</span>
                    <span style={{ color: "#888" }}>Pasaporte: {p.pasaporte} · {p.nac}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* NOTAS INTERNAS */}
            <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", overflow: "hidden" }}>
              <div style={{ padding: "10px 16px", borderBottom: "1px solid #f0f2fa" }}>
                <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "12px", color: "#0D0C56" }}>Notas internas</div>
              </div>
              <div style={{ padding: "12px 16px" }}>
                {notas.map((n, i) => (
                  <div key={i} style={{ background: "#fff8e0", borderRadius: "8px", padding: "10px 12px", marginBottom: "8px", fontSize: "12px" }}>
                    <div style={{ color: "#0D0C56", marginBottom: "4px" }}>{n.texto}</div>
                    <div style={{ fontSize: "10px", color: "#aaa" }}>{n.autor} · {n.fecha}</div>
                  </div>
                ))}
                <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                  <input value={nota} onChange={e => setNota(e.target.value)} placeholder="Agregar nota interna..." style={{ flex: 1, border: "1.5px solid #e8edf8", borderRadius: "8px", padding: "8px 11px", fontSize: "12px", outline: "none" }} />
                  <button onClick={agregarNota} style={{ padding: "8px 16px", background: "#1667E6", color: "#fff", border: "none", borderRadius: "8px", fontSize: "12px", fontWeight: "700", cursor: "pointer" }}>Agregar</button>
                </div>
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <div>
            {/* HISTORIAL */}
            <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", overflow: "hidden", marginBottom: "12px" }}>
              <div style={{ padding: "10px 14px", background: "#0D0C56" }}>
                <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "12px", color: "#fff" }}>Historial</div>
              </div>
              <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: "0" }}>
                {[
                  { accion: "Reserva confirmada", fecha: "Hoy 10:32", color: "#3ED5A9" },
                  { accion: "Pago procesado", fecha: "Hoy 10:31", color: "#1667E6" },
                  { accion: "Itinerario generado", fecha: "Hoy 10:30", color: "#1667E6" },
                  { accion: "Reserva creada", fecha: "Hoy 10:28", color: "#888" },
                ].map((h, i, arr) => (
                  <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", padding: "8px 0", borderBottom: i < arr.length - 1 ? "1px solid #f5f7ff" : "none" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: h.color, marginTop: "4px", flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "11px", fontWeight: "700", color: "#0D0C56" }}>{h.accion}</div>
                      <div style={{ fontSize: "10px", color: "#aaa" }}>{h.fecha}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ACCIONES */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <button style={{ width: "100%", padding: "11px", background: "#f0f5ff", color: "#1667E6", border: "1.5px solid #e0eaff", borderRadius: "10px", fontWeight: "700", fontSize: "12px", cursor: "pointer" }}>Reenviar confirmación</button>
              <button style={{ width: "100%", padding: "11px", background: "#f5f7ff", color: "#888", border: "1.5px solid #e8edf8", borderRadius: "10px", fontWeight: "700", fontSize: "12px", cursor: "pointer" }}>Descargar PDF</button>
              <button style={{ width: "100%", padding: "11px", background: "#ffeaea", color: "#c0392b", border: "1.5px solid #ffd0d0", borderRadius: "10px", fontWeight: "700", fontSize: "12px", cursor: "pointer" }}>Cancelar reserva</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
