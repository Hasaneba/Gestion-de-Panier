var util = {
    mobileMenu() {
      $("#nav").toggleClass("nav-visible");
    },
    windowResize() {
      if ($(window).width() > 800) {
        $("#nav").removeClass("nav-visible");
      }
    },
    scrollEvent() {
      var scrollPosition = $(document).scrollTop();
      
      $.each(util.scrollMenuIds, function(i) {
        var link = util.scrollMenuIds[i],
            container = $(link).attr("href"),
            containerOffset = $(container).offset().top,
            containerHeight = $(container).outerHeight(),
            containerBottom = containerOffset + containerHeight;
  
        if (scrollPosition < containerBottom - 20 && scrollPosition >= containerOffset - 20) {
          $(link).addClass("active");
        } else {
          $(link).removeClass("active");
        }
      });
    }
  };
  
  $(document).ready(function() {
    
    util.scrollMenuIds = $("a.nav-link[href]");
    $("#menu").click(util.mobileMenu);
    $(window).resize(util.windowResize);
    $(document).scroll(util.scrollEvent);
    
  });




  // Ajouter cet événement de clic à votre code JavaScript dans "GestionPanier.html"
document.getElementById("logoutLink").addEventListener("click", function(event) {
  // Empêcher le lien de suivre son comportement par défaut
  event.preventDefault();

  // Réaliser l'action de déconnexion ici (par exemple, supprimer les informations de connexion)
  localStorage.removeItem("isLoggedIn");

  // Rediriger l'utilisateur vers la page de connexion après déconnexion
  window.location.href = "LoginPage.html";
});
