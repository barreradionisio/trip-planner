"use client";

import Logo from "./components/Logo";
import Link from "next/link";
import { useIsMobile } from "./hooks/useIsMobile";

export default function Home() {
  const isMobile = useIsMobile();

  return (
    <main>
      {/* NAV */}
      <nav style={{
        background: "#fff",
        padding: isMobile ? "12px 16px" : "12px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid #e8edf8",
        position: "relative"
      }}>
        <Link href="/"><Logo variant="color" /></Link>
        {!isMobile && (
          <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "28px", alignItems: "center" }}>
            <Link href="/destinos" style={{ fontSize: "13px", color: "#0D0C56", textDecoration: "none", fontWeight: "600", padding: "6px 14px", borderRadius: "50px" }}>Arma tu viaje</Link>
            <Link href="/solo-vuelos" style={{ fontSize: "13px", color: "#0D0C56", textDecoration: "none", fontWeight: "600", padding: "6px 14px", borderRadius: "50px" }}>Vuelos</Link>
            <Link href="/solo-hoteles" style={{ fontSize: "13px", color: "#0D0C56", textDecoration: "none", fontWeight: "600", padding: "6px 14px", borderRadius: "50px" }}>Hoteles</Link>
            <Link href="/soporte" style={{ fontSize: "13px", color: "#0D0C56", textDecoration: "none", fontWeight: "600", padding: "6px 14px", borderRadius: "50px" }}>Soporte</Link>
          </div>
        )}
        <Link href="/login" style={{ fontSize: "13px", background: "#1667E6", color: "#fff", textDecoration: "none", fontWeight: "700", padding: "8px 18px", borderRadius: "50px" }}>
          {isMobile ? "Entrar" : "Iniciar sesión"}
        </Link>
      </nav>

      {/* HERO */}
      <section style={{
        background: "linear-gradient(135deg,#0D0C56,#1667E6)",
        minHeight: isMobile ? "100vh" : "90vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: isMobile ? "40px 20px" : "40px 24px",
        textAlign: "center"
      }}>
        <h1 style={{
          fontFamily: "sans-serif",
          fontWeight: "800",
          fontSize: isMobile ? "32px" : "48px",
          color: "#fff",
          marginBottom: "16px",
          lineHeight: "1.2"
        }}>
          Arma tu viaje ideal,<br/>
          <span style={{ color: "#3ED5A9" }}>sin complicaciones</span>
        </h1>
        <p style={{
          fontSize: isMobile ? "14px" : "16px",
          color: "rgba(255,255,255,0.7)",
          marginBottom: "40px",
          maxWidth: "500px"
        }}>
          Vuelos, hoteles e itinerario en un solo lugar. Tú decides, nosotros lo armamos.
        </p>

        {/* BOTONES */}
        <div style={{
          background: "#fff",
          borderRadius: "16px",
          padding: isMobile ? "20px 16px" : "28px",
          width: "100%",
          maxWidth: isMobile ? "100%" : "700px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          display: "flex",
          flexDirection: "column",
          gap: "12px"
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
            gap: "10px"
          }}>
            <Link href="/destinos" style={{ padding: "12px", background: "#1667E6", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "700", fontSize: "14px", cursor: "pointer", textDecoration: "none", textAlign: "center", display: "block" }}>✈ Arma tu viaje</Link>
            <Link href="/solo-vuelos" style={{ padding: "12px", background: "#f5f7ff", color: "#0D0C56", border: "1.5px solid #e8edf8", borderRadius: "8px", fontWeight: "600", fontSize: "14px", cursor: "pointer", textDecoration: "none", textAlign: "center", display: "block" }}>Solo vuelos</Link>
            <Link href="/solo-hoteles" style={{ padding: "12px", background: "#f5f7ff", color: "#0D0C56", border: "1.5px solid #e8edf8", borderRadius: "8px", fontWeight: "600", fontSize: "14px", cursor: "pointer", textDecoration: "none", textAlign: "center", display: "block" }}>Solo hoteles</Link>
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section style={{ background: "#f5f7ff", padding: isMobile ? "48px 20px" : "56px 24px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: isMobile ? "24px" : "32px", color: "#0D0C56", marginBottom: "8px" }}>¿Cómo funciona?</h2>
        <p style={{ fontSize: "14px", color: "#888", marginBottom: "32px" }}>En 3 simples pasos tienes tu viaje listo</p>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
          gap: "20px",
          maxWidth: "900px",
          margin: "0 auto"
        }}>
          <div style={{ background: "#fff", borderRadius: "16px", padding: "32px 24px", border: "1.5px solid #e8edf8" }}>
            <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "#f0f5ff", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#3ED5A9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </div>
            <h3 style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "16px", color: "#0D0C56", marginBottom: "8px" }}>1. Elige tus destinos</h3>
            <p style={{ fontSize: "13px", color: "#888", lineHeight: "1.6" }}>Selecciona a dónde quieres ir, cuántos días y qué tipo de hospedaje prefieres.</p>
          </div>
          <div style={{ background: "#fff", borderRadius: "16px", padding: "32px 24px", border: "1.5px solid #e8edf8" }}>
            <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "#f0f5ff", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#3ED5A9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
            <h3 style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "16px", color: "#0D0C56", marginBottom: "8px" }}>2. Armamos tu itinerario</h3>
            <p style={{ fontSize: "13px", color: "#888", lineHeight: "1.6" }}>Te mostramos vuelos, hoteles y actividades para que elijas lo que más te gusta.</p>
          </div>
          <div style={{ background: "#fff", borderRadius: "16px", padding: "32px 24px", border: "1.5px solid #e8edf8" }}>
            <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "#f0f5ff", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#3ED5A9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
              </svg>
            </div>
            <h3 style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "16px", color: "#0D0C56", marginBottom: "8px" }}>3. Paga y listo</h3>
            <p style={{ fontSize: "13px", color: "#888", lineHeight: "1.6" }}>Confirma tu reserva y recibe todos los detalles en tu correo al instante.</p>
          </div>
        </div>
      </section>

      {/* DESTINOS POPULARES */}
      <section style={{ background: "#fff", padding: isMobile ? "48px 20px" : "56px 24px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: isMobile ? "24px" : "32px", color: "#0D0C56", marginBottom: "8px" }}>Destinos populares</h2>
        <p style={{ fontSize: "14px", color: "#888", marginBottom: "32px" }}>Los viajes más buscados por nuestros usuarios</p>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr 1fr 1fr 1fr",
          gap: "16px",
          maxWidth: "1000px",
          margin: "0 auto"
        }}>
          {[
            { ciudad: "París", pais: "Francia", emoji: "🗼", precio: "desde $850 USD" },
            { ciudad: "Roma", pais: "Italia", emoji: "🏛", precio: "desde $780 USD" },
            { ciudad: "Tokio", pais: "Japón", emoji: "⛩", precio: "desde $1,200 USD" },
            { ciudad: "Nueva York", pais: "EE.UU.", emoji: "🗽", precio: "desde $650 USD" },
          ].map((d) => (
            <Link key={d.ciudad} href="/destinos" style={{ textDecoration: "none" }}>
              <div
                style={{ borderRadius: "16px", overflow: "hidden", border: "1.5px solid #e8edf8", cursor: "pointer" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#1667E6"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#e8edf8"; }}
              >
                <div style={{ background: "linear-gradient(135deg,#0D0C56,#1667E6)", height: isMobile ? "90px" : "120px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: isMobile ? "36px" : "48px" }}>
                  {d.emoji}
                </div>
                <div style={{ padding: isMobile ? "12px" : "16px", textAlign: "left" }}>
                  <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: isMobile ? "13px" : "15px", color: "#0D0C56" }}>{d.ciudad}</div>
                  <div style={{ fontSize: "11px", color: "#888", marginBottom: "4px" }}>{d.pais}</div>
                  <div style={{ fontSize: "11px", fontWeight: "700", color: "#1667E6" }}>{d.precio}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#0D0C56", padding: isMobile ? "32px 20px" : "48px 32px", display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "center", justifyContent: "space-between", gap: isMobile ? "24px" : "0" }}>
        <div>
          <Logo variant="teal" />
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginTop: "12px" }}>© 2026 Trip Planner · no-reply@tripplanner.com.mx</p>
        </div>
        <div style={{ display: "flex", gap: isMobile ? "32px" : "48px" }}>
          <div>
            <div style={{ fontSize: "11px", fontWeight: "700", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "12px" }}>Producto</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <Link href="/destinos" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Arma tu viaje</Link>
              <Link href="/solo-vuelos" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Solo vuelos</Link>
              <Link href="/solo-hoteles" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Solo hoteles</Link>
            </div>
          </div>
          <div>
            <div style={{ fontSize: "11px", fontWeight: "700", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "12px" }}>Soporte</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <Link href="/soporte?tab=faq" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Centro de ayuda</Link>
              <Link href="/soporte?tab=chat" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Contacto</Link>
              <Link href="/privacidad" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Política de privacidad</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
