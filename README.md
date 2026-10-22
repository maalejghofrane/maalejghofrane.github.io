# Portfolio — MAALEJ Ghofrane

Static site (HTML + CSS + vanilla JS, no build step).

## Run

Double-click `lancer-le-site.bat` (serves the folder on http://localhost:8765/),
or open `index.html` directly.

## Structure

```
index.html                 page markup (sections: hero, about, stack, projects, journey, contact)
assets/
  css/
    tokens.css             colours, fonts, radius, light/dark themes  <- start here to restyle
    base.css               reset, typography, accessibility, layout primitives
    background.css         aurora, grid, network canvas, cursor glow, progress bar
    components.css         glass/spotlight, buttons, headings, tabs, tags, badges
    navigation.css         top bar, language menu, flags, dock
    palette.css            Ctrl+K command palette
    sections/              one stylesheet per section (hero, about, stack, projects, journey, contact)
    rtl.css                Arabic / right-to-left adjustments
    motion.css             scroll reveal + prefers-reduced-motion (loaded last)
  js/
    data/
      i18n.js              all translations (en, fr, ar, es)
      skills.js            technologies of the Stack section
      site.js              email + LinkedIn
    core.js                `App` object: event bus, DOM helpers, storage
    modules/               one file per feature (lang, theme, typing, stack, timeline,
                           effects, reveal, scroll, network, palette, contact)
    main.js                boots the modules in order
  img/                     portrait + project images
  icons/                   technology logos (SVG)
  logos/                   company / school logos of the Journey timeline
                           light/ = transparent PNGs (light theme), dark/ = white-background files (dark theme)
legacy/                    previous React version of the site (kept for reference)
```

## Common tasks

- **Change colours / fonts**: edit `assets/css/tokens.css`.
- **Edit a text**: find its `data-i18n="key"` in `index.html`, then edit that key
  in all four languages in `assets/js/data/i18n.js`.
- **Add a technology**: put `name.svg` in `assets/icons/`, add a line in `assets/js/data/skills.js`.
  The Stack section shows 8 per page; change `PAGE_SIZE` in `assets/js/modules/stack.js`
  (and the `min-height` values in `css/sections/stack.css`) to use another size.
- **Add a language**: add a block in `i18n.js`, an `<option>` + flag `<symbol>` in `index.html`,
  and the code/name in `LANGS` in `assets/js/modules/lang.js`.
- **Add a module**: create `assets/js/modules/x.js` registering `App.modules.x = { init }`,
  add its `<script>` in `index.html` and its name in `ORDER` in `main.js`.
