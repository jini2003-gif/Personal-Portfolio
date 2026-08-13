# Jiniththa Santhakumar — Portfolio

A personal portfolio website for **Jiniththa Santhakumar**, BICT (Hons) undergraduate at the University of Vavuniya, aspiring UI/UX Designer and Web Developer. The site showcases education, technical skills, projects, experience, creative work, achievements, CV and contact details in a single-page, scroll-driven layout.

**Live sections:** Home · About · Education · Skills · Projects · Experience · Creative · Achievements · CV · Contact

---

## ✨ Features

- **Single-page navigation** — sticky nav bar with active-link highlighting as you scroll, plus a mobile burger menu.
- **Signal rail** — a fixed vertical progress bar (desktop only) with clickable nodes for each section, showing scroll position at a glance.
- **Animated hero** — rotating role/title text, mouse-reactive parallax background glow, and quick-action buttons (Explore Work, Download CV, Contact Me).
- **Scroll-reveal animations** — sections and cards fade/slide into view as the user scrolls.
- **Horizontal scroll rails** — swipeable, arrow-navigable carousels for event posters, certifications and achievements.
- **Creative gallery filter** — filterable grid of creative/design work by category.
- **Contact form** — client-side validation (name, email, message) with submission handled via [Formspree](https://formspree.io/), including success/error states.
- **Back-to-top button** and **responsive design** across mobile, tablet and desktop.
- **Accessible & performant** — semantic sections, `aria-label`s, reduced-motion support, and no external JS frameworks.

---

## 🛠 Built With

- **HTML5** — semantic markup (`index.html`)
- **CSS3** — custom properties (design tokens), Flexbox/Grid, responsive media queries (`styles.css`)
- **Vanilla JavaScript (ES5)** — no frameworks/build tools required (`script.js`)
- **Google Fonts** — Space Grotesk, Inter, JetBrains Mono

---

## 📁 Project Structure

```
├── index.html                        # Main page markup (all sections)
├── styles.css                        # All styling — tokens, layout, components, responsiveness
├── script.js                         # Nav, scroll tracking, reveal animations, filters, form handling
├── image/
│   ├── Jinitha.jpg                   # Profile photo
│   ├── linkedin.jpg                  # LinkedIn icon
│   ├── Github.jpg                    # GitHub icon
│   ├── gmail.jpg                     # Email icon
│   └── Jiniththa_Santhakumar_CV.pdf  # Downloadable CV
└── README.md
```

> **Note:** Image paths in `index.html` use backslashes (`image\linkedin.jpg`), which works on Windows but can fail on Linux/macOS servers or GitHub Pages. Rename these to forward slashes (`image/linkedin.jpg`) for cross-platform compatibility.

---

## 🚀 Getting Started

No build tools or dependencies are required — this is a static site.

1. **Clone or download** this repository.
2. Make sure the `image/` folder (with the profile photo, icons, and CV PDF) sits alongside `index.html`.
3. Open `index.html` directly in a browser, **or** serve it locally for the best experience (fonts/relative paths behave more reliably over HTTP):

   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node (npx)
   npx serve .
   ```

4. Visit `http://localhost:8000` in your browser.

---

## ✉️ Contact Form Setup

The contact form submits to Formspree:

```html
<form class="glass contact__form" action="https://formspree.io/f/mvkprjqb" method="POST">
```

To use your own Formspree endpoint, replace the `action` URL with your own form ID from [formspree.io](https://formspree.io/).

---

## 📄 About Jiniththa

BICT (Hons) undergraduate at the University of Vavuniya with a focus on UI/UX design, web development and creative technology. Actively involved with the IEEE WIE Student Branch Affinity Group as part of the WebMaster / Design & Creative Team — contributing to event posters, banners, social media content, and event coordination.

- 🎨 UI/UX & Design: Figma, Canva
- 💻 Web: HTML, CSS, JavaScript
- 🧑‍💻 Programming: Java, Python, C, C++, C#
- 🗄 Database: MySQL
- 🔧 Tools: Git, GitHub, VS Code

**Connect:**
- 📧 [jenivishnu1@gmail.com](mailto:jenivishnu1@gmail.com)
- 💼 [LinkedIn](https://www.linkedin.com/in/jiniththa-santhakumar-469080331)
- 🐙 [GitHub](https://github.com/jini2003-gif)

---

## 📜 License

This portfolio and its content (design, copy, images, CV) belong to Jiniththa Santhakumar. Feel free to reference the code structure for learning purposes, but please don't reuse personal content or branding.

---

<p align="center">Built with HTML, CSS &amp; JavaScript.</p>
