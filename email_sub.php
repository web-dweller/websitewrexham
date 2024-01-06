<?php
include 'websitedb_connection.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'C:/xampp/composer/vendor/autoload.php';

$conn = OpenCon();
//echo "Connected Successfully<br>";


// Fetch subscribers' emails and names
$query = "SELECT email, first_name, last_name FROM email";
$result = $conn->query($query);
// Check if the query was successful
if (!$result) {
    die("Query failed: " . $conn->error);
}
$subscribers = [];
while ($row = $result->fetch_assoc()) {
    $subscribers[] = $row;
}
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $main_content = $_POST["newsletterContent"];

    
    $mail = new PHPMailer;
    $mail->isSMTP();
    $mail->SMTPAuth = true;
    $mail->Host = 'smtp.gmail.com';
    $mail->Port = 465; // Use 587 for TLS
    $mail->SMTPSecure = 'ssl'; // Use 'tls' or 'ssl'
    $mail->SMTPAutoTLS = false;
    
    $mail->Username = 'test.wrexham@gmail.com';
    $mail->Password = 'pyadbzunkfyxpkev';
    
    // Email parameters
    $subject = "News for you!";
    $sender = "test.wrexham@gmail.com\r\n";
    
    $unsubscribeURL = 'https://localhost/myWebsite/unsubscribe.php?email=' . urlencode("[subscriber_email]");
    
    $content = "Hello [subscriber_name],<br><br>";
    $content .= $main_content;
    $content .= "<br><br>"; 
    $content .= "To unsubscribe from our newsletter, click <a href='$unsubscribeURL'>here</a>.<br><br>";
    $content .= "Best regards,<br>Website Team";
    
    // Set email parameters
    $mail->setFrom('test.wrexham@gmail.com', 'Website Team');
    
    // Loop through subscribers and send emails
    foreach ($subscribers as $subscriber) {
        $to = $subscriber['email'];
        $mail->addAddress($to, $subscriber['first_name'] . ' ' . $subscriber['last_name']);
        $mail->Subject = $subject;
        $message = str_replace("[subscriber_name]", $subscriber['first_name'] . ' ' . $subscriber['last_name'], $content);
        $message = str_replace(urlencode("[subscriber_email]"), $subscriber['email'], $message);
    
        $mail->msgHTML($message);
        // Send the email
        $mail->send();
        $mail->clearAddresses();
        // Console debug (also sends email)
//        if ($mail->send()) {
//            echo "Email sent to " . $subscriber['email'] . "<br>";
//        } else {
//            echo "Email sending failed for " . $subscriber['email'] . "<br>";
//            echo "Error: " . $mail->ErrorInfo;
//        }
    }
    $response = array('status' => 'success', 'message' => 'Email submitted successfully');
    echo json_encode($response);
} else {
    // Handle other HTTP methods or show an error
    http_response_code(405); // Method Not Allowed
    echo json_encode(array('status' => 'error', 'message' => 'Method not allowed'));
}


CloseCon($conn);
?>