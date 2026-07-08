"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "../components/Logo";
import { useIsMobile } from "../hooks/useIsMobile";

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
  const isMobile = useIsMobile();
  const [seleccionado, setSeleccionado] = useState<number | null>(null);
  const [habitaciones, setHabitaciones] = useState<{ [key: string]: number }>({ sencilla: 0, doble: 1, suite: 0, familiar: 0 });
  const [filtroEstrellas, setFiltroEstrellas] = useState(0);
  const [precioMax, setPrecioMax] = useState(500);
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState<string[]>([]);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [ordenar, setOrdenar] = useState("precio");

  const totalHabitaciones = Object.values(habitaciones).reduce((a, b) => a + b, 0);
  const hotelSeleccionado = hotelesData.find(h => h.id === seleccionado);

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

  const filtrados = hotelesData
    .filter(h => {
      const estrellasOk = filtroEstrellas === 0 || h.estrellas >= filtroEstrellas;
      const precioOk = h.precio <= precioMax;
      const serviciosOk = serviciosSeleccionados.length === 0 || serviciosSeleccionados.every(s => h.servicios.includes(s));
      return estrellasOk && precioOk && serviciosOk;
    })
    .sort((a, b) => {
      if (ordenar === "precio") return a.precio - b.precio;
      if (ordenar === "estrellas") return b.estrellas - a.estrellas;
      if (ordenar === "nombre") return a.nombre.localeCompare(b.nombre);
      return 0;
    });

  const HabitacionesPanel = () => (
    <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", overflow: "hidden", marginBottom: "12px" }}>
      <div style={{ padding: "10px 14px", background: "#0D0C56", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "12px", color: "#fff" }}>Habitaciones · Total: {totalHabitaciones}</div>
      </div>
      <div style={{ padding: "12px 14px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
        {tiposHabitacion.map(t => (
          <div key={t.key} style={{ border: `1.5px solid ${habitaciones[t.key] > 0 ? "#1667E6" : "#e8edf8"}`, borderRadius: "10px", padding: "10px 8px", background: habitaciones[t.key] > 0 ? "#f0f5ff" : "#fff", textAlign: "center" }}>
            <div style={{ fontWeight: "700", fontSize: "11px", color: "#0D0C56", marginBottom: "2px" }}>{t.label}</div>
            <div style={{ fontSize: "10px", color: "#888", marginBottom: "4px" }}>{t.desc}</div>
            {t.extra > 0 && <div style={{ fontSize: "10px", color: "#1667E6", marginBottom: "4px" }}>+${t.extra}/noche</div>}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
              <button onClick={() => actualizarHab(t.key, -1)} style={{ width: "24px", height: "24px", borderRadius: "50%", border: "1.5px solid #e8edf8", background: "#fff", cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
              <span style={{ fontWeight: "800", fontSize: "14px", color: "#0D0C56", minWidth: "20px", textAlign: "center" }}>{habitaciones[t.key]}</span>
              <button onClick={() => actualizarHab(t.key, 1)} style={{ width: "24px", height: "24px", borderRadius: "50%", border: "1.5px solid #e8edf8", background: "#fff", cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
            </div>
          </div>
        ))}
      </div>

      {/* FILTROS */}
      <div style={{ borderTop: "1px solid #f0f2fa" }}>
        <button
          onClick={() => setMostrarFiltros(!mostrarFiltros)}
          style={{ width: "100%", padding: "10px 14px", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}
        >
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
            {/* PRECIO */}
            <div style={{ marginBottom: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <span style={{ fontSize: "10px", fontWeight: "700", color: "#1667E6", textTransform: "uppercase", letterSpacing: "0.4px" }}>Precio máximo por noche</span>
                <span style={{ fontSize: "11px", fontWeight: "700", color: "#0D0C56" }}>Hasta ${precioMax} USD</span>
              </div>
              <input type="range" min={50} max={600} step={10} value={precioMax} onChange={e => setPrecioMax(Number(e.target.value))} style={{ width: "100%", accentColor: "#1667E6" }} />
            </div>

            {/* ESTRELLAS */}
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

            {/* SERVICIOS */}
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
  );

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Montserrat',sans-serif", background: "#f5f7ff" }}>

      {/* NAV */}
      <nav style={{ background: "#fff", padding: isMobile ? "12px 16px" : "12px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #e8edf8", position: "relative" }}>
        <Link href="/"><Logo variant="color" /></Link>
        {!isMobile && (
          <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "16px", alignItems: "center" }}>
            <Link href="/destinos" style={{ fontSize: "13px", color: "#0D0C56", textDecoration: "none", fontWeight: "600", padding: "6px 14px", borderRadius: "50px" }}>Arma tu viaje</Link>
            <Link href="/solo-vuelos" style={{ fontSize: "13px", color: "#0D0C56", textDecoration: "none", fontWeight: "600", padding: "6px 14px", borderRadius: "50px" }}>Vuelos</Link>
            <Link href="/solo-hoteles" style={{ fontSize: "13px", color: "#1667E6", textDecoration: "none", fontWeight: "700", padding: "6px 14px", borderRadius: "50px", background: "#f0f5ff" }}>Hoteles</Link>
            <Link href="/soporte" style={{ fontSize: "13px", color: "#0D0C56", textDecoration: "none", fontWeight: "600", padding: "6px 14px", borderRadius: "50px" }}>Soporte</Link>
          </div>
        )}
        <Link href="/login" style={{ fontSize: "13px", background: "#1667E6", color: "#fff", textDecoration: "none", fontWeight: "700", padding: "8px 18px", borderRadius: "50px" }}>
          {isMobile ? "Entrar" : "Iniciar sesión"}
        </Link>
      </nav>

      {/* BUSCADOR */}
      <div style={{ background: "linear-gradient(135deg,#0D0C56,#1667E6)", padding: isMobile ? "20px 16px" : "28px 24px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr auto", gap: "10px", alignItems: "flex-end" }}>
            <div>
              <label style={{ fontSize: "10px", fontWeight: "700", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "4px", display: "block" }}>Destino</label>
              <input placeholder="¿A dónde vas?" style={{ width: "100%", border: "1.5px solid rgba(255,255,255,0.3)", borderRadius: "8px", padding: "10px 12px", fontSize: "12px", outline: "none", boxSizing: "border-box" as const, background: "#f0f5ff" }} />
            </div>
            <div>
              <label style={{ fontSize: "10px", fontWeight: "700", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "4px", display: "block" }}>Check-in</label>
              <input type="date" style={{ width: "100%", border: "1.5px solid rgba(255,255,255,0.3)", borderRadius: "8px", padding: "10px 12px", fontSize: "12px", outline: "none", boxSizing: "border-box" as const, background: "#f0f5ff" }} />
            </div>
            <div>
              <label style={{ fontSize: "10px", fontWeight: "700", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "4px", display: "block" }}>Check-out</label>
              <input type="date" style={{ width: "100%", border: "1.5px solid rgba(255,255,255,0.3)", borderRadius: "8px", padding: "10px 12px", fontSize: "12px", outline: "none", boxSizing: "border-box" as const, background: "#f0f5ff" }} />
            </div>
            <button style={{ padding: "10px 24px", backgroundColor: "#FF5C00", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "800", fontSize: "13px", cursor: "pointer", height: "40px", whiteSpace: "nowrap" }}>
              Buscar
            </button>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div style={{ display: isMobile ? "flex" : "grid", flexDirection: isMobile ? "column" : undefined, gridTemplateColumns: isMobile ? undefined : "1fr 300px", gap: "20px", padding: isMobile ? "16px" : "20px", flex: 1, maxWidth: "1000px", margin: "0 auto", width: "100%", boxSizing: "border-box" }}>

        {/* IZQUIERDA */}
        <div>
          {/* ORDENAR */}
          <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", padding: "12px 16px", marginBottom: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "12px", color: "#888" }}>{filtrados.length} hoteles encontrados</span>
            <select value={ordenar} onChange={e => setOrdenar(e.target.value)} style={{ border: "1.5px solid #e8edf8", borderRadius: "8px", padding: "6px 10px", fontSize: "12px", outline: "none", background: "#fff", fontWeight: "600" }}>
              <option value="precio">Precio: menor a mayor</option>
              <option value="estrellas">Estrellas: mayor a menor</option>
              <option value="nombre">Nombre: A-Z</option>
            </select>
          </div>

          {/* HABITACIONES EN MÓVIL */}
          {isMobile && <HabitacionesPanel />}

          {/* HOTELES */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {filtrados.length === 0 ? (
              <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", padding: "32px", textAlign: "center", fontSize: "13px", color: "#888" }}>
                No hay hoteles con esos filtros
              </div>
            ) : filtrados.map(h => (
              <div
                key={h.id}
                onClick={() => setSeleccionado(h.id)}
                style={{ background: seleccionado === h.id ? "#f8faff" : "#fff", borderRadius: "13px", border: `1.5px solid ${seleccionado === h.id ? "#1667E6" : "#e8edf8"}`, padding: "16px", cursor: "pointer", transition: "all 0.2s" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px", flexWrap: "wrap" }}>
                      <div style={{ fontWeight: "800", fontSize: "13px", color: "#0D0C56" }}>{h.nombre}</div>
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
              </div>
            ))}
          </div>

          {/* BOTÓN CONTINUAR EN MÓVIL */}
          {isMobile && (
            <div style={{ marginTop: "16px" }}>
              {hotelSeleccionado && (
                <div style={{ background: "#f0f5ff", borderRadius: "13px", border: "1.5px solid #e0eaff", padding: "14px", marginBottom: "12px" }}>
                  <div style={{ fontWeight: "700", fontSize: "12px", color: "#1667E6", marginBottom: "4px" }}>Hotel seleccionado</div>
                  <div style={{ fontWeight: "800", fontSize: "13px", color: "#0D0C56", marginBottom: "2px" }}>{hotelSeleccionado.nombre}</div>
                  <div style={{ fontWeight: "800", fontSize: "16px", color: "#1667E6" }}>${hotelSeleccionado.precio} USD/noche</div>
                </div>
              )}
              <Link
                href={(!seleccionado || totalHabitaciones === 0) ? "#" : "/pago?tipo=hotel"}
                style={{ width: "100%", padding: "13px", backgroundColor: "#FF5C00", color: "#fff", border: "none", borderRadius: "13px", fontFamily: "sans-serif", fontWeight: "800", fontSize: "14px", cursor: (!seleccionado || totalHabitaciones === 0) ? "not-allowed" : "pointer", opacity: (!seleccionado || totalHabitaciones === 0) ? 0.4 : 1, textDecoration: "none", display: "block", textAlign: "center", boxSizing: "border-box" as const }}
              >
                Continuar → Pago
              </Link>
            </div>
          )}
        </div>

        {/* SIDEBAR DESKTOP */}
        {!isMobile && (
          <div>
            <HabitacionesPanel />
            {hotelSeleccionado && (
              <div style={{ background: "#f0f5ff", borderRadius: "13px", border: "1.5px solid #e0eaff", padding: "14px", marginBottom: "12px" }}>
                <div style={{ fontWeight: "700", fontSize: "12px", color: "#1667E6", marginBottom: "6px" }}>Hotel seleccionado</div>
                <div style={{ fontWeight: "800", fontSize: "13px", color: "#0D0C56", marginBottom: "2px" }}>{hotelSeleccionado.nombre}</div>
                <div style={{ fontSize: "11px", color: "#888", marginBottom: "6px" }}>{hotelSeleccionado.ciudad} · {"★".repeat(hotelSeleccionado.estrellas)}</div>
                <div style={{ fontWeight: "800", fontSize: "16px", color: "#1667E6" }}>${hotelSeleccionado.precio} USD/noche</div>
              </div>
            )}
            <Link
              href={(!seleccionado || totalHabitaciones === 0) ? "#" : "/pago?tipo=hotel"}
              style={{ width: "100%", padding: "13px", backgroundColor: "#FF5C00", color: "#fff", border: "none", borderRadius: "13px", fontFamily: "sans-serif", fontWeight: "800", fontSize: "14px", cursor: (!seleccionado || totalHabitaciones === 0) ? "not-allowed" : "pointer", opacity: (!seleccionado || totalHabitaciones === 0) ? 0.4 : 1, textDecoration: "none", display: "block", textAlign: "center", boxSizing: "border-box" as const }}
            >
              Continuar → Pago
            </Link>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer style={{ background: "#0D0C56", padding: isMobile ? "24px 20px" : "32px 32px", display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "center", justifyContent: "space-between", marginTop: "auto", gap: isMobile ? "16px" : "0" }}>
        <div>
          <Logo variant="teal" />
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginTop: "12px" }}>© 2026 Trip Planner · no-reply@tripplanner.mx</p>
        </div>
        <div style={{ display: "flex", gap: "24px" }}>
          <Link href="/soporte?tab=faq" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Centro de ayuda</Link>
          <Link href="/soporte?tab=chat" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Contacto</Link>
          <Link href="/privacidad" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Política de privacidad</Link>
        </div>
      </footer>
    </div>
  );
}
