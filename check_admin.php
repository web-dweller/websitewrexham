<?php
include 'websitedb_connection.php';
$conn = OpenCon();

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $login = $_POST["username"];
    $password = $_POST["password"];
    $hashedPassword = md5($password);

    $sql = "SELECT password FROM admin WHERE login = ?";
    $query = $conn->prepare($sql);
    $query->bind_param("s", $login);
    $query->execute();
    $query->bind_result($storedPassword);
    $query->fetch();


    // Check if the query was successful
    if ($storedPassword !== null && $storedPassword === $hashedPassword) {
        echo json_encode(array('status' => 'success', 'message' => 'Successfully logged in'));
    } else {
         echo json_encode(array('status' => 'error', 'message' => 'Invalid login or password'));
    }
    $query->close();

} else {
    // Handle other HTTP methods or show an error
    http_response_code(405); // Method Not Allowed
    echo json_encode(array('status' => 'error', 'message' => 'Method not allowed'));
}

// Close the statement and connection

CloseCon($conn);
?>