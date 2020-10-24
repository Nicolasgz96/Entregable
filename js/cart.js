const subTotal = document.getElementById("sub-total");
const totalFinal = document.getElementById("totalMoneda");
const porcentajeTotal = document.getElementById("comissionPorcentaje");
const signoPorcentaje = " %";
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
                        <img src="` + productos.src + `" alt="" class="img-thumbnail">
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
                    totalPrice = product[0].unitCost * product[0].count * 40;
                } else {
                    totalPrice = product[0].unitCost * product[0].count;
                }
                var subTotall = 0;
                subTotall += totalPrice;
                document.getElementById("carrito").innerHTML = `    
                <div class="row">
                <div class="col-3">
                    <img src="` + product[0].src + `" alt="" class="img-thumbnail">
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
                    porcentajeTotal.innerHTML = parseInt(subTotal.innerHTML) * comissionActual + signoPorcentaje
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
                    porcentajeTotal.innerHTML = parseInt(subTotal.innerHTML) * comissionActual + signoPorcentaje
                    totalFinal.innerHTML = parseInt(porcentajeTotal.innerHTML) + parseInt(subTotal.innerHTML) + symboloPesos
                            
                })
            
            };

            porcentajeTotal.innerHTML = parseInt(subTotal.innerHTML) * comissionActual + signoPorcentaje
            totalFinal.innerHTML = parseInt(porcentajeTotal.innerHTML) + parseInt(subTotal.innerHTML)  + symboloPesos

            //asigno los calculos para los porcentajes

               document.getElementById("estandar").addEventListener("change", function(){
                comissionActual = comissionEstandar;
                porcentajeTotal.innerHTML = parseInt(subTotal.innerHTML) * comissionActual + signoPorcentaje
                totalFinal.innerHTML = parseInt(porcentajeTotal.innerHTML) + parseInt(subTotal.innerHTML) + symboloPesos
                              
            });

            document.getElementById("express").addEventListener("change", function(){
                comissionActual = comissionExpress;
                porcentajeTotal.innerHTML = parseInt(subTotal.innerHTML) * comissionActual + signoPorcentaje
                totalFinal.innerHTML = parseInt(porcentajeTotal.innerHTML) + parseInt(subTotal.innerHTML)  + symboloPesos

            });

            document.getElementById("premium").addEventListener("change", function(){
                comissionActual = comissionPremium;
                porcentajeTotal.innerHTML = parseInt(subTotal.innerHTML) * comissionActual + signoPorcentaje
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
                    porcentajeTotal.innerHTML = parseInt(subTotal.innerHTML) * comissionActual + signoPorcentaje
                    totalFinal.innerHTML = parseInt(porcentajeTotal.innerHTML) + parseInt(subTotal.innerHTML) + symboloPesos
                            
                })
            
            };

            porcentajeTotal.innerHTML = parseInt(subTotal.innerHTML) * comissionActual + signoPorcentaje
            totalFinal.innerHTML = parseInt(porcentajeTotal.innerHTML) + parseInt(subTotal.innerHTML)  + symboloPesos

            //asigno los calculos para los porcentajes

               document.getElementById("estandar").addEventListener("change", function(){
                comissionActual = comissionEstandar;
                porcentajeTotal.innerHTML = parseInt(subTotal.innerHTML) * comissionActual + signoPorcentaje
                totalFinal.innerHTML = parseInt(porcentajeTotal.innerHTML) + parseInt(subTotal.innerHTML) + symboloPesos
                              
            });

            document.getElementById("express").addEventListener("change", function(){
                comissionActual = comissionExpress;
                porcentajeTotal.innerHTML = parseInt(subTotal.innerHTML) * comissionActual + signoPorcentaje
                totalFinal.innerHTML = parseInt(porcentajeTotal.innerHTML) + parseInt(subTotal.innerHTML)  + symboloPesos

            });

            document.getElementById("premium").addEventListener("change", function(){
                comissionActual = comissionPremium;
                porcentajeTotal.innerHTML = parseInt(subTotal.innerHTML) * comissionActual + signoPorcentaje
                totalFinal.innerHTML = parseInt(porcentajeTotal.innerHTML) + parseInt(subTotal.innerHTML)  + symboloPesos
            }); 
        }
    })
});

//le doy el valor del input al parrafo

let eleccion = document.getElementById("transfer"); 

eleccion.addEventListener("click", function(){
    var bancaria = document.getElementById("transfer").value
    document.getElementById("elegirCompra").innerHTML = bancaria + ` <a href="#exampleModal" data-toggle="modal">Metodos de pagos</a>`
});

let eleccionCredito = document.getElementById("credit"); 

eleccionCredito.addEventListener("click", function(){
    var bancaria = document.getElementById("credit").value
    document.getElementById("elegirCompra").innerHTML = bancaria + ` <a href="#exampleModal" data-toggle="modal">Metodos de pagos</a>`
});

//fijo los campos para la validacion

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

let botonModal = document.getElementById('modal-submit');
botonModal.addEventListener('click', function(){
    sessionStorage.setItem("metodoCompletado", "1");
});

let compraBoton = document.getElementById('compraChequeo');
compraBoton.addEventListener('click', function(e){
    let mostartMensaje = document.getElementById('muestroAlerta');
    e.preventDefault();
    let metodoDePago = sessionStorage.getItem("metodoCompletado");
    if(metodoDePago === "1"){
        return true;
    }
    else{
        mostartMensaje.innerHTML = "Rellena los datos de pago";
        return false;
    }
  
});

//mando mensaje si los campos no estan vacios

getJSONData(CART_BUY_URL).then(function(resultObj) {
    let msgToShowHTML = document.getElementById("resultSpan");
    if (resultObj.status === "ok")
    {
        msg = resultObj.data.msg;
        var tarjetaCredito = document.getElementById("pais");
        let transferencia = document.getElementById("direccion");
        let nombre = document.getElementById("nombre");
        let apellido = document.getElementById("apellido");
        let infoMissing = false;//declaro un booleano

        function getCarrito(e){//funcion para que valide si se envio el mensaje (e-mail)
            e.preventDefault();
            if(tarjetaCredito === "" && transferencia === "" && nombre ==="" && apellido === ""){//se fija si los campos estan vacios
                infoMissing = true;//pide que ingreses los campos
            }
            else {
                (!infoMissing);//si no estan vacios
                document.getElementById("alertResult").classList.add('alert-success');
                document.getElementById("alertResult").classList.add("show");
                $('#modal-submit').modal('hide')
                msgToShowHTML.innerHTML = msg;
            }
            return true;
        };
        document.getElementById('carrito-msg').addEventListener('submit', getCarrito);//agrega un evento para el boton submit con la funcion de arriba
    }
});
