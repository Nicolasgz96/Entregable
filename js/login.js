var nomUsuario = document.getElementById("usuario");
function logg(e){
  e.preventDefault();//previene un bucle entre las paginas de html y login
  sessionStorage.setItem('visitado', 'true');
  localStorage.setItem("usuario", nomUsuario.value);//guardo el valor que en este caso es el nombre de usuario
  window.location.href = 'index.html';
  return true;
}

document.getElementById("rediregir").addEventListener('submit', logg);
//funcion de google sign-in
function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  var id_token = googleUser.getAuthResponse().id_token;
  console.log(id_token);
}
//funcion de google sign-out
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
});
