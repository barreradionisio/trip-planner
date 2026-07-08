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
  { key: "sencilla", label: "Sencilla", desc: "1 cama individual", extra: 0 },
  { key: "doble", label: "Doble", desc: "2 camas matrimoniales", extra: 20 },
  { key: "suite", label: "Suite", desc: "2 camas matrimoniales + sala", extra: 80 },
  { key: "familiar", label: "Familiar", desc: "2 camas + área kids", extra: 50 },
];

const serviciosDisponibles = ["WiFi", "Desayuno", "Piscina", "Spa", "Gimnasio", "Restaurante", "Bar", "Estacionamiento"];

export default function Hospedaje() {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [ciudadActiva, setCiudadActiva] = useState(0);
  const [seleccionados, setSeleccionados] = useState<{ [key: string]: number }>({});
  const [habitaciones, setHabitaciones] = useState<{ [key: string]: number }>({ sencilla: 0, doble: 1, suite: 0, familiar: 0 });
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [precioMax, setPrecioMax] = useState(500);
  const [filtroEstrellas, setFiltroEstrellas] = useState(0);
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState<string[]>([]);
  const [ordenar, setOrdenar] = useState("precio");

  const totalHabitaciones = Object.values(habitaciones).reduce((a, b) => a + b, 0);
  const ciudadesSeleccionadas = Object.keys(seleccionados).length;
  const puedeContinuar = ciudadesSeleccionadas >= ciudades.length && totalHabitaciones > 0;

  const actualizarHab = (key: string, delta: number) => {
    setHabitaciones(prev => ({ ...prev, [key]: Math.max(0, prev[key] + delta) }));
  };

  const toggleServicio = (s: string) => {
    setServiciosSeleccionados(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  };

  const filtrosActivos = (filtroEstrellas > 0 ? 1 : 0) + (precioMax < 500 ? 1 : 0) + serviciosSeleccionados.length;

  const limpiarFiltros = () => {
    setFiltroEstrellas(0);
    setPrecioMax(500);
    setServiciosSeleccionados([]);
  };

  const seleccionar = (ciudad: string, id: number) => {
    setSeleccionados(prev => ({ ...prev, [ciudad]: id }));
    if (ciudadActiva < ciudades.length - 1) {
      setTimeout(() => setCiudadActiva(ciudadActiva + 1), 300);
    }
  };

  const hotelesFiltrados = ciudades[ciudadActiva].hoteles
    .filter(h => {
      const estrellasOk = filtroEstrellas === 0 || h.estrellas >= filtroEstrellas;
      const precioOk = h.precio <= precioMax;
      const serviciosOk = serviciosSeleccionados.length === 0 || serviciosSeleccionados.every(s => h.servicios.includes(s));
      return estrellasOk && precioOk && serviciosOk;
    })
    .sort((a, b) => {
      if (ordenar === "precio") return a.precio - b.precio;
      if (ordenar === "estrellas") return b.estrellas - a.estrellas;
      return 0;
    });

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
          <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
            {ciudades.map((c, i) => (
              <button key={c.ciudad} onClick={() => setCiudadActiva(i)} style={{ padding: "8px 16px", border: `1.5px solid ${ciudadActiva === i ? "#1667E6" : seleccionados[c.ciudad] ? "#3ED5A9" : "#e8edf8"}`, borderRadius: "50px", fontSize: "12px", fontWeight: "700", cursor: "pointer", background: ciudadActiva === i ? "#1667E6" : seleccionados[c.ciudad] ? "#e8fff5" : "#fff", color: ciudadActiva === i ? "#fff" : seleccionados[c.ciudad] ? "#085041" : "#0D0C56" }}>
                {seleccionados[c.ciudad] ? "✓ " : ""}{c.ciudad}
              </button>
            ))}
          </div>

          {/* HABITACIONES */}
          <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", overflow: "hidden", marginBottom: "12px" }}>
            <div style={{ padding: "10px 14px", background: "#0D0C56", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "12px", color: "#fff" }}>Habitaciones · Total: {totalHabitaciones}</div>
            </div>
            <div style={{ padding: "12px 14px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "8px" }}>
              {tiposHabitacion.map(t => (
                <div key={t.key} style={{ border: `1.5px solid ${habitaciones[t.key] > 0 ? "#1667E6" : "#e8edf8"}`, borderRadius: "10px", padding: "10px 8px", background: habitaciones[t.key] > 0 ? "#f0f5ff" : "#fff", textAlign: "center" }}>
                  <div style={{ fontWeight: "700", fontSize: "11px", color: "#0D0C56", marginBottom: "2px" }}>{t.label}</div>
                  <div style={{ fontSize: "10px", color: "#888", marginBottom: "4px" }}>{t.desc}</div>
                  {t.extra > 0 && <div style={{ fontSize: "10px", color: "#1667E6", marginBottom: "4px" }}>+${t.extra}/noche</div>}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                    <button onClick={() => actualizarHab(t.key, -1)} style={{ width: "22px", height: "22px", borderRadius: "50%", border: "1.5px solid #e8edf8", background: "#fff", cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                    <span style={{ fontWeight: "800", fontSize: "13px", color: "#0D0C56" }}>{habitaciones[t.key]}</span>
                    <button onClick={() => actualizarHab(t.key, 1)} style={{ width: "22px", height: "22px", borderRadius: "50%", border: "1.5px solid #e8edf8", background: "#fff", cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                  </div>
                </div>
              ))}
            </div>

            {/* FILTROS DESPLEGABLES */}
            <div style={{ borderTop: "1px solid #f0f2fa" }}>
              <button onClick={() => setMostrarFiltros(!mostrarFiltros)} style={{ width: "100%", padding: "10px 14px", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1667E6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
                  </svg>
                  <span style={{ fontSize: "12px", fontWeight: "700", color: "#1667E6" }}>Filtros</span>
                  {filtrosActivos > 0 && (
                    <span style={{ background: "#1667E6", color: "#fff", borderRadius: "50%", width: "18px", height: "18px", fontSize: "10px", fontWeight: "800", display: "flex", alignItems: "center", justifyContent: "center" }}>{filtrosActivos}</span>
                  )}
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1667E6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={mostrarFiltros ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"}/>
                </svg>
              </button>

              {mostrarFiltros && (
                <div style={{ padding: "12px 14px", borderTop: "1px solid #f0f2fa" }}>
                  <div style={{ marginBottom: "14px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <span style={{ fontSize: "10px", fontWeight: "700", color: "#1667E6", textTransform: "uppercase", letterSpacing: "0.4px" }}>Precio máximo por noche</span>
                      <span style={{ fontSize: "11px", fontWeight: "700", color: "#0D0C56" }}>Hasta ${precioMax} USD</span>
                    </div>
                    <input type="range" min={50} max={500} step={10} value={precioMax} onChange={e => setPrecioMax(Number(e.target.value))} style={{ width: "100%", accentColor: "#1667E6" }} />
                  </div>

                  <div style={{ marginBottom: "14px" }}>
                    <div style={{ fontSize: "10px", fontWeight: "700", color: "#1667E6", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "8px" }}>Mínimo de estrellas</div>
                    <div style={{ display: "flex", gap: "6px" }}>
                      {[{ v: 0, l: "Todos" }, { v: 3, l: "3★+" }, { v: 4, l: "4★+" }, { v: 5, l: "5★+" }].map(e => (
                        <button key={e.v} onClick={() => setFiltroEstrellas(e.v)} style={{ padding: "5px 12px", border: `1.5px solid ${filtroEstrellas === e.v ? "#1667E6" : "#e8edf8"}`, borderRadius: "50px", fontSize: "11px", fontWeight: "600", cursor: "pointer", background: filtroEstrellas === e.v ? "#1667E6" : "#fff", color: filtroEstrellas === e.v ? "#fff" : "#888" }}>
                          {e.l}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: "14px" }}>
                    <div style={{ fontSize: "10px", fontWeight: "700", color: "#1667E6", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "8px" }}>
                      Servicios {serviciosSeleccionados.length > 0 && `· ${serviciosSeleccionados.length} seleccionados`}
                    </div>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {serviciosDisponibles.map(s => (
                        <button key={s} onClick={() => toggleServicio(s)} style={{ padding: "5px 12px", border: `1.5px solid ${serviciosSeleccionados.includes(s) ? "#1667E6" : "#e8edf8"}`, borderRadius: "50px", fontSize: "11px", fontWeight: "600", cursor: "pointer", background: serviciosSeleccionados.includes(s) ? "#1667E6" : "#fff", color: serviciosSeleccionados.includes(s) ? "#fff" : "#888" }}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {filtrosActivos > 0 && (
                    <button onClick={limpiarFiltros} style={{ padding: "8px 16px", background: "#fff", color: "#FF5C00", border: "1.5px solid #FF5C00", borderRadius: "8px", fontSize: "12px", fontWeight: "700", cursor: "pointer" }}>
                      Limpiar filtros
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ORDENAR */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <span style={{ fontSize: "12px", color: "#888" }}>{hotelesFiltrados.length} hoteles</span>
            <select value={ordenar} onChange={e => setOrdenar(e.target.value)} style={{ border: "1.5px solid #e8edf8", borderRadius: "8px", padding: "6px 10px", fontSize: "12px", outline: "none", background: "#fff" }}>
              <option value="precio">Precio: menor a mayor</option>
              <option value="estrellas">Estrellas: mayor a menor</option>
            </select>
          </div>

          {/* HOTELES */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {hotelesFiltrados.map(h => (
              <div key={h.id} onClick={() => seleccionar(ciudades[ciudadActiva].ciudad, h.id)} style={{ background: seleccionados[ciudades[ciudadActiva].ciudad] === h.id ? "#f8faff" : "#fff", borderRadius: "13px", border: `1.5px solid ${seleccionados[ciudades[ciudadActiva].ciudad] === h.id ? "#1667E6" : "#e8edf8"}`, padding: "14px 16px", cursor: "pointer", transition: "all 0.2s" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                      <div style={{ fontWeight: "800", fontSize: "13px", color: "#0D0C56" }}>{h.nombre}</div>
                      <div style={{ fontSize: "11px", color: "#F5A623" }}>{"★".repeat(h.estrellas)}</div>
                    </div>
                    <div style={{ fontSize: "11px", color: "#888", marginBottom: "6px" }}>{h.desc}</div>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {h.servicios.map(s => (
                        <span key={s} style={{ fontSize: "10px", background: serviciosSeleccionados.includes(s) ? "#e8fff5" : "#f0f5ff", color: serviciosSeleccionados.includes(s) ? "#085041" : "#1667E6", padding: "2px 8px", borderRadius: "50px", fontWeight: "600" }}>{s}</span>
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
          {!puedeContinuar && (
            <div style={{ fontSize: "11px", color: "#888", textAlign: "center", marginTop: "8px" }}>
              Selecciona hotel para cada ciudad y al menos una habitación
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
