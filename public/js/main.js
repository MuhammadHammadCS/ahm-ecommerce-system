// Utility function to show modern Toast notifications instead of alerts
function showToast(message, type = 'success') {
    let toastContainer = document.getElementById('toast-container');
    
    // Create container if it doesn't exist
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        toastContainer.style.zIndex = '1055';
        document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${type === 'success' ? 'success' : 'danger'} border-0 mb-2 shadow-lg`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');

    toast.innerHTML = `
        <div class="d-flex p-1">
            <div class="toast-body fw-bold fs-6">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;

    toastContainer.appendChild(toast);

    // Requires Bootstrap JS to be loaded
    if (typeof bootstrap !== 'undefined') {
        const bsToast = new bootstrap.Toast(toast, { delay: 3000 });
        bsToast.show();

        toast.addEventListener('hidden.bs.toast', () => {
            toast.remove();
        });
    } else {
        // Fallback if bootstrap JS is not loaded yet
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}

// ==========================================
// Dark Mode Toggle Logic
// ==========================================
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const iconBtn = document.getElementById('theme-icon');
    if(iconBtn) {
        // Simple text emoji swap for now; could use FontAwesome
        iconBtn.innerText = theme === 'light' ? '🌙' : '☀️';
    }
}

// ==========================================
// Odometer Animation Logic
// ==========================================
function initOdometer() {
    const odometers = document.querySelectorAll('.odometer');
    if(odometers.length === 0) return;

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseFloat(entry.target.getAttribute('data-target'));
                animateValue(entry.target, 0, target, 2000);
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% visible

    odometers.forEach(el => observer.observe(el));
}

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        // Easing function (easeOutExpo) for a smooth slow-down at the end
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        
        const currentVal = (easeProgress * (end - start) + start);
        // Format with commas, handle decimals
        if (end % 1 !== 0) {
            obj.innerHTML = currentVal.toFixed(1);
        } else {
            obj.innerHTML = Math.floor(currentVal).toLocaleString();
        }
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initOdometer();
});
