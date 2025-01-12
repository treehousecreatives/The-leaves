<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $service = htmlspecialchars($_POST['service']);
    $message = htmlspecialchars($_POST['message']);

    // Recipient email address
    $to = "your-email@example.com";

    // Email subject
    $subject = "New Contact Form Submission";

    // Email body
    $body = "Name: $name\nEmail: $email\nService: $service\nMessage:\n$message";

    // Email headers
    $headers = "From: $email";

    // Send the email
    if (mail($to, $subject, $body, $headers)) {
        // Redirect to thank you page
        header("Location: thank_you.html");
        exit;
    } else {
        echo "Error: Unable to send email. Please try again later.";
    }
}
?>