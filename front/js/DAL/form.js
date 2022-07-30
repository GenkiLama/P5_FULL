import {
  badFormAdress,
  badFormEmail,
  adress,
  email,
  city,
  firstName,
  lastName,
} from "../UTILS/getElement.js";
import { adressRegExp, nameRegExp, emailRegExp, url } from "../UTILS/const.js";
import { getCart, clearCart } from "./localstorage.js";

//on check la validité des données saisies dans le formulaire, elles doivent
//etre conformes aux exigences des regex

function validateAdress() {
  badFormAdress.innerText = `${
    adressRegExp.test(adress.value) ? "" : "Entrez une adresse valide svp"
  }`;
}
function validateName(e) {
  e.target.nextElementSibling.innerText = `${
    nameRegExp.test(e.target.value) ? "" : "Veuillez entrer une valeur correcte"
  }`;
}

function validateEmail() {
  badFormEmail.innerText = `${
    emailRegExp.test(email.value) ? "" : "Entrez un email valide"
  }`;
}

//on s'assure que tous les elements du formulaire sont valides

function checkForm() {
  if (
    nameRegExp.test(firstName.value) &&
    nameRegExp.test(lastName.value) &&
    nameRegExp.test(city.value) &&
    adressRegExp.test(adress.value) &&
    emailRegExp.test(email.value)
  ) {
    return true;
  } else {
    return false;
  }
}

//on envoie la requete a l'api
//on recupere le numuéro de commande et on redirige vers la page confirmation
async function sendOrder(e) {
  e.preventDefault();
  const idProducts = getCart().map((item) => item.id);
  if (!checkForm()) {
    window.alert("complete form please");
  } else if (idProducts.length === 0) {
    window.alert("ajoutez au moins un produit au panier pour commander svp");
  } else {
    let res = await fetch(`${url}/order`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contact: {
          firstName: firstName.value,
          lastName: lastName.value,
          address: adress.value,
          city: city.value,
          email: email.value,
        },
        products: idProducts,
      }),
    });
    let data = await res.json();
    clearCart();
    document.location.href = `confirmation.html?id=${data.orderId}`;
  }
}

export { validateAdress, validateName, validateEmail, sendOrder };
