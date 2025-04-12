<?php
// Database connection
include 'db.php';

// Query to get all blogs
$sql = "SELECT * FROM blogs WHERE status = 'pending'"; // Assuming 'pending' blogs
$result = mysqli_query($conn, $sql);

// Fetch data and return as JSON
$blogs = [];
while ($row = mysqli_fetch_assoc($result)) {
    $blogs[] = $row;
}

echo json_encode($blogs);
?>