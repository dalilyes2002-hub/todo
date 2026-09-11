const FILTRES = [
  { cle: 'toutes', libelle: 'Toutes' },
  { cle: 'en_cours', libelle: 'En cours' },
  { cle: 'terminees', libelle: 'Terminées' },
];

const FilterBar = ({ filtreActif, compteurs, onChangerFiltre }) => (
  <div className="filtres">
    {FILTRES.map(({ cle, libelle }) => (
      <button
        key={cle}
        type="button"
        className={cle === filtreActif ? 'filtre filtre-actif' : 'filtre'}
        onClick={() => onChangerFiltre(cle)}
      >
        {libelle}
        <span className="badge">{compteurs[cle]}</span>
      </button>
    ))}
  </div>
);
