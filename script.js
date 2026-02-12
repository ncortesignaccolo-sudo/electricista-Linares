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
