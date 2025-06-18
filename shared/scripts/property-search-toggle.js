      document.addEventListener('DOMContentLoaded', function () {
    // Three-button toggle functionality for property search
    const toggleButtons = document.querySelectorAll('.search-toggle-btn');
    const searchContainers = document.querySelectorAll('.search-container');
    toggleButtons.forEach(button => {
      button.addEventListener('click', function () {
        toggleButtons.forEach(btn => btn.classList.remove('active'));
        searchContainers.forEach(container => container.classList.remove('active'));
        this.classList.add('active');
        const targetId = this.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
      });
    });
