document.addEventListener('DOMContentLoaded', function() {
  // IntersectionObserver reveal with stagger via transition-delay
  var observerOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.05
  };

  function revealCallback(entries, observer) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var el = entry.target;
        // If it's a container of items, stagger children
        if (el.classList.contains('specialization-grid') || el.classList.contains('category-grid')) {
          var children = Array.from(el.querySelectorAll('.fade-in'));
          children.forEach(function(child, idx) {
            child.style.transitionDelay = (idx * 120) + 'ms';
            child.classList.add('visible');
          });
        } else if (el.classList.contains('hero')) {
          // reveal hero children in order
          var heroChildren = Array.from(el.querySelectorAll('.fade-in'));
          heroChildren.forEach(function(child, idx) {
            child.style.transitionDelay = (idx * 140) + 'ms';
            child.classList.add('visible');
          });
        } else {
          // single element
          el.classList.add('visible');
        }
        observer.unobserve(el);
      }
    });
  }

  var revealObserver = null;
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced) {
    revealObserver = new IntersectionObserver(revealCallback, observerOptions);
  }

  // Observe hero (container) so we can stagger its children
  var hero = document.querySelector('header.hero');
  if (hero) {
    if (prefersReduced) {
      // reveal hero children immediately
      hero.querySelectorAll('.fade-in').forEach(function(c) { c.classList.add('visible'); });
    } else {
      revealObserver.observe(hero);
    }
  }

  // Observe specialization grid and category grids
  document.querySelectorAll('.specialization-grid, .category-grid').forEach(function(grid) {
    // ensure children have fade-in class
    grid.querySelectorAll('.specialization-card, .category-card').forEach(function(card) {
      card.classList.add('fade-in');
    });
    if (prefersReduced) {
      grid.querySelectorAll('.fade-in').forEach(function(c, idx) { c.classList.add('visible'); });
    } else {
      revealObserver.observe(grid);
    }
  });

  // Observe any remaining .fade-in elements (like H2, small sections)
  document.querySelectorAll('.fade-in').forEach(function(el) {
    // skip if already observed via grid or hero
    if (!el.closest('.specialization-grid') && !el.closest('.category-grid') && !el.closest('header.hero')) {
      if (prefersReduced) {
        el.classList.add('visible');
      } else {
        revealObserver.observe(el);
      }
    }
  });

  // Parallax effect for hero background (subtle)
  var heroBg = document.querySelector('.hero-bg');
  if (heroBg && !prefersReduced) {
    var lastScroll = 0;
    function onScroll() {
      lastScroll = window.scrollY;
      requestAnimationFrame(function() {
        // Move background slightly slower than scroll for parallax
        var offset = Math.min(lastScroll * 0.15, 120);
        heroBg.style.transform = 'translateY(' + (offset * -1) + 'px) scale(1.03)';
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
});
