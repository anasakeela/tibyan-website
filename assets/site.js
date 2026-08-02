// ===== Tibyan — shared behaviors =====

document.addEventListener('DOMContentLoaded', () => {

  /* Reveal on scroll */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  /* Mobile nav toggle */
  const toggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  }

  /* Dropdown works on tap for mobile/touch */
  document.querySelectorAll('.has-dropdown > .top-link').forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 900) {
        e.preventDefault();
        link.parentElement.classList.toggle('open');
      }
    });
  });

  /* FAQ accordion */
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(el => {
        el.classList.remove('open');
        el.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  /* Generic form "submit" -> success message (front-end preview only) */
  document.querySelectorAll('form[data-preview-form]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const card = form.closest('.form-card');
      const success = document.querySelector(form.dataset.successTarget);
      if (card) card.style.display = 'none';
      if (success) success.style.display = 'block';
      window.scrollTo({ top: success ? success.offsetTop - 100 : 0, behavior: 'smooth' });
    });
  });

  /* Dynamic "add another child" for parent registration form */
  const addChildBtn = document.getElementById('add-child-btn');
  const childrenWrap = document.getElementById('children-wrap');
  if (addChildBtn && childrenWrap) {
    let childCount = childrenWrap.querySelectorAll('.child-block').length;
    addChildBtn.addEventListener('click', () => {
      childCount++;
      const template = childrenWrap.querySelector('.child-block');
      const clone = template.cloneNode(true);
      clone.querySelector('.child-title span').textContent = 'الابن/الابنة رقم ' + childCount;
      clone.querySelectorAll('input, select').forEach(el => { el.value = ''; });
      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.className = 'remove-child';
      removeBtn.textContent = 'إزالة';
      removeBtn.addEventListener('click', () => clone.remove());
      const titleRow = clone.querySelector('.child-title');
      const existingRemove = titleRow.querySelector('.remove-child');
      if (existingRemove) existingRemove.remove();
      titleRow.appendChild(removeBtn);
      childrenWrap.appendChild(clone);
    });
  }

});
