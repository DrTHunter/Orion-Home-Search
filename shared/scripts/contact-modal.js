
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

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate terms agreement
        if (termsAgreed.value !== 'agreed') {
            alert('Please agree to the Terms of Service before submitting.');
            return;
        }

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        // Prepare form data
        const formData = new FormData(contactForm);
        
        // Add security token to the form data
        formData.append('securityToken', 'xTk9F#2pLq$8zRn!7vYw*5sBm@4dGc%1hJ'); // Same token as in Apps Script

        fetch(contactForm.action, {
            method: 'POST',
            body: new URLSearchParams(formData),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            if (data.result === "error") {
                throw new Error(data.message);
            }
            
            // Show success popup
            successPopup.style.display = 'block';
            popupOverlay.style.display = 'block';
            document.body.style.overflow = 'hidden';

            // Reset form
            contactForm.reset();

            // Reset location selections
            locationButtons.forEach(btn => btn.classList.remove('selected'));
            selectedLocations.value = '';

            // Reset terms agreement
            termsToggle.classList.remove('selected');
            termsToggle.setAttribute('data-agreed', 'false');
            termsAgreed.value = '';

            // Close the modal
            modal.style.display = 'none';
        })
        .catch(error => {
            alert('There was an error submitting the form: ' + error.message);
            console.error('Error:', error);
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        });
    });

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
});


