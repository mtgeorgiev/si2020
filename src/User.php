<?php

class User
{
    private $username;

    private $password;

    private $name;

    public function __construct($username, $password, $name)
    {
        $this->username = $username;
        $this->password = $password;
        $this->name = $name;
    }

    public function validate(): void
    {
        // if object is valid, do nothing, if not, throw an exception
    }

    public function storeInDb(): void
    {
        require_once "../src/Db.php";

        $db = new Db();

        $conn = $db->getConnection();

        $insertStatement = $conn->prepare(
            "INSERT INTO `users` (username, password)
             VALUES (:username, :password)");

        $hashedPassword = password_hash($this->password, PASSWORD_DEFAULT);
             
        $insertResult = $insertStatement->execute([
                'username' => $this->username,
                'password' => $hashedPassword,
            ]);

        if (!$insertResult)
        {
            $errorInfo = $insertStatement->errorInfo();
            $errorMessage = "";
            
            if ($errorInfo[1] == 1062) {
                $errorMessage = "The username is already taken";
            } else {
                $errorMessage = "Request faile, trye again later";
            }
            
            throw new Exception($errorMessage);
        }
    }
}