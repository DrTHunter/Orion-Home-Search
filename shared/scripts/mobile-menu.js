
// Mobile menu functionality
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');
const mobileOverlay = document.getElementById('mobile-overlay');
if (mobileMenu && navLinks && mobileOverlay) {
  mobileMenu.addEventListener('click', function () {
    navLinks.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    if (navLinks.classList.contains('active')) {
      mobileMenu.innerHTML = '<i class="fas fa-times"></i>';
    } else {
      mobileMenu.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });
  mobileOverlay.addEventListener('click', function () {
    navLinks.classList.remove('active');
    mobileOverlay.classList.remove('active');
    mobileMenu.innerHTML = '<i class="fas fa-bars"></i>';
  });
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function () {
      navLinks.classList.remove('active');
      mobileOverlay.classList.remove('active');
      mobileMenu.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });
}
