const TaskForm = ({ onAjouter, desactive }) => {
  const [titre, setTitre] = React.useState('');

  const soumettre = async (evenement) => {
    evenement.preventDefault();

    const valeur = titre.trim();

    if (valeur === '') {
      return;
    }

    const reussi = await onAjouter(valeur);

    if (reussi) {
      setTitre('');
    }
  };

  return (
    <form className="formulaire" onSubmit={soumettre}>
      <input
        type="text"
        className="champ"
        placeholder="Ajouter une nouvelle tâche..."
        maxLength={255}
        value={titre}
        onChange={(evenement) => setTitre(evenement.target.value)}
      />
      <button type="submit" className="bouton-principal" disabled={desactive || titre.trim() === ''}>
        Ajouter
      </button>
    </form>
  );
};
