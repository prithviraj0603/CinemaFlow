/**
 * CinemaFlow Accessible Modal Controller
 */

class ModalManager {
  constructor() {
    this.activeModal = null;
    this.previousFocusedElement = null;
    this.initListeners();
  }

  initListeners() {
    // Listen for Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.activeModal) {
        this.close(this.activeModal.id);
      }
    });

    // Delegated click listener for modal triggers
    document.addEventListener('click', (e) => {
      const openTrigger = e.target.closest('[data-modal-open]');
      if (openTrigger) {
        e.preventDefault();
        const targetId = openTrigger.getAttribute('data-modal-open');
        this.open(targetId, openTrigger);
      }

      const closeTrigger = e.target.closest('[data-modal-close]');
      if (closeTrigger) {
        e.preventDefault();
        const targetId = closeTrigger.getAttribute('data-modal-close') || (this.activeModal ? this.activeModal.id : null);
        if (targetId) this.close(targetId);
      }

      // Click on backdrop directly closes modal
      if (e.target.classList.contains('cf-modal-backdrop') && e.target.classList.contains('is-open')) {
        this.close(e.target.id);
      }
    });
  }

  open(modalId, triggeringElement = null) {
    const modalEl = document.getElementById(modalId);
    if (!modalEl) return;

    this.previousFocusedElement = triggeringElement || document.activeElement;
    modalEl.classList.add('is-open');
    this.activeModal = modalEl;

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Focus the first actionable input or close button
    const focusable = modalEl.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable.length > 0) {
      focusable[0].focus();
    }
  }

  close(modalId) {
    const modalEl = document.getElementById(modalId);
    if (!modalEl) return;

    modalEl.classList.remove('is-open');
    this.activeModal = null;

    // Restore body scroll
    document.body.style.overflow = '';

    // Restore focus
    if (this.previousFocusedElement && typeof this.previousFocusedElement.focus === 'function') {
      this.previousFocusedElement.focus();
    }
  }
}

window.cfModal = new ModalManager();
