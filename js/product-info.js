
//funcion que muestra las imagenes
function showImagesGallery(array){

    let htmlContentToAppend = "";
    let indicator = "";
    let imagenes = "";
    let imagesToApend = "";

        htmlContentToAppend = `
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
             <ol id="indicadores" class="carousel-indicators">
            </ol>
        <div id="verImagens" class="carousel-inner">
        </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
        `

    document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;

    for(let i = 0; i < array.length; i++){
        if (i == 0){
            indicator=`
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
            `
        }
        else {
            indicator+=`
            <li data-target="#carouselExampleIndicators" data-slide-to="`+ i +`"></li>
            `
        }
        for(let i = 0; i < array.length; i++){
            imagenes = array[i];
            if (i == 0){
                imagesToApend =`
                <div class="carousel-item active">
                    <img src="static/`+ imagenes +`" class="d-block " alt="">
                 </div>
                `
            }
            else {imagesToApend +=`
            <div class="carousel-item">
                <img src="static/`+ imagenes +`" class="d-block" alt="">
            </div>
            `

            }
        }
    }
    document.getElementById("indicadores").innerHTML = indicator;
    document.getElementById("verImagens").innerHTML = imagesToApend;
};

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    //muestra la info del auto seleccionado
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productInfo = resultObj.data;

            let productNameHTML  = document.getElementById("categoryName");
            let productNameeHTML  = document.getElementById("categoryNamee");
            let productDescriptionHTML = document.getElementById("categoryDescription");
            let productCountHTML = document.getElementById("productCount");
            let productCriteriaHTML = document.getElementById("productCriteria");

            //agarro la URL y les paso el nombre al HTML
            let params = new URLSearchParams(location.search);
            var nombreProd = params.get('producto');
        
            productNameHTML.innerHTML = productInfo.category; 
            productNameeHTML.innerHTML = nombreProd;
            productDescriptionHTML.innerHTML = productInfo.description;
            productCountHTML.innerHTML = productInfo.cost+ " " +productInfo.currency;
            productCriteriaHTML.innerHTML = productInfo.soldCount;
                      
            //Muestro las imagenes en forma de galería
            showImagesGallery(productInfo.images);
            
        }


        //muestra los comentarios
            getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
                if (resultObj.status === "ok")
                {
                    product = resultObj.data;
                let htmlContentToAppend = "";
                for(let i = 0; i < product.length; i++){
                    let producto = product[i];
                    htmlContentToAppend +=`
                    <p>
                    <div class="border">                          
                    <p class="card-title"> <span class="nombre">` + producto.user +`</span></p>                
                    <p class="card-text">` + producto.description + `</p> 
                    `
                    for(let i = 0; i < 5; i++){
                        if(i >= producto.score){
                            htmlContentToAppend+=`<p class="fa fa-star">`
                        }
                        else {
                            htmlContentToAppend+=`<p class="fa fa-star checked">`
                        }
                    }
                    htmlContentToAppend+=`    
                    <p <span class="align">`+ producto.dateTime +`</span> </p>                                                         
                    </div>
                    </p>
                
                    `
                 }
                document.getElementById("container comentarios").innerHTML = htmlContentToAppend;   
                }

            }) 
     
            //Muestra los productos relacionados
            getJSONData(PRODUCTS_URL).then(function(resultObj){
                if (resultObj.status === "ok")
                {
                    product = resultObj.data;
                    let htmlContentToAppend = "";
                    for(let i = 0; i < productInfo.relatedProducts.length; i++){
                        let productos = product[productInfo.relatedProducts[i]];

                    htmlContentToAppend +=`
                    <div class="col-lg-3 col-md-4 col-6">  
                        <div class="d-block mb-4 h-100"> 
                        <a href="product-info.html?producto=`+ productos.name +`">
                                <img class="img-thumbnail" src="static/`+productos.imgSrc+`" alt="productos.name">
                            </a>  
                            <div class="card">                     
                            <h4 class="mb-1">`+productos.name+`</h4>
                            <p class="mb-1">`+productos.description+`</p>
                            <p class="mb-1">`+productos.cost+" "+productos.currency+`</p>
                            </div>
                        </div>
                    </div> 
                
                    `
                }
                document.getElementById("productCriteriaa").innerHTML = htmlContentToAppend
            }
        })   
    })
});
   
//esta funcion es para que el usuario vea con una alerta que mando su mensaje
    var mandoMensaje = "Usted mando el mensaje correctamente."//es el mensaje que quiero que aparezca
    var form_id = document.getElementById("preguntaVendedor")//este es el id del form del e-mail
    let infoMissing = false;//declaro un booleano 
    let msgToShowHTML = document.getElementById("resultSpan");

    function getComent(){//funcion para que valide si se envio el mensaje (e-mail)
      if(form_id===""){//se fija si los campos estan vacios
        (form_id.classList.add('is-invalid'))//si estan vacios el formulario
        infoMissing = true;//pide que ingreses los campos
      }
      else {
       (!infoMissing);//si no estan vacios
        document.getElementById("alertResult").classList.add('alert-success');
        document.getElementById("alertResult").classList.add("show");
        msgToShowHTML.innerHTML = mandoMensaje;
      }
  };
document.getElementById('preguntaVendedor').addEventListener('submit', getComent);//agrega un evento para el boton submit con la funcion de arriba


//funcion para que se muestre el mensaje en el html

document.addEventListener("submit", function(e){
    e.preventDefault();
    localStorage.setItem("comentario", comentData);
    var comentData = document.getElementById('mensajeEnviado').value;
    var elNombre = localStorage.getItem("usuario");
    var hoy = new Date();
    var date = hoy.getFullYear()+'-'+(hoy.getMonth()+1)+'-'+hoy.getDate();
    var hora = new Date();
    var time = hora.getHours() + ":" + hora.getMinutes() + ":" + hora.getSeconds();
    contenedorDeEstrellas = document.createElement('div');
    contenedorDeEstrellas.classList.add('estrellas');
    contenedorDeEstrellas.innerHTML =  `
        <span class="fa fa-star " ></span>
        <span class="fa fa-star " ></span>
        <span class="fa fa-star" ></span>
        <span class="fa fa-star" ></span>
        <span class="fa fa-star" ></span>
        ` ;
    let htmlContentToAppend = "";
    htmlContentToAppend +=`
    <p>
        <div class="border">                           
            <p class="card-title"> <span class="nombre">` + elNombre +`</span></p>                
            <p class="card-text">` + comentData + `</p> 
            <p <span id="estrellas"> 
            <p <span class="align">` + date + " " + time +`</span> </p>                                                             
        </div>
    </p>
    `;
    document.getElementById("container comentarios").innerHTML += htmlContentToAppend;  
    var estrellas = contenedorDeEstrellas.getElementsByClassName('fa-star');
    var calificacion = document.getElementById('calificacion').value;
    for(let i = 0; i < 5; i++){
        if(i < calificacion){
         estrellas[i].classList.add('checked')
        }
    }
    document.getElementById("estrellas").appendChild(contenedorDeEstrellas);
});


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(){
})

