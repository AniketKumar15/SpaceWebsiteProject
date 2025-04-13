<?php
// Include the database connection file
include './Components/db.php';

session_start();
if (isset($_POST['signUpBtn'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $email = $_POST['email'];

    $sql = "SELECT * FROM `user` WHERE username = '$username' OR email = '$email'";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) == 0) {
        $hashPass = password_hash($password, PASSWORD_DEFAULT);
        $sql = "INSERT INTO `user`(`username`, `password`, `email`) VALUES ('$username','$hashPass','$email')";
        $result = mysqli_query($conn, $sql);

        if ($result)
            header("Location: account.php");
    } else {
        echo "User Already Exist -> " . mysqli_error($conn);
    }
}

if (isset($_POST["loginBtn"])) {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $redirect = $_POST['redirect'] ?? 'blog.php';

    $sql = "SELECT * FROM `user` WHERE username = '$username'";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        if (password_verify($password, $row['password'])) {
            $_SESSION['user_id'] = $row['id'];
            $_SESSION['username'] = $username;
            header("Location: $redirect");
        } else {
            echo "<script>alert('Incorrect Password');</script>";
        }
    } else {
        echo "User Not Found";
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Space Login & Signup</title>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="./src/css/accountPage.css">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
        integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>

<body>
    <!-- Background -->
    <div class="background"></div>
    <a href="http://localhost:5173/index.html" class="backBtn"><i class="fa-solid fa-arrow-left"></i></a>

    <!-- Main Container -->
    <div class="container">
        <div class="logo">
            🚀 AstroVerse
        </div>

        <!-- Auth Forms -->
        <div class="auth-forms">
            <!-- Login Form -->
            <form action="account.php" method="post" class="form-container" id="loginForm">
                <h2>Login</h2>
                <input type="hidden" name="redirect"
                    value="<?php echo htmlspecialchars($_GET['redirect'] ?? 'blog.php'); ?>">
                <input type="text" id="loginUsername" placeholder="Username" name="username" required>
                <input type="password" id="loginPassword" placeholder="Password" name="password" required>
                <button class="btn" name="loginBtn" type="submit">Login</button>
                <p>Don't have an account? <a href="javascript:void(0)" onclick="showSignup()">Sign Up</a></p>
            </form>

            <!-- Signup Form -->
            <form action="account.php" method="post" class="form-container" id="signupForm">
                <h2>Sign Up</h2>
                <input type="text" id="signupUsername" name="username" placeholder="Username" required>
                <input type="password" id="signupPassword" name="password" placeholder="Password" required>
                <input type="email" id="signupEmail" name="email" placeholder="Email" required>
                <button class="btn" name="signUpBtn" type="submit" onclick="signup()">Sign Up</button>
                <p>Already have an account? <a href="javascript:void(0)" onclick="showLogin()">Login</a></p>
            </form>
        </div>
    </div>

    <script src="./src/js/accountPage.js"></script>
</body>

</html>