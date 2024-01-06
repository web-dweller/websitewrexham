<?php
include 'websitedb_connection.php';

$conn = OpenCon();

$first_name = 'Greg1';
$last_name = 'Grim1';
$email = 'grimy.grigory1@gmail.com';

// SQL query to insert a new row
$sql = "INSERT INTO email (email, first_name, last_name) VALUES (?, ?, ?)";

// Use prepared statement to prevent SQL injection
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $email, $first_name, $last_name);

// Execute the statement
if ($stmt->execute()) {
    echo "New row added successfully";
} else {
    echo "Error adding new row: " . $stmt->error;
}

// Close the statement and connection
$stmt->close();
CloseCon($conn);
?>