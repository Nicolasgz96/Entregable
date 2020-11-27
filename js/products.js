const ORDER_ASC_BY_PRICE = "Precios Bajos";//creo las contantes y las variables globales para después utilizarlas 
const ORDER_DESC_BY_PRICE = "Precios Altos";
const ORDER_BY_PROD_COUNT = "Mas Relevantes";
const buscador = document.getElementById("elBuscador");
const resultado = document.getElementById("cat-list-container");
var currentCategoriesArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;

//función que ordena las categorías
function sortCategories(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE)
    {
        result = array.sort(function(a, b) {//le digo que el resultado que sea me devuelva el array ordenado usando la función sort  
            if ( a.cost < b.cost ){ return -1; }//si el precio de a es menor que el precio de b me devuelve el ultimo
            if ( a.cost > b.cost ){ return 1; }//si el precio de a es mayor que el precio de b me devuelve el primero
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PRICE){//lo mismo pasa en este caso
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }//aca me dice que si el valor de a es mayor que b me devuelva el ultimo
            if ( aCount < bCount ){ return 1; }//aca me dice que si el valor de a es menor que b me devuelva el primero
            return 0;
        });
    }

    return result;
}

function showCategoriesList(){
    let htmlContentToAppend = "";
    for(let i = 0; i < currentCategoriesArray.length; i++){
        let product = currentCategoriesArray[i];
        //aca en el if declaro que si ingreso un valor en los campos de mincount y maxcount me devuelvan un entero con el parseInt ya que comprueba el array donde le específico ir
        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) && 
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))){  
                    htmlContentToAppend += `
                    <div class="col-12 col-sm-6 col-md-4">
                        <div class="card">
                            <a href="product-info.html?producto= `+ product.name +`" class="list-group-item list-group-item-action">
                                <img src="static/` + product.imgSrc + `" alt=""class="card-img-top">
                                <div class="d-flex w-100 justify-content-between">
                                    <h4 class="mb-1">`+ product.name +`</h4>
                                    <small class="text-muted">` + product.cost + " " + product.currency + ` </small>
                                </div>
                                <p class="mb-1">` + product.description + `</p>
                                <span class="align-bottom">` +"Total vendidos:"+" "+ product.soldCount + `</span>
                            </a>
                        </div>
                    </div>
                    
                    `
        }   
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;     
    }
}


function sortAndShowCategories(sortCriteria, categoriesArray){
    currentSortCriteria = sortCriteria;

    if(categoriesArray != undefined){
        currentCategoriesArray = categoriesArray;
    }

    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);

    //Muestro las categorías ordenadas
    showCategoriesList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){//pido que cuando se ejecute el DOM me devuelva una promesa, si es ok me va a devolver el json ordenado ya con los precios bajos
        if (resultObj.status === "ok"){
            sortAndShowCategories(ORDER_ASC_BY_PRICE, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){//declaro un evento para el boton de precios bajos
        sortAndShowCategories(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){//declaro un evento para el boton de precios altos
        sortAndShowCategories(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){//declaro un evento para el boton de mas relevantes
        sortAndShowCategories(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        //declaro un evento para el boton de limpiar, basicamente si le hacemos click te va a limpiar lo
        //que ingresastes y te devuelve los productos para que los veas completos devuelta
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){//declaro un evento para el boton de filtrar
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;//declaro donde va a actuar el minCount
        maxCount = document.getElementById("rangeFilterCountMax").value;//declaro donde va a actuar el maxCount

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showCategoriesList();
    });
});

//funcion para buscador
const filtrar = ()=>{

    const texto = buscador.value.toLowerCase();
    resultado.innerHTML = '';

    for(let producto of currentCategoriesArray){
        let nombre = producto.name.toLowerCase();
        let descripcion = producto.description.toLowerCase();
        if(nombre.indexOf(texto)!== -1 || descripcion.indexOf(texto) !== -1){
            
            resultado.innerHTML += `
            <div class="col-12 col-sm-6 col-md-4">
                <div class="card">
                    <a href="product-info.html?producto= `+ producto.name +`" class="list-group-item list-group-item-action">
                        <img src="static/` + producto.imgSrc + `" alt=""class="card-img-top">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ producto.name +`</h4>
                            <small class="text-muted">` + producto.cost + " " + producto.currency + ` </small>
                        </div>
                        <p class="mb-1">` + producto.description + `</p>
                        <span class="align-bottom">` +"Total vendidos:"+" "+ producto.soldCount + `</span>
                    </a>
                </div>
            </div>
            `
        }
    }
    if(resultado.innerHTML === ''){
        resultado.innerHTML += `
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ "El Producto no fue encontrado..." +`</h4>
                    </div>
           
        `
    }
}
buscador.addEventListener('keyup',filtrar);

