/* Technologies shown in the Stack section.
   cat    : category id, also the key suffix of "lab.<cat>" in i18n.js
   icon   : file name (without extension) in assets/icons/
   label  : optional i18n key overriding the card's small label (defaults to "lab.<cat>")
   To add a technology: drop its SVG in assets/icons/ and add a line here. */
window.SKILLS = [
  { name: "Spring Boot",      cat: "backend",  icon: "spring-boot" },
  { name: "Django",           cat: "backend",  icon: "django" },
  { name: "Symfony",          cat: "backend",  icon: "symfony" },
  { name: "Laravel",          cat: "backend",  icon: "laravel" },

  { name: "Angular",          cat: "frontend", icon: "angular" },
  { name: "React JS",         cat: "frontend", icon: "react" },
  { name: "Next.js",          cat: "frontend", icon: "nextjs" },

  { name: "WordPress",        cat: "cms",      icon: "wordpress" },
  { name: "PrestaShop",       cat: "cms",      icon: "prestashop" },

  { name: "React Native",     cat: "mobile",   icon: "react-native" },
  { name: "Ionic React",      cat: "mobile",   icon: "ionic" },
  { name: "Android",          cat: "mobile",   icon: "android" },

  { name: "Docker",           cat: "devops",   icon: "docker" },
  { name: "Jenkins",          cat: "devops",   icon: "jenkins" },
  { name: "Git",              cat: "devops",   icon: "git" },
  { name: "Postman",          cat: "devops",   icon: "postman" },
  { name: "Machine Learning", cat: "devops",   icon: "ml" },

  { name: "Figma",            cat: "design",   icon: "figma" },
  { name: "Photoshop",        cat: "design",   icon: "photoshop" },
  { name: "Illustrator",      cat: "design",   icon: "illustrator" },
  { name: "Adobe Premiere Pro", cat: "design", icon: "premiere" }
];
