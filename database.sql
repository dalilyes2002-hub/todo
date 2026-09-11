DROP DATABASE IF EXISTS todo;
CREATE DATABASE todo CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE todo;

CREATE TABLE tasks (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    terminee TINYINT(1) NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

INSERT INTO tasks (titre, terminee) VALUES
('Reviser le cours de PHP', 0),
('Faire les exercices de React', 0),
('Rendre le projet NovaShop', 1),
('Preparer la presentation orale', 0),
('Installer XAMPP', 1);
