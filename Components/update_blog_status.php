<?php
// Database connection
include 'db.php';

// Get blog id and status from request
$blogId = $_GET['id'];
$status = $_GET['status'];

// Query to update blog status
$sql = "UPDATE blogs SET status = '$status' WHERE id = $blogId";
if (mysqli_query($conn, $sql)) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => mysqli_error($conn)]);
}
?>