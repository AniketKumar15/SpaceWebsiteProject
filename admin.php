<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - Manage Blogs</title>
    <link rel="stylesheet" href="./src/css/adminPanel.css" />
</head>

<body>
    <div class="dashboard-container">

        <!-- Main content area -->
        <div class="main-content">
            <div class="top-bar">
                <div class="user-info">
                    <span>Welcome, Admin</span>
                    <button id="logoutBtn">Logout</button>
                </div>
            </div>

            <!-- Manage Blogs Content -->
            <div class="content" id="manageBlogsContent">
                <h1>Manage Blogs</h1>
                <table id="blogsTable">
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th>Title</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="blogsTableBody">

                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Modal for viewing blog details -->
    <div id="viewBlogModal" class="modal">
        <div class="modal-content">
            <span id="closeModal" class="close-btn">&times;</span>
            <h2 id="modalTitle"></h2>
            <p id="modalShortDesc"></p>
            <div id="modalFullDesc"></div>
        </div>
    </div>

    <script src="./src/js/adminPanel.js"></script>
</body>

</html>