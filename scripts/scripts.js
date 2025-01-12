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

// Scroll-based fade-in effect
const fadeIns = document.querySelectorAll('.about-content');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
});

fadeIns.forEach(fadeIn => observer.observe(fadeIn));

document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    fetch(form.action, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            if (response.ok) {
                window.location.href = "thank_you.html";
            } else {
                alert("Something went wrong.");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
});
