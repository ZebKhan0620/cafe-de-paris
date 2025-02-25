document.addEventListener('DOMContentLoaded', () => {
    initAccessibility();
});

function initAccessibility() {
    // Enhance button accessibility
    const interactiveElements = document.querySelectorAll('button, [role="button"]');
    
    interactiveElements.forEach(element => {
        // Ensure all interactive elements are keyboard accessible
        if (!element.getAttribute('tabindex')) {
            element.setAttribute('tabindex', '0');
        }

        // Add keyboard interaction
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                element.click();
            }
        });
    });

    // Add aria-live region for status updates
    const statusRegion = document.querySelector('[aria-live="polite"]') || 
        (() => {
            const region = document.createElement('div');
            region.setAttribute('aria-live', 'polite');
            region.className = 'sr-only';
            document.body.appendChild(region);
            return region;
        })();

    // Listen for copy events
    document.addEventListener('addressCopied', (e) => {
        if (statusRegion) {
            statusRegion.textContent = e.detail.message;
            setTimeout(() => {
                statusRegion.textContent = '';
            }, 2000);
        }
    });
} 