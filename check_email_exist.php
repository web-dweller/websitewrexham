<?php
include 'websitedb_connection.php';

function EmailExists($email) {
    
    $checkconn = OpenCon();
    $sql = "SELECT email_id FROM email WHERE email = ?";
    $query = $checkconn->prepare($sql);
    if (!$query) {
        die('Query preparation failed: ' . $checkconn->error);
    }
    $query->bind_param("s", $email);
    $query->execute();
    $query->bind_result($email_id);
    $query->fetch();
    $query->close();
    CloseCon($checkconn);
    return $email_id !== null;
}
?>