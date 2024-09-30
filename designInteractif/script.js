let menuIcon = document.querySelector('#menu-icon');
let navBar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach((section) => {
        let top = window.scrollY;
        let offset = section.offsetTop - 150;
        let height = section.offsetHeight;
        let id = section.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach((_links) => {
                _links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });
}
menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-x');
    navBar.classList.toggle('active');
}

// Light/Dark Mode
const switchButton = document.getElementById('switchButton');
const body = document.body;

// Initialisation de la langue par défaut
let currentLanguage = 'en'; // Change cette valeur selon la langue par défaut
loadLanguage(currentLanguage); // Charge les traductions au démarrage

switchButton.addEventListener('click', () => {
  body.classList.toggle('light-mode');
  
  // Changer le texte du bouton en fonction du mode
  const modeKey = body.classList.contains('light-mode') ? 'darkMode' : 'lightMode';
  switchButton.setAttribute('data-i18n', modeKey); // Met à jour l'attribut data-i18n

  // Mettre à jour la traduction du bouton
  loadLanguage(currentLanguage); // Recharge les traductions pour mettre à jour le texte du bouton
});

// Observer les éléments de service
const serviceBoxes = document.querySelectorAll('.services-box');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1
});

serviceBoxes.forEach(box => {
  observer.observe(box);
});

// Observer les éléments de compétence
const skillsBoxes = document.querySelectorAll('.skills-box-container');
const observerSkills = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show-skills');
      observerSkills.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1
});

skillsBoxes.forEach(box => {
  observerSkills.observe(box);
});

// Fonction pour charger le fichier JSON selon la langue sélectionnée
function loadLanguage(language) {
  fetch(`translations/${language}.json`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erreur réseau lors du chargement de la langue');
      }
      return response.json();
    })
    .then(data => applyTranslations(data))
    .catch(error => console.error('Erreur lors du chargement de la langue:', error));
}

// Fonction pour appliquer les traductions au contenu HTML
function applyTranslations(translations) {
  const elementsToTranslate = document.querySelectorAll('[data-i18n]');

  elementsToTranslate.forEach(element => {
    const translationKey = element.getAttribute('data-i18n');
    
    // Appliquer le texte ou le HTML de la traduction
    if (translations[translationKey]) {
      // Utiliser innerHTML pour gérer les balises imbriquées
      element.innerHTML = translations[translationKey];
    }
  });
}

// Écouter le changement dans la dropdown
document.getElementById('language-dropdown').addEventListener('change', function() {
  const selectedLanguage = this.value;
  changeLanguage(selectedLanguage);
});

// Fonction pour changer de langue
function changeLanguage(lang) {
  currentLanguage = lang; // Met à jour la langue actuelle
  loadLanguage(currentLanguage); // Recharge les traductions pour tous les éléments
}

// Initialisation par défaut
loadLanguage(currentLanguage);