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
        activarTrackeo: true,           // true = medir clics en WhatsApp · false = sin Google Ads en el sitio
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
        telefono:  "3148137618",
        email:     "davidjuanurrego@gmail.com",
        direccion: "Cra 44 #20 28, El Poblado, Medellín, Antioquia",
    },

    // ─── Redes sociales (iconos superiores y footer) ──────────────────
    redes: {
        facebook:  "https://www.facebook.com/profile.php?id=61568816871985",
        instagram: "https://www.instagram.com/plome_romedellin?igsh=MThpMDJuYzloNTF",
        tiktok:    "http://tiktok.com/@juanurrego91?_r=1&_t=ZS-96OVMl4mVFM",
    },
};
