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
  // on cache les liens modifier et le bandeau
  //hideWhenNotConnected();

  const categoriesNames = new Set();
  // affichage des travaux : image + titre

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
  const portfolio = document.getElementById("portfolio");

  // conteneur filtres rattaché au portfolio
  const filtersContainer = createElement("div", ["filters"]);
  const ngallery = document.getElementsByClassName("gallery")[0];
  portfolio.insertBefore(filtersContainer, ngallery);

  // ajout du bouton "Tous"
  const btnAll = createElement("button", ["btn", "SelectedFilter"]);
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
