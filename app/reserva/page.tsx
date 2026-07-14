"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "../components/Logo";

export default function Reserva() {
  const [tabActivo, setTabActivo] = useState("vuelos");

  const tabs = [
    { key: "vuelos", label: "Vuelos" },
    { key: "hoteles", label: "Hoteles" },
    { key: "pasajeros", label: "Pasajeros" },
    { key: "itinerario", label: "Itinerario" },
  ];

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        .res-wrap {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          font-family: 'Montserrat', sans-serif;
          background: #f5f7ff;
          width: 100%;
          max-width: 100vw;
          overflow-x: hidden;
        }
        .res-nav {
          background: #fff;
          padding: 12px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #e8edf8;
          position: relative;
        }
        .res-nav-center {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 28px;
          align-items: center;
        }
        .res-hero {
          background: linear-gradient(135deg,#0D0C56,#1667E6);
          padding: 28px 32px;
        }
        .res-hero-inner {
          max-width: 900px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .res-hero-info {
          display: flex;
          gap: 16px;
          font-size: 12px;
          color: rgba(255,255,255,0.7);
          flex-wrap: wrap;
        }
        .res-body {
          max-width: 900px;
          margin: 0 auto;
          padding: 24px 20px;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 280px;
          gap: 20px;
          flex: 1;
        }
        .res-sidebar { display: flex; flex-direction: column; }
        .res-sidebar-mobile { display: none; flex-direction: column; width: 100%; margin-top: 16px; }
        .res-pasajeros-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 12px;
          font-size: 12px;
        }
        .res-footer {
          background: #0D0C56;
          padding: 32px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
        }
        .res-footer-links { display: flex; gap: 24px; }

        @media (max-width: 768px) {
          .res-nav { padding: 12px 16px; }
          .res-nav-center { display: none; }
          .res-hero { padding: 20px 16px; }
          .res-hero-inner { flex-direction: column; gap: 12px; }
          .res-hero-info { gap: 10px; }
          .res-body { grid-template-columns: 1fr; padding: 12px; }
          .res-sidebar { display: none; }
          .res-sidebar-mobile { display: flex; }
          .res-pasajeros-grid { grid-template-columns: 1fr 1fr; }
          .res-footer { flex-direction: column; gap: 16px; padding: 24px 16px; align-items: flex-start; }
          .res-footer-links { flex-direction: column; gap: 8px; }
        }
      `}</style>

      <div className="res-wrap">

        {/* NAV */}
        <nav className="res-nav">
          <Link href="/"><Logo variant="color" /></Link>
          <div className="res-nav-center">
            <Link href="/mis-viajes" style={{ fontSize: "13px", color: "#0D0C56", textDecoration: "none", fontWeight: "600" }}>Mis viajes</Link>
            <Link href="/perfil" style={{ fontSize: "13px", color: "#0D0C56", textDecoration: "none", fontWeight: "600" }}>Perfil</Link>
            <Link href="/soporte" style={{ fontSize: "13px", color: "#0D0C56", textDecoration: "none", fontWeight: "600" }}>Soporte</Link>
          </div>
          <Link href="/mis-viajes" style={{ fontSize: "13px", background: "#f0f5ff", color: "#1667E6", textDecoration: "none", fontWeight: "700", padding: "8px 18px", borderRadius: "50px" }}>‹ Mis viajes</Link>
        </nav>

        {/* HERO */}
        <div className="res-hero">
          <div className="res-hero-inner">
            <div>
              <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", marginBottom: "4px" }}>Reserva · TP-2024-8847</div>
              <h1 style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "20px", color: "#fff", marginBottom: "6px" }}>París · Roma</h1>
              <div className="res-hero-info">
                <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#3ED5A9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  12 – 17 Jul 2026
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#3ED5A9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                  2 personas
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#3ED5A9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-1 .1-1.3.5l-.4.4c-.4.4-.3 1 .2 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.4 5.8c.3.5.9.6 1.3.2l.4-.4c.4-.3.6-.8.5-1.3z"/>
                  </svg>
                  3 vuelos
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#3ED5A9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                  2 hoteles
                </span>
              </div>
            </div>
                      </div>
        </div>

        {/* BODY */}
        <div className="res-body">

          {/* IZQUIERDA */}
          <div style={{ overflow: "hidden", width: "100%" }}>
            {/* TABS */}
            <div style={{ display: "flex", background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", padding: "4px", marginBottom: "16px", gap: "4px" }}>
              {tabs.map(t => (
                <button key={t.key} onClick={() => setTabActivo(t.key)} style={{ flex: 1, padding: "9px", border: "none", borderRadius: "9px", fontSize: "12px", fontWeight: "700", cursor: "pointer", background: tabActivo === t.key ? "#1667E6" : "transparent", color: tabActivo === t.key ? "#fff" : "#888", transition: "all 0.2s", fontFamily: "Montserrat, sans-serif" }}>
                  {t.label}
                </button>
              ))}
            </div>

            {/* VUELOS */}
            {tabActivo === "vuelos" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { ruta: "Ciudad de México → París", aerolinea: "Aeroméxico", codigo: "AM", fecha: "12 Jul 2026", salida: "06:30", llegada: "14:45", duracion: "8h 15m", escala: "1 escala · CDMX", clase: "Económica" },
                  { ruta: "París → Roma", aerolinea: "Air France", codigo: "AF", fecha: "15 Jul 2026", salida: "09:15", llegada: "11:20", duracion: "2h 05m", escala: "Directo", clase: "Económica" },
                  { ruta: "Roma → Ciudad de México", aerolinea: "Iberia", codigo: "IB", fecha: "17 Jul 2026", salida: "11:00", llegada: "22:10", duracion: "11h 10m", escala: "Directo", clase: "Económica" },
                ].map((v, i) => (
                  <div key={i} style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", padding: "16px 20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", flexWrap: "wrap", gap: "6px" }}>
                      <div style={{ fontWeight: "700", fontSize: "13px", color: "#0D0C56" }}>{v.ruta}</div>
                      <div style={{ fontSize: "11px", color: "#888" }}>{v.fecha}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: "#f5f7ff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "11px", color: "#1667E6", flexShrink: 0 }}>{v.codigo}</div>
                      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ fontWeight: "800", fontSize: "16px", color: "#0D0C56" }}>{v.salida}</div>
                        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
                          <div style={{ fontSize: "10px", color: "#888" }}>{v.duracion}</div>
                          <div style={{ width: "100%", height: "1px", background: "#e8edf8" }} />
                          <div style={{ fontSize: "10px", color: v.escala === "Directo" ? "#3ED5A9" : "#F5A623", fontWeight: "600" }}>{v.escala}</div>
                        </div>
                        <div style={{ fontWeight: "800", fontSize: "16px", color: "#0D0C56" }}>{v.llegada}</div>
                      </div>
                      <div style={{ fontSize: "11px", color: "#888", flexShrink: 0 }}>{v.aerolinea}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* HOTELES */}
            {tabActivo === "hoteles" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { ciudad: "París", nombre: "Hotel Le Marais", estrellas: 4, checkin: "12 Jul 2026", checkout: "15 Jul 2026", noches: 3, habitacion: "Doble", precio: "$540" },
                  { ciudad: "Roma", nombre: "Hotel Roma Centro", estrellas: 4, checkin: "15 Jul 2026", checkout: "17 Jul 2026", noches: 2, habitacion: "Doble", precio: "$320" },
                ].map((h, i) => (
                  <div key={i} style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", padding: "16px 20px", display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
                    <div style={{ width: "56px", height: "56px", borderRadius: "10px", background: "linear-gradient(135deg,#0D0C56,#1667E6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", flexShrink: 0 }}>🏨</div>
                    <div style={{ flex: 1, minWidth: "120px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px", flexWrap: "wrap" }}>
                        <div style={{ fontWeight: "800", fontSize: "14px", color: "#0D0C56" }}>{h.nombre}</div>
                        <div style={{ fontSize: "11px", color: "#F5A623" }}>{"★".repeat(h.estrellas)}</div>
                      </div>
                      <div style={{ fontSize: "11px", color: "#888", marginBottom: "4px" }}>{h.ciudad} · {h.habitacion} · {h.noches} noches</div>
                      <div style={{ display: "flex", gap: "12px", fontSize: "11px", color: "#888", flexWrap: "wrap" }}>
                        <span>Check-in: <strong style={{ color: "#0D0C56" }}>{h.checkin}</strong></span>
                        <span>Check-out: <strong style={{ color: "#0D0C56" }}>{h.checkout}</strong></span>
                      </div>
                    </div>
                    <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "16px", color: "#1667E6" }}>{h.precio}</div>
                  </div>
                ))}
              </div>
            )}

            {/* PASAJEROS */}
            {tabActivo === "pasajeros" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { nombre: "Juan García López", tipo: "Adulto", pasaporte: "A12345678", nacimiento: "15/03/1990", nacionalidad: "Mexicana" },
                  { nombre: "María García López", tipo: "Adulto", pasaporte: "B98765432", nacimiento: "22/07/1992", nacionalidad: "Mexicana" },
                ].map((p, i) => (
                  <div key={i} style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", padding: "16px 20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                      <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#f0f5ff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "14px", color: "#1667E6" }}>
                        {p.nombre.split(" ").map(n => n[0]).slice(0, 2).join("")}
                      </div>
                      <div>
                        <div style={{ fontWeight: "800", fontSize: "14px", color: "#0D0C56" }}>{p.nombre}</div>
                        <div style={{ fontSize: "11px", color: "#888" }}>{p.tipo}</div>
                      </div>
                    </div>
                    <div className="res-pasajeros-grid">
                      <div><div style={{ fontSize: "10px", color: "#888", marginBottom: "2px" }}>Pasaporte</div><div style={{ fontWeight: "700", color: "#0D0C56" }}>{p.pasaporte}</div></div>
                      <div><div style={{ fontSize: "10px", color: "#888", marginBottom: "2px" }}>Fecha de nacimiento</div><div style={{ fontWeight: "700", color: "#0D0C56" }}>{p.nacimiento}</div></div>
                      <div><div style={{ fontSize: "10px", color: "#888", marginBottom: "2px" }}>Nacionalidad</div><div style={{ fontWeight: "700", color: "#0D0C56" }}>{p.nacionalidad}</div></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ITINERARIO */}
            {tabActivo === "itinerario" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { ciudad: "París", dia: "Día 1 · 12 Jul", actividades: ["09:00 · Torre Eiffel", "12:00 · Almuerzo en Le Procope", "15:00 · Museo del Louvre", "20:00 · Cena en Montmartre"] },
                  { ciudad: "París", dia: "Día 2 · 13 Jul", actividades: ["10:00 · Palacio de Versalles", "15:00 · Champs-Élysées", "19:00 · Crucero por el Sena"] },
                  { ciudad: "Roma", dia: "Día 4 · 15 Jul", actividades: ["09:00 · Coliseo Romano", "12:00 · Almuerzo en Trastevere", "15:00 · Foro Romano", "19:00 · Fontana di Trevi"] },
                ].map((d, i) => (
                  <div key={i} style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", padding: "16px 20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                      <div style={{ fontWeight: "800", fontSize: "13px", color: "#0D0C56" }}>{d.dia}</div>
                      <div style={{ fontSize: "11px", background: "#f0f5ff", color: "#1667E6", padding: "2px 10px", borderRadius: "50px", fontWeight: "600" }}>{d.ciudad}</div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      {d.actividades.map((a, j) => (
                        <div key={j} style={{ fontSize: "12px", color: "#555", display: "flex", gap: "8px", alignItems: "center" }}>
                          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#1667E6", flexShrink: 0 }} />
                          {a}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <div style={{ background: "#f0f5ff", border: "1.5px solid #e0eaff", borderRadius: "13px", padding: "12px 16px", fontSize: "11px", color: "#1667E6", display: "flex", gap: "8px", alignItems: "flex-start" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1667E6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "1px" }}>
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
                  </svg>
                  Puedes editar tu itinerario completo desde <strong>Mis viajes</strong>
                </div>
              </div>
            )}

            {/* SIDEBAR MÓVIL */}
            <div className="res-sidebar-mobile">
              <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", overflow: "hidden", marginBottom: "12px" }}>
                <div style={{ padding: "10px 14px", background: "#0D0C56" }}>
                  <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "12px", color: "#fff" }}>Resumen de pago</div>
                </div>
                <div style={{ padding: "12px 14px" }}>
                  {[
                    { label: "Vuelos · 3 tramos", value: "$2,856" },
                    { label: "Hospedaje · 5 noches", value: "$860" },
                    { label: "Comisión", value: "$0" },
                  ].map(r => (
                    <div key={r.label} style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", padding: "5px 0", borderBottom: "1px solid #f5f7ff" }}>
                      <span style={{ color: "#888" }}>{r.label}</span>
                      <span style={{ fontWeight: "600", color: r.label === "Comisión" ? "#3ED5A9" : "#0D0C56" }}>{r.value}</span>
                    </div>
                  ))}
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0 0" }}>
                    <span style={{ fontWeight: "800", fontSize: "13px", color: "#0D0C56" }}>Total pagado</span>
                    <span style={{ fontWeight: "800", fontSize: "16px", color: "#1667E6" }}>$3,716 USD</span>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <Link href="/mis-viajes/documentos" style={{ width: "100%", padding: "11px", background: "#1667E6", color: "#fff", border: "none", borderRadius: "10px", fontWeight: "700", fontSize: "12px", cursor: "pointer", textDecoration: "none", display: "block", textAlign: "center" }}>Descargar itinerario PDF</Link>
                <Link href="/mis-viajes/itinerario" style={{ width: "100%", padding: "11px", background: "#f0f5ff", color: "#1667E6", border: "1.5px solid #e0eaff", borderRadius: "10px", fontWeight: "700", fontSize: "12px", cursor: "pointer", textDecoration: "none", display: "block", textAlign: "center" }}>Editar itinerario</Link>
                <button style={{ width: "100%", padding: "11px", background: "#fff", color: "#888", border: "1.5px solid #e8edf8", borderRadius: "10px", fontWeight: "700", fontSize: "12px", cursor: "pointer", fontFamily: "Montserrat, sans-serif" }}>Contactar soporte</button>
              </div>
            </div>
          </div>

          {/* SIDEBAR DESKTOP */}
          <div className="res-sidebar">
            <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", overflow: "hidden", marginBottom: "12px" }}>
              <div style={{ padding: "10px 14px", background: "#0D0C56" }}>
                <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "12px", color: "#fff" }}>Resumen de pago</div>
              </div>
              <div style={{ padding: "12px 14px" }}>
                {[
                  { label: "Vuelos · 3 tramos", value: "$2,856" },
                  { label: "Hospedaje · 5 noches", value: "$860" },
                  { label: "Comisión", value: "$0" },
                ].map(r => (
                  <div key={r.label} style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", padding: "5px 0", borderBottom: "1px solid #f5f7ff" }}>
                    <span style={{ color: "#888" }}>{r.label}</span>
                    <span style={{ fontWeight: "600", color: r.label === "Comisión" ? "#3ED5A9" : "#0D0C56" }}>{r.value}</span>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0 0", fontFamily: "sans-serif" }}>
                  <span style={{ fontWeight: "800", fontSize: "13px", color: "#0D0C56" }}>Total pagado</span>
                  <span style={{ fontWeight: "800", fontSize: "16px", color: "#1667E6" }}>$3,716 USD</span>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <Link href="/mis-viajes/documentos" style={{ width: "100%", padding: "11px", background: "#1667E6", color: "#fff", border: "none", borderRadius: "10px", fontWeight: "700", fontSize: "12px", cursor: "pointer", textDecoration: "none", display: "block", textAlign: "center" }}>Descargar itinerario PDF</Link>
              <Link href="/mis-viajes/itinerario" style={{ width: "100%", padding: "11px", background: "#f0f5ff", color: "#1667E6", border: "1.5px solid #e0eaff", borderRadius: "10px", fontWeight: "700", fontSize: "12px", cursor: "pointer", textDecoration: "none", display: "block", textAlign: "center" }}>Editar itinerario</Link>
              <button style={{ width: "100%", padding: "11px", background: "#fff", color: "#888", border: "1.5px solid #e8edf8", borderRadius: "10px", fontWeight: "700", fontSize: "12px", cursor: "pointer", fontFamily: "Montserrat, sans-serif" }}>Contactar soporte</button>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="res-footer">
          <div>
            <Logo variant="teal" />
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginTop: "12px" }}>© 2026 Trip Planner · no-reply@tripplanner.com.mx</p>
          </div>
          <div className="res-footer-links">
            <Link href="/soporte?tab=faq" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Centro de ayuda</Link>
            <Link href="/soporte?tab=chat" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Contacto</Link>
            <Link href="/privacidad" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Política de privacidad</Link>
          </div>
        </footer>
      </div>
    </>
  );
}
