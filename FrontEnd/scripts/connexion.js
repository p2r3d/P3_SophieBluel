// lOGIN
// récup des données du formulaire de connexion
const form = document.querySelector("form");
form.addEventListener("submit", async function (event) {
  event.preventDefault();

  // récup email
  const userLogin = document.getElementById("idEmail").value;
  // test de l'email
  const msg = document.getElementById('idErrorMsg');
  msg.innerText = "";
  // test de la validité de l'email ainsi que les éventuelles espaces
  var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!reg.test(String(userLogin).toLowerCase())) {
    msg.innerText = 'Adresse email incorrecte';
    return;
  }
  // récup password
  const userPwd = document.getElementById("idPwd").value;
  if (userPwd.length === 0 || userPwd.trim()==="") {
    msg.innerText = 'Mot de passe incorrect';
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
        // test sur combinaison email/password
        if (response.status === 401 || msg.innerText == "") {
          msg.innerText = "Erreur dans l'identifiant et/ou le mot de passe";
        }
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