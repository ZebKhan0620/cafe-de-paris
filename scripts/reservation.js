document.addEventListener('DOMContentLoaded', () => {
    const components = {
        reservation: initializeReservationSection(),
        time: initializeTimeAndStatus(),
        copy: initCopyAddress(),
        contact: initContactButtons(),
        map: initMapInteractions(),
        icons: initAnimatedIcons()
    };
});

function initializeReservationSection() {
    // Check if we're on the reservation page
    const reservationSection = document.getElementById('place');
    if (!reservationSection) return null;

    // Initialize all components
    const components = {
        map: initMapLoader(),
        time: initParisTime(),
        floating: initFloatingElements(),
        contact: initContactButtons(),
        copy: initCopyAddress()
    };

    return components;
}

function initMapLoader() {
    const container = document.querySelector('.map-hover');
    const iframe = container?.querySelector('iframe');
    
    if (!container || !iframe) {
        console.log('Map container or iframe not found');
        return null;
    }

    // Add loading state
    container.classList.add('loading');
    
    // Load map when container comes into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (iframe.dataset.src) {
                    iframe.src = iframe.dataset.src;
                }
                container.classList.remove('loading');
                observer.disconnect();
            }
        });
    });

    observer.observe(container);
    return { container, iframe };
}

function initParisTime() {
    const timeElement = document.querySelector('.paris-time');
    if (!timeElement) return;

    function updateParisTime() {
        const options = {
            timeZone: 'Europe/Paris',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        };
        
        const parisTime = new Date().toLocaleTimeString('fr-FR', options);
        timeElement.textContent = `Paris Time: ${parisTime}`;
    }

    updateParisTime();
    setInterval(updateParisTime, 1000);
}

function initFloatingElements() {
    const elements = document.querySelectorAll('.floating-leaves');
    
    elements.forEach(element => {
        const duration = 8 + Math.random() * 4;
        const delay = Math.random() * -duration;

        element.style.animationDuration = `${duration}s`;
        element.style.animationDelay = `${delay}s`;
    });
}

function initParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        document.querySelectorAll('.parallax-bg').forEach(element => {
            const speed = 0.5;
            element.style.setProperty('--scroll-offset', `${scrolled * speed}px`);
        });
    });
}

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.animate-on-scroll').forEach((element) => {
        observer.observe(element);
    });
}

// Copy Address Functionality
function initCopyAddress() {
    const copyBtn = document.querySelector('.inline-copy-btn');
    if (!copyBtn) return;

    const addressText = '30 Rue Le Peletier, 75009 Paris, France';

    copyBtn.addEventListener('click', async () => {
        try {
            // Copy to clipboard
            await navigator.clipboard.writeText(addressText);
            
            // Visual feedback elements
            const defaultText = copyBtn.querySelector('.default-text');
            const successText = copyBtn.querySelector('.success-text');
            
            // Add success state
            copyBtn.classList.add('bg-emerald-500/20', 'hover:bg-emerald-500/30');
            defaultText.classList.add('hidden');
            successText.classList.remove('hidden');
            
            // Create and trigger ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'absolute inset-0 bg-emerald-500/20 animate-ripple rounded-lg';
            copyBtn.appendChild(ripple);

            // Reset button state after animation
            setTimeout(() => {
                // Remove success state
                copyBtn.classList.remove('bg-emerald-500/20', 'hover:bg-emerald-500/30');
                defaultText.classList.remove('hidden');
                successText.classList.add('hidden');
                ripple.remove();
            }, 2000);

            // Trigger success feedback for screen readers
            const event = new CustomEvent('addressCopied', { 
                detail: { message: 'Address copied to clipboard' } 
            });
            document.dispatchEvent(event);

        } catch (error) {
            console.error('Failed to copy address:', error);
            // Handle error state
            copyBtn.classList.add('bg-red-500/20');
            setTimeout(() => copyBtn.classList.remove('bg-red-500/20'), 2000);
        }
    });

    // Add hover effect
    copyBtn.addEventListener('mouseenter', () => {
        const icon = copyBtn.querySelector('svg');
        icon.classList.add('rotate-12');
    });

    copyBtn.addEventListener('mouseleave', () => {
        const icon = copyBtn.querySelector('svg');
        icon.classList.remove('rotate-12');
    });
}

// Quick Contact Buttons
function initContactButtons() {
    document.querySelectorAll('.contact-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.dataset.type;
            switch(type) {
                case 'call':
                    window.location.href = 'tel:+81123456789';
                    break;
                case 'email':
                    window.location.href = 'mailto:contact@restaurant.com';
                    break;
                case 'directions':
                    window.open('https://maps.google.com/?q=30+Rue+Le+Peletier,+75009+Paris,+France');
                    break;
            }
        });
    });
}

function initializeTimeAndStatus() {
    const timeElement = document.querySelector('.tokyo-time');
    const statusIndicator = document.querySelector('.status-indicator');
    const statusText = document.querySelector('.status-text');

    if (!timeElement || !statusIndicator || !statusText) return;

    function updateTimeAndStatus() {
        try {
            const now = new Date();
            const options = {
                timeZone: 'Asia/Tokyo',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            };
            
            const tokyoTime = new Intl.DateTimeFormat('ja-JP', options).format(now);
            timeElement.textContent = `Tokyo Time: ${tokyoTime}`;

            // Update status based on Paris time
            const parisTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Paris' }));
            const hours = parisTime.getHours();
            const isOpen = hours >= CONFIG.RESTAURANT.hours.open && 
                          hours < CONFIG.RESTAURANT.hours.close;

            statusIndicator.className = `status-indicator ${isOpen ? 'open' : 'closed'}`;
            statusText.textContent = isOpen ? 'Open Now' : 'Closed';
            statusText.className = `status-text ${isOpen ? 'text-green-400' : 'text-red-400'}`;
        } catch (error) {
            console.error('Time update error:', error);
        }
    }

    updateTimeAndStatus();
    setInterval(updateTimeAndStatus, 60000);
}

function initMapInteractions() {
  const mapContainer = document.querySelector('.map-container');
  const loadingOverlay = document.querySelector('.map-loading-overlay');
  const iframe = document.querySelector('.map-hover iframe');

  if (!mapContainer || !loadingOverlay || !iframe) return;

  // Show loading overlay initially
  loadingOverlay.classList.remove('hidden');

  // Hide loading overlay when map loads
  iframe.addEventListener('load', () => {
    loadingOverlay.classList.add('hidden');
  });

  // Add intersection observer for animation on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        mapContainer.classList.add('animate-fade-in');
        observer.disconnect();
      }
    });
  }, { threshold: 0.2 });

  observer.observe(mapContainer);
}

function initAnimatedIcons() {
  // Add animation class to icons
  document.querySelectorAll('.contact-btn svg').forEach(icon => {
    icon.classList.add('icon-animate');
    // Add random delay to each icon
    icon.style.animationDelay = `${Math.random() * 1}s`;
  });
}
