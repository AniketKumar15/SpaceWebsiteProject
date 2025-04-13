<?php
session_start();

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AstroVerse - Quiz</title>

    <link rel="stylesheet" href="./src/css/BaseStyle.css" />
    <link rel="stylesheet" href="./src/css/quizApp.css" />


</head>

<body>
    <nav class="navbar">
        <div class="logo">🚀 AstroVerse - Quiz</div>
        <ul class="nav-links">
            <li><a href="http://localhost:5173/index.html" class="link">Home</a></li>

            <?php
            if (!isset($_SESSION['username']))
                echo "<li><a class='SignUp' href='./account.php?redirect=quizapp.php'>Sign Up</a></li>";
            else {
                echo "<li class='users'>
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGgpIN3y2cH0aqlmAwXWv1UDSEWwL_Odh_2Q&s' alt='name'>" .
                    "<p> Hello! " . $_SESSION['username'] . "</p>
                    <ul class='dropdown-menu'>
                        <li><a href='./logout.php'>Logout</a></li>
                    </ul>
                </li>";
            }
            ?>
        </ul>
    </nav>

    <div class="container">
        <h1>🌌 Space Quiz</h1>
        <div id="quiz">
            <div id="question" class="question">Question will appear here</div>
            <div id="options" class="options">
                <button>Option 1</button>
                <button>Option 2</button>
                <button>Option 3</button>
                <button>Option 4</button>
            </div>
        </div>
        <div id="leaderboard">
            <h2>🏆 Leaderboard</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Sample User</td>
                        <td>5</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <script src="./src/js/spaceQuiz.js"></script>
</body>

</html>