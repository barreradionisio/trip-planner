"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Logo from "../components/Logo";
import NavUsuario from "../components/NavUsuario";

interface Pasajero {
  nombre: string;
  apellido: string;
  fechaNacimiento: string;
  nacionalidad: string;
  pasaporte: string;
  vencimientoPasaporte: string;
  tipo: string;
  expandido: boolean;
}

const pasajeroVacio = (tipo: string = "Adulto"): Pasajero => ({
  nombre: "", apellido: "", fechaNacimiento: "", nacionalidad: "",
  pasaporte: "", vencimientoPasaporte: "", tipo, expandido: true,
});

function PasajerosContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tipoPago = searchParams.get("tipo") || "vuelo";
  const esHotel = tipoPago === "hotel";

  // Estado para flujo de vuelos
  const [pasajeros, setPasajeros] = useState<Pasajero[]>(() => {
    if (esHotel) return [];
    try {
      const guardado = sessionStorage.getItem("pasajeros");
      if (guardado) {
        const { adultos, ninos, bebes } = JSON.parse(guardado);
        const lista: Pasajero[] = [];
        for (let i = 0; i < adultos; i++) lista.push(pasajeroVacio("Adulto"));
        for (let i = 0; i < ninos; i++) lista.push(pasajeroVacio("Niño"));
        for (let i = 0; i < bebes; i++) lista.push(pasajeroVacio("Bebé"));
        return lista.length > 0 ? lista : [pasajeroVacio()];
      }
    } catch {}
    return [pasajeroVacio()];
  });

  // Estado para flujo de hotel (solo titular)
  const [titular, setTitular] = useState({ nombre: "", apellido: "", correo: "", telefono: "" });
  const titularCompleto = titular.nombre && titular.apellido && titular.correo && titular.telefono;

  const [guardado, setGuardado] = useState(false);

  const actualizarPasajero = (idx: number, campo: keyof Pasajero, valor: string) => {
    setPasajeros(prev => prev.map((p, i) => i === idx ? { ...p, [campo]: valor } : p));
  };

  const toggleExpandido = (idx: number) => {
    setPasajeros(prev => prev.map((p, i) => i === idx ? { ...p, expandido: !p.expandido } : p));
  };

  const pasajeroCompleto = (p: Pasajero) =>
    p.nombre && p.apellido && p.fechaNacimiento && p.pasaporte && p.vencimientoPasaporte;

  const puedeContinuar = esHotel ? !!titularCompleto : pasajeros.every(pasajeroCompleto);

  const guardar = () => {
    setGuardado(true);
    setTimeout(() => setGuardado(false), 2000);
  };

  const inputStyle = {
    width: "100%", border: "1.5px solid #e8edf8", borderRadius: "8px",
    padding: "9px 11px", fontSize: "12px", outline: "none", boxSizing: "border-box" as const,
    fontFamily: "Montserrat, sans-serif", color: "#0D0C56",
  };

  const labelStyle = {
    fontSize: "10px", fontWeight: "700" as const, color: "#1667E6",
    textTransform: "uppercase" as const, letterSpacing: "0.4px",
    display: "block" as const, marginBottom: "4px",
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        .pas-wrap {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          font-family: 'Montserrat', sans-serif;
          background: #f5f7ff;
          width: 100%;
          max-width: 100vw;
          overflow-x: hidden;
        }
        .pas-nav {
          background: #fff;
          padding: 12px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #e8edf8;
          position: relative;
        }
        .pas-nav-left {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 160px;
        }
        .pas-nav-center {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 16px;
          align-items: center;
        }
        .pas-body {
          max-width: 700px;
          margin: 0 auto;
          padding: 24px 20px;
          width: 100%;
        }
        .pas-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .pas-botones {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        @media (max-width: 768px) {
          .pas-nav { padding: 12px 16px; }
          .pas-nav-center { display: none; }
          .pas-body { padding: 16px; }
          .pas-form-grid { grid-template-columns: 1fr; }
          .pas-botones { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="pas-wrap">

        {/* NAV */}
        <nav className="pas-nav">
          <div className="pas-nav-left">
            <button onClick={() => router.back()} style={{ background: "#f5f7ff", border: "none", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", width: "34px", height: "34px", flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0D0C56" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
            <Link href="/"><Logo variant="color" /></Link>
          </div>
          <div className="pas-nav-center">
            <Link href="/destinos" style={{ fontSize: "13px", color: "#0D0C56", textDecoration: "none", fontWeight: "600" }}>Arma tu viaje</Link>
            <Link href="/solo-vuelos" style={{ fontSize: "13px", color: esHotel ? "#0D0C56" : "#1667E6", textDecoration: "none", fontWeight: esHotel ? "600" : "700", padding: "6px 14px", borderRadius: "50px", background: esHotel ? "transparent" : "#f0f5ff" }}>Vuelos</Link>
            <Link href="/solo-hoteles" style={{ fontSize: "13px", color: esHotel ? "#1667E6" : "#0D0C56", textDecoration: "none", fontWeight: esHotel ? "700" : "600", padding: "6px 14px", borderRadius: "50px", background: esHotel ? "#f0f5ff" : "transparent" }}>Hoteles</Link>
            <Link href="/soporte" style={{ fontSize: "13px", color: "#0D0C56", textDecoration: "none", fontWeight: "600" }}>Soporte</Link>
          </div>
          <NavUsuario />
        </nav>

        {/* BODY */}
        <div className="pas-body">

          {esHotel ? (
            /* FLUJO HOTEL — solo titular */
            <>
              <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "18px", color: "#0D0C56", marginBottom: "4px" }}>Datos del titular</div>
              <div style={{ fontSize: "12px", color: "#888", marginBottom: "20px" }}>El titular es quien realiza la reserva y recibe la confirmación</div>

              <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", padding: "20px", marginBottom: "16px" }}>
                <div className="pas-form-grid">
                  <div>
                    <label style={labelStyle}>Nombre *</label>
                    <input value={titular.nombre} onChange={e => setTitular(prev => ({ ...prev, nombre: e.target.value }))} placeholder="Juan" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Apellido *</label>
                    <input value={titular.apellido} onChange={e => setTitular(prev => ({ ...prev, apellido: e.target.value }))} placeholder="García" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Correo electrónico *</label>
                    <input type="email" value={titular.correo} onChange={e => setTitular(prev => ({ ...prev, correo: e.target.value }))} placeholder="juan@email.com" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Teléfono *</label>
                    <input type="tel" value={titular.telefono} onChange={e => setTitular(prev => ({ ...prev, telefono: e.target.value }))} placeholder="+52 55 1234 5678" style={inputStyle} />
                  </div>
                </div>
              </div>

              <div style={{ background: "#f0f5ff", border: "1.5px solid #e0eaff", borderRadius: "10px", padding: "12px 14px", marginBottom: "16px", fontSize: "11px", color: "#1667E6", display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1667E6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "1px" }}>
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="16" x2="12" y2="12"/>
                  <line x1="12" y1="8" x2="12.01" y2="8"/>
                </svg>
                <span>La confirmación de tu reserva se enviará al correo del titular.</span>
              </div>
            </>
          ) : (
            /* FLUJO VUELO — todos los pasajeros */
            <>
              <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "18px", color: "#0D0C56", marginBottom: "4px" }}>Datos de pasajeros</div>
              <div style={{ fontSize: "12px", color: "#888", marginBottom: "20px" }}>Ingresa los datos exactamente como aparecen en el pasaporte · {pasajeros.length} pasajero{pasajeros.length > 1 ? "s" : ""}</div>

              {pasajeros.map((p, idx) => {
                const completo = pasajeroCompleto(p);
                return (
                  <div key={idx} style={{ background: "#fff", borderRadius: "13px", border: `1.5px solid ${completo ? "#3ED5A9" : "#e8edf8"}`, overflow: "hidden", marginBottom: "12px" }}>
                    <button onClick={() => toggleExpandido(idx)} style={{ width: "100%", padding: "12px 18px", borderBottom: p.expandido ? "1px solid #f0f2fa" : "none", display: "flex", justifyContent: "space-between", alignItems: "center", background: completo ? "#e8fff5" : "#f5f7ff", cursor: "pointer", border: "none", fontFamily: "Montserrat, sans-serif" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: completo ? "#3ED5A9" : "#1667E6", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "13px", color: completo ? "#0D0C56" : "#fff" }}>
                          {completo ? "✓" : idx + 1}
                        </div>
                        <div>
                          <div style={{ fontWeight: "700", fontSize: "13px", color: "#0D0C56" }}>
                            {completo ? `${p.nombre} ${p.apellido}` : `Pasajero ${idx + 1}`}
                          </div>
                          <div style={{ fontSize: "10px", color: completo ? "#085041" : "#888" }}>
                            {completo ? `${p.tipo} · ${p.pasaporte}` : p.tipo}
                          </div>
                        </div>
                      </div>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d={p.expandido ? "M2 9L7 4L12 9" : "M2 5L7 10L12 5"} stroke="#888" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    {p.expandido && (
                      <div style={{ padding: "16px 18px" }}>
                        <div className="pas-form-grid">
                          <div>
                            <label style={labelStyle}>Nombre *</label>
                            <input value={p.nombre} onChange={e => actualizarPasajero(idx, "nombre", e.target.value)} placeholder="Como en el pasaporte" style={inputStyle} />
                          </div>
                          <div>
                            <label style={labelStyle}>Apellido *</label>
                            <input value={p.apellido} onChange={e => actualizarPasajero(idx, "apellido", e.target.value)} placeholder="Como en el pasaporte" style={inputStyle} />
                          </div>
                          <div>
                            <label style={labelStyle}>Fecha de nacimiento *</label>
                            <input type="date" value={p.fechaNacimiento} onChange={e => actualizarPasajero(idx, "fechaNacimiento", e.target.value)} style={inputStyle} />
                          </div>
                          <div>
                            <label style={labelStyle}>Nacionalidad</label>
                            <input value={p.nacionalidad} onChange={e => actualizarPasajero(idx, "nacionalidad", e.target.value)} placeholder="Mexicana" style={inputStyle} />
                          </div>
                          <div>
                            <label style={labelStyle}>Número de pasaporte *</label>
                            <input value={p.pasaporte} onChange={e => actualizarPasajero(idx, "pasaporte", e.target.value)} placeholder="A12345678" style={inputStyle} />
                          </div>
                          <div>
                            <label style={labelStyle}>Vencimiento del pasaporte *</label>
                            <input type="date" value={p.vencimientoPasaporte} onChange={e => actualizarPasajero(idx, "vencimientoPasaporte", e.target.value)} style={inputStyle} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              <div style={{ background: "#f0f5ff", border: "1.5px solid #e0eaff", borderRadius: "10px", padding: "12px 14px", marginBottom: "16px", fontSize: "11px", color: "#1667E6", display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1667E6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "1px" }}>
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="16" x2="12" y2="12"/>
                  <line x1="12" y1="8" x2="12.01" y2="8"/>
                </svg>
                <span>Asegúrate de que los datos coincidan exactamente con el pasaporte.</span>
              </div>
            </>
          )}

          <div className="pas-botones">
            <button onClick={guardar} disabled={!puedeContinuar} style={{ padding: "13px", background: guardado ? "#3ED5A9" : "#fff", color: guardado ? "#0D0C56" : "#1667E6", border: `1.5px solid ${guardado ? "#3ED5A9" : "#1667E6"}`, borderRadius: "13px", fontFamily: "sans-serif", fontWeight: "800", fontSize: "14px", cursor: !puedeContinuar ? "not-allowed" : "pointer", opacity: !puedeContinuar ? 0.4 : 1 }}>
              {guardado ? "✓ Guardado" : "Guardar"}
            </button>
            <Link href={puedeContinuar ? `/pago?tipo=${tipoPago}` : "#"} style={{ padding: "13px", backgroundColor: "#FF5C00", color: "#fff", border: "none", borderRadius: "13px", fontFamily: "sans-serif", fontWeight: "800", fontSize: "14px", opacity: !puedeContinuar ? 0.4 : 1, textDecoration: "none", display: "block", textAlign: "center" }}>
              Continuar → Pago
            </Link>
          </div>
          {!puedeContinuar && <div style={{ fontSize: "11px", color: "#888", textAlign: "center", marginTop: "8px" }}>Completa los campos obligatorios (*)</div>}
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

export default function Pasajeros() {
  return (
    <Suspense>
      <PasajerosContent />
    </Suspense>
  );
}
