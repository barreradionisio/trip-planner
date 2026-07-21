"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function NavUsuario() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<any>(null);
const [cargando, setCargando] = useState(true);
const [menuAbierto, setMenuAbierto] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
  setUsuario(data.user);
  setCargando(false);
});
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUsuario(session?.user ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const cerrarSesion = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const iniciales = usuario
    ? (usuario.user_metadata?.nombre?.[0] || "") + (usuario.user_metadata?.apellido?.[0] || "")
    : "";

  if (cargando) return <div style={{ width: "36px", height: "36px" }} />;

if (!usuario) {
  return (
    <Link href="/login" style={{ fontSize: "13px", background: "#1667E6", color: "#fff", textDecoration: "none", fontWeight: "700", padding: "8px 18px", borderRadius: "50px" }}>
        Iniciar sesión
      </Link>
    );
  }

  return (
    <div style={{ position: "relative" }}>
      <button onClick={() => setMenuAbierto(!menuAbierto)} style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#1667E6", border: "none", cursor: "pointer", fontFamily: "Montserrat, sans-serif", fontWeight: "800", fontSize: "13px", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {iniciales.toUpperCase() || "?"}
      </button>
      {menuAbierto && (
        <div style={{ position: "absolute", right: 0, top: "44px", background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", padding: "8px", minWidth: "160px", boxShadow: "0 8px 24px rgba(0,0,0,0.1)", zIndex: 100 }}>
          <Link href="/mis-viajes" onClick={() => setMenuAbierto(false)} style={{ display: "block", padding: "9px 12px", fontSize: "12px", fontWeight: "600", color: "#0D0C56", textDecoration: "none", borderRadius: "8px" }}>Mis viajes</Link>
          <Link href="/perfil" onClick={() => setMenuAbierto(false)} style={{ display: "block", padding: "9px 12px", fontSize: "12px", fontWeight: "600", color: "#0D0C56", textDecoration: "none", borderRadius: "8px" }}>Mi perfil</Link>
          <div style={{ height: "1px", background: "#f0f2fa", margin: "4px 0" }}/>
          <button onClick={cerrarSesion} style={{ width: "100%", padding: "9px 12px", fontSize: "12px", fontWeight: "600", color: "#c0392b", background: "none", border: "none", cursor: "pointer", textAlign: "left", borderRadius: "8px", fontFamily: "Montserrat, sans-serif" }}>Cerrar sesión</button>
        </div>
      )}
    </div>
  );
}