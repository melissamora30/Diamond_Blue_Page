function showSuccessModal(message) {
    Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: message,
        width: '350px',                 // Ancho del modal
        background: '#f0f9ff',          // Color de fondo
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#4CAF50',
        customClass: {
            title: 'swal-title',
            popup: 'swal-popup'
        }
    });
}

function showErrorModal(message) {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
        width: '350px',
        background: '#fff6f6',
        confirmButtonText: 'Intentar de nuevo',
        confirmButtonColor: '#FF5252',
        customClass: {
            title: 'swal-title-error',
            popup: 'swal-popup-error'
        }
    });
}

// Manejo del envío del formulario
document.getElementById('contactForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch('http://localhost:3000/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            showSuccessModal('Registro enviado con éxito');
            clearForm();
        } else {
            const errorText = await response.text();
            showErrorModal('Error al enviar el registro: ' + errorText);
            clearForm();
        }
    } catch (error) {
        showErrorModal('Error de conexión: ' + error.message);
        clearForm();
    }
});

// Función para limpiar el formulario
function clearForm() {
    document.getElementById('contactForm').reset();
}