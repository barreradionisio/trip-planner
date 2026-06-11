"use client";

import { useState, useEffect } from "react";
import Logo from "../components/Logo";

export default function Recuperar() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState(["","","","","",""]);
  const [timer, setTimer] = useState(600);
  const [pwd, setPwd] = useState("");

  useEffect(() => {
    if (step !== 2) return;
    const interval = setInterval(() => {
      setTimer(t => t > 0 ? t - 1 : 0);
    }, 1000);
    return () => clearInterval(interval);
  }, [step]);

  const formatTimer = () => {
    const m = Math.floor(timer / 60).toString().padStart(2,"0");
    const s = (timer % 60).toString().padStart(2,"0");
    return timer > 0 ? `${m}:${s}` : "Expirado";
  };

  const getPwdStrength = (p: string) => {
    if (p.length === 0) return null;
    if (p.length < 6) return { label:"Muy corta", color:"#E24B4A", bars:1 };
    if (p.length < 8) return { label:"Débil", color:"#F5A623", bars:2 };
    if (p.length < 12) return { label:"Aceptable", color:"#3ED5A9", bars:3 };
    return { label:"Contraseña segura ✓", color:"#3ED5A9", bars:4 };
  };

  const strength = getPwdStrength(pwd);
  const codigoCompleto = codigo.every(c => c.length === 1);

  const handleCodigo = (val: string, idx: number) => {
    const nuevo = [...codigo];
    nuevo[idx] = val.slice(-1);
    setCodigo(nuevo);
    if (val && idx < 5) {
      const next = document.getElementById(`cod-${idx+1}`);
      if (next) (next as HTMLInputElement).focus();
    }
  };

  return (
    <div style={{minHeight:"100vh", display:"grid", gridTemplateColumns:"1fr 1fr", fontFamily:"'Montserrat',sans-serif"}}>

      {/* IZQUIERDA */}
      <div style={{background:"#0D0C56", display:"flex", flexDirection:"column", justifyContent:"space-between", padding:"32px", position:"relative", overflow:"hidden"}}>
        <div style={{position:"absolute", top:"-80px", right:"-80px", width:"280px", height:"280px", borderRadius:"50%", background:"rgba(62,213,169,0.08)"}}/>
        <div style={{position:"absolute", bottom:"-60px", left:"-60px", width:"200px", height:"200px", borderRadius:"50%", background:"rgba(22,103,230,0.12)"}}/>
        <div style={{position:"relative", zIndex:1}}>
          <Logo variant="teal" />
        </div>
        <div style={{position:"relative", zIndex:1}}>
          <h2 style={{fontFamily:"sans-serif", fontWeight:"800", fontSize:"26px", color:"#fff", lineHeight:"1.3", marginBottom:"12px"}}>
            Recupera tu acceso <span style={{color:"#3ED5A9"}}>fácilmente</span>
          </h2>
          <p style={{fontSize:"13px", color:"rgba(255,255,255,0.5)", lineHeight:"1.6", marginBottom:"28px"}}>
            Solo necesitas tu correo. Te enviamos un código para restablecer tu contraseña.
          </p>
          <div style={{display:"flex", flexDirection:"column", gap:"0"}}>
            {[
              {num:1, title:"Ingresa tu correo", sub:"Te enviamos un código de 6 dígitos"},
              {num:2, title:"Verifica el código", sub:"Revisa tu bandeja de entrada"},
              {num:3, title:"Nueva contraseña", sub:"Elige una contraseña segura"},
            ].map(p => (
              <div key={p.num} style={{display:"flex", alignItems:"flex-start", gap:"14px", padding:"14px 0", borderBottom: p.num < 3 ? "1px solid rgba(255,255,255,0.06)" : "none"}}>
                <div style={{width:"32px", height:"32px", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"12px", fontWeight:"800", flexShrink:0, background: step > p.num ? "#3ED5A9" : step === p.num ? "#1667E6" : "rgba(255,255,255,0.1)", color: step > p.num ? "#0D0C56" : "#fff"}}>
                  {step > p.num ? "✓" : p.num}
                </div>
                <div>
                  <div style={{fontWeight:"700", fontSize:"12px", color: step > p.num ? "#3ED5A9" : step === p.num ? "#fff" : "rgba(255,255,255,0.4)"}}>{p.title}</div>
                  <div style={{fontSize:"11px", color:"rgba(255,255,255,0.4)"}}>{p.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p style={{fontSize:"11px", color:"rgba(255,255,255,0.3)", position:"relative", zIndex:1}}>© 2026 Trip Planner · no-reply@tripplanner.mx</p>
      </div>

      {/* DERECHA */}
      <div style={{background:"#fff", display:"flex", alignItems:"center", justifyContent:"center", padding:"40px 32px"}}>
        <div style={{width:"100%", maxWidth:"360px"}}>

          {/* PASO 1 */}
          {step === 1 && (
            <div>
              <h3 style={{fontFamily:"sans-serif", fontWeight:"800", fontSize:"22px", color:"#0D0C56", marginBottom:"6px"}}>¿Olvidaste tu contraseña?</h3>
              <p style={{fontSize:"12px", color:"#888", marginBottom:"24px"}}>Ingresa tu correo y te enviamos un código para restablecerla.</p>
              <div style={{marginBottom:"16px"}}>
                <label style={{fontSize:"10px", fontWeight:"700", color:"#1667E6", textTransform:"uppercase", letterSpacing:"0.4px", display:"block", marginBottom:"4px"}}>Correo electrónico</label>
                <input type="email" placeholder="correo@email.com" value={email} onChange={e => setEmail(e.target.value)} style={{width:"100%", border:"1.5px solid #e8edf8", borderRadius:"8px", padding:"10px 12px", fontSize:"12px", outline:"none", boxSizing:"border-box"}}/>
              </div>
              <button onClick={() => setStep(2)} style={{width:"100%", padding:"12px", background:"#1667E6", color:"#fff", border:"none", borderRadius:"10px", fontWeight:"800", fontSize:"13px", cursor:"pointer", marginBottom:"16px"}}>Enviar código de verificación</button>
              <div style={{textAlign:"center", fontSize:"12px", color:"#888"}}>¿Recordaste tu contraseña? <a href="/login" style={{color:"#1667E6", fontWeight:"700", textDecoration:"none"}}>Iniciar sesión</a></div>
            </div>
          )}

          {/* PASO 2 */}
          {step === 2 && (
            <div>
              <h3 style={{fontFamily:"sans-serif", fontWeight:"800", fontSize:"22px", color:"#0D0C56", marginBottom:"6px"}}>Revisa tu correo</h3>
              <p style={{fontSize:"12px", color:"#888", marginBottom:"12px"}}>Enviamos un código de 6 dígitos a:</p>
              <div style={{background:"#f0f5ff", border:"1.5px solid #e0eaff", borderRadius:"10px", padding:"10px 14px", fontSize:"12px", color:"#1667E6", fontWeight:"600", textAlign:"center", marginBottom:"20px"}}>📧 {email || "juan@email.com"}</div>
              <div style={{display:"flex", gap:"10px", justifyContent:"center", marginBottom:"10px"}}>
                {codigo.map((c, i) => (
                  <input
                    key={i}
                    id={`cod-${i}`}
                    maxLength={1}
                    value={c}
                    onChange={e => handleCodigo(e.target.value, i)}
                    style={{width:"48px", height:"56px", border:`1.5px solid ${c ? "#3ED5A9" : "#e8edf8"}`, borderRadius:"10px", textAlign:"center", fontSize:"22px", fontWeight:"800", outline:"none", background: c ? "#e8fff5" : "#fff"}}
                  />
                ))}
              </div>
              <div style={{textAlign:"center", fontSize:"11px", color:"#888", marginBottom:"6px"}}>
                ¿No lo recibiste? <span style={{color:"#1667E6", fontWeight:"700", cursor:"pointer"}} onClick={() => setTimer(600)}>Reenviar código</span>
              </div>
              <div style={{textAlign:"center", fontSize:"11px", color:"#aaa", marginBottom:"20px"}}>
                El código expira en <span style={{fontWeight:"700", color:"#1667E6"}}>{formatTimer()}</span>
              </div>
              <button onClick={() => { if(codigoCompleto) setStep(3); }} style={{width:"100%", padding:"12px", background:"#1667E6", color:"#fff", border:"none", borderRadius:"10px", fontWeight:"800", fontSize:"13px", cursor:"pointer", opacity: codigoCompleto ? 1 : 0.4, marginBottom:"16px"}}>Verificar código</button>
              <div style={{textAlign:"center", fontSize:"12px", color:"#888"}}><span onClick={() => setStep(1)} style={{color:"#1667E6", fontWeight:"700", cursor:"pointer"}}>‹ Cambiar correo</span></div>
            </div>
          )}

          {/* PASO 3 */}
          {step === 3 && (
            <div>
              <h3 style={{fontFamily:"sans-serif", fontWeight:"800", fontSize:"22px", color:"#0D0C56", marginBottom:"6px"}}>Nueva contraseña</h3>
              <p style={{fontSize:"12px", color:"#888", marginBottom:"24px"}}>Elige una contraseña segura. Debe tener al menos 8 caracteres.</p>
              <div style={{marginBottom:"14px"}}>
                <label style={{fontSize:"10px", fontWeight:"700", color:"#1667E6", textTransform:"uppercase", letterSpacing:"0.4px", display:"block", marginBottom:"4px"}}>Nueva contraseña</label>
                <input type="password" placeholder="Mínimo 8 caracteres" value={pwd} onChange={e => setPwd(e.target.value)} style={{width:"100%", border:"1.5px solid #e8edf8", borderRadius:"8px", padding:"10px 12px", fontSize:"12px", outline:"none", boxSizing:"border-box"}}/>
                {strength && (
                  <div style={{marginTop:"6px"}}>
                    <div style={{display:"flex", gap:"3px", marginBottom:"3px"}}>
                      {[1,2,3,4].map(i => (
                        <div key={i} style={{flex:1, height:"3px", borderRadius:"2px", background: i <= strength.bars ? strength.color : "#e8edf8"}}/>
                      ))}
                    </div>
                    <div style={{fontSize:"10px", color:strength.color}}>{strength.label}</div>
                  </div>
                )}
              </div>
              <div style={{marginBottom:"20px"}}>
                <label style={{fontSize:"10px", fontWeight:"700", color:"#1667E6", textTransform:"uppercase", letterSpacing:"0.4px", display:"block", marginBottom:"4px"}}>Confirmar contraseña</label>
                <input type="password" placeholder="Repite tu nueva contraseña" style={{width:"100%", border:"1.5px solid #e8edf8", borderRadius:"8px", padding:"10px 12px", fontSize:"12px", outline:"none", boxSizing:"border-box"}}/>
              </div>
              <button onClick={() => setStep(4)} style={{width:"100%", padding:"12px", background:"#1667E6", color:"#fff", border:"none", borderRadius:"10px", fontWeight:"800", fontSize:"13px", cursor:"pointer", marginBottom:"14px"}}>Guardar nueva contraseña</button>
              <div style={{background:"#f0f5ff", borderRadius:"8px", padding:"10px 12px", fontSize:"11px", color:"#1667E6", lineHeight:"1.5"}}>
                💡 Usa mínimo 8 caracteres con letras, números y símbolos.
              </div>
            </div>
          )}

          {/* PASO 4 - ÉXITO */}
          {step === 4 && (
            <div style={{textAlign:"center"}}>
              <div style={{width:"72px", height:"72px", borderRadius:"50%", background:"#e8fff5", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"32px", margin:"0 auto 20px"}}>✅</div>
              <h3 style={{fontFamily:"sans-serif", fontWeight:"800", fontSize:"22px", color:"#0D0C56", marginBottom:"8px"}}>¡Contraseña actualizada!</h3>
              <p style={{fontSize:"12px", color:"#888", lineHeight:"1.6", marginBottom:"28px"}}>
                Tu contraseña fue cambiada exitosamente. Ya puedes iniciar sesión.<br/><br/>
                Recibirás una confirmación en <strong>{email || "juan@email.com"}</strong> desde <strong>no-reply@tripplanner.mx</strong>
              </p>
              <a href="/login" style={{display:"block", width:"100%", padding:"12px", background:"#1667E6", color:"#fff", border:"none", borderRadius:"10px", fontWeight:"800", fontSize:"13px", cursor:"pointer", textDecoration:"none", boxSizing:"border-box"}}>Iniciar sesión</a>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
