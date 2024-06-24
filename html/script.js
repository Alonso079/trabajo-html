document.addEventListener('DOMContentLoaded', () => {
    // Selección de elementos del DOM
    const formulario = document.querySelector('#formulario');
    const nombreInput = document.querySelector('#nombre');
    const emailInput = document.querySelector('#email');
    const subjectInput = document.querySelector('#subject');
    const messageInput = document.querySelector('#message');
    const termsInput = document.querySelector('#terms');
    const btnRegistrarInput = formulario.querySelector('button[type="submit"]');

    // Añadir eventos a los inputs y al formulario 
    formulario.addEventListener('submit', validarFormulario);

    nombreInput.addEventListener('input', checkFields);
    emailInput.addEventListener('input', checkFields);
    subjectInput.addEventListener('input', checkFields);
    messageInput.addEventListener('input', checkFields);
    termsInput.addEventListener('change', checkFields);

    // validacion del formulario al inviarlo
    function validarFormulario(e) {
        e.preventDefault(); // Prevenir el envío del formulario por defecto

        if (!validarCampos()) {
            alert('Por favor, complete todos los campos obligatorios y acepte los términos y condiciones.');
            return;
        }

        alert('Formulario enviado exitosamente.');
        formulario.reset(); // limpieza de los campos y regresar a un estado sin modificacion
        resetFields(); // regreso de estado inicial los estilos
    }

    // validacion de los campos del formulario
    function validarCampos() {
        let valid = true;

        if (nombreInput.value.trim() === '') {
            nombreInput.classList.add('error');
            valid = false;
        } else {
            nombreInput.classList.remove('error');
            nombreInput.classList.add('success');
        }

        if (!validarEmail(emailInput.value.trim())) {
            emailInput.classList.add('error');
            valid = false;
        } else {
            emailInput.classList.remove('error');
            emailInput.classList.add('success');
        }

        if (subjectInput.value.trim() === '') {
            subjectInput.classList.add('error');
            valid = false;
        } else {
            subjectInput.classList.remove('error');
            subjectInput.classList.add('success');
        }

        if (messageInput.value.trim() === '') {
            messageInput.classList.add('error');
            valid = false;
        } else {
            messageInput.classList.remove('error');
            messageInput.classList.add('success');
        }

        if (!termsInput.checked) {
            termsInput.classList.add('error');
            valid = false;
        } else {
            termsInput.classList.remove('error');
        }

        return valid; // Devolver si el formulario es válido o no
    }

    // Función para validar el formato del email
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar el email y que solo acepte los correos que compram estos requisitos
        return regex.test(email);
    }

    //revisar los campos mientras se escriben
    function checkFields() {
        if (nombreInput.value.trim() !== '') {
            nombreInput.classList.remove('error');
            nombreInput.classList.add('success');
        } else {
            nombreInput.classList.add('error');
            nombreInput.classList.remove('success');
        }

        if (validarEmail(emailInput.value.trim())) {
            emailInput.classList.remove('error');
            emailInput.classList.add('success');
        } else {
            emailInput.classList.add('error');
            emailInput.classList.remove('success');
        }

        if (subjectInput.value.trim() !== '') {
            subjectInput.classList.remove('error');
            subjectInput.classList.add('success');
        } else {
            subjectInput.classList.add('error');
            subjectInput.classList.remove('success');
        }

        if (messageInput.value.trim() !== '') {
            messageInput.classList.remove('error');
            messageInput.classList.add('success');
        } else {
            messageInput.classList.add('error');
            messageInput.classList.remove('success');
        }

        if (termsInput.checked) {
            termsInput.classList.remove('error');
        } else {
            termsInput.classList.add('error');
        }
    }

    // Función para regresar los estilos de los campos a por defecto
    function resetFields() {
        nombreInput.classList.remove('error', 'success');
        emailInput.classList.remove('error', 'success');
        subjectInput.classList.remove('error', 'success');
        messageInput.classList.remove('error', 'success');
        termsInput.classList.remove('error');
    }
});
