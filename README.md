# Portfolio — MAALEJ Ghofrane

Site portfolio personnel de **MAALEJ Ghofrane**, Full Stack & AI Engineer.
Site statique (HTML + CSS + JavaScript vanilla), **sans dépendance ni build step** :
aucun `npm install` n'est nécessaire pour le faire tourner.

🔗 **Démo en ligne** : https://maalejghofrane.github.io

## Fonctionnalités

- Sections : Hero, About, Stack technique, Projets, Parcours (Journey), Contact
- Thème clair / sombre, mémorisé en local (`localStorage`)
- Multilingue : anglais, français, arabe (RTL), espagnol
- Palette de commandes (`Ctrl+K`)
- Animations au scroll, effet de frappe (typing), fond animé (canvas)
- 100 % responsive, accessible (`prefers-reduced-motion` respecté)

## Prérequis

Aucun. C'est du HTML/CSS/JS pur — pas de Node, pas de framework, pas de build.
Pour le servir en local avec de vraies requêtes HTTP (recommandé), il suffit
d'avoir **Python** (déjà présent sur la plupart des systèmes) ou n'importe quel
serveur statique.

## Lancer le projet

### Option 1 — le script fourni (le plus simple, Windows)

Double-cliquer sur `lancer-le-site.bat`, ou depuis un terminal :

```bat
lancer-le-site.bat
```

Cela démarre un serveur local sur le port 8765 et ouvre automatiquement
http://localhost:8765/ dans le navigateur par défaut.

### Option 2 — serveur Python à la main

```bash
python -m http.server 8765
```

Puis ouvrir http://localhost:8765/ dans un navigateur.

### Option 3 — avec Node.js

```bash
npx serve .
```

### Option 4 — ouvrir le fichier directement

Ouvrir `index.html` directement dans un navigateur. Fonctionne pour une
consultation rapide, mais certaines fonctionnalités (fetch, chemins relatifs)
se comportent mieux servies via HTTP — préférer une des options ci-dessus.

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
    motion.css              scroll reveal + prefers-reduced-motion (loaded last)
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

## Tâches courantes

- **Changer les couleurs / polices** : éditer `assets/css/tokens.css`.
- **Modifier un texte** : trouver son `data-i18n="key"` dans `index.html`, puis
  modifier cette clé dans les quatre langues dans `assets/js/data/i18n.js`.
- **Ajouter une technologie** : déposer `name.svg` dans `assets/icons/`, ajouter
  une ligne dans `assets/js/data/skills.js`. La section Stack affiche 8 éléments
  par page ; pour changer ce nombre, modifier `PAGE_SIZE` dans
  `assets/js/modules/stack.js` (et les valeurs `min-height` dans
  `css/sections/stack.css`).
- **Ajouter une langue** : ajouter un bloc dans `i18n.js`, une `<option>` +
  un symbole de drapeau dans `index.html`, et le code/nom dans `LANGS` dans
  `assets/js/modules/lang.js`.
- **Ajouter un module JS** : créer `assets/js/modules/x.js` qui enregistre
  `App.modules.x = { init }`, ajouter son `<script>` dans `index.html` et son
  nom dans `ORDER` dans `main.js`.

## Déploiement

Le site est déployé automatiquement via **GitHub Pages** sur la branche
`main` du dépôt `maalejghofrane.github.io` — aucune action manuelle requise,
un simple `git push` suffit.

## Compatibilité navigateurs

Navigateurs modernes à jour (Chrome, Firefox, Edge, Safari). Aucun polyfill
n'est inclus.

## Contact

MAALEJ Ghofrane — voir les coordonnées (email, LinkedIn) dans la section
Contact du site, également définies dans `assets/js/data/site.js`.
