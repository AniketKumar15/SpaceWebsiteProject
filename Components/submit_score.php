<?php
session_start();
include 'db.php'; // your DB connection file

$data = json_decode(file_get_contents('php://input'), true);
$username = $_SESSION['username'] ?? $data['name']; // use session if logged in
$score = intval($data['score']);

if ($username && $score >= 0) {
    $stmt = $conn->prepare("INSERT INTO leaderboard (username, score) VALUES (?, ?)");
    $stmt->bind_param("si", $username, $score);
    $stmt->execute();
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => "Missing name or score"]);
}
?>