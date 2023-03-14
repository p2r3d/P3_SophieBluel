import { displayGallery, updateFilterBtn, updateWorks, displayFilters } from './index.js';

export async function fetchWorks() {
  try {
    const response = await fetch("http://localhost:5678/api/works");
    if (!response.ok) {
      throw new Error(`HTTP erreur ${response.status} !`);
    }
    const works = await response.json();
    return works;
  }
  catch (error) {
    console.error(error);
  }
}

export async function fetchCategories() {
  try {
    const response = await fetch("http://localhost:5678/api/categories");
    if (!response.ok) {
      throw new Error(`HTTP erreur ${response.status} !`);
    }
    const categories = await response.json();
    return categories;
  }
  catch (error) {
    console.error(error);
  }
}

export async function FetchAddWork(works, cat) {
  const token = sessionStorage.getItem("access_token");
  if (sessionStorage.getItem("access_token") != null) {
    // Création de l'objet formData
    let formData = new FormData();
    const inputPhotoBtn = document.querySelector("#workAddPhotoInput");
    formData.append("image", inputPhotoBtn.files[0]);
    formData.append("title", document.querySelector("#idTitleAddPhoto").value);
    const opt = document.querySelector("#photoCategories");
    const optId = parseInt(opt.selectedOptions[0].id);
    formData.append("category", parseInt(optId));

    // envoi d'une demande au serveur
    await fetch(`http://localhost:5678/api/works`, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: formData
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la requête serveur");
        }
        const data = response.json();
        return data;
      })
      .then(data => {
        // ajout de l'identifiant de la catégorie dans le nouveau projet
        data.category = {};
        data.category = (cat[parseInt(data.categoryId) - 1]);
        data.categoryId = parseInt(data.categoryId);
        works.push(data);
        // Affichage de la galerie
        displayGallery(works);
        // mise à jour de la barre des filtres
        if (works.length === 1) {
          displayFilters(works, cat);
          document.location.reload();
        }
        updateFilterBtn(document.querySelector("#IdBtnAll"));
        //Affichage dans la mini-galerie
        updateWorks(works);
        // retour vers modale  mini-galerie
        const idBack = document.querySelector("#idBack");
        idBack.click();
      })
      .catch((error) => {
        console.error(error.message);
      })
  }
}

// Suppression de travaux à partir de l'icône poubelle de la modale
export async function fetchDeleteWork(WorkId) {
  const token = sessionStorage.getItem("access_token");
  if (sessionStorage.getItem("access_token") != null) {
    // envoi d'une demande au serveur
    fetch(`http://localhost:5678/api/works/${WorkId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la requête serveur");
        }
        // mise à jour de la barre des filtres
        updateFilterBtn(document.querySelector("#IdBtnAll"));
      })
      .catch((error) => {
        console.error(error.message);
      })
  }
}
