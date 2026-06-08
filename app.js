/* ==========================================================================
   JavaScript Functionality - Right Away Plumbing Services Website
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Sticky Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    
    const checkScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    
    // Check scroll state on page load and scroll event
    checkScroll();
    window.addEventListener('scroll', checkScroll);


    // 2. Mobile Menu Navigation Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link, .nav-cta');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Toggle body scrolling when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when navigation links are clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }


    // 3. Testimonial Reviews Carousel Slider
    const reviews = document.querySelectorAll('#reviews-slider .review-card');
    const prevBtn = document.getElementById('prev-review');
    const nextBtn = document.getElementById('next-review');
    let currentReviewIndex = 0;
    let autoSlideInterval;
    
    const showReview = (index) => {
        reviews.forEach((review, idx) => {
            review.classList.remove('active');
            if (idx === index) {
                review.classList.add('active');
            }
        });
    };
    
    const nextReview = () => {
        currentReviewIndex = (currentReviewIndex + 1) % reviews.length;
        showReview(currentReviewIndex);
    };
    
    const prevReview = () => {
        currentReviewIndex = (currentReviewIndex - 1 + reviews.length) % reviews.length;
        showReview(currentReviewIndex);
    };
    
    if (reviews.length > 0) {
        // Event Listeners for Prev/Next buttons
        if (nextBtn) nextBtn.addEventListener('click', () => {
            nextReview();
            resetAutoSlide();
        });
        
        if (prevBtn) prevBtn.addEventListener('click', () => {
            prevReview();
            resetAutoSlide();
        });
        
        // Automatic slide transitions
        const startAutoSlide = () => {
            autoSlideInterval = setInterval(nextReview, 6000); // changes every 6s
        };
        
        const resetAutoSlide = () => {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        };
        
        startAutoSlide();
        
        // Pause auto-sliding on hover
        const sliderContainer = document.getElementById('reviews-slider');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
            sliderContainer.addEventListener('mouseleave', startAutoSlide);
        }
    }


    // 4. Booking Appointment Form Logic & Validation
    const appointmentForm = document.getElementById('appointment-form');
    const formSuccessMessage = document.getElementById('booking-success');
    const submitBtn = document.getElementById('submit-btn');
    const resetFormBtn = document.getElementById('reset-form-btn');
    
    // UI elements to fill in the success card
    const successName = document.getElementById('success-name');
    const successService = document.getElementById('success-service');
    const successPhone = document.getElementById('success-phone');

    if (appointmentForm && formSuccessMessage) {
        appointmentForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Stop standard form refresh
            
            // Gather input field values
            const nameVal = document.getElementById('form-name').value.trim();
            const phoneVal = document.getElementById('form-phone').value.trim();
            const serviceSelect = document.getElementById('form-service');
            const serviceText = serviceSelect.options[serviceSelect.selectedIndex].text;
            
            // Basic UI loading feedback animation
            const btnText = submitBtn.querySelector('.btn-text');
            const spinner = submitBtn.querySelector('.spinner');
            
            submitBtn.disabled = true;
            if (btnText) btnText.style.opacity = '0.3';
            if (spinner) spinner.classList.remove('hidden');
            
            // Simulate API request network latency (1.2s delay)
            setTimeout(() => {
                // Populate success card fields
                if (successName) successName.textContent = nameVal;
                if (successService) successService.textContent = serviceText;
                if (successPhone) successPhone.textContent = phoneVal;
                
                // Hide standard form elements and show success card
                appointmentForm.classList.add('hidden');
                appointmentForm.style.display = 'none';
                formSuccessMessage.classList.remove('hidden');
                
                // Print debug details to console
                console.log('--- Plumbing Appointment Request Received ---');
                console.log('Customer Name:', nameVal);
                console.log('Phone Number:', phoneVal);
                console.log('Email:', document.getElementById('form-email').value);
                console.log('Service Selected:', serviceText);
                console.log('Preferred Date:', document.getElementById('form-date').value);
                console.log('Project Details:', document.getElementById('form-message').value);
                console.log('---------------------------------------------');
                
                // Re-enable button state
                submitBtn.disabled = false;
                if (btnText) btnText.style.opacity = '1';
                if (spinner) spinner.classList.add('hidden');
            }, 1200);
        });
        
        // Reset and show the form again
        if (resetFormBtn) {
            resetFormBtn.addEventListener('click', () => {
                // Clear fields
                appointmentForm.reset();
                
                // Show form again
                formSuccessMessage.classList.add('hidden');
                appointmentForm.classList.remove('hidden');
                appointmentForm.style.display = 'flex';
            });
        }
    }

});
