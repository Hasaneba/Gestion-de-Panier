function validationForm() {
    var nomProduit = document.getElementById("nomProduit").value;
    var Description = document.getElementById("Description").value;
    var Prix = document.getElementById("Prix").value;
    var image = document.getElementById("image").value;

    if (!nomProduit) {
        alert("Name is required!");
        return false;
    }
    if (!Description) {
        alert("Email is required!");
        return false;
    }
    if (!Prix) {
        alert("Age is required!");
        return false;
    }
    if (!image) {
        alert("image required!");
        return false;
    }
    return true;
}

function showData() {
    var userList;
    if (localStorage.getItem('userList') == null) {
        userList = [];
    } else {
        userList = JSON.parse(localStorage.getItem('userList'));
    }

    var html = "";

    userList.forEach((element, index) => {
        html += "<tr>";
        html += "<td><img src='" + element.image + "' width='50'></td>"; 
        html += "<td>" + element.Description + "</td>";
        html += "<td>" + element.Prix + "</td>";
        html += "<td>" + element.nomProduit + "</td>";

        html += `<td> 
        <button class="btn btn-danger" onclick="deleteData(${index})">
            Delete
        </button>
        <button class="btn btn-warning m-2" onclick="updateData(${index})">
            Edit
        </button>
        <button onclick="deplacerVersPanier(${index})">Deplacer vers le panier</button>
        </html>
        
        </td>`;
        html += "</tr>";

    });

    var crudTable = document.querySelector("#crudtable");
    if (crudTable) {
        crudTable.innerHTML = html;
    } else {
        console.error("L'élément avec l'ID 'crudtable' n'a pas été trouvé dans le document.");
    }
    
}

window.onload = showData();




function AddData() {
    if (validationForm() == true) {
        var nomProduit = document.getElementById("nomProduit").value;
        var Description = document.getElementById("Description").value;
        var Prix = document.getElementById("Prix").value;
        var image = document.getElementById("image").files[0]; // Récupère le fichier image téléchargé par l'utilisateur

        var userList;
        if (localStorage.getItem('userList') == null) {
            userList = [];
        } else {
            userList = JSON.parse(localStorage.getItem('userList'));
        }

        // Crée un objet FileReader pour lire les données de l'image
        var reader = new FileReader();
        reader.onload = function(event) {
            var imageData = event.target.result; // Récupère les données de l'image sous forme de base64
            
            userList.push({
                nomProduit:  nomProduit,
                Description: Description,
                Prix: Prix,
                image: imageData // Stocke les données de l'image dans l'objet utilisateur
            });

            localStorage.setItem('userList', JSON.stringify(userList));
            showData();

            var alertBox = document.getElementById("alertBox");
            alertBox.innerHTML = "<div>Produit ajouter avec succès !</div>";
            alertBox.style.display = "block";

            // Cacher l'alerte après quelques secondes (par exemple, 3 secondes)
            setTimeout(function() {
                alertBox.style.display = "none";
            }, 5000);

            document.getElementById("nomProduit").value = "";
            document.getElementById("Description").value = "";
            document.getElementById("Prix").value = "";
            document.getElementById("image").value = ""; // Efface l'input file pour permettre de sélectionner une nouvelle image
        };

        // Si une image est sélectionnée
        if (image) {
            // Lit les données de l'image sous forme de base64
            reader.readAsDataURL(image);
        } else {
            // Sinon, stocke une valeur nulle dans l'objet utilisateur
            userList.push({
                nomProduit:nomProduit,
                Description:Description ,
                Prix:Prix,
                image: null // Ajustez cela en fonction de vos besoins, par exemple: "image: 'chemin/par/défaut.png'"
            });

            localStorage.setItem('userList', JSON.stringify(userList));
            showData();
            var alertBox = document.getElementById("alertBox");
            alertBox.innerHTML = "<div>Produit ajouter avec succès !</div>";
            alertBox.style.display = "block";

            // Cacher l'alerte après quelques secondes (par exemple, 3 secondes)
            setTimeout(function() {
                alertBox.style.display = "none";
            }, 3000);

            document.getElementById("nomProduit").value = "";
            document.getElementById("Description").value = "";
            document.getElementById("Prix").value = "";
            document.getElementById("image").value = ""; // Efface l'input file pour permettre de sélectionner une nouvelle image
        }
    }
}






function deleteData(index) {
    var userList;
    if (localStorage.getItem('userList') == null) {
        userList = [];
    } else {
        userList = JSON.parse(localStorage.getItem('userList'));
    }
    userList.splice(index, 1);

    localStorage.setItem('userList', JSON.stringify(userList))
    showData();
    var alertBox = document.getElementById("sup");
    alertBox.innerHTML = "<div>Produit supprimer avec succes !</div>";
    alertBox.style.display = "block";

    // Cacher l'alerte après quelques secondes (par exemple, 3 secondes)
    setTimeout(function() {
        alertBox.style.display = "none";
    }, 3000);

}


function updateData(index) {
    var userList = JSON.parse(localStorage.getItem('userList')) || [];

    document.getElementById("submit").style.display = 'none';
    document.getElementById("update").style.display = 'block';

    var user = userList[index];

    document.getElementById("nomProduit").value = user.nomProduit;
    document.getElementById("Description").value = user.Description;
    document.getElementById("Prix").value = user.Prix;

    document.querySelector("#update").onclick = function () {
        userList[index] = {
            nomProduit: document.getElementById("nomProduit").value,
            Description: document.getElementById("Description").value,
            Prix: document.getElementById("Prix").value,
            image: user.image // conserver l'image existante par défaut
        };

        var image = document.getElementById("image").files[0];
        if (image) {
            var reader = new FileReader();
            reader.onload = function(event) {
                userList[index].image = event.target.result;
                localStorage.setItem('userList', JSON.stringify(userList));
                showData();
            };
            reader.readAsDataURL(image);
        } else {
            localStorage.setItem('userList', JSON.stringify(userList));
            showData();
        }

        document.getElementById("submit").style.display = 'block';
        document.getElementById("update").style.display = 'none';
        document.getElementById("nomProduit").value = "";
        document.getElementById("Description").value = "";
        document.getElementById("Prix").value = "";
        document.getElementById("image").value = "";
    }
}


/*

function updateData(index) {
    document.getElementById("submit").style.display = 'none';
    document.getElementById("update").style.display = 'block';

    var userList;
    if (localStorage.getItem('userList') == null) {
        userList = [];
    } else {
        userList = JSON.parse(localStorage.getItem('userList'));
    }

    document.getElementById("name").value = userList[index].name;
    document.getElementById("email").value = userList[index].email;
    document.getElementById("age").value = userList[index].age;
    document.getElementById("address").value = userList[index].address;


    document.querySelector("#update").onclick = function () {
        userList[index].name = document.getElementById("name").value;
        userList[index].email = document.getElementById("email").value;
        userList[index].age = document.getElementById("age").value;
        userList[index].address = document.getElementById("address").value;

        localStorage.setItem('userList', JSON.stringify(userList))
        showData();

        document.getElementById("submit").style.display = 'block';
        document.getElementById("update").style.display = 'none';
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("age").value = "";
        document.getElementById("address").value = "";
    }
}
*/




/*
function deplacerVersPanier(index) {
    // Récupérer les données de l'élément sélectionné dans la table produit
    var productList = JSON.parse(localStorage.getItem('userList')) || [];
    var selectedProduct = productList[index];
    
    // Ajouter les données à la table panier
    var panierList = JSON.parse(localStorage.getItem('panierList')) || [];
    panierList.push(selectedProduct);
    localStorage.setItem('panierList', JSON.stringify(panierList));
    
    // Supprimer l'élément de la table produit
    productList.splice(index, 1);
    localStorage.setItem('userList', JSON.stringify(productList));
    
    // Actualiser la table produit
    showData();
    
    // Rediriger vers la page du panier
    window.location.href = "GestionPanier.html"; // Remplacez "page_panier.html" par le chemin de votre page panier
}
*/



function deplacerVersPanier(index) {
    // Récupérer les données de l'élément sélectionné dans la table produit
    var productList = JSON.parse(localStorage.getItem('userList')) || [];
    var selectedProduct = productList[index];
    
    // Vérifier les données sélectionnées
    console.log('Selected Product:', selectedProduct);
    
    // Ajouter les données à la table panier
    var panierList = JSON.parse(localStorage.getItem('panierList')) || [];
    
    // Vérifier les données existantes dans le panier avant l'ajout
    console.log('Existing Panier List:', panierList);
    
    // Vérifier si panierList est bien un tableau, sinon initialiser un tableau vide
    if (!Array.isArray(panierList)) {
        panierList = [];
    }
    
    panierList.push(selectedProduct);
    localStorage.setItem('panierList', JSON.stringify(panierList));
    
    // Vérifier si les données sont correctement ajoutées au panier
    console.log('Updated Panier List:', panierList);
    
    // Supprimer l'élément de la table produit
    productList.splice(index, 1);
    localStorage.setItem('userList', JSON.stringify(productList));
    
    // Actualiser la table panier
     // Correction : appeler showCart() pour actualiser le panier
   
    // Rediriger vers la page du panier
    showData();
    // window.location.href = "GestionPanier.html"; // Remplacez "GestionPanier.html" par le chemin de votre page panier

}

/*

function deplacerVersPanier(index) {
    // Récupérer les données de l'élément sélectionné dans la table produit
    var productList = JSON.parse(localStorage.getItem('userList')) || [];
    var selectedProduct = productList[index];
    
    // Vérifier les données sélectionnées
    console.log('Selected Product:', selectedProduct);
    
    // Ajouter les données à la table panier
    var panierList = JSON.parse(localStorage.getItem('panierList')) || [];
    
    // Vérifier les données existantes dans le panier avant l'ajout
    console.log('Existing Panier List:', panierList);
    
    panierList.push(selectedProduct);
    localStorage.setItem('panierList', JSON.stringify(panierList));
    
    // Vérifier si les données sont correctement ajoutées au panier
    console.log('Updated Panier List:', panierList);
    
    // Supprimer l'élément de la table produit
    productList.splice(index, 1);
    localStorage.setItem('userList', JSON.stringify(productList));
    
    // Actualiser la table panier
    showData() // Correction : appeler showCart() pour actualiser le panier

    showCart()
    
    // Rediriger vers la page du panier
    //window.location.href = "GestionPanier.html"; // Remplacez "page_panier.html" par le chemin de votre page panier
}
*/







function showData(page = 1, itemsPerPage = 1, searchTerm = '') {
    var userList = JSON.parse(localStorage.getItem('userList')) || [];
    
    // Filter data based on searchTerm
    var filteredList = userList.filter(user => {
        return user.nomProduit.toLowerCase().includes(searchTerm.toLowerCase()) || user.Description.toLowerCase().includes(searchTerm.toLowerCase());
    });

    // Calculate pagination values
    var startIndex = (page - 1) * itemsPerPage;
    var endIndex = startIndex + itemsPerPage;
    var paginatedList = filteredList.slice(startIndex, endIndex);

    var html = "";
    paginatedList.forEach((element, index) => {
        html += "<tr>";
        html += "<td><img src='" + element.image + "' width='50'></td>"; 
        html += "<td>" + element.Description + "</td>";
        html += "<td>" + element.Prix + "</td>";
        html += "<td>" + element.nomProduit + "</td>";
        html += `<td> 
        <button class="btn btn-danger" onclick="deleteData(${index})">
            Delete
        </button>
        <button class="btn btn-warning m-2" onclick="updateData(${page},${index})">
            Edit
        </button>
        <button onclick="deplacerVersPanier(${index})">Deplacer vers le panier</button>
        </td>`;
        html += "</tr>";
    });

    var crudTable = document.querySelector("#crudtable");
    if (crudTable) {
        crudTable.innerHTML = html;
    } else {
        console.error("L'élément avec l'ID 'crudtable' n'a pas été trouvé dans le document.");
    }

    // Update pagination
    var pagination = document.getElementById('pagination');
    var pageCount = Math.ceil(filteredList.length / itemsPerPage);
    pagination.innerHTML = "";
    for (let i = 1; i <= pageCount; i++) {
        var li = document.createElement('li');
        var a = document.createElement('a');

// Ajout du contenu HTML à l'intérieur de l'élément 'a'
       // a.href = "#";
        a.textContent = i;
      /*  if (i === page) {
            li.classList.add('active');
        }*/
        a.addEventListener('click', function() {
            showData(i, itemsPerPage, searchTerm);
        });
       
        li.appendChild(a);
        pagination.appendChild(li);
    }
     var previousLink = document.createElement("a");
previousLink.href = "#";
previousLink.innerHTML = "&laquo;";
pagination.insertBefore(previousLink, pagination.firstChild);

// Ajout de l'élément 'a' avec le contenu '»' pour la pagination suivante
var nextLink = document.createElement("a");
nextLink.href = "#";
nextLink.innerHTML = "&raquo;";
pagination.appendChild(nextLink);
}

/*
// Initial data load
window.onload = function() {
    showData();
}*/

// Function to handle search/filter
function filterData() {
    var searchTerm = document.getElementById('search').value;
    showData(1, 1, searchTerm);
}


// affichage 
function updateData(page, index) {
    var userList = JSON.parse(localStorage.getItem('userList')) || [];
    var itemsPerPage = 1; // Le nombre d'éléments par page

    // Calculer l'index global dans la liste complète en fonction de la page et de l'index sur la page
    var globalIndex = (page - 1) * itemsPerPage + index;
    
    // Vérifier que l'index global est valide
    if (globalIndex < userList.length) {
        document.getElementById("submit").style.display = 'none';
        document.getElementById("update").style.display = 'block';

        var user = userList[globalIndex];

        document.getElementById("nomProduit").value = user.nomProduit;
        document.getElementById("Description").value = user.Description;
        document.getElementById("Prix").value = user.Prix;

        document.querySelector("#update").onclick = function () {
            userList[globalIndex] = {
                nomProduit: document.getElementById("nomProduit").value,
                Description: document.getElementById("Description").value,
                Prix: document.getElementById("Prix").value,
                image: user.image // conserver l'image existante par défaut
            };

            var image = document.getElementById("image").files[0];
            if (image) {
                var reader = new FileReader();
                reader.onload = function(event) {
                    userList[globalIndex].image = event.target.result;
                    localStorage.setItem('userList', JSON.stringify(userList));
                    showData(page, itemsPerPage); // Mettre à jour la page actuelle
                    // alert 
                    // Afficher l'alerte
            var alertBox = document.getElementById("alertBox");
            alertBox.innerHTML = "<div>Produit modifié avec succès !</div>";
            alertBox.style.display = "block";

            // Cacher l'alerte après quelques secondes (par exemple, 3 secondes)
            setTimeout(function() {
                alertBox.style.display = "none";
            }, 3000);

                };
                reader.readAsDataURL(image);
            } else {
                localStorage.setItem('userList', JSON.stringify(userList));
                showData(page, itemsPerPage); // Mettre à jour la page actuelle
                var alertBox = document.getElementById("alertBox");
                alertBox.innerHTML = "<div>Produit modifié avec succès !</div>";
                alertBox.style.display = "block";
    
                // Cacher l'alerte après quelques secondes (par exemple, 3 secondes)
                setTimeout(function() {
                    alertBox.style.display = "none";
                }, 3000);

            }

            document.getElementById("submit").style.display = 'block';
            document.getElementById("update").style.display = 'none';
            document.getElementById("nomProduit").value = "";
            document.getElementById("Description").value = "";
            document.getElementById("Prix").value = "";
            document.getElementById("image").value = "";
        }
    } else {
        console.error("Index hors limites");
    }
}
