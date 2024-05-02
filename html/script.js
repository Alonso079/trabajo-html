'use strict'; // Establece el modo estricto para todo el código de este script

$(document).ready(function () {
  $("#title").focus(); // Establece el enfoque en el elemento con el id "title"
  $("#text").autosize(); // Ajusta el tamaño del área de texto con el id "text"
});

// Variables para la barra de navegación
const nav = document.querySelector('.mobile-nav');
const navMenuBtn = document.querySelector('.nav-menu-btn');
const navCloseBtn = document.querySelector('.nav-close-btn');

// Función para alternar la navegación
const navToggleFunc = function () {
  nav.classList.toggle('active'); // Alterna la clase 'active' para mostrar u ocultar el menú móvil
};

// Eventos para abrir y cerrar el menú de navegación
navMenuBtn.addEventListener('click', navToggleFunc);
navCloseBtn.addEventListener('click', navToggleFunc);

// Variables para el botón de cambio de tema
const themeBtn = document.querySelectorAll('.theme-btn');

// Bucle para agregar eventos a cada botón de cambio de tema
for (let i = 0; i < themeBtn.length; i++) {
  themeBtn[i].addEventListener('click', function () {
    // Alterna entre temas claro y oscuro en el cuerpo del documento
    document.body.classList.toggle('light-theme');
    document.body.classList.toggle('dark-theme');

    // Alterna las clases para todos los botones de cambio de tema
    for (let j = 0; j < themeBtn.length; j++) {
      themeBtn[j].classList.toggle('light');
      themeBtn[j].classList.toggle('dark');
    }
  });
}
