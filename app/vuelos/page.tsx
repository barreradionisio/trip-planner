"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "../components/Logo";

const vuelosData: { [key: string]: any[] } = {
  "CDMX → París": [
    { id: 1, aerolinea: "Aeroméxico", codigo: "AM", salida: "06:30", llegada: "14:45", duracion: "8h 15m", escala: "1 escala", precio: 840 },
    { id: 2, aerolinea: "Air France", codigo: "AF", salida: "09:15", llegada: "18:30", duracion: "9h 15m", escala: "Directo", precio: 1100 },
    { id: 3, aerolinea: "Iberia", codigo: "IB", salida: "23:00", llegada: "16:20+1", duracion: "13h 20m", escala: "1 escala", precio: 720 },
  ],
  "París → Roma": [
    { id: 4, aerolinea: "Air France", codigo: "AF", salida: "09:15", llegada: "11:20", duracion: "2h 05m", escala: "Directo", precio: 280 },
    { id: 5, aerolinea: "Alitalia", codigo: "AZ", salida: "14:00", llegada: "16:10", duracion: "2h 10m", escala: "Directo", precio: 220 },
  ],
  "Roma → CDMX": [
    { id: 6, aerolinea: "Iberia", codigo: "IB", salida: "11:00", llegada: "22:10", duracion: "11h 10m", escala: "Directo", precio: 960 },
    { id: 7, aerolinea: "Lufthansa", codigo: "LH", salida: "07:30", llegada: "21:45", duracion: "14h 15m", escala: "1 escala", precio: 850 },
  ],
};

const tramos = Object.keys(vuelosData);

export default function Vuelos() {
  const router = useRouter();
  const [tramoActivo, setTramoActivo] = useState(0);
  const [seleccionados, setSeleccionados] = useState<{ [key: string]: number }>({});

  const totalVuelos = Object.keys(seleccionados).length;
  const totalPrecio = Object.entries(seleccionados).reduce((acc, [tramo, id]) => {
    const vuelo = vuelosData[tramo]?.find((v: any) => v.id === id);
    return acc + (vuelo?.precio || 0);
  }, 0);

  const seleccionar = (tramo: string, id: number) => {
    setSeleccionados(prev => ({ ...prev, [tramo]: id }));
    if (tramoActivo < tramos.length - 1) {
      setTimeout(() => setTramoActivo(tramoActivo + 1), 300);
    }
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        .vuelos-wrap {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'Montserrat', sans-serif;
  background: #f5f7ff;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
}
        .vuelos-topbar {
          background: #0D0C56;
          padding: 11px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
          position: relative;
        }
        .vuelos-topbar-left { display: flex; align-items: center; gap: 12px; }
        .vuelos-pasos { display: flex; align-items: center; gap: 4px; }
        .vuelos-paso-mobile { display: none; font-size: 11px; font-weight: 700; color: #fff; white-space: nowrap; align-items: center; gap: 8px; }
        .vuelos-body {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 20px;
          padding: 20px;
          flex: 1;
          max-width: 1100px;
          margin: 0 auto;
          width: 100%;
        }
        .vuelos-sidebar { display: flex; flex-direction: column; }
        .vuelos-sidebar-mobile { display: none; flex-direction: column; width: 100%; overflow: hidden; }
        .vuelos-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 16px;
          overflow-x: auto;
        }
        .vuelos-card {
          background: #fff;
          border-radius: 13px;
          border: 1.5px solid #e8edf8;
          padding: 16px 20px;
          cursor: pointer;
          transition: all 0.2s;
          margin-bottom: 10px;
          display: block;
          width: 100%;
          text-align: left;
          font-family: 'Montserrat', sans-serif;
          -webkit-appearance: none;
        }
        .vuelos-card:active { opacity: 0.8; }

        @media (max-width: 768px) {
  .vuelos-pasos { display: none; }
  .vuelos-paso-mobile { display: flex; }
  .vuelos-body { grid-template-columns: 1fr; padding: 12px; }
  .vuelos-sidebar { display: none; }
  .vuelos-sidebar-mobile { display: flex; }
  .vuelos-card { padding: 14px; }
}
      `}</style>

      <div className="vuelos-wrap">

        {/* TOPBAR */}
<div className="vuelos-topbar">
  <Logo variant="teal" />
  <div className="vuelos-pasos">
    {["Destinos", "Vuelos", "Hospedaje", "Itinerario", "Pasajeros", "Pago"].map((s, i) => (
      <div key={s} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <div style={{ width: "22px", height: "22px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "800", background: i === 0 ? "#3ED5A9" : i === 1 ? "#1667E6" : "rgba(255,255,255,0.15)", color: i < 2 ? "#0D0C56" : "rgba(255,255,255,0.4)" }}>{i === 0 ? "✓" : i + 1}</div>
          <span style={{ fontSize: "11px", fontWeight: "600", color: i === 1 ? "#fff" : i === 0 ? "#3ED5A9" : "rgba(255,255,255,0.4)" }}>{s}</span>
        </div>
        {i < 5 && <div style={{ width: "16px", height: "1px", background: "rgba(255,255,255,0.15)" }} />}
      </div>
    ))}
  </div>
  <div className="vuelos-paso-mobile">
    <button onClick={() => router.back()} style={{ background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "50%", color: "rgba(255,255,255,0.8)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", width: "30px", height: "30px", flexShrink: 0 }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6"/>
      </svg>
    </button>
    Paso 2 de 6 · Vuelos
  </div>
</div>

        {/* BODY */}
        <div className="vuelos-body">

          {/* IZQUIERDA */}
          <div>
            {/* TABS TRAMOS */}
            <div className="vuelos-tabs">
              {tramos.map((t, i) => (
                <button
                  key={t}
                  onClick={() => setTramoActivo(i)}
                  style={{ padding: "8px 14px", border: `1.5px solid ${tramoActivo === i ? "#1667E6" : seleccionados[t] ? "#3ED5A9" : "#e8edf8"}`, borderRadius: "50px", fontSize: "12px", fontWeight: "700", cursor: "pointer", background: tramoActivo === i ? "#1667E6" : seleccionados[t] ? "#e8fff5" : "#fff", color: tramoActivo === i ? "#fff" : seleccionados[t] ? "#085041" : "#0D0C56", whiteSpace: "nowrap", flexShrink: 0, fontFamily: "Montserrat, sans-serif" }}
                >
                  {seleccionados[t] ? "✓ " : ""}{t}
                </button>
              ))}
            </div>

            {/* VUELOS */}
            {vuelosData[tramos[tramoActivo]].map(v => (
              <button
                key={v.id}
                className="vuelos-card"
                onClick={() => seleccionar(tramos[tramoActivo], v.id)}
                style={{ background: seleccionados[tramos[tramoActivo]] === v.id ? "#f8faff" : "#fff", border: `1.5px solid ${seleccionados[tramos[tramoActivo]] === v.id ? "#1667E6" : "#e8edf8"}` }}
              >
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
                    <div style={{ fontSize: "10px", color: "#888" }}>USD</div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* SIDEBAR DESKTOP */}
          <div className="vuelos-sidebar">
            <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", overflow: "hidden", marginBottom: "12px" }}>
              <div style={{ padding: "10px 14px", background: "#0D0C56" }}>
                <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "12px", color: "#fff" }}>Vuelos seleccionados</div>
              </div>
              <div style={{ padding: "12px 14px" }}>
                {tramos.map(t => {
                  const vuelo = vuelosData[t]?.find((v: any) => v.id === seleccionados[t]);
                  return (
                    <div key={t} style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", padding: "5px 0", borderBottom: "1px solid #f5f7ff" }}>
                      <span style={{ color: "#888" }}>{t}</span>
                      <span style={{ fontWeight: "600", color: vuelo ? "#1667E6" : "#aaa" }}>{vuelo ? `$${vuelo.precio}` : "Sin seleccionar"}</span>
                    </div>
                  );
                })}
                {totalVuelos > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "8px" }}>
                    <span style={{ fontWeight: "800", fontSize: "12px", color: "#0D0C56" }}>Total vuelos</span>
                    <span style={{ fontWeight: "800", fontSize: "16px", color: "#1667E6" }}>${totalPrecio} USD</span>
                  </div>
                )}
              </div>
            </div>
            <Link href={totalVuelos >= tramos.length ? "/hospedaje" : "#"} style={{ width: "100%", padding: "13px", backgroundColor: "#FF5C00", color: "#fff", borderRadius: "13px", fontFamily: "sans-serif", fontWeight: "800", fontSize: "14px", opacity: totalVuelos < tramos.length ? 0.4 : 1, textDecoration: "none", display: "block", textAlign: "center" }}>
              Continuar → Hospedaje
            </Link>
            {totalVuelos < tramos.length && <div style={{ fontSize: "11px", color: "#888", textAlign: "center", marginTop: "8px" }}>Selecciona un vuelo para cada tramo</div>}
          </div>

          {/* SIDEBAR MÓVIL */}
          <div className="vuelos-sidebar-mobile">
            <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", overflow: "hidden", marginBottom: "12px" }}>
              <div style={{ padding: "10px 14px", background: "#0D0C56" }}>
                <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "12px", color: "#fff" }}>Vuelos seleccionados · {totalVuelos}/{tramos.length}</div>
              </div>
              <div style={{ padding: "12px 14px" }}>
                {tramos.map(t => {
                  const vuelo = vuelosData[t]?.find((v: any) => v.id === seleccionados[t]);
                  return (
                    <div key={t} style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", padding: "5px 0", borderBottom: "1px solid #f5f7ff" }}>
                      <span style={{ color: "#888" }}>{t}</span>
                      <span style={{ fontWeight: "600", color: vuelo ? "#1667E6" : "#aaa" }}>{vuelo ? `$${vuelo.precio}` : "Pendiente"}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <Link href={totalVuelos >= tramos.length ? "/hospedaje" : "#"} style={{ width: "100%", padding: "13px", backgroundColor: "#FF5C00", color: "#fff", borderRadius: "13px", fontFamily: "sans-serif", fontWeight: "800", fontSize: "14px", opacity: totalVuelos < tramos.length ? 0.4 : 1, textDecoration: "none", display: "block", textAlign: "center" }}>
              Continuar → Hospedaje
            </Link>
            {totalVuelos < tramos.length && <div style={{ fontSize: "11px", color: "#888", textAlign: "center", marginTop: "8px" }}>Selecciona un vuelo para cada tramo</div>}
          </div>

        </div>
      </div>
    </>
  );
}
