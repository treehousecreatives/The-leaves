// JavaScript to toggle the side menu
function openMenu() {
    document.getElementById('side-menu').classList.add('open');
}

function closeMenu() {
    document.getElementById('side-menu').classList.remove('open');
}
// CSS to position the side menu on the right
const style = document.createElement('style');
style.innerHTML = `
    #side-menu {
        position: fixed;
        right: -250px; /* Adjust the width as needed */
        top: 0;
        height: 100%;
        width: 250px; /* Adjust the width as needed */
        transition: right 0.3s ease;
    }
    #side-menu.open {
        right: 0;
    }
`;
document.head.appendChild(style);