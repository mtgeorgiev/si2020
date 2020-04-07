<?php

require_once "Db.php";

$db = new Db();

$conn = $db->getConnection();

$insertStatement = $conn->prepare("INSERT INTO `users` (username, name) VALUES (:username, :name)");

$insertResult = $insertStatement->execute([
        'username' => 'dfsdf23',
        'name' => 'Иван Пенчото',
    ]);

if ($insertResult)
{
    echo json_encode(['success' => true]);
}
else
{
    var_dump($insertStatement->errorInfo());
    echo json_encode(['success' => false]);
}

$fetchStatement = $conn->prepare("SELECT * FROM `users`");
$fetchStatement->execute([]);
$users = $fetchStatement->fetchAll();

var_dump($users);
