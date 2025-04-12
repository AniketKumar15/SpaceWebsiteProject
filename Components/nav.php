<nav class="navbar">
    <div class="logo">🚀 AstroVerse - Blogs</div>
    <ul class="nav-links">
        <li><a href="http://localhost:5173/index.html" class="link">Home</a></li>

        <?php
        if (!isset($_SESSION['username']))
            echo "<li><a class='SignUp' href='./account.php'>Sign Up</a></li>";
        else {
            echo "<li class='users'>
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGgpIN3y2cH0aqlmAwXWv1UDSEWwL_Odh_2Q&s' alt='name'>" .
                "<p> Hello! " . $_SESSION['username'] . "</p>
                    <ul class='dropdown-menu'>
                        <li><button id='addBlog' href='add-blog.html'>Add Blog</button></li>
                        <li><a href='./logout.php'>Logout</a></li>
                    </ul>
                </li>";
        }
        ?>


    </ul>
</nav>