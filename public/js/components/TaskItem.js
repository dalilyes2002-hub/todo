const formaterDate = (valeur) => {
  const date = new Date(valeur.replace(' ', 'T'));

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

const TaskItem = ({ tache, onChangerStatut, onSupprimer }) => (
  <li className={tache.terminee ? 'tache tache-terminee' : 'tache'}>
    <label className="tache-contenu">
      <input
        type="checkbox"
        checked={tache.terminee}
        onChange={() => onChangerStatut(tache)}
      />
      <span className="tache-titre">{tache.titre}</span>
    </label>

    <div className="tache-actions">
      <span className="tache-date">{formaterDate(tache.created_at)}</span>
      <button
        type="button"
        className="bouton-supprimer"
        title="Supprimer la tâche"
        onClick={() => onSupprimer(tache)}
      >
        Supprimer
      </button>
    </div>
  </li>
);
