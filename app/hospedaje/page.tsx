"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "../components/Logo";

const hotelesData = [
  { id: 1, nombre: "Hotel Le Marais", ciudad: "París", estrellas: 4, calificacion: 4.7, resenas: 1243, precio: 180, descripcion: "Ubicado en el corazón de París, a pasos del Louvre.", servicios: ["WiFi", "Desayuno", "Gimnasio", "Spa"] },
  { id: 2, nombre: "Apartamento Montmartre", ciudad: "París", estrellas: 3, calificacion: 4.5, resenas: 876, precio: 120, descripcion: "Acogedor apartamento con vista a la Torre Eiffel.", servicios: ["WiFi", "Cocina", "Balcón"] },
  { id: 3, nombre: "Grand Hôtel Paris", ciudad: "París", estrellas: 5, calificacion: 4.9, resenas: 2100, precio: 380, descripcion: "Lujo y elegancia en el centro de la ciudad luz.", servicios: ["WiFi", "Desayuno", "Piscina", "Spa", "Restaurante"] },
  { id: 4, nombre: "Hotel Roma Centro", ciudad: "Roma", estrellas: 4, calificacion: 4.6, resenas: 987, precio: 160, descripcion: "A 5 minutos del Coliseo y la Fontana di Trevi.", servicios: ["WiFi", "Desayuno", "Bar"] },
  { id: 5, nombre: "Hostal Trastevere", ciudad: "Roma", estrellas: 3, calificacion: 4.3, resenas: 654, precio: 90, descripcion: "Ambiente bohemio en el barrio más auténtico de Roma.", servicios: ["WiFi", "Cocina compartida"] },
  { id: 6, nombre: "Villa Borghese Suites", ciudad: "Roma", estrellas: 5, calificacion: 4.8, resenas: 1567, precio: 320, descripcion: "Suites de lujo con jardín privado y vista panorámica.", servicios: ["WiFi", "Desayuno", "Piscina", "Spa", "Jardín"] },
];

const tiposHabitacion = [
  { key: "sencilla", label: "Sencilla", sub: "1 cama individual", extra: 0 },
  { key: "doble", label: "Doble", sub: "2 camas matrimoniales", extra: 20 },
  { key: "suite", label: "Suite", sub: "2 camas matrimoniales + sala", extra: 80 },
  { key: "familiar", label: "Familiar", sub: "2 camas + área kids", extra: 50 },
];

const ciudades = ["París", "Roma"];
const noches = 3;

type Habitaciones = { [key: string]: number };

export default function Hospedaje() {
  const [ciudadActiva, setCiudadActiva] = useState("París");
  const [seleccionados, setSeleccionados] = useState<{ [key: string]: number }>({});
  const [habitaciones, setHabitaciones] = useState<Habitaciones>({ sencilla: 0, doble: 1, suite: 0, familiar: 0 });

  const hotelesCiudad = hotelesData.filter(h => h.ciudad === ciudadActiva);
  const ciudadesSeleccionadas = Object.keys(seleccionados).length;

  const totalHabitaciones = Object.values(habitaciones).reduce((a, b) => a + b, 0);

  const precioHabitaciones = (precioBase: number) =>
    tiposHabitacion.reduce((acc, t) => acc + (habitaciones[t.key] * (precioBase + t.extra)), 0);

  const precioTotal = Object.entries(seleccionados).reduce((acc, [, id]) => {
    const h = hotelesData.find(h => h.id === id);
    return acc + (h ? precioHabitaciones(h.precio) * noches : 0);
  }, 0);

  const renderEstrellas = (n: number) => "★".repeat(n) + "☆".repeat(5 - n);

  const actualizarHab = (key: string, delta: number) => {
    setHabitaciones(prev => ({ ...prev, [key]: Math.max(0, prev[key] + delta) }));
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Montserrat',sans-serif", background: "#f5f7ff" }}>

      {/* TOPBAR */}
      <div style={{ background: "#0D0C56", padding: "11px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <Logo variant="teal" />
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {["Destinos", "Vuelos", "Hospedaje", "Itinerario", "Pago"].map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "22px", height: "22px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "800", background: i < 2 ? "#3ED5A9" : i === 2 ? "#1667E6" : "rgba(255,255,255,0.15)", color: i < 3 ? "#0D0C56" : "rgba(255,255,255,0.4)" }}>{i < 2 ? "✓" : i + 1}</div>
                <span style={{ fontSize: "11px", fontWeight: "600", color: i === 2 ? "#fff" : i < 2 ? "#3ED5A9" : "rgba(255,255,255,0.4)" }}>{s}</span>
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
          {/* FILTROS */}
          <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", padding: "16px", marginBottom: "16px" }}>
            <div style={{ display: "flex", gap: "20px", alignItems: "flex-start", flexWrap: "wrap" }}>

              {/* CIUDAD */}
              <div>
                <div style={{ fontSize: "10px", fontWeight: "700", color: "#1667E6", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "6px" }}>Ciudad</div>
                <div style={{ display: "flex", gap: "6px" }}>
                  {ciudades.map(c => (
                    <button
                      key={c}
                      onClick={() => setCiudadActiva(c)}
                      style={{ padding: "7px 14px", border: `1.5px solid ${ciudadActiva === c ? "#1667E6" : "#e8edf8"}`, borderRadius: "8px", fontSize: "12px", fontWeight: "700", cursor: "pointer", background: ciudadActiva === c ? "#1667E6" : "#fff", color: ciudadActiva === c ? "#fff" : "#0D0C56", position: "relative" }}
                    >
                      {c}
                      {seleccionados[c] !== undefined && (
                        <span style={{ position: "absolute", top: "-6px", right: "-6px", width: "14px", height: "14px", borderRadius: "50%", background: "#3ED5A9", color: "#0D0C56", fontSize: "9px", fontWeight: "800", display: "flex", alignItems: "center", justifyContent: "center" }}>✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* HABITACIONES POR TIPO */}
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "10px", fontWeight: "700", color: "#1667E6", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "6px" }}>
                  Habitaciones · <span style={{ color: "#0D0C56" }}>Total: {totalHabitaciones}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "8px" }}>
                  {tiposHabitacion.map(t => (
                    <div key={t.key} style={{ border: `1.5px solid ${habitaciones[t.key] > 0 ? "#1667E6" : "#e8edf8"}`, borderRadius: "10px", padding: "10px", background: habitaciones[t.key] > 0 ? "#f0f5ff" : "#fff", textAlign: "center" }}>
                      <div style={{ fontWeight: "700", fontSize: "12px", color: "#0D0C56", marginBottom: "2px" }}>{t.label}</div>
                      <div style={{ fontSize: "10px", color: "#888", marginBottom: "6px" }}>{t.sub}</div>
                      {t.extra > 0 && <div style={{ fontSize: "10px", color: "#1667E6", marginBottom: "6px" }}>+${t.extra}/noche</div>}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                        <button onClick={() => actualizarHab(t.key, -1)} style={{ width: "24px", height: "24px", borderRadius: "50%", border: "1.5px solid #e8edf8", background: "#fff", cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                        <span style={{ fontWeight: "800", fontSize: "14px", color: "#0D0C56", minWidth: "16px", textAlign: "center" }}>{habitaciones[t.key]}</span>
                        <button onClick={() => actualizarHab(t.key, 1)} style={{ width: "24px", height: "24px", borderRadius: "50%", border: "1.5px solid #e8edf8", background: "#fff", cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* TITULO */}
          <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "14px", color: "#0D0C56", marginBottom: "12px", padding: "0 4px" }}>
            Hoteles en {ciudadActiva} · {noches} noches
          </div>

          {/* LISTA HOTELES */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {hotelesCiudad.map(h => (
              <div
                key={h.id}
                onClick={() => setSeleccionados({ ...seleccionados, [ciudadActiva]: h.id })}
                style={{ background: seleccionados[ciudadActiva] === h.id ? "#f8faff" : "#fff", borderRadius: "13px", border: `1.5px solid ${seleccionados[ciudadActiva] === h.id ? "#1667E6" : "#e8edf8"}`, padding: "16px 20px", cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", boxShadow: seleccionados[ciudadActiva] === h.id ? "0 4px 20px rgba(22,103,230,0.1)" : "none" }}
                onMouseEnter={e => { if (seleccionados[ciudadActiva] !== h.id) (e.currentTarget as HTMLElement).style.borderColor = "#1667E6"; }}
                onMouseLeave={e => { if (seleccionados[ciudadActiva] !== h.id) (e.currentTarget as HTMLElement).style.borderColor = "#e8edf8"; }}
              >
                <div style={{ width: "56px", height: "56px", borderRadius: "10px", background: "linear-gradient(135deg,#0D0C56,#1667E6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", flexShrink: 0 }}>🏨</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "2px" }}>
                    <div style={{ fontWeight: "800", fontSize: "14px", color: "#0D0C56" }}>{h.nombre}</div>
                    <div style={{ fontSize: "11px", color: "#F5A623" }}>{renderEstrellas(h.estrellas)}</div>
                  </div>
                  <div style={{ fontSize: "11px", color: "#888", marginBottom: "6px" }}>{h.descripcion}</div>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", alignItems: "center" }}>
                    {h.servicios.map(s => (
                      <span key={s} style={{ fontSize: "10px", background: "#f0f5ff", color: "#1667E6", padding: "2px 8px", borderRadius: "50px", fontWeight: "600" }}>{s}</span>
                    ))}
                    <button
                      onClick={e => { e.stopPropagation(); alert("Fotos disponibles cuando se integre la API del hotel."); }}
                      style={{ fontSize: "10px", background: "#fff", color: "#888", border: "1.5px solid #e8edf8", padding: "2px 10px", borderRadius: "50px", fontWeight: "600", cursor: "pointer" }}
                    >📷 Ver fotos</button>
                  </div>
                </div>
                <div style={{ textAlign: "right", minWidth: "130px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", justifyContent: "flex-end", marginBottom: "2px" }}>
                    <span style={{ fontSize: "13px", color: "#F5A623" }}>★</span>
                    <span style={{ fontWeight: "700", fontSize: "13px", color: "#0D0C56" }}>{h.calificacion}</span>
                    <span style={{ fontSize: "10px", color: "#888" }}>({h.resenas})</span>
                  </div>
                  <div style={{ fontWeight: "800", fontSize: "18px", color: "#1667E6" }}>desde ${h.precio}</div>
                  <div style={{ fontSize: "10px", color: "#888" }}>USD / noche</div>
                  {totalHabitaciones > 0 && (
                    <div style={{ fontSize: "11px", color: "#888", marginTop: "2px" }}>${precioHabitaciones(h.precio) * noches} total</div>
                  )}
                  {seleccionados[ciudadActiva] === h.id && (
                    <div style={{ fontSize: "10px", color: "#1667E6", fontWeight: "700", marginTop: "4px" }}>✓ Seleccionado</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SIDEBAR */}
        <div>
          <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", overflow: "hidden", marginBottom: "12px" }}>
            <div style={{ padding: "12px 16px", background: "#0D0C56" }}>
              <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "13px", color: "#fff" }}>Resumen de hospedaje</div>
            </div>
            <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: "8px" }}>
              {ciudades.map(c => {
                const h = hotelesData.find(h => h.id === seleccionados[c]);
                return (
                  <div key={c} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "8px", borderRadius: "8px", background: h ? "#f0f5ff" : "#f5f7ff" }}>
                    <div>
                      <div style={{ fontWeight: "700", fontSize: "11px", color: "#0D0C56" }}>{c}</div>
                      <div style={{ fontSize: "10px", color: "#888" }}>{h ? h.nombre : "Sin seleccionar"}</div>
                      {h && totalHabitaciones > 0 && (
                        <div style={{ fontSize: "10px", color: "#888", marginTop: "2px" }}>
                          {tiposHabitacion.filter(t => habitaciones[t.key] > 0).map(t => `${habitaciones[t.key]} ${t.label}`).join(" · ")}
                        </div>
                      )}
                      {h && <div style={{ fontSize: "10px", color: "#888" }}>{noches} noches</div>}
                    </div>
                    {h && totalHabitaciones > 0 ? (
                      <span style={{ fontWeight: "700", fontSize: "12px", color: "#1667E6" }}>${precioHabitaciones(h.precio) * noches}</span>
                    ) : (
                      <span style={{ fontSize: "10px", color: "#aaa" }}>—</span>
                    )}
                  </div>
                );
              })}
              {ciudadesSeleccionadas > 0 && totalHabitaciones > 0 && (
                <div style={{ borderTop: "1px solid #f0f2fa", paddingTop: "8px", display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "11px", color: "#888" }}>Total hospedaje</span>
                  <span style={{ fontWeight: "800", fontSize: "14px", color: "#1667E6" }}>${precioTotal} USD</span>
                </div>
              )}
            </div>
          </div>

          <button
            disabled={ciudadesSeleccionadas < ciudades.length || totalHabitaciones === 0}
            style={{ width: "100%", padding: "13px", backgroundColor: "#FF5C00", color: "#fff", border: "none", borderRadius: "13px", fontFamily: "sans-serif", fontWeight: "800", fontSize: "14px", cursor: (ciudadesSeleccionadas < ciudades.length || totalHabitaciones === 0) ? "not-allowed" : "pointer", opacity: (ciudadesSeleccionadas < ciudades.length || totalHabitaciones === 0) ? 0.4 : 1 }}
          >
            <Link href="/itinerario" style={{ width: "100%", padding: "13px", backgroundColor: "#FF5C00", color: "#fff", border: "none", borderRadius: "13px", fontFamily: "sans-serif", fontWeight: "800", fontSize: "14px", cursor: (ciudadesSeleccionadas < ciudades.length || totalHabitaciones === 0) ? "not-allowed" : "pointer", opacity: (ciudadesSeleccionadas < ciudades.length || totalHabitaciones === 0) ? 0.4 : 1, textDecoration: "none", display: "block", textAlign: "center", boxSizing: "border-box" as const }}>
  Continuar → Itinerario
</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
