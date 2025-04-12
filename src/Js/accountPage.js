// Function to show Login form
function showLogin() {
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("signupForm").style.display = "none";
}

// Function to show Signup form
function showSignup() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("signupForm").style.display = "block";
}

// Login logic (simplified)
function login() {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    if (username && password) {
        alert("Login Successful!"); // Replace with actual login logic
    } else {
        alert("Please fill in all fields.");
    }
}

// Signup logic (simplified)
function signup() {
    const username = document.getElementById("signupUsername").value;
    const password = document.getElementById("signupPassword").value;
    const email = document.getElementById("signupEmail").value;

    if (username && password && email) {
        alert("Signup Successful!"); // Replace with actual signup logic
    } else {
        alert("Please fill in all fields.");
    }
}
