<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

require __DIR__ . '/../config/database.php';

function repondre(array $donnees, int $code = 200): void
{
    http_response_code($code);
    echo json_encode($donnees, JSON_UNESCAPED_UNICODE);
    exit;
}

function erreur(string $message, int $code = 400): void
{
    repondre(['erreur' => $message], $code);
}

function corps_json(): array
{
    $brut = file_get_contents('php://input');

    if ($brut === false || $brut === '') {
        return [];
    }

    $donnees = json_decode($brut, true);

    return is_array($donnees) ? $donnees : [];
}

function formater_tache(array $ligne): array
{
    return [
        'id'         => (int) $ligne['id'],
        'titre'      => $ligne['titre'],
        'terminee'   => (bool) $ligne['terminee'],
        'created_at' => $ligne['created_at'],
    ];
}

function lire_tache(PDO $pdo, int $id): ?array
{
    $requete = $pdo->prepare('SELECT id, titre, terminee, created_at FROM tasks WHERE id = ?');
    $requete->execute([$id]);

    $ligne = $requete->fetch();

    return $ligne === false ? null : formater_tache($ligne);
}

function compter_taches(PDO $pdo): array
{
    $ligne = $pdo->query(
        'SELECT COUNT(*) AS toutes,
                SUM(terminee = 0) AS en_cours,
                SUM(terminee = 1) AS terminees
         FROM tasks'
    )->fetch();

    return [
        'toutes'    => (int) $ligne['toutes'],
        'en_cours'  => (int) $ligne['en_cours'],
        'terminees' => (int) $ligne['terminees'],
    ];
}
