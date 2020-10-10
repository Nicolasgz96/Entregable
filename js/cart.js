const subTotal = document.getElementById("sub-total");
const totalFinal = document.getElementById("totalMoneda");
const porcentajeTotal = document.getElementById("comissionPorcentaje");
const signoPorcentaje = "%";

let comissionEstandar = 0.05;
let comissionExpress = 0.07;
let comissionPremium = 0.15;
let comissionActual = comissionEstandar;

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data.articles;
            let htmlContentToAppend = "";
            for(i = 0; i < product.length; i++){
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
                            <div id="precioFinal`+ i +`"> Precio Total: </div>
                        </div>
                    <p>`+ "Costo unitario: " + productos.unitCost + " " + productos.currency + ` </p>
                </div>
                <br>
                `

                document.getElementById("carrito").innerHTML = htmlContentToAppend 
                document.getElementById("moneda").innerHTML = productos.currency
                document.getElementById("totalCurrancy").innerHTML = productos.currency 
                document.getElementById("precioFinal"+ i).innerHTML =  document.getElementById('cantidadArticulo'+ i).value * productos.unitCost

                //Porcentajes
                porcentajeTotal.innerHTML = 5 + signoPorcentaje

                document.getElementById("estandar").addEventListener("change", function(){
                    porcentajeTotal.innerHTML = 5 + signoPorcentaje
                });

                document.getElementById("express").addEventListener("change", function(){
                    porcentajeTotal.innerHTML = 7 + signoPorcentaje
                });

                document.getElementById("premium").addEventListener("change", function(){
                    porcentajeTotal.innerHTML = 15 + signoPorcentaje
                });

                
                for(let x = 0; x < product.length; x++){
                    let producto = product[x];
                    document.getElementById("cantidadArticulo"+i).addEventListener("change",function(){
                        var nuevaCantidad = document.getElementById("cantidadArticulo"+x).value;
                        document.getElementById("precioFinal"+x).innerHTML = nuevaCantidad*producto.unitCost 
                        var totalPrice = 0;  
                        //aca paso los dolares a pesos
                        for ( let j = 0; j < product.length; j++ ){
                            let articulo = product[j]
                            if(articulo.currency === "USD"){
                                totalPrice = articulo.unitCost*document.getElementById("cantidadArticulo"+j).value*40;
                            } else {
                                totalPrice = articulo.unitCost*document.getElementById("cantidadArticulo"+j).value;
                                
                            }
                        }
                        subTotal.innerHTML = totalPrice ;
                });

                //Total y subTotal
                document.getElementById("cantidadArticulo"+i).addEventListener("change", function(){
                        totalFinal.innerHTML =  document.getElementById("cantidadArticulo"+x).value 
                        * (Math.round(productos.unitCost * comissionActual) + productos.unitCost)
                    
                        subTotal.innerHTML = document.getElementById("cantidadArticulo"+x).value 
                        * Math.round(productos.unitCost) 
                });

                //asigno el valor value a los imputs
                let valorClase = document.getElementById("cantidadArticulo"+i)
                valorClase.setAttribute("value", productos.count)
                let valorCambio = document.getElementById("cantidadArticulo"+i).value
                let valorIni = productos.unitCost * valorCambio

                //asigno los calculos para los porcentajes
                document.getElementById("estandar").addEventListener("change", function(){
                    totalFinal.innerHTML = Math.round(valorIni * comissionEstandar) + valorIni
                    subTotal.innerHTML = Math.round(valorIni)
                    comissionActual = comissionEstandar;
                });

                document.getElementById("express").addEventListener("change", function(){
                    totalFinal.innerHTML = Math.round(valorIni * comissionExpress) + valorIni
                    subTotal.innerHTML = Math.round(valorIni)
                    comissionActual = comissionExpress;
                });

                document.getElementById("premium").addEventListener("change", function(){
                    totalFinal.innerHTML =  Math.round(valorIni * comissionPremium) + valorIni
                    subTotal.innerHTML =  Math.round(valorIni)
                    comissionActual = comissionPremium;
                });

                    //sub total
                    subTotal.innerHTML = productos.unitCost * productos.count 
                    //Total
                    totalFinal.innerHTML = Math.round(valorIni * comissionEstandar) + valorIni
            
                }
            }
        }               
    }); 

    getJSONData(CART_BUY_URL).then(function(resultObj) {
        let msgToShowHTML = document.getElementById("resultSpan");
        if (resultObj.status === "ok")
        {
            msg = resultObj.data.msg;
            var form_id = document.getElementById("carrito-msg")//este es el id del form del e-mail
            let productCategory = document.getElementById("metodoPago");
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
    })
});