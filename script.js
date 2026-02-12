const proposalBanner = document.getElementById("proposalBanner");
const proposalClose = document.getElementById("proposalClose");

proposalClose?.addEventListener("click", () => {
  proposalBanner?.remove();
});
// Scroll reveal (sutil)
const els = document.querySelectorAll('.card, .review, .section h2, .section p.muted, .cta-box');

els.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting){
      e.target.classList.add('is-visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

els.forEach(el => io.observe(el));
function comprobarHorario() {
  const ahora = new Date();
  const dia = ahora.getDay(); // 0 = domingo
  const hora = ahora.getHours();
  const minutos = ahora.getMinutes();
  const horaActual = hora + minutos / 60;

  let abierto = false;

  if (dia >= 1 && dia <= 5) {
    // Lunes a viernes
    if ((horaActual >= 9 && horaActual < 13.5) || (horaActual >= 16.5 && horaActual < 20)) {
      abierto = true;
    }
  } else if (dia === 6) {
    // Sábado
    if (horaActual >= 9 && horaActual < 13.5) {
      abierto = true;
    }
  }

  const estado = document.getElementById("estado-horario");

  if (abierto) {
    estado.innerHTML = "🟢 Abierto ahora";
    estado.style.color = "#22c55e";
  } else {
    estado.innerHTML = "🔴 Cerrado ahora";
    estado.style.color = "#ef4444";
  }
}

comprobarHorario();
