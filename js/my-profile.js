var aparicionForm = document.getElementById('submit-formulario')
var editarFormulario = document.getElementById("editarFormulario");
var nombre = document.getElementById("nombre");
var edad = document.getElementById("edad");
var email = document.getElementById("email");
var telefono = document.getElementById("telefono");
var nuevoNombre = document.getElementById('newName');
var nuevoEdad = document.getElementById('newAge');
var nuevoEmail = document.getElementById('newMail');
var nuevoTelefono = document.getElementById('newTelephone');


var datosUsuario = {
    'usuario': []
};

aparicionForm.addEventListener("submit", function (e) {
    e.preventDefault()
    let formularioHTML = "";
    formularioHTML =
        `
        <br>
        <form id="profileForm" action="#" method="GET">
        <br><br>
        <div class="container p-5">
          <div class="p-4">
            <h5 class="text-center">Edite sus datos</h5>
                <label for="nombre"> Nombre
                    <input type="text" class="form-control" id="nombre" placeholder="Deje su nombre y apellido" name="nombre" required>
                </label>
                <br><br>
                <label for="edad"> Edad<br>
                    <input  type="number" class="form-control" min="18" max="100" id="edad" name="edad" required>
                </label>
                <br><br>
                <label for="email"> Email<br>
                    <input type="email" class="form-control" name="email" id="email" required>
                </label>
                <br><br>
                <label for="telefono"> Telefono<br>
                    <input type="tel" class="form-control" name="telefono" id="telefono" pattern="[0-9]{9}" placeholder="ej:Tel Celular" required>
                </label>
                <br><br>
                <input class="btn btn-primary btn-lg" type="submit" >
            </div>
        </div>
        </form>
    `
    editarFormulario.innerHTML = formularioHTML;

    var nombrePerfil = document.getElementById("nombre");
    var edadPerfil = document.getElementById("edad");
    var emailPerfil = document.getElementById("email");
    var telefono = document.getElementById("telefono");
    var idFormulario = document.getElementById("profileForm");


    // Funcion para guardar los datos en el localStorage.
    idFormulario.addEventListener("submit", function () {

        datosUsuario.usuario.push({ 'nombre': nombrePerfil.value, 'edad': edadPerfil.value, 'email': emailPerfil.value, 'telefono': telefono.value });
        localStorage.setItem("datosUsuario", JSON.stringify(datosUsuario));
        var infoLS = JSON.parse(localStorage.getItem("datosUsuario"));


        for (let i = 0; i < infoLS.usuario.length; i++) {
            const element = infoLS.usuario [i];
        
            nuevoNombre.innerHTML = 'Nombre: '+ element.nombre;
            nuevoEdad.innerHTML = 'Edad: '+ element.edad;
            nuevoEmail.innerHTML = 'e-Mail: '+ element.email;
            nuevoTelefono.innerHTML = 'Telefono: '+ element.telefono;
            
        }
    })
});

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    const datosImagenUrl = localStorage.getItem("cambiarImagen");

    if(datosImagenUrl) {
        document.getElementById("imagen").setAttribute("src", datosImagenUrl);
    }
});

//Funcion para seleccionar la imagen
document.getElementById('inputId').addEventListener("change", function(){
    const reader = new FileReader();

    reader.addEventListener("load", () => {
        localStorage.setItem("cambiarImagen", reader.result);
    });

    reader.readAsDataURL(this.files[0]);
    window.location.reload();
});

//funcion para parsear los datos y mostarlos en el html

var infoLS = JSON.parse(localStorage.getItem("datosUsuario"));

for (let i = 0; i < infoLS.usuario.length; i++) {
    const element = infoLS.usuario [i];

    nuevoNombre.innerHTML = 'Nombre: '+ element.nombre;
    nuevoEdad.innerHTML = 'Edad: '+ element.edad;
    nuevoEmail.innerHTML = 'e-Mail: '+ element.email;
    nuevoTelefono.innerHTML = 'Telefono: '+ element.telefono;
    
};

