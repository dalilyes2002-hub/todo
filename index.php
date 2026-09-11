<?php

declare(strict_types=1);

$version = (string) filemtime(__DIR__ . '/public/js/app.js');

$scripts = [
    'public/js/api.js',
    'public/js/components/TaskForm.js',
    'public/js/components/FilterBar.js',
    'public/js/components/TaskItem.js',
    'public/js/components/TaskList.js',
    'public/js/app.js',
];
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Ma liste de tâches</title>
    <link rel="stylesheet" href="public/css/style.css?v=<?= $version ?>">
</head>
<body>
    <div id="root"></div>

    <script src="public/vendor/react.js"></script>
    <script src="public/vendor/react-dom.js"></script>
    <script src="public/vendor/babel.js"></script>

    <?php foreach ($scripts as $script): ?>
        <script type="text/babel" data-presets="react" src="<?= $script ?>?v=<?= $version ?>"></script>
    <?php endforeach; ?>
</body>
</html>
