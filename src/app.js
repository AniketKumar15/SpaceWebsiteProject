const menuBtn = document.querySelector('.menuBtn');
const menu = document.querySelector('.menuPanel');
let toggle = false;

menuBtn.addEventListener('click', () => {
    if (!toggle) {
        menu.classList.add('active');
        toggle = true;
    } else {
        menu.classList.remove('active');
        toggle = false;
    }
})

