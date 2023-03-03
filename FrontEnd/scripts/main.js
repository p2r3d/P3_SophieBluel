async function fetchWorks() {
  try {
    const response = await fetch("http://localhost:5678/api/works");
    if (!response.ok) {
      throw new Error(`HTTP erreur ${response.status} !`);
    }
    const data = await response.json();
    return data;
  }
  catch (error) {
    console.error(error);
  }
}

fetchWorks().then(works => {
  // AFFICHAGE DU PORTFOLIO
  displayGallery(works);

})
