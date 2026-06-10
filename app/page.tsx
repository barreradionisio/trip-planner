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
    </main>
  );
}