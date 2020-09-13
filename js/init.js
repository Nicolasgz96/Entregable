const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}


  //esta funcion hace que si no esta en login.html me redireccione a esa pagina
  if(!location.href.endsWith('login.html')&&!(sessionStorage.getItem('visitado') === 'true')){
    window.location.href='login.html';
  };

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});

  var nombre = 'Tu Perfil: ';//creo string para que no aparezca solo el nombre que ingrese el ususario
  var valor = localStorage.getItem("usuario");//guardo el dato del usuario
  const Perfil = document.querySelector('nav.site-header > div');//le digo donde quiero que se ingresen los datos

  function crearPerfil(tuPerfil){//creo una funcion para proceder a guardar los datos y asi crear el perfil
    let a = document.createElement('a');//asigno el elemento que deseo crear
    a.setAttribute("class", "py-2 d-none d-md-inline-block");//le asigno los atributos
    a.setAttribute("href", "my-profile.html");//le asigno los atributos
    a.textContent = nombre + tuPerfil;
    return  a;
  }

 Perfil.appendChild(crearPerfil(valor));//devuelve y crea los atributos y valores del mismo para poder crear el perfil y almacenar el valor del usuario