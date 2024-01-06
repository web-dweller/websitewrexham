<?php
include 'websitedb_connection.php';

$conn = OpenCon();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $event_name = $_POST["eventName"];
    $event_desc = $_POST["eventDescription"];
    $event_date = $_POST["eventDate"];


    $sql = "INSERT INTO events (event_name, event_desc, event_date) VALUES (?, ?, ?)";

    // Use prepared statement to prevent SQL injection
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $event_name, $event_desc, $event_date);

    // Execute the statement
    $stmt->execute();
    echo json_encode(array('status' => 'success', 'message' => 'Event Added'));
//    if ($stmt->execute()) {
//        echo "New row added successfully";
//    } else {
//        echo "Error adding new row: " . $stmt->error;
//    }
} else {
    // Handle other HTTP methods or show an error
    http_response_code(405); // Method Not Allowed
    echo json_encode(array('status' => 'error', 'message' => 'Method not allowed'));
}

// Close the statement and connection
$stmt->close();
CloseCon($conn);
?>