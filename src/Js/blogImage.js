const imgContainer = [
    "https://media.istockphoto.com/id/1368368019/photo/astronaut-standing-on-the-moon-looking-towards-a-distant-earth.webp?b=1&s=612x612&w=0&k=20&c=wWRkqliihF9UnX8qLb2qDb-FB7MOGBhbdfnFhPGP3N0=",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShGKFoYw3vKLROrL7MSyoty_1h1elye_fgfg&s",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/LH_95.jpg/640px-LH_95.jpg",
    "https://media.istockphoto.com/id/1442849073/photo/the-earth-space-planet-3d-illustration-background-city-lights-on-planet.jpg?s=612x612&w=0&k=20&c=M4xlet0XFVCB4tLHgI3htTPNoemokpJxpmdUqpVBndU=",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlBKeP72xZlrWk2E-YtJ4hhoZ0zfFJmr9LCg&s"
];

const imageLinks = document.querySelectorAll("#blog-image");


imageLinks.forEach(image => {
    const randomIndex = Math.floor(Math.random() * imgContainer.length);
    const randomImage = imgContainer[randomIndex];
    image.src = randomImage;
});