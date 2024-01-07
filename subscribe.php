<?php
include 'websitedb_connection.php';
include 'check_email_exist.php';

$conn = OpenCon();


if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    $first_name = $_POST["firstName"];
    $last_name = $_POST["lastName"];
    $email = $_POST["email"];
    if(!EmailExists($email)){
        // SQL query to insert a new row
        $sql = "INSERT INTO email (email, first_name, last_name) VALUES (?, ?, ?)";

        // Use prepared statement to prevent SQL injection
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sss", $email, $first_name, $last_name);

        // Execute the statement
        if ($stmt->execute()) {
            echo json_encode(array('status' => 'success', 'message' => "Subscribed successfully")); 
        } else {
            echo json_encode(array('status' => 'error', 'message' => 'DB query error:' . $stmt->error));
        }
        $stmt->close();
    } else {
        echo json_encode(array('status' => 'duplicate', 'message' => "Already subscribed"));
    }
    
} else {
    // Handle other HTTP methods or show an error
    http_response_code(405); // Method Not Allowed
    echo json_encode(array('status' => 'error', 'message' => 'Method not allowed'));
}

CloseCon($conn);
?>