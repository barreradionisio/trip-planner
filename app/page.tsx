"use client";

import Logo from "./components/Logo";

export default function Home() {
  return (
    <main>
      <nav style={{background:"#fff", padding:"12px 32px", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:"1px solid #e8edf8", position:"relative"}}>
        <Logo variant="color" />
        <div style={{position:"absolute", left:"50%", transform:"translateX(-50%)", display:"flex", gap:"28px", alignItems:"center"}}>
          <a href="#" style={{fontSize:"13px", color:"#0D0C56", textDecoration:"none", fontWeight:"600"}}>Destinos</a>
          <a href="#" style={{fontSize:"13px", color:"#0D0C56", textDecoration:"none", fontWeight:"600"}}>Vuelos</a>
          <a href="#" style={{fontSize:"13px", color:"#0D0C56", textDecoration:"none", fontWeight:"600"}}>Hoteles</a>
          <a href="#" style={{fontSize:"13px", color:"#0D0C56", textDecoration:"none", fontWeight:"600"}}>Soporte</a>
        </div>
        <a href="#" style={{fontSize:"13px", background:"#1667E6", color:"#fff", textDecoration:"none", fontWeight:"700", padding:"8px 18px", borderRadius:"50px"}}>Iniciar sesión</a>
      </nav>

      <section style={{background:"linear-gradient(135deg,#0D0C56,#1667E6)", minHeight:"90vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"40px 24px", textAlign:"center"}}>
        <h1 style={{fontFamily:"sans-serif", fontWeight:"800", fontSize:"48px", color:"#fff", marginBottom:"16px", lineHeight:"1.2"}}>
          Arma tu viaje ideal,<br/>
          <span style={{color:"#3ED5A9"}}>sin complicaciones</span>
        </h1>
        <p style={{fontSize:"16px", color:"rgba(255,255,255,0.7)", marginBottom:"40px", maxWidth:"500px"}}>
          Vuelos, hoteles e itinerario en un solo lugar. Tú decides, nosotros lo armamos.
        </p>
        <div style={{background:"#fff", borderRadius:"16px", padding:"28px", width:"100%", maxWidth:"700px", boxShadow:"0 20px 60px rgba(0,0,0,0.3)", display:"flex", flexDirection:"column", gap:"14px"}}>
          <div style={{display:"grid", gridTemplateColumns:"1.5fr 1fr 1fr", gap:"12px"}}>
            <button style={{padding:"10px", background:"#1667E6", color:"#fff", border:"none", borderRadius:"8px", fontWeight:"700", fontSize:"13px", cursor:"pointer"}}>✈ Arma tu viaje</button>
            <button style={{padding:"10px", background:"#f5f7ff", color:"#0D0C56", border:"1.5px solid #e8edf8", borderRadius:"8px", fontWeight:"600", fontSize:"13px", cursor:"pointer"}}>Solo vuelos</button>
            <button style={{padding:"10px", background:"#f5f7ff", color:"#0D0C56", border:"1.5px solid #e8edf8", borderRadius:"8px", fontWeight:"600", fontSize:"13px", cursor:"pointer"}}>Solo hoteles</button>
          </div>
          <div style={{display:"grid", gridTemplateColumns:"1.5fr 1fr 1fr 0.7fr", gap:"12px"}}>
            <input placeholder="¿A dónde vas?" style={{padding:"10px 12px", border:"1.5px solid #e8edf8", borderRadius:"8px", fontSize:"13px", outline:"none", height:"40px"}}/>
            <input placeholder="Fecha de ida" style={{padding:"10px 12px", border:"1.5px solid #e8edf8", borderRadius:"8px", fontSize:"13px", outline:"none", height:"40px"}}/>
            <input placeholder="Fecha de vuelta" style={{padding:"10px 12px", border:"1.5px solid #e8edf8", borderRadius:"8px", fontSize:"13px", outline:"none", height:"40px"}}/>
            <button style={{padding:"10px", background:"#FF5C00", color:"#fff", border:"none", borderRadius:"8px", fontWeight:"800", fontSize:"13px", cursor:"pointer", height:"40px"}}>Buscar</button>
          </div>
        </div>
      </section>

      <section style={{background:"#f5f7ff", padding:"80px 24px", textAlign:"center"}}>
        <h2 style={{fontFamily:"sans-serif", fontWeight:"800", fontSize:"32px", color:"#0D0C56", marginBottom:"8px"}}>¿Cómo funciona?</h2>
        <p style={{fontSize:"14px", color:"#888", marginBottom:"48px"}}>En 3 simples pasos tienes tu viaje listo</p>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"24px", maxWidth:"900px", margin:"0 auto"}}>
          <div style={{background:"#fff", borderRadius:"16px", padding:"32px 24px", border:"1.5px solid #e8edf8"}}>
            <div style={{width:"56px", height:"56px", borderRadius:"50%", background:"#f0f5ff", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px", fontSize:"24px"}}>✈</div>
            <h3 style={{fontFamily:"sans-serif", fontWeight:"800", fontSize:"16px", color:"#0D0C56", marginBottom:"8px"}}>1. Elige tus destinos</h3>
            <p style={{fontSize:"13px", color:"#888", lineHeight:"1.6"}}>Selecciona a dónde quieres ir, cuántos días y qué tipo de hospedaje prefieres.</p>
          </div>
          <div style={{background:"#fff", borderRadius:"16px", padding:"32px 24px", border:"1.5px solid #e8edf8"}}>
            <div style={{width:"56px", height:"56px", borderRadius:"50%", background:"#f0f5ff", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px", fontSize:"24px"}}>🏨</div>
            <h3 style={{fontFamily:"sans-serif", fontWeight:"800", fontSize:"16px", color:"#0D0C56", marginBottom:"8px"}}>2. Armamos tu itinerario</h3>
            <p style={{fontSize:"13px", color:"#888", lineHeight:"1.6"}}>Te mostramos vuelos, hoteles y actividades para que elijas lo que más te gusta.</p>
          </div>
          <div style={{background:"#fff", borderRadius:"16px", padding:"32px 24px", border:"1.5px solid #e8edf8"}}>
            <div style={{width:"56px", height:"56px", borderRadius:"50%", background:"#f0f5ff", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px", fontSize:"24px"}}>💳</div>
            <h3 style={{fontFamily:"sans-serif", fontWeight:"800", fontSize:"16px", color:"#0D0C56", marginBottom:"8px"}}>3. Paga y listo</h3>
            <p style={{fontSize:"13px", color:"#888", lineHeight:"1.6"}}>Confirma tu reserva y recibe todos los detalles en tu correo al instante.</p>
          </div>
        </div>
      </section>

      <section style={{background:"#fff", padding:"80px 24px", textAlign:"center"}}>
        <h2 style={{fontFamily:"sans-serif", fontWeight:"800", fontSize:"32px", color:"#0D0C56", marginBottom:"8px"}}>Destinos populares</h2>
        <p style={{fontSize:"14px", color:"#888", marginBottom:"48px"}}>Los viajes más buscados por nuestros usuarios</p>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:"20px", maxWidth:"1000px", margin:"0 auto"}}>
          {[
            {ciudad:"París", pais:"Francia", emoji:"🗼", precio:"desde $850 USD"},
            {ciudad:"Roma", pais:"Italia", emoji:"🏛", precio:"desde $780 USD"},
            {ciudad:"Tokio", pais:"Japón", emoji:"⛩", precio:"desde $1,200 USD"},
            {ciudad:"Nueva York", pais:"EE.UU.", emoji:"🗽", precio:"desde $650 USD"},
          ].map((d) => (
            <div key={d.ciudad}
              style={{borderRadius:"16px", overflow:"hidden", border:"1.5px solid #e8edf8", cursor:"pointer", transition:"transform 0.2s, box-shadow 0.2s"}}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(22,103,230,0.15)";
                (e.currentTarget as HTMLElement).style.borderColor = "#1667E6";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
                (e.currentTarget as HTMLElement).style.borderColor = "#e8edf8";
              }}
            >
              <div style={{background:"linear-gradient(135deg,#0D0C56,#1667E6)", height:"120px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"48px"}}>
                {d.emoji}
              </div>
              <div style={{padding:"16px", textAlign:"left"}}>
                <div style={{fontFamily:"sans-serif", fontWeight:"800", fontSize:"15px", color:"#0D0C56"}}>{d.ciudad}</div>
                <div style={{fontSize:"12px", color:"#888", marginBottom:"8px"}}>{d.pais}</div>
                <div style={{fontSize:"12px", fontWeight:"700", color:"#1667E6"}}>{d.precio}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer style={{background:"#0D0C56", padding:"48px 32px", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
        <div>
          <Logo variant="teal" />
          <p style={{fontSize:"12px", color:"rgba(255,255,255,0.4)", marginTop:"12px"}}>© 2026 Trip Planner · no-reply@tripplanner.mx</p>
        </div>
        <div style={{display:"flex", gap:"48px"}}>
          <div>
            <div style={{fontSize:"11px", fontWeight:"700", color:"rgba(255,255,255,0.4)", textTransform:"uppercase", letterSpacing:"0.5px", marginBottom:"12px"}}>Producto</div>
            <div style={{display:"flex", flexDirection:"column", gap:"8px"}}>
              <a href="#" style={{fontSize:"13px", color:"rgba(255,255,255,0.7)", textDecoration:"none"}}>Arma tu viaje</a>
              <a href="#" style={{fontSize:"13px", color:"rgba(255,255,255,0.7)", textDecoration:"none"}}>Solo vuelos</a>
              <a href="#" style={{fontSize:"13px", color:"rgba(255,255,255,0.7)", textDecoration:"none"}}>Solo hoteles</a>
            </div>
          </div>
          <div>
            <div style={{fontSize:"11px", fontWeight:"700", color:"rgba(255,255,255,0.4)", textTransform:"uppercase", letterSpacing:"0.5px", marginBottom:"12px"}}>Soporte</div>
            <div style={{display:"flex", flexDirection:"column", gap:"8px"}}>
              <a href="#" style={{fontSize:"13px", color:"rgba(255,255,255,0.7)", textDecoration:"none"}}>Centro de ayuda</a>
              <a href="#" style={{fontSize:"13px", color:"rgba(255,255,255,0.7)", textDecoration:"none"}}>Contacto</a>
              <a href="#" style={{fontSize:"13px", color:"rgba(255,255,255,0.7)", textDecoration:"none"}}>Política de privacidad</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}