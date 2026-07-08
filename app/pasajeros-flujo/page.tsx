"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "../components/Logo";
import { useIsMobile } from "../hooks/useIsMobile";

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

const resumenViaje = {
  fechas: "12 – 17 Jul 2026",
  vuelos: [
    { tramo: "CDMX → París", aerolinea: "Aeroméxico", fecha: "12 Jul", hora: "06:30", escala: "1 escala" },
    { tramo: "París → Roma", aerolinea: "Air France", fecha: "15 Jul", hora: "09:15", escala: "Directo" },
    { tramo: "Roma → CDMX", aerolinea: "Iberia", fecha: "17 Jul", hora: "11:00", escala: "Directo" },
  ],
  hoteles: [
    { ciudad: "París", nombre: "Hotel Le Marais", noches: 3 },
    { ciudad: "Roma", nombre: "Hotel Roma Centro", noches: 2 },
  ],
};

export default function PasajerosFlujo() {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [pasajeros, setPasajeros] = useState<Pasajero[]>([pasajeroVacio(), pasajeroVacio()]);
  const [guardado, setGuardado] = useState(false);
  const [mostrarResumen, setMostrarResumen] = useState(false);

  const actualizarPasajero = (idx: number, campo: keyof Pasajero, valor: string | boolean) => {
    setPasajeros(pasajeros.map((p, i) => i === idx ? { ...p, [campo]: valor } : p));
  };

  const toggleExpandido = (idx: number) => {
    setPasajeros(pasajeros.map((p, i) => i === idx ? { ...p, expandido: !p.expandido } : p));
  };

  const pasajeroCompleto = (p: Pasajero) =>
    p.nombre && p.apellido && p.fechaNacimiento && p.pasaporte && p.vencimientoPasaporte;

  const puedeContnuar = pasajeros.every(pasajeroCompleto);

  const guardar = () => {
    setGuardado(true);
    setPasajeros(pasajeros.map(p => ({ ...p, expandido: !pasajeroCompleto(p) })));
    setTimeout(() => setGuardado(false), 2000);
  };

  const inputStyle = {
    width: "100%", border: "1.5px solid #e8edf8", borderRadius: "8px",
    padding: "9px 11px", fontSize: "12px", outline: "none", boxSizing: "border-box" as const,
  };

  const labelStyle = {
    fontSize: "10px", fontWeight: "700" as const, color: "#1667E6",
    textTransform: "uppercase" as const, letterSpacing: "0.4px",
    display: "block" as const, marginBottom: "4px",
  };

  const Sidebar = () => (
    <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", overflow: "hidden" }}>
      <div style={{ padding: "12px 16px", background: "#0D0C56" }}>
        <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "13px", color: "#fff" }}>Resumen de tu viaje</div>
        <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", marginTop: "2px" }}>{resumenViaje.fechas}</div>
      </div>
      <div style={{ padding: "12px 14px", borderBottom: "1px solid #f5f7ff" }}>
        <div style={{ fontSize: "10px", fontWeight: "700", color: "#1667E6", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "8px" }}>Vuelos</div>
        {resumenViaje.vuelos.map((v, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: i < resumenViaje.vuelos.length - 1 ? "1px solid #f5f7ff" : "none" }}>
            <div>
              <div style={{ fontWeight: "700", fontSize: "11px", color: "#0D0C56" }}>{v.tramo}</div>
              <div style={{ fontSize: "10px", color: "#888" }}>{v.aerolinea} · {v.fecha} {v.hora}</div>
            </div>
            <span style={{ fontSize: "10px", color: v.escala === "Directo" ? "#3ED5A9" : "#F5A623", fontWeight: "600" }}>{v.escala}</span>
          </div>
        ))}
      </div>
      <div style={{ padding: "12px 14px", borderBottom: "1px solid #f5f7ff" }}>
        <div style={{ fontSize: "10px", fontWeight: "700", color: "#1667E6", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "8px" }}>Hospedaje</div>
        {resumenViaje.hoteles.map((h, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: i < resumenViaje.hoteles.length - 1 ? "1px solid #f5f7ff" : "none" }}>
            <div>
              <div style={{ fontWeight: "700", fontSize: "11px", color: "#0D0C56" }}>{h.ciudad}</div>
              <div style={{ fontSize: "10px", color: "#888" }}>{h.nombre}</div>
            </div>
            <span style={{ fontSize: "10px", color: "#888" }}>{h.noches} noches</span>
          </div>
        ))}
      </div>
      <div style={{ padding: "12px 14px" }}>
        <div style={{ fontSize: "10px", fontWeight: "700", color: "#1667E6", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "8px" }}>Pasajeros</div>
        {pasajeros.map((p, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: i < pasajeros.length - 1 ? "1px solid #f5f7ff" : "none" }}>
            <div style={{ fontWeight: "600", fontSize: "11px", color: "#0D0C56" }}>
              {pasajeroCompleto(p) ? `${p.nombre} ${p.apellido}` : `Pasajero ${i + 1}`}
            </div>
            <span style={{ fontSize: "10px", color: pasajeroCompleto(p) ? "#3ED5A9" : "#aaa", fontWeight: "600" }}>
              {pasajeroCompleto(p) ? "✓ Listo" : "Pendiente"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Montserrat',sans-serif", background: "#f5f7ff" }}>

      {/* TOPBAR */}
      <div style={{ background: "#0D0C56", padding: "11px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <Logo variant="teal" />
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <button onClick={() => router.back()} style={{ background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "50%", color: "rgba(255,255,255,0.8)", cursor: "pointer", marginRight: "8px", display: "flex", alignItems: "center", justifyContent: "center", width: "30px", height: "30px" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.18)"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)"}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          {!isMobile ? (
            ["Destinos", "Vuelos", "Hospedaje", "Itinerario", "Pasajeros", "Pago"].map((s, i) => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <div style={{ width: "22px", height: "22px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "800", background: i < 4 ? "#3ED5A9" : i === 4 ? "#1667E6" : "rgba(255,255,255,0.15)", color: i < 5 ? "#0D0C56" : "rgba(255,255,255,0.4)" }}>{i < 4 ? "✓" : i + 1}</div>
                  <span style={{ fontSize: "11px", fontWeight: "600", color: i === 4 ? "#fff" : i < 4 ? "#3ED5A9" : "rgba(255,255,255,0.4)" }}>{s}</span>
                </div>
                {i < 5 && <div style={{ width: "16px", height: "1px", background: "rgba(255,255,255,0.15)" }} />}
              </div>
            ))
          ) : (
            <div style={{ fontSize: "11px", fontWeight: "700", color: "#fff" }}>Paso 5 de 6 · Pasajeros</div>
          )}
        </div>
        <div style={{ width: isMobile ? "0" : "120px" }} />
      </div>

      {/* BODY */}
      <div style={{ display: isMobile ? "flex" : "grid", flexDirection: isMobile ? "column" : undefined, gridTemplateColumns: isMobile ? undefined : "1fr 320px", gap: "20px", padding: isMobile ? "16px" : "20px", flex: 1, maxWidth: "1100px", margin: "0 auto", width: "100%", boxSizing: "border-box" }}>

        {/* IZQUIERDA */}
        <div>
          <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "18px", color: "#0D0C56", marginBottom: "4px" }}>Datos de pasajeros</div>
          <div style={{ fontSize: "12px", color: "#888", marginBottom: "20px" }}>Ingresa los datos exactamente como aparecen en el pasaporte</div>

          {/* RESUMEN COLAPSABLE EN MÓVIL */}
          {isMobile && (
            <div style={{ marginBottom: "16px" }}>
              <button
                onClick={() => setMostrarResumen(!mostrarResumen)}
                style={{ width: "100%", padding: "10px 14px", background: "#0D0C56", border: "none", borderRadius: "10px", color: "#fff", fontFamily: "sans-serif", fontWeight: "700", fontSize: "12px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}
              >
                Ver resumen del viaje
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
  <path d={mostrarResumen ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"}/>
</svg>
              </button>
              {mostrarResumen && (
                <div style={{ marginTop: "8px" }}>
                  <Sidebar />
                </div>
              )}
            </div>
          )}

          {pasajeros.map((p, idx) => {
            const completo = pasajeroCompleto(p);
            return (
              <div key={idx} style={{ background: "#fff", borderRadius: "13px", border: `1.5px solid ${completo ? "#3ED5A9" : "#e8edf8"}`, overflow: "hidden", marginBottom: "12px", transition: "border-color 0.3s" }}>
                <div onClick={() => toggleExpandido(idx)} style={{ padding: "12px 18px", borderBottom: p.expandido ? "1px solid #f0f2fa" : "none", display: "flex", justifyContent: "space-between", alignItems: "center", background: completo ? "#e8fff5" : "#f5f7ff", cursor: "pointer" }}>
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
                </div>

                {p.expandido && (
                  <div style={{ padding: "16px 18px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "12px" }}>
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

          {/* NOTA */}
          <div style={{ background: "#f0f5ff", border: "1.5px solid #e0eaff", borderRadius: "10px", padding: "12px 14px", marginBottom: "16px", fontSize: "11px", color: "#1667E6", lineHeight: "1.6", display: "flex", gap: "10px", alignItems: "flex-start" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1667E6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "1px" }}>
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="16" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
            <span>Asegúrate de que los datos coincidan exactamente con el pasaporte. Errores en el nombre pueden causar problemas en el aeropuerto.</span>
          </div>

          {/* BOTONES */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <button
              onClick={guardar}
              disabled={!puedeContnuar}
              style={{ padding: "13px", background: guardado ? "#3ED5A9" : "#fff", color: guardado ? "#0D0C56" : "#1667E6", border: `1.5px solid ${guardado ? "#3ED5A9" : "#1667E6"}`, borderRadius: "13px", fontFamily: "sans-serif", fontWeight: "800", fontSize: "14px", cursor: !puedeContnuar ? "not-allowed" : "pointer", opacity: !puedeContnuar ? 0.4 : 1, transition: "all 0.3s" }}
            >
              {guardado ? "✓ Guardado" : "Guardar"}
            </button>
            <Link
              href={puedeContnuar ? "/pago" : "#"}
              style={{ padding: "13px", backgroundColor: "#FF5C00", color: "#fff", border: "none", borderRadius: "13px", fontFamily: "sans-serif", fontWeight: "800", fontSize: "14px", cursor: !puedeContnuar ? "not-allowed" : "pointer", opacity: !puedeContnuar ? 0.4 : 1, textDecoration: "none", display: "block", textAlign: "center", boxSizing: "border-box" as const }}
            >
              Continuar → Pago
            </Link>
          </div>
          {!puedeContnuar && (
            <div style={{ fontSize: "11px", color: "#888", textAlign: "center", marginTop: "8px" }}>
              Completa los campos obligatorios (*) de todos los pasajeros
            </div>
          )}
        </div>

        {/* SIDEBAR DESKTOP */}
        {!isMobile && <Sidebar />}
      </div>

      {/* FOOTER */}
      <footer style={{ background: "#0D0C56", padding: isMobile ? "24px 20px" : "32px 32px", display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "center", justifyContent: "space-between", marginTop: "auto", gap: isMobile ? "16px" : "0" }}>
        <div>
          <Logo variant="teal" />
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginTop: "12px" }}>© 2026 Trip Planner · no-reply@tripplaner.com.mx</p>
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
