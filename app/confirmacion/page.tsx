"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Logo from "../components/Logo";
import { useIsMobile } from "../hooks/useIsMobile";

const IconEmail = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1667E6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const IconEmailNaranja = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF5C00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const IconTicket = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF5C00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2z"/>
    <line x1="9" y1="9" x2="9" y2="15"/>
  </svg>
);

const IconHotel = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF5C00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const IconApp = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF5C00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
    <line x1="12" y1="18" x2="12.01" y2="18"/>
  </svg>
);

const IconDoc = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1667E6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
);

const IconCalendar = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1667E6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

function ConfirmacionContent() {
  const searchParams = useSearchParams();
  const tipo = searchParams.get("tipo") || "completo";
  const isMobile = useIsMobile();

  const pasosSiguientes = [
    { ico: <IconEmailNaranja />, titulo: "Correo de confirmación", desc: "Revisa tu bandeja de entrada en los próximos minutos.", done: true },
    ...(tipo !== "hotel" ? [{ ico: <IconTicket />, titulo: "Boletos de vuelo", desc: "Recibirás tus boletos por correo.", done: false }] : []),
    ...(tipo !== "vuelo" ? [{ ico: <IconHotel />, titulo: "Voucher de hotel", desc: "Tu reserva de hotel llegará por correo.", done: false }] : []),
    { ico: <IconApp />, titulo: "Todo en la app", desc: "Consulta tu reserva completa desde Mis viajes.", done: false },
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Montserrat',sans-serif", background: "#f5f7ff" }}>

      {/* NAV */}
      <nav style={{ background: "#fff", padding: isMobile ? "12px 16px" : "12px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #e8edf8", position: "relative" }}>
        <Link href="/"><Logo variant="color" /></Link>
        {!isMobile && (
          <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "28px", alignItems: "center" }}>
            <Link href="/destinos" style={{ fontSize: "13px", color: "#0D0C56", textDecoration: "none", fontWeight: "600" }}>Arma tu viaje</Link>
            <Link href="/solo-vuelos" style={{ fontSize: "13px", color: "#0D0C56", textDecoration: "none", fontWeight: "600" }}>Vuelos</Link>
            <Link href="/solo-hoteles" style={{ fontSize: "13px", color: "#0D0C56", textDecoration: "none", fontWeight: "600" }}>Hoteles</Link>
            <Link href="/soporte" style={{ fontSize: "13px", color: "#0D0C56", textDecoration: "none", fontWeight: "600" }}>Soporte</Link>
          </div>
        )}
        <Link href="/mis-viajes" style={{ fontSize: "13px", background: "#1667E6", color: "#fff", textDecoration: "none", fontWeight: "700", padding: "8px 18px", borderRadius: "50px" }}>
          {isMobile ? "Mi cuenta" : "Mi cuenta"}
        </Link>
      </nav>

      {/* HERO */}
      <div style={{ background: "linear-gradient(135deg,#085041,#3ED5A9)", padding: isMobile ? "36px 20px" : "48px 24px", textAlign: "center" }}>
        <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="20" fill="rgba(255,255,255,0.2)"/>
            <path d="M10 20.5L16.5 27L30 13" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h1 style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: isMobile ? "24px" : "32px", color: "#fff", marginBottom: "8px" }}>¡Reserva confirmada!</h1>
        <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)", marginBottom: "16px" }}>Tu viaje está listo. ¡Que lo disfrutes!</p>
        <div style={{ display: "inline-block", background: "rgba(255,255,255,0.2)", borderRadius: "50px", padding: "8px 24px", fontSize: "14px", fontWeight: "800", color: "#fff", letterSpacing: "1px" }}>
          # TP-2024-8847
        </div>
      </div>

      {/* CONTENIDO */}
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: isMobile ? "20px 16px" : "28px 20px", width: "100%", boxSizing: "border-box" }}>

        {/* ACCIONES */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: "12px", marginBottom: "20px" }}>
          <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", padding: "16px", textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "8px" }}><IconEmail /></div>
            <div style={{ fontSize: "11px", color: "#888" }}>Enviamos tu confirmación a</div>
            <div style={{ fontSize: "12px", fontWeight: "700", color: "#1667E6", marginTop: "2px" }}>juan@email.com</div>
          </div>
          <Link href="/mis-viajes/documentos" style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", padding: "16px", textAlign: "center", textDecoration: "none", display: "block" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "8px" }}><IconDoc /></div>
            <div style={{ fontSize: "11px", color: "#888" }}>Descarga tu</div>
            <div style={{ fontSize: "12px", fontWeight: "700", color: "#1667E6", marginTop: "2px" }}>Itinerario completo (PDF)</div>
          </Link>
          <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", padding: "16px", textAlign: "center", cursor: "pointer" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "8px" }}><IconCalendar /></div>
            <div style={{ fontSize: "11px", color: "#888" }}>Agrega tus vuelos a</div>
            <div style={{ fontSize: "12px", fontWeight: "700", color: "#1667E6", marginTop: "2px" }}>Google Calendar</div>
          </div>
        </div>

        {/* RESUMEN */}
        <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", overflow: "hidden", marginBottom: "16px" }}>
          <div style={{ padding: "12px 18px", background: "#0D0C56", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "13px", color: "#fff" }}>Resumen de tu reserva</div>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>
              {tipo === "vuelo" ? "Solo vuelos" : tipo === "hotel" ? "Solo hospedaje" : "12–17 Jul 2026"}
            </div>
          </div>
          <div style={{ padding: "16px 18px", display: "grid", gridTemplateColumns: (tipo === "completo" && !isMobile) ? "1fr 1fr" : "1fr", gap: "16px" }}>
            {(tipo === "vuelo" || tipo === "completo") && (
              <div>
                <div style={{ fontSize: "10px", fontWeight: "700", color: "#1667E6", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "10px" }}>Vuelos</div>
                {[
                  { ruta: "CDMX → París", aerolinea: "Aeroméxico", fecha: "12 Jul · 06:30", precio: "$840" },
                  { ruta: "París → Roma", aerolinea: "Air France", fecha: "15 Jul · 09:15", precio: "$1,360" },
                  { ruta: "Roma → CDMX", aerolinea: "Iberia", fecha: "17 Jul · 11:00", precio: "$1,180" },
                ].map(v => (
                  <div key={v.ruta} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #f5f7ff" }}>
                    <div>
                      <div style={{ fontWeight: "700", fontSize: "12px", color: "#0D0C56" }}>{v.ruta}</div>
                      <div style={{ fontSize: "10px", color: "#888" }}>{v.aerolinea} · {v.fecha}</div>
                    </div>
                    <div style={{ fontWeight: "700", fontSize: "12px", color: "#1667E6" }}>{v.precio}</div>
                  </div>
                ))}
              </div>
            )}
            {(tipo === "hotel" || tipo === "completo") && (
              <div>
                <div style={{ fontSize: "10px", fontWeight: "700", color: "#1667E6", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "10px" }}>Hospedaje</div>
                {[
                  { ciudad: "París", hotel: "Hotel Le Marais", noches: "3 noches", precio: "$540" },
                  { ciudad: "Roma", hotel: "Hotel Roma Centro", noches: "2 noches", precio: "$320" },
                ].map(h => (
                  <div key={h.ciudad} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #f5f7ff" }}>
                    <div>
                      <div style={{ fontWeight: "700", fontSize: "12px", color: "#0D0C56" }}>{h.ciudad}</div>
                      <div style={{ fontSize: "10px", color: "#888" }}>{h.hotel} · {h.noches}</div>
                    </div>
                    <div style={{ fontWeight: "700", fontSize: "12px", color: "#1667E6" }}>{h.precio}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div style={{ background: "#1667E6", padding: "12px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: "12px", fontWeight: "700", color: "rgba(255,255,255,0.8)" }}>Total pagado</div>
            <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: isMobile ? "16px" : "20px", color: "#fff" }}>
              {tipo === "vuelo" ? "$2,080 USD" : tipo === "hotel" ? "$860 USD" : "$3,716 USD"}
            </div>
          </div>
        </div>

        {/* TIMELINE */}
        <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", padding: "16px 18px", marginBottom: "16px" }}>
          <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "13px", color: "#0D0C56", marginBottom: "14px" }}>¿Qué sigue?</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {pasosSiguientes.map((t, i) => (
              <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: t.done ? "#e8fff5" : "#f5f7ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {t.ico}
                </div>
                <div>
                  <div style={{ fontWeight: "700", fontSize: "12px", color: "#0D0C56", display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                    {t.titulo}
                    {t.done && <span style={{ fontSize: "10px", background: "#e8fff5", color: "#085041", padding: "1px 8px", borderRadius: "50px", fontWeight: "700" }}>Enviado ✓</span>}
                  </div>
                  <div style={{ fontSize: "11px", color: "#888", marginTop: "2px" }}>{t.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* POLÍTICA */}
        <div style={{ background: "#fff8e0", border: "1.5px solid #F5A623", borderRadius: "13px", padding: "14px 18px", marginBottom: "24px" }}>
          <div style={{ fontWeight: "700", fontSize: "12px", color: "#7a4800", marginBottom: "4px" }}>⚠️ Política de cancelación</div>
          <div style={{ fontSize: "11px", color: "#7a4800", lineHeight: "1.6" }}>
            Las condiciones de cancelación dependen de la tarifa contratada. Consulta en <strong>Mis viajes</strong> o escríbenos a <strong>no-reply@tripplanner.mx</strong>
          </div>
        </div>

        {/* BOTONES */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <Link href="/mis-viajes" style={{ padding: "13px", backgroundColor: "#FF5C00", color: "#fff", border: "none", borderRadius: "13px", fontFamily: "sans-serif", fontWeight: "800", fontSize: "14px", textAlign: "center", textDecoration: "none", display: "block" }}>
            Ver en Mis viajes
          </Link>
          <Link href="/" style={{ padding: "13px", background: "#fff", color: "#0D0C56", border: "1.5px solid #e8edf8", borderRadius: "13px", fontFamily: "sans-serif", fontWeight: "800", fontSize: "14px", textAlign: "center", textDecoration: "none", display: "block" }}>
            Volver al inicio
          </Link>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: "#0D0C56", padding: isMobile ? "24px 20px" : "32px 32px", display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "center", justifyContent: "space-between", marginTop: "auto", gap: isMobile ? "16px" : "0" }}>
        <div>
          <Logo variant="teal" />
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginTop: "12px" }}>© 2026 Trip Planner · no-reply@tripplanner.mx</p>
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

export default function Confirmacion() {
  return (
    <Suspense>
      <ConfirmacionContent />
    </Suspense>
  );
}
