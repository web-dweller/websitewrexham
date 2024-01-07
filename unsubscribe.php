<?php
include 'websitedb_connection.php';

$conn = OpenCon();

if (isset($_GET['email'])) {
    // Get the email parameter value
    $emailToDelete = $_GET['email'];

    // SQL query to delete record based on email
    $sql = "DELETE FROM email WHERE email = ?";

    // Use prepared statement to prevent SQL injection
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $emailToDelete);

    // Execute the statement
    if ($stmt->execute()) {
        echo "Record deleted successfully";
    } else {
        echo "Error deleting record: " . $stmt->error;
    }

    // Close the statement and connection
    $stmt->close();
}
CloseCon($conn);
?>