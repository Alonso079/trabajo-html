document.addEventListener('DOMContentLoaded', () => {
    let listaUsuarios = []; // el Array para almacenar los usuarios
    let editando = false; // Flag para indicar si estamos editando un usuario existente
    const objUsuario = {
        id: '',
        nombre: '',
        email: '',
        password: '',
        direccion: '',
        telefono: ''
    };

    // Selección de elementos del DOM y su asignacion
    const formulario = document.querySelector('#formulario');
    const nombreInput = document.querySelector('#nombre');
    const emailInput = document.querySelector('#email');
    const passwordInput = document.querySelector('#password');
    const direccionInput = document.querySelector('#direccion');
    const telefonoInput = document.querySelector('#telefono');
    const btnRegistrarInput = document.getElementById('runawayBtn');
    const divUsuarios = document.querySelector('.div-usuarios');

    // Guardar el estilo original del botón de registro para que al llenarse los campos regresar
    const originalButtonStyle = {
        left: btnRegistrarInput.style.left,
        top: btnRegistrarInput.style.top,
        width: btnRegistrarInput.offsetWidth,
        height: btnRegistrarInput.offsetHeight
    };

    // Asignación de eventos a los inputs y al formulario
    formulario.addEventListener('submit', validarFormulario);
    nombreInput.addEventListener('input', checkFields);
    emailInput.addEventListener('input', checkFields);
    passwordInput.addEventListener('input', checkFields);
    direccionInput.addEventListener('input', checkFields);
    telefonoInput.addEventListener('input', checkFields);

    // Función para validar el formulario
    function validarFormulario(e) {
        e.preventDefault(); // Prevenir la acción por defecto del formulario

        // Validación de campos obligatorios
        if (nombreInput.value.trim() === '' || emailInput.value.trim() === '' || passwordInput.value.trim() === '') {
            alert('Nombre, Email y Contraseña son obligatorios');
            if (nombreInput.value.trim() === '') {
                nombreInput.classList.add('error');
            } else {
                nombreInput.classList.remove('error');
                nombreInput.classList.add('success');
            }
            if (emailInput.value.trim() === '') {
                emailInput.classList.add('error');
            } else {
                emailInput.classList.remove('error');
                emailInput.classList.add('success');
            }
            if (passwordInput.value.trim() === '') {
                passwordInput.classList.add('error');
            } else {
                passwordInput.classList.remove('error');
                passwordInput.classList.add('success');
            }
            return;
        }

        // Resetear clases de error y añadir clase de éxito
        nombreInput.classList.remove('error');
        emailInput.classList.remove('error');
        passwordInput.classList.remove('error');
        nombreInput.classList.add('success');
        emailInput.classList.add('success');
        passwordInput.classList.add('success');

        // Crear o editar usuario
        const usuario = {
            id: editando ? objUsuario.id : Date.now(), // Si estamos editando, usar el id existente, si no, generar uno nuevo
            nombre: nombreInput.value.trim(),
            email: emailInput.value.trim(),
            password: passwordInput.value.trim(),
            direccion: direccionInput.value.trim(),
            telefono: telefonoInput.value.trim()
        };

        if (editando) {
            editarUsuario(usuario);
        } else {
            agregarUsuario(usuario);
        }

        // regresa el formulario a un estado vacio o sin contenido
        formulario.reset();
        formulario.querySelector('button[type="submit"]').textContent = 'Registrar';
        editando = false;

        resetButtonPosition(); // al llenarse los campos usa los parametros guardados anteiormente 
    }

    // Función para agregar un usuario al array
    function agregarUsuario(usuario) {
        listaUsuarios.push(usuario);
        mostrarUsuarios();
    }

    // Función para mostrar los usuarios en el DOM
    function mostrarUsuarios() {
        limpiarHTML();

        listaUsuarios.forEach(usuario => {
            const { id, nombre, email, password, direccion, telefono } = usuario;
            const parrafo = document.createElement('p');
            parrafo.textContent = `${nombre} - ${email} - ${direccion} - ${telefono}`;
            parrafo.dataset.id = id;

            // Crear botones de editar y eliminar
            const editarBoton = crearBoton('Editar', 'btn-editar', () => cargarUsuario(usuario));
            const eliminarBoton = crearBoton('Eliminar', 'btn-eliminar', () => eliminarUsuario(id));

            parrafo.append(editarBoton, eliminarBoton);

            divUsuarios.append(parrafo, document.createElement('hr'));
        });
    }

    // Función para crear el botton que corre me costo un tiempo
    function crearBoton(texto, clase, onclick) {
        const boton = document.createElement('button');
        boton.textContent = texto;
        boton.classList.add('btn', clase);
        boton.onclick = onclick;
        return boton;
    }

    // Función para cargar los datos de un usuario en el formulario
    function cargarUsuario(usuario) {
        const { id, nombre, email, password, direccion, telefono } = usuario;

        nombreInput.value = nombre;
        emailInput.value = email;
        passwordInput.value = password;
        direccionInput.value = direccion;
        telefonoInput.value = telefono;

        objUsuario.id = id;

        formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';
        editando = true;

        resetButtonPosition(); // regreso del boton
    }

    // Función para editar un usuario en el array
    function editarUsuario(usuarioActualizado) {
        listaUsuarios = listaUsuarios.map(usuario => (usuario.id === usuarioActualizado.id ? usuarioActualizado : usuario));
        mostrarUsuarios();
    }

    // Función para eliminar un usuario del array
    function eliminarUsuario(id) {
        listaUsuarios = listaUsuarios.filter(usuario => usuario.id !== id);
        mostrarUsuarios();
    }

    // limpieza del html
    function limpiarHTML() {
        while (divUsuarios.firstChild) {
            divUsuarios.removeChild(divUsuarios.firstChild);
        }
    }

    // Función para hacer que el botón de registrar se escape si los campos no están completos
    function hacerBotonEscaparse(boton) {
        boton.addEventListener('mouseover', function() {
            const camposLlenos = nombreInput.value.trim() !== '' && emailInput.value.trim() !== '' && passwordInput.value.trim() !== '';
            if (!camposLlenos) {
                const form = boton.closest('form');
                const rect = form.getBoundingClientRect();

                const newX = Math.random() * (rect.width - boton.offsetWidth);
                const newY = Math.random() * (rect.height - boton.offsetHeight);

                boton.style.position = 'absolute';
                boton.style.left = `${newX}px`;
                boton.style.top = `${newY}px`;
                boton.style.width = `${originalButtonStyle.width}px`;
                boton.style.height = `${originalButtonStyle.height}px`;
            }
        });
    }

    // Función para reset o regreso de la posición del botón de registrar a su posicion original
    function resetButtonPosition() {
        btnRegistrarInput.style.position = 'static';
        btnRegistrarInput.style.left = originalButtonStyle.left;
        btnRegistrarInput.style.top = originalButtonStyle.top;
        btnRegistrarInput.style.width = `${originalButtonStyle.width}px`;
        btnRegistrarInput.style.height = `${originalButtonStyle.height}px`;
    }

    // Función para comprobar los campos y añadir clases de error o éxito y poder marcar los campos
    function checkFields() {
        const camposLlenos = nombreInput.value.trim() !== '' && emailInput.value.trim() !== '' && passwordInput.value.trim() !== '';
        if (camposLlenos) {
            resetButtonPosition();
            nombreInput.classList.remove('error');
            emailInput.classList.remove('error');
            passwordInput.classList.remove('error');
            nombreInput.classList.add('success');
            emailInput.classList.add('success');
            passwordInput.classList.add('success');
        } else {
            if (nombreInput.value.trim() === '') {
                nombreInput.classList.add('error');
            } else {
                nombreInput.classList.remove('error');
                nombreInput.classList.add('success');
            }
            if (emailInput.value.trim() === '') {
                emailInput.classList.add('error');
            } else {
                emailInput.classList.remove('error');
                emailInput.classList.add('success');
            }
            if (passwordInput.value.trim() === '') {
                passwordInput.classList.add('error');
            } else {
                passwordInput.classList.remove('error');
                passwordInput.classList.add('success');
            }
        }
    }

    hacerBotonEscaparse(btnRegistrarInput);
});
