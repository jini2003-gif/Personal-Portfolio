
(function(){
  "use strict";
  var sections = Array.from(document.querySelectorAll('section[id]'));
  var navLinks = document.querySelectorAll('[data-nav]');
  var nav = document.getElementById('nav');
  var burger = document.getElementById('burger');
  var mobileMenu = document.getElementById('mobileMenu');
  var railFill = document.getElementById('railFill');
  var railTrack = document.getElementById('railTrack');
  var toTop = document.getElementById('toTop');
  var heroBg = document.getElementById('heroBg');

  document.getElementById('year').textContent = new Date().getFullYear();

  /* Nav scroll state */
  function onScroll(){
    nav.classList.toggle('scrolled', window.scrollY > 40);
    toTop.classList.toggle('show', window.scrollY > 700);

    var doc = document.documentElement;
    var scrollTop = window.scrollY;
    var max = doc.scrollHeight - window.innerHeight;
    var pct = max > 0 ? Math.min(100, (scrollTop / max) * 100) : 0;
    railFill.style.height = pct + '%';
  }
  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();

  /* Mobile menu */
  burger.addEventListener('click', function(){
    burger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
  mobileMenu.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      burger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

  /* Active section tracking (nav underline + rail nodes) */
  var railNodes = {};
  sections.forEach(function(sec){
    var node = document.createElement('div');
    node.className = 'signal-rail__node';
    node.title = sec.id;
    node.addEventListener('click', function(){
      sec.scrollIntoView({ behavior:'smooth' });
    });
    railTrack.appendChild(node);
    railNodes[sec.id] = node;
  });

  function positionNodes(){
    var total = document.documentElement.scrollHeight - window.innerHeight;
    sections.forEach(function(sec){
      var top = sec.offsetTop;
      var pct = total > 0 ? Math.min(100, Math.max(0, (top / total) * 100)) : 0;
      railNodes[sec.id].style.top = pct + '%';
    });
  }
  window.addEventListener('resize', positionNodes);
  positionNodes();

  var observer = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      var id = entry.target.id;
      if(entry.isIntersecting){
        navLinks.forEach(function(l){ l.classList.toggle('active', l.getAttribute('href') === '#' + id); });
        if(railNodes[id]){
          Object.values(railNodes).forEach(function(n){ n.classList.remove('active'); });
          railNodes[id].classList.add('active');
        }
      }
    });
  }, { threshold:0.4, rootMargin:'-10% 0px -10% 0px' });
  sections.forEach(function(sec){ observer.observe(sec); });

  /* Scroll reveal */
  var revealObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold:0.15 });
  document.querySelectorAll('.reveal, .reveal-stagger').forEach(function(el){ revealObserver.observe(el); });

  /* Hero parallax glow (subtle, mouse-reactive) */
  if(window.matchMedia('(pointer:fine)').matches){
    document.querySelector('.hero').addEventListener('mousemove', function(e){
      var x = (e.clientX / window.innerWidth - 0.5) * 20;
      var y = (e.clientY / window.innerHeight - 0.5) * 20;
      heroBg.style.transform = 'translate(' + x + 'px,' + y + 'px)';
    });
  }

  /* Back to top */
  toTop.addEventListener('click', function(){
    window.scrollTo({ top:0, behavior:'smooth' });
  });

  /* Creative filter */
  var chips = document.querySelectorAll('.filter-chip');
  var items = document.querySelectorAll('.creative-item');
  chips.forEach(function(chip){
    chip.addEventListener('click', function(){
      chips.forEach(function(c){ c.classList.remove('active'); });
      chip.classList.add('active');
      var f = chip.getAttribute('data-filter');
      items.forEach(function(item){
        item.style.display = (f === 'all' || item.getAttribute('data-cat') === f) ? '' : 'none';
      });
    });
  });


  /* Horizontal showcase rails: Event Posters, Certifications, Achievements */
  function setupHorizontalRail(container, label){
    if(!container || container.dataset.horizontalReady === 'true') return;
    container.dataset.horizontalReady = 'true';

    var shell = document.createElement('div');
    shell.className = 'horizontal-scroll-shell';
    container.parentNode.insertBefore(shell, container);
    shell.appendChild(container);
    container.classList.add('horizontal-scroll');
    container.setAttribute('aria-label', label + ' horizontal scrolling list');

    var prev = document.createElement('button');
    var next = document.createElement('button');
    prev.className = 'scroll-arrow prev';
    next.className = 'scroll-arrow next';
    prev.type = next.type = 'button';
    prev.setAttribute('aria-label','Scroll ' + label + ' left');
    next.setAttribute('aria-label','Scroll ' + label + ' right');
    prev.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>';
    next.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>';
    shell.appendChild(prev);
    shell.appendChild(next);

    function update(){
      var max = container.scrollWidth - container.clientWidth;
      prev.disabled = container.scrollLeft <= 2;
      next.disabled = container.scrollLeft >= max - 2;
    }
    function step(direction){
      container.scrollBy({left: direction * Math.max(container.clientWidth * .78, 260), behavior:'smooth'});
    }
    prev.addEventListener('click', function(){ step(-1); });
    next.addEventListener('click', function(){ step(1); });
    container.addEventListener('scroll', update, {passive:true});
    window.addEventListener('resize', update);
    update();
  }

  var posterRail = document.getElementById('masonry');
  setupHorizontalRail(posterRail, 'Event Posters');

  var achievementGrids = document.querySelectorAll('#achievements .ach__grid');
  achievementGrids.forEach(function(grid, index){
    var heading = grid.parentElement.querySelector('.ach__subhead');
    var label = heading ? heading.textContent.trim() : (index === 0 ? 'Certifications' : 'Achievements');
    setupHorizontalRail(grid, label);
  });

  /* Hero rotating role/skill text */
  var rotatorWords = document.querySelectorAll('.hero__rotator-word');
  if(rotatorWords.length > 1){
    var rotatorIndex = 0;
    var rotatorReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setInterval(function(){
      var current = rotatorWords[rotatorIndex];
      var nextIndex = (rotatorIndex + 1) % rotatorWords.length;
      var next = rotatorWords[nextIndex];
      current.classList.remove('is-active');
      current.classList.add('is-exit');
      next.classList.add('is-active');
      setTimeout(function(){ current.classList.remove('is-exit'); }, rotatorReduced ? 0 : 650);
      rotatorIndex = nextIndex;
    }, 2600);
  }

  /* Contact form — validates, then submits to Formspree so messages land in email */
  var form = document.getElementById('contactForm');
  var note = document.getElementById('formNote');
  var submitBtn = document.getElementById('formSubmit');
  var nameInput = document.getElementById('name');
  var emailInput = document.getElementById('email');
  var messageInput = document.getElementById('message');
  var nameError = document.getElementById('nameError');
  var emailError = document.getElementById('emailError');
  var messageError = document.getElementById('messageError');
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setFieldError(input, errorEl, message){
    var wrap = input.closest('.field');
    if(message){
      wrap.classList.add('is-invalid');
      errorEl.textContent = message;
    } else {
      wrap.classList.remove('is-invalid');
      errorEl.textContent = '';
    }
    return !message;
  }

  [nameInput, emailInput, messageInput].forEach(function(input){
    input.addEventListener('input', function(){
      input.closest('.field').classList.remove('is-invalid');
    });
  });

  form.addEventListener('submit', function(e){
    e.preventDefault();
    note.classList.remove('is-success');
    note.classList.remove('is-error');

    var nameOk = setFieldError(nameInput, nameError, nameInput.value.trim() ? '' : 'Please enter your name.');
    var emailVal = emailInput.value.trim();
    var emailOk = setFieldError(
      emailInput, emailError,
      !emailVal ? 'Please enter your email address.' : (!emailPattern.test(emailVal) ? 'Please enter a valid email address.' : '')
    );
    var messageOk = setFieldError(messageInput, messageError, messageInput.value.trim() ? '' : 'Please enter a message.');

    if(!nameOk || !emailOk || !messageOk){
      note.textContent = 'Please fix the highlighted fields above.';
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    }).then(function(response){
      if(response.ok){
        note.classList.add('is-success');
        note.textContent = "Thanks — your message has been sent. I'll get back to you soon.";
        form.reset();
      } else {
        return response.json().then(function(data){
          var msg = (data && data.errors && data.errors.length) ? data.errors.map(function(er){ return er.message; }).join(', ') : null;
          note.classList.add('is-error');
          note.textContent = msg || "Something went wrong sending your message — please email me directly at jenivishnu1@gmail.com instead.";
        });
      }
    }).catch(function(){
      note.classList.add('is-error');
      note.textContent = "Something went wrong sending your message — please email me directly at jenivishnu1@gmail.com instead.";
    }).finally(function(){
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    });
  });
})();
