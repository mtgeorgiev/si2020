<?php

$phpInput = json_decode(file_get_contents('php://input'), true);
// $phpInput = $_POST;

// validate php input

$username = $phpInput['username'];
$password = $phpInput['password'];

require_once "../src/User.php";

$user = new User($phpInput['username'], $phpInput['password'], null);

try {
    $user->validate();
    $user->storeInDb();
    
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage(),
    ]);
}
