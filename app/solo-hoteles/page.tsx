"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "../components/Logo";

const hotelesData = [
  { id: 1, nombre: "Hotel Le Marais", ciudad: "París", pais: "Francia", estrellas: 4, calificacion: 4.7, resenas: 1243, precio: 180, descripcion: "Ubicado en el corazón de París, a pasos del Louvre.", servicios: ["WiFi", "Desayuno", "Gimnasio", "Spa"] },
  { id: 2, nombre: "Apartamento Montmartre", ciudad: "París", pais: "Francia", estrellas: 3, calificacion: 4.5, resenas: 876, precio: 120, descripcion: "Acogedor apartamento con vista a la Torre Eiffel.", servicios: ["WiFi", "Cocina", "Balcón"] },
  { id: 3, nombre: "Grand Hôtel Paris", ciudad: "París", pais: "Francia", estrellas: 5, calificacion: 4.9, resenas: 2100, precio: 380, descripcion: "Lujo y elegancia en el centro de la ciudad luz.", servicios: ["WiFi", "Desayuno", "Piscina", "Spa", "Restaurante"] },
  { id: 4, nombre: "Hotel Roma Centro", ciudad: "Roma", pais: "Italia", estrellas: 4, calificacion: 4.6, resenas: 987, precio: 160, descripcion: "A 5 minutos del Coliseo y la Fontana di Trevi.", servicios: ["WiFi", "Desayuno", "Bar"] },
  { id: 5, nombre: "Hostal Trastevere", ciudad: "Roma", pais: "Italia", estrellas: 3, calificacion: 4.3, resenas: 654, precio: 90, descripcion: "Ambiente bohemio en el barrio más auténtico de Roma.", servicios: ["WiFi", "Cocina compartida"] },
  { id: 6, nombre: "The Manhattan Hotel", ciudad: "Nueva York", pais: "EE.UU.", estrellas: 4, calificacion: 4.5, resenas: 1876, precio: 220, descripcion: "En el corazón de Manhattan, a pasos de Times Square.", servicios: ["WiFi", "Gimnasio", "Bar", "Restaurante"] },
  { id: 7, nombre: "Shibuya Crossing Hotel", ciudad: "Tokio", pais: "Japón", estrellas: 4, calificacion: 4.8, resenas: 2340, precio: 195, descripcion: "Vistas al famoso cruce de Shibuya desde tu habitación.", servicios: ["WiFi", "Desayuno", "Spa", "Piscina"] },
];

const tiposHabitacion = [
  { key: "sencilla", label: "Sencilla", sub: "1 cama individual", extra: 0 },
  { key: "doble", label: "Doble", sub: "2 camas matrimoniales", extra: 20 },
  { key: "suite", label: "Suite", sub: "2 camas matrimoniales + sala", extra: 80 },
  { key: "familiar", label: "Familiar", sub: "2 camas + área kids", extra: 50 },
];

const serviciosFiltro = ["WiFi", "Desayuno", "Piscina", "Spa", "Gimnasio", "Restaurante", "Bar", "Estacionamiento", "Mascotas permitidas", "Acceso playa"];

type Habitaciones = { [key: string]: number };

export default function SoloHoteles() {
  const [seleccionado, setSeleccionado] = useState<number | null>(null);
  const [habitaciones, setHabitaciones] = useState<Habitaciones>({ sencilla: 0, doble: 1, suite: 0, familiar: 0 });
  const [filtroPrecio, setFiltroPrecio] = useState(500);
  const [filtroEstrellas, setFiltroEstrellas] = useState(0);
  const [filtroServicios, setFiltroServicios] = useState<string[]>([]);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  const totalHabitaciones = Object.values(habitaciones).reduce((a, b) => a + b, 0);

  const precioHabitaciones = (precioBase: number) =>
    tiposHabitacion.reduce((acc, t) => acc + (habitaciones[t.key] * (precioBase + t.extra)), 0);

  const toggleServicio = (s: string) => {
    setFiltroServicios(prev =>
      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
    );
  };

  const hotelesFiltrados = hotelesData.filter(h => {
    const precioOk = h.precio <= filtroPrecio;
    const estrellasOk = filtroEstrellas === 0 || h.estrellas >= filtroEstrellas;
    const serviciosOk = filtroServicios.length === 0 || filtroServicios.every(s => h.servicios.includes(s));
    return precioOk && estrellasOk && serviciosOk;
  });

  const hotelSeleccionado = hotelesData.find(h => h.id === seleccionado);
  const actualizarHab = (key: string, delta: number) => {
    setHabitaciones(prev => ({ ...prev, [key]: Math.max(0, prev[key] + delta) }));
  };
  const renderEstrellas = (n: number) => "★".repeat(n) + "☆".repeat(5 - n);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Montserrat',sans-serif", background: "#f5f7ff" }}>

      {/* NAV */}
      <nav style={{ background: "#fff", padding: "12px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #e8edf8", position: "relative" }}>
        <Link href="/"><Logo variant="color" /></Link>
        <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "16px", alignItems: "center", width: "440px", justifyContent: "center" }}>
  <Link href="/destinos" style={{ fontSize: "13px", color: "#0D0C56", textDecoration: "none", fontWeight: "600", padding: "6px 14px", borderRadius: "50px" }}>Arma tu viaje</Link>
  <Link href="/solo-vuelos" style={{ fontSize: "13px", color: "#0D0C56", textDecoration: "none", fontWeight: "600", padding: "6px 14px", borderRadius: "50px" }}>Vuelos</Link>
  <Link href="/solo-hoteles" style={{ fontSize: "13px", color: "#0D0C56", textDecoration: "none", fontWeight: "600", padding: "6px 14px", borderRadius: "50px" }}>Hoteles</Link>
  <Link href="/soporte" style={{ fontSize: "13px", color: "#0D0C56", textDecoration: "none", fontWeight: "600", padding: "6px 14px", borderRadius: "50px" }}>Soporte</Link>
</div>
        <Link href="/login" style={{ fontSize: "13px", background: "#1667E6", color: "#fff", textDecoration: "none", fontWeight: "700", padding: "8px 18px", borderRadius: "50px" }}>Iniciar sesión</Link>
      </nav>

      {/* BUSCADOR */}
      <div style={{ background: "linear-gradient(135deg,#0D0C56,#1667E6)", padding: "28px 24px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr auto", gap: "10px", alignItems: "flex-end" }}>
            <div>
              <div style={{ fontSize: "10px", fontWeight: "700", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "4px" }}>Destino</div>
              <input placeholder="¿A qué ciudad vas?" style={{ width: "100%", border: "1.5px solid rgba(255,255,255,0.3)", borderRadius: "8px", padding: "10px 12px", fontSize: "12px", outline: "none", boxSizing: "border-box" as const, background: "#f0f5ff" }} />
            </div>
            <div>
              <div style={{ fontSize: "10px", fontWeight: "700", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "4px" }}>Check-in</div>
              <input type="date" style={{ width: "100%", border: "1.5px solid rgba(255,255,255,0.3)", borderRadius: "8px", padding: "10px 12px", fontSize: "12px", outline: "none", boxSizing: "border-box" as const, background: "#f0f5ff" }} />
            </div>
            <div>
              <div style={{ fontSize: "10px", fontWeight: "700", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "4px" }}>Check-out</div>
              <input type="date" style={{ width: "100%", border: "1.5px solid rgba(255,255,255,0.3)", borderRadius: "8px", padding: "10px 12px", fontSize: "12px", outline: "none", boxSizing: "border-box" as const, background: "#f0f5ff" }} />
            </div>
            <button style={{ padding: "10px 24px", backgroundColor: "#FF5C00", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "800", fontSize: "13px", cursor: "pointer", height: "40px", whiteSpace: "nowrap" }}>
              Buscar hoteles
            </button>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "20px", padding: "20px", flex: 1, maxWidth: "1000px", margin: "0 auto", width: "100%" }}>

        {/* IZQUIERDA */}
        <div>
          {/* FILTROS */}
          <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", padding: "14px 16px", marginBottom: "16px" }}>
            <div style={{ display: "flex", gap: "20px", alignItems: "flex-start", flexWrap: "wrap" }}>

              {/* HABITACIONES POR TIPO */}
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "10px", fontWeight: "700", color: "#1667E6", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "6px" }}>
                  Habitaciones · <span style={{ color: "#0D0C56" }}>Total: {totalHabitaciones}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "8px" }}>
                  {tiposHabitacion.map(t => (
                    <div key={t.key} style={{ border: `1.5px solid ${habitaciones[t.key] > 0 ? "#1667E6" : "#e8edf8"}`, borderRadius: "10px", padding: "10px", background: habitaciones[t.key] > 0 ? "#f0f5ff" : "#fff", textAlign: "center" }}>
                      <div style={{ fontWeight: "700", fontSize: "12px", color: "#0D0C56", marginBottom: "2px" }}>{t.label}</div>
                      <div style={{ fontSize: "10px", color: "#888", marginBottom: "4px" }}>{t.sub}</div>
                      {t.extra > 0 && <div style={{ fontSize: "10px", color: "#1667E6", marginBottom: "4px" }}>+${t.extra}/noche</div>}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                        <button onClick={() => actualizarHab(t.key, -1)} style={{ width: "24px", height: "24px", borderRadius: "50%", border: "1.5px solid #e8edf8", background: "#fff", cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                        <span style={{ fontWeight: "800", fontSize: "14px", color: "#0D0C56", minWidth: "16px", textAlign: "center" }}>{habitaciones[t.key]}</span>
                        <button onClick={() => actualizarHab(t.key, 1)} style={{ width: "24px", height: "24px", borderRadius: "50%", border: "1.5px solid #e8edf8", background: "#fff", cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* BOTÓN FILTROS */}
              <button
                onClick={() => setMostrarFiltros(!mostrarFiltros)}
                style={{ padding: "8px 16px", border: `1.5px solid ${mostrarFiltros ? "#1667E6" : "#e8edf8"}`, borderRadius: "8px", fontSize: "12px", fontWeight: "700", cursor: "pointer", background: mostrarFiltros ? "#f0f5ff" : "#fff", color: mostrarFiltros ? "#1667E6" : "#0D0C56", alignSelf: "flex-end", position: "relative" }}
              >
                ⚙ Filtros {mostrarFiltros ? "▲" : "▼"}
                {filtroServicios.length > 0 && (
                  <span style={{ position: "absolute", top: "-6px", right: "-6px", width: "16px", height: "16px", borderRadius: "50%", background: "#1667E6", color: "#fff", fontSize: "9px", fontWeight: "800", display: "flex", alignItems: "center", justifyContent: "center" }}>{filtroServicios.length}</span>
                )}
              </button>
            </div>

            {/* PANEL FILTROS EXTRA */}
            {mostrarFiltros && (
              <div style={{ marginTop: "14px", paddingTop: "14px", borderTop: "1px solid #f0f2fa", display: "flex", flexDirection: "column", gap: "16px" }}>

                {/* PRECIO Y ESTRELLAS */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <div style={{ fontSize: "10px", fontWeight: "700", color: "#1667E6", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "8px" }}>Precio máximo por noche</div>
                    <input type="range" min={50} max={500} value={filtroPrecio} onChange={e => setFiltroPrecio(Number(e.target.value))} style={{ width: "100%" }} />
                    <div style={{ fontSize: "11px", color: "#0D0C56", fontWeight: "700", marginTop: "4px" }}>Hasta ${filtroPrecio} USD</div>
                  </div>
                  <div>
                    <div style={{ fontSize: "10px", fontWeight: "700", color: "#1667E6", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "8px" }}>Mínimo de estrellas</div>
                    <div style={{ display: "flex", gap: "6px" }}>
                      {[0, 3, 4, 5].map(s => (
                        <button key={s} onClick={() => setFiltroEstrellas(s)} style={{ padding: "6px 12px", border: `1.5px solid ${filtroEstrellas === s ? "#1667E6" : "#e8edf8"}`, borderRadius: "8px", fontSize: "11px", fontWeight: "700", cursor: "pointer", background: filtroEstrellas === s ? "#1667E6" : "#fff", color: filtroEstrellas === s ? "#fff" : "#0D0C56" }}>
                          {s === 0 ? "Todos" : `${s}★+`}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* SERVICIOS */}
                <div>
                  <div style={{ fontSize: "10px", fontWeight: "700", color: "#1667E6", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "8px" }}>
                    Servicios {filtroServicios.length > 0 && <span style={{ color: "#0D0C56" }}>· {filtroServicios.length} seleccionados</span>}
                  </div>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {serviciosFiltro.map(s => (
                      <button
                        key={s}
                        onClick={() => toggleServicio(s)}
                        style={{ padding: "6px 12px", border: `1.5px solid ${filtroServicios.includes(s) ? "#1667E6" : "#e8edf8"}`, borderRadius: "50px", fontSize: "11px", fontWeight: "600", cursor: "pointer", background: filtroServicios.includes(s) ? "#1667E6" : "#fff", color: filtroServicios.includes(s) ? "#fff" : "#0D0C56", transition: "all 0.2s" }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* LIMPIAR FILTROS */}
                {(filtroServicios.length > 0 || filtroEstrellas > 0 || filtroPrecio < 500) && (
                  <button
                    onClick={() => { setFiltroServicios([]); setFiltroEstrellas(0); setFiltroPrecio(500); }}
                    style={{ alignSelf: "flex-start", padding: "6px 14px", background: "#ffeaea", color: "#c0392b", border: "1.5px solid #ffd0d0", borderRadius: "8px", fontSize: "11px", fontWeight: "700", cursor: "pointer" }}
                  >
                    Limpiar filtros
                  </button>
                )}
              </div>
            )}
          </div>

          {/* RESULTADO */}
          <div style={{ fontSize: "11px", color: "#888", marginBottom: "10px", padding: "0 4px" }}>
            {hotelesFiltrados.length} hotel{hotelesFiltrados.length !== 1 ? "es" : ""} encontrado{hotelesFiltrados.length !== 1 ? "s" : ""}
          </div>

          {/* LISTA HOTELES */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {hotelesFiltrados.map(h => (
              <div
                key={h.id}
                onClick={() => setSeleccionado(h.id)}
                style={{ background: seleccionado === h.id ? "#f8faff" : "#fff", borderRadius: "13px", border: `1.5px solid ${seleccionado === h.id ? "#1667E6" : "#e8edf8"}`, padding: "16px 20px", cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", gap: "16px", boxShadow: seleccionado === h.id ? "0 4px 20px rgba(22,103,230,0.1)" : "none" }}
                onMouseEnter={e => { if (seleccionado !== h.id) (e.currentTarget as HTMLElement).style.borderColor = "#1667E6"; }}
                onMouseLeave={e => { if (seleccionado !== h.id) (e.currentTarget as HTMLElement).style.borderColor = "#e8edf8"; }}
              >
                <div style={{ width: "56px", height: "56px", borderRadius: "10px", background: "linear-gradient(135deg,#0D0C56,#1667E6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", flexShrink: 0 }}>🏨</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "2px" }}>
                    <div style={{ fontWeight: "800", fontSize: "14px", color: "#0D0C56" }}>{h.nombre}</div>
                    <div style={{ fontSize: "11px", color: "#F5A623" }}>{renderEstrellas(h.estrellas)}</div>
                  </div>
                  <div style={{ fontSize: "11px", color: "#888", marginBottom: "6px" }}>{h.ciudad}, {h.pais} · {h.descripcion}</div>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", alignItems: "center" }}>
                    {h.servicios.map(s => (
                      <span key={s} style={{ fontSize: "10px", background: filtroServicios.includes(s) ? "#1667E6" : "#f0f5ff", color: filtroServicios.includes(s) ? "#fff" : "#1667E6", padding: "2px 8px", borderRadius: "50px", fontWeight: "600" }}>{s}</span>
                    ))}
                    <button onClick={e => { e.stopPropagation(); alert("Fotos disponibles cuando se integre la API del hotel."); }} style={{ fontSize: "10px", background: "#fff", color: "#888", border: "1.5px solid #e8edf8", padding: "2px 10px", borderRadius: "50px", fontWeight: "600", cursor: "pointer" }}>📷 Ver fotos</button>
                  </div>
                </div>
                <div style={{ textAlign: "right", minWidth: "120px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", justifyContent: "flex-end", marginBottom: "2px" }}>
                    <span style={{ fontSize: "13px", color: "#F5A623" }}>★</span>
                    <span style={{ fontWeight: "700", fontSize: "13px", color: "#0D0C56" }}>{h.calificacion}</span>
                    <span style={{ fontSize: "10px", color: "#888" }}>({h.resenas})</span>
                  </div>
                  <div style={{ fontWeight: "800", fontSize: "18px", color: "#1667E6" }}>desde ${h.precio}</div>
                  <div style={{ fontSize: "10px", color: "#888" }}>USD / noche</div>
                  {totalHabitaciones > 0 && <div style={{ fontSize: "11px", color: "#888", marginTop: "2px" }}>${precioHabitaciones(h.precio)}/noche total</div>}
                  {seleccionado === h.id && <div style={{ fontSize: "10px", color: "#1667E6", fontWeight: "700", marginTop: "4px" }}>✓ Seleccionado</div>}
                </div>
              </div>
            ))}
            {hotelesFiltrados.length === 0 && (
              <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", padding: "40px", textAlign: "center" }}>
                <div style={{ fontSize: "32px", marginBottom: "8px" }}>🔍</div>
                <div style={{ fontWeight: "700", fontSize: "13px", color: "#0D0C56", marginBottom: "4px" }}>No hay hoteles que coincidan</div>
                <div style={{ fontSize: "12px", color: "#aaa" }}>Prueba ajustando los filtros</div>
              </div>
            )}
          </div>
        </div>

        {/* SIDEBAR */}
        <div>
          <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", overflow: "hidden", marginBottom: "12px" }}>
            <div style={{ padding: "12px 16px", background: "#0D0C56" }}>
              <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "13px", color: "#fff" }}>Tu selección</div>
            </div>
            <div style={{ padding: "12px 14px" }}>
              {hotelSeleccionado ? (
                <div>
                  <div style={{ fontWeight: "800", fontSize: "13px", color: "#0D0C56", marginBottom: "4px" }}>{hotelSeleccionado.nombre}</div>
                  <div style={{ fontSize: "11px", color: "#888", marginBottom: "8px" }}>{hotelSeleccionado.ciudad}</div>
                  {tiposHabitacion.filter(t => habitaciones[t.key] > 0).map(t => (
                    <div key={t.key} style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", padding: "4px 0", borderBottom: "1px solid #f5f7ff" }}>
                      <span style={{ color: "#888" }}>{habitaciones[t.key]}x {t.label}</span>
                      <span style={{ fontWeight: "600", color: "#0D0C56" }}>${(hotelSeleccionado.precio + t.extra) * habitaciones[t.key]}/noche</span>
                    </div>
                  ))}
                  {totalHabitaciones > 0 && (
                    <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "8px" }}>
                      <span style={{ fontWeight: "800", fontSize: "12px", color: "#0D0C56" }}>Total/noche</span>
                      <span style={{ fontWeight: "800", fontSize: "16px", color: "#1667E6" }}>${precioHabitaciones(hotelSeleccionado.precio)} USD</span>
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "20px 0", fontSize: "12px", color: "#aaa" }}>
                  <div style={{ fontSize: "24px", marginBottom: "8px" }}>🏨</div>
                  Selecciona un hotel para continuar
                </div>
              )}
            </div>
          </div>

          <button
            disabled={!seleccionado || totalHabitaciones === 0}
            style={{ width: "100%", padding: "13px", backgroundColor: "#FF5C00", color: "#fff", border: "none", borderRadius: "13px", fontFamily: "sans-serif", fontWeight: "800", fontSize: "14px", cursor: (!seleccionado || totalHabitaciones === 0) ? "not-allowed" : "pointer", opacity: (!seleccionado || totalHabitaciones === 0) ? 0.4 : 1 }}
          >
            Continuar → Pago
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: "#0D0C56", padding: "32px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
        <div>
          <Logo variant="teal" />
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginTop: "12px" }}>© 2026 Trip Planner · no-reply@tripplanner.mx</p>
        </div>
        <div style={{ display: "flex", gap: "24px" }}>
          <Link href="/soporte" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Centro de ayuda</Link>
          <Link href="/soporte" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Contacto</Link>
          <Link href="/privacidad" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Política de privacidad</Link>
        </div>
      </footer>
    </div>
  );
}
