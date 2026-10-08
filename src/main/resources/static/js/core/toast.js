/**
 * CinemaFlow Toast Notification Utility
 * Lightweight, accessible, non-blocking alert toasts.
 */

class ToastManager {
  constructor() {
    this.container = null;
    this.init();
  }

  init() {
    if (!document.getElementById('cf-toast-container')) {
      this.container = document.createElement('div');
      this.container.id = 'cf-toast-container';
      this.container.className = 'cf-toast-container';
      this.container.setAttribute('aria-live', 'polite');
      document.body.appendChild(this.container);
    } else {
      this.container = document.getElementById('cf-toast-container');
    }
  }

  show({ title, message, type = 'info', duration = 4000 }) {
    if (!this.container) this.init();

    const toast = document.createElement('div');
    toast.className = `cf-toast cf-toast-${type}`;
    toast.setAttribute('role', 'status');

    // Icon SVGs based on type
    const icons = {
      success: '<svg viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
      error: '<svg viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
      warning: '<svg viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
      info: '<svg viewBox="0 0 24 24" fill="none" stroke="#3B82F6" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
    };

    toast.innerHTML = `
      <div class="cf-toast-icon">${icons[type] || icons.info}</div>
      <div class="cf-toast-content">
        ${title ? `<div class="cf-toast-title">${title}</div>` : ''}
        <div class="cf-toast-message">${message}</div>
      </div>
      <button class="cf-toast-close" aria-label="Dismiss alert">&times;</button>
    `;

    const closeBtn = toast.querySelector('.cf-toast-close');
    const dismiss = () => {
      toast.classList.remove('is-visible');
      setTimeout(() => {
        if (toast.parentElement) toast.parentElement.removeChild(toast);
      }, 250);
    };

    closeBtn.addEventListener('click', dismiss);

    this.container.appendChild(toast);

    // Trigger enter animation
    requestAnimationFrame(() => {
      toast.classList.add('is-visible');
    });

    // Auto dismiss
    if (duration > 0) {
      setTimeout(dismiss, duration);
    }
  }

  success(message, title = 'Success') {
    this.show({ title, message, type: 'success' });
  }

  error(message, title = 'Error') {
    this.show({ title, message, type: 'error' });
  }

  warning(message, title = 'Attention') {
    this.show({ title, message, type: 'warning' });
  }

  info(message, title = 'Notice') {
    this.show({ title, message, type: 'info' });
  }
}

// Global instance
window.cfToast = new ToastManager();
