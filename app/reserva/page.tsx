"use client";

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
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Montserrat',sans-serif", background: "#f5f7ff" }}>

      {/* NAV */}
      <nav style={{ background: "#fff", padding: "12px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #e8edf8", position: "relative" }}>
        <Logo variant="color" />
        <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "28px", alignItems: "center" }}>
          {["Mis viajes", "Perfil", "Soporte"].map(l => (
            <a key={l} href="#" style={{ fontSize: "13px", color: "#0D0C56", textDecoration: "none", fontWeight: "600" }}>{l}</a>
          ))}
        </div>
        <a href="/mis-viajes" style={{ fontSize: "13px", background: "#f0f5ff", color: "#1667E6", textDecoration: "none", fontWeight: "700", padding: "8px 18px", borderRadius: "50px" }}>‹ Mis viajes</a>
      </nav>

      {/* HERO */}
      <div style={{ background: "linear-gradient(135deg,#0D0C56,#1667E6)", padding: "28px 32px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", marginBottom: "4px" }}>Reserva</div>
              <h1 style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "24px", color: "#fff", marginBottom: "6px" }}>París · Roma</h1>
              <div style={{ display: "flex", gap: "16px", fontSize: "12px", color: "rgba(255,255,255,0.7)" }}>
                <span>📅 12 – 17 Jul 2026</span>
                <span>👥 2 personas</span>
                <span>✈️ 3 vuelos</span>
                <span>🏨 2 hoteles</span>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "10px", background: "#e8fff5", color: "#085041", padding: "3px 12px", borderRadius: "50px", fontWeight: "700", marginBottom: "8px", display: "inline-block" }}>Confirmado</div>
              <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "22px", color: "#fff" }}>$3,716 USD</div>
              <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>TP-2024-8847</div>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENIDO */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "24px 20px", width: "100%", display: "grid", gridTemplateColumns: "1fr 280px", gap: "20px" }}>

        {/* IZQUIERDA */}
        <div>
          {/* TABS */}
          <div style={{ display: "flex", background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", padding: "4px", marginBottom: "16px", gap: "4px" }}>
            {tabs.map(t => (
              <button
                key={t.key}
                onClick={() => setTabActivo(t.key)}
                style={{ flex: 1, padding: "9px", border: "none", borderRadius: "9px", fontSize: "12px", fontWeight: "700", cursor: "pointer", background: tabActivo === t.key ? "#1667E6" : "transparent", color: tabActivo === t.key ? "#fff" : "#888", transition: "all 0.2s" }}
              >
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
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <div style={{ fontWeight: "700", fontSize: "13px", color: "#0D0C56" }}>{v.ruta}</div>
                    <div style={{ fontSize: "11px", color: "#888" }}>{v.fecha}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: "#f5f7ff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "11px", color: "#1667E6", flexShrink: 0 }}>{v.codigo}</div>
                    <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontWeight: "800", fontSize: "16px", color: "#0D0C56" }}>{v.salida}</div>
                      </div>
                      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
                        <div style={{ fontSize: "10px", color: "#888" }}>{v.duracion}</div>
                        <div style={{ width: "100%", height: "1px", background: "#e8edf8" }} />
                        <div style={{ fontSize: "10px", color: v.escala === "Directo" ? "#3ED5A9" : "#F5A623", fontWeight: "600" }}>{v.escala}</div>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontWeight: "800", fontSize: "16px", color: "#0D0C56" }}>{v.llegada}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: "11px", color: "#888", flexShrink: 0 }}>{v.aerolinea} · {v.clase}</div>
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
                <div key={i} style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", padding: "16px 20px", display: "flex", gap: "16px", alignItems: "center" }}>
                  <div style={{ width: "56px", height: "56px", borderRadius: "10px", background: "linear-gradient(135deg,#0D0C56,#1667E6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", flexShrink: 0 }}>🏨</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                      <div style={{ fontWeight: "800", fontSize: "14px", color: "#0D0C56" }}>{h.nombre}</div>
                      <div style={{ fontSize: "11px", color: "#F5A623" }}>{"★".repeat(h.estrellas)}</div>
                    </div>
                    <div style={{ fontSize: "11px", color: "#888", marginBottom: "4px" }}>{h.ciudad} · {h.habitacion} · {h.noches} noches</div>
                    <div style={{ display: "flex", gap: "16px", fontSize: "11px", color: "#888" }}>
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
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", fontSize: "12px" }}>
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
              <div style={{ background: "#f0f5ff", border: "1.5px solid #e0eaff", borderRadius: "13px", padding: "12px 16px", fontSize: "11px", color: "#1667E6" }}>
                ✨ Puedes editar tu itinerario completo desde <strong>Mis viajes</strong>
              </div>
            </div>
          )}
        </div>

        {/* SIDEBAR */}
        <div>
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
            <button style={{ width: "100%", padding: "11px", background: "#1667E6", color: "#fff", border: "none", borderRadius: "10px", fontWeight: "700", fontSize: "12px", cursor: "pointer" }}>Descargar itinerario PDF</button>
            <button style={{ width: "100%", padding: "11px", background: "#f0f5ff", color: "#1667E6", border: "1.5px solid #e0eaff", borderRadius: "10px", fontWeight: "700", fontSize: "12px", cursor: "pointer" }}>Editar itinerario</button>
            <button style={{ width: "100%", padding: "11px", background: "#fff", color: "#888", border: "1.5px solid #e8edf8", borderRadius: "10px", fontWeight: "700", fontSize: "12px", cursor: "pointer" }}>Contactar soporte</button>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: "#0D0C56", padding: "32px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
        <div>
          <Logo variant="teal" />
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginTop: "12px" }}>© 2026 Trip Planner · no-reply@tripplanner.mx</p>
        </div>
        <div style={{ display: "flex", gap: "24px" }}>
          <a href="#" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Centro de ayuda</a>
          <a href="#" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Contacto</a>
          <a href="#" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Política de privacidad</a>
        </div>
      </footer>
    </div>
  );
}
