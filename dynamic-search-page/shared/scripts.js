// shared/scripts.js

/* ===== Core Functionality ===== */
document.addEventListener('DOMContentLoaded', function() {

  // Mobile Menu Toggle
  const initMobileMenu = () => {
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    const mobileOverlay = document.getElementById('mobile-overlay');

    if (mobileMenu && navLinks && mobileOverlay) {
      mobileMenu.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        this.innerHTML = navLinks.classList.contains('active') 
          ? '<i class="fas fa-times"></i>' 
          : '<i class="fas fa-bars"></i>';
      });

      mobileOverlay.addEventListener('click', function() {
        navLinks.classList.remove('active');
        mobileOverlay.classList.remove('active');
        mobileMenu.innerHTML = '<i class="fas fa-bars"></i>';
      });
    }
  };

  // Modal/Form Handling
  const initContactForm = () => {
    const ctaButton = document.getElementById('cta-button');
    const modal = document.getElementById('contact-modal');
    const closeModal = document.querySelector('.close-modal');
    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    const closeSuccess = document.getElementById('close-success');

    // Toggle Modal
    if (ctaButton && modal) {
      ctaButton.addEventListener('click', () => {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      });
    }

    // Close Modal
    if (closeModal) {
      closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      });
    }

    // Form Submission
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitButton = form.querySelector('button[type="submit"]');
        const buttonText = submitButton.querySelector('.button-text');
        const spinner = submitButton.querySelector('.spinner');
        
        // Show loading state
        buttonText.textContent = 'Processing...';
        spinner.style.display = 'inline-block';
        
        // Simulate form submission
        setTimeout(() => {
          // On success
          modal.style.display = 'none';
          if (successMessage) successMessage.style.display = 'flex';
          
          // Reset form
          form.reset();
          buttonText.textContent = 'Submit Request';
          spinner.style.display = 'none';
        }, 1500);
      });
    }

    // Close success message
    if (closeSuccess) {
      closeSuccess.addEventListener('click', () => {
        successMessage.style.display = 'none';
        document.body.style.overflow = 'auto';
      });
    }
  };

  // Search Toggle Functionality
  const initSearchToggles = () => {
    const toggleButtons = document.querySelectorAll('.search-toggle-btn');
    const searchContainers = document.querySelectorAll('.search-container');

    toggleButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Toggle buttons
        toggleButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // Toggle containers
        const targetId = this.getAttribute('data-target');
        searchContainers.forEach(container => {
          container.classList.remove('active');
          if (container.id === targetId) container.classList.add('active');
        });
      });
    });
  };

  // Calculator Functionality
  const initCalculators = () => {
    // Mortgage Calculator
    const calculateMortgage = () => {
      const homePrice = parseFloat(document.getElementById('home-price').value) || 0;
      const downPayment = parseFloat(document.getElementById('down-payment').value) || 0;
      const loanTerm = parseInt(document.getElementById('loan-term').value) || 30;
      const interestRate = parseFloat(document.getElementById('interest-rate').value) || 0;
      
      const loanAmount = homePrice - downPayment;
      const monthlyRate = interestRate / 100 / 12;
      const payments = loanTerm * 12;
      
      let monthlyPayment = 0;
      if (monthlyRate > 0) {
        monthlyPayment = loanAmount * 
          (monthlyRate * Math.pow(1 + monthlyRate, payments)) / 
          (Math.pow(1 + monthlyRate, payments) - 1);
      }
      
      // Update DOM
      if (document.getElementById('monthly-payment')) {
        document.getElementById('monthly-payment').textContent = formatCurrency(monthlyPayment);
      }
    };

    // DTI Calculator
    const calculateDTI = () => {
      const income = parseFloat(document.getElementById('monthly-income').value) || 0;
      const debts = parseFloat(document.getElementById('monthly-debts').value) || 0;
      const mortgage = parseFloat(document.getElementById('proposed-mortgage').value) || 0;
      
      const backEndRatio = ((debts + mortgage) / income) * 100;
      
      if (document.getElementById('back-end-ratio')) {
        document.getElementById('back-end-ratio').textContent = backEndRatio.toFixed(0) + '%';
      }
    };

    // Calculator Toggle
    const mortgageToggle = document.getElementById('mortgage-toggle');
    const dtiToggle = document.getElementById('dti-toggle');
    
    if (mortgageToggle && dtiToggle) {
      mortgageToggle.addEventListener('click', () => {
        document.getElementById('mortgage-calculator').style.display = 'flex';
        document.getElementById('dti-calculator').style.display = 'none';
      });
      
      dtiToggle.addEventListener('click', () => {
        document.getElementById('mortgage-calculator').style.display = 'none';
        document.getElementById('dti-calculator').style.display = 'flex';
      });
    }

    // Attach event listeners
    const mortgageInputs = document.querySelectorAll('#mortgage-calculator input, #mortgage-calculator select');
    mortgageInputs.forEach(input => {
      input.addEventListener('change', calculateMortgage);
      input.addEventListener('keyup', calculateMortgage);
    });

    const dtiInputs = document.querySelectorAll('#dti-calculator input');
    dtiInputs.forEach(input => {
      input.addEventListener('change', calculateDTI);
      input.addEventListener('keyup', calculateDTI);
    });

    // Initial calculations
    calculateMortgage();
    calculateDTI();
  };

  // Helper Functions
  const formatCurrency = (amount) => {
    return '$' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };

  /* ===== Initialize Everything ===== */
  initMobileMenu();
  initContactForm();
  initSearchToggles();
  initCalculators();

  /* ===== Optional: Lazy Loading ===== */
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img.lazy');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });
    lazyImages.forEach(img => imageObserver.observe(img));
  }
});

/* ===== Global Functions ===== */
function trackCTA(buttonId) {
  const button = document.getElementById(buttonId);
  if (button) {
    button.addEventListener('click', () => {
      if (window.gtag) {
        gtag('event', 'conversion', {
          'send_to': 'AW-XXXXX/YYYYYYYY'
        });
      }
    });
  }
}
