# Contenu du site

Ce fichier documente **le contenu éditorial** du portfolio (qui est la
personne, ce qui est affiché, dans quel fichier le modifier) — à distinguer
du `README.md` qui documente le code et comment lancer le projet.

Tout le texte visible vient de `assets/js/data/i18n.js`, décliné en
**4 langues** : `en`, `fr` (langue de référence ci-dessous), `ar` (RTL), `es`.
Chaque clé (`"j0.title"`, `"proj.1t"`, …) est reprise dans `index.html` via
`data-i18n="clé"` — pour changer un texte, modifier la clé dans les 4 blocs
de langue.

## Identité

- **Nom** : MAALEJ Ghofrane
- **Titre** : Full Stack & AI Engineer
- **Accroche** : Ingénieur Full Stack & IA, 4 ans d'expérience en conception
  de produits Web & Mobile et mise en œuvre de l'IA pour des résultats concrets.
- **Email** : ghofrane.maalej@gmail.com
- **LinkedIn** : https://www.linkedin.com/in/ghofrane-maalej-66a4a5173/

(coordonnées définies dans `assets/js/data/site.js`)

## Sections de la page (dans l'ordre)

1. **Hero** — accroche + rôles défilants (API, web, mobile, IA, DevOps)
2. **About** — bio, chiffres clés, ce qu'elle fait, ce qu'elle approfondit
3. **Stack** — technologies maîtrisées, par catégorie
4. **Projects** — 3 projets sélectionnés
5. **Journey** — parcours professionnel + formation, filtrable
6. **Contact** — formulaire qui ouvre le client mail

## About — chiffres clés

- Années d'expérience : **4**
- Stages professionnels : *(voir `about.s2`, valeur affichée dans `index.html`)*
- Diplômes avec major de promotion : *(voir `about.s3`)*

Activités : développement web & mobile, UI/UX design, marketing digital,
optimisation SEO, déploiement, montage vidéo.

En cours d'approfondissement : IA générative, architectures web performantes,
accessibilité numérique.

## Stack technique (`assets/js/data/skills.js`)

| Catégorie | Technologies |
|---|---|
| Backend | Spring Boot, Django, Symfony, Laravel |
| Frontend | Angular, React JS, Next.js |
| CMS | WordPress, PrestaShop |
| Mobile | React Native, Ionic React, Android |
| DevOps & IA | Docker, Jenkins, Git, Postman, Machine Learning |
| Design & montage | Figma, Photoshop, Illustrator, Adobe Premiere Pro |

Pour ajouter une techno : SVG dans `assets/icons/` + une ligne dans
`skills.js` (voir `README.md` → Tâches courantes).

## Projets (`proj.*` dans `i18n.js`)

1. **Gestion des notes** — application web pour gérer étudiants, matières et notes.
2. **Gestion des formations** — plateforme full stack pour organiser formations,
   sessions et participants.
3. **Coupe du monde** — application de tournoi de football, API REST + interface moderne.

## Parcours (`j0`–`j8` dans `i18n.js`, section Journey)

Du plus récent au plus ancien :

| Période | Organisation | Intitulé |
|---|---|---|
| Fév 2023 – Présent | Talan Tunisie | Full Stack & AI Engineer |
| Fév – Juin 2023 | Talan Tunisie (fin d'études) | Profilage, reporting, recommandation pour gestion de projets |
| 2020 – 2023 | Institut Supérieur d'Informatique | Diplôme national d'ingénieur en informatique — **major de promotion**, spécialité développement logiciel |
| Juil – Août 2022 | Talan Tunisie (stage d'été) | Appli mobile e-commerce, boutique de vêtements bébé |
| Juil – Août 2021 | Devnet Tunisie (stage d'été) | Application web et mobile FIFO |
| Janv – Mai 2020 | Devnet Tunisie (fin d'études) | Maintenance/évolution d'une plateforme communautaire |
| 2017 – 2020 | École Sup. d'Économie Numérique de la Manouba | Licence appliquée informatique de gestion — **major de promotion**, spécialité e-commerce |
| Juil 2019 | Talan Tunisie (stage d'été) | Plateforme de gestion des astreintes en entreprise |
| 2013 – 2017 | Lycée El Menzah 9 | Baccalauréat, Mathématiques |

Chaque entrée "Expérience" affiche aussi le logo de l'entreprise/école
(`assets/logos/`) et, pour le poste actuel chez Talan, un sous-timeline de
**clients** : BNP Paribas, Talan France, Gemserv, GlobalJet.

Filtres disponibles sur la section : Tout / Expérience / Stages / Formation.

## Contact

Formulaire (nom, email, message) qui construit un lien `mailto:` et ouvre le
client mail par défaut — aucun backend, aucune donnée stockée côté serveur.

## Modifier un contenu

1. Repérer le texte dans `index.html` via son attribut `data-i18n="clé"`.
2. Éditer cette `clé` dans **les 4 langues** (`en`, `fr`, `ar`, `es`) de
   `assets/js/data/i18n.js`, pour garder le site cohérent dans toutes les langues.
3. Pour un projet, une techno ou une étape du parcours : voir aussi
   `assets/js/data/skills.js` et les blocs `j0`…`j8` / `proj.1`…`proj.3`.
