<?php

session_start();

echo json_encode([
    'logged' => isset($_SESSION['username']),
    'username' => isset($_SESSION['username']) ? $_SESSION['username'] : null,
]);
