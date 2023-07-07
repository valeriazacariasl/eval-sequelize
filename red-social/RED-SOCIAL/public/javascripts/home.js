
const fileInput = document.getElementById('file-input');
const fileName = document.getElementById('file-name'); //guardo las variables
//uso una función anonima 
fileInput.addEventListener('change', function (event) { //agrego evento change al file input
    
    const archivoSeleccionado = event.target.files[0]; //guardo el primer archivo de la lista de archivos
    if (archivoSeleccionado) { //si hay un archivo seleccionado
        console.log(archivoSeleccionado);
        fileName.textContent = archivoSeleccionado.name; //se muestra ek nombre del archivo
    } else {
        fileName.textContent = '';
    }
});

