// CREATION D'UN ELEMENT HTML
function createElement(tagName, classes = []) {
  const element = document.createElement(tagName);
  if (classes.length > 0) {
    element.classList.add(...classes); // ... spread opérator, décompose le tableau en liste d'éléments individuels
  }
  return element;
}

// AFFICHAGE DE LA GALERIE
function displayGallery(worksSent) {
  document.querySelector(".gallery").innerHTML = "";
  const categoriesNames = new Set();

  // récup des catégories dans l'objet Set
  for (let i in worksSent) {
    let workSenti = worksSent[i];
    const workCard = createElement("figure");
    document.querySelector(".gallery").appendChild(workCard);

    // affichage de l'image
    const workImg = createElement("img", ["cardImg"]);
    workCard.appendChild(workImg);
    workImg.setAttribute("crossorigin", "anonymous");
    workImg.src = workSenti.imageUrl;

    // affichage du titre de l'image
    const workTitle = createElement("figcaption", ["cardfigcaption"]);
    workCard.appendChild(workTitle);
    workTitle.innerText = workSenti.title;

    // récup de la catégorie pour l'affichage ultérieur des filtres
    categoriesNames.add(workSenti.category.name);
  }
  // renvoi des catégories pour l'affichage des filtres
  return (categoriesNames);
}


// AFFICHAGE DES FILTRES
function displayFilters(works, categories) {
  document.querySelector(".btn").innerHTML = "";

  const portfolio = document.getElementById("portfolio");

  // conteneur filtres rattaché au portfolio
  const filtersContainer = createElement("div", ["filters"]);
  const ngallery = document.getElementsByClassName("gallery")[0];
  portfolio.insertBefore(filtersContainer, ngallery);

  // ajout du bouton "Tous"
  const btnAll = createElement("button", ["btn", "SelectedFilter"]);
  btnAll.setAttribute("id","IdBtnAll");
  btnAll.innerText = "Tous";
  filtersContainer.appendChild(btnAll);
  btnAll.addEventListener("click", function () {
    displayGallery(works);
    updateFilterBtn(btnAll);
  })

  // affichage des boutons de filtre
  for (let categoryName of categories) {
    const catButton = createElement("button", ["btn"]);
    catButton.innerText = categoryName.name;
    filtersContainer.appendChild(catButton);

    catButton.addEventListener("click", function () {
      const FilteredWorks = works.filter(work => work.category.name == categoryName.name);
      displayGallery(FilteredWorks);
      updateFilterBtn(catButton);
    });
  }
}

// MISE A JOUR DE L'APPARENCE DES BOUTONS FILTRES
function updateFilterBtn(filterBtn) {
  const filters = document.getElementsByClassName("btn");
  for (i = 0; i < filters.length; i++) {
    filters[i].classList.remove("SelectedFilter");
  }
  filterBtn.classList.add("SelectedFilter");
}

// AFFICHAGE QUAND CONNECTÉ
function showWhenConnected(worksFetched, categoriesFetched) {
  if ((worksFetched !== []) && (categoriesFetched !== [])) {
    const filters = document.getElementsByClassName("filters");
    filters[0].classList.add("hidden");
    const headBand = document.getElementsByClassName("divheadband");
    headBand[0].style.display = null;
    //remplissage modale
    fillModal(worksFetched, categoriesFetched);
  }
  document.querySelectorAll(".js-modal").forEach(a => {
    a.style.display = null;
    a.removeEventListener("click", openModal);
    a.addEventListener("click", openModal);
  })
}

// Affichage de l'état de l'authentification (login/logout) dans la barre de navigation
const listeLi = document.querySelector("ul");
const loginLi = listeLi.querySelectorAll("li")[2];

if (sessionStorage.getItem("access_token") != null) {
  loginLi.innerText = "logout";
  loginLi.addEventListener("click", function () {
    sessionStorage.clear();
    document.location.reload();
  })
}

// REMPLISSAGE DE LA MODALE
function fillModal(worksSent, categories) {
  document.querySelector(".idPhotosGallery").innerHTML = "";

  // titre de la modale
  document.querySelector("#modalTitle").innerText = "Galerie photos";

  // seule l'icône de fermeture apparait et se loge à droite
  document.querySelector("#idBack").style.display = "none";
  document.querySelector("#divIcones").style.justifyContent = "right";

  // si appui sur icône de retour
  const back = document.querySelector("#idBack");
  back.addEventListener("click", returnBack);
  function returnBack(e) {
    e.preventDefault();
    document.querySelector("#addPhotoForm").reset();
    document.querySelector("#idBack").style.display = "none";
    document.querySelector("#divIcones").style.justifyContent = "right";
    document.querySelector("#addPhotoForm").style.display = "none";
    document.querySelector(".idPhotosGallery").style.display = "";
    document.querySelector("#idAddPhotoBtn").style.display = "";
    document.querySelector("#idDeleteGallery").style.display = "";
    document.querySelector("#modalTitle").innerText = "Galerie photos";
    back.addEventListener("click", returnBack);
    AddPhotoBtn.addEventListener("click", openAddPhotoForm);
  }

  // galerie de thumbnails
  for (let i in worksSent) {
    let workSenti = worksSent[i];
    const workCard = createElement("figure");
    workCard.classList.add("workCard");
    document.querySelector(".idPhotosGallery").appendChild(workCard);

    // affichage de chaque image
    const workImg = createElement("img", ["cardImg"]);
    workImg.setAttribute("crossorigin", "anonymous");
    workImg.src = workSenti.imageUrl;
    workCard.appendChild(workImg);

    // affichage du titre de l'image
    const workTitle = createElement("figcaption");
    workTitle.innerText = "éditer";
    workTitle.style.color = "#000000";
    workCard.appendChild(workTitle);

    // affichage de la poubelle sur chacune des images
    const trashImg = createElement("i", ["idDivTrash"]);
    trashImg.classList.add("fa-solid", "fa-trash-can");

    // si clic sur la poubelle 
    trashImg.addEventListener("click", function (e) {
      e.preventDefault();
      workCard.style.display = "none";
      fetchDelete(workSenti.id);
      // on enlève le work de la liste 
      let WorkToDelete = worksSent.find(objet => objet.id === workSenti.id);
      let indexToDelete = worksSent.indexOf(WorkToDelete);
      worksSent.splice(indexToDelete, 1);
      displayGallery(worksSent);
      // mise à jour de la barre des filtres
      updateFilterBtn(document.querySelector("#IdBtnAll"));
    })
    workCard.appendChild(trashImg);
  }
  // affichage de l'icône de déplacement sur la 1ère photo lorsque la galerie n'est pas vide !
  if (worksSent.length !== 0) {
    const card = document.querySelectorAll(".workCard");
    const movingImg = createElement("i", ["idDivMoving"]);
    movingImg.classList.add("fa-solid", "fa-arrows-up-down-left-right");
    card[0].appendChild(movingImg);
  } 

  // bouton ouvrant le formulaire "ajout de photos"
  const AddPhotoBtn = document.querySelector("#idAddPhotoBtn");
  AddPhotoBtn.addEventListener("click", openAddPhotoForm);

  // partie "ajout photo" de la modale
  function openAddPhotoForm(e) {
    e.preventDefault();
    AddPhotoBtn.removeEventListener("click", openAddPhotoForm);
    // affichage du formulaire
    document.querySelector("#addPhotoForm").reset();
    document.querySelector("#thumbnail").style.display = "none";
    document.querySelector("#divImportPhoto").style.display = null;
    document.querySelector("#miniPhoto").style.display = null;
    document.querySelector("#miniPhoto").src = "";
    document.querySelector("#workAddPhotoInput").innerHTML = "";
    document.querySelector("#thumbnail").src = "";
    document.querySelector("#modalTitle").innerText = "Ajout photo";
    document.querySelector(".idPhotosGallery").style.display = "none";
    document.querySelector("#idAddPhotoBtn").style.display = "none";
    document.querySelector("#idDeleteGallery").style.display = "none";
    document.querySelector("#addPhotoForm").style.display = null;
    document.querySelector("#idBack").style.display = null;
    document.querySelector("#divIcones").style.justifyContent = "space-between";
    document.getElementById("line1").style.display = "none";


    //  chargement du thumbnail
    const loadPhotoBtn = document.getElementById("workAddPhotoInput");
    loadPhotoBtn.addEventListener("change", loadPhotoFile);
    function loadPhotoFile(e) {
      e.preventDefault();
      let file = null;
      file = e.target.files[0];
      document.querySelector("#photoWeight").innerText = "jpg, png : 4mo max";
      document.querySelector("#photoWeight").style.color = "";
      if (file.size <= 4 * 1024 * 1024) {
        document.querySelector("#thumbnail").style.display = "";
        const inputPhoto = document.getElementById("miniPhoto");
        inputPhoto.style.display = "";
        inputPhoto.src = URL.createObjectURL(file);

        const divImportPhoto = document.querySelector("#divImportPhoto");
        divImportPhoto.style.display = "none";
        loadPhotoBtn.removeEventListener("change", loadPhotoFile);
        loadPhotoBtn.addEventListener("change", loadPhotoFile);

      } else {
        console.log('Le fichier est supérieur à 4 Mo');
        file=null;
        loadPhotoBtn.removeEventListener("change", loadPhotoFile);
        loadPhotoBtn.addEventListener("change", loadPhotoFile);
        document.querySelector("#photoWeight").innerText="la taille du fichier doit être inférieure à 4 Mo";
        document.querySelector("#photoWeight").style.color="red";
      } 
    }
    AddPhotoBtn.addEventListener("click", openAddPhotoForm);
  }
  // remplissage de la liste déroulante des catégories
  const selectCategories = document.querySelector("#photoCategories");
  for (let category of categories) {
    let catOption = createElement("option", ["photoCategory"]);
    catOption.innerText = category.name;
    catOption.setAttribute("id", parseInt(category.id))
    selectCategories.appendChild(catOption);
  }
  // validation du formulaire
  const addPhotoForm = document.querySelector("#addPhotoForm");
  addPhotoForm.addEventListener('submit', function (e) {
    e.preventDefault();
    addWork(worksSent, categories);
    addPhotoForm.removeEventListener('submit', function (e) { })
    addPhotoForm.addEventListener('submit', function (e) { })
  })

  // suppression de la galerie
  const deleteGallery = document.querySelector("#idDeleteGallery");
  deleteGallery.addEventListener("click", function (e) {
    e.preventDefault();
    if (confirm("Voulez-vous vraiment supprimer l'ensemble de la galerie?")) {
      for (j in worksSent) {
        fetchDelete(parseInt(worksSent[j].id));
      }
      worksSent = [];
      document.querySelector("#modalTitle").innerText = "La galerie est vide";
      updateWorks();
      document.querySelector(".gallery").innerHTML = "";
      document.querySelector("#idDeleteGallery").style.display = "none";
      document.querySelector(".filters").style.display = "none";    
    }
  })
}
// mise à jour de l'ajout ou de la suppression de travaux
function updateWorks(worksSent) {
  if (typeof worksSent !== "undefined") {
    document.querySelector(".idPhotosGallery").innerHTML = "";

    // galerie de thumbnails
    for (let i in worksSent) {
      let workSenti = worksSent[i];
      const workCard = createElement("figure");
      workCard.classList.add("workCard");
      document.querySelector(".idPhotosGallery").appendChild(workCard);

      // affichage de chaque image
      const workImg = createElement("img", ["cardImg"]);
      workImg.setAttribute("crossorigin", "anonymous");
      workImg.src = workSenti.imageUrl;
      workCard.appendChild(workImg);

      // affichage du titre de l'image
      const workTitle = createElement("figcaption");
      workTitle.innerText = "éditer";
      workTitle.style.color = "#000000";
      workCard.appendChild(workTitle);

      // affichage de la poubelle sur chacune des images
      const trashImg = createElement("i", ["idDivTrash"]);
      trashImg.classList.add("fa-solid", "fa-trash-can");

      // si clic sur la poubelle 
      trashImg.addEventListener("click", function (e) {
        e.preventDefault();
        //trashImg.removeEventListener("click", function(e) {});
        workCard.style.display = "none";
        fetchDelete(workSenti.id);
        // on enlève le work de la liste 
        let WorkToDelete = worksSent.find(objet => objet.id === workSenti.id);
        let indexToDelete = worksSent.indexOf(WorkToDelete);
        worksSent.splice(indexToDelete, 1);
        displayGallery(worksSent);
      })
      workCard.appendChild(trashImg);
    }
    // affichage de l'icône de déplacement sur la 1ère photo
    const card = document.querySelectorAll(".workCard");
    const movingImg = createElement("i", ["idDivMoving"]);
    movingImg.classList.add("fa-solid", "fa-arrows-up-down-left-right");
    card[0].appendChild(movingImg);
  }
  else {
    document.querySelector(".idPhotosGallery").innerHTML = "";
  }
}