"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Logo from "../components/Logo";
import { supabase } from "../../lib/supabase";

export default function Perfil() {
  const [seccion, setSeccion] = useState("datos");
  const [guardado, setGuardado] = useState(false);
  const [usuario, setUsuario] = useState<any>(null);
  const [datos, setDatos] = useState({
    nombre: "", apellido: "", correo: "", telefono: "",
    pais: "", ciudad: "", fecha_nacimiento: "", nacionalidad: "", pasaporte: ""
  });

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (data.user) {
        setUsuario(data.user);
        setDatos(prev => ({
          ...prev,
          correo: data.user.email || "",
          nombre: data.user.user_metadata?.nombre || "",
          apellido: data.user.user_metadata?.apellido || "",
        }));
        const { data: perfil } = await supabase
          .from("usuarios")
          .select("*")
          .eq("id", data.user.id)
          .single();
        if (perfil) setDatos(prev => ({ ...prev, ...perfil }));
      }
    });
  }, []);

  const guardar = async () => {
    if (usuario) {
      await supabase.from("usuarios").upsert({ id: usuario.id, ...datos });
    }
    setGuardado(true);
    setTimeout(() => setGuardado(false), 2000);
  };

  const iniciales = (datos.nombre?.[0] || "") + (datos.apellido?.[0] || "");

  const secciones = [
    { key: "datos", label: "Datos" },
    { key: "password", label: "Contraseña" },
    { key: "notificaciones", label: "Notificaciones" },
    { key: "actividad", label: "Actividad" },
  ];

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        .prf-wrap {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          font-family: 'Montserrat', sans-serif;
          background: #f5f7ff;
          width: 100%;
          max-width: 100vw;
          overflow-x: hidden;
        }
        .prf-nav {
          background: #1667E6;
          padding: 12px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
        }
        .prf-nav-center {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 28px;
          align-items: center;
        }
        .prf-nav-mobile { display: none; }
        .prf-hero {
          background: #1667E6;
          padding: 28px 32px 24px;
        }
        .prf-tabs-bar {
          background: #1667E6;
          padding: 0 32px 0;
          display: flex;
          gap: 4px;
        }
        .prf-body {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          width: 100%;
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 20px;
          flex: 1;
        }
        .prf-sidebar { display: flex; flex-direction: column; }
        .prf-sidebar-mobile { display: none; }
        .prf-panel { overflow: hidden; width: 100%; }
        .prf-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .prf-footer {
          background: #0D0C56;
          padding: 32px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
        }
        .prf-footer-links { display: flex; gap: 24px; }

        @media (max-width: 768px) {
          .prf-nav { padding: 12px 16px; }
          .prf-nav-center { display: none; }
          .prf-nav-mobile { display: flex; background: #1667E6; padding: 8px 16px; gap: 16px; border-top: 1px solid rgba(255,255,255,0.1); }
          .prf-hero { padding: 20px 16px 16px; }
          .prf-tabs-bar { padding: 0 12px; overflow-x: auto; -webkit-overflow-scrolling: touch; }
          .prf-body { grid-template-columns: 1fr; padding: 12px; }
          .prf-sidebar { display: none; }
          .prf-sidebar-mobile { display: block; }
          .prf-form-grid { grid-template-columns: 1fr; }
          .prf-footer { flex-direction: column; gap: 16px; padding: 24px 16px; align-items: flex-start; }
          .prf-footer-links { flex-direction: column; gap: 8px; }
        }
      `}</style>

      <div className="prf-wrap">

        {/* NAV */}
        <nav className="prf-nav">
          <Link href="/"><Logo variant="naranja" /></Link>
          <div className="prf-nav-center">
            <Link href="/mis-viajes" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none", fontWeight: "600" }}>Mis viajes</Link>
            <Link href="/perfil" style={{ fontSize: "13px", color: "#fff", textDecoration: "none", fontWeight: "700" }}>Perfil</Link>
            <Link href="/soporte" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none", fontWeight: "600" }}>Soporte</Link>
          </div>
          <Link href="/destinos" style={{ fontSize: "13px", background: "rgba(255,255,255,0.15)", color: "#fff", textDecoration: "none", fontWeight: "700", padding: "8px 18px", borderRadius: "50px" }}>+ Nuevo viaje</Link>
        </nav>
        <div className="prf-nav-mobile">
          <Link href="/mis-viajes" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none", fontWeight: "600" }}>Mis viajes</Link>
          <Link href="/perfil" style={{ fontSize: "13px", color: "#fff", textDecoration: "none", fontWeight: "700" }}>Perfil</Link>
          <Link href="/soporte" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none", fontWeight: "600" }}>Soporte</Link>
        </div>

        {/* HERO */}
        <div className="prf-hero">
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif", fontWeight: "800", fontSize: "22px", color: "#fff", flexShrink: 0 }}>JG</div>
            <div>
              <h1 style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "22px", color: "#fff", marginBottom: "2px" }}>Juan García López</h1>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)" }}>juan@email.com · Miembro desde 2024</p>
            </div>
          </div>
        </div>

        {/* TABS MÓVIL */}
        <div className="prf-sidebar-mobile">
          <div className="prf-tabs-bar">
            {secciones.map(s => (
              <button key={s.key} onClick={() => setSeccion(s.key)} style={{ padding: "10px 14px", border: "none", borderBottom: `2px solid ${seccion === s.key ? "#fff" : "transparent"}`, background: "transparent", color: seccion === s.key ? "#fff" : "rgba(255,255,255,0.6)", fontWeight: seccion === s.key ? "700" : "600", fontSize: "12px", cursor: "pointer", whiteSpace: "nowrap", fontFamily: "Montserrat, sans-serif" }}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

       {/* BODY */}
        <div className="prf-body">

          {/* SIDEBAR DESKTOP */}
          <div className="prf-sidebar">
            <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", overflow: "hidden" }}>
              {secciones.map((s, i) => (
                <button key={s.key} onClick={() => setSeccion(s.key)} style={{ width: "100%", padding: "12px 16px", border: "none", borderBottom: i < secciones.length - 1 ? "1px solid #f5f7ff" : "none", background: seccion === s.key ? "#f0f5ff" : "#fff", color: seccion === s.key ? "#1667E6" : "#0D0C56", fontWeight: seccion === s.key ? "700" : "600", fontSize: "12px", cursor: "pointer", textAlign: "left", fontFamily: "Montserrat, sans-serif" }}>
                  {s.label}
                  {seccion === s.key && <span style={{ float: "right", color: "#1667E6" }}>›</span>}
                </button>
              ))}
            </div>
          </div>

          {/* PANEL */}
          <div className="prf-panel">

            {/* DATOS */}
            {seccion === "datos" && (
              <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", overflow: "hidden" }}>
                <div style={{ padding: "14px 18px", borderBottom: "1px solid #f0f2fa" }}>
                 <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "14px", color: "#0D0C56" }}>Datos personales</div>
                </div>
                <div style={{ padding: "18px" }}>
                  <div className="prf-form-grid">
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
                        <input defaultValue={f.value} type={f.type} style={{ width: "100%", border: "1.5px solid #e8edf8", borderRadius: "8px", padding: "9px 11px", fontSize: "12px", outline: "none", boxSizing: "border-box", color: "#0D0C56" }} />
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: "14px" }}>
                    <div style={{ fontSize: "10px", fontWeight: "700", color: "#1667E6", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "4px" }}>Número de pasaporte</div>
                    <input defaultValue="A12345678" style={{ width: "100%", border: "1.5px solid #e8edf8", borderRadius: "8px", padding: "9px 11px", fontSize: "12px", outline: "none", boxSizing: "border-box", color: "#0D0C56" }} />
                    <div style={{ fontSize: "10px", color: "#aaa", marginTop: "4px" }}>Se usará para prellenar datos en tus próximas reservas</div>
                  </div>
                </div>
                <div style={{ padding: "14px 18px", borderTop: "1px solid #f0f2fa", display: "flex", justifyContent: "flex-end" }}>
                  <button onClick={guardar} style={{ padding: "10px 24px", background: guardado ? "#3ED5A9" : "#1667E6", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "700", fontSize: "12px", cursor: "pointer", transition: "background 0.3s", fontFamily: "Montserrat, sans-serif" }}>
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
                  <div style={{ background: "#f0f5ff", borderRadius: "8px", padding: "10px 12px", fontSize: "11px", color: "#1667E6", display: "flex", gap: "8px", alignItems: "flex-start" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1667E6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "1px" }}>
                      <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
                    </svg>
                    <span>Usa mínimo 8 caracteres con letras, números y símbolos.</span>
                  </div>
                </div>
                <div style={{ padding: "14px 18px", borderTop: "1px solid #f0f2fa", display: "flex", justifyContent: "flex-end" }}>
                  <button onClick={guardar} style={{ padding: "10px 24px", background: guardado ? "#3ED5A9" : "#1667E6", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "700", fontSize: "12px", cursor: "pointer", fontFamily: "Montserrat, sans-serif" }}>
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
                <div style={{ padding: "18px" }}>
                  {[
                    { label: "Confirmaciones de reserva", sub: "Recibe un correo al confirmar tu reserva", active: true },
                    { label: "Recordatorios de viaje", sub: "Te avisamos 7 días y 24h antes de tu vuelo", active: true },
                    { label: "Check-in disponible", sub: "Te notificamos cuando abra el check-in en línea", active: true },
                    { label: "Ofertas y promociones", sub: "Descuentos exclusivos para viajeros frecuentes", active: false },
                    { label: "Novedades de Trip Planner", sub: "Nuevas funciones y destinos disponibles", active: false },
                  ].map((n, i, arr) => (
                    <div key={n.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: i < arr.length - 1 ? "1px solid #f5f7ff" : "none" }}>
                      <div style={{ flex: 1, paddingRight: "16px" }}>
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
                  <button onClick={guardar} style={{ padding: "10px 24px", background: guardado ? "#3ED5A9" : "#1667E6", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "700", fontSize: "12px", cursor: "pointer", fontFamily: "Montserrat, sans-serif" }}>
                    {guardado ? "✓ Guardado" : "Guardar preferencias"}
                  </button>
                </div>
              </div>
            )}

            {/* ACTIVIDAD */}
            {seccion === "actividad" && (
              <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", overflow: "hidden" }}>
                <div style={{ padding: "14px 18px", borderBottom: "1px solid #f0f2fa" }}>
                  <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "14px", color: "#0D0C56" }}>Actividad reciente</div>
                </div>
                <div style={{ padding: "18px" }}>
                  {[
                    { accion: "Reserva confirmada", detalle: "París · Roma — TP-2024-8847", fecha: "Hoy, 10:32 AM", color: "#3ED5A9" },
                    { accion: "Pago procesado", detalle: "$3,716 USD — Visa •••• 4521", fecha: "Hoy, 10:31 AM", color: "#1667E6" },
                    { accion: "Itinerario generado", detalle: "12 actividades en 2 ciudades", fecha: "Hoy, 10:30 AM", color: "#1667E6" },
                    { accion: "Inicio de sesión", detalle: "Chrome · Ciudad de México", fecha: "Ayer, 08:15 PM", color: "#888" },
                    { accion: "Perfil actualizado", detalle: "Número de pasaporte agregado", fecha: "Hace 3 días", color: "#888" },
                  ].map((a, i, arr) => (
                    <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start", padding: "12px 0", borderBottom: i < arr.length - 1 ? "1px solid #f5f7ff" : "none" }}>
                      <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: a.color, marginTop: "5px", flexShrink: 0 }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
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
        <footer className="prf-footer">
          <div>
            <Logo variant="teal" />
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginTop: "12px" }}>© 2026 Trip Planner · no-reply@tripplanner.com.mx</p>
          </div>
          <div className="prf-footer-links">
            <Link href="/soporte?tab=faq" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Centro de ayuda</Link>
            <Link href="/soporte?tab=chat" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Contacto</Link>
            <Link href="/privacidad" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Política de privacidad</Link>
          </div>
        </footer>
      </div>
    </>
  );
}
