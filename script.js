const proposalBanner = document.getElementById("proposalBanner");
const proposalClose = document.getElementById("proposalClose");

proposalClose?.addEventListener("click", () => {
  proposalBanner?.remove();
});
