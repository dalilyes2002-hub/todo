<?php

declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

$methode = $_SERVER['REQUEST_METHOD'];

try {
    if ($methode === 'GET') {
        $filtre = (string) ($_GET['filtre'] ?? 'toutes');

        $conditions = [
            'toutes'    => '',
            'en_cours'  => ' WHERE terminee = 0',
            'terminees' => ' WHERE terminee = 1',
        ];

        if (!isset($conditions[$filtre])) {
            erreur('Filtre invalide.', 422);
        }

        $sql = 'SELECT id, titre, terminee, created_at FROM tasks'
            . $conditions[$filtre]
            . ' ORDER BY terminee ASC, id DESC';

        repondre([
            'taches'    => array_map('formater_tache', $pdo->query($sql)->fetchAll()),
            'compteurs' => compter_taches($pdo),
        ]);
    }

    if ($methode === 'POST') {
        $titre = trim((string) (corps_json()['titre'] ?? ''));

        if ($titre === '') {
            erreur('Le titre de la tâche est obligatoire.', 422);
        }

        if (mb_strlen($titre) > 255) {
            erreur('Le titre ne doit pas dépasser 255 caractères.', 422);
        }

        $requete = $pdo->prepare('INSERT INTO tasks (titre) VALUES (?)');
        $requete->execute([$titre]);

        repondre([
            'tache'     => lire_tache($pdo, (int) $pdo->lastInsertId()),
            'compteurs' => compter_taches($pdo),
        ], 201);
    }

    if ($methode === 'PATCH') {
        $donnees = corps_json();
        $id = (int) ($donnees['id'] ?? 0);

        if ($id <= 0) {
            erreur('Identifiant de tâche invalide.', 422);
        }

        if (lire_tache($pdo, $id) === null) {
            erreur('Tâche introuvable.', 404);
        }

        if (!array_key_exists('terminee', $donnees)) {
            erreur('Le statut de la tâche est obligatoire.', 422);
        }

        $requete = $pdo->prepare('UPDATE tasks SET terminee = ? WHERE id = ?');
        $requete->execute([$donnees['terminee'] ? 1 : 0, $id]);

        repondre([
            'tache'     => lire_tache($pdo, $id),
            'compteurs' => compter_taches($pdo),
        ]);
    }

    if ($methode === 'DELETE') {
        $id = (int) ($_GET['id'] ?? corps_json()['id'] ?? 0);

        if ($id <= 0) {
            erreur('Identifiant de tâche invalide.', 422);
        }

        $requete = $pdo->prepare('DELETE FROM tasks WHERE id = ?');
        $requete->execute([$id]);

        if ($requete->rowCount() === 0) {
            erreur('Tâche introuvable.', 404);
        }

        repondre([
            'id'        => $id,
            'compteurs' => compter_taches($pdo),
        ]);
    }

    erreur('Méthode non autorisée.', 405);
} catch (PDOException $e) {
    erreur('Erreur lors de l\'accès à la base de données.', 500);
}
