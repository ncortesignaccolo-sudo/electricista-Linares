// Helpers
const qs = (s, el = document) => el.querySelector(s);
const qsa = (s, el = document) => [...el.querySelectorAll(s)];

// Banner close
(() => {
  const banner = qs("#proposalBanner");
  const close = qs("#proposalClose");
  if (!banner || !close) return;

  const key = "demo_banner_closed";
  if (localStorage.getItem(key) === "1") {
    banner.style.display = "none";
    return;
  }

  close.addEventListener("click", () => {
    banner.style.display = "none";
    localStorage.setItem(key, "1");
  });
})();

// Mobile nav toggle
(() => {
  const btn = qs("#navToggle");
  const nav = qs("#mobileNav");
  if (!btn || !nav) return;

  btn.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });

  qsa("#mobileNav a").forEach(a => {
    a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
    });
  });
})();

// Reveal on scroll
(() => {
  const items = qsa(".reveal");
  if (!items.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach(el => io.observe(el));
})();

// Horario "abierto/cerrado"
(() => {
  const el = qs("#estado-horario");
  const elHero = qs("#estado-horario-hero");
  const now = new Date();

  // 0 domingo, 6 sábado
  const day = now.getDay();
  const minutes = now.getHours() * 60 + now.getMinutes();

  const inRange = (m, a, b) => m >= a && m <= b;

  // Horarios (minutos)
  const LV_1 = [9 * 60, 13 * 60 + 30];
  const LV_2 = [16 * 60 + 30, 20 * 60];
  const SA = [9 * 60, 13 * 60 + 30];

  let abierto = false;

  if (day >= 1 && day <= 5) {
    abierto = inRange(minutes, LV_1[0], LV_1[1]) || inRange(minutes, LV_2[0], LV_2[1]);
  } else if (day === 6) {
    abierto = inRange(minutes, SA[0], SA[1]);
  } else {
    abierto = false;
  }

  const paint = (node) => {
    if (!node) return;
    node.innerHTML = `
      <span class="status-dot"></span>
      ${abierto ? "Abierto ahora" : "Cerrado ahora"}
    `;
    node.classList.toggle("abierto", abierto);
    node.classList.toggle("cerrado", !abierto);
  };

  // Hero uses plain text inside badge
  if (elHero) elHero.textContent = abierto ? "Abierto ahora" : "Cerrado ahora";

  paint(el);
})();
