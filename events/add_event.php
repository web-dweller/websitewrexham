<?php
include '../websitedb_connection.php';

$conn = OpenCon();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $event_name = $_POST["eventName"];
    $event_desc = $_POST["eventDescription"];
    $event_date = $_POST["eventDate"];
    $event_start_time = $_POST["eventStartTime"];
    $event_end_time = $_POST["eventEndTime"];


    $sql = "INSERT INTO events (event_name, event_desc, event_date, event_start_time, event_end_time) VALUES (?, ?, ?, ?, ?)";

    // Use prepared statement to prevent SQL injection
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssss", $event_name, $event_desc, $event_date, $event_start_time, $event_end_time);

    // Execute the statement
    $stmt->execute();
    echo json_encode(array('status' => 'success', 'message' => 'Event Added'));
} else {
    // Handle other HTTP methods or show an error
    http_response_code(405); // Method Not Allowed
    echo json_encode(array('status' => 'error', 'message' => 'Method not allowed'));
}

// Close the statement and connection
$stmt->close();
CloseCon($conn);
?>