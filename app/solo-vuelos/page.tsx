"use client";


import { useState } from "react";
import Link from "next/link";
import Logo from "../components/Logo";

const vuelosData = [
  { id: 1, aerolinea: "Aeroméxico", codigo: "AM", salida: "06:30", llegada: "14:45", duracion: "8h 15m", escala: "1 escala · CDMX", precio: 420, clase: "Económica" },
  { id: 2, aerolinea: "Air France", codigo: "AF", salida: "09:15", llegada: "20:30", duracion: "11h 15m", escala: "Directo", precio: 680, clase: "Económica" },
  { id: 3, aerolinea: "Iberia", codigo: "IB", salida: "11:00", llegada: "22:10", duracion: "11h 10m", escala: "Directo", precio: 590, clase: "Económica" },
  { id: 4, aerolinea: "Volaris", codigo: "Y4", salida: "14:20", llegada: "23:55", duracion: "9h 35m", escala: "1 escala · GDL", precio: 310, clase: "Económica" },
  { id: 5, aerolinea: "British Airways", codigo: "BA", salida: "22:00", llegada: "15:30+1", duracion: "17h 30m", escala: "1 escala · LHR", precio: 750, clase: "Económica" },
];

interface Tramo {
  origen: string;
  destino: string;
  fecha: string;
}

export default function SoloVuelos() {
  const [seleccionado, setSeleccionado] = useState<number | null>(null);
  const [tipo, setTipo] = useState("ida-vuelta");
  const [clase, setClase] = useState("Económica");
  const [equipaje, setEquipaje] = useState("maleta-mano");
  const [pasajeros, setPasajeros] = useState({ adultos: 1, ninos: 0, bebes: 0 });
  const [tramos, setTramos] = useState<Tramo[]>([
    { origen: "", destino: "", fecha: "" },
    { origen: "", destino: "", fecha: "" },
  ]);

  const totalPasajeros = pasajeros.adultos + pasajeros.ninos + pasajeros.bebes;
  const vueloSeleccionado = vuelosData.find(v => v.id === seleccionado);

  const agregarTramo = () => {
    if (tramos.length < 6) setTramos([...tramos, { origen: "", destino: "", fecha: "" }]);
  };

  const quitarTramo = (idx: number) => {
    if (tramos.length > 2) setTramos(tramos.filter((_, i) => i !== idx));
  };

  const actualizarTramo = (idx: number, campo: keyof Tramo, valor: string) => {
    setTramos(tramos.map((t, i) => i === idx ? { ...t, [campo]: valor } : t));
  };

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
  };

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

          {/* TIPO */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
            {[
              { key: "ida-vuelta", label: "Ida y vuelta" },
              { key: "solo-ida", label: "Solo ida" },
              { key: "multitramo", label: "Multitramo" },
            ].map(t => (
              <button
                key={t.key}
                onClick={() => setTipo(t.key)}
                style={{ padding: "7px 16px", border: `1.5px solid ${tipo === t.key ? "#fff" : "rgba(255,255,255,0.3)"}`, borderRadius: "50px", fontSize: "12px", fontWeight: "700", cursor: "pointer", background: tipo === t.key ? "#fff" : "transparent", color: tipo === t.key ? "#0D0C56" : "#fff" }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* IDA Y VUELTA / SOLO IDA */}
          {(tipo === "ida-vuelta" || tipo === "solo-ida") && (
            <div style={{ display: "grid", gridTemplateColumns: tipo === "ida-vuelta" ? "1fr 1fr 1fr 1fr auto" : "1fr 1fr 1fr auto", gap: "10px", alignItems: "flex-end" }}>
              <div>
                <div style={labelStyle}>Origen</div>
                <input placeholder="Ciudad de México (MEX)" style={inputStyle} />
              </div>
              <div>
                <div style={labelStyle}>Destino</div>
                <input placeholder="¿A dónde vas?" style={inputStyle} />
              </div>
              <div>
                <div style={labelStyle}>Fecha de ida</div>
                <input type="date" style={inputStyle} />
              </div>
              {tipo === "ida-vuelta" && (
                <div>
                  <div style={labelStyle}>Fecha de vuelta</div>
                  <input type="date" style={inputStyle} />
                </div>
              )}
              <button style={{ padding: "10px 24px", backgroundColor: "#FF5C00", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "800", fontSize: "13px", cursor: "pointer", height: "40px", whiteSpace: "nowrap" }}>
                Buscar vuelos
              </button>
            </div>
          )}

          {/* MULTITRAMO */}
          {tipo === "multitramo" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {tramos.map((t, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto auto", gap: "10px", alignItems: "flex-end" }}>
                  <div>
                    <div style={labelStyle}>Tramo {i + 1} · Origen</div>
                    <input value={t.origen} onChange={e => actualizarTramo(i, "origen", e.target.value)} placeholder="Ciudad de origen" style={inputStyle} />
                  </div>
                  <div>
                    <div style={labelStyle}>Destino</div>
                    <input value={t.destino} onChange={e => actualizarTramo(i, "destino", e.target.value)} placeholder="Ciudad de destino" style={inputStyle} />
                  </div>
                  <div>
                    <div style={labelStyle}>Fecha</div>
                    <input type="date" value={t.fecha} onChange={e => actualizarTramo(i, "fecha", e.target.value)} style={inputStyle} />
                  </div>
                  {i === tramos.length - 1 && tramos.length < 6 ? (
                    <button onClick={agregarTramo} style={{ height: "40px", padding: "0 14px", background: "rgba(255,255,255,0.15)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.3)", borderRadius: "8px", fontSize: "12px", fontWeight: "700", cursor: "pointer", whiteSpace: "nowrap" }}>
                      + Tramo
                    </button>
                  ) : (
                    <div style={{ height: "40px" }} />
                  )}
                  {tramos.length > 2 ? (
                    <button onClick={() => quitarTramo(i)} style={{ height: "40px", width: "40px", background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)", border: "1.5px solid rgba(255,255,255,0.2)", borderRadius: "8px", fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
                  ) : (
                    <div style={{ height: "40px", width: "40px" }} />
                  )}
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "4px" }}>
                <button style={{ padding: "10px 24px", backgroundColor: "#FF5C00", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "800", fontSize: "13px", cursor: "pointer" }}>
                  Buscar vuelos
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* BODY */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "20px", padding: "20px", flex: 1, maxWidth: "1000px", margin: "0 auto", width: "100%" }}>

        {/* IZQUIERDA */}
        <div>
          <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", padding: "14px 16px", marginBottom: "16px", display: "flex", gap: "16px", alignItems: "flex-end", flexWrap: "wrap" }}>
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

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {vuelosData.map(v => (
              <div
                key={v.id}
                onClick={() => setSeleccionado(v.id)}
                style={{ background: seleccionado === v.id ? "#f8faff" : "#fff", borderRadius: "13px", border: `1.5px solid ${seleccionado === v.id ? "#1667E6" : "#e8edf8"}`, padding: "16px 20px", cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", boxShadow: seleccionado === v.id ? "0 4px 20px rgba(22,103,230,0.1)" : "none" }}
                onMouseEnter={e => { if (seleccionado !== v.id) (e.currentTarget as HTMLElement).style.borderColor = "#1667E6"; }}
                onMouseLeave={e => { if (seleccionado !== v.id) (e.currentTarget as HTMLElement).style.borderColor = "#e8edf8"; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: "140px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: "#f5f7ff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "11px", color: "#1667E6" }}>{v.codigo}</div>
                  <div>
                    <div style={{ fontWeight: "700", fontSize: "12px", color: "#0D0C56" }}>{v.aerolinea}</div>
                    <div style={{ fontSize: "10px", color: "#888" }}>{v.clase}</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1, justifyContent: "center" }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontWeight: "800", fontSize: "16px", color: "#0D0C56" }}>{v.salida}</div>
                    <div style={{ fontSize: "10px", color: "#888" }}>MEX</div>
                  </div>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
                    <div style={{ fontSize: "10px", color: "#888" }}>{v.duracion}</div>
                    <div style={{ width: "100%", height: "1px", background: "#e8edf8" }} />
                    <div style={{ fontSize: "10px", color: v.escala === "Directo" ? "#3ED5A9" : "#F5A623", fontWeight: "600" }}>{v.escala}</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontWeight: "800", fontSize: "16px", color: "#0D0C56" }}>{v.llegada}</div>
                    <div style={{ fontSize: "10px", color: "#888" }}>CDG</div>
                  </div>
                </div>
                <div style={{ textAlign: "right", minWidth: "100px" }}>
                  <div style={{ fontWeight: "800", fontSize: "18px", color: "#1667E6" }}>${v.precio}</div>
                  <div style={{ fontSize: "10px", color: "#888" }}>USD / persona</div>
                  {seleccionado === v.id && <div style={{ fontSize: "10px", color: "#1667E6", fontWeight: "700", marginTop: "4px" }}>✓ Seleccionado</div>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SIDEBAR */}
        <div>
          <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", overflow: "hidden", marginBottom: "12px" }}>
            <div style={{ padding: "12px 16px", background: "#0D0C56" }}>
              <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "13px", color: "#fff" }}>Pasajeros</div>
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
                <span style={{ fontSize: "11px", color: "#888" }}>Total pasajeros</span>
                <span style={{ fontWeight: "700", fontSize: "12px", color: "#0D0C56" }}>{totalPasajeros}</span>
              </div>
            </div>
          </div>

          {vueloSeleccionado && (
            <div style={{ background: "#f0f5ff", borderRadius: "13px", border: "1.5px solid #e0eaff", padding: "14px", marginBottom: "12px" }}>
              <div style={{ fontWeight: "700", fontSize: "12px", color: "#1667E6", marginBottom: "8px" }}>Vuelo seleccionado</div>
              <div style={{ fontWeight: "800", fontSize: "14px", color: "#0D0C56", marginBottom: "4px" }}>{vueloSeleccionado.aerolinea}</div>
              <div style={{ fontSize: "12px", color: "#888", marginBottom: "4px" }}>{vueloSeleccionado.salida} → {vueloSeleccionado.llegada} · {vueloSeleccionado.duracion}</div>
              <div style={{ fontSize: "12px", color: vueloSeleccionado.escala === "Directo" ? "#3ED5A9" : "#F5A623", fontWeight: "600", marginBottom: "8px" }}>{vueloSeleccionado.escala}</div>
              <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #e0eaff", paddingTop: "8px" }}>
                <span style={{ fontSize: "11px", color: "#888" }}>${vueloSeleccionado.precio} × {totalPasajeros} personas</span>
                <span style={{ fontWeight: "800", fontSize: "14px", color: "#1667E6" }}>${vueloSeleccionado.precio * totalPasajeros}</span>
              </div>
            </div>
          )}

          <Link href={seleccionado ? "/pago?tipo=vuelo" : "#"} style={{ width: "100%", padding: "13px", backgroundColor: "#FF5C00", color: "#fff", border: "none", borderRadius: "13px", fontFamily: "sans-serif", fontWeight: "800", fontSize: "14px", cursor: !seleccionado ? "not-allowed" : "pointer", opacity: !seleccionado ? 0.4 : 1, textDecoration: "none", display: "block", textAlign: "center", boxSizing: "border-box" as const }}>
  Continuar → Pago
</Link>
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
