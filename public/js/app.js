const COMPTEURS_VIDES = { toutes: 0, en_cours: 0, terminees: 0 };

const App = () => {
  const [taches, setTaches] = React.useState([]);
  const [compteurs, setCompteurs] = React.useState(COMPTEURS_VIDES);
  const [filtre, setFiltre] = React.useState('toutes');
  const [chargement, setChargement] = React.useState(true);
  const [occupe, setOccupe] = React.useState(false);
  const [messageErreur, setMessageErreur] = React.useState('');

  const charger = React.useCallback(async () => {
    setChargement(true);

    try {
      const donnees = await api.listerTaches(filtre);
      setTaches(donnees.taches);
      setCompteurs(donnees.compteurs);
      setMessageErreur('');
    } catch (erreur) {
      setTaches([]);
      setCompteurs(COMPTEURS_VIDES);
      setMessageErreur(erreur.message);
    } finally {
      setChargement(false);
    }
  }, [filtre]);

  React.useEffect(() => {
    charger();
  }, [charger]);

  const executer = async (action) => {
    setOccupe(true);

    try {
      await action();
      setMessageErreur('');
      await charger();

      return true;
    } catch (erreur) {
      setMessageErreur(erreur.message);

      return false;
    } finally {
      setOccupe(false);
    }
  };

  const ajouterTache = (titre) => executer(() => api.ajouterTache(titre));

  const changerStatut = (tache) => executer(() => api.changerStatut(tache.id, !tache.terminee));

  const supprimerTache = (tache) => executer(() => api.supprimerTache(tache.id));

  return (
    <div className="application">
      <header className="entete">
        <h1>Ma liste de tâches</h1>
        <p className="sous-titre">
          {compteurs.en_cours === 0
            ? 'Aucune tâche en cours'
            : `${compteurs.en_cours} tâche${compteurs.en_cours > 1 ? 's' : ''} en cours`}
        </p>
      </header>

      <main className="carte">
        <TaskForm onAjouter={ajouterTache} desactive={occupe} />

        <FilterBar filtreActif={filtre} compteurs={compteurs} onChangerFiltre={setFiltre} />

        {messageErreur !== '' && <p className="alerte">{messageErreur}</p>}

        <TaskList
          taches={taches}
          filtreActif={filtre}
          chargement={chargement}
          onChangerStatut={changerStatut}
          onSupprimer={supprimerTache}
        />
      </main>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
