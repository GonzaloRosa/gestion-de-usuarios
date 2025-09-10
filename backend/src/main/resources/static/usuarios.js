// Variables globales
const formUsuario = document.getElementById('formUsuario');
const tablaUsuarios = document.getElementById('tablaUsuarios');

let usuarioEditandoId = null;
let usuarios = [];

// Evento submit del formulario
formUsuario.addEventListener('submit', async (e) => {
    e.preventDefault();

    const usuario = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        email: document.getElementById('email').value,
        telefono: document.getElementById('telefono').value,
        contrasenia: document.getElementById('contrasenia').value
    };

    try {
        let response;

        if (usuarioEditandoId) {
            // Editar usuario existente
            response = await fetch(`http://localhost:8080/usuarios/${usuarioEditandoId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(usuario)
            });
        } else {
            // Crear nuevo usuario
            response = await fetch('http://localhost:8080/usuarios', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(usuario)
            });
        }

        if (!response.ok) throw new Error('Error en la solicitud');

        // Limpiar formulario y resetear edición
        formUsuario.reset();
        usuarioEditandoId = null;

        // Refrescar lista de usuarios
        listarUsuarios();

    } catch (error) {
        console.error(error);
        alert('Hubo un error al procesar la solicitud.');
    }
});

// Función para listar usuarios desde backend
async function listarUsuarios() {
    try {
        const response = await fetch('http://localhost:8080/usuarios', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) throw new Error('Error al obtener los usuarios');

        usuarios = await response.json(); // guardamos los usuarios que vienen del backend

        // Limpiar tabla
        tablaUsuarios.innerHTML = '';

        // Agregar cada usuario a la tabla
        usuarios.forEach(usuario => agregarUsuarioTabla(usuario));

    } catch (error) {
        console.error(error);
        alert('No se pudieron cargar los usuarios.');
    }
}

// Función para agregar usuario a la tabla
function agregarUsuarioTabla(usuario) {
    const fila = document.createElement('tr');
    fila.innerHTML = `
        <td>${usuario.id}</td>
        <td>${usuario.nombre}</td>
        <td>${usuario.apellido}</td>
        <td>${usuario.email}</td>
        <td>${usuario.telefono}</td>
        <td>${usuario.contrasenia}</td>
        <td>
            <button onclick="cargarUsuarioParaEditar(${usuario.id})">Editar</button>
            <button onclick="eliminarUsuario(${usuario.id}, this)">Eliminar</button>
        </td>
    `;
    tablaUsuarios.appendChild(fila);
}

// Cargar usuario en el formulario para editar
function cargarUsuarioParaEditar(id) {
    const usuario = usuarios.find(u => u.id === id);
    if (!usuario) return;

    document.getElementById('nombre').value = usuario.nombre;
    document.getElementById('apellido').value = usuario.apellido;
    document.getElementById('email').value = usuario.email;
    document.getElementById('telefono').value = usuario.telefono;
    document.getElementById('contrasenia').value = usuario.contrasenia;

    usuarioEditandoId = usuario.id;
}

// Eliminar usuario
async function eliminarUsuario(id, boton) {
    try {
        const response = await fetch(`http://localhost:8080/usuarios/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('No se pudo eliminar');

        // Quitar la fila de la tabla
        boton.closest('tr').remove();

        // Actualizar array local
        usuarios = usuarios.filter(u => u.id !== id);

    } catch (error) {
        console.error(error);
        alert('Error al eliminar usuario');
    }
}

// Ejecutar listarUsuarios al cargar la página
document.addEventListener('DOMContentLoaded', listarUsuarios);
