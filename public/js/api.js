const URL_API = 'api/tasks.php';

async function appelApi(chemin, options = {}) {
  const configuration = { method: options.methode || 'GET' };

  if (options.corps) {
    configuration.headers = { 'Content-Type': 'application/json' };
    configuration.body = JSON.stringify(options.corps);
  }

  const reponse = await fetch(URL_API + chemin, configuration);
  let donnees = {};

  try {
    donnees = await reponse.json();
  } catch (erreur) {
    throw new Error('Réponse invalide du serveur.');
  }

  if (!reponse.ok) {
    throw new Error(donnees.erreur || 'Une erreur est survenue.');
  }

  return donnees;
}

const api = {
  listerTaches: (filtre) => appelApi(`?filtre=${filtre}`),
  ajouterTache: (titre) => appelApi('', { methode: 'POST', corps: { titre } }),
  changerStatut: (id, terminee) => appelApi('', { methode: 'PATCH', corps: { id, terminee } }),
  supprimerTache: (id) => appelApi(`?id=${id}`, { methode: 'DELETE' }),
};
