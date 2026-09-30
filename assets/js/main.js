/**
 * Plomeros Medellín — interacciones del sitio.
 * Todo el contenido está en el HTML; este archivo solo añade:
 * botón flotante de WhatsApp, menú móvil, fondo de estrellas,
 * animaciones de aparición, paneles, mapa diferido y visor de fotos.
 */
(function () {
    "use strict";

    var WHATSAPP = "573022274397";
    var WA_MSG = "Hola, quiero más información sobre sus servicios de plomería";
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ── Botón flotante de WhatsApp ─────────────────────────────── */
    function renderWhatsApp() {
        var a = document.createElement("a");
        a.className = "wa-fab";
        a.href = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(WA_MSG);
        a.target = "_blank";
        a.rel = "noopener";
        a.setAttribute("aria-label", "Escribir por WhatsApp");
        a.innerHTML =
            '<svg class="i" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';
        document.body.appendChild(a);
    }

    /* ── Menú móvil ─────────────────────────────────────────────── */
    function initNav() {
        var btn = document.querySelector(".nav__toggle");
        var menu = document.getElementById("menu");
        if (!btn || !menu) return;
        function set(open) {
            btn.setAttribute("aria-expanded", String(open));
            btn.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
            menu.classList.toggle("is-open", open);
        }
        btn.addEventListener("click", function () {
            set(btn.getAttribute("aria-expanded") !== "true");
        });
        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape") set(false);
        });
        menu.addEventListener("click", function (e) {
            if (e.target.closest("a")) set(false);
        });
    }

    /* ── Fondo de estrellas ─────────────────────────────────────── */
    function initStars() {
        var canvas = document.getElementById("stars");
        if (!canvas || !canvas.getContext) return;
        var ctx = canvas.getContext("2d");
        var dpr = Math.min(window.devicePixelRatio || 1, 2);
        var w, h, stars = [], shooting = null, nextShoot = 0, raf = 0, scrollY = window.scrollY;

        function build() {
            w = window.innerWidth;
            h = window.innerHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            var count = Math.min(Math.round((w * h) / 5200), w < 768 ? 120 : 260);
            stars = [];
            for (var i = 0; i < count; i++) {
                var depth = Math.random();
                stars.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    r: 0.3 + depth * 1.3,
                    a: 0.35 + Math.random() * 0.6,
                    tw: 0.5 + Math.random() * 2,
                    ph: Math.random() * Math.PI * 2,
                    vy: 0.02 + depth * 0.08,
                    depth: depth
                });
            }
        }

        function draw(t) {
            ctx.clearRect(0, 0, w, h);
            for (var i = 0; i < stars.length; i++) {
                var s = stars[i];
                if (!reduceMotion) {
                    s.y -= s.vy;
                    if (s.y < -4) { s.y = h + 4; s.x = Math.random() * w; }
                }
                var y = (s.y - scrollY * s.depth * 0.08) % h;
                if (y < 0) y += h;
                var alpha = reduceMotion ? s.a : s.a * (0.55 + 0.45 * Math.sin(t / 1000 * s.tw + s.ph));
                ctx.globalAlpha = alpha;
                ctx.fillStyle = "#fff";
                ctx.beginPath();
                ctx.arc(s.x, y, s.r, 0, Math.PI * 2);
                ctx.fill();
                if (s.r > 1.25) {
                    ctx.globalAlpha = alpha * 0.18;
                    ctx.beginPath();
                    ctx.arc(s.x, y, s.r * 3.2, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            if (!reduceMotion) drawShooting(t);
            ctx.globalAlpha = 1;
        }

        function drawShooting(t) {
            if (!shooting && t > nextShoot) {
                shooting = { x: Math.random() * w * 0.8 + w * 0.2, y: Math.random() * h * 0.4, life: 0 };
                nextShoot = t + 6000 + Math.random() * 8000;
            }
            if (!shooting) return;
            shooting.life += 1;
            var p = shooting.life / 55;
            var x = shooting.x - p * 320, y = shooting.y + p * 150;
            var g = ctx.createLinearGradient(x, y, x + 90, y - 42);
            g.addColorStop(0, "rgba(255,255,255,0.9)");
            g.addColorStop(1, "rgba(255,255,255,0)");
            ctx.globalAlpha = 1 - p;
            ctx.strokeStyle = g;
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + 90, y - 42);
            ctx.stroke();
            if (p >= 1) shooting = null;
        }

        function loop(t) {
            draw(t);
            raf = requestAnimationFrame(loop);
        }

        build();
        if (reduceMotion) {
            draw(0);
        } else {
            nextShoot = 3000;
            raf = requestAnimationFrame(loop);
            document.addEventListener("visibilitychange", function () {
                if (document.hidden) cancelAnimationFrame(raf);
                else raf = requestAnimationFrame(loop);
            });
        }
        window.addEventListener("scroll", function () { scrollY = window.scrollY; if (reduceMotion) draw(0); }, { passive: true });
        var rt;
        window.addEventListener("resize", function () {
            clearTimeout(rt);
            rt = setTimeout(function () { build(); if (reduceMotion) draw(0); }, 200);
        });
    }

    /* ── Animación de aparición ─────────────────────────────────── */
    function initReveal() {
        var els = document.querySelectorAll(".reveal");
        if (!("IntersectionObserver" in window) || reduceMotion) {
            els.forEach(function (el) { el.classList.add("is-visible"); });
            return;
        }
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (!e.isIntersecting) return;
                var el = e.target;
                var sib = Array.prototype.indexOf.call(el.parentNode.children, el);
                el.style.transitionDelay = (sib % 4) * 90 + "ms";
                el.classList.add("is-visible");
                io.unobserve(el);
            });
        }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
        els.forEach(function (el) { io.observe(el); });
    }

    /* ── Paneles expandibles ────────────────────────────────────── */
    function initPanels() {
        var panels = document.querySelectorAll(".panel");
        panels.forEach(function (p) {
            function activate() {
                panels.forEach(function (o) { o.classList.remove("is-active"); });
                p.classList.add("is-active");
            }
            p.addEventListener("click", activate);
            p.addEventListener("mouseenter", activate);
            p.addEventListener("focus", activate);
        });
    }

    /* ── Mapa diferido ──────────────────────────────────────────── */
    function initMap() {
        var box = document.querySelector("[data-map]");
        if (!box) return;
        function load() {
            if (box.dataset.loaded) return;
            box.dataset.loaded = "1";
            box.innerHTML = '<iframe src="' + box.dataset.map + '" title="Mapa de cobertura en el Valle de Aburrá" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>';
        }
        box.querySelector("button").addEventListener("click", load);
        if ("IntersectionObserver" in window) {
            var io = new IntersectionObserver(function (e) {
                if (e[0].isIntersecting) { load(); io.disconnect(); }
            }, { rootMargin: "200px" });
            io.observe(box);
        }
    }

    /* ── Visor de fotos ─────────────────────────────────────────── */
    function initLightbox() {
        var links = document.querySelectorAll("[data-lightbox]");
        if (!links.length || typeof HTMLDialogElement !== "function") return;
        var icon = function (d) { return '<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + "</svg>"; };
        var arrow = icon('<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>');
        var dlg = document.createElement("dialog");
        dlg.className = "lightbox";
        dlg.setAttribute("aria-label", "Visor de fotos");
        dlg.innerHTML =
            '<figure class="lightbox__fig"><img alt=""><figcaption></figcaption></figure>' +
            '<button type="button" class="lightbox__close" aria-label="Cerrar">' + icon('<path d="M18 6 6 18"/><path d="m6 6 12 12"/>') + "</button>" +
            '<button type="button" class="lightbox__prev" aria-label="Foto anterior">' + arrow + "</button>" +
            '<button type="button" class="lightbox__next" aria-label="Foto siguiente">' + arrow + "</button>";
        document.body.appendChild(dlg);
        var img = dlg.querySelector("img"), cap = dlg.querySelector("figcaption");
        var group = [], idx = 0;

        function show(i) {
            idx = (i + group.length) % group.length;
            var a = group[idx];
            img.src = a.getAttribute("href");
            img.alt = a.dataset.caption || "";
            cap.textContent = (a.dataset.caption || "") + "  ·  " + (idx + 1) + " / " + group.length;
        }
        links.forEach(function (a) {
            a.addEventListener("click", function (e) {
                e.preventDefault();
                group = Array.prototype.slice.call(document.querySelectorAll('[data-lightbox="' + a.dataset.lightbox + '"]'));
                show(group.indexOf(a));
                dlg.showModal();
            });
        });
        dlg.querySelector(".lightbox__close").addEventListener("click", function () { dlg.close(); });
        dlg.querySelector(".lightbox__prev").addEventListener("click", function () { show(idx - 1); });
        dlg.querySelector(".lightbox__next").addEventListener("click", function () { show(idx + 1); });
        dlg.addEventListener("click", function (e) { if (e.target === dlg || e.target.classList.contains("lightbox__fig")) dlg.close(); });
        dlg.addEventListener("keydown", function (e) {
            if (e.key === "ArrowLeft") show(idx - 1);
            if (e.key === "ArrowRight") show(idx + 1);
        });
        var x0 = null;
        dlg.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
        dlg.addEventListener("touchend", function (e) {
            if (x0 === null) return;
            var dx = e.changedTouches[0].clientX - x0;
            if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1));
            x0 = null;
        });
    }

    /* ── Retirar el service worker de la versión anterior ───────── */
    function removeOldServiceWorker() {
        if (!("serviceWorker" in navigator)) return;
        navigator.serviceWorker.getRegistrations().then(function (regs) {
            regs.forEach(function (r) { r.unregister(); });
        }).catch(function () {});
    }

    renderWhatsApp();
    initNav();
    initStars();
    initReveal();
    initPanels();
    initMap();
    initLightbox();
    removeOldServiceWorker();
})();
