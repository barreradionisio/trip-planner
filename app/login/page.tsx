"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "../components/Logo";

export default function Login() {
  const [tab, setTab] = useState<"login" | "registro">("login");
  const [pwdValue, setPwdValue] = useState("");

  const getPwdStrength = (pwd: string) => {
    if (pwd.length === 0) return null;
    if (pwd.length < 6) return { label: "Muy corta", color: "#E24B4A", bars: 1 };
    if (pwd.length < 8) return { label: "Débil", color: "#F5A623", bars: 2 };
    if (pwd.length < 12) return { label: "Aceptable", color: "#3ED5A9", bars: 3 };
    return { label: "Segura ✓", color: "#3ED5A9", bars: 4 };
  };

  const strength = getPwdStrength(pwdValue);

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        .login-wrap {
          min-height: 100vh;
          display: flex;
          font-family: 'Montserrat', sans-serif;
          width: 100%;
          max-width: 100vw;
          overflow-x: hidden;
        }
        .login-left {
          width: 50%;
          background: #0D0C56;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 32px;
          position: relative;
          overflow: hidden;
        }
        .login-right {
          flex: 1;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 32px;
        }
        .login-mobile-header {
          display: none;
          background: #0D0C56;
          padding: 20px 20px 24px;
          align-items: center;
          justify-content: space-between;
        }
        .login-input {
          width: 100%;
          border: 1.5px solid #e8edf8;
          border-radius: 8px;
          padding: 10px 12px;
          font-size: 12px;
          outline: none;
          box-sizing: border-box;
          font-family: 'Montserrat', sans-serif;
          color: #0D0C56;
        }

        @media (max-width: 768px) {
          .login-wrap { flex-direction: column; }
          .login-left { display: none; }
          .login-right { padding: 24px 20px; align-items: flex-start; }
          .login-mobile-header { display: flex; }
        }
      `}</style>

      <div>
        {/* HEADER MÓVIL */}
        <div className="login-mobile-header">
          <Logo variant="teal" />
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "rgba(255,255,255,0.7)", textDecoration: "none", fontWeight: "600" }}>
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
  Volver
</Link>
        </div>

        <div className="login-wrap">
          {/* LADO IZQUIERDO */}
          <div className="login-left">
            <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "280px", height: "280px", borderRadius: "50%", background: "rgba(62,213,169,0.08)" }}/>
            <div style={{ position: "absolute", bottom: "-60px", left: "-60px", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(22,103,230,0.12)" }}/>
            <div style={{ position: "relative", zIndex: 1 }}>
              <Logo variant="teal" />
            </div>
            <div style={{ position: "relative", zIndex: 1 }}>
              <h2 style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "28px", color: "#fff", lineHeight: "1.3", marginBottom: "12px" }}>
                Tu próximo viaje<br/>te está <span style={{ color: "#3ED5A9" }}>esperando</span>
              </h2>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: "1.6" }}>
                Accede a tu cuenta para gestionar tus reservas, itinerarios y mucho más.
              </p>
            </div>
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", position: "relative", zIndex: 1 }}>
              © 2026 Trip Planner · no-reply@tripplanner.com.mx
            </p>
          </div>

          {/* LADO DERECHO */}
          <div className="login-right">
            <div style={{ width: "100%", maxWidth: "360px" }}>

              {/* TABS */}
              <div style={{ display: "flex", background: "#f5f7ff", borderRadius: "10px", padding: "4px", marginBottom: "28px" }}>
                <button onClick={() => setTab("login")} style={{ flex: 1, padding: "9px", border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: "700", cursor: "pointer", background: tab === "login" ? "#fff" : "transparent", color: tab === "login" ? "#0D0C56" : "#888", boxShadow: tab === "login" ? "0 1px 4px rgba(0,0,0,0.1)" : "none", transition: "all 0.2s", fontFamily: "Montserrat, sans-serif" }}>
                  Iniciar sesión
                </button>
                <button onClick={() => setTab("registro")} style={{ flex: 1, padding: "9px", border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: "700", cursor: "pointer", background: tab === "registro" ? "#fff" : "transparent", color: tab === "registro" ? "#0D0C56" : "#888", boxShadow: tab === "registro" ? "0 1px 4px rgba(0,0,0,0.1)" : "none", transition: "all 0.2s", fontFamily: "Montserrat, sans-serif" }}>
                  Crear cuenta
                </button>
              </div>

              {/* LOGIN */}
              {tab === "login" && (
                <div>
                  <h3 style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "22px", color: "#0D0C56", marginBottom: "6px" }}>Bienvenido de vuelta</h3>
                  <p style={{ fontSize: "12px", color: "#888", marginBottom: "24px" }}>Ingresa tus datos para continuar</p>
                  <div style={{ marginBottom: "14px" }}>
                    <label style={{ fontSize: "10px", fontWeight: "700", color: "#1667E6", textTransform: "uppercase", letterSpacing: "0.4px", display: "block", marginBottom: "4px" }}>Correo electrónico</label>
                    <input type="email" placeholder="correo@email.com" className="login-input" />
                  </div>
                  <div style={{ marginBottom: "20px" }}>
                    <label style={{ fontSize: "10px", fontWeight: "700", color: "#1667E6", textTransform: "uppercase", letterSpacing: "0.4px", display: "block", marginBottom: "4px" }}>Contraseña</label>
                    <input type="password" placeholder="Tu contraseña" className="login-input" />
                    <div style={{ textAlign: "right", marginTop: "6px" }}>
                      <a href="/recuperar" style={{ fontSize: "11px", color: "#1667E6", textDecoration: "none", fontWeight: "600" }}>¿Olvidaste tu contraseña?</a>
                    </div>
                  </div>
                  <button style={{ width: "100%", padding: "12px", background: "#1667E6", color: "#fff", border: "none", borderRadius: "10px", fontWeight: "800", fontSize: "13px", cursor: "pointer", marginBottom: "16px", fontFamily: "Montserrat, sans-serif" }}>Iniciar sesión</button>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                    <div style={{ flex: 1, height: "1px", background: "#e8edf8" }}/>
                    <span style={{ fontSize: "11px", color: "#aaa" }}>o continúa con</span>
                    <div style={{ flex: 1, height: "1px", background: "#e8edf8" }}/>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "16px" }}>
                    <button style={{ padding: "10px", border: "1.5px solid #e8edf8", borderRadius: "8px", background: "#fff", fontSize: "12px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", fontFamily: "Montserrat, sans-serif" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                      Google
                    </button>
                    <button style={{ padding: "10px", border: "1.5px solid #e8edf8", borderRadius: "8px", background: "#fff", fontSize: "12px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", fontFamily: "Montserrat, sans-serif" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                      Facebook
                    </button>
                  </div>
                  <div style={{ textAlign: "center", fontSize: "12px", color: "#888" }}>
                    ¿No tienes cuenta? <span onClick={() => setTab("registro")} style={{ color: "#1667E6", fontWeight: "700", cursor: "pointer" }}>Crear cuenta</span>
                  </div>
                </div>
              )}

              {/* REGISTRO */}
              {tab === "registro" && (
                <div>
                  <h3 style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "22px", color: "#0D0C56", marginBottom: "6px" }}>Crea tu cuenta</h3>
                  <p style={{ fontSize: "12px", color: "#888", marginBottom: "24px" }}>Es gratis y toma menos de 1 minuto</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "14px" }}>
                    <div>
                      <label style={{ fontSize: "10px", fontWeight: "700", color: "#1667E6", textTransform: "uppercase", letterSpacing: "0.4px", display: "block", marginBottom: "4px" }}>Nombre</label>
                      <input type="text" placeholder="Juan" className="login-input" />
                    </div>
                    <div>
                      <label style={{ fontSize: "10px", fontWeight: "700", color: "#1667E6", textTransform: "uppercase", letterSpacing: "0.4px", display: "block", marginBottom: "4px" }}>Apellido</label>
                      <input type="text" placeholder="García" className="login-input" />
                    </div>
                  </div>
                  <div style={{ marginBottom: "14px" }}>
                    <label style={{ fontSize: "10px", fontWeight: "700", color: "#1667E6", textTransform: "uppercase", letterSpacing: "0.4px", display: "block", marginBottom: "4px" }}>Correo electrónico</label>
                    <input type="email" placeholder="correo@email.com" className="login-input" />
                  </div>
                  <div style={{ marginBottom: "20px" }}>
                    <label style={{ fontSize: "10px", fontWeight: "700", color: "#1667E6", textTransform: "uppercase", letterSpacing: "0.4px", display: "block", marginBottom: "4px" }}>Contraseña</label>
                    <input type="password" placeholder="Mínimo 8 caracteres" value={pwdValue} onChange={e => setPwdValue(e.target.value)} className="login-input" />
                    {strength && (
                      <div style={{ marginTop: "6px" }}>
                        <div style={{ display: "flex", gap: "3px", marginBottom: "3px" }}>
                          {[1,2,3,4].map(i => (
                            <div key={i} style={{ flex: 1, height: "3px", borderRadius: "2px", background: i <= strength.bars ? strength.color : "#e8edf8", transition: "background 0.2s" }}/>
                          ))}
                        </div>
                        <div style={{ fontSize: "10px", color: strength.color }}>{strength.label}</div>
                      </div>
                    )}
                  </div>
                  <button style={{ width: "100%", padding: "12px", background: "#1667E6", color: "#fff", border: "none", borderRadius: "10px", fontWeight: "800", fontSize: "13px", cursor: "pointer", marginBottom: "16px", fontFamily: "Montserrat, sans-serif" }}>Crear cuenta</button>
                  <div style={{ textAlign: "center", fontSize: "11px", color: "#aaa", marginBottom: "16px" }}>
                    Al registrarte aceptas nuestros <a href="#" style={{ color: "#1667E6" }}>Términos</a> y <a href="#" style={{ color: "#1667E6" }}>Política de privacidad</a>
                  </div>
                  <div style={{ textAlign: "center", fontSize: "12px", color: "#888" }}>
                    ¿Ya tienes cuenta? <span onClick={() => setTab("login")} style={{ color: "#1667E6", fontWeight: "700", cursor: "pointer" }}>Iniciar sesión</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
