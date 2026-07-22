"use client";

import { useState, useRef, useEffect } from "react";
import NavUsuario from "../components/NavUsuario";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "../components/Logo";

const [vuelosData, setVuelosData] = useState<any[]>([]);
const [buscando, setBuscando] = useState(false);
const [errorBusqueda, setErrorBusqueda] = useState("");

const IconCalendar = ({ color = "#888" }: { color?: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

export default function SoloVuelos() {
  const router = useRouter();
  const [vuelosData, setVuelosData] = useState<any[]>([]);
  const [buscando, setBuscando] = useState(false);
  const [errorBusqueda, setErrorBusqueda] = useState("");
  const [seleccionado, setSeleccionado] = useState<number | null>(null);
  const [tipo, setTipo] = useState("ida-vuelta");
  const [clase, setClase] = useState("Económica");
  const [equipaje, setEquipaje] = useState("maleta-mano");
  const [pasajeros, setPasajeros] = useState({ adultos: 1, ninos: 0, bebes: 0 });
  const [fechaIda, setFechaIda] = useState("");
  const [fechaVuelta, setFechaVuelta] = useState("");
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");

  const idaRef = useRef<HTMLInputElement>(null);
  const vueltaRef = useRef<HTMLInputElement>(null);

  const totalPasajeros = pasajeros.adultos + pasajeros.ninos + pasajeros.bebes;
  const vueloSeleccionado = vuelosData.find(v => v.id === seleccionado);

  const formatFecha = (fecha: string) => {
    if (!fecha) return "";
    const [y, m, d] = fecha.split("-");
    const meses = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];
    return `${d} ${meses[parseInt(m)-1]} ${y}`;
  };

  const buscarVuelos = async () => {
  if (!origen || !destino || !fechaIda) return;
  setBuscando(true);
  setErrorBusqueda("");
  try {
    const res = await fetch("/api/vuelos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        origen,
        destino,
        fecha: fechaIda,
        pasajeros: pasajeros.adultos + pasajeros.ninos,
      }),
    });
    const data = await res.json();
    if (data.error) setErrorBusqueda("No se encontraron vuelos");
    else setVuelosData(data.vuelos);
  } catch {
    setErrorBusqueda("Error al buscar vuelos");
  }
  setBuscando(false);
};
  
  const irAPasajeros = () => {
    if (!seleccionado) return;
    sessionStorage.setItem("pasajeros", JSON.stringify(pasajeros));
    sessionStorage.setItem("vuelo_seleccionado", JSON.stringify(vueloSeleccionado));
    router.push("/pasajeros?tipo=vuelo");
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        .sv-wrap {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          font-family: 'Montserrat', sans-serif;
          background: #f5f7ff;
          width: 100%;
          max-width: 100vw;
          overflow-x: hidden;
        }
        .sv-nav {
          background: #fff;
          padding: 12px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #e8edf8;
          position: relative;
        }
        .sv-nav-links {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 16px;
          align-items: center;
        }
        .sv-body {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 20px;
          padding: 20px;
          flex: 1;
          max-width: 1000px;
          margin: 0 auto;
          width: 100%;
        }
        .sv-sidebar { display: flex; flex-direction: column; }
        .sv-sidebar-mobile { display: none; flex-direction: column; width: 100%; }
        .sv-buscador {
          background: linear-gradient(135deg,#0D0C56,#1667E6);
          padding: 28px 24px;
        }
        .sv-buscador-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr auto;
          gap: 10px;
          align-items: flex-end;
          max-width: 900px;
          margin: 0 auto;
        }
        .sv-tipo-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 16px;
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        .sv-card {
          background: #fff;
          border-radius: 13px;
          border: 1.5px solid #e8edf8;
          padding: 16px 20px;
          cursor: pointer;
          transition: all 0.2s;
          margin-bottom: 10px;
          width: 100%;
          text-align: left;
          font-family: 'Montserrat', sans-serif;
          -webkit-appearance: none;
          display: block;
          max-width: 100%;
        }
        .sv-card:active { opacity: 0.8; }
        .sv-label {
          font-size: 10px;
          font-weight: 700;
          color: rgba(255,255,255,0.6);
          text-transform: uppercase;
          letter-spacing: 0.4px;
          margin-bottom: 4px;
          display: block;
        }
        .sv-fecha-wrap { position: relative; width: 100%; }
        .sv-fecha-display {
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
        .sv-fecha-display.placeholder { color: #aaa; }
        .sv-fecha-icon {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
        }
        .sv-fecha-input {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          opacity: 0;
          cursor: pointer;
          font-size: 16px;
        }
        .sv-input {
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
          .sv-nav { padding: 12px 16px; }
          .sv-nav-links { display: none; }
          .sv-buscador { padding: 16px; }
          .sv-buscador-grid { grid-template-columns: 1fr 1fr; gap: 8px; }
          .sv-buscador-grid > *:last-child { grid-column: 1 / -1; }
          .sv-body { grid-template-columns: 1fr; padding: 12px; overflow: hidden; }
          .sv-sidebar { display: none; }
          .sv-sidebar-mobile { display: flex; }
          .sv-card { padding: 14px; }
        }
      `}</style>

      <div className="sv-wrap">

        {/* NAV */}
        <nav className="sv-nav">
          <Link href="/"><Logo variant="color" /></Link>
          <div className="sv-nav-links">
            <Link href="/destinos" style={{ fontSize: "13px", color: "#0D0C56", textDecoration: "none", fontWeight: "600", padding: "6px 14px", borderRadius: "50px" }}>Arma tu viaje</Link>
            <Link href="/solo-vuelos" style={{ fontSize: "13px", color: "#1667E6", textDecoration: "none", fontWeight: "700", padding: "6px 14px", borderRadius: "50px", background: "#f0f5ff" }}>Vuelos</Link>
            <Link href="/solo-hoteles" style={{ fontSize: "13px", color: "#0D0C56", textDecoration: "none", fontWeight: "600", padding: "6px 14px", borderRadius: "50px" }}>Hoteles</Link>
            <Link href="/soporte" style={{ fontSize: "13px", color: "#0D0C56", textDecoration: "none", fontWeight: "600", padding: "6px 14px", borderRadius: "50px" }}>Soporte</Link>
          </div>
          <NavUsuario />
        </nav>

        {/* BUSCADOR */}
        <div className="sv-buscador">
          <div className="sv-tipo-tabs">
            {[
              { key: "ida-vuelta", label: "Ida y vuelta" },
              { key: "solo-ida", label: "Solo ida" },
              { key: "multitramo", label: "Multitramo" },
            ].map(t => (
              <button key={t.key} onClick={() => setTipo(t.key)} style={{ padding: "7px 16px", border: `1.5px solid ${tipo === t.key ? "#fff" : "rgba(255,255,255,0.3)"}`, borderRadius: "50px", fontSize: "12px", fontWeight: "700", cursor: "pointer", background: tipo === t.key ? "#fff" : "transparent", color: tipo === t.key ? "#0D0C56" : "#fff", whiteSpace: "nowrap", flexShrink: 0, fontFamily: "Montserrat, sans-serif" }}>
                {t.label}
              </button>
            ))}
          </div>
          <div className="sv-buscador-grid">
            <div>
  <label className="sv-label">Origen</label>
  <input placeholder="MEX" value={origen} onChange={e => setOrigen(e.target.value.toUpperCase())} className="sv-input" maxLength={3} />
</div>
<div>
  <label className="sv-label">Destino</label>
  <input placeholder="CDG" value={destino} onChange={e => setDestino(e.target.value.toUpperCase())} className="sv-input" maxLength={3} />
</div>
            <div>
              <label className="sv-label">Fecha de ida</label>
              <div className="sv-fecha-wrap">
                <div className={`sv-fecha-display ${!fechaIda ? "placeholder" : ""}`}>
                  {fechaIda ? formatFecha(fechaIda) : "dd/mm/aaaa"}
                </div>
                <div className="sv-fecha-icon"><IconCalendar color={fechaIda ? "#1667E6" : "#888"} /></div>
                <input ref={idaRef} type="date" value={fechaIda} onChange={e => setFechaIda(e.target.value)} className="sv-fecha-input" />
              </div>
            </div>
            {tipo === "ida-vuelta" && (
              <div>
                <label className="sv-label">Fecha de vuelta</label>
                <div className="sv-fecha-wrap">
                  <div className={`sv-fecha-display ${!fechaVuelta ? "placeholder" : ""}`}>
                    {fechaVuelta ? formatFecha(fechaVuelta) : "dd/mm/aaaa"}
                  </div>
                  <div className="sv-fecha-icon"><IconCalendar color={fechaVuelta ? "#1667E6" : "#888"} /></div>
                  <input ref={vueltaRef} type="date" value={fechaVuelta} onChange={e => setFechaVuelta(e.target.value)} className="sv-fecha-input" />
                </div>
              </div>
            )}
            <button onClick={buscarVuelos} disabled={buscando} style={{ padding: "10px 24px", backgroundColor: "#FF5C00", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "800", fontSize: "13px", cursor: buscando ? "not-allowed" : "pointer", height: "40px", whiteSpace: "nowrap", fontFamily: "Montserrat, sans-serif", opacity: buscando ? 0.7 : 1 }}>
  {buscando ? "Buscando..." : "Buscar"}
</button>
          </div>
        </div>

        {/* BODY */}
        <div className="sv-body">

          {/* IZQUIERDA */}
          <div style={{ overflow: "hidden", width: "100%" }}>

            {/* FILTROS + PASAJEROS */}
            <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", padding: "14px 16px", marginBottom: "16px" }}>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "14px" }}>
                <div>
                  <div style={{ fontSize: "10px", fontWeight: "700", color: "#1667E6", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "6px" }}>Clase</div>
                  <select value={clase} onChange={e => setClase(e.target.value)} style={{ border: "1.5px solid #e8edf8", borderRadius: "8px", padding: "8px 12px", fontSize: "12px", outline: "none", background: "#fff", fontFamily: "Montserrat, sans-serif" }}>
                    <option>Económica</option>
                    <option>Premium Economy</option>
                    <option>Business</option>
                    <option>Primera clase</option>
                  </select>
                </div>
                <div>
                  <div style={{ fontSize: "10px", fontWeight: "700", color: "#1667E6", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "6px" }}>Equipaje</div>
                  <select value={equipaje} onChange={e => setEquipaje(e.target.value)} style={{ border: "1.5px solid #e8edf8", borderRadius: "8px", padding: "8px 12px", fontSize: "12px", outline: "none", background: "#fff", fontFamily: "Montserrat, sans-serif" }}>
                    <option value="sin-equipaje">Sin equipaje</option>
                    <option value="maleta-mano">Maleta de mano</option>
                    <option value="equipaje-extra">Con equipaje extra</option>
                  </select>
                </div>
              </div>

              {/* PASAJEROS */}
              <div style={{ borderTop: "1px solid #f0f2fa", paddingTop: "12px" }}>
                <div style={{ fontSize: "10px", fontWeight: "700", color: "#1667E6", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "10px" }}>Pasajeros · Total: {totalPasajeros}</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
                  {[
                    { label: "Adultos", sub: "12+ años", key: "adultos", min: 1 },
                    { label: "Niños", sub: "2-11 años", key: "ninos", min: 0 },
                    { label: "Bebés", sub: "0-23 meses", key: "bebes", min: 0 },
                  ].map(p => (
                    <div key={p.key} style={{ background: "#f5f7ff", borderRadius: "8px", padding: "8px", textAlign: "center" }}>
                      <div style={{ fontWeight: "700", fontSize: "11px", color: "#0D0C56", marginBottom: "2px" }}>{p.label}</div>
                      <div style={{ fontSize: "10px", color: "#888", marginBottom: "6px" }}>{p.sub}</div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                        <button onClick={() => setPasajeros(prev => ({ ...prev, [p.key]: Math.max(p.min, (prev as any)[p.key] - 1) }))} style={{ width: "24px", height: "24px", borderRadius: "50%", border: "1.5px solid #e8edf8", background: "#fff", cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Montserrat, sans-serif" }}>−</button>
                        <span style={{ fontWeight: "700", fontSize: "13px", color: "#0D0C56" }}>{(pasajeros as any)[p.key]}</span>
                        <button onClick={() => setPasajeros(prev => ({ ...prev, [p.key]: (prev as any)[p.key] + 1 }))} style={{ width: "24px", height: "24px", borderRadius: "50%", border: "1.5px solid #e8edf8", background: "#fff", cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Montserrat, sans-serif" }}>+</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* VUELOS */}
            {vuelosData.map(v => (
              <button key={v.id} className="sv-card" onClick={() => setSeleccionado(v.id)}
                style={{ background: seleccionado === v.id ? "#f8faff" : "#fff", border: `1.5px solid ${seleccionado === v.id ? "#1667E6" : "#e8edf8"}` }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "#f5f7ff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "11px", color: "#1667E6" }}>{v.codigo}</div>
                    <div>
                      <div style={{ fontWeight: "700", fontSize: "12px", color: "#0D0C56" }}>{v.aerolinea}</div>
                      <div style={{ fontSize: "10px", color: v.escala === "Directo" ? "#3ED5A9" : "#F5A623", fontWeight: "600" }}>{v.escala}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1, justifyContent: "center" }}>
                    <div style={{ fontWeight: "800", fontSize: "14px", color: "#0D0C56" }}>{v.salida}</div>
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <div style={{ fontSize: "10px", color: "#888" }}>{v.duracion}</div>
                      <div style={{ width: "100%", height: "1px", background: "#e8edf8" }} />
                    </div>
                    <div style={{ fontWeight: "800", fontSize: "14px", color: "#0D0C56" }}>{v.llegada}</div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontWeight: "800", fontSize: "16px", color: "#1667E6" }}>${v.precio}</div>
                    <div style={{ fontSize: "10px", color: "#888" }}>USD/persona</div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* SIDEBAR DESKTOP */}
          <div className="sv-sidebar">
            {vueloSeleccionado && (
              <div style={{ background: "#f0f5ff", borderRadius: "13px", border: "1.5px solid #e0eaff", padding: "14px", marginBottom: "12px" }}>
                <div style={{ fontWeight: "700", fontSize: "12px", color: "#1667E6", marginBottom: "8px" }}>Vuelo seleccionado</div>
                <div style={{ fontWeight: "800", fontSize: "14px", color: "#0D0C56", marginBottom: "4px" }}>{vueloSeleccionado.aerolinea}</div>
                <div style={{ fontSize: "12px", color: "#888", marginBottom: "4px" }}>{vueloSeleccionado.salida} → {vueloSeleccionado.llegada} · {vueloSeleccionado.duracion}</div>
                <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #e0eaff", paddingTop: "8px" }}>
                  <span style={{ fontSize: "11px", color: "#888" }}>${vueloSeleccionado.precio} × {totalPasajeros}</span>
                  <span style={{ fontWeight: "800", fontSize: "14px", color: "#1667E6" }}>${vueloSeleccionado.precio * totalPasajeros}</span>
                </div>
              </div>
            )}
            <button onClick={irAPasajeros} disabled={!seleccionado} style={{ width: "100%", padding: "13px", backgroundColor: "#FF5C00", color: "#fff", border: "none", borderRadius: "13px", fontFamily: "sans-serif", fontWeight: "800", fontSize: "14px", opacity: !seleccionado ? 0.4 : 1, cursor: !seleccionado ? "not-allowed" : "pointer" }}>
              Continuar → Pasajeros
            </button>
          </div>

          {/* SIDEBAR MÓVIL */}
          <div className="sv-sidebar-mobile">
            {vueloSeleccionado && (
              <div style={{ background: "#f0f5ff", borderRadius: "13px", border: "1.5px solid #e0eaff", padding: "14px", marginBottom: "12px" }}>
                <div style={{ fontWeight: "700", fontSize: "12px", color: "#1667E6", marginBottom: "4px" }}>Vuelo seleccionado</div>
                <div style={{ fontWeight: "800", fontSize: "13px", color: "#0D0C56", marginBottom: "2px" }}>{vueloSeleccionado.aerolinea}</div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "11px", color: "#888" }}>${vueloSeleccionado.precio} × {totalPasajeros}</span>
                  <span style={{ fontWeight: "800", fontSize: "14px", color: "#1667E6" }}>${vueloSeleccionado.precio * totalPasajeros}</span>
                </div>
              </div>
            )}
            <button onClick={irAPasajeros} disabled={!seleccionado} style={{ width: "100%", padding: "13px", backgroundColor: "#FF5C00", color: "#fff", border: "none", borderRadius: "13px", fontFamily: "sans-serif", fontWeight: "800", fontSize: "14px", opacity: !seleccionado ? 0.4 : 1, cursor: !seleccionado ? "not-allowed" : "pointer" }}>
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
