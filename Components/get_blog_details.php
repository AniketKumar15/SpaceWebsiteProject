<?php
// Database connection
include 'db.php';

// Get blog id from request
$blogId = $_GET['id'];

// Query to get blog details
$sql = "SELECT * FROM blogs WHERE id = $blogId";
$result = mysqli_query($conn, $sql);
$blog = mysqli_fetch_assoc($result);

// Return blog details as JSON
echo json_encode($blog);
?>