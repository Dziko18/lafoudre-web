// === Carousel control ===
const carousel = document.querySelector('#lafoudreCarousel');

if (carousel) {
    const carouselInstance = new bootstrap.Carousel(carousel, {
        interval: 3000,
        ride: 'carousel'
    });

    let direction = 1;

    setInterval(() => {
        const items = carousel.querySelectorAll('.carousel-item');
        const active = carousel.querySelector('.carousel-item.active');
        const index = Array.from(items).indexOf(active);

        if (index === items.length - 1) {
            direction = -1;
        } else if (index === 0) {
            direction = 1;
        }

        if (direction === 1) {
            carouselInstance.next();
        } else {
            carouselInstance.prev();
        }
    }, 3000);
}

// === Login System ===
document.getElementById("loginForm")?.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;

    if (email) {
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userName", email.split("@")[0]);

        updateNavbar();

        const loginModalEl = document.getElementById("loginModal");
        const loginModal = bootstrap.Modal.getInstance(loginModalEl);
        loginModal?.hide();
    }
});

function googleLogin() {
    localStorage.setItem("userEmail", "user@gmail.com");
    localStorage.setItem("userName", "Google User");
    updateNavbar();

    const loginModalEl = document.getElementById("loginModal");
    const loginModal = bootstrap.Modal.getInstance(loginModalEl);
    loginModal?.hide();
}

function logout() {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    updateNavbar();
}

// === Update Navbar Login/Profile ===
function updateNavbar() {
    const userName = localStorage.getItem("userName");
    const profileDropdown = document.getElementById("profileDropdown");
    const loginButton = document.querySelector('a[href="login.html"], a[href="register.html"]');

    if (profileDropdown && loginButton) {
        if (userName) {
            loginButton.classList.add("d-none");
            profileDropdown.classList.remove("d-none");
        } else {
            loginButton.classList.remove("d-none");
            profileDropdown.classList.add("d-none");
        }
    }
}

// === DOM Ready ===
document.addEventListener("DOMContentLoaded", function () {

    document.body.classList.add("page-loaded");

    updateNavbar();

    if (typeof updateCartCount === "function") {
        updateCartCount();
    }

    // === Active menu navbar ===
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    navLinks.forEach(link => {
        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });

    // === Close hamburger menu saat klik link ===
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navbarCollapse = document.getElementById("navbarNav");

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (
                navbarToggler &&
                window.getComputedStyle(navbarToggler).display !== "none"
            ) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                bsCollapse?.hide();
            }
        });
    });

    // === Smooth page transition (navbar only) ===
    const transitionLinks = document.querySelectorAll('.navbar-nav .nav-link, .navbar-brand');

    transitionLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            const nextUrl = this.getAttribute("href");

            if (!nextUrl || nextUrl === currentPage) return;

            e.preventDefault();

            document.body.classList.remove("page-loaded");

            setTimeout(() => {
                window.location.href = nextUrl;
            }, 180);
        });
    });
});

window.addEventListener('load', function () {
    document.body.classList.add('page-loaded');
});