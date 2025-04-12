const modal = document.getElementById("viewBlogModal");
const closeModal = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const modalShortDesc = document.getElementById("modalShortDesc");
const modalFullDesc = document.getElementById("modalFullDesc");

// Close the modal when user clicks the close button
closeModal.onclick = function () {
    modal.style.display = "none";
};

// Fetch blog data and show it in the table format
document.addEventListener('DOMContentLoaded', function () {
    fetchBlogs();
});

function fetchBlogs() {
    fetch('Components/get_blogs.php')
        .then(response => response.json())
        .then(blogs => {
            const blogsTableBody = document.getElementById('blogsTableBody');
            blogsTableBody.innerHTML = ''; // Clear existing rows

            blogs.forEach((blog, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${blog.title}</td>
                    <td>
                        <button onclick="viewBlog(${blog.id})">View</button>
                        <button onclick="acceptBlog(${blog.id})">Accept</button>
                        <button onclick="rejectBlog(${blog.id})">Reject</button>
                    </td>
                `;
                blogsTableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching blogs:', error);
        });
}

// View blog details in the modal
function viewBlog(blogId) {
    fetch(`Components/get_blog_details.php?id=${blogId}`)
        .then(response => response.json())
        .then(blog => {
            modalTitle.textContent = "Title: " + blog.title;
            modalShortDesc.innerHTML = "<b>Short Description:</b>" + blog.short_desc;
            modalFullDesc.innerHTML = "<b>Full Description:</b> " + blog.full_desc;
            modal.style.display = "block";
        })
        .catch(error => {
            console.error('Error fetching blog details:', error);
        });
}

function acceptBlog(blogId) {
    fetch(`Components/update_blog_status.php?id=${blogId}&status=accepted`)
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                alert('Blog accepted!');
                fetchBlogs(); // Refresh the blogs list
            } else {
                alert('Error accepting blog!');
            }
        })
        .catch(error => {
            console.error('Error accepting blog:', error);
        });
}

// Reject blog (just an example)
function rejectBlog(blogId) {
    fetch(`Components/update_blog_status.php?id=${blogId}&status=rejected`)
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                alert('Blog rejected!');
                fetchBlogs(); // Refresh the blogs list
            } else {
                alert('Error rejecting blog!');
            }
        })
        .catch(error => {
            console.error('Error rejecting blog:', error);
        });
}
