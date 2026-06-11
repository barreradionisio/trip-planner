"use client";

import { useState } from "react";
import Logo from "../components/Logo";

export default function Perfil() {
  const [seccion, setSeccion] = useState("datos");
  const [guardado, setGuardado] = useState(false);

  const guardar = () => {
    setGuardado(true);
    setTimeout(() => setGuardado(false), 2000);
  };

  const secciones = [
    { key: "datos", label: "Datos personales" },
    { key: "password", label: "Contraseña" },
    { key: "notificaciones", label: "Notificaciones" },
    { key: "actividad", label: "Actividad reciente" },
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Montserrat',sans-serif", background: "#f5f7ff" }}>

      {/* NAV */}
      <nav style={{ background: "#1667E6", padding: "12px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" }}>
        <Logo variant="naranja" />
        <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "28px", alignItems: "center" }}>
          {["Mis viajes", "Perfil", "Soporte"].map(l => (
            <a key={l} href="#" style={{ fontSize: "13px", color: l === "Perfil" ? "#fff" : "rgba(255,255,255,0.7)", textDecoration: "none", fontWeight: l === "Perfil" ? "700" : "600" }}>{l}</a>
          ))}
        </div>
        <a href="/" style={{ fontSize: "13px", background: "rgba(255,255,255,0.15)", color: "#fff", textDecoration: "none", fontWeight: "700", padding: "8px 18px", borderRadius: "50px" }}>+ Nuevo viaje</a>
      </nav>

      {/* HEADER */}
      <div style={{ background: "#1667E6", padding: "28px 32px 48px", marginBottom: "-28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif", fontWeight: "800", fontSize: "22px", color: "#fff" }}>JG</div>
          <div>
            <h1 style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "22px", color: "#fff", marginBottom: "2px" }}>Juan García López</h1>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)" }}>juan@email.com · Miembro desde 2024</p>
          </div>
        </div>
      </div>

      {/* CONTENIDO */}
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 20px 40px", width: "100%", display: "grid", gridTemplateColumns: "200px 1fr", gap: "20px" }}>

        {/* SIDEBAR */}
        <div style={{ paddingTop: "28px" }}>
          <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", overflow: "hidden" }}>
            {secciones.map((s, i) => (
              <button
                key={s.key}
                onClick={() => setSeccion(s.key)}
                style={{ width: "100%", padding: "12px 16px", border: "none", borderBottom: i < secciones.length - 1 ? "1px solid #f5f7ff" : "none", background: seccion === s.key ? "#f0f5ff" : "#fff", color: seccion === s.key ? "#1667E6" : "#0D0C56", fontWeight: seccion === s.key ? "700" : "600", fontSize: "12px", cursor: "pointer", textAlign: "left" }}
              >
                {s.label}
                {seccion === s.key && <span style={{ float: "right", color: "#1667E6" }}>›</span>}
              </button>
            ))}
          </div>
        </div>

        {/* PANEL PRINCIPAL */}
        <div style={{ paddingTop: "28px" }}>

          {/* DATOS PERSONALES */}
          {seccion === "datos" && (
            <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", overflow: "hidden" }}>
              <div style={{ padding: "14px 18px", borderBottom: "1px solid #f0f2fa" }}>
                <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "14px", color: "#0D0C56" }}>Datos personales</div>
              </div>
              <div style={{ padding: "18px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                {[
                  { label: "Nombre", value: "Juan", type: "text" },
                  { label: "Apellido", value: "García López", type: "text" },
                  { label: "Correo electrónico", value: "juan@email.com", type: "email" },
                  { label: "Teléfono", value: "+52 55 1234 5678", type: "tel" },
                  { label: "País", value: "México", type: "text" },
                  { label: "Ciudad", value: "Ciudad de México", type: "text" },
                  { label: "Fecha de nacimiento", value: "15/03/1990", type: "text" },
                  { label: "Nacionalidad", value: "Mexicana", type: "text" },
                ].map(f => (
                  <div key={f.label}>
                    <div style={{ fontSize: "10px", fontWeight: "700", color: "#1667E6", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "4px" }}>{f.label}</div>
                    <input defaultValue={f.value} type={f.type} style={{ width: "100%", border: "1.5px solid #e8edf8", borderRadius: "8px", padding: "9px 11px", fontSize: "12px", outline: "none", boxSizing: "border-box" }} />
                  </div>
                ))}
                <div style={{ gridColumn: "1/-1" }}>
                  <div style={{ fontSize: "10px", fontWeight: "700", color: "#1667E6", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "4px" }}>Número de pasaporte</div>
                  <input defaultValue="A12345678" style={{ width: "100%", border: "1.5px solid #e8edf8", borderRadius: "8px", padding: "9px 11px", fontSize: "12px", outline: "none", boxSizing: "border-box" }} />
                  <div style={{ fontSize: "10px", color: "#aaa", marginTop: "4px" }}>Se usará para prellenar datos en tus próximas reservas</div>
                </div>
              </div>
              <div style={{ padding: "14px 18px", borderTop: "1px solid #f0f2fa", display: "flex", justifyContent: "flex-end" }}>
                <button onClick={guardar} style={{ padding: "10px 24px", background: guardado ? "#3ED5A9" : "#1667E6", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "700", fontSize: "12px", cursor: "pointer", transition: "background 0.3s" }}>
                  {guardado ? "✓ Guardado" : "Guardar cambios"}
                </button>
              </div>
            </div>
          )}

          {/* CONTRASEÑA */}
          {seccion === "password" && (
            <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", overflow: "hidden" }}>
              <div style={{ padding: "14px 18px", borderBottom: "1px solid #f0f2fa" }}>
                <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "14px", color: "#0D0C56" }}>Cambiar contraseña</div>
              </div>
              <div style={{ padding: "18px", display: "flex", flexDirection: "column", gap: "14px", maxWidth: "360px" }}>
                {[
                  { label: "Contraseña actual", placeholder: "Tu contraseña actual" },
                  { label: "Nueva contraseña", placeholder: "Mínimo 8 caracteres" },
                  { label: "Confirmar nueva contraseña", placeholder: "Repite la nueva contraseña" },
                ].map(f => (
                  <div key={f.label}>
                    <div style={{ fontSize: "10px", fontWeight: "700", color: "#1667E6", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "4px" }}>{f.label}</div>
                    <input type="password" placeholder={f.placeholder} style={{ width: "100%", border: "1.5px solid #e8edf8", borderRadius: "8px", padding: "9px 11px", fontSize: "12px", outline: "none", boxSizing: "border-box" }} />
                  </div>
                ))}
                <div style={{ background: "#f0f5ff", borderRadius: "8px", padding: "10px 12px", fontSize: "11px", color: "#1667E6", lineHeight: "1.5" }}>
                  💡 Usa mínimo 8 caracteres con letras, números y símbolos.
                </div>
              </div>
              <div style={{ padding: "14px 18px", borderTop: "1px solid #f0f2fa", display: "flex", justifyContent: "flex-end" }}>
                <button onClick={guardar} style={{ padding: "10px 24px", background: guardado ? "#3ED5A9" : "#1667E6", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "700", fontSize: "12px", cursor: "pointer", transition: "background 0.3s" }}>
                  {guardado ? "✓ Guardado" : "Cambiar contraseña"}
                </button>
              </div>
            </div>
          )}

          {/* NOTIFICACIONES */}
          {seccion === "notificaciones" && (
            <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", overflow: "hidden" }}>
              <div style={{ padding: "14px 18px", borderBottom: "1px solid #f0f2fa" }}>
                <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "14px", color: "#0D0C56" }}>Notificaciones</div>
              </div>
              <div style={{ padding: "18px", display: "flex", flexDirection: "column", gap: "0" }}>
                {[
                  { label: "Confirmaciones de reserva", sub: "Recibe un correo al confirmar tu reserva", active: true },
                  { label: "Recordatorios de viaje", sub: "Te avisamos 7 días y 24h antes de tu vuelo", active: true },
                  { label: "Check-in disponible", sub: "Te notificamos cuando abra el check-in en línea", active: true },
                  { label: "Ofertas y promociones", sub: "Descuentos exclusivos para viajeros frecuentes", active: false },
                  { label: "Novedades de Trip Planner", sub: "Nuevas funciones y destinos disponibles", active: false },
                ].map((n, i, arr) => (
                  <div key={n.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: i < arr.length - 1 ? "1px solid #f5f7ff" : "none" }}>
                    <div>
                      <div style={{ fontWeight: "700", fontSize: "12px", color: "#0D0C56" }}>{n.label}</div>
                      <div style={{ fontSize: "11px", color: "#888", marginTop: "2px" }}>{n.sub}</div>
                    </div>
                    <div style={{ width: "40px", height: "22px", borderRadius: "50px", background: n.active ? "#1667E6" : "#e8edf8", cursor: "pointer", position: "relative", flexShrink: 0 }}>
                      <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: "#fff", position: "absolute", top: "3px", left: n.active ? "21px" : "3px", transition: "left 0.2s" }} />
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ padding: "14px 18px", borderTop: "1px solid #f0f2fa", display: "flex", justifyContent: "flex-end" }}>
                <button onClick={guardar} style={{ padding: "10px 24px", background: guardado ? "#3ED5A9" : "#1667E6", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "700", fontSize: "12px", cursor: "pointer", transition: "background 0.3s" }}>
                  {guardado ? "✓ Guardado" : "Guardar preferencias"}
                </button>
              </div>
            </div>
          )}

          {/* ACTIVIDAD RECIENTE */}
          {seccion === "actividad" && (
            <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", overflow: "hidden" }}>
              <div style={{ padding: "14px 18px", borderBottom: "1px solid #f0f2fa" }}>
                <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "14px", color: "#0D0C56" }}>Actividad reciente</div>
              </div>
              <div style={{ padding: "18px", display: "flex", flexDirection: "column", gap: "0" }}>
                {[
                  { accion: "Reserva confirmada", detalle: "París · Roma — TP-2024-8847", fecha: "Hoy, 10:32 AM", color: "#3ED5A9" },
                  { accion: "Pago procesado", detalle: "$3,716 USD — Visa •••• 4521", fecha: "Hoy, 10:31 AM", color: "#1667E6" },
                  { accion: "Itinerario generado", detalle: "12 actividades en 2 ciudades", fecha: "Hoy, 10:30 AM", color: "#1667E6" },
                  { accion: "Inicio de sesión", detalle: "Chrome · Ciudad de México", fecha: "Ayer, 08:15 PM", color: "#888" },
                  { accion: "Perfil actualizado", detalle: "Número de pasaporte agregado", fecha: "Hace 3 días", color: "#888" },
                ].map((a, i, arr) => (
                  <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start", padding: "12px 0", borderBottom: i < arr.length - 1 ? "1px solid #f5f7ff" : "none" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: a.color, marginTop: "5px", flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: "700", fontSize: "12px", color: "#0D0C56" }}>{a.accion}</div>
                      <div style={{ fontSize: "11px", color: "#888", marginTop: "1px" }}>{a.detalle}</div>
                    </div>
                    <div style={{ fontSize: "10px", color: "#aaa", flexShrink: 0 }}>{a.fecha}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
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
