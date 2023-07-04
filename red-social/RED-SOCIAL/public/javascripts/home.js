
const fileInput = document.getElementById('file-input');
const fileName = document.getElementById('file-name'); //guardo las variables
//uso una función anonima 
fileInput.addEventListener('change', function (event) { //
    
    const archivoSeleccionado = event.target.files[0]; //guardo el primer archivo de la lista de archivos
    if (archivoSeleccionado) {
        console.log(archivoSeleccionado);
        fileName.textContent = archivoSeleccionado.name;
    } else {
        fileName.textContent = '';
    }
});

