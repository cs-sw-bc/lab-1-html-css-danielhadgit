document.addEventListener('DOMContentLoaded', function() {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav-links');
  var navbar = document.querySelector('.navbar');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', function() {
    var open = nav.classList.toggle('open');
    navbar.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Close nav when clicking a link (mobile)
  nav.querySelectorAll('a').forEach(function(a) {
    a.addEventListener('click', function() {
      nav.classList.remove('open');
      navbar.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Click outside to close
  document.addEventListener('click', function(e) {
    if (!navbar.contains(e.target)) return;
    // If nav is open and click is outside nav-links, close
    if (nav.classList.contains('open') && !nav.contains(e.target) && !toggle.contains(e.target)) {
      nav.classList.remove('open');
      navbar.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
});
