"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "../components/Logo";
import NavUsuario from "../components/NavUsuario";

const hotelesData = [
  { id: 1, nombre: "Hotel Le Marais", ciudad: "París", estrellas: 4, precio: 180, desc: "En el corazón de París, a pasos del Louvre.", servicios: ["WiFi", "Desayuno", "Gimnasio"], tipo: "Hotel" },
  { id: 2, nombre: "Apartamento Montmartre", ciudad: "París", estrellas: 3, precio: 120, desc: "Acogedor con vista a la Torre Eiffel.", servicios: ["WiFi", "Cocina"], tipo: "Apartamento" },
  { id: 3, nombre: "Grand Hôtel Paris", ciudad: "París", estrellas: 5, precio: 380, desc: "Lujo y elegancia en la ciudad luz.", servicios: ["WiFi", "Desayuno", "Piscina", "Spa"], tipo: "Hotel" },
  { id: 4, nombre: "Hotel Roma Centro", ciudad: "Roma", estrellas: 4, precio: 160, desc: "A 5 minutos del Coliseo.", servicios: ["WiFi", "Desayuno", "Bar"], tipo: "Hotel" },
  { id: 5, nombre: "Hostal Trastevere", ciudad: "Roma", estrellas: 3, precio: 90, desc: "El barrio más auténtico de Roma.", servicios: ["WiFi"], tipo: "Hostal" },
  { id: 6, nombre: "The Ritz London", ciudad: "Londres", estrellas: 5, precio: 520, desc: "Icónico hotel de lujo en Piccadilly.", servicios: ["WiFi", "Desayuno", "Piscina", "Spa", "Bar"], tipo: "Hotel" },
];

const tiposHabitacion = [
  { key: "sencilla", label: "Sencilla", desc: "1 cama individual", extra: 0 },
  { key: "doble", label: "Doble", desc: "2 camas matrimoniales", extra: 20 },
  { key: "suite", label: "Suite", desc: "2 camas matrimoniales + sala", extra: 80 },
  { key: "familiar", label: "Familiar", desc: "2 camas + área kids", extra: 50 },
];

const serviciosDisponibles = ["WiFi", "Desayuno", "Piscina", "Spa", "Gimnasio", "Restaurante", "Bar", "Estacionamiento", "Mascotas permitidas", "Acceso playa"];

export default function SoloHoteles() {
  const router = useRouter();
  const [seleccionado, setSeleccionado] = useState<number | null>(null);
  const [habitaciones, setHabitaciones] = useState<{ [key: string]: number }>({ sencilla: 0, doble: 1, suite: 0, familiar: 0 });
  const [filtroEstrellas, setFiltroEstrellas] = useState(0);
  const [precioMax, setPrecioMax] = useState(600);
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState<string[]>([]);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [ordenar, setOrdenar] = useState("precio");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");

  const totalHabitaciones = Object.values(habitaciones).reduce((a, b) => a + b, 0);
  const hotelSeleccionado = hotelesData.find(h => h.id === seleccionado);

  const actualizarHab = (key: string, delta: number) => {
    setHabitaciones(prev => ({ ...prev, [key]: Math.max(0, prev[key] + delta) }));
  };

  const toggleServicio = (s: string) => {
    setServiciosSeleccionados(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  };

  const filtrosActivos = (filtroEstrellas > 0 ? 1 : 0) + (precioMax < 600 ? 1 : 0) + serviciosSeleccionados.length;

  const limpiarFiltros = () => {
    setFiltroEstrellas(0);
    setPrecioMax(600);
    setServiciosSeleccionados([]);
  };

  const filtrados = hotelesData
    .filter(h => {
      const estrellasOk = filtroEstrellas === 0 || h.estrellas >= filtroEstrellas;
      const precioOk = h.precio <= precioMax;
      const serviciosOk = serviciosSeleccionados.length === 0 || serviciosSeleccionados.every(s => h.servicios.includes(s));
      return estrellasOk && precioOk && serviciosOk;
    })
    .sort((a, b) => ordenar === "precio" ? a.precio - b.precio : ordenar === "estrellas" ? b.estrellas - a.estrellas : a.nombre.localeCompare(b.nombre));

  const irAPasajeros = () => {
    if (!seleccionado || totalHabitaciones === 0) return;
    sessionStorage.setItem("hotel_seleccionado", JSON.stringify({
  ...hotelSeleccionado,
  noches: checkin && checkout ? Math.max(1, Math.round((new Date(checkout).getTime() - new Date(checkin).getTime()) / (1000 * 60 * 60 * 24))) : 1
}));
    sessionStorage.setItem("habitaciones", JSON.stringify(habitaciones));
    router.push("/pasajeros?tipo=hotel");
  };

  const formatFecha = (fecha: string) => {
    if (!fecha) return "";
    const [y, m, d] = fecha.split("-");
    const meses = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];
    return `${d} ${meses[parseInt(m)-1]} ${y}`;
  };

  // Componente reutilizable para habitaciones + filtros
  const HabitacionesYFiltros = () => (
    <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", overflow: "hidden", marginBottom: "12px" }}>
      <div style={{ padding: "10px 14px", background: "#0D0C56" }}>
        <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "12px", color: "#fff" }}>Habitaciones · Total: {totalHabitaciones}</div>
      </div>
      <div className="sh-hab-grid">
        {tiposHabitacion.map(t => (
          <div key={t.key} style={{ border: `1.5px solid ${habitaciones[t.key] > 0 ? "#1667E6" : "#e8edf8"}`, borderRadius: "10px", padding: "10px 8px", background: habitaciones[t.key] > 0 ? "#f0f5ff" : "#fff", textAlign: "center" }}>
            <div style={{ fontWeight: "700", fontSize: "11px", color: "#0D0C56", marginBottom: "2px" }}>{t.label}</div>
            <div style={{ fontSize: "10px", color: "#888", marginBottom: "4px" }}>{t.desc}</div>
            {t.extra > 0 && <div style={{ fontSize: "10px", color: "#1667E6", marginBottom: "4px" }}>+${t.extra}/noche</div>}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
              <button onClick={() => actualizarHab(t.key, -1)} style={{ width: "24px", height: "24px", borderRadius: "50%", border: "1.5px solid #e8edf8", background: "#fff", cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Montserrat, sans-serif" }}>−</button>
              <span style={{ fontWeight: "800", fontSize: "13px", color: "#0D0C56" }}>{habitaciones[t.key]}</span>
              <button onClick={() => actualizarHab(t.key, 1)} style={{ width: "24px", height: "24px", borderRadius: "50%", border: "1.5px solid #e8edf8", background: "#fff", cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Montserrat, sans-serif" }}>+</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ borderTop: "1px solid #f0f2fa" }}>
        <button onClick={() => setMostrarFiltros(!mostrarFiltros)} style={{ width: "100%", padding: "10px 14px", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "Montserrat, sans-serif" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1667E6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
            </svg>
            <span style={{ fontSize: "12px", fontWeight: "700", color: "#1667E6" }}>Filtros</span>
            {filtrosActivos > 0 && <span style={{ background: "#1667E6", color: "#fff", borderRadius: "50%", width: "18px", height: "18px", fontSize: "10px", fontWeight: "800", display: "flex", alignItems: "center", justifyContent: "center" }}>{filtrosActivos}</span>}
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1667E6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d={mostrarFiltros ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"}/>
          </svg>
        </button>
        {mostrarFiltros && (
          <div style={{ padding: "12px 14px", borderTop: "1px solid #f0f2fa" }}>
            <div style={{ marginBottom: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <span style={{ fontSize: "10px", fontWeight: "700", color: "#1667E6", textTransform: "uppercase", letterSpacing: "0.4px" }}>Precio máximo</span>
                <span style={{ fontSize: "11px", fontWeight: "700", color: "#0D0C56" }}>${precioMax} USD</span>
              </div>
              <input type="range" min={50} max={600} step={10} value={precioMax} onChange={e => setPrecioMax(Number(e.target.value))} style={{ width: "100%", accentColor: "#1667E6" }} />
            </div>
            <div style={{ marginBottom: "14px" }}>
              <div style={{ fontSize: "10px", fontWeight: "700", color: "#1667E6", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "8px" }}>Mínimo de estrellas</div>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {[{ v: 0, l: "Todos" }, { v: 3, l: "3★+" }, { v: 4, l: "4★+" }, { v: 5, l: "5★+" }].map(e => (
                  <button key={e.v} onClick={() => setFiltroEstrellas(e.v)} style={{ padding: "5px 10px", border: `1.5px solid ${filtroEstrellas === e.v ? "#1667E6" : "#e8edf8"}`, borderRadius: "50px", fontSize: "11px", fontWeight: "600", cursor: "pointer", background: filtroEstrellas === e.v ? "#1667E6" : "#fff", color: filtroEstrellas === e.v ? "#fff" : "#888", fontFamily: "Montserrat, sans-serif" }}>
                    {e.l}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: "14px" }}>
              <div style={{ fontSize: "10px", fontWeight: "700", color: "#1667E6", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "8px" }}>
                Servicios {serviciosSeleccionados.length > 0 && `· ${serviciosSeleccionados.length}`}
              </div>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {serviciosDisponibles.map(s => (
                  <button key={s} onClick={() => toggleServicio(s)} style={{ padding: "4px 10px", border: `1.5px solid ${serviciosSeleccionados.includes(s) ? "#1667E6" : "#e8edf8"}`, borderRadius: "50px", fontSize: "10px", fontWeight: "600", cursor: "pointer", background: serviciosSeleccionados.includes(s) ? "#1667E6" : "#fff", color: serviciosSeleccionados.includes(s) ? "#fff" : "#888", fontFamily: "Montserrat, sans-serif" }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            {filtrosActivos > 0 && (
              <button onClick={limpiarFiltros} style={{ padding: "8px 16px", background: "#fff", color: "#FF5C00", border: "1.5px solid #FF5C00", borderRadius: "8px", fontSize: "12px", fontWeight: "700", cursor: "pointer", fontFamily: "Montserrat, sans-serif" }}>
                Limpiar filtros
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        .sh-wrap {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          font-family: 'Montserrat', sans-serif;
          background: #f5f7ff;
          width: 100%;
          max-width: 100vw;
          overflow-x: hidden;
        }
        .sh-nav {
          background: #fff;
          padding: 12px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #e8edf8;
          position: relative;
        }
        .sh-nav-links {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 16px;
          align-items: center;
        }
        .sh-buscador {
          background: linear-gradient(135deg,#0D0C56,#1667E6);
          padding: 28px 24px;
        }
        .sh-buscador-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr auto;
          gap: 10px;
          align-items: flex-end;
          max-width: 900px;
          margin: 0 auto;
        }
        .sh-body {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 20px;
          padding: 20px;
          flex: 1;
          max-width: 1000px;
          margin: 0 auto;
          width: 100%;
        }
        .sh-sidebar { display: flex; flex-direction: column; }
        .sh-mobile-only { display: none; }
        .sh-hab-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          padding: 12px 14px;
        }
        .sh-card {
          background: #fff;
          border-radius: 13px;
          border: 1.5px solid #e8edf8;
          padding: 16px;
          cursor: pointer;
          transition: all 0.2s;
          width: 100%;
          text-align: left;
          font-family: 'Montserrat', sans-serif;
          -webkit-appearance: none;
          display: block;
          max-width: 100%;
          box-sizing: border-box;
          margin-bottom: 10px;
        }
        .sh-card:active { opacity: 0.8; }
        .sh-label {
          font-size: 10px;
          font-weight: 700;
          color: rgba(255,255,255,0.6);
          text-transform: uppercase;
          letter-spacing: 0.4px;
          margin-bottom: 4px;
          display: block;
        }
        .sh-fecha-wrap { position: relative; width: 100%; }
        .sh-fecha-display {
          width: 100%;
          border: 1.5px solid rgba(255,255,255,0.3);
          border-radius: 8px;
          padding: 9px 36px 9px 12px;
          font-size: 12px;
          color: #0D0C56;
          background: #f0f5ff;
          cursor: pointer;
          display: flex;
          align-items: center;
          min-height: 38px;
          font-family: 'Montserrat', sans-serif;
        }
        .sh-fecha-display.placeholder { color: #aaa; }
        .sh-fecha-icon {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
        }
        .sh-fecha-input {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          opacity: 0;
          cursor: pointer;
          font-size: 16px;
        }
        .sh-input {
          width: 100%;
          border: 1.5px solid rgba(255,255,255,0.3);
          border-radius: 8px;
          padding: 10px 12px;
          font-size: 12px;
          outline: none;
          background: #f0f5ff;
          font-family: 'Montserrat', sans-serif;
          color: #0D0C56;
        }

        @media (max-width: 768px) {
          .sh-nav { padding: 12px 16px; }
          .sh-nav-links { display: none; }
          .sh-buscador { padding: 16px; }
          .sh-buscador-grid { grid-template-columns: 1fr 1fr; gap: 8px; }
          .sh-buscador-grid > *:last-child { grid-column: 1 / -1; }
          .sh-body { grid-template-columns: 1fr; padding: 12px; overflow: hidden; }
          .sh-sidebar { display: none; }
          .sh-mobile-only { display: block; }
          .sh-card { padding: 14px; }
        }
      `}</style>

      <div className="sh-wrap">

        {/* NAV */}
        <nav className="sh-nav">
          <Link href="/"><Logo variant="color" /></Link>
          <div className="sh-nav-links">
            <Link href="/destinos" style={{ fontSize: "13px", color: "#0D0C56", textDecoration: "none", fontWeight: "600", padding: "6px 14px", borderRadius: "50px" }}>Arma tu viaje</Link>
            <Link href="/solo-vuelos" style={{ fontSize: "13px", color: "#0D0C56", textDecoration: "none", fontWeight: "600", padding: "6px 14px", borderRadius: "50px" }}>Vuelos</Link>
            <Link href="/solo-hoteles" style={{ fontSize: "13px", color: "#1667E6", textDecoration: "none", fontWeight: "700", padding: "6px 14px", borderRadius: "50px", background: "#f0f5ff" }}>Hoteles</Link>
            <Link href="/soporte" style={{ fontSize: "13px", color: "#0D0C56", textDecoration: "none", fontWeight: "600", padding: "6px 14px", borderRadius: "50px" }}>Soporte</Link>
          </div>
          <NavUsuario />
        </nav>

        {/* BUSCADOR */}
        <div className="sh-buscador">
          <div className="sh-buscador-grid">
            <div>
              <label className="sh-label">Destino</label>
              <input placeholder="¿A dónde vas?" className="sh-input" />
            </div>
            <div>
              <label className="sh-label">Check-in</label>
              <div className="sh-fecha-wrap">
                <div className={`sh-fecha-display ${!checkin ? "placeholder" : ""}`}>
                  {checkin ? formatFecha(checkin) : "dd/mm/aaaa"}
                </div>
                <div className="sh-fecha-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={checkin ? "#1667E6" : "#888"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </div>
                <input type="date" value={checkin} onChange={e => setCheckin(e.target.value)} className="sh-fecha-input" />
              </div>
            </div>
            <div>
              <label className="sh-label">Check-out</label>
              <div className="sh-fecha-wrap">
                <div className={`sh-fecha-display ${!checkout ? "placeholder" : ""}`}>
                  {checkout ? formatFecha(checkout) : "dd/mm/aaaa"}
                </div>
                <div className="sh-fecha-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={checkout ? "#1667E6" : "#888"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </div>
                <input type="date" value={checkout} onChange={e => setCheckout(e.target.value)} className="sh-fecha-input" />
              </div>
            </div>
            <button style={{ padding: "10px 24px", backgroundColor: "#FF5C00", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "800", fontSize: "13px", cursor: "pointer", height: "40px", whiteSpace: "nowrap", fontFamily: "Montserrat, sans-serif" }}>
              Buscar
            </button>
          </div>
        </div>

        {/* BODY */}
        <div className="sh-body">

          {/* IZQUIERDA */}
          <div style={{ overflow: "hidden", width: "100%" }}>

            {/* HABITACIONES Y FILTROS — SOLO MÓVIL */}
            <div className="sh-mobile-only">
              <HabitacionesYFiltros />
            </div>

            {/* ORDENAR */}
            <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", padding: "12px 16px", marginBottom: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "12px", color: "#888" }}>{filtrados.length} hoteles encontrados</span>
              <select value={ordenar} onChange={e => setOrdenar(e.target.value)} style={{ border: "1.5px solid #e8edf8", borderRadius: "8px", padding: "6px 10px", fontSize: "12px", outline: "none", background: "#fff", fontFamily: "Montserrat, sans-serif" }}>
                <option value="precio">Precio: menor a mayor</option>
                <option value="estrellas">Estrellas: mayor a menor</option>
                <option value="nombre">Nombre: A-Z</option>
              </select>
            </div>

            {/* HOTELES */}
            {filtrados.map(h => (
              <button key={h.id} className="sh-card" onClick={() => setSeleccionado(h.id)}
                style={{ background: seleccionado === h.id ? "#f8faff" : "#fff", border: `1.5px solid ${seleccionado === h.id ? "#1667E6" : "#e8edf8"}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px", flexWrap: "wrap" }}>
                      <div style={{ fontWeight: "800", fontSize: "13px", color: "#0D0C56" }}>{h.nombre}</div>
                      <span style={{ fontSize: "10px", background: "#f5f7ff", color: "#888", padding: "2px 8px", borderRadius: "50px" }}>{h.tipo}</span>
                      <div style={{ fontSize: "11px", color: "#F5A623" }}>{"★".repeat(h.estrellas)}</div>
                    </div>
                    <div style={{ fontSize: "11px", color: "#888", marginBottom: "6px" }}>{h.ciudad} · {h.desc}</div>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {h.servicios.map(s => (
                        <span key={s} style={{ fontSize: "10px", background: serviciosSeleccionados.includes(s) ? "#e8fff5" : "#f5f7ff", color: serviciosSeleccionados.includes(s) ? "#085041" : "#888", padding: "2px 8px", borderRadius: "50px", fontWeight: "600" }}>{s}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0, marginLeft: "12px" }}>
                    <div style={{ fontWeight: "800", fontSize: "16px", color: "#1667E6" }}>${h.precio}</div>
                    <div style={{ fontSize: "10px", color: "#888" }}>USD/noche</div>
                  </div>
                </div>
              </button>
            ))}

            {/* BOTÓN CONTINUAR MÓVIL */}
            <div className="sh-mobile-only">
              {hotelSeleccionado && (
                <div style={{ background: "#f0f5ff", borderRadius: "13px", border: "1.5px solid #e0eaff", padding: "14px", marginBottom: "12px" }}>
                  <div style={{ fontWeight: "700", fontSize: "12px", color: "#1667E6", marginBottom: "4px" }}>Hotel seleccionado</div>
                  <div style={{ fontWeight: "800", fontSize: "13px", color: "#0D0C56", marginBottom: "2px" }}>{hotelSeleccionado.nombre}</div>
                  <div style={{ fontWeight: "800", fontSize: "16px", color: "#1667E6" }}>${hotelSeleccionado.precio} USD/noche</div>
                </div>
              )}
              <button onClick={irAPasajeros} disabled={!seleccionado || totalHabitaciones === 0} style={{ width: "100%", padding: "13px", backgroundColor: "#FF5C00", color: "#fff", border: "none", borderRadius: "13px", fontFamily: "sans-serif", fontWeight: "800", fontSize: "14px", opacity: (!seleccionado || totalHabitaciones === 0) ? 0.4 : 1, cursor: (!seleccionado || totalHabitaciones === 0) ? "not-allowed" : "pointer" }}>
                Continuar → Huespedes
              </button>
            </div>
          </div>

          {/* SIDEBAR DESKTOP */}
          <div className="sh-sidebar">
            <HabitacionesYFiltros />
            {hotelSeleccionado && (
              <div style={{ background: "#f0f5ff", borderRadius: "13px", border: "1.5px solid #e0eaff", padding: "14px", marginBottom: "12px" }}>
                <div style={{ fontWeight: "700", fontSize: "12px", color: "#1667E6", marginBottom: "6px" }}>Hotel seleccionado</div>
                <div style={{ fontWeight: "800", fontSize: "13px", color: "#0D0C56", marginBottom: "2px" }}>{hotelSeleccionado.nombre}</div>
                <div style={{ fontSize: "11px", color: "#888", marginBottom: "6px" }}>{hotelSeleccionado.ciudad} · {"★".repeat(hotelSeleccionado.estrellas)}</div>
                <div style={{ fontWeight: "800", fontSize: "16px", color: "#1667E6" }}>${hotelSeleccionado.precio} USD/noche</div>
              </div>
            )}
            <button onClick={irAPasajeros} disabled={!seleccionado || totalHabitaciones === 0} style={{ width: "100%", padding: "13px", backgroundColor: "#FF5C00", color: "#fff", border: "none", borderRadius: "13px", fontFamily: "sans-serif", fontWeight: "800", fontSize: "14px", opacity: (!seleccionado || totalHabitaciones === 0) ? 0.4 : 1, cursor: (!seleccionado || totalHabitaciones === 0) ? "not-allowed" : "pointer" }}>
              Continuar → Pasajeros
            </button>
          </div>

        </div>

        {/* FOOTER */}
        <footer style={{ background: "#0D0C56", padding: "32px 24px", display: "flex", flexDirection: "column", gap: "8px", marginTop: "auto" }}>
          <Logo variant="teal" />
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", margin: 0 }}>© 2026 Trip Planner · no-reply@tripplanner.com.mx</p>
        </footer>
      </div>
    </>
  );
}
