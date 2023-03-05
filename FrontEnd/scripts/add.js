async function addWork(works, cat) {

  const loadPhotoBtn = document.getElementById("workAddPhotoInput");
  //loadPhotoBtn.removeEventListener("change", window.loadPhotoFile);

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
    //formData.append("category", 3);

    // envoi d'une demande au serveur
    fetch(`http://localhost:5678/api/works`, {
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
        console.log('ok add!');
        document.querySelector("#addPhotoForm").reset();
        //document.querySelector("addPhotoSubmitBtn").off();
        data.category = {};

        data.category = (cat[parseInt(data.categoryId) - 1]);
        data.categoryId = parseInt(data.categoryId);

        works.push(data);
        console.log(works);
        displayGallery(works);
       // fillModal(works, cat);
        updateWorks(works) ;

        // retour vers modale  mini-galerie


        const idBack = document.querySelector("#idBack");
        idBack.click();
        //const close = document.querySelector("#idClose");
        //close.click();
      })
      .catch((error) => {
        console.error(error.message);
      })
    //    }
  }
}
