"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "../components/Logo";

const vuelosData = [
  { id: 1, aerolinea: "Aeroméxico", codigo: "AM", salida: "06:30", llegada: "14:45", duracion: "8h 15m", escala: "1 escala · CDMX", precio: 420, clase: "Económica" },
  { id: 2, aerolinea: "Air France", codigo: "AF", salida: "09:15", llegada: "20:30", duracion: "11h 15m", escala: "Directo", precio: 680, clase: "Económica" },
  { id: 3, aerolinea: "Iberia", codigo: "IB", salida: "11:00", llegada: "22:10", duracion: "11h 10m", escala: "Directo", precio: 590, clase: "Económica" },
  { id: 4, aerolinea: "Volaris", codigo: "Y4", salida: "14:20", llegada: "23:55", duracion: "9h 35m", escala: "1 escala · GDL", precio: 310, clase: "Económica" },
  { id: 5, aerolinea: "British Airways", codigo: "BA", salida: "22:00", llegada: "15:30+1", duracion: "17h 30m", escala: "1 escala · LHR", precio: 750, clase: "Económica" },
];

const tramos = [
  { label: "CDMX→PAR", desde: "CDMX", hasta: "PAR" },
  { label: "PAR→ROM", desde: "PAR", hasta: "ROM" },
  { label: "ROM→CDMX", desde: "ROM", hasta: "CDMX" },
];

export default function Vuelos() {
  const [tramoActivo, setTramoActivo] = useState(0);
  const [seleccionados, setSeleccionados] = useState<{ [key: number]: number }>({});
  const [pasajeros, setPasajeros] = useState({ adultos: 2, ninos: 0, bebes: 0 });
  const [equipaje, setEquipaje] = useState("maleta-mano");
  const [clase, setClase] = useState("Económica");

  const totalPasajeros = pasajeros.adultos + pasajeros.ninos + pasajeros.bebes;
  const totalVuelos = Object.keys(seleccionados).length;
  const precioTotal = Object.values(seleccionados).reduce((acc, id) => {
    const v = vuelosData.find(v => v.id === id);
    return acc + (v ? v.precio * totalPasajeros : 0);
  }, 0);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Montserrat',sans-serif", background: "#f5f7ff" }}>

      {/* TOPBAR */}
      <div style={{ background: "#0D0C56", padding: "11px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <Logo variant="teal" />
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {["Destinos", "Vuelos", "Hospedaje", "Itinerario", "Pago"].map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "22px", height: "22px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "800", background: i === 0 ? "#3ED5A9" : i === 1 ? "#1667E6" : "rgba(255,255,255,0.15)", color: i < 2 ? "#0D0C56" : "rgba(255,255,255,0.4)" }}>{i === 0 ? "✓" : i + 1}</div>
                <span style={{ fontSize: "11px", fontWeight: "600", color: i === 1 ? "#fff" : i === 0 ? "#3ED5A9" : "rgba(255,255,255,0.4)" }}>{s}</span>
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
          <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", padding: "16px", marginBottom: "16px", display: "flex", gap: "16px", alignItems: "flex-end", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: "10px", fontWeight: "700", color: "#1667E6", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "6px" }}>Tramo</div>
              <div style={{ display: "flex", gap: "6px" }}>
                {tramos.map((t, i) => (
                  <button
                    key={i}
                    onClick={() => setTramoActivo(i)}
                    style={{ padding: "7px 12px", border: `1.5px solid ${tramoActivo === i ? "#1667E6" : "#e8edf8"}`, borderRadius: "8px", fontSize: "11px", fontWeight: "700", cursor: "pointer", background: tramoActivo === i ? "#1667E6" : "#fff", color: tramoActivo === i ? "#fff" : "#0D0C56", position: "relative" }}
                  >
                    {t.label}
                    {seleccionados[i] !== undefined && (
                      <span style={{ position: "absolute", top: "-6px", right: "-6px", width: "14px", height: "14px", borderRadius: "50%", background: "#3ED5A9", color: "#0D0C56", fontSize: "9px", fontWeight: "800", display: "flex", alignItems: "center", justifyContent: "center" }}>✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
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

          {/* TITULO TRAMO */}
          <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "14px", color: "#0D0C56", marginBottom: "12px", padding: "0 4px" }}>
            Vuelos: {tramos[tramoActivo].desde} → {tramos[tramoActivo].hasta}
          </div>

          {/* LISTA DE VUELOS */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {vuelosData.map(v => (
              <div
                key={v.id}
                onClick={() => setSeleccionados({ ...seleccionados, [tramoActivo]: v.id })}
                style={{ background: seleccionados[tramoActivo] === v.id ? "#f8faff" : "#fff", borderRadius: "13px", border: `1.5px solid ${seleccionados[tramoActivo] === v.id ? "#1667E6" : "#e8edf8"}`, padding: "16px 20px", cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", boxShadow: seleccionados[tramoActivo] === v.id ? "0 4px 20px rgba(22,103,230,0.1)" : "none" }}
                onMouseEnter={e => { if (seleccionados[tramoActivo] !== v.id) (e.currentTarget as HTMLElement).style.borderColor = "#1667E6"; }}
                onMouseLeave={e => { if (seleccionados[tramoActivo] !== v.id) (e.currentTarget as HTMLElement).style.borderColor = "#e8edf8"; }}
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
                    <div style={{ fontSize: "10px", color: "#888" }}>{tramos[tramoActivo].desde}</div>
                  </div>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
                    <div style={{ fontSize: "10px", color: "#888" }}>{v.duracion}</div>
                    <div style={{ width: "100%", height: "1px", background: "#e8edf8", position: "relative" }}>
                      <div style={{ position: "absolute", top: "-3px", right: "0", width: "6px", height: "6px", borderRadius: "50%", background: "#1667E6" }} />
                    </div>
                    <div style={{ fontSize: "10px", color: v.escala === "Directo" ? "#3ED5A9" : "#F5A623", fontWeight: "600" }}>{v.escala}</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontWeight: "800", fontSize: "16px", color: "#0D0C56" }}>{v.llegada}</div>
                    <div style={{ fontSize: "10px", color: "#888" }}>{tramos[tramoActivo].hasta}</div>
                  </div>
                </div>
                <div style={{ textAlign: "right", minWidth: "100px" }}>
                  <div style={{ fontWeight: "800", fontSize: "18px", color: "#1667E6" }}>${v.precio}</div>
                  <div style={{ fontSize: "10px", color: "#888" }}>USD / persona</div>
                  {seleccionados[tramoActivo] === v.id && (
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

          <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", overflow: "hidden", marginBottom: "12px" }}>
            <div style={{ padding: "12px 16px", background: "#0D0C56" }}>
              <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "13px", color: "#fff" }}>Resumen de vuelos</div>
            </div>
            <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: "8px" }}>
              {tramos.map((t, i) => {
                const v = vuelosData.find(v => v.id === seleccionados[i]);
                return (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px", borderRadius: "8px", background: v ? "#f0f5ff" : "#f5f7ff" }}>
                    <div>
                      <div style={{ fontWeight: "700", fontSize: "11px", color: "#0D0C56" }}>{t.label}</div>
                      <div style={{ fontSize: "10px", color: "#888" }}>{v ? v.aerolinea : "Sin seleccionar"}</div>
                    </div>
                    {v ? (
                      <span style={{ fontWeight: "700", fontSize: "12px", color: "#1667E6" }}>${v.precio * totalPasajeros}</span>
                    ) : (
                      <span style={{ fontSize: "10px", color: "#aaa" }}>—</span>
                    )}
                  </div>
                );
              })}
              {totalVuelos > 0 && (
                <div style={{ borderTop: "1px solid #f0f2fa", paddingTop: "8px", display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "11px", color: "#888" }}>Total vuelos</span>
                  <span style={{ fontWeight: "800", fontSize: "14px", color: "#1667E6" }}>${precioTotal} USD</span>
                </div>
              )}
            </div>
          </div>

          <button
            disabled={totalVuelos < tramos.length}
            style={{ width: "100%", padding: "13px", backgroundColor: "#FF5C00", color: "#fff", border: "none", borderRadius: "13px", fontFamily: "sans-serif", fontWeight: "800", fontSize: "14px", cursor: totalVuelos < tramos.length ? "not-allowed" : "pointer", opacity: totalVuelos < tramos.length ? 0.4 : 1 }}
          >
            <Link href="/hospedaje" style={{ width: "100%", padding: "13px", backgroundColor: "#FF5C00", color: "#fff", border: "none", borderRadius: "13px", fontFamily: "sans-serif", fontWeight: "800", fontSize: "14px", cursor: totalVuelos < tramos.length ? "not-allowed" : "pointer", opacity: totalVuelos < tramos.length ? 0.4 : 1, textDecoration: "none", display: "block", textAlign: "center", boxSizing: "border-box" as const }}>
  Continuar → Hospedaje
</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

