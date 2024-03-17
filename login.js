document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    
    // Vérifiez les informations de connexion ici (par exemple, avec une vérification côté serveur)
    // Pour cet exemple, on utilisera une vérification factice
    if (username === "admin" && password === "password") {
      // Enregistrement de l'état de connexion dans le stockage local
      localStorage.setItem("isLoggedIn", true);
      // Redirection vers la page de votre site après connexion réussie
      window.location.href = "projet.html";
    } else {
      alert("Nom d'utilisateur ou mot de passe incorrect");
    }
  });