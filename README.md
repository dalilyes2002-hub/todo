# To-Do List

Application de gestion de tâches : ajout, marquage comme terminée, suppression et filtrage
(toutes / en cours / terminées). Les tâches sont stockées en base de données MySQL.

## Technologies

- **Front-end** : React 18 (composants et hooks), chargé depuis `public/vendor/` avec Babel
- **Back-end** : PHP 8 avec PDO, API JSON
- **Base de données** : MySQL

## Installation

1. Démarrer **Apache** et **MySQL** depuis le panneau XAMPP.
2. Placer le dossier `todo` dans `/Applications/XAMPP/xamppfiles/htdocs/`.
3. Importer la base : dans phpMyAdmin (`http://localhost/phpmyadmin`), onglet **Importer**,
   sélectionner `database.sql`.

   En ligne de commande :

   ```
   /Applications/XAMPP/xamppfiles/bin/mysql -u root < database.sql
   ```

4. Ouvrir `http://localhost/todo/`.

## Structure

```
todo/
├── api/
│   ├── bootstrap.php      connexion, réponses JSON et fonctions utilitaires
│   └── tasks.php          endpoint REST des tâches
├── config/
│   └── database.php       paramètres de connexion PDO
├── public/
│   ├── css/style.css
│   ├── js/
│   │   ├── api.js         appels fetch vers l'API
│   │   ├── app.js         composant racine et état global
│   │   └── components/    TaskForm, FilterBar, TaskItem, TaskList
│   └── vendor/            react.js, react-dom.js, babel.js
├── database.sql
└── index.php
```

## API

Base : `api/tasks.php`

| Méthode  | Requête                            | Description                          |
| -------- | ---------------------------------- | ------------------------------------ |
| `GET`    | `?filtre=toutes\|en_cours\|terminees` | Liste les tâches et les compteurs |
| `POST`   | `{ "titre": "..." }`               | Crée une tâche                       |
| `PATCH`  | `{ "id": 1, "terminee": true }`    | Change le statut d'une tâche         |
| `DELETE` | `?id=1`                            | Supprime une tâche                   |

Les erreurs sont renvoyées au format `{ "erreur": "message" }` avec un code HTTP adapté
(422 pour une validation, 404 pour une tâche introuvable, 500 pour une erreur serveur).

## Base de données

Table `tasks` :

| Colonne      | Type            | Description                  |
| ------------ | --------------- | ---------------------------- |
| `id`         | INT UNSIGNED    | Clé primaire auto-incrément  |
| `titre`      | VARCHAR(255)    | Intitulé de la tâche         |
| `terminee`   | TINYINT(1)      | 0 = en cours, 1 = terminée   |
| `created_at` | DATETIME        | Date de création             |
