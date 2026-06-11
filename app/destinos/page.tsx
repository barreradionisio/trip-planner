"use client";

import { useState } from "react";
import Logo from "../components/Logo";

const destinosDisponibles = [
  { ciudad: "París", pais: "Francia", emoji: "🗼" },
  { ciudad: "Roma", pais: "Italia", emoji: "🏛" },
  { ciudad: "Tokio", pais: "Japón", emoji: "⛩" },
  { ciudad: "Nueva York", pais: "EE.UU.", emoji: "🗽" },
  { ciudad: "Barcelona", pais: "España", emoji: "🎨" },
  { ciudad: "Londres", pais: "Reino Unido", emoji: "🎡" },
  { ciudad: "Cancún", pais: "México", emoji: "🏖" },
  { ciudad: "Dubai", pais: "EAU", emoji: "🏙" },
  { ciudad: "Amsterdam", pais: "Países Bajos", emoji: "🌷" },
  { ciudad: "Buenos Aires", pais: "Argentina", emoji: "💃" },
  { ciudad: "Sydney", pais: "Australia", emoji: "🦘" },
  { ciudad: "Bangkok", pais: "Tailandia", emoji: "🛕" },
];

interface Destino {
  ciudad: string;
  pais: string;
  emoji: string;
  dias: number;
  hospedaje: string;
}

export default function Destinos() {
  const [seleccionados, setSeleccionados] = useState<Destino[]>([]);
  const [busqueda, setBusqueda] = useState("");

  const agregar = (d: typeof destinosDisponibles[0]) => {
    if (seleccionados.find(s => s.ciudad === d.ciudad)) return;
    setSeleccionados([...seleccionados, { ...d, dias: 3, hospedaje: "Cualquier tipo" }]);
  };

  const quitar = (ciudad: string) => {
    setSeleccionados(seleccionados.filter(s => s.ciudad !== ciudad));
  };

  const actualizarDias = (ciudad: string, dias: number) => {
    setSeleccionados(seleccionados.map(s => s.ciudad === ciudad ? { ...s, dias } : s));
  };

  const actualizarHospedaje = (ciudad: string, hospedaje: string) => {
    setSeleccionados(seleccionados.map(s => s.ciudad === ciudad ? { ...s, hospedaje } : s));
  };

  const filtrados = destinosDisponibles.filter(d =>
    d.ciudad.toLowerCase().includes(busqueda.toLowerCase()) ||
    d.pais.toLowerCase().includes(busqueda.toLowerCase())
  );

  const totalDias = seleccionados.reduce((a, b) => a + b.dias, 0);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Montserrat',sans-serif", background: "#f5f7ff" }}>

      {/* TOPBAR */}
      <div style={{ background: "#0D0C56", padding: "11px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <Logo variant="teal" />
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {["Destinos", "Vuelos", "Hospedaje", "Itinerario", "Pago"].map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "22px", height: "22px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "800", background: i === 0 ? "#1667E6" : "rgba(255,255,255,0.15)", color: i === 0 ? "#fff" : "rgba(255,255,255,0.4)" }}>{i + 1}</div>
                <span style={{ fontSize: "11px", fontWeight: "600", color: i === 0 ? "#fff" : "rgba(255,255,255,0.4)" }}>{s}</span>
              </div>
              {i < 4 && <div style={{ width: "24px", height: "1px", background: "rgba(255,255,255,0.15)" }} />}
            </div>
          ))}
        </div>
        <div style={{ width: "120px" }} />
      </div>

      {/* BODY */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "20px", padding: "20px", flex: 1, maxWidth: "1100px", margin: "0 auto", width: "100%" }}>

        {/* IZQUIERDA */}
        <div>
          <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", marginBottom: "16px", overflow: "hidden" }}>
            <div style={{ padding: "14px 16px", borderBottom: "1px solid #f0f2fa" }}>
              <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "14px", color: "#0D0C56", marginBottom: "10px" }}>¿A dónde quieres ir?</div>
              <input
                placeholder="Buscar destino..."
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
                style={{ width: "100%", border: "1.5px solid #e8edf8", borderRadius: "8px", padding: "9px 12px", fontSize: "12px", outline: "none", boxSizing: "border-box" }}
              />
            </div>
            <div style={{ padding: "16px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "10px" }}>
              {filtrados.map(d => {
                const yaSeleccionado = seleccionados.find(s => s.ciudad === d.ciudad);
                return (
                  <div
                    key={d.ciudad}
                    onClick={() => agregar(d)}
                    style={{ borderRadius: "12px", border: `1.5px solid ${yaSeleccionado ? "#1667E6" : "#e8edf8"}`, background: yaSeleccionado ? "#f0f5ff" : "#fff", padding: "14px 10px", textAlign: "center", cursor: yaSeleccionado ? "default" : "pointer", transition: "all 0.2s" }}
                    onMouseEnter={e => { if (!yaSeleccionado) (e.currentTarget as HTMLElement).style.borderColor = "#1667E6"; }}
                    onMouseLeave={e => { if (!yaSeleccionado) (e.currentTarget as HTMLElement).style.borderColor = "#e8edf8"; }}
                  >
                    <div style={{ fontSize: "28px", marginBottom: "6px" }}>{d.emoji}</div>
                    <div style={{ fontWeight: "700", fontSize: "12px", color: "#0D0C56" }}>{d.ciudad}</div>
                    <div style={{ fontSize: "10px", color: "#888" }}>{d.pais}</div>
                    {yaSeleccionado && <div style={{ fontSize: "10px", color: "#1667E6", fontWeight: "700", marginTop: "4px" }}>✓ Agregado</div>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div>
          <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", overflow: "hidden", marginBottom: "12px" }}>
            <div style={{ padding: "12px 16px", background: "#0D0C56" }}>
              <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "13px", color: "#fff" }}>Tu itinerario</div>
            </div>
            <div style={{ padding: "12px 14px" }}>
              {seleccionados.length === 0 ? (
                <div style={{ textAlign: "center", padding: "24px 0", fontSize: "12px", color: "#aaa" }}>
                  <div style={{ fontSize: "28px", marginBottom: "8px" }}>🗺</div>
                  Selecciona destinos para armar tu viaje
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {seleccionados.map((d, i) => (
                    <div key={d.ciudad} style={{ background: "#f5f7ff", borderRadius: "10px", padding: "12px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ fontSize: "18px" }}>{d.emoji}</span>
                          <div>
                            <div style={{ fontWeight: "700", fontSize: "12px", color: "#0D0C56" }}>{d.ciudad}</div>
                            <div style={{ fontSize: "10px", color: "#888" }}>Parada {i + 1}</div>
                          </div>
                        </div>
                        <span onClick={() => quitar(d.ciudad)} style={{ fontSize: "16px", cursor: "pointer", color: "#aaa" }}>×</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                        <span style={{ fontSize: "11px", color: "#888" }}>Días</span>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <button onClick={() => actualizarDias(d.ciudad, Math.max(1, d.dias - 1))} style={{ width: "24px", height: "24px", borderRadius: "50%", border: "1.5px solid #e8edf8", background: "#fff", cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                          <span style={{ fontWeight: "700", fontSize: "13px", color: "#0D0C56", minWidth: "20px", textAlign: "center" }}>{d.dias}</span>
                          <button onClick={() => actualizarDias(d.ciudad, d.dias + 1)} style={{ width: "24px", height: "24px", borderRadius: "50%", border: "1.5px solid #e8edf8", background: "#fff", cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ fontSize: "11px", color: "#888" }}>Hospedaje</span>
                        <select value={d.hospedaje} onChange={e => actualizarHospedaje(d.ciudad, e.target.value)} style={{ border: "1.5px solid #e8edf8", borderRadius: "6px", padding: "3px 6px", fontSize: "11px", outline: "none", background: "#fff" }}>
                          <option>Cualquier tipo</option>
                          <option>Hotel</option>
                          <option>Airbnb</option>
                          <option>Hostal</option>
                          <option>Sin hospedaje</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {seleccionados.length > 0 && (
              <div style={{ padding: "10px 14px", borderTop: "1px solid #f0f2fa", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "11px", color: "#888" }}>Total: <strong style={{ color: "#0D0C56" }}>{totalDias} días</strong></span>
                <span style={{ fontSize: "11px", color: "#888" }}>{seleccionados.length} destinos</span>
              </div>
            )}
          </div>

          <button
            disabled={seleccionados.length === 0}
            style={{ width: "100%", padding: "13px", backgroundColor: "#FF5C00", color: "#fff", border: "none", borderRadius: "13px", fontFamily: "sans-serif", fontWeight: "800", fontSize: "14px", cursor: seleccionados.length === 0 ? "not-allowed" : "pointer", opacity: seleccionados.length === 0 ? 0.4 : 1 }}
          >
            Continuar → Vuelos
          </button>
        </div>
      </div>
    </div>
  );
}
