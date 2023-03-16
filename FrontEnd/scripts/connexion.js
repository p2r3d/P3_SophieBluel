// lOGIN
// récup des données du formulaire de connexion
const form = document.querySelector("form");
form.addEventListener("submit", async function (event) {
  event.preventDefault();

  // test de l'email
  const msg = document.getElementById("idErrorMsg");
  msg.innerText = "";
  const userLogin = document.getElementById("idEmail").value.trim();
  if (userLogin.length === 0){
    msg.innerText = "L'adresse email est requise";
  }
  const reg = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!reg.test(String(userLogin).toLowerCase())) {
    msg.innerText = "L'adresse email est incorrecte";
    return;
  }
  // test du mot de passe
  const userPwd = document.getElementById("idPwd").value.trim();
  if (userPwd.length === 0) {
    msg.innerText = 'Le mot de passe est incorrect';
    return;
  }
  // on constitue l'objet à envoyer dans le body de la requête
  const user = { "email": userLogin, "password": userPwd };

  // envoi d'une demande  de login au serveur
  await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur lors de la requête serveur");
      }
      return response.json();
    })
    // le token est stocké dans le sessionStorage 
    // puis on redirige vers la page d'accueil
    .then((data) => {
      sessionStorage.setItem("access_token", data.token);
      window.location.href = '../index.html';
    })
    .catch((error) => {
      console.error(error.message);
      msg.innerText = "Erreur lors de la requête serveur";

    })
});

// lOGOUT
const listeLi = document.querySelector("ul");
const loginLi = listeLi.querySelectorAll("li")[2];
if (sessionStorage.getItem("access_token") != null) {
  loginLi.innerText = "logout";
  loginLi.addEventListener("click", function () {
    sessionStorage.clear();
    document.location.reload();
  })
}