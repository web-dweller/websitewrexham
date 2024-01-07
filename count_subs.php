<?php
include 'websitedb_connection.php';
$conn = OpenCon();

// Fetch number of subs
$query = "SELECT COUNT(*) AS row_count FROM email";
$result = $conn->query($query);
// Check if the query was successful
if (!$result) {
    echo "Error: " . $conn->error;
} else {
    // Fetch the result as an associative array
    $row = $result->fetch_assoc();
}
// Convert the data to JSON format
$jsonData = json_encode($row);

// Set the response header to indicate JSON content
header('Content-Type: count_subs/json');

// Send the JSON data as the response
echo $jsonData;


CloseCon($conn);
?>