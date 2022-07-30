import { itemId } from "../UTILS/const.js";
import {
  colorInput,
  quantityInput,
  addToCartBtn,
} from "../UTILS/getElement.js";
import { renderCartItems, displayTotalCost } from "../LAYOUT/renderUi.js";

// on sauvegarde le panier
function saveCart(cart) {
  localStorage.setItem("aCart", JSON.stringify(cart));
}

//on vide le panier
function clearCart() {
  localStorage.clear();
}

//on recupere le panier
function getCart() {
  return JSON.parse(localStorage.getItem("aCart")) || [];
}

//on ajoute un item au panier
//on récupère les données de l'objet dans un objet type,
// on s'assure que l'utilisateur a bien choisi une couleur et une quantité , sinon on l'averti
//on vérifie que l'objet n'est pas déja présent dans le panier en checkant son id et sa couleur,
// si il y est deja , on incrémente la quantité voulue
//si il n'y est pas déja on l'y place avec toutes ses données
//on sauvegarde dans localstorage

function addItemToCart() {
  let myItem = {
    id: itemId,
    color: colorInput.value,
    quantity: parseInt(quantityInput.value, 10),
  };
  const { id, color, quantity } = myItem;
  if (!myItem.color || myItem.quantity <= 0) {
    window.alert("pick a color and a quantity please");
  } else {
    const cart = getCart();
    const existingItem = cart.find(
      (item) => item.id == id && item.color == color
    );
    if (existingItem) {
      existingItem.quantity = parseInt(existingItem.quantity, 10);
      existingItem.quantity += quantity;
    } else {
      cart.push(myItem);
    }
    saveCart(cart);
    addToCartBtn.innerText = "Produit ajouté au panier";
  }
}

// on met à jour le panier si l'utilisateur modifie la quantité
//on place un event listener sur le parent des éléments générés dynamiquement,
//on précise qu'on veut trigger la function uniquement sur le target event est l'input quantity
//si c'est le cas , on ajuste sa valeur en fonction de l'input value en s'assurant de modifier le bon item
// en checkant ses data_id et data_color
// on sauvegarde les changement dans le local storage
//on rerender le panier et le prix total

function updateCart(event) {
  if (event.target.nodeName.toLowerCase() !== "input") {
    return;
  }
  const itemId = event.target.dataset.id;
  const itemColor = event.target.dataset.color;
  const cart = getCart().map((item) => {
    if (item.id === itemId && item.color === itemColor) {
      return { ...item, quantity: parseInt(event.target.value, 10) };
    } else {
      return { ...item };
    }
  });
  saveCart(cart);
  renderCartItems(getCart());
  displayTotalCost();
}

// meme chose pour la suppression d'un item,
// event listener sur le parent,
// qui ne trigger que si le target event possède la class deleteItem
// si c'est le cas , on s'assure de supprimer le bon item , en checkant ses dataid et datacolor
// on sauvegarde les changements dans le localstorage
// on rerender le panier

function deleteItem(event) {
  const parentElement = event.target.closest("section > article");
  const parentElement__dataId = parentElement.getAttribute("data-id");
  const parentElement__dataColor = parentElement.getAttribute("data-color");
  if (!event.target.classList.contains("deleteItem")) {
    return;
  }
  const filtered = getCart().filter(
    (item) =>
      (item.id && item.color) !==
      (parentElement__dataId && parentElement__dataColor)
  );
  saveCart(filtered);
  renderCartItems(getCart());
  displayTotalCost();
}
export { saveCart, clearCart, getCart, addItemToCart, updateCart, deleteItem };
