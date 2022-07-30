// on récupère les données utiles selon qu'on soit sur la page d'accueil ou sur une page produit

async function getData(url) {
  if (getCurrentId()) {
    const res = await fetch(`${url}/${getCurrentId()}`);
    const data = await res.json();
    return data;
  }
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

// on récupère l'id du produit si on est sur une page produit, sinon rien
function getCurrentId() {
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const id = url.searchParams.get("id");
  return id;
}

export { getData, getCurrentId };
