<?php
include './Components/db.php';
session_start();

if (isset($_POST['submitBlog'])) {
    $title = mysqli_real_escape_string($conn, $_POST['title']);
    $shortDesc = mysqli_real_escape_string($conn, $_POST['shortDesc']);
    $fullDesc = mysqli_real_escape_string($conn, $_POST['fullDesc']);
    $user_id = mysqli_real_escape_string($conn, $_SESSION["user_id"]);

    $sql = "INSERT INTO `blogs`(`title`, `short_desc`, `full_desc`, `user_id`, `status`) VALUES ('$title','$shortDesc','$fullDesc','$user_id', 'pending')";
    $result = mysqli_query($conn, $sql);
    if ($result) {
        echo "<script>alert('Blog posted successfully!');</script>";
        header("Location: blog.php");
    } else {
        echo "<script>alert('Error posting blog: " . mysqli_error($conn) . "');</script>";
    }
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AstroVerse - Share blogs</title>
    <link rel="stylesheet" href="./src/css/BaseStyle.css" />
    <link rel="stylesheet" href="./src/css/blogSystem.css" />
    <link rel="stylesheet" href="./src/css/blogModal.css" />


</head>

<body>
    <?php include './Components/nav.php'; ?>

    <div id="modal" class="modal">
        <div class="modal-content">
            <span id="closeBtn" class="close-btn">&times;</span>
            <h2 class="titleModal">AstroVerse - Add Your Blog</h2>
            <form action="blog.php" method="post" id="addBlogForm">
                <label for=" title">Title:</label>
                <input type="text" id="title" name="title" placeholder="Add Title" required><br><br>

                <label for="shortDesc">Short Description:</label>
                <input type="text" id="shortDesc" name="shortDesc" placeholder="Add Short Description" required><br><br>

                <label for="fullDesc">Full Description:</label>
                <textarea id="fullDesc" name="fullDesc" rows="4" placeholder="Add Full Description"
                    required></textarea><br><br>

                <button type="submit" name="submitBlog">Post Blog</button>
            </form>
        </div>
    </div>

    <section class="blog-container">
        <h2>Our Blogs</h2>
        <div class="blog-cards">

            <?php
            $sql = "SELECT * FROM `blogs` WHERE status = 'accepted'";
            $res = mysqli_query($conn, $sql);
            if ($res) {
                while ($row = mysqli_fetch_assoc($res)) {
                    echo "
                <div class='blog-card'>
                    <img src='' alt='Blog Image' id='blog-image'>
                    <div class='blog-card-body'>" .
                        "<h3 class='blog-title'>" . $row['title'] . "</h3>" .
                        "<p class='blog-desc'>" . $row['short_desc'] . "</p>" .
                        "<a href='full_blog_link.html' class='read-more'>Read More</a>
                    </div>
                </div>
                    ";
                }
            }
            ?>
        </div>
    </section>

    <script src="./src/js/blogImage.js"></script>
    <script src="./src/js/blogModal.js"></script>

</body>

</html>