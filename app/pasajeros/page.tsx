"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "../components/Logo";

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
  nombre: "",
  apellido: "",
  fechaNacimiento: "",
  nacionalidad: "",
  pasaporte: "",
  vencimientoPasaporte: "",
  tipo,
  expandido: true,
});

export default function Pasajeros() {
  const [pasajeros, setPasajeros] = useState<Pasajero[]>([
    pasajeroVacio("Adulto"),
    pasajeroVacio("Adulto"),
  ]);
  const [contacto, setContacto] = useState({ correo: "", telefono: "" });
  const [guardado, setGuardado] = useState(false);

  const actualizarPasajero = (idx: number, campo: keyof Pasajero, valor: string | boolean) => {
    setPasajeros(pasajeros.map((p, i) => i === idx ? { ...p, [campo]: valor } : p));
  };

  const toggleExpandido = (idx: number) => {
    setPasajeros(pasajeros.map((p, i) => i === idx ? { ...p, expandido: !p.expandido } : p));
  };

  const pasajeroCompleto = (p: Pasajero) =>
    p.nombre && p.apellido && p.fechaNacimiento && p.pasaporte && p.vencimientoPasaporte;

  const puedeContnuar = pasajeros.every(pasajeroCompleto) && contacto.correo && contacto.telefono;

  const guardar = () => {
    setGuardado(true);
    // Colapsar todos los pasajeros completos
    setPasajeros(pasajeros.map(p => ({ ...p, expandido: !pasajeroCompleto(p) })));
    setTimeout(() => setGuardado(false), 2000);
  };

  const inputStyle = {
    width: "100%",
    border: "1.5px solid #e8edf8",
    borderRadius: "8px",
    padding: "9px 11px",
    fontSize: "12px",
    outline: "none",
    boxSizing: "border-box" as const,
  };

  const labelStyle = {
    fontSize: "10px",
    fontWeight: "700" as const,
    color: "#1667E6",
    textTransform: "uppercase" as const,
    letterSpacing: "0.4px",
    display: "block" as const,
    marginBottom: "4px",
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Montserrat',sans-serif", background: "#f5f7ff" }}>

      {/* NAV */}
      <nav style={{ background: "#fff", padding: "12px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #e8edf8", position: "relative" }}>
        <Link href="/"><Logo variant="color" /></Link>
        <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "28px", alignItems: "center", width: "440px", justifyContent: "center" }}>
          <Link href="/destinos" style={{ fontSize: "13px", color: "#0D0C56", textDecoration: "none", fontWeight: "600", padding: "6px 14px", borderRadius: "50px" }}>Arma tu viaje</Link>
          <Link href="/solo-vuelos" style={{ fontSize: "13px", color: "#0D0C56", textDecoration: "none", fontWeight: "600", padding: "6px 14px", borderRadius: "50px" }}>Vuelos</Link>
          <Link href="/solo-hoteles" style={{ fontSize: "13px", color: "#0D0C56", textDecoration: "none", fontWeight: "600", padding: "6px 14px", borderRadius: "50px" }}>Hoteles</Link>
          <Link href="/soporte" style={{ fontSize: "13px", color: "#0D0C56", textDecoration: "none", fontWeight: "600", padding: "6px 14px", borderRadius: "50px" }}>Soporte</Link>
        </div>
        <Link href="/login" style={{ fontSize: "13px", background: "#1667E6", color: "#fff", textDecoration: "none", fontWeight: "700", padding: "8px 18px", borderRadius: "50px" }}>Iniciar sesión</Link>
      </nav>

      {/* BODY */}
      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "28px 20px 40px", width: "100%" }}>

        <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "20px", color: "#0D0C56", marginBottom: "4px" }}>Datos de pasajeros</div>
        <div style={{ fontSize: "12px", color: "#888", marginBottom: "24px" }}>Ingresa los datos exactamente como aparecen en el pasaporte</div>

        {/* PASAJEROS */}
        {pasajeros.map((p, idx) => {
          const completo = pasajeroCompleto(p);
          return (
            <div key={idx} style={{ background: "#fff", borderRadius: "13px", border: `1.5px solid ${completo ? "#3ED5A9" : "#e8edf8"}`, overflow: "hidden", marginBottom: "12px", transition: "border-color 0.3s" }}>
              {/* HEADER PASAJERO */}
              <div
                onClick={() => toggleExpandido(idx)}
                style={{ padding: "12px 18px", borderBottom: p.expandido ? "1px solid #f0f2fa" : "none", display: "flex", justifyContent: "space-between", alignItems: "center", background: completo ? "#e8fff5" : "#f5f7ff", cursor: "pointer" }}
              >
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
                <span style={{ fontSize: "18px", color: "#888" }}>{<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d={p.expandido ? "M2 9L7 4L12 9" : "M2 5L7 10L12 5"} stroke="#888" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
</svg>}</span>
              </div>

              {/* FORMULARIO */}
              {p.expandido && (
                <div style={{ padding: "16px 18px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
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
                      <label style={labelStyle}>Vencimiento del pasaporte</label>
                      <input type="date" value={p.vencimientoPasaporte} onChange={e => actualizarPasajero(idx, "vencimientoPasaporte", e.target.value)} style={inputStyle} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* DATOS DE CONTACTO */}
        <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", overflow: "hidden", marginBottom: "16px" }}>
          <div style={{ padding: "12px 18px", borderBottom: "1px solid #f0f2fa", background: "#f5f7ff" }}>
            <div style={{ fontWeight: "800", fontSize: "13px", color: "#0D0C56" }}>Datos de contacto</div>
            <div style={{ fontSize: "11px", color: "#888", marginTop: "2px" }}>Para enviar confirmaciones y actualizaciones de tu reserva</div>
          </div>
          <div style={{ padding: "16px 18px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div>
              <label style={labelStyle}>Correo electrónico *</label>
              <input type="email" value={contacto.correo} onChange={e => setContacto({ ...contacto, correo: e.target.value })} placeholder="correo@email.com" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Teléfono *</label>
              <input type="tel" value={contacto.telefono} onChange={e => setContacto({ ...contacto, telefono: e.target.value })} placeholder="+52 55 1234 5678" style={inputStyle} />
            </div>
          </div>
        </div>

        {/* NOTA */}
        <div style={{ background: "#f0f5ff", border: "1.5px solid #e0eaff", borderRadius: "10px", padding: "12px 14px", marginBottom: "16px", fontSize: "11px", color: "#1667E6", lineHeight: "1.6" }}>
          💡 Asegúrate de que los datos coincidan exactamente con el pasaporte. Errores en el nombre pueden causar problemas en el aeropuerto.
        </div>

        {/* BOTONES */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <button
            onClick={guardar}
            disabled={!puedeContnuar}
            style={{ padding: "13px", background: guardado ? "#3ED5A9" : "#fff", color: guardado ? "#0D0C56" : "#1667E6", border: `1.5px solid ${guardado ? "#3ED5A9" : "#1667E6"}`, borderRadius: "13px", fontFamily: "sans-serif", fontWeight: "800", fontSize: "14px", cursor: !puedeContnuar ? "not-allowed" : "pointer", opacity: !puedeContnuar ? 0.4 : 1, transition: "all 0.3s" }}
          >
            {guardado ? "✓ Información guardada" : "Guardar información"}
          </button>
          <Link
            href={puedeContnuar ? "/pago?tipo=vuelo" : "#"}
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

      {/* FOOTER */}
      <footer style={{ background: "#0D0C56", padding: "32px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
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
