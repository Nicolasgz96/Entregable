const subTotal = document.getElementById("sub-total");
const totalFinal = document.getElementById("totalMoneda");
const porcentajeTotal = document.getElementById("comissionPorcentaje"); 
const symboloPesos = " UYU";

let comissionEstandar = 0.05;
let comissionExpress = 0.07;
let comissionPremium = 0.15;
let cambioUYU = 40;
let comissionActual = comissionEstandar;

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_FULL_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data.articles;
            let htmlContentToAppend = "";
            for(let i = 0; i < product.length; i++){
                let productos = product[i]
                htmlContentToAppend +=`
                <div class="row">
                    <div class="col-3">
                        <img src="static/` + productos.src + `" alt="" class="img-thumbnail">
                    </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">`+ productos.name +`</h4>
                            </div>
                            <span class="align-bottom">Total elegidos: <input min="0" type ="number" id="cantidadArticulo`+ i +`" value="`+ productos.count +`"></span>
                            <div > Precio Total: <span id="precioFinal`+ i +`" class="precioTotal"></span> </div>
                        </div>
                        <button type="button" id="borrarArticulo`+ i +`" class="remove-button">X</button>
                    <p>`+ "Costo unitario: " + productos.unitCost + " " + productos.currency + ` </p>
                </div>
                <hr class="mb-4">
                ` 
                 
            }
            
            document.getElementById("carrito").innerHTML = htmlContentToAppend;

            //------------------------------borro los articulos-------------------------------------------------------------------------------------------
            
 for (let i = 0; i < product.length; i++) { 
                   
    let borrar =  document.getElementById("borrarArticulo"+i);
    borrar.addEventListener("click", function(){
        product.splice(i, 1);
        
    if (product[0].currency === "USD") {
        totalPrice = product[0].unitCost * product[0].count * cambioUYU;
    } else {
        totalPrice = product[0].unitCost * product[0].count;
    }
    var totalNuevo = 0;
    totalNuevo += totalPrice;
    document.getElementById("carrito").innerHTML = `    
    <div class="row">
    <div class="col-3">
        <img src="static/` + product[0].src + `" alt="" class="img-thumbnail">
    </div>
        <div class="col">
            <div class="d-flex w-100 justify-content-between">
                <h4 class="mb-1">`+ product[0].name +`</h4>
            </div>
            <span class="align-bottom">Total elegidos: <input min="0" type ="number" id="cantidadArticulo`+ 0 +`" value="`+ product[0].count +`"></span>
            <div > Precio Total: <span id="precioFinal`+ 0 +`" class="precioTotal"></span> </div>
        </div>
        <button type="button" id="borrarArticulo`+ 0 +`" class="remove-button">X</button>
    <p>`+ "Costo unitario: " + product[0].unitCost + " " + product[0].currency + ` </p>
</div>
<hr class="mb-4">
`

//cambia el valor del array de el carrito

for(let i = 0; i < product.length; i++){
    let producto = product[i]
    function cambioDolar(){
        if(producto.currency === "USD"){
            return producto.unitCost * cambioUYU * document.getElementById("cantidadArticulo"+i).value
        }else{
            return producto.unitCost * document.getElementById("cantidadArticulo"+i).value;
        }
        
    };

    document.getElementById("precioFinal"+i).innerHTML = cambioDolar() + symboloPesos;
    var sumatoria = 0; 
        for(let j = 0; j < product.length; j++){
    
            sumatoria +=  parseInt(document.getElementsByClassName("precioTotal")[j].innerHTML)                  
            
        }
        subTotal.innerHTML = sumatoria  + symboloPesos
    document.getElementById("cantidadArticulo"+i).addEventListener("change",function(){
       
        document.getElementById("precioFinal"+i).innerHTML = cambioDolar() + symboloPesos;
    });

    document.getElementById("cantidadArticulo"+i).addEventListener("change", () => {
        var sumatoria = 0; 
        for(let j = 0; j < product.length; j++){
    
            sumatoria +=  parseInt(document.getElementsByClassName("precioTotal")[j].innerHTML)                  
            
        }
        subTotal.innerHTML = sumatoria + symboloPesos
        porcentajeTotal.innerHTML = parseInt(subTotal.innerHTML) * comissionActual + symboloPesos
        totalFinal.innerHTML = parseInt(porcentajeTotal.innerHTML) + parseInt(subTotal.innerHTML) + symboloPesos
                
    })
       
};

//cambia el subTotal y el total

for(let i = 0; i < product.length; i++){
    document.getElementById("cantidadArticulo"+i).addEventListener("change", () => {
        var sumatoria = 0; 
        for(let j = 0; j < product.length; j++){
    
            sumatoria +=  parseInt(document.getElementsByClassName("precioTotal")[j].innerHTML)                  
            
        }
        subTotal.innerHTML = sumatoria + symboloPesos
        porcentajeTotal.innerHTML = parseInt(subTotal.innerHTML) * comissionActual + symboloPesos
        totalFinal.innerHTML = parseInt(porcentajeTotal.innerHTML) + parseInt(subTotal.innerHTML) + symboloPesos
                
    })

};

porcentajeTotal.innerHTML = parseInt(subTotal.innerHTML) * comissionActual + symboloPesos
totalFinal.innerHTML = parseInt(porcentajeTotal.innerHTML) + parseInt(subTotal.innerHTML)  + symboloPesos

//asigno los calculos para los porcentajes

   document.getElementById("estandar").addEventListener("change", function(){
    comissionActual = comissionEstandar;
    porcentajeTotal.innerHTML = parseInt(subTotal.innerHTML) * comissionActual + symboloPesos
    totalFinal.innerHTML = parseInt(porcentajeTotal.innerHTML) + parseInt(subTotal.innerHTML) + symboloPesos
                  
});

document.getElementById("express").addEventListener("change", function(){
    comissionActual = comissionExpress;
    porcentajeTotal.innerHTML = parseInt(subTotal.innerHTML) * comissionActual + symboloPesos
    totalFinal.innerHTML = parseInt(porcentajeTotal.innerHTML) + parseInt(subTotal.innerHTML)  + symboloPesos

});

document.getElementById("premium").addEventListener("change", function(){
    comissionActual = comissionPremium;
    porcentajeTotal.innerHTML = parseInt(subTotal.innerHTML) * comissionActual + symboloPesos
    totalFinal.innerHTML = parseInt(porcentajeTotal.innerHTML) + parseInt(subTotal.innerHTML)  + symboloPesos
}); 



})
}

//-------------------------------Fin metodo de eliminar articulos------------------------------------------------------------------------------------


           //cambia el valor del array de el carrito

            for(let i = 0; i < product.length; i++){
                let producto = product[i]
                function cambioDolar(){
                    if(producto.currency === "USD"){
                        return producto.unitCost * cambioUYU * document.getElementById("cantidadArticulo"+i).value
                    }else{
                        return producto.unitCost * document.getElementById("cantidadArticulo"+i).value;
                    }
                    
                };

                document.getElementById("precioFinal"+i).innerHTML = cambioDolar() + symboloPesos;
                var sumatoria = 0; 
                    for(let j = 0; j < product.length; j++){
                
                        sumatoria +=  parseInt(document.getElementsByClassName("precioTotal")[j].innerHTML)                  
                        
                    }
                    subTotal.innerHTML = sumatoria  + symboloPesos
                document.getElementById("cantidadArticulo"+i).addEventListener("change",function(){
                   
                    document.getElementById("precioFinal"+i).innerHTML = cambioDolar() + symboloPesos;
                });
                   
            };

            //cambia el subTotal y el total

            for(let i = 0; i < product.length; i++){
                document.getElementById("cantidadArticulo"+i).addEventListener("change", () => {
                    var sumatoria = 0; 
                    for(let j = 0; j < product.length; j++){
                
                        sumatoria +=  parseInt(document.getElementsByClassName("precioTotal")[j].innerHTML)                  
                        
                    }
                    subTotal.innerHTML = sumatoria + symboloPesos
                    porcentajeTotal.innerHTML = parseInt(subTotal.innerHTML) * comissionActual + symboloPesos
                    totalFinal.innerHTML = parseInt(porcentajeTotal.innerHTML) + parseInt(subTotal.innerHTML) + symboloPesos
                            
                })
            
            };

            porcentajeTotal.innerHTML = parseInt(subTotal.innerHTML) * comissionActual + symboloPesos
            totalFinal.innerHTML = parseInt(porcentajeTotal.innerHTML) + parseInt(subTotal.innerHTML)  + symboloPesos

            //asigno los calculos para los porcentajes

               document.getElementById("estandar").addEventListener("change", function(){
                comissionActual = comissionEstandar;
                porcentajeTotal.innerHTML = parseInt(subTotal.innerHTML) * comissionActual + symboloPesos
                totalFinal.innerHTML = parseInt(porcentajeTotal.innerHTML) + parseInt(subTotal.innerHTML) + symboloPesos
                              
            });

            document.getElementById("express").addEventListener("change", function(){
                comissionActual = comissionExpress;
                porcentajeTotal.innerHTML = parseInt(subTotal.innerHTML) * comissionActual + symboloPesos
                totalFinal.innerHTML = parseInt(porcentajeTotal.innerHTML) + parseInt(subTotal.innerHTML)  + symboloPesos

            });

            document.getElementById("premium").addEventListener("change", function(){
                comissionActual = comissionPremium;
                porcentajeTotal.innerHTML = parseInt(subTotal.innerHTML) * comissionActual + symboloPesos
                totalFinal.innerHTML = parseInt(porcentajeTotal.innerHTML) + parseInt(subTotal.innerHTML)  + symboloPesos
            }); 
        }
    })
});

//mensaje que cambia al seleccionar tarjeta bancaria o tarjeta de credito

let eleccion = document.getElementById("transfer"); 

let eleccionCredito = document.getElementById("credit");

eleccion.addEventListener("click", function(){
    var bancaria = document.getElementById("transfer").value
    document.getElementById("elegirCompra").innerHTML = bancaria.fontcolor('green') + ` <a href="#exampleModal" data-toggle="modal">Metodos de pagos</a>`
});
 
eleccionCredito.addEventListener("click", function(){
    var eCredito = document.getElementById("credit").value
    document.getElementById("elegirCompra").innerHTML = eCredito.fontcolor('green') + ` <a href="#exampleModal" data-toggle="modal">Metodos de pagos</a>`
});

//desabilito los campos para la validacion

document.getElementById('credit').addEventListener('input', function(){
    document.getElementById('banck').setAttribute('disabled', "");
    document.getElementById('card').removeAttribute('disabled');
    document.getElementById('cardNumber').removeAttribute('disabled');
    document.getElementById('month').removeAttribute('disabled');
});

document.getElementById('transfer').addEventListener('input', function(){
    document.getElementById('card').setAttribute('disabled', "");
    document.getElementById('cardNumber').setAttribute('disabled', "");
    document.getElementById('month').setAttribute('disabled', "");
    document.getElementById('banck').removeAttribute('disabled');
});

// mando mensaje si los campos no estan vacios

//---Para ver los datos en la URL Comente estas lineas------------------------

getJSONData(CART_BUY_URL).then(function(resultObj) {
    let msgToShowHTML = document.getElementById("resultSpan");
    if (resultObj.status === "ok")
    {
        msg = resultObj.data.msg;
        let infoMissing = false;//declaro un booleano

        function getCarrito(e){//funcion para que valide si se envio el mensaje (e-mail)
            if(!infoMissing){//si no estan vacios
                document.getElementById("alertResult").classList.add('alert-success');
                document.getElementById("alertResult").classList.add("show");
                msgToShowHTML.innerHTML = msg;
                $('#carrito-msg').modal('hide')
             }
        };
        document.getElementById('carrito-msg').addEventListener('submit', getCarrito);//agrega un evento para el boton submit con la funcion de arriba
    }
});

//------------------------Fin---------------------------------------------------

