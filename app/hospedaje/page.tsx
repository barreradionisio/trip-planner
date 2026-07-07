"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "../components/Logo";
import { useIsMobile } from "../hooks/useIsMobile";

const ciudades = [
  {
    ciudad: "París",
    hoteles: [
      { id: 1, nombre: "Hotel Le Marais", estrellas: 4, precio: 180, desc: "En el corazón de París, a pasos del Louvre.", servicios: ["WiFi", "Desayuno", "Gimnasio"] },
      { id: 2, nombre: "Apartamento Montmartre", estrellas: 3, precio: 120, desc: "Acogedor con vista a la Torre Eiffel.", servicios: ["WiFi", "Cocina"] },
      { id: 3, nombre: "Grand Hôtel Paris", estrellas: 5, precio: 380, desc: "Lujo y elegancia en la ciudad luz.", servicios: ["WiFi", "Desayuno", "Piscina", "Spa"] },
    ]
  },
  {
    ciudad: "Roma",
    hoteles: [
      { id: 4, nombre: "Hotel Roma Centro", estrellas: 4, precio: 160, desc: "A 5 minutos del Coliseo.", servicios: ["WiFi", "Desayuno", "Bar"] },
      { id: 5, nombre: "Hostal Trastevere", estrellas: 3, precio: 90, desc: "El barrio más auténtico de Roma.", servicios: ["WiFi"] },
    ]
  },
];

const tiposHabitacion = [
  { key: "sencilla", label: "Sencilla", extra: 0 },
  { key: "doble", label: "Doble", extra: 20 },
  { key: "suite", label: "Suite", extra: 80 },
  { key: "familiar", label: "Familiar", extra: 50 },
];

type Habitaciones = { [key: string]: number };

export default function Hospedaje() {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [ciudadActiva, setCiudadActiva] = useState(0);
  const [seleccionados, setSeleccionados] = useState<{ [key: string]: number }>({});
  const [habitaciones, setHabitaciones] = useState<Habitaciones>({ sencilla: 0, doble: 1, suite: 0, familiar: 0 });

  const totalHabitaciones = Object.values(habitaciones).reduce((a, b) => a + b, 0);
  const ciudadesSeleccionadas = Object.keys(seleccionados).length;

  const actualizarHab = (key: string, delta: number) => {
    setHabitaciones(prev => ({ ...prev, [key]: Math.max(0, prev[key] + delta) }));
  };

  const seleccionar = (ciudad: string, id: number) => {
    setSeleccionados(prev => ({ ...prev, [ciudad]: id }));
    if (ciudadActiva < ciudades.length - 1) {
      setTimeout(() => setCiudadActiva(ciudadActiva + 1), 300);
    }
  };

  const puedeContinuar = ciudadesSeleccionadas >= ciudades.length && totalHabitaciones > 0;

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
                  <div style={{ width: "22px", height: "22px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "800", background: i < 2 ? "#3ED5A9" : i === 2 ? "#1667E6" : "rgba(255,255,255,0.15)", color: i < 3 ? "#0D0C56" : "rgba(255,255,255,0.4)" }}>{i < 2 ? "✓" : i + 1}</div>
                  <span style={{ fontSize: "11px", fontWeight: "600", color: i === 2 ? "#fff" : i < 2 ? "#3ED5A9" : "rgba(255,255,255,0.4)" }}>{s}</span>
                </div>
                {i < 5 && <div style={{ width: "16px", height: "1px", background: "rgba(255,255,255,0.15)" }} />}
              </div>
            ))
          ) : (
            <div style={{ fontSize: "11px", fontWeight: "700", color: "#fff" }}>Paso 3 de 6 · Hospedaje</div>
          )}
        </div>
        <div style={{ width: isMobile ? "0" : "120px" }} />
      </div>

      {/* BODY */}
      <div style={{ display: isMobile ? "flex" : "grid", flexDirection: isMobile ? "column" : undefined, gridTemplateColumns: isMobile ? undefined : "1fr 320px", gap: "20px", padding: isMobile ? "16px" : "20px", flex: 1, maxWidth: "1100px", margin: "0 auto", width: "100%", boxSizing: "border-box" }}>

        {/* IZQUIERDA */}
        <div>
          {/* TABS CIUDADES */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
            {ciudades.map((c, i) => (
              <button
                key={c.ciudad}
                onClick={() => setCiudadActiva(i)}
                style={{ padding: "8px 16px", border: `1.5px solid ${ciudadActiva === i ? "#1667E6" : seleccionados[c.ciudad] ? "#3ED5A9" : "#e8edf8"}`, borderRadius: "50px", fontSize: "12px", fontWeight: "700", cursor: "pointer", background: ciudadActiva === i ? "#1667E6" : seleccionados[c.ciudad] ? "#e8fff5" : "#fff", color: ciudadActiva === i ? "#fff" : seleccionados[c.ciudad] ? "#085041" : "#0D0C56" }}
              >
                {seleccionados[c.ciudad] ? "✓ " : ""}{c.ciudad}
              </button>
            ))}
          </div>

          {/* HABITACIONES */}
          <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", padding: "14px 16px", marginBottom: "16px" }}>
            <div style={{ fontSize: "10px", fontWeight: "700", color: "#1667E6", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "10px" }}>
              Habitaciones · Total: {totalHabitaciones}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "8px" }}>
              {tiposHabitacion.map(t => (
                <div key={t.key} style={{ border: `1.5px solid ${habitaciones[t.key] > 0 ? "#1667E6" : "#e8edf8"}`, borderRadius: "10px", padding: "10px 8px", background: habitaciones[t.key] > 0 ? "#f0f5ff" : "#fff", textAlign: "center" }}>
                  <div style={{ fontWeight: "700", fontSize: "11px", color: "#0D0C56", marginBottom: "2px" }}>{t.label}</div>
                  {t.extra > 0 && <div style={{ fontSize: "10px", color: "#1667E6", marginBottom: "4px" }}>+${t.extra}</div>}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                    <button onClick={() => actualizarHab(t.key, -1)} style={{ width: "22px", height: "22px", borderRadius: "50%", border: "1.5px solid #e8edf8", background: "#fff", cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                    <span style={{ fontWeight: "800", fontSize: "13px", color: "#0D0C56" }}>{habitaciones[t.key]}</span>
                    <button onClick={() => actualizarHab(t.key, 1)} style={{ width: "22px", height: "22px", borderRadius: "50%", border: "1.5px solid #e8edf8", background: "#fff", cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* HOTELES */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {ciudades[ciudadActiva].hoteles.map(h => (
              <div
                key={h.id}
                onClick={() => seleccionar(ciudades[ciudadActiva].ciudad, h.id)}
                style={{ background: seleccionados[ciudades[ciudadActiva].ciudad] === h.id ? "#f8faff" : "#fff", borderRadius: "13px", border: `1.5px solid ${seleccionados[ciudades[ciudadActiva].ciudad] === h.id ? "#1667E6" : "#e8edf8"}`, padding: "14px 16px", cursor: "pointer", transition: "all 0.2s" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                      <div style={{ fontWeight: "800", fontSize: "13px", color: "#0D0C56" }}>{h.nombre}</div>
                      <div style={{ fontSize: "11px", color: "#F5A623" }}>{"★".repeat(h.estrellas)}</div>
                    </div>
                    <div style={{ fontSize: "11px", color: "#888", marginBottom: "6px" }}>{h.desc}</div>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {h.servicios.map(s => (
                        <span key={s} style={{ fontSize: "10px", background: "#f0f5ff", color: "#1667E6", padding: "2px 8px", borderRadius: "50px", fontWeight: "600" }}>{s}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0, marginLeft: "12px" }}>
                    <div style={{ fontWeight: "800", fontSize: "16px", color: "#1667E6" }}>${h.precio}</div>
                    <div style={{ fontSize: "10px", color: "#888" }}>USD/noche</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SIDEBAR */}
        <div>
          <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", overflow: "hidden", marginBottom: "12px" }}>
            <div style={{ padding: "10px 14px", background: "#0D0C56" }}>
              <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "12px", color: "#fff" }}>Hospedaje seleccionado</div>
            </div>
            <div style={{ padding: "12px 14px" }}>
              {ciudades.map(c => {
                const hotel = c.hoteles.find(h => h.id === seleccionados[c.ciudad]);
                return (
                  <div key={c.ciudad} style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", padding: "5px 0", borderBottom: "1px solid #f5f7ff" }}>
                    <span style={{ color: "#888" }}>{c.ciudad}</span>
                    <span style={{ fontWeight: "600", color: hotel ? "#1667E6" : "#aaa" }}>{hotel ? `$${hotel.precio}/noche` : "Sin seleccionar"}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <Link
            href={puedeContinuar ? "/itinerario" : "#"}
            style={{ width: "100%", padding: "13px", backgroundColor: "#FF5C00", color: "#fff", border: "none", borderRadius: "13px", fontFamily: "sans-serif", fontWeight: "800", fontSize: "14px", cursor: !puedeContinuar ? "not-allowed" : "pointer", opacity: !puedeContinuar ? 0.4 : 1, textDecoration: "none", display: "block", textAlign: "center", boxSizing: "border-box" as const }}
          >
            Continuar → Itinerario
          </Link>
        </div>
      </div>
    </div>
  );
}
