const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";
const CART_FULL_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json";

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

//elimino los datos del local y sessionstorage
function borrardatos(){
  sessionStorage.clear()
  localStorage.clear() 
};
  
var valor = localStorage.getItem("usuario");//guardo el dato del usuario
var div1 = document.createElement("div");
div1.setAttribute("class","dropdown");
// creo el boton con las opciones para ver el carrito perfil y cerrar la session
var htmlcontent = `
    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                `+valor+`
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="cart.html">Mi carrito</a>
                <a class="dropdown-item" href="my-profile.html">Tu perfil</a>
                <a class="dropdown-item" href="login.html" onclick=borrardatos() >Cerrar sesión</a>
              </div>
            `
div1.innerHTML = htmlcontent;
document.querySelector('nav.site-header > div').appendChild(div1);

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
});