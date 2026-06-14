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

  const metodos = [
    { key: "credito", label: "Tarjeta de crédito", sub: "Visa · Mastercard", emoji: "💳" },
    { key: "debito", label: "Tarjeta de débito", sub: "Visa · Mastercard", emoji: "💳" },
    { key: "spei", label: "Transferencia SPEI", sub: "Bancos mexicanos", emoji: "🏛" },
    { key: "applepay", label: "Apple Pay", sub: "Pago rápido y seguro", emoji: "AP" },
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Montserrat',sans-serif", background: "#f5f7ff" }}>

      {/* TOPBAR */}
      {tipo === "completo" && (
  <div style={{ background: "#0D0C56", padding: "11px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
    <Logo variant="teal" />
    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
      {["Destinos", "Vuelos", "Hospedaje", "Itinerario", "Pago"].map((s, i) => (
        <div key={s} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "22px", height: "22px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "800", background: i < 4 ? "#3ED5A9" : "#1667E6", color: "#0D0C56" }}>{i < 4 ? "✓" : "5"}</div>
            <span style={{ fontSize: "11px", fontWeight: "600", color: i === 4 ? "#fff" : "#3ED5A9" }}>{s}</span>
          </div>
          {i < 4 && <div style={{ width: "24px", height: "1px", background: "rgba(255,255,255,0.15)" }} />}
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
                      ) : (
                        <span style={{ fontSize: "20px" }}>{m.emoji}</span>
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
                    {/* Logo red arriba derecha */}
                    <div style={{ position: "absolute", top: "16px", right: "16px", zIndex: 2 }}>
                      {brand === "VISA" ? (
                        <svg width="50" height="28" viewBox="0 0 50 28" xmlns="http://www.w3.org/2000/svg">
                          <rect width="50" height="28" rx="5" fill="rgba(255,255,255,0.15)"/>
                          <text x="6" y="20" fontFamily="Arial" fontWeight="900" fontSize="14" fill="#fff">VISA</text>
                        </svg>
                      ) : brand === "MC" ? (
                        <svg width="48" height="30" viewBox="0 0 48 30" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="18" cy="15" r="12" fill="#EB001B" opacity="0.85"/>
                          <circle cx="30" cy="15" r="12" fill="#F79E1B" opacity="0.85"/>
                          <path d="M24 5a12 12 0 0 1 0 20 12 12 0 0 1 0-20z" fill="#FF5F00" opacity="0.9"/>
                        </svg>
                      ) : (
                        <svg width="48" height="30" viewBox="0 0 48 30" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="18" cy="15" r="12" fill="#EB001B" opacity="0.5"/>
                          <circle cx="30" cy="15" r="12" fill="#F79E1B" opacity="0.5"/>
                        </svg>
                      )}
                    </div>
                    {/* Número */}
                    <div style={{ position: "absolute", bottom: "52px", left: "20px", fontFamily: "monospace", fontWeight: "700", fontSize: "16px", letterSpacing: "3px", zIndex: 2 }}>{displayNumber}</div>
                    {/* Titular y vence */}
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
              { ico: "🔒", txt: "Pago encriptado SSL 256-bit" },
              { ico: "🛡", txt: "Tus datos nunca se almacenan" },
              { ico: "↩️", txt: "Cancelación gratuita hasta 48h antes" },
            ].map(s => (
              <div key={s.txt} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "11px", color: "#888", padding: "4px 0" }}>
                <span>{s.ico}</span><span>{s.txt}</span>
              </div>
            ))}
          </div>

          <Link href={`/confirmacion?tipo=${tipo}`} onClick={() => setProcesando(true)} style={{ width: "100%", padding: "13px", backgroundColor: "#FF5C00", color: "#fff", border: "none", borderRadius: "13px", fontFamily: "sans-serif", fontWeight: "800", fontSize: "14px", cursor: "pointer", textDecoration: "none", display: "block", textAlign: "center", boxSizing: "border-box" as const }}>
            {procesando ? "⏳ Procesando pago..." : "Confirmar y pagar $3,716 USD"}
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