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
                $errorMessage = "Request failed, true again later";
            }
            
            throw new Exception($errorMessage);
        }
    }
    
    public function checkLogin(): void {
        
        require_once "../src/Db.php";

        $db = new Db();
        
        $conn = $db->getConnection();
        
        $selectStatement = $conn->prepare("SELECT password FROM `users` WHERE username = :username");
        $result = $selectStatement->execute(['username' => $this->username]);
        
        $dbUser = $selectStatement->fetch();

        if (!password_verify($this->password, $dbUser['password'])) {
            throw new Exception("Username or password do not match");
        }

    }

    /**
     * Gets all users from the database
    */
    public static function getAll(): iterable {
        
        require_once "../src/Db.php";

        $db = new Db();
        
        $conn = $db->getConnection();
        
        $selectStatement = $conn->prepare("SELECT id, username, name, registered_on FROM `users`");
        $result = $selectStatement->execute([]);
        
        return $selectStatement->fetchAll();
    }
}
