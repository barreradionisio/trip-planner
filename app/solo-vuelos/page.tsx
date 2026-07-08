"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "../components/Logo";
import { useIsMobile } from "../hooks/useIsMobile";

const vuelosData = [
  { id: 1, aerolinea: "Aeroméxico", codigo: "AM", salida: "06:30", llegada: "14:45", duracion: "8h 15m", escala: "1 escala", precio: 420 },
  { id: 2, aerolinea: "Air France", codigo: "AF", salida: "09:15", llegada: "20:30", duracion: "11h 15m", escala: "Directo", precio: 680 },
  { id: 3, aerolinea: "Iberia", codigo: "IB", salida: "11:00", llegada: "22:10", duracion: "11h 10m", escala: "Directo", precio: 590 },
  { id: 4, aerolinea: "Volaris", codigo: "Y4", salida: "14:20", llegada: "23:55", duracion: "9h 35m", escala: "1 escala", precio: 310 },
  { id: 5, aerolinea: "British Airways", codigo: "BA", salida: "22:00", llegada: "15:30+1", duracion: "17h 30m", escala: "1 escala", precio: 750 },
];

export default function SoloVuelos() {
  const isMobile = useIsMobile();
  const [seleccionado, setSeleccionado] = useState<number | null>(null);
  const [tipo, setTipo] = useState("ida-vuelta");
  const [clase, setClase] = useState("Económica");
  const [equipaje, setEquipaje] = useState("maleta-mano");
  const [pasajeros, setPasajeros] = useState({ adultos: 1, ninos: 0, bebes: 0 });

  const totalPasajeros = pasajeros.adultos + pasajeros.ninos + pasajeros.bebes;
  const vueloSeleccionado = vuelosData.find(v => v.id === seleccionado);

  const inputStyle = {
    width: "100%",
    border: "1.5px solid rgba(255,255,255,0.3)",
    borderRadius: "8px",
    padding: "10px 12px",
    fontSize: "12px",
    outline: "none",
    boxSizing: "border-box" as const,
    background: "#f0f5ff",
  };

  const labelStyle = {
    fontSize: "10px",
    fontWeight: "700" as const,
    color: "rgba(255,255,255,0.6)",
    textTransform: "uppercase" as const,
    letterSpacing: "0.4px",
    marginBottom: "4px",
    display: "block" as const,
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Montserrat',sans-serif", background: "#f5f7ff" }}>

      {/* NAV */}
      <nav style={{ background: "#fff", padding: isMobile ? "12px 16px" : "12px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #e8edf8", position: "relative" }}>
        <Link href="/"><Logo variant="color" /></Link>
        {!isMobile && (
          <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "16px", alignItems: "center" }}>
            <Link href="/destinos" style={{ fontSize: "13px", color: "#0D0C56", textDecoration: "none", fontWeight: "600", padding: "6px 14px", borderRadius: "50px" }}>Arma tu viaje</Link>
            <Link href="/solo-vuelos" style={{ fontSize: "13px", color: "#1667E6", textDecoration: "none", fontWeight: "700", padding: "6px 14px", borderRadius: "50px", background: "#f0f5ff" }}>Vuelos</Link>
            <Link href="/solo-hoteles" style={{ fontSize: "13px", color: "#0D0C56", textDecoration: "none", fontWeight: "600", padding: "6px 14px", borderRadius: "50px" }}>Hoteles</Link>
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
          {/* TIPO */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "16px", overflowX: "auto" }}>
            {[
              { key: "ida-vuelta", label: "Ida y vuelta" },
              { key: "solo-ida", label: "Solo ida" },
              { key: "multitramo", label: "Multitramo" },
            ].map(t => (
              <button
                key={t.key}
                onClick={() => setTipo(t.key)}
                style={{ padding: "7px 16px", border: `1.5px solid ${tipo === t.key ? "#fff" : "rgba(255,255,255,0.3)"}`, borderRadius: "50px", fontSize: "12px", fontWeight: "700", cursor: "pointer", background: tipo === t.key ? "#fff" : "transparent", color: tipo === t.key ? "#0D0C56" : "#fff", whiteSpace: "nowrap", flexShrink: 0 }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* CAMPOS */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : tipo === "ida-vuelta" ? "1fr 1fr 1fr 1fr auto" : "1fr 1fr 1fr auto", gap: "10px", alignItems: "flex-end" }}>
            <div>
              <label style={labelStyle}>Origen</label>
              <input placeholder="Ciudad de México" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Destino</label>
              <input placeholder="¿A dónde vas?" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Fecha de ida</label>
              <input type="date" style={inputStyle} />
            </div>
            {tipo === "ida-vuelta" && (
              <div>
                <label style={labelStyle}>Fecha de vuelta</label>
                <input type="date" style={inputStyle} />
              </div>
            )}
            <button style={{ padding: "10px 24px", backgroundColor: "#FF5C00", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "800", fontSize: "13px", cursor: "pointer", height: isMobile ? "42px" : "40px", whiteSpace: "nowrap" }}>
              Buscar vuelos
            </button>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div style={{ display: isMobile ? "flex" : "grid", flexDirection: isMobile ? "column" : undefined, gridTemplateColumns: isMobile ? undefined : "1fr 300px", gap: "20px", padding: isMobile ? "16px" : "20px", flex: 1, maxWidth: "1000px", margin: "0 auto", width: "100%", boxSizing: "border-box" }}>

        {/* IZQUIERDA */}
        <div>
          {/* FILTROS */}
          <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", padding: "14px 16px", marginBottom: "16px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: "10px", fontWeight: "700", color: "#1667E6", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "6px" }}>Clase</div>
              <select value={clase} onChange={e => setClase(e.target.value)} style={{ border: "1.5px solid #e8edf8", borderRadius: "8px", padding: "8px 12px", fontSize: "12px", outline: "none", background: "#fff" }}>
                <option>Económica</option>
                <option>Premium Economy</option>
                <option>Business</option>
                <option>Primera clase</option>
              </select>
            </div>
            <div>
              <div style={{ fontSize: "10px", fontWeight: "700", color: "#1667E6", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "6px" }}>Equipaje</div>
              <select value={equipaje} onChange={e => setEquipaje(e.target.value)} style={{ border: "1.5px solid #e8edf8", borderRadius: "8px", padding: "8px 12px", fontSize: "12px", outline: "none", background: "#fff" }}>
                <option value="sin-equipaje">Sin equipaje</option>
                <option value="maleta-mano">Maleta de mano</option>
                <option value="equipaje-extra">Con equipaje extra</option>
              </select>
            </div>
          </div>

          {/* VUELOS */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {vuelosData.map(v => (
              <div
                key={v.id}
                onClick={() => setSeleccionado(v.id)}
                style={{ background: seleccionado === v.id ? "#f8faff" : "#fff", borderRadius: "13px", border: `1.5px solid ${seleccionado === v.id ? "#1667E6" : "#e8edf8"}`, padding: isMobile ? "14px" : "16px 20px", cursor: "pointer", transition: "all 0.2s" }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "#f5f7ff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "11px", color: "#1667E6", flexShrink: 0 }}>{v.codigo}</div>
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
              </div>
            ))}
          </div>
        </div>

        {/* SIDEBAR */}
        <div>
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
                    <button onClick={() => setPasajeros(prev => ({ ...prev, [p.key]: Math.max(p.key === "adultos" ? 1 : 0, (prev as any)[p.key] - 1) }))} style={{ width: "28px", height: "28px", borderRadius: "50%", border: "1.5px solid #e8edf8", background: "#fff", cursor: "pointer", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                    <span style={{ fontWeight: "700", fontSize: "14px", color: "#0D0C56", minWidth: "20px", textAlign: "center" }}>{(pasajeros as any)[p.key]}</span>
                    <button onClick={() => setPasajeros(prev => ({ ...prev, [p.key]: (prev as any)[p.key] + 1 }))} style={{ width: "28px", height: "28px", borderRadius: "50%", border: "1.5px solid #e8edf8", background: "#fff", cursor: "pointer", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
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

          <Link
            href={seleccionado ? "/pasajeros?tipo=vuelo" : "#"}
            style={{ width: "100%", padding: "13px", backgroundColor: "#FF5C00", color: "#fff", border: "none", borderRadius: "13px", fontFamily: "sans-serif", fontWeight: "800", fontSize: "14px", cursor: !seleccionado ? "not-allowed" : "pointer", opacity: !seleccionado ? 0.4 : 1, textDecoration: "none", display: "block", textAlign: "center", boxSizing: "border-box" as const }}
          >
            Continuar → Pasajeros
          </Link>
        </div>
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
