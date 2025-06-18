<script>
// Contact Modal Functionality
const contactBtn = document.getElementById('contact-btn');
const modal = document.getElementById('contact-modal');
const closeBtn = document.querySelector('.close-modal');
const successPopup = document.getElementById('success-popup');
const popupOverlay = document.getElementById('popup-overlay');

if (contactBtn && modal && closeBtn) {
  contactBtn.addEventListener('click', function () {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  });
  closeBtn.addEventListener('click', function () {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });
  window.addEventListener('click', function (e) {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
}

// Location toggle buttons
const locationButtons = document.querySelectorAll('.toggle-group .toggle-option');
const selectedLocations = document.getElementById('selectedLocations');
locationButtons.forEach(button => {
  button.addEventListener('click', function () {
    this.classList.toggle('selected');
    updateSelectedLocations();
  });
});
function updateSelectedLocations() {
  const selected = Array.from(locationButtons)
    .filter(btn => btn.classList.contains('selected'))
    .map(btn => btn.dataset.value);
  selectedLocations.value = selected.join(', ');
}

// Terms toggle
const termsToggle = document.getElementById('termsToggle');
const termsAgreed = document.getElementById('termsAgreed');
if (termsToggle && termsAgreed) {
  termsToggle.addEventListener('click', function () {
    const agreed = this.getAttribute('data-agreed') === 'true';
    this.setAttribute('data-agreed', !agreed);
    this.classList.toggle('selected');
    termsAgreed.value = !agreed ? 'agreed' : '';
  });
}

// Form submission with success popup
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (termsAgreed.value !== 'agreed') {
      alert('Please agree to the Terms of Service before submitting.');
      return;
    }
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    const formData = new FormData(contactForm);
    fetch(contactForm.action, {
      method: 'POST',
      body: new URLSearchParams(formData),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.text();
      })
      .then(() => {
        successPopup.style.display = 'block';
        popupOverlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
        contactForm.reset();
        locationButtons.forEach(btn => btn.classList.remove('selected'));
        selectedLocations.value = '';
        termsToggle.classList.remove('selected');
        termsToggle.setAttribute('data-agreed', 'false');
        termsAgreed.value = '';
        modal.style.display = 'none';
      })
      .catch(error => {
        alert('There was an error submitting the form. Please try again later.');
        console.error('Error:', error);
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      });
  });
}

// Close popup handlers
document.getElementById('close-popup')?.addEventListener('click', () => {
  successPopup.style.display = 'none';
  popupOverlay.style.display = 'none';
  document.body.style.overflow = 'auto';
});
popupOverlay?.addEventListener('click', () => {
  successPopup.style.display = 'none';
  popupOverlay.style.display = 'none';
  document.body.style.overflow = 'auto';
});
</script>
