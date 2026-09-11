const MESSAGES_VIDES = {
  toutes: 'Aucune tâche pour le moment. Ajoutez-en une pour commencer.',
  en_cours: 'Aucune tâche en cours. Tout est terminé.',
  terminees: 'Aucune tâche terminée pour le moment.',
};

const TaskList = ({ taches, filtreActif, chargement, onChangerStatut, onSupprimer }) => {
  if (chargement) {
    return <p className="message">Chargement des tâches...</p>;
  }

  if (taches.length === 0) {
    return <p className="message">{MESSAGES_VIDES[filtreActif]}</p>;
  }

  return (
    <ul className="liste">
      {taches.map((tache) => (
        <TaskItem
          key={tache.id}
          tache={tache}
          onChangerStatut={onChangerStatut}
          onSupprimer={onSupprimer}
        />
      ))}
    </ul>
  );
};
