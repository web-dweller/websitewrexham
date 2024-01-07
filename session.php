<?php
    $SESSION_EXPIRATION_SECS = 30;

    function getRandomStringSha1($length = 16)
    {
        $string = sha1(rand());
        return substr($string, 0, $length);
    }


    function getSessionCreationTime($session_id, $conn) {

        $sql = "SELECT creation_time FROM sessions WHERE session_id = ?";
        $query = $conn->prepare($sql);
        if (!$query) {
            die('Query preparation failed: ' . $conn->error);
        }
        $query->bind_param("s", $session_id);
        $query->execute();
        $query->bind_result($creation_time);
        $query->fetch();
        $query->close();
        return $creation_time;
    }

    function createSession($conn){

        $session_id = getRandomStringSha1();
        $creation_time = time();

        $sql = "INSERT INTO sessions (session_id, creation_time) VALUES (?, ?)";

        // Use prepared statement to prevent SQL injection
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ss", $session_id, $creation_time);
        // Execute the statement
        $stmt->execute();
        $stmt->close();

        return $session_id;
    }

    function deleteSession($session_id, $conn){
        $sql = "DELETE FROM sessions WHERE session_id = ?";
        $query = $conn->prepare($sql);
        if (!$query) {
            die('Query preparation failed: ' . $conn->error);
        }
        $query->bind_param("s", $session_id);
        $query->execute();
        $query->close();
    }
?>