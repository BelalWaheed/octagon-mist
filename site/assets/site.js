/* ==========================================================================
   Octagon Mist — Interactive Site Scripts
   Handles theme switching, code copying, sidebar active state, & modals
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Toggle Logic
  const savedTheme = localStorage.getItem('octagon-mist-theme') || 'dark';
  setTheme(savedTheme);

  document.querySelectorAll('[data-theme-btn]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const theme = e.target.closest('[data-theme-btn]').dataset.themeBtn;
      setTheme(theme);
    });
  });

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('octagon-mist-theme', theme);
    document.querySelectorAll('[data-theme-btn]').forEach(b => {
      b.classList.toggle('active', b.dataset.themeBtn === theme);
    });
  }

  // 2. Copy Code Snippets
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const codeBlock = btn.parentElement.querySelector('code, pre');
      if (!codeBlock) return;

      const text = codeBlock.textContent.trim();
      navigator.clipboard.writeText(text).then(() => {
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        btn.style.color = 'var(--status-success-subtle-fg)';
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.color = '';
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    });
  });

  // 3. Sidebar Active State & Scroll Spy
  const sidebarLinks = document.querySelectorAll('.sidebar-item');
  const sections = document.querySelectorAll('.component-section');

  if (sidebarLinks.length && sections.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          sidebarLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });

    sections.forEach(section => observer.observe(section));
  }
});
