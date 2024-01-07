<?php

function EmailExists($email, $conn) {
    
    $sql = "SELECT email_id FROM email WHERE email = ?";
    $query = $conn->prepare($sql);
    if (!$query) {
        die('Query preparation failed: ' . $conn->error);
    }
    $query->bind_param("s", $email);
    $query->execute();
    $query->bind_result($email_id);
    $query->fetch();
    $query->close();
    return $email_id !== null;
}
?>