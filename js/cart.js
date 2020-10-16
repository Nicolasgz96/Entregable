const subTotal = document.getElementById("sub-total");
const totalFinal = document.getElementById("totalMoneda");
const porcentajeTotal = document.getElementById("comissionPorcentaje");
const signoPorcentaje = " %";
const symboloPesos = " UYU";

let comissionEstandar = 0.05;
let comissionExpress = 0.07;
let comissionPremium = 0.15;
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
                            <span class="align-bottom">Total elegidos: <input min="0" type ="number" id="cantidadArticulo`+ i +`" value="`+ productos.count +`"> </span>
                            <div > Precio Total: <span id="precioFinal`+ i +`" class="precioTotal"></span> </div>
                        </div>
                    <p>`+ "Costo unitario: " + productos.unitCost + " " + productos.currency + ` </p>
                </div>
                <br>
                ` 
                 
            }
            
            document.getElementById("carrito").innerHTML = htmlContentToAppend;
            

           //cambia el valor del array de el carrito

            for(let i = 0; i < product.length; i++){
                let producto = product[i]
                function cambioDolar(){
                    if(producto.currency === "USD"){
                        return producto.unitCost * 40 * document.getElementById("cantidadArticulo"+i).value
                    }else{
                        return producto.unitCost * document.getElementById("cantidadArticulo"+i).value;
                    }
                    
                }

                document.getElementById("precioFinal"+i).innerHTML = cambioDolar() + symboloPesos;
                var sumatoria = 0; 
                    for(let j = 0; j < product.length; j++){
                
                        sumatoria +=  parseInt(document.getElementsByClassName("precioTotal")[j].innerHTML)                  
                        
                    }
                    subTotal.innerHTML = sumatoria  + symboloPesos
                document.getElementById("cantidadArticulo"+i).addEventListener("change",function(){
                   
                    document.getElementById("precioFinal"+i).innerHTML = cambioDolar() + symboloPesos;
                })
                   
            }

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
            
            }

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

//mando mensaje si los campos no estan vacios

getJSONData(CART_BUY_URL).then(function(resultObj) {
    let msgToShowHTML = document.getElementById("resultSpan");
    if (resultObj.status === "ok")
    {
        msg = resultObj.data.msg;
        var form_id = document.getElementById("creditCard")//este es el id del form del e-mail
        let productCategory = document.getElementById("transferBanck");
        let infoMissing = false;//declaro un booleano

        function getCarrito(e){//funcion para que valide si se envio el mensaje (e-mail)
            e.preventDefault();
            if(form_id==="" && productCategory===""){//se fija si los campos estan vacios
                infoMissing = true;//pide que ingreses los campos
            }else{
                (!infoMissing);//si no estan vacios
                document.getElementById("alertResult").classList.add('alert-success');
                document.getElementById("alertResult").classList.add("show");
                msgToShowHTML.innerHTML = msg;
            }
        };
        document.getElementById('carrito-msg').addEventListener('submit', getCarrito);//agrega un evento para el boton submit con la funcion de arriba
    }
});


//le doy el valor del imput al parrafo

let eleccion = document.getElementById("transfer"); 

eleccion.addEventListener("click", function(){
    var bancaria = document.getElementById("transfer").value
    document.getElementById("elegirCompra").innerHTML = bancaria + ` <a href="#exampleModal" data-toggle="modal">Metodos de pagos</a>`
})

let eleccionCredito = document.getElementById("credit"); 

eleccionCredito.addEventListener("click", function(){
    var bancaria = document.getElementById("credit").value
    document.getElementById("elegirCompra").innerHTML = bancaria + ` <a href="#exampleModal" data-toggle="modal">Metodos de pagos</a>`
})


