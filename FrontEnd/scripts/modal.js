//AFFICHAGE DE LA MODALE
  let modal = null;
  const openModal = function (e) {
    e.preventDefault();
    modal = document.querySelector(e.target.getAttribute("href"));
    modal.style.display = null;
    modal.removeAttribute("aria-hidden");
    modal.setAttribute("aria-modal", "true");
    modal.addEventListener("click", closeModal);
    modal.querySelector("#idClose").addEventListener("click", closeModal);
    modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
    document.querySelectorAll(".js-modal").forEach(a => {
      a.style.display = null;
      a.removeEventListener("click", openModal);
      a.addEventListener("click", openModal);
    })
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
  }

  const closeModal = function (e) {
    if (modal === null) return;
    e.preventDefault();
    modal.querySelector("#addPhotoForm").reset();
    const back = document.querySelector("#idBack");
    back.click();
    document.querySelectorAll(".js-modal").forEach(a => {
      a.removeEventListener("click", openModal);
      a.addEventListener("click", openModal);
    })
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
    modal.removeEventListener("click", closeModal);
    modal.querySelector("#idClose").removeEventListener("click", closeModal);
    modal.querySelector("#idAddPhotoBtn").removeEventListener("click", closeModal);
    modal.querySelector(".js-modal-close").removeEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);
    modal.querySelector("#idClose").addEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);
    modal = null;
  }

  // empêche la propagation de l'événement vers les parents
  const stopPropagation = function (e) {
    e.stopPropagation();
  }

  // Fermeture modale après appui sur Esc
  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
      closeModal(e);
    }
 })
