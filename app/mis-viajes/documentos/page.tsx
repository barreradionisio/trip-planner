"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "../../components/Logo";

const documentos = [
  { id: 1, tipo: "boleto", titulo: "Boleto de vuelo", subtitulo: "CDMX → París · Aeroméxico AM001", fecha: "12 Jul 2026 · 06:30", pasajero: "Juan García López", estado: "disponible" },
  { id: 2, tipo: "boleto", titulo: "Boleto de vuelo", subtitulo: "París → Roma · Air France AF123", fecha: "15 Jul 2026 · 09:15", pasajero: "Juan García López", estado: "disponible" },
  { id: 3, tipo: "boleto", titulo: "Boleto de vuelo", subtitulo: "Roma → CDMX · Iberia IB456", fecha: "17 Jul 2026 · 11:00", pasajero: "Juan García López", estado: "disponible" },
  { id: 4, tipo: "voucher", titulo: "Voucher de hotel", subtitulo: "Hotel Le Marais · París", fecha: "Check-in: 12 Jul · Check-out: 15 Jul", pasajero: "Juan García López", estado: "disponible" },
  { id: 5, tipo: "voucher", titulo: "Voucher de hotel", subtitulo: "Hotel Roma Centro · Roma", fecha: "Check-in: 15 Jul · Check-out: 17 Jul", pasajero: "Juan García López", estado: "disponible" },
  { id: 6, tipo: "itinerario", titulo: "Itinerario completo", subtitulo: "París · Roma · 12–17 Jul 2026", fecha: "5 días · 2 ciudades · 12 actividades", pasajero: "Juan García López", estado: "disponible" },
  { id: 7, tipo: "confirmacion", titulo: "Confirmación de reserva", subtitulo: "Reserva TP-2024-8847", fecha: "Emitido: 11 Jun 2026", pasajero: "Juan García López", estado: "disponible" },
];

const iconosTipo: { [key: string]: React.ReactNode } = {
  boleto: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1667E6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-1 .1-1.3.5l-.4.4c-.4.4-.3 1 .2 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.4 5.8c.3.5.9.6 1.3.2l.4-.4c.4-.3.6-.8.5-1.3z"/>
    </svg>
  ),
  voucher: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#085041" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  itinerario: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6b21a8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
      <line x1="8" y1="2" x2="8" y2="18"/>
      <line x1="16" y1="6" x2="16" y2="22"/>
    </svg>
  ),
  confirmacion: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7a4800" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
  ),
};

const tipoConfig: { [key: string]: { bg: string; color: string; label: string } } = {
  boleto: { bg: "#f0f5ff", color: "#1667E6", label: "Boleto" },
  voucher: { bg: "#e8fff5", color: "#085041", label: "Voucher" },
  itinerario: { bg: "#f5f0ff", color: "#6b21a8", label: "Itinerario" },
  confirmacion: { bg: "#fff8e0", color: "#7a4800", label: "Confirmación" },
};

const IconEye = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const IconDownload = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

const IconCheck = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const IconWarning = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7a4800" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

export default function Documentos() {
  const [descargando, setDescargando] = useState<number | null>(null);
  const [descargados, setDescargados] = useState<number[]>([]);
  const [filtro, setFiltro] = useState("todos");

  const descargar = (id: number) => {
    setDescargando(id);
    setTimeout(() => {
      setDescargando(null);
      setDescargados(prev => [...prev, id]);
      alert("Documento descargado. Cuando se integre la API, aquí se descargará el PDF real.");
    }, 1500);
  };

  const descargarTodos = () => {
    documentos.forEach((d, i) => {
      setTimeout(() => {
        setDescargados(prev => [...prev, d.id]);
      }, i * 300);
    });
    setTimeout(() => {
      alert("Todos los documentos descargados. Cuando se integre la API, se descargarán los PDFs reales.");
    }, documentos.length * 300);
  };

  const filtrados = documentos.filter(d => filtro === "todos" || d.tipo === filtro);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Montserrat',sans-serif", background: "#f5f7ff" }}>

      {/* NAV */}
      <nav style={{ background: "#1667E6", padding: "12px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" }}>
        <Logo variant="naranja" />
        <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "28px", alignItems: "center" }}>
          <Link href="/mis-viajes" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none", fontWeight: "600" }}>Mis viajes</Link>
          <Link href="/perfil" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none", fontWeight: "600" }}>Perfil</Link>
          <Link href="/soporte" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textDecoration: "none", fontWeight: "600" }}>Soporte</Link>
        </div>
        <Link href="/mis-viajes" style={{ fontSize: "13px", background: "rgba(255,255,255,0.15)", color: "#fff", textDecoration: "none", fontWeight: "700", padding: "8px 18px", borderRadius: "50px" }}>‹ Mis viajes</Link>
      </nav>

      {/* HEADER */}
      <div style={{ background: "#1667E6", padding: "20px 32px 40px", marginBottom: "-20px" }}>
        <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", marginBottom: "4px" }}>Reserva TP-2024-8847</div>
        <h1 style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "22px", color: "#fff", marginBottom: "2px" }}>Documentos de viaje</h1>
        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)" }}>París · Roma · 12–17 Jul 2026</p>
      </div>

      {/* CONTENIDO */}
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 20px 40px", width: "100%" }}>

        {/* AVISO */}
        <div style={{ background: "#f0f5ff", border: "1.5px solid #e0eaff", borderRadius: "13px", padding: "12px 16px", marginBottom: "16px", display: "flex", alignItems: "center", gap: "10px", fontSize: "12px", color: "#1667E6" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1667E6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
          <span>Los documentos estarán disponibles en PDF una vez que se integre la API. Por ahora puedes ver el resumen de cada uno.</span>
        </div>

        {/* FILTROS Y BOTÓN DESCARGAR TODO */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <div style={{ display: "flex", gap: "8px" }}>
            {["todos", "boleto", "voucher", "itinerario", "confirmacion"].map(f => (
              <button
                key={f}
                onClick={() => setFiltro(f)}
                style={{ padding: "6px 14px", border: `1.5px solid ${filtro === f ? "#1667E6" : "#e8edf8"}`, borderRadius: "50px", fontSize: "11px", fontWeight: "700", cursor: "pointer", background: filtro === f ? "#1667E6" : "#fff", color: filtro === f ? "#fff" : "#0D0C56", textTransform: "capitalize" }}
              >
                {f === "todos" ? "Todos" : tipoConfig[f]?.label === "Confirmación" ? "Confirmaciones" : tipoConfig[f]?.label + "s"}
              </button>
            ))}
          </div>
          <button
            onClick={descargarTodos}
            style={{ padding: "8px 16px", background: "#0D0C56", color: "#fff", border: "none", borderRadius: "8px", fontSize: "12px", fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}
          >
            <IconDownload />
            Descargar todos
          </button>
        </div>

        {/* LISTA DOCUMENTOS */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {filtrados.map(d => {
            const config = tipoConfig[d.tipo];
            const yaDescargado = descargados.includes(d.id);
            const descargandoEste = descargando === d.id;
            return (
              <div key={d.id} style={{ background: "#fff", borderRadius: "13px", border: "1.5px solid #e8edf8", padding: "16px 20px", display: "flex", alignItems: "center", gap: "16px" }}>
                {/* ICONO */}
                <div style={{ width: "48px", height: "48px", borderRadius: "10px", background: config.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {iconosTipo[d.tipo]}
                </div>

                {/* INFO */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "2px" }}>
                    <div style={{ fontWeight: "800", fontSize: "13px", color: "#0D0C56" }}>{d.titulo}</div>
                    <span style={{ fontSize: "10px", background: config.bg, color: config.color, padding: "2px 8px", borderRadius: "50px", fontWeight: "700" }}>{config.label}</span>
                    {yaDescargado && <span style={{ fontSize: "10px", background: "#e8fff5", color: "#085041", padding: "2px 8px", borderRadius: "50px", fontWeight: "700", display: "flex", alignItems: "center", gap: "4px" }}><IconCheck /> Descargado</span>}
                  </div>
                  <div style={{ fontSize: "12px", color: "#0D0C56", fontWeight: "600", marginBottom: "2px" }}>{d.subtitulo}</div>
                  <div style={{ fontSize: "11px", color: "#888" }}>{d.fecha}</div>
                </div>

                {/* BOTONES */}
                <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                  <button
                    onClick={() => alert("Vista previa disponible cuando se integre la API.")}
                    style={{ padding: "7px 14px", background: "#f5f7ff", color: "#888", border: "1.5px solid #e8edf8", borderRadius: "8px", fontSize: "11px", fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}
                  >
                    <IconEye /> Ver
                  </button>
                  <button
                    onClick={() => descargar(d.id)}
                    style={{ padding: "7px 14px", background: descargandoEste ? "#f0f5ff" : yaDescargado ? "#e8fff5" : "#1667E6", color: descargandoEste ? "#1667E6" : yaDescargado ? "#085041" : "#fff", border: "none", borderRadius: "8px", fontSize: "11px", fontWeight: "700", cursor: "pointer", minWidth: "100px", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
                  >
                    {descargandoEste ? "Descargando..." : yaDescargado ? (<><IconCheck /> Descargado</>) : (<><IconDownload /> Descargar</>)}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* NOTA */}
        <div style={{ marginTop: "20px", background: "#fff8e0", border: "1.5px solid #F5A623", borderRadius: "13px", padding: "14px 18px", fontSize: "12px", color: "#7a4800", lineHeight: "1.6", display: "flex", gap: "10px" }}>
          <IconWarning />
          <div>
            <strong>Nota:</strong> Los boletos de vuelo y vouchers de hotel serán enviados automáticamente a tu correo registrado. Si no los has recibido, revisa tu bandeja de spam o contáctanos en <strong>no-reply@tripplaner.com.mx</strong>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: "#0D0C56", padding: "32px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
        <div>
          <Logo variant="teal" />
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginTop: "12px" }}>© 2026 Trip Planner · no-reply@tripplaner.com.mx</p>
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
