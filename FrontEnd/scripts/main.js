async function fetchWorks() {
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

fetchWorks().then(worksFetched => {
  // AFFICHAGE DU PORTFOLIO
  if (worksFetched !== []) {
    displayGallery(worksFetched);
  } else {
    alert('pas de travaux dans la base de données');
  }

  // AFFICHAGE DES FILTRES
  async function fetchCategories() {
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

  
  fetchCategories().then(categoriesFetched => {
    // AFFICHAGE DU PORTFOLIO
    if ((worksFetched !== []) && (categoriesFetched !== [])) {
      displayFilters(worksFetched, categoriesFetched);
      // utilisateur connecté
    if (sessionStorage.getItem("access_token")) {
      showWhenConnected(worksFetched, categoriesFetched);
    }
    } else {
      console.log("pas d'affichages car pas de travaux et de catégories");
      showWhenConnected();
    }
    
  })
})


