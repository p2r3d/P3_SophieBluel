//AFFICHAGE DE LA MODALE

//function createModal() {
  let modal = null;
  //const focusableSelector = "button, a, input, textarea";
  //let focusablesElements = [];
  //let previouslyFocusedElement = null;

  const openModal = function (e) {
    e.preventDefault();
    //alert('createmodal');
    modal = document.querySelector(e.target.getAttribute("href"));
   // focusablesElements = Array.from(modal.querySelectorAll(focusableSelector));
    // on récupère le focus sur l'élément préalablement sélectionné avant l'affichage de la modale
    //previouslyFocusedElement = document.querySelector(":focus");
    modal.style.display = null;
    //focusablesElements[0].focus();
    modal.removeAttribute("aria-hidden");
    modal.setAttribute("aria-modal", "true");
    modal.addEventListener("click", closeModal);
    modal.querySelector("#idClose").addEventListener("click", closeModal);
    modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
    document.querySelectorAll(".js-modal").forEach(a => {
      a.style.display = null;
      //alert('dans create modal remove');
      a.removeEventListener("click", openModal);
      a.addEventListener("click", openModal);
    })
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
  }

  const closeModal = function (e) {
    if (modal === null) return;
    //on remet le focus sur l'élément préalablement sélectionné
    //if (previouslyFocusedElement !== null) previouslyFocusedElement.focus();
    e.preventDefault();
   alert('closemodal');
    document.querySelectorAll(".js-modal").forEach(a => {
      //alert('remove dans closemodal');
      a.removeEventListener("click", openModal);
      a.addEventListener("click", openModal);
    })
    //modal.querySelector('#addPhotoForm').reset(); // Réinitialisation du formulaire
    //modal.querySelector('#addPhotoSubmitBtn').off('submit');
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
    modal.removeEventListener("click", closeModal);
    modal.querySelector("#idClose").removeEventListener("click", closeModal);
    modal.querySelector(".js-modal-close").removeEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);

    // réinitialisation du formulaire d'ajout de projets
    /*modal.querySelector("#addPhotoForm").reset();
    //modal.querySelector("#addPhotoForm").removeEventListener("click",window.addPhoto);
    modal.querySelector("#addPhotoForm").reset();
    modal.querySelector("#thumbnail").style.display = "none";
    modal.querySelector("#divImportPhoto").style.display = "";
    // modal.querySelector("#addPhotoForm").removeEventListener("click", window.returnBack);
    //modal.querySelector("#addPhotoForm").removeEventListener("click", openModal);
    //document.querySelector("#workAddPhotoInput").removeEventListener("change", window.displayThumbnail);
    const links = document.getElementsByClassName("modifyLink");
    for (let link of links) {
      console.log('dans closeModal, link added');

      link.addEventListener("click", openModal);
    }*/
    modal.querySelector("#idClose").addEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);
    modal = null;
  }

 /* const focusInModal = function (e) {
    e.preventDefault();
    //console.log(focusablesElements);
    // renvoi de l'élément qui a le focus
    let index = focusablesElements.findIndex(f => f === modal.querySelector(":focus"));
    //debugger;
    // si appui sur shift tab, le focus est sur l'élément précédent
    if (e.shiftkey === true) {
      index--;
    } else {
      index++;
    }
    if (index >= focusablesElements.length) {
      index = 0
    }
    if (index < 0) {
      index = focusablesElements.length - 1;
    }
    focusablesElements[index].focus();
  }*/

  // empêche la propagation de l'événement vers les parents
  const stopPropagation = function (e) {
    e.stopPropagation();
  }

  // Fermeture modale après appui sur Esc
  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
      closeModal(e);
    }
    /*if (e.key === "Tab" || modal !== null) {
      focusInModal(e);
    }*/
  })

  /*document.querySelectorAll(".js-modal").forEach(a => {
    a.style.display = null;
    alert('lien vers open modale');
    a.addEventListener("click", openModal);
  })*/

