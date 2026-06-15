"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Logo from "../components/Logo";

function ConfirmacionContent() {
  const searchParams = useSearchParams();
  const tipo = searchParams.get("tipo") || "completo";
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Montserrat',sans-serif", background: "#f5f7ff" }}>

      {/* NAV */}
      <nav style={{ background: "#fff", padding: "12px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #e8edf8", position: "relative" }}>
  <Link href="/"><Logo variant="color" /></Link>
  <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "28px", alignItems: "center" }}>
    <Link href="/destinos" style={{ fontSize: "13px", color: "#0D0C56", textDecoration: "none", fontWeight: "600" }}>Arma tu viaje</Link>
    <Link href="/solo-vuelos" style={{ fontSize: "13px", color: "#0D0C56", textDecoration: "none", fontWeight: "600" }}>Vuelos</Link>
    <Link href="/solo-hoteles" style={{ fontSize: "13px", color: "#0D0C56", textDecoration: "none", fontWeight: "600" }}>Hoteles</Link>
    <Link href="/soporte" style={{ fontSize: "13px", color: "#0D0C56", textDecoration: "none", fontWeight: "600" }}>Soporte</Link>
  </div>
  <Link href="/mis-viajes" style={{ fontSize: "13px", background: "#1667E6", color: "#fff", textDecoration: "none", fontWeight: "700", padding: "8px 18px", borderRadius: "50px" }}>Mi cuenta</Link>
</nav>

      {/* HERO */}
      <div style={{ background: "linear-gradient(135deg,#085041,#3ED5A9)", padding: "48px 24px", textAlign: "center" }}>
        <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "40px", margin: "0 auto 16px" }}>✅</div>
        <h1 style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "32px", color: "#fff", marginBottom: "8px" }}>¡Reserva confirmada!</h1>
        <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)", marginBottom: "16px" }}>Tu viaje a París y Roma está listo. Que lo disfrutes 🎉</p>
        <div style={{ display: "inline-block", background: "rgba(255,255,255,0.2)", borderRadius: "50px", padding: "8px 24px", fontSize: "14px", fontWeight: "800", color: "#fff", letterSpacing: "1px" }}>
          # TP-2024-8847
        </div>
      </div>

      {/* CONTENIDO */}
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "28px 20px", width: "100%" }}>

        {/* ACCIONES */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "24px" }}>
          {[
            { emoji: "📧", label: "Enviamos tu confirmación a", sub: "juan@email.com" },
            { emoji: "📄", label: "Descarga tu", sub: "Itinerario completo (PDF)" },
            { emoji: "✈️", label: "Agrega tus vuelos a", sub: "Google Calendar" },
          ].map(a => (
            <div key={a.label} style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", padding: "16px", textAlign: "center", cursor: "pointer" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "#1667E6"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "#e8edf8"}
            >
              <div style={{ fontSize: "28px", marginBottom: "8px" }}>{a.emoji}</div>
              <div style={{ fontSize: "11px", color: "#888" }}>{a.label}</div>
              <div style={{ fontSize: "12px", fontWeight: "700", color: "#1667E6", marginTop: "2px" }}>{a.sub}</div>
            </div>
          ))}
        </div>

        {/* RESUMEN */}
        <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", overflow: "hidden", marginBottom: "16px" }}>
  <div style={{ padding: "12px 18px", background: "#0D0C56", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "13px", color: "#fff" }}>Resumen de tu reserva</div>
    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>
      {tipo === "vuelo" ? "Solo vuelos" : tipo === "hotel" ? "Solo hospedaje" : "12 – 17 Jul 2026 · 2 personas"}
    </div>
  </div>
  <div style={{ padding: "16px 18px", display: "grid", gridTemplateColumns: tipo === "completo" ? "1fr 1fr" : "1fr", gap: "16px" }}>

    {/* VUELOS — visible en tipo vuelo y completo */}
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

    {/* HOTELES — visible en tipo hotel y completo */}
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
  </div>

      {/* TOTAL */}
<div style={{ background: "#1667E6", padding: "12px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
  <div style={{ fontSize: "12px", fontWeight: "700", color: "rgba(255,255,255,0.8)" }}>Total pagado</div>
  <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "20px", color: "#fff" }}>
    {tipo === "vuelo" ? "$2,080 USD" : tipo === "hotel" ? "$860 USD" : "$3,716 USD"}
  </div>
</div>

        {/* TIMELINE */}
        <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", padding: "16px 18px", marginBottom: "16px" }}>
          <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "13px", color: "#0D0C56", marginBottom: "14px" }}>¿Qué sigue?</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
  { ico: "📧", titulo: "Correo de confirmación", desc: "Revisa tu bandeja de entrada en los próximos minutos.", done: true },
  ...(tipo !== "hotel" ? [{ ico: "🎫", titulo: "Boletos de vuelo", desc: "Recibirás tus boletos por correo. Mantente al pendiente de tu check-in en línea.", done: false }] : []),
  ...(tipo !== "vuelo" ? [{ ico: "🏨", titulo: "Voucher de hotel", desc: "Tu reserva de hotel llegará por correo. Preséntala al momento del check-in.", done: false }] : []),
  { ico: "🗺", titulo: "Todo en la app", desc: "Puedes consultar tu reserva completa desde Mis viajes.", done: false },
].map((t, i, arr) => (
              <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: t.done ? "#e8fff5" : "#f5f7ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", flexShrink: 0 }}>{t.ico}</div>
                <div>
                  <div style={{ fontWeight: "700", fontSize: "12px", color: "#0D0C56", display: "flex", alignItems: "center", gap: "6px" }}>
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
    Las condiciones de cancelación dependen de la tarifa contratada en cada vuelo y hotel. Consulta los detalles específicos de tu reserva en <strong>Mis viajes</strong> o escríbenos a <strong>no-reply@tripplanner.mx</strong> si tienes dudas.
  </div>
</div>

        {/* BOTONES */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <a href="/mis-viajes" style={{ padding: "13px", backgroundColor: "#FF5C00", color: "#fff", border: "none", borderRadius: "13px", fontFamily: "sans-serif", fontWeight: "800", fontSize: "14px", cursor: "pointer", textAlign: "center", textDecoration: "none", display: "block" }}>
            Ver en Mis viajes
          </a>
          <a href="/" style={{ padding: "13px", background: "#fff", color: "#0D0C56", border: "1.5px solid #e8edf8", borderRadius: "13px", fontFamily: "sans-serif", fontWeight: "800", fontSize: "14px", cursor: "pointer", textAlign: "center", textDecoration: "none", display: "block" }}>
            Volver al inicio
          </a>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: "#0D0C56", padding: "32px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
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

