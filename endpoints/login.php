<?php

session_start();

$phpInput = json_decode(file_get_contents('php://input'), true);

if (isset($_SESSION['username'])) {
    echo json_encode([
        'success' => true,
        'username' => $_SESSION['username'],
    ]);
// } elseif (!isset($_GET['username']) && count(trim($_GET['username'])) === 0) {
    // echo json_encode([
        // 'success' => false,
    // ]);
} else {

    $username = $phpInput['username'];
    $password = $phpInput['password'];

    require_once "../src/User.php";

    $user = new User($phpInput['username'], $phpInput['password'], null);
    try {
        $user->checkLogin();

        $_SESSION['username'] = $phpInput['username'];

        echo json_encode([
            'success' => true,
            'username' => $_SESSION['username'],
        ]);
        
    } catch (Exception $e) {
        
        echo json_encode([
            'success' => false,
        ]);
    }
}
