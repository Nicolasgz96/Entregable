
//funcion que muestra las imagenes
function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
            <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        
    }
    document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    //muestra la info del auto seleccionado
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productInfo = resultObj.data;
            console.log(productInfo);

            let productNameHTML  = document.getElementById("categoryName");
            let productNameeHTML  = document.getElementById("categoryNamee");
            let productDescriptionHTML = document.getElementById("categoryDescription");
            let productCountHTML = document.getElementById("productCount");
            let productCriteriaHTML = document.getElementById("productCriteria");
        
            productNameHTML.innerHTML = productInfo.category;
            productNameeHTML.innerHTML = productInfo.name;
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
                    for(let z = 0; z < 5; z++){
                        if(z >= producto.score){
                            htmlContentToAppend+=`<p class="fa fa-star">`
                        }else{
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
            };

            });
     
            //Muestra los productos relacionados
            getJSONData(PRODUCTS_URL).then(function(resultObj){
                if (resultObj.status === "ok")
                {
                    product = resultObj.data;
                    console.log(product);
                    let htmlContentToAppend = "";
                    for(let i = 0; i < productInfo.relatedProducts.length; i++){
                        let productos = product[productInfo.relatedProducts[i]];

                    htmlContentToAppend +=`
                    <div class="col-lg-3 col-md-4 col-6">  
                        <div class="d-block mb-4 h-100"> 
                        <a href="product-info.html?`+ productos.name +`">
                                <img class="img-fluid img-thumbnail" src="`+productos.imgSrc+`" alt="productos.name">
                            </a>                       
                        <h4 class="mb-1">`+productos.name+`</h4>
                            <p class="mb-1">`+productos.description+`</p>
                            <p class="mb-1">`+productos.cost+" "+productos.currency+`</p>
                        </div>
                    </div> 
                
                    `
                }
                document.getElementById("productCriteriaa").innerHTML = htmlContentToAppend
            }
        })   
    });
});

//esta funcion es para que el usuario vea con una alerta que mando su mensaje
    var mandoMensaje = "Usted mando el mensaje correctamente."//es el mensaje que quiero que aparezca
    var form_id = document.getElementById("preguntaVendedor")//este es el id del form del e-mail
    let infoMissing = false;//declaro un booleano 

    function getComent(){//funcion para que valide si se envio el mensaje (e-mail)
      if(form_id===""){//se fija si los campos estan vacios
        (form_id.classList.add('is-invalid'))//si estan vacios el formulario
        infoMissing = true;//pide que ingreses los campos
      }else{
       (!infoMissing);//si no estan vacios
       return alert(mandoMensaje);//mando la alerta
      }
  };
document.getElementById('preguntaVendedor').addEventListener('submit', getComent);//agrega un evento para el boton submit con la funcion de arriba


//funcion para que se muestre el mensaje en el html

document.addEventListener("submit", function(e){
    e.preventDefault();
    var elNombre = localStorage.getItem("nombre");
    var comentData = document.getElementById('mensajeEnviado').value;
    var valor = localStorage.getItem("usuario")
    var hoy = new Date();
    var date = hoy.getFullYear()+'-'+(hoy.getMonth()+1)+'-'+hoy.getDate();
    var hora = new Date();
    var time = hora.getHours() + ":" + hora.getMinutes() + ":" + hora.getSeconds();
    localStorage.setItem("nombre", valor);
    localStorage.setItem("comentario", comentData);
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

