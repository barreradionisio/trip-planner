"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "../components/Logo";

const vuelosData = [
  { id: 1, aerolinea: "Aeroméxico", codigo: "AM", salida: "06:30", llegada: "14:45", duracion: "8h 15m", escala: "1 escala", precio: 420 },
  { id: 2, aerolinea: "Air France", codigo: "AF", salida: "09:15", llegada: "20:30", duracion: "11h 15m", escala: "Directo", precio: 680 },
  { id: 3, aerolinea: "Iberia", codigo: "IB", salida: "11:00", llegada: "22:10", duracion: "11h 10m", escala: "Directo", precio: 590 },
  { id: 4, aerolinea: "Volaris", codigo: "Y4", salida: "14:20", llegada: "23:55", duracion: "9h 35m", escala: "1 escala", precio: 310 },
  { id: 5, aerolinea: "British Airways", codigo: "BA", salida: "22:00", llegada: "15:30+1", duracion: "17h 30m", escala: "1 escala", precio: 750 },
];

export default function SoloVuelos() {
  const [seleccionado, setSeleccionado] = useState<number | null>(null);
  const [tipo, setTipo] = useState("ida-vuelta");
  const [clase, setClase] = useState("Económica");
  const [equipaje, setEquipaje] = useState("maleta-mano");
  const [pasajeros, setPasajeros] = useState({ adultos: 1, ninos: 0, bebes: 0 });

  const totalPasajeros = pasajeros.adultos + pasajeros.ninos + pasajeros.bebes;
  const vueloSeleccionado = vuelosData.find(v => v.id === seleccionado);

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
        }
        .sv-card:active { opacity: 0.8; }
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
        .sv-label {
          font-size: 10px;
          font-weight: 700;
          color: rgba(255,255,255,0.6);
          text-transform: uppercase;
          letter-spacing: 0.4px;
          margin-bottom: 4px;
          display: block;
        }

        @media (max-width: 768px) {
          .sv-nav { padding: 12px 16px; }
          .sv-nav-links { display: none; }
          .sv-buscador { padding: 16px; }
          .sv-buscador-grid { grid-template-columns: 1fr; }
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
          <Link href="/login" style={{ fontSize: "13px", background: "#1667E6", color: "#fff", textDecoration: "none", fontWeight: "700", padding: "8px 18px", borderRadius: "50px" }}>Iniciar sesión</Link>
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
              <input placeholder="Ciudad de México" className="sv-input" />
            </div>
            <div>
              <label className="sv-label">Destino</label>
              <input placeholder="¿A dónde vas?" className="sv-input" />
            </div>
            <div>
              <label className="sv-label">Fecha de ida</label>
              <input type="date" className="sv-input" />
            </div>
            {tipo === "ida-vuelta" && (
              <div>
                <label className="sv-label">Fecha de vuelta</label>
                <input type="date" className="sv-input" />
              </div>
            )}
            <button style={{ padding: "10px 24px", backgroundColor: "#FF5C00", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "800", fontSize: "13px", cursor: "pointer", height: "40px", whiteSpace: "nowrap", fontFamily: "Montserrat, sans-serif" }}>
              Buscar
            </button>
          </div>
        </div>

        {/* BODY */}
        <div className="sv-body">

          {/* IZQUIERDA */}
          <div style={{ overflow: "hidden", width: "100%" }}>
            {/* FILTROS */}
            <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", padding: "14px 16px", marginBottom: "16px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
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
            <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", overflow: "hidden", marginBottom: "12px" }}>
              <div style={{ padding: "10px 14px", background: "#0D0C56" }}>
                <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "12px", color: "#fff" }}>Pasajeros</div>
              </div>
              <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { label: "Adultos", sub: "12+ años", key: "adultos" },
                  { label: "Niños", sub: "2-11 años", key: "ninos" },
                  { label: "Bebés", sub: "0-23 meses", key: "bebes" },
                ].map(p => (
                  <div key={p.key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontWeight: "700", fontSize: "12px", color: "#0D0C56" }}>{p.label}</div>
                      <div style={{ fontSize: "10px", color: "#888" }}>{p.sub}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <button onClick={() => setPasajeros(prev => ({ ...prev, [p.key]: Math.max(p.key === "adultos" ? 1 : 0, (prev as any)[p.key] - 1) }))} style={{ width: "28px", height: "28px", borderRadius: "50%", border: "1.5px solid #e8edf8", background: "#fff", cursor: "pointer", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Montserrat, sans-serif" }}>−</button>
                      <span style={{ fontWeight: "700", fontSize: "14px", color: "#0D0C56", minWidth: "20px", textAlign: "center" }}>{(pasajeros as any)[p.key]}</span>
                      <button onClick={() => setPasajeros(prev => ({ ...prev, [p.key]: (prev as any)[p.key] + 1 }))} style={{ width: "28px", height: "28px", borderRadius: "50%", border: "1.5px solid #e8edf8", background: "#fff", cursor: "pointer", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Montserrat, sans-serif" }}>+</button>
                    </div>
                  </div>
                ))}
                <div style={{ borderTop: "1px solid #f0f2fa", paddingTop: "10px", display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "11px", color: "#888" }}>Total</span>
                  <span style={{ fontWeight: "700", fontSize: "12px", color: "#0D0C56" }}>{totalPasajeros} pasajeros</span>
                </div>
              </div>
            </div>

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

            <Link href={seleccionado ? "/pasajeros?tipo=vuelo" : "#"} style={{ width: "100%", padding: "13px", backgroundColor: "#FF5C00", color: "#fff", borderRadius: "13px", fontFamily: "sans-serif", fontWeight: "800", fontSize: "14px", opacity: !seleccionado ? 0.4 : 1, textDecoration: "none", display: "block", textAlign: "center" }}>
              Continuar → Pasajeros
            </Link>
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
            <Link href={seleccionado ? "/pasajeros?tipo=vuelo" : "#"} style={{ width: "100%", padding: "13px", backgroundColor: "#FF5C00", color: "#fff", borderRadius: "13px", fontFamily: "sans-serif", fontWeight: "800", fontSize: "14px", opacity: !seleccionado ? 0.4 : 1, textDecoration: "none", display: "block", textAlign: "center" }}>
              Continuar → Pasajeros
            </Link>
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
