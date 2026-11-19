lucide.createIcons();

const menuButton = document.getElementById('menu-toggle');
const nav = document.getElementById('site-nav');

menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  menuButton.innerHTML = open ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
  lucide.createIcons();
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
  menuButton.innerHTML = '<i data-lucide="menu"></i>';
  lucide.createIcons();
}));

const navLinks = [...nav.querySelectorAll('a[href^="#"]')];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const setActiveNavLink = (id) => {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${id}`;
    link.classList.toggle('active', isActive);
    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
};

setActiveNavLink('home');

const sectionObserver = new IntersectionObserver((entries) => {
  const visibleSection = entries
    .filter((entry) => entry.isIntersecting)
    .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

  if (visibleSection) setActiveNavLink(visibleSection.target.id);
}, { rootMargin: '-25% 0px -65% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] });

sections.forEach((section) => sectionObserver.observe(section));

const contactForm = document.getElementById('contact-form');

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');
  const subject = `Portfolio inquiry from ${name}`;
  const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

  window.location.href = `mailto:julenafronda@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

const heroTitle = document.getElementById('hero-title');
const titlePrefix = heroTitle?.querySelector('.hero-title-prefix');
const titleStudent = heroTitle?.querySelector('.hero-title-student');

if (heroTitle && titlePrefix && titleStudent && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const prefixText = titlePrefix.textContent;
  const studentText = titleStudent.textContent;
  const fullTitle = `${prefixText}${studentText}`;
  const studentStart = prefixText.length;
  let characterIndex = 0;

  titlePrefix.textContent = '';
  titleStudent.textContent = '';
  heroTitle.classList.add('is-typing');

  const typeTitle = () => {
    if (characterIndex < fullTitle.length) {
      const target = characterIndex < studentStart ? titlePrefix : titleStudent;
      target.textContent += fullTitle[characterIndex];
      characterIndex += 1;
      window.setTimeout(typeTitle, characterIndex < studentStart ? 32 : 55);
      return;
    }

    heroTitle.classList.remove('is-typing');
    heroTitle.classList.add('is-typed');
    window.setTimeout(() => {
      titlePrefix.textContent = '';
      titleStudent.textContent = '';
      characterIndex = 0;
      heroTitle.classList.remove('is-typed');
      heroTitle.classList.add('is-typing');
      typeTitle();
    }, 1400);
  };

  window.setTimeout(typeTitle, 250);
}
