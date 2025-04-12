// Get elements
const addBlogBtn = document.getElementById('addBlog');
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('closeBtn');

// Open modal when 'Add Blog' button is clicked
addBlogBtn.addEventListener('click', function () {
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
});

// Close modal when the 'X' button is clicked
closeBtn.addEventListener('click', function () {
    modal.style.display = 'none';
});

// Close modal if clicked outside the modal content
window.addEventListener('click', function (event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});

// Optional: Submit form and handle blog post submission
// document.getElementById('addBlogForm').addEventListener('submit', function (event) {
//     event.preventDefault();

//     const title = document.getElementById('title').value;
//     const shortDesc = document.getElementById('shortDesc').value;
//     const fullDesc = document.getElementById('fullDesc').value;

//     // Here you can send the data to your server via AJAX or handle it as needed
//     console.log('Title:', title);
//     console.log('Short Description:', shortDesc);
//     console.log('Full Description:', fullDesc);

//     // After submission, close the modal
//     modal.style.display = 'none';
// });
