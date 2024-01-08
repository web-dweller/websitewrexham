<?php
include '../websitedb_connection.php';

$conn = OpenCon();


if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $event_id = $_POST["eventId"];

    $check_query = "SELECT COUNT(*) AS row_count FROM events where id= ?";
    $stmt = $conn->prepare($check_query);
    $stmt->bind_param("s", $event_id);
    $stmt->execute();
    $stmt->bind_result($row_count);
    $stmt->fetch();

    // Check if the query was successful
    if ($row_count === 0) {
        echo json_encode(array('status' => 'error', 'message' => 'No such record'));
    } else {
        $newconn = OpenCon();
        // SQL query to delete record based on id
        $sql = "DELETE FROM events WHERE id = ?";
        // Use prepared statement to prevent SQL injection
        $newstmt = $newconn->prepare($sql);
        $newstmt->bind_param("s", $event_id);
        $newstmt->execute();
        $newstmt->close();
        echo json_encode(array('status' => 'success', 'message' => 'Record deleted'));
        CloseCon($newconn);
    }
    $stmt->close();
} else {
    // Handle other HTTP methods or show an error
    http_response_code(405); // Method Not Allowed
    echo json_encode(array('status' => 'error', 'message' => 'Method not allowed'));
}
CloseCon($conn);
?>