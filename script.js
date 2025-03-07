// Dark Mode Toggle (unchanged)
class CssPropControl {
  constructor(element) {
    this.element = element;
  }
  get(varName) {
    return getComputedStyle(this.element).getPropertyValue(varName);
  }
  set(varName, val) {
    return this.element.style.setProperty(varName, val);
  }
}

const bodyCssProps = new CssPropControl(document.body);
const toggle = document.querySelector('#dark-mode-toggle');
toggle.addEventListener('click', () => {
  let mode = toggle.checked ? 'dark' : 'light';
  bodyCssProps.set('--background', bodyCssProps.get(`--${mode}-background`));
  bodyCssProps.set('--primary', bodyCssProps.get(`--${mode}-primary`));
  bodyCssProps.set('--link', bodyCssProps.get(`--${mode}-link`));
});

// Loader Animation
function runLoaderAnimation() {
  if (!window.gsap || !window.CSSRulePlugin) {
    console.error('GSAP or CSSRulePlugin not loaded');
    showContent(); // Fallback to show content if animation fails
    return;
  }

  const tl = gsap.timeline({
    onComplete: () => {
      document.querySelector('.loader').style.display = 'none';
      const mainContent = document.querySelector('.main-content');
      mainContent.style.display = 'block';
      gsap.to(mainContent, { opacity: 1, duration: 0.5 });
      document.body.style.overflow = 'auto';
    }
  });

  // Since loader starts visible, we skip initial fade-in
  tl.to(CSSRulePlugin.getRule('body:before'), { cssRule: { top: '50%' }, duration: 0.2, ease: 'power2.out' }, 'close')
    .to(CSSRulePlugin.getRule('body:after'), { cssRule: { bottom: '50%' }, duration: 0.2, ease: 'power2.out' }, 'close')
    .to(CSSRulePlugin.getRule('body:before'), { cssRule: { top: '0%' }, duration: 0.2, ease: 'power2.out' }, '+=1', 'open')
    .to(CSSRulePlugin.getRule('body:after'), { cssRule: { bottom: '0%' }, duration: 0.2, ease: 'power2.out' }, '-=0.2', 'open')
    .to('.loader', { opacity: 0, duration: 0.3 }, '-=0.2');
}

// Fallback function if animation fails
function showContent() {
  document.querySelector('.loader').style.display = 'none';
  const mainContent = document.querySelector('.main-content');
  mainContent.style.display = 'block';
  mainContent.style.opacity = '1';
  document.body.style.overflow = 'auto';
}

// Run loader immediately
document.addEventListener('DOMContentLoaded', () => {
  runLoaderAnimation();
});

// Talking Character (unchanged)
const scripts = [
  "Hello! Welcome to my portfolio.",
  "I mostly program in C++, C# and Java. But I know a bit of web development too.",
  "Feel free to contact me anytime.",
  "I enjoy working on personal game development projects.",
  "I'm currently working on my videogame called Warm Rain of Summer.",
  "More projects in Algorithms and Data Structure coming soon!",
  "I'm currently working on a side project, a Windows 98 style website."
];

function typeWriter(text, element, speed) {
  let i = 0;
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      element.style.borderRight = 'none';
    }
  }
  type();
}

function showTalkingCharacter() {
  const randomScript = scripts[Math.floor(Math.random() * scripts.length)];
  const speechElement = document.getElementById('character-speech');
  const talkingCharacter = document.getElementById('talking-character');
  speechElement.innerHTML = '';
  speechElement.style.borderRight = '2px solid black';
  typeWriter(randomScript, speechElement, 30);
  talkingCharacter.classList.add('show');
  setTimeout(() => talkingCharacter.classList.remove('show'), 6000);
}

document.getElementById('close-character').addEventListener('click', () => {
  document.getElementById('talking-character').classList.remove('show');
});

setInterval(showTalkingCharacter, 10000);

// Tiles Page Transition
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetUrl = this.href;

    const tl = gsap.timeline({
      onComplete: () => {
        window.location.href = targetUrl;
      }
    });

    tl.to('.loader', { width: '100%', duration: 0.7, ease: 'power2.inOut' })
      .to('.loader', { width: '0%', duration: 0.7, ease: 'power2.inOut' });
  });
});

setTimeout(() => {
  const links = document.querySelectorAll('nav ul li a[data-page]');
  console.log('Found nav links:', links.length);
  links.forEach(link => { /* same as above */ });
}, 100);