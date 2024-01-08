<?php
include '../websitedb_connection.php';
$conn = OpenCon();

// Fetch events
$query = "SELECT * FROM events";
$result = $conn->query($query);
// Check if the query was successful
if (!$result) {
    echo "Error: " . $conn->error;
} else {
    // Fetch the result as an associative array
    $events = [];
    while ($row = $result->fetch_assoc()) {
    $events[] = $row;
}
}
// Convert the data to JSON format
$jsonData = json_encode($events);

// Set the response header to indicate JSON content
header('Content-Type: list_events/json');

// Send the JSON data as the response
echo $jsonData;


CloseCon($conn);
?>