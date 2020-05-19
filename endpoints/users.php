<?php

session_start();

if (!isset($_SESSION['username'])) {
    echo json_encode(['allowed' => false]);
} else {
    require_once "../src/User.php";

    $users = User::getAll();

    echo json_encode(['users' => $users]);
}