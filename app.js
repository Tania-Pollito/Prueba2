// app.js - Versión simplificada para lista de tareas
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const formulario = document.getElementById('formulario-tarea');
    const listaTareas = document.createElement('div');
    listaTareas.id = 'lista-tareas';
    document.body.appendChild(listaTareas);
    
    // Manejar el envío del formulario
    formulario.addEventListener('submit', function(evento) {
        evento.preventDefault();
        
        // Obtener valores del formulario
        const nombreTarea = document.getElementById('nombre').value;
        const fechaTarea = document.getElementById('fecha').value;
        const descripcionTarea = document.getElementById('descripcion').value;
        const tipoTarea = document.getElementById('tipo').value;
        const prioridadTarea = document.querySelector('input[name="Prioridad"]:checked').value;
        
        // Validación básica
        if (!nombreTarea || !fechaTarea) {
            alert('Por favor completa los campos obligatorios');
            return;
        }
        
        // Crear nueva tarea
        crearTarea({
            nombre: nombreTarea,
            fecha: fechaTarea,
            descripcion: descripcionTarea,
            tipo: tipoTarea,
            prioridad: prioridadTarea
        });
        
        // Limpiar formulario
        formulario.reset();
    });
    
    // Función para crear una tarea
    function crearTarea(tarea) {
        const tareaElemento = document.createElement('div');
        tareaElemento.className = 'tarea';
        
        // Formatear fecha
        const fecha = new Date(tarea.fecha);
        const opcionesFecha = { day: '2-digit', month: 'long' };
        const fechaFormateada = fecha.toLocaleDateString('es-ES', opcionesFecha);
        
        // Establecer color según prioridad
        let colorPrioridad = '';
        switch(tarea.prioridad) {
            case 'Urgente': colorPrioridad = 'rojo'; break;
            case 'Normal': colorPrioridad = 'amarillo'; break;
            case 'Baja': colorPrioridad = 'verde'; break;
        }
        
        // HTML de la tarea
        tareaElemento.innerHTML = `
            <div class="tarjeta ${colorPrioridad}">
                <h3>${tarea.nombre}</h3>
                <p><strong>Fecha:</strong> ${fechaFormateada}</p>
                ${tarea.tipo ? `<p><strong>Categoría:</strong> ${tarea.tipo}</p>` : ''}
                <p><strong>Prioridad:</strong> <span class="prioridad">${tarea.prioridad}</span></p>
                ${tarea.descripcion ? `<p class="descripcion">${tarea.descripcion}</p>` : ''}
            </div>
        `;
        
        // Agregar a la lista (las más nuevas primero)
        listaTareas.prepend(tareaElemento);
    }
});