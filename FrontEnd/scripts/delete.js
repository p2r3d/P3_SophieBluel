// Suppression de travaux à partir de l'icône poubelle de la modale
async function fetchDelete(WorkId) {
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
        else { console.log('ok delete!') }
      })
      .catch((error) => {
        console.error(error.message);
      })
  }
}
