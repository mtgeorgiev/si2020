<?php

session_start();

if (isset($_SESSION['username'])) {
    echo json_encode([
        'success' => true,
        'username' => $_SESSION['username'],
    ]);
} elseif (!isset($_GET['username']) && count(trim($_GET['username'])) === 0) {
    echo json_encode([
        'success' => false,
    ]);
} else {
    // check in db
    $_SESSION['username'] = $_GET['username'];
    echo json_encode([
        'success' => true,
        'username' => $_SESSION['username'],
    ]);
}