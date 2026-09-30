/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║        CONFIGURACIÓN CENTRAL — Plomeros Medellín                  ║
 * ║  Cambia los datos aquí y se actualizan en toda la página         ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Dónde se usa cada bloque:
 *   googleAds → conversión "Contacto" al hacer clic en los botones de WhatsApp
 *   whatsapp  → botón flotante, botones de WhatsApp y botones "Llamar"
 *   contacto  → teléfono, correo y dirección del footer
 *   redes     → iconos de redes sociales (barra superior y footer)
 *
 * Los mensajes se escriben normales, sin codificar (%20, etc.).
 */
window.SITE_CONFIG = {

    // ─── Google Ads ───────────────────────────────────────────────────
    // Etiqueta de conversión "Contacto" (se dispara solo en los botones de WhatsApp)
    googleAds: {
        activarTrackeo: true,           // true = ofrecer medición con consentimiento · false = sin Google Ads en el sitio
        sendTo: "AW-18186842502/wlSnCIrOvPscEIbjlOBD",
        value: 1.0,
        currency: "COP",
    },

    // ─── WhatsApp ─────────────────────────────────────────────────────
    whatsapp: {
        numero: "3022274397",           // Número sin código de país
        completo: "573022274397",       // Con código Colombia (+57)
        msgEmergencia: "Hola, tengo una emergencia de plomería",
        msgInfo:       "Hola, quiero más información",
    },

    // ─── Contacto (footer) ────────────────────────────────────────────
    contacto: {
        telefono:  "3022274397",
        email:     "davidjuanurrego@gmail.com",
        direccion: "Cra 44 #20 28, El Poblado, Medellín, Antioquia",
    },

    // ─── Visita diagnóstica ─────────────────────────────────────────
    visita: {
        titulo: "¿Qué incluye la visita diagnóstica?",
        resumen: "Revisamos el problema, ubicamos la causa y te entregamos un presupuesto antes de comenzar.",
        precio: "$30.000",
        incluye: [
            "Inspección visual del área afectada",
            "Diagnóstico de la causa y recomendaciones",
            "Presupuesto claro antes de iniciar",
            "Descuento del valor de la visita si realizamos el trabajo",
        ],
    },

    // ─── Redes sociales (iconos superiores y footer) ──────────────────
    redes: {
        facebook:  "https://www.facebook.com/profile.php?id=61568816871985",
        instagram: "https://www.instagram.com/plome_romedellin?igsh=MThpMDJuYzloNTF",
        tiktok:    "https://www.tiktok.com/@juanurrego91",
    },
};
