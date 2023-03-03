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
