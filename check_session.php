<?php
    include 'websitedb_connection.php';
    include 'session.php';

    $SESSION_EXPIRATION_SECS = 10;

    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $session_id = $_POST["session_id"];
        if(!$session_id){
            echo http_response_code(401);
        }
        $conn = OpenCon();
        $creation_time = getSessionCreationTime($session_id, $conn);
        error_log(print_r($session_id, TRUE));
        error_log(print_r(time(), TRUE));
        error_log(print_r($creation_time, TRUE));
        if (time() - $creation_time > $SESSION_EXPIRATION_SECS){
            deleteSession($session_id, $conn);
            echo http_response_code(401);
        }else{
            echo http_response_code(200);
        }
        CloseCon($conn);
    }
?>