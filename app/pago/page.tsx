"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import Logo from "../components/Logo";

function PagoContent() {
  const searchParams = useSearchParams();
  const tipo = searchParams.get("tipo") || "completo";
  const router = useRouter();
  const [metodo, setMetodo] = useState("credito");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExp, setCardExp] = useState("");
  const [procesando, setProcesando] = useState(false);

  const getCardBrand = (num: string) => {
    if (num.startsWith("4")) return "VISA";
    if (/^5[1-5]/.test(num)) return "MC";
    return null;
  };

  const formatCard = (val: string) => {
    const digits = val.replace(/\D/g, "").substring(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExp = (val: string) => {
    const digits = val.replace(/\D/g, "");
    if (digits.length >= 2) return digits.substring(0, 2) + "/" + digits.substring(2, 4);
    return digits;
  };

  const brand = getCardBrand(cardNumber.replace(/\s/g, ""));
  const displayNumber = cardNumber.replace(/\D/g, "").padEnd(16, "•").replace(/(.{4})/g, "$1 ").trim();

  const IconBank = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1667E6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 7 4 7"/>
    </svg>
  );

  const IconLock = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1667E6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  );

  const IconShield = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1667E6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  );

  const IconRefresh = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1667E6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
    </svg>
  );

  const metodos = [
    { key: "credito", label: "Tarjeta de crédito", sub: "Visa · Mastercard" },
    { key: "debito", label: "Tarjeta de débito", sub: "Visa · Mastercard" },
    { key: "spei", label: "Transferencia SPEI", sub: "Bancos mexicanos" },
    { key: "applepay", label: "Apple Pay", sub: "Pago rápido y seguro" },
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Montserrat',sans-serif", background: "#f5f7ff" }}>

      {/* TOPBAR */}
      {tipo === "completo" && (
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
      {["Destinos", "Vuelos", "Hospedaje", "Itinerario", "Pasajeros", "Pago"].map((s, i) => (
        <div key={s} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <div style={{ width: "22px", height: "22px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "800", background: i < 5 ? "#3ED5A9" : "#1667E6", color: "#0D0C56" }}>{i < 5 ? "✓" : "6"}</div>
            <span style={{ fontSize: "11px", fontWeight: "600", color: i === 5 ? "#fff" : "#3ED5A9" }}>{s}</span>
          </div>
          {i < 5 && <div style={{ width: "16px", height: "1px", background: "rgba(255,255,255,0.15)" }} />}
        </div>
      ))}
    </div>
    <div style={{ width: "120px" }} />
  </div>
)}

{tipo !== "completo" && (
  <nav style={{ background: "#fff", padding: "12px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #e8edf8", position: "relative" }}>
    <Link href="/"><Logo variant="color" /></Link>
    <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "28px", alignItems: "center" }}>
      <Link href="/destinos" style={{ fontSize: "13px", color: "#0D0C56", textDecoration: "none", fontWeight: "600" }}>Arma tu viaje</Link>
      <Link href="/solo-vuelos" style={{ fontSize: "13px", color: "#0D0C56", textDecoration: "none", fontWeight: "600" }}>Vuelos</Link>
      <Link href="/solo-hoteles" style={{ fontSize: "13px", color: "#0D0C56", textDecoration: "none", fontWeight: "600" }}>Hoteles</Link>
      <Link href="/soporte" style={{ fontSize: "13px", color: "#0D0C56", textDecoration: "none", fontWeight: "600" }}>Soporte</Link>
    </div>
    <Link href="/login" style={{ fontSize: "13px", background: "#1667E6", color: "#fff", textDecoration: "none", fontWeight: "700", padding: "8px 18px", borderRadius: "50px" }}>Iniciar sesión</Link>
  </nav>
)}

      {/* BODY */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "20px", padding: "20px", flex: 1, maxWidth: "1000px", margin: "0 auto", width: "100%" }}>

        {/* IZQUIERDA */}
        <div>

          {/* DATOS DE CONTACTO */}
          <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", overflow: "hidden", marginBottom: "16px" }}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid #f0f2fa" }}>
              <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "13px", color: "#0D0C56" }}>Datos de contacto</div>
            </div>
            <div style={{ padding: "16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {[
                { label: "Nombre completo", placeholder: "Juan García López", type: "text" },
                { label: "Correo electrónico", placeholder: "juan@email.com", type: "email" },
                { label: "Teléfono", placeholder: "+52 55 1234 5678", type: "tel" },
                { label: "País de residencia", placeholder: "México", type: "text" },
                { label: "Dirección", placeholder: "Calle, número, colonia", type: "text" },
              ].map(f => (
                <div key={f.label}>
                  <div style={{ fontSize: "10px", fontWeight: "700", color: "#1667E6", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "4px" }}>{f.label}</div>
                  <input type={f.type} placeholder={f.placeholder} style={{ width: "100%", border: "1.5px solid #e8edf8", borderRadius: "8px", padding: "9px 11px", fontSize: "12px", outline: "none", boxSizing: "border-box" }} />
                </div>
              ))}
            </div>
          </div>

          {/* MÉTODO DE PAGO */}
          <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid #f0f2fa" }}>
              <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "13px", color: "#0D0C56" }}>Método de pago</div>
            </div>
            <div style={{ padding: "16px" }}>

              {/* SELECTOR MÉTODOS */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" }}>
                {metodos.map(m => (
                  <div
                    key={m.key}
                    onClick={() => setMetodo(m.key)}
                    style={{ border: `1.5px solid ${metodo === m.key ? "#1667E6" : "#e8edf8"}`, borderRadius: "12px", padding: "12px 14px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", background: metodo === m.key ? "#f0f5ff" : "#fff", transition: "all 0.2s" }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      {m.key === "applepay" ? (
                        <img src={`data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPg0KPHN2ZyB3aWR0aD0iODAwcHgiIGhlaWdodD0iODAwcHgiIHZpZXdCb3g9IjAgLTkgNTggNTgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQo8cmVjdCB4PSIwLjUiIHk9IjAuNSIgd2lkdGg9IjU3IiBoZWlnaHQ9IjM5IiByeD0iMy41IiBmaWxsPSJ3aGl0ZSIgc3Ryb2tlPSIjRjNGM0YzIi8+DQo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE3LjU3NzEgMTQuOTI2NUMxNy4xNTUzIDE1LjQzMTMgMTYuNDgwMyAxNS44Mjk0IDE1LjgwNTMgMTUuNzcyNUMxNS43MjA5IDE1LjA5IDE2LjA1MTMgMTQuMzY0OSAxNi40MzgxIDEzLjkxNzFDMTYuODU5OSAxMy4zOTgxIDE3LjU5ODIgMTMuMDI4NCAxOC4xOTU5IDEzQzE4LjI2NjIgMTMuNzEwOSAxNy45OTIgMTQuNDA3NiAxNy41NzcxIDE0LjkyNjVaTTE4LjE4ODggMTUuOTA3NkMxNy41OTQyIDE1Ljg3MyAxNy4wNTE2IDE2LjA4ODQgMTYuNjEzMyAxNi4yNjI0QzE2LjMzMTMgMTYuMzc0NCAxNi4wOTI0IDE2LjQ2OTIgMTUuOTEwNyAxNi40NjkyQzE1LjcwNjggMTYuNDY5MiAxNS40NTgxIDE2LjM2OTMgMTUuMTc4OSAxNi4yNTcxQzE0LjgxMyAxNi4xMTAyIDE0LjM5NDcgMTUuOTQyMiAxMy45NTYgMTUuOTUwMkMxMi45NTA2IDE1Ljk2NDUgMTIuMDE1NCAxNi41NDAzIDExLjUwMjEgMTcuNDU3M0MxMC40NDc0IDE5LjI5MTUgMTEuMjI3OSAyMi4wMDcxIDEyLjI0NzQgMjMuNUMxMi43NDY3IDI0LjIzOTMgMTMuMzQ0MyAyNS4wNDk4IDE0LjEzMTggMjUuMDIxM0MxNC40NzgzIDI1LjAwODEgMTQuNzI3NSAyNC45MDEyIDE0Ljk4NTQgMjQuNzkwNUMxNS4yODIzIDI0LjY2MzEgMTUuNTkwOCAyNC41MzA4IDE2LjA3MjQgMjQuNTMwOEMxNi41Mzc0IDI0LjUzMDggMTYuODMyNCAyNC42NTk3IDE3LjExNTUgMjQuNzgzNEMxNy4zODQ3IDI0LjkwMTEgMTcuNjQzMyAyNS4wMTQgMTguMDI3MSAyNS4wMDcxQzE4Ljg0MjggMjQuOTkyOSAxOS4zNTYgMjQuMjY3OCAxOS44NTUzIDIzLjUyODRDMjAuMzk0IDIyLjczNDkgMjAuNjMwNyAyMS45NjA1IDIwLjY2NjcgMjEuODQzTDIwLjY3MDkgMjEuODI5NEMyMC42NyAyMS44Mjg1IDIwLjY2MzQgMjEuODI1NCAyMC42NTE2IDIxLjgyQzIwLjQ3MTUgMjEuNzM2NiAxOS4wOTUgMjEuMDk5NSAxOS4wODE4IDE5LjM5MUMxOS4wNjg2IDE3Ljk1NyAyMC4xNzM2IDE3LjIzMDQgMjAuMzQ3NiAxNy4xMTZDMjAuMzU4MiAxNy4xMDkgMjAuMzY1MyAxNy4xMDQzIDIwLjM2ODUgMTcuMTAxOUMxOS42NjU0IDE2LjA0OTggMTguNTY4NSAxNS45MzYgMTguMTg4OCAxNS45MDc2Wk0yMy44MzQ5IDI0LjkyODlWMTMuODQ2SDI3Ljk0ODJDMzAuMDcxNyAxMy44NDYgMzEuNTU1MyAxNS4zMjQ2IDMxLjU1NTMgMTcuNDg1OEMzMS41NTUzIDE5LjY0NjkgMzAuMDQzNSAyMS4xMzk4IDI3Ljg5MiAyMS4xMzk4SDI1LjUzNjVWMjQuOTI4OUgyMy44MzQ5Wk0yNS41MzY1IDE1LjI5NjJIMjcuNDk4MkMyOC45NzQ4IDE1LjI5NjIgMjkuODE4NSAxNi4wOTI0IDI5LjgxODUgMTcuNDkyOUMyOS44MTg1IDE4Ljg5MzQgMjguOTc0OCAxOS42OTY3IDI3LjQ5MTIgMTkuNjk2N0gyNS41MzY1VjE1LjI5NjJaTTM3LjE3MzIgMjMuNTk5NUMzNi43MjMyIDI0LjQ2NjggMzUuNzMxOCAyNS4wMTQyIDM0LjY2MzEgMjUuMDE0MkMzMy4wODEgMjUuMDE0MiAzMS45NzcxIDI0LjA2MTYgMzEuOTc3MSAyMi42MjU2QzMxLjk3NzEgMjEuMjAzOCAzMy4wNDU5IDIwLjM4NjMgMzUuMDIxNyAyMC4yNjU0TDM3LjE0NTEgMjAuMTM3NFYxOS41MjYxQzM3LjE0NTEgMTguNjIzMiAzNi41NjE1IDE4LjEzMjcgMzUuNTIwOSAxOC4xMzI3QzM0LjY2MzEgMTguMTMyNyAzNC4wMzczIDE4LjU4MDYgMzMuOTEwNyAxOS4yNjNIMzIuMzc3OUMzMi40MjcxIDE3LjgyNyAzMy43NjMxIDE2Ljc4MiAzNS41NzAxIDE2Ljc4MkMzNy41MTc3IDE2Ljc4MiAzOC43ODM0IDE3LjgxMjggMzguNzgzNCAxOS40MTIzVjI0LjkyODlIMzcuMjA4NFYyMy41OTk1SDM3LjE3MzJaTTM1LjEyMDEgMjMuNjk5MUMzNC4yMTMxIDIzLjY5OTEgMzMuNjM2NSAyMy4yNTgzIDMzLjYzNjUgMjIuNTgyOUMzMy42MzY1IDIxLjg4NjMgMzQuMTkyIDIxLjQ4MSAzNS4yNTM3IDIxLjQxNzFMMzcuMTQ1MSAyMS4yOTYyVjIxLjkyMThDMzcuMTQ1MSAyMi45NTk3IDM2LjI3MzIgMjMuNjk5MSAzNS4xMjAxIDIzLjY5OTFaTTQ0LjAwNzYgMjUuMzYyNkM0My4zMjU2IDI3LjMwMzMgNDIuNTQ1MSAyNy45NDMxIDQwLjg4NTcgMjcuOTQzMUM0MC43NTkyIDI3Ljk0MzEgNDAuMzM3MyAyNy45Mjg5IDQwLjIzODggMjcuOTAwNVYyNi41NzExQzQwLjM0NDMgMjYuNTg1MyA0MC42MDQ1IDI2LjU5OTUgNDAuNzM4MSAyNi41OTk1QzQxLjQ5MDQgMjYuNTk5NSA0MS45MTIzIDI2LjI3OTYgNDIuMTcyNCAyNS40NDc5TDQyLjMyNzEgMjQuOTU3M0wzOS40NDQzIDE2Ljg4ODZINDEuMjIzMkw0My4yMjcxIDIzLjQzNkg0My4yNjIzTDQ1LjI2NjIgMTYuODg4Nkg0Ni45OTU5TDQ0LjAwNzYgMjUuMzYyNloiIGZpbGw9IiMwMDAwMDAiLz4NCjwvc3ZnPg==`} style={{height:"28px", width:"auto"}} alt="Apple Pay"/>
                      ) : (m.key === "credito" || m.key === "debito") ? (
                        <div style={{ display: "flex", gap: "4px" }}>
                          <img src={`data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iODAwIiB3aWR0aD0iMTIwMCIgdmlld0JveD0iLTc0LjcgLTQwLjIwNCA2NDcuNCAyNDEuMjI0Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgeDE9IjAiIHkxPSIwIiB4Mj0iMSIgeTI9IjAiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBncmFkaWVudFRyYW5zZm9ybT0ic2NhbGUoODkuNzI3OTMgLTg5LjcyNzkzKSByb3RhdGUoLTIwLjIxOCAuOTY2IC0uNDU3KSIgc3ByZWFkTWV0aG9kPSJwYWQiIGlkPSJiIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMyMjIzNTciLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMyNTRhYTUiLz48L2xpbmVhckdyYWRpZW50PjxjbGlwUGF0aCBjbGlwUGF0aFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgaWQ9ImEiPjxwYXRoIGQ9Ik00MTMuNzQyIDkwLjQzNWMtLjA1Ny00LjQ5NCA0LjAwNS03LjAwMiA3LjA2NS04LjQ5MyAzLjE0NC0xLjUzIDQuMi0yLjUxMSA0LjE4OC0zLjg3OS0uMDI0LTIuMDk0LTIuNTA4LTMuMDE4LTQuODMzLTMuMDU0LTQuMDU2LS4wNjMtNi40MTQgMS4wOTUtOC4yODkgMS45NzFsLTEuNDYxLTYuODM3YzEuODgxLS44NjcgNS4zNjQtMS42MjMgOC45NzYtMS42NTYgOC40NzggMCAxNC4wMjUgNC4xODUgMTQuMDU1IDEwLjY3NC4wMzMgOC4yMzUtMTEuMzkxIDguNjkxLTExLjMxMyAxMi4zNzIuMDI3IDEuMTE2IDEuMDkyIDIuMzA3IDMuNDI2IDIuNjEgMS4xNTUuMTUzIDQuMzQ0LjI3IDcuOTU5LTEuMzk1bDEuNDE5IDYuNjE1Yy0xLjk0NC43MDgtNC40NDMgMS4zODYtNy41NTQgMS4zODYtNy45OCAwLTEzLjU5My00LjI0Mi0xMy42MzgtMTAuMzE0bTM0LjgyNyA5Ljc0NGMtMS41NDggMC0yLjg1My0uOTAzLTMuNDM1LTIuMjg5bC0xMi4xMTEtMjguOTE3aDguNDcybDEuNjg2IDQuNjU5aDEwLjM1M2wuOTc4LTQuNjU5aDcuNDY3bC02LjUxNiAzMS4yMDZoLTYuODk0bTEuMTg1LTguNDNsMi40NDUtMTEuNzE4aC02LjY5Nmw0LjI1MSAxMS43MThtLTQ2LjI4NCA4LjQzbC02LjY3OC0zMS4yMDZoOC4wNzNsNi42NzUgMzEuMjA2aC04LjA3bS0xMS45NDMgMGwtOC40MDMtMjEuMjQtMy4zOTkgMTguMDZjLS4zOTkgMi4wMTYtMS45NzQgMy4xOC0zLjcyMyAzLjE4aC0xMy43MzdsLS4xOTItLjkwNmMyLjgyLS42MTIgNi4wMjQtMS41OTkgNy45NjUtMi42NTUgMS4xODgtLjY0NSAxLjUyNy0xLjIwOSAxLjkxNy0yLjc0Mmw2LjQzOC0yNC45MDNoOC41MzJsMTMuMDggMzEuMjA2aC04LjQ3OCIvPjwvY2xpcFBhdGg+PC9kZWZzPjxnIGNsaXAtcGF0aD0idXJsKCNhKSIgdHJhbnNmb3JtPSJtYXRyaXgoNC45ODQ2OSAwIDAgLTQuOTg0NjkgLTE4MDQuODIgNTAyLjIwMikiPjxwYXRoIGQ9Ik0wIDBsOTguNDM3IDM2LjI1MiAyMi4zOTQtNjAuODA5LTk4LjQzNi0zNi4yNTIiIGZpbGw9InVybCgjYikiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDM1MS42MTEgOTYuODk2KSIvPjwvZz48L3N2Zz4=`} style={{height:"20px", width:"auto"}} alt="Visa"/>
                          <img src={`data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iODAwIiB3aWR0aD0iMTIwMCIgaWQ9InN2Zzg5NSIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSItOTYgLTk4LjkwOCA4MzIgNTkzLjQ0OCI+PGRlZnMgaWQ9ImRlZnM4NzkiPjxzdHlsZSBpZD0ic3R5bGU4NzciIHR5cGU9InRleHQvY3NzIj4uZXtmaWxsOiNmNzllMWJ9PC9zdHlsZT48L2RlZnM+PHBhdGggaWQ9InJlY3Q4ODciIGRpc3BsYXk9ImlubGluZSIgZmlsbD0iI2ZmNWYwMCIgc3Ryb2tlLXdpZHRoPSI1LjQ5NCIgZD0iTTIyNC44MzMgNDIuMjk4aDE5MC40MTZ2MzExLjAwNUgyMjQuODMzeiIvPjxwYXRoIGlkPSJwYXRoODg5IiBkPSJNMjQ0LjQ0NiAxOTcuODI4YTE5Ny40NDggMTk3LjQ0OCAwIDAxNzUuNTQtMTU1LjQ3NSAxOTcuNzc3IDE5Ny43NzcgMCAxMDAgMzExLjAwNCAxOTcuNDQ4IDE5Ny40NDggMCAwMS03NS41NC0xNTUuNTN6IiBmaWxsPSIjZWIwMDFiIiBzdHJva2Utd2lkdGg9IjUuNDk0Ii8+PHBhdGggaWQ9InBhdGg4OTEiIGQ9Ik02MjEuMTAxIDMyMC4zOTR2LTYuMzcyaDIuNzQ3di0xLjMxOWgtNi41Mzd2MS4zMTloMi41ODJ2Ni4zNzN6bTEyLjY5MSAwdi03LjY5aC0xLjk3OGwtMi4zMDcgNS40OTMtMi4zMDgtNS40OTRoLTEuOTc3djcuNjkxaDEuNDI4di01LjgyM2wyLjE0MyA1aDEuNDgzbDIuMTQzLTV2NS44MjN6IiBjbGFzcz0iZSIgZmlsbD0iI2Y3OWUxYiIgc3Ryb2tlLXdpZHRoPSI1LjQ5NCIvPjxwYXRoIGlkPSJwYXRoODkzIiBkPSJNNjQwIDE5Ny44MjhhMTk3Ljc3NyAxOTcuNzc3IDAgMDEtMzIwLjAxNSAxNTUuNDc0IDE5Ny43NzcgMTk3Ljc3NyAwIDAwMC0zMTEuMDA0QTE5Ny43NzcgMTk3Ljc3NyAwIDAxNjQwIDE5Ny43NzN6IiBjbGFzcz0iZSIgZmlsbD0iI2Y3OWUxYiIgc3Ryb2tlLXdpZHRoPSI1LjQ5NCIvPjwvc3ZnPg==`} style={{height:"20px", width:"auto"}} alt="Mastercard"/>
                        </div>
                      ) : m.key === "spei" ? (
                        <img src={`data:image/svg+xml;base64,PHN2ZyBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtcnVsZT0iZXZlbm9kZCIgaGVpZ2h0PSI4MzMiIGltYWdlLXJlbmRlcmluZz0ib3B0aW1pemVRdWFsaXR5IiBzaGFwZS1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgdmlld0JveD0iMTExLjg0IDQ4Ljg1IDc4NzQuMDMgMjY1OS41NSIgd2lkdGg9IjI1MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0ibTE1OTAuNDUgODUzLjI4YzIzOS44LTEyLjIxIDQ2Ny42MS0zMC41MyA3MDMuODItNDEuMDQtNjcuOS00OTguOTgtMzA4Ljg4LTc2My4zOS0xMDM3LjYzLTc2My4zOS03MTUuNTkgMC0xMDI2LjMxIDM2Ny44NS0xMDY3LjM1IDcwNS44Mi00Ni4xOCAzODAuMzMgMjQwLjExIDYyMy45NSA2OTcuODMgNzU3LjA0IDM5NS4zNSAxMTUuODQgNzI2LjY3IDE5Ni4zNCA3MzYuOTkgMzkwLjUgMTEuMTEgMjA4LjgxLTIyNy40MyAzMjYuMTUtMzQ1LjU5IDMyNi4xNS0yMTEuMTggMC00NDAuOTItMjMzLjkzLTQ2OC40MS00NDguMzQtMjI5Ljg0IDE4LjI0LTQ2OC40MyAxOS4yMi02OTguMjcgMzcuNDYgMCA1ODIuNDQgNDczLjM3IDg5MC45MiAxMTAxLjAxIDg5MC45MiA1ODUuMyAwIDExNjAuMTMtMjQ2LjEzIDExNjAuMTMtODc1LjU3IDAtNzY0LjIxLTgyNi44Ny03NjMuOTgtMTM2OC4wOC05NTIuMTktMTg5LjI1LTEwNC40OC05MC41Ni0zMzMuMDggODcuNTYtMzUzLjE2IDM1OS42MS00My42NSA0MjEuMzUgMTYwLjkzIDQ5Ny45OCAzMjUuOHptMjI1My4xMi03NDIuNTRjNDY5LjAxIDAgODAxLjExIDI1OC40MyA4MDEuMTEgNzgyLjMxIDAgNDgwLjEyLTMzMC40MiA3ODYuNjEtODEwLjA1IDc4Ni42MWgtNTk5LjAzdjkxOS4zOGMwIDYzLjE2IDAgNjMuMTYtNTUuNzggNjMuMTZoLTYyNC45OGMtNzguMjUgMC03OC4yNSAwLTc4LjI1LTU4Ljc3di0yMzgzLjU0YzAtMTA5LjE1IDAtMTA5LjE1IDEwOS44My0xMDkuMTV6bS01NDcuNzMgMTA4My4xYy00NC4zMSAwLTYwLjI0LTE4LjE5LTYwLjI0LTQ1LjY5di00OTMuODljMC0zNi4yMiAyOS41Ni01Ni41NyA1Ni41Ny01Ni41N2gyNjIuNThjMjI2LjAxIDMzLjM1IDMwOC43NCAxNTUuODEgMzA4Ljc0IDMxNS40OCAwIDIyOC40Ni0yMDMuNjUgMjgwLjY3LTM4MC41NCAyODAuNjdoLTE4Ny4xMnoiIGZpbGw9IiMzNDMwODQiLz48cGF0aCBkPSJtNDgxNS4yNiAxODEuM2MwLTMyIDIyLjk3LTU2LjQ5IDQ4LjI5LTU2LjQ5aDE5OTIuMTljNDMuOTYtMS45OSA0OC43NSAxNi4wOSA0OC43NSAzMy4ydjQ1NS4yNmMyLjA1IDIxLjEzLTE1LjM0IDMwLjc5LTMwLjc5IDMwLjc5aC0xMjYxLjQ3Yy0yNi4zNiAwLTM1LjA4IDI3LjAyLTM1LjA4IDU2LjU0djMwNy4zOWMwIDMzLjE1IDIzLjY0IDYzLjQ2IDYzLjQ2IDYzLjQ2aDExMTYuMTZsMjUuNDcgMjUuNDd2NDI2Ljg3Yy0xMi43NiAxOC4zMS0yNS41MiAzNi42MS0zOC4yOCA1NC45M2gtMTEyNC43NWMtMjYuMDIgMC00Mi4wNyAxNi4wNi00Mi4wNyA0Mi4wN3Y0MDkuNDljMCAyMi41OCAyNi45MSA0Ny43MiA1OC4zNyA0Ny43MmgxMjQzLjUxYzE2LjQ0IDAgMjUuNDYgMTUuNjUgMjUuNDYgMjUuNDZ2NDk3LjM0YzAgMTEuNy0xMy4yMyAyNC40OC0yNC40OCAyNC40OGgtMjA0NC40Yy0xMC44NCAwLTIwLjM0LTEwLjctMjAuMzQtMjAuMzR2LTI0MjMuNjN6IiBmaWxsPSIjZmY5NDAwIi8+PHBhdGggZD0ibTc5ODUuODYgMTUzNS4yNHYxMDkwLjA0aC03MDkuMzljLTEwLjg0IDAtMjAuMzQtMTAuNy0yMC4zNC0yMC4zNHYtOTczLjhjMC0yNi4wOCAxOC4wMi00MS4wOSAzMS40OC00MS4wOWgyMDMuNjZjMjAuNDEgMCAyNS41NyAxNy40NiAyNS41NyAzMi44N3Y0NTUuMDhjMCA1Ny40OSA0OC4yIDMyLjcyIDczLjk4IDAgMTMxLjY5LTE4MC45MiAyNjMuMzctMzYxLjg0IDM5NS4wNS01NDIuNzZ6IiBmaWxsPSIjMzQzMDg0Ii8+PHBhdGggZD0ibTcyMjUuMTIgMTgxLjNjMC0zMiAyMi45Ny01Ni40OSA0OC4yOS01Ni40OWg2NTEuMTdjNDUuMTEgMCA2MS4yOCAyNy42MiA2MS4yOCA0OS40MnY5MzAuNzhsLTM5OC43LTU1Ny45NGMtOC42MS0xMi4wNy0yOC4zMS0xMS4yOS0yOC4zMSAxMy43djQwMS44NWMwIDIyLjM4LTExLjA2IDY0Ljg0LTQyLjkzIDY0Ljg0aC0yNTkuODJjLTE0LjE2IDAtMzEuMDEtMzEuOTUtMzEuMDEtNTAuMjN2LTc5NS45M3oiIGZpbGw9IiNmZjk0MDAiLz48L3N2Zz4=`} style={{height:"12px", width:"auto"}} alt="SPEI"/>
                      ) : (
                        <IconBank />
                      )}
                      <div>
                        <div style={{ fontWeight: "700", fontSize: "12px", color: "#0D0C56" }}>{m.label}</div>
                        <div style={{ fontSize: "10px", color: "#888" }}>{m.sub}</div>
                      </div>
                    </div>
                    <div style={{ width: "16px", height: "16px", borderRadius: "50%", border: `2px solid ${metodo === m.key ? "#1667E6" : "#e8edf8"}`, background: metodo === m.key ? "#1667E6" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {metodo === m.key && <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#fff" }} />}
                    </div>
                  </div>
                ))}
              </div>

              {/* PANEL TARJETA CRÉDITO/DÉBITO */}
              {(metodo === "credito" || metodo === "debito") && (
                <div>
                  {/* TARJETA VISUAL */}
                  <div style={{ background: metodo === "credito" ? "linear-gradient(135deg,#0D0C56,#1667E6)" : "linear-gradient(135deg,#085041,#3ED5A9)", borderRadius: "14px", padding: "20px", color: "#fff", marginBottom: "16px", position: "relative", overflow: "hidden", height: "170px" }}>
                    <div style={{ position: "absolute", top: "-30px", right: "-30px", width: "120px", height: "120px", borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
                    <div style={{ position: "absolute", top: "16px", right: "16px", zIndex: 2 }}>
                      {brand === "VISA" ? (
                        <img src={`data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iODAwIiB3aWR0aD0iMTIwMCIgdmlld0JveD0iLTc0LjcgLTQwLjIwNCA2NDcuNCAyNDEuMjI0Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgeDE9IjAiIHkxPSIwIiB4Mj0iMSIgeTI9IjAiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBncmFkaWVudFRyYW5zZm9ybT0ic2NhbGUoODkuNzI3OTMgLTg5LjcyNzkzKSByb3RhdGUoLTIwLjIxOCAuOTY2IC0uNDU3KSIgc3ByZWFkTWV0aG9kPSJwYWQiIGlkPSJiIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMyMjIzNTciLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMyNTRhYTUiLz48L2xpbmVhckdyYWRpZW50PjxjbGlwUGF0aCBjbGlwUGF0aFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgaWQ9ImEiPjxwYXRoIGQ9Ik00MTMuNzQyIDkwLjQzNWMtLjA1Ny00LjQ5NCA0LjAwNS03LjAwMiA3LjA2NS04LjQ5MyAzLjE0NC0xLjUzIDQuMi0yLjUxMSA0LjE4OC0zLjg3OS0uMDI0LTIuMDk0LTIuNTA4LTMuMDE4LTQuODMzLTMuMDU0LTQuMDU2LS4wNjMtNi40MTQgMS4wOTUtOC4yODkgMS45NzFsLTEuNDYxLTYuODM3YzEuODgxLS44NjcgNS4zNjQtMS42MjMgOC45NzYtMS42NTYgOC40NzggMCAxNC4wMjUgNC4xODUgMTQuMDU1IDEwLjY3NC4wMzMgOC4yMzUtMTEuMzkxIDguNjkxLTExLjMxMyAxMi4zNzIuMDI3IDEuMTE2IDEuMDkyIDIuMzA3IDMuNDI2IDIuNjEgMS4xNTUuMTUzIDQuMzQ0LjI3IDcuOTU5LTEuMzk1bDEuNDE5IDYuNjE1Yy0xLjk0NC43MDgtNC40NDMgMS4zODYtNy41NTQgMS4zODYtNy45OCAwLTEzLjU5My00LjI0Mi0xMy42MzgtMTAuMzE0bTM0LjgyNyA5Ljc0NGMtMS41NDggMC0yLjg1My0uOTAzLTMuNDM1LTIuMjg5bC0xMi4xMTEtMjguOTE3aDguNDcybDEuNjg2IDQuNjU5aDEwLjM1M2wuOTc4LTQuNjU5aDcuNDY3bC02LjUxNiAzMS4yMDZoLTYuODk0bTEuMTg1LTguNDNsMi40NDUtMTEuNzE4aC02LjY5Nmw0LjI1MSAxMS43MThtLTQ2LjI4NCA4LjQzbC02LjY3OC0zMS4yMDZoOC4wNzNsNi42NzUgMzEuMjA2aC04LjA3bS0xMS45NDMgMGwtOC40MDMtMjEuMjQtMy4zOTkgMTguMDZjLS4zOTkgMi4wMTYtMS45NzQgMy4xOC0zLjcyMyAzLjE4aC0xMy43MzdsLS4xOTItLjkwNmMyLjgyLS42MTIgNi4wMjQtMS41OTkgNy45NjUtMi42NTUgMS4xODgtLjY0NSAxLjUyNy0xLjIwOSAxLjkxNy0yLjc0Mmw2LjQzOC0yNC45MDNoOC41MzJsMTMuMDggMzEuMjA2aC04LjQ3OCIvPjwvY2xpcFBhdGg+PC9kZWZzPjxnIGNsaXAtcGF0aD0idXJsKCNhKSIgdHJhbnNmb3JtPSJtYXRyaXgoNC45ODQ2OSAwIDAgLTQuOTg0NjkgLTE4MDQuODIgNTAyLjIwMikiPjxwYXRoIGQ9Ik0wIDBsOTguNDM3IDM2LjI1MiAyMi4zOTQtNjAuODA5LTk4LjQzNi0zNi4yNTIiIGZpbGw9InVybCgjYikiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDM1MS42MTEgOTYuODk2KSIvPjwvZz48L3N2Zz4=`} style={{height:"24px", width:"auto", filter: "brightness(0) invert(1)"}} alt="Visa"/>
                      ) : brand === "MC" ? (
                        <img src={`data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iODAwIiB3aWR0aD0iMTIwMCIgaWQ9InN2Zzg5NSIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSItOTYgLTk4LjkwOCA4MzIgNTkzLjQ0OCI+PGRlZnMgaWQ9ImRlZnM4NzkiPjxzdHlsZSBpZD0ic3R5bGU4NzciIHR5cGU9InRleHQvY3NzIj4uZXtmaWxsOiNmNzllMWJ9PC9zdHlsZT48L2RlZnM+PHBhdGggaWQ9InJlY3Q4ODciIGRpc3BsYXk9ImlubGluZSIgZmlsbD0iI2ZmNWYwMCIgc3Ryb2tlLXdpZHRoPSI1LjQ5NCIgZD0iTTIyNC44MzMgNDIuMjk4aDE5MC40MTZ2MzExLjAwNUgyMjQuODMzeiIvPjxwYXRoIGlkPSJwYXRoODg5IiBkPSJNMjQ0LjQ0NiAxOTcuODI4YTE5Ny40NDggMTk3LjQ0OCAwIDAxNzUuNTQtMTU1LjQ3NSAxOTcuNzc3IDE5Ny43NzcgMCAxMDAgMzExLjAwNCAxOTcuNDQ4IDE5Ny40NDggMCAwMS03NS41NC0xNTUuNTN6IiBmaWxsPSIjZWIwMDFiIiBzdHJva2Utd2lkdGg9IjUuNDk0Ii8+PHBhdGggaWQ9InBhdGg4OTEiIGQ9Ik02MjEuMTAxIDMyMC4zOTR2LTYuMzcyaDIuNzQ3di0xLjMxOWgtNi41Mzd2MS4zMTloMi41ODJ2Ni4zNzN6bTEyLjY5MSAwdi03LjY5aC0xLjk3OGwtMi4zMDcgNS40OTMtMi4zMDgtNS40OTRoLTEuOTc3djcuNjkxaDEuNDI4di01LjgyM2wyLjE0MyA1aDEuNDgzbDIuMTQzLTV2NS44MjN6IiBjbGFzcz0iZSIgZmlsbD0iI2Y3OWUxYiIgc3Ryb2tlLXdpZHRoPSI1LjQ5NCIvPjxwYXRoIGlkPSJwYXRoODkzIiBkPSJNNjQwIDE5Ny44MjhhMTk3Ljc3NyAxOTcuNzc3IDAgMDEtMzIwLjAxNSAxNTUuNDc0IDE5Ny43NzcgMTk3Ljc3NyAwIDAwMC0zMTEuMDA0QTE5Ny43NzcgMTk3Ljc3NyAwIDAxNjQwIDE5Ny43NzN6IiBjbGFzcz0iZSIgZmlsbD0iI2Y3OWUxYiIgc3Ryb2tlLXdpZHRoPSI1LjQ5NCIvPjwvc3ZnPg==`} style={{height:"30px", width:"auto"}} alt="Mastercard"/>
                      ) : (
                        <div style={{ display: "flex", gap: "4px", opacity: 0.5 }}>
                          <img src={`data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iODAwIiB3aWR0aD0iMTIwMCIgdmlld0JveD0iLTc0LjcgLTQwLjIwNCA2NDcuNCAyNDEuMjI0Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgeDE9IjAiIHkxPSIwIiB4Mj0iMSIgeTI9IjAiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBncmFkaWVudFRyYW5zZm9ybT0ic2NhbGUoODkuNzI3OTMgLTg5LjcyNzkzKSByb3RhdGUoLTIwLjIxOCAuOTY2IC0uNDU3KSIgc3ByZWFkTWV0aG9kPSJwYWQiIGlkPSJiIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMyMjIzNTciLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMyNTRhYTUiLz48L2xpbmVhckdyYWRpZW50PjxjbGlwUGF0aCBjbGlwUGF0aFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgaWQ9ImEiPjxwYXRoIGQ9Ik00MTMuNzQyIDkwLjQzNWMtLjA1Ny00LjQ5NCA0LjAwNS03LjAwMiA3LjA2NS04LjQ5MyAzLjE0NC0xLjUzIDQuMi0yLjUxMSA0LjE4OC0zLjg3OS0uMDI0LTIuMDk0LTIuNTA4LTMuMDE4LTQuODMzLTMuMDU0LTQuMDU2LS4wNjMtNi40MTQgMS4wOTUtOC4yODkgMS45NzFsLTEuNDYxLTYuODM3YzEuODgxLS44NjcgNS4zNjQtMS42MjMgOC45NzYtMS42NTYgOC40NzggMCAxNC4wMjUgNC4xODUgMTQuMDU1IDEwLjY3NC4wMzMgOC4yMzUtMTEuMzkxIDguNjkxLTExLjMxMyAxMi4zNzIuMDI3IDEuMTE2IDEuMDkyIDIuMzA3IDMuNDI2IDIuNjEgMS4xNTUuMTUzIDQuMzQ0LjI3IDcuOTU5LTEuMzk1bDEuNDE5IDYuNjE1Yy0xLjk0NC43MDgtNC40NDMgMS4zODYtNy41NTQgMS4zODYtNy45OCAwLTEzLjU5My00LjI0Mi0xMy42MzgtMTAuMzE0bTM0LjgyNyA5Ljc0NGMtMS41NDggMC0yLjg1My0uOTAzLTMuNDM1LTIuMjg5bC0xMi4xMTEtMjguOTE3aDguNDcybDEuNjg2IDQuNjU5aDEwLjM1M2wuOTc4LTQuNjU5aDcuNDY3bC02LjUxNiAzMS4yMDZoLTYuODk0bTEuMTg1LTguNDNsMi40NDUtMTEuNzE4aC02LjY5Nmw0LjI1MSAxMS43MThtLTQ2LjI4NCA4LjQzbC02LjY3OC0zMS4yMDZoOC4wNzNsNi42NzUgMzEuMjA2aC04LjA3bS0xMS45NDMgMGwtOC40MDMtMjEuMjQtMy4zOTkgMTguMDZjLS4zOTkgMi4wMTYtMS45NzQgMy4xOC0zLjcyMyAzLjE4aC0xMy43MzdsLS4xOTItLjkwNmMyLjgyLS42MTIgNi4wMjQtMS41OTkgNy45NjUtMi42NTUgMS4xODgtLjY0NSAxLjUyNy0xLjIwOSAxLjkxNy0yLjc0Mmw2LjQzOC0yNC45MDNoOC41MzJsMTMuMDggMzEuMjA2aC04LjQ3OCIvPjwvY2xpcFBhdGg+PC9kZWZzPjxnIGNsaXAtcGF0aD0idXJsKCNhKSIgdHJhbnNmb3JtPSJtYXRyaXgoNC45ODQ2OSAwIDAgLTQuOTg0NjkgLTE4MDQuODIgNTAyLjIwMikiPjxwYXRoIGQ9Ik0wIDBsOTguNDM3IDM2LjI1MiAyMi4zOTQtNjAuODA5LTk4LjQzNi0zNi4yNTIiIGZpbGw9InVybCgjYikiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDM1MS42MTEgOTYuODk2KSIvPjwvZz48L3N2Zz4=`} style={{height:"20px", width:"auto", filter: "brightness(0) invert(1)"}} alt="Visa"/>
                          <img src={`data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iODAwIiB3aWR0aD0iMTIwMCIgaWQ9InN2Zzg5NSIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSItOTYgLTk4LjkwOCA4MzIgNTkzLjQ0OCI+PGRlZnMgaWQ9ImRlZnM4NzkiPjxzdHlsZSBpZD0ic3R5bGU4NzciIHR5cGU9InRleHQvY3NzIj4uZXtmaWxsOiNmNzllMWJ9PC9zdHlsZT48L2RlZnM+PHBhdGggaWQ9InJlY3Q4ODciIGRpc3BsYXk9ImlubGluZSIgZmlsbD0iI2ZmNWYwMCIgc3Ryb2tlLXdpZHRoPSI1LjQ5NCIgZD0iTTIyNC44MzMgNDIuMjk4aDE5MC40MTZ2MzExLjAwNUgyMjQuODMzeiIvPjxwYXRoIGlkPSJwYXRoODg5IiBkPSJNMjQ0LjQ0NiAxOTcuODI4YTE5Ny40NDggMTk3LjQ0OCAwIDAxNzUuNTQtMTU1LjQ3NSAxOTcuNzc3IDE5Ny43NzcgMCAxMDAgMzExLjAwNCAxOTcuNDQ4IDE5Ny40NDggMCAwMS03NS41NC0xNTUuNTN6IiBmaWxsPSIjZWIwMDFiIiBzdHJva2Utd2lkdGg9IjUuNDk0Ii8+PHBhdGggaWQ9InBhdGg4OTEiIGQ9Ik02MjEuMTAxIDMyMC4zOTR2LTYuMzcyaDIuNzQ3di0xLjMxOWgtNi41Mzd2MS4zMTloMi41ODJ2Ni4zNzN6bTEyLjY5MSAwdi03LjY5aC0xLjk3OGwtMi4zMDcgNS40OTMtMi4zMDgtNS40OTRoLTEuOTc3djcuNjkxaDEuNDI4di01LjgyM2wyLjE0MyA1aDEuNDgzbDIuMTQzLTV2NS44MjN6IiBjbGFzcz0iZSIgZmlsbD0iI2Y3OWUxYiIgc3Ryb2tlLXdpZHRoPSI1LjQ5NCIvPjxwYXRoIGlkPSJwYXRoODkzIiBkPSJNNjQwIDE5Ny44MjhhMTk3Ljc3NyAxOTcuNzc3IDAgMDEtMzIwLjAxNSAxNTUuNDc0IDE5Ny43NzcgMTk3Ljc3NyAwIDAwMC0zMTEuMDA0QTE5Ny43NzcgMTk3Ljc3NyAwIDAxNjQwIDE5Ny43NzN6IiBjbGFzcz0iZSIgZmlsbD0iI2Y3OWUxYiIgc3Ryb2tlLXdpZHRoPSI1LjQ5NCIvPjwvc3ZnPg==`} style={{height:"24px", width:"auto"}} alt="Mastercard"/>
                        </div>
                      )}
                    </div>
                    <div style={{ position: "absolute", bottom: "52px", left: "20px", fontFamily: "monospace", fontWeight: "700", fontSize: "16px", letterSpacing: "3px", zIndex: 2 }}>{displayNumber}</div>
                    <div style={{ position: "absolute", bottom: "16px", left: "20px", right: "20px", display: "flex", justifyContent: "space-between", zIndex: 2 }}>
                      <div>
                        <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", marginBottom: "2px" }}>Titular</div>
                        <div style={{ fontWeight: "700", fontSize: "12px" }}>{cardName.toUpperCase() || "NOMBRE APELLIDO"}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", marginBottom: "2px" }}>Vence</div>
                        <div style={{ fontWeight: "700", fontSize: "12px" }}>{cardExp || "MM/AA"}</div>
                      </div>
                    </div>
                  </div>

                  {/* CAMPOS */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <div style={{ gridColumn: "1/-1" }}>
                      <div style={{ fontSize: "10px", fontWeight: "700", color: "#1667E6", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "4px" }}>Número de tarjeta</div>
                      <input
                        type="text" placeholder="1234 5678 9012 3456" maxLength={19}
                        value={cardNumber}
                        onChange={e => setCardNumber(formatCard(e.target.value))}
                        style={{ width: "100%", border: "1.5px solid #e8edf8", borderRadius: "8px", padding: "9px 11px", fontSize: "12px", outline: "none", boxSizing: "border-box" }}
                      />
                    </div>
                    <div style={{ gridColumn: "1/-1" }}>
                      <div style={{ fontSize: "10px", fontWeight: "700", color: "#1667E6", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "4px" }}>Nombre en la tarjeta</div>
                      <input
                        type="text" placeholder="Como aparece en la tarjeta"
                        value={cardName}
                        onChange={e => setCardName(e.target.value)}
                        style={{ width: "100%", border: "1.5px solid #e8edf8", borderRadius: "8px", padding: "9px 11px", fontSize: "12px", outline: "none", boxSizing: "border-box" }}
                      />
                    </div>
                    <div>
                      <div style={{ fontSize: "10px", fontWeight: "700", color: "#1667E6", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "4px" }}>Vencimiento</div>
                      <input
                        type="text" placeholder="MM/AA" maxLength={5}
                        value={cardExp}
                        onChange={e => setCardExp(formatExp(e.target.value))}
                        style={{ width: "100%", border: "1.5px solid #e8edf8", borderRadius: "8px", padding: "9px 11px", fontSize: "12px", outline: "none", boxSizing: "border-box" }}
                      />
                    </div>
                    <div>
                      <div style={{ fontSize: "10px", fontWeight: "700", color: "#1667E6", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "4px" }}>CVV</div>
                      <input type="password" placeholder="•••" maxLength={4} style={{ width: "100%", border: "1.5px solid #e8edf8", borderRadius: "8px", padding: "9px 11px", fontSize: "12px", outline: "none", boxSizing: "border-box" }} />
                    </div>
                  </div>
                </div>
              )}

              {/* PANEL SPEI */}
              {metodo === "spei" && (
                <div style={{ background: "#f5f7ff", border: "1.5px solid #e8edf8", borderRadius: "10px", padding: "16px", textAlign: "center" }}>
                  <div style={{ fontSize: "12px", color: "#888", marginBottom: "4px" }}>Realiza tu transferencia a:</div>
                  <div style={{ fontWeight: "800", fontSize: "14px", color: "#0D0C56", marginBottom: "4px" }}>TRIP PLANNER S.A. DE C.V.</div>
                  <div style={{ fontSize: "11px", color: "#888", marginBottom: "4px" }}>Banco: STP · Cuenta CLABE:</div>
                  <div style={{ fontFamily: "monospace", fontWeight: "800", fontSize: "18px", color: "#1667E6", letterSpacing: "2px", marginBottom: "10px" }}>6461 8000 1234 5678 90</div>
                  <div style={{ background: "#fff", border: "1px solid #e8edf8", borderRadius: "8px", padding: "8px 12px", fontSize: "11px", color: "#888", display: "flex", justifyContent: "space-between" }}>
                    <span>Referencia: <strong style={{ color: "#1667E6" }}>TP-2024-8847</strong></span>
                    <span style={{ color: "#1667E6", fontWeight: "700", cursor: "pointer" }} onClick={e => (e.currentTarget as HTMLElement).textContent = "✓ Copiado"}>Copiar</span>
                  </div>
                  <div style={{ fontSize: "11px", color: "#888", marginTop: "10px", lineHeight: "1.5" }}>Tu reserva se confirmará al recibir el pago. Puede tardar hasta 30 minutos.</div>
                </div>
              )}

              {/* PANEL APPLE PAY */}
              {metodo === "applepay" && (
                <div style={{ textAlign: "center", padding: "10px 0" }}>
                  <img src={`data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPg0KPHN2ZyB3aWR0aD0iODAwcHgiIGhlaWdodD0iODAwcHgiIHZpZXdCb3g9IjAgLTkgNTggNTgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQo8cmVjdCB4PSIwLjUiIHk9IjAuNSIgd2lkdGg9IjU3IiBoZWlnaHQ9IjM5IiByeD0iMy41IiBmaWxsPSJ3aGl0ZSIgc3Ryb2tlPSIjRjNGM0YzIi8+DQo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE3LjU3NzEgMTQuOTI2NUMxNy4xNTUzIDE1LjQzMTMgMTYuNDgwMyAxNS44Mjk0IDE1LjgwNTMgMTUuNzcyNUMxNS43MjA5IDE1LjA5IDE2LjA1MTMgMTQuMzY0OSAxNi40MzgxIDEzLjkxNzFDMTYuODU5OSAxMy4zOTgxIDE3LjU5ODIgMTMuMDI4NCAxOC4xOTU5IDEzQzE4LjI2NjIgMTMuNzEwOSAxNy45OTIgMTQuNDA3NiAxNy41NzcxIDE0LjkyNjVaTTE4LjE4ODggMTUuOTA3NkMxNy41OTQyIDE1Ljg3MyAxNy4wNTE2IDE2LjA4ODQgMTYuNjEzMyAxNi4yNjI0QzE2LjMzMTMgMTYuMzc0NCAxNi4wOTI0IDE2LjQ2OTIgMTUuOTEwNyAxNi40NjkyQzE1LjcwNjggMTYuNDY5MiAxNS40NTgxIDE2LjM2OTMgMTUuMTc4OSAxNi4yNTcxQzE0LjgxMyAxNi4xMTAyIDE0LjM5NDcgMTUuOTQyMiAxMy45NTYgMTUuOTUwMkMxMi45NTA2IDE1Ljk2NDUgMTIuMDE1NCAxNi41NDAzIDExLjUwMjEgMTcuNDU3M0MxMC40NDc0IDE5LjI5MTUgMTEuMjI3OSAyMi4wMDcxIDEyLjI0NzQgMjMuNUMxMi43NDY3IDI0LjIzOTMgMTMuMzQ0MyAyNS4wNDk4IDE0LjEzMTggMjUuMDIxM0MxNC40NzgzIDI1LjAwODEgMTQuNzI3NSAyNC45MDEyIDE0Ljk4NTQgMjQuNzkwNUMxNS4yODIzIDI0LjY2MzEgMTUuNTkwOCAyNC41MzA4IDE2LjA3MjQgMjQuNTMwOEMxNi41Mzc0IDI0LjUzMDggMTYuODMyNCAyNC42NTk3IDE3LjExNTUgMjQuNzgzNEMxNy4zODQ3IDI0LjkwMTEgMTcuNjQzMyAyNS4wMTQgMTguMDI3MSAyNS4wMDcxQzE4Ljg0MjggMjQuOTkyOSAxOS4zNTYgMjQuMjY3OCAxOS44NTUzIDIzLjUyODRDMjAuMzk0IDIyLjczNDkgMjAuNjMwNyAyMS45NjA1IDIwLjY2NjcgMjEuODQzTDIwLjY3MDkgMjEuODI5NEMyMC42NyAyMS44Mjg1IDIwLjY2MzQgMjEuODI1NCAyMC42NTE2IDIxLjgyQzIwLjQ3MTUgMjEuNzM2NiAxOS4wOTUgMjEuMDk5NSAxOS4wODE4IDE5LjM5MUMxOS4wNjg2IDE3Ljk1NyAyMC4xNzM2IDE3LjIzMDQgMjAuMzQ3NiAxNy4xMTZDMjAuMzU4MiAxNy4xMDkgMjAuMzY1MyAxNy4xMDQzIDIwLjM2ODUgMTcuMTAxOUMxOS42NjU0IDE2LjA0OTggMTguNTY4NSAxNS45MzYgMTguMTg4OCAxNS45MDc2Wk0yMy44MzQ5IDI0LjkyODlWMTMuODQ2SDI3Ljk0ODJDMzAuMDcxNyAxMy44NDYgMzEuNTU1MyAxNS4zMjQ2IDMxLjU1NTMgMTcuNDg1OEMzMS41NTUzIDE5LjY0NjkgMzAuMDQzNSAyMS4xMzk4IDI3Ljg5MiAyMS4xMzk4SDI1LjUzNjVWMjQuOTI4OUgyMy44MzQ5Wk0yNS41MzY1IDE1LjI5NjJIMjcuNDk4MkMyOC45NzQ4IDE1LjI5NjIgMjkuODE4NSAxNi4wOTI0IDI5LjgxODUgMTcuNDkyOUMyOS44MTg1IDE4Ljg5MzQgMjguOTc0OCAxOS42OTY3IDI3LjQ5MTIgMTkuNjk2N0gyNS41MzY1VjE1LjI5NjJaTTM3LjE3MzIgMjMuNTk5NUMzNi43MjMyIDI0LjQ2NjggMzUuNzMxOCAyNS4wMTQyIDM0LjY2MzEgMjUuMDE0MkMzMy4wODEgMjUuMDE0MiAzMS45NzcxIDI0LjA2MTYgMzEuOTc3MSAyMi42MjU2QzMxLjk3NzEgMjEuMjAzOCAzMy4wNDU5IDIwLjM4NjMgMzUuMDIxNyAyMC4yNjU0TDM3LjE0NTEgMjAuMTM3NFYxOS41MjYxQzM3LjE0NTEgMTguNjIzMiAzNi41NjE1IDE4LjEzMjcgMzUuNTIwOSAxOC4xMzI3QzM0LjY2MzEgMTguMTMyNyAzNC4wMzczIDE4LjU4MDYgMzMuOTEwNyAxOS4yNjNIMzIuMzc3OUMzMi40MjcxIDE3LjgyNyAzMy43NjMxIDE2Ljc4MiAzNS41NzAxIDE2Ljc4MkMzNy41MTc3IDE2Ljc4MiAzOC43ODM0IDE3LjgxMjggMzguNzgzNCAxOS40MTIzVjI0LjkyODlIMzcuMjA4NFYyMy41OTk1SDM3LjE3MzJaTTM1LjEyMDEgMjMuNjk5MUMzNC4yMTMxIDIzLjY5OTEgMzMuNjM2NSAyMy4yNTgzIDMzLjYzNjUgMjIuNTgyOUMzMy42MzY1IDIxLjg4NjMgMzQuMTkyIDIxLjQ4MSAzNS4yNTM3IDIxLjQxNzFMMzcuMTQ1MSAyMS4yOTYyVjIxLjkyMThDMzcuMTQ1MSAyMi45NTk3IDM2LjI3MzIgMjMuNjk5MSAzNS4xMjAxIDIzLjY5OTFaTTQ0LjAwNzYgMjUuMzYyNkM0My4zMjU2IDI3LjMwMzMgNDIuNTQ1MSAyNy45NDMxIDQwLjg4NTcgMjcuOTQzMUM0MC43NTkyIDI3Ljk0MzEgNDAuMzM3MyAyNy45Mjg5IDQwLjIzODggMjcuOTAwNVYyNi41NzExQzQwLjM0NDMgMjYuNTg1MyA0MC42MDQ1IDI2LjU5OTUgNDAuNzM4MSAyNi41OTk1QzQxLjQ5MDQgMjYuNTk5NSA0MS45MTIzIDI2LjI3OTYgNDIuMTcyNCAyNS40NDc5TDQyLjMyNzEgMjQuOTU3M0wzOS40NDQzIDE2Ljg4ODZINDEuMjIzMkw0My4yMjcxIDIzLjQzNkg0My4yNjIzTDQ1LjI2NjIgMTYuODg4Nkg0Ni45OTU5TDQ0LjAwNzYgMjUuMzYyNloiIGZpbGw9IiMwMDAwMDAiLz4NCjwvc3ZnPg==`} style={{height:"50px", width:"auto", margin:"0 auto 12px", display:"block"}} alt="Apple Pay"/>
                  <div style={{ fontSize: "11px", color: "#888", lineHeight: "1.5", maxWidth: "300px", margin: "0 auto" }}>Paga de forma rápida y segura usando Face ID, Touch ID o tu código de acceso. Tu información nunca se comparte.</div>
                  <button style={{ marginTop: "14px", padding: "12px 32px", background: "#000", color: "#fff", border: "none", borderRadius: "10px", fontWeight: "700", fontSize: "14px", cursor: "pointer" }}>Pagar con Apple Pay</button>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div>
          {/* RESUMEN */}
          <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", overflow: "hidden", marginBottom: "12px" }}>
            <div style={{ padding: "10px 14px", background: "#0D0C56" }}>
              <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "12px", color: "#fff" }}>Resumen de tu viaje</div>
            </div>
            <div style={{ padding: "12px 14px" }}>
              {[
                { label: "Destinos", value: "París · Roma", mostrar: tipo === "completo" },
                { label: "Vuelos · 3 tramos", value: "$2,080 USD", mostrar: tipo !== "hotel" },
                { label: "Hospedaje · 5 noches", value: "$1,636 USD", mostrar: tipo !== "vuelo" },
                { label: "Pasajeros", value: "2 personas", mostrar: true },
                { label: "Fechas", value: "12–17 Jul 2026", mostrar: tipo === "completo" },
                { label: "Comisión", value: "$0", green: true, mostrar: true },
              ].filter(r => r.mostrar).map(r => (
                <div key={r.label} style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", padding: "5px 0", borderBottom: "1px solid #f5f7ff" }}>
                  <span style={{ color: "#888" }}>{r.label}</span>
                  <span style={{ fontWeight: "600", color: (r as any).green ? "#3ED5A9" : "#0D0C56" }}>{r.value}</span>
                </div>
              ))}
            </div>
            <div style={{ background: "#1667E6", padding: "11px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "11px", fontWeight: "700", color: "rgba(255,255,255,0.8)" }}>Total a pagar</div>
                <div style={{ fontSize: "10px", color: "#3ED5A9", marginTop: "2px" }}>~$62,680 MXN</div>
              </div>
              <div style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "18px", color: "#fff" }}>$3,716 USD</div>
            </div>
          </div>

          {/* SEGURIDAD */}
          <div style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", padding: "12px 14px", marginBottom: "12px" }}>
            {[
              { ico: <IconLock />, txt: "Pago encriptado SSL 256-bit" },
              { ico: <IconShield />, txt: "Tus datos nunca se almacenan" },
              { ico: <IconRefresh />, txt: "Cancelación gratuita hasta 48h antes" },
            ].map(s => (
              <div key={s.txt} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "11px", color: "#888", padding: "4px 0" }}>
                {s.ico}<span>{s.txt}</span>
              </div>
            ))}
          </div>

          <Link href={`/confirmacion?tipo=${tipo}`} onClick={() => setProcesando(true)} style={{ width: "100%", padding: "13px", backgroundColor: "#FF5C00", color: "#fff", border: "none", borderRadius: "13px", fontFamily: "sans-serif", fontWeight: "800", fontSize: "14px", cursor: "pointer", textDecoration: "none", display: "block", textAlign: "center", boxSizing: "border-box" as const }}>
            {procesando ? "Procesando pago..." : "Confirmar y pagar $3,716 USD"}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Pago() {
  return (
    <Suspense>
      <PagoContent />
    </Suspense>
  );
}
