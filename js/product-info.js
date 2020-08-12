var category = {};

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

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            category = resultObj.data;

            let categoryNameHTML  = document.getElementById("categoryName");
            let categoryNameeHTML  = document.getElementById("categoryNamee");
            let categoryDescriptionHTML = document.getElementById("categoryDescription");
            let productCountHTML = document.getElementById("productCount");
            let productCriteriaHTML = document.getElementById("productCriteria");
            let productCriteriaaHTML = document.getElementById("productCriteriaa");
        
            categoryNameHTML.innerHTML = category.category;
            categoryNameeHTML.innerHTML = category.name;
            categoryDescriptionHTML.innerHTML = category.description;
            productCountHTML.innerHTML = category.cost+ " " +category.currency;
            productCriteriaHTML.innerHTML = category.soldCount;
            productCriteriaaHTML.innerHTML = category.relatedProducts;
            

            //Muestro las imagenes en forma de galería
            showImagesGallery(category.images);
        }
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            category = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productScoreHTML = document.getElementById("productScore");
            let productCriteriaaaHTML = document.getElementById("productCriteriaaa");
            let productDateHTML = document.getElementById("productDate");
            let productName1HTML = document.getElementById("productName1");
            let productScore1HTML = document.getElementById("productScore1");
            let productCriteriaaa1HTML = document.getElementById("productCriteriaaa1");
            let productDate1HTML = document.getElementById("productDate1");
            let productName2HTML = document.getElementById("productName2");
            let productScore2HTML = document.getElementById("productScore2");
            let productCriteriaaa2HTML = document.getElementById("productCriteriaaa2");
            let productDate2HTML = document.getElementById("productDate2");
            let productName3HTML = document.getElementById("productName3");
            let productScore3HTML = document.getElementById("productScore3");
            let productCriteriaaa3HTML = document.getElementById("productCriteriaaa3");
            let productDate3HTML = document.getElementById("productDate3");
        
            productNameHTML.innerHTML = "Nombre:"+" "+category[0].user;
            productScoreHTML.innerHTML = "Puntuación:"+" "+category[0].score;
            productCriteriaaaHTML.innerHTML = "Comentario:"+" "+ category[0].description;
            productDateHTML.innerHTML = "Fecha y hora:"+" "+category[0].dateTime;
            productName1HTML.innerHTML = "Nombre:"+" "+category[1].user;
            productScore1HTML.innerHTML = "Puntuación:"+" "+category[1].score;
            productCriteriaaa1HTML.innerHTML = "Comentario:"+" "+ category[1].description;
            productDate1HTML.innerHTML = "Fecha y hora:"+" "+category[1].dateTime;
            productName2HTML.innerHTML = "Nombre:"+" "+category[2].user;
            productScore2HTML.innerHTML = "Puntuación:"+" "+category[2].score;
            productCriteriaaa2HTML.innerHTML = "Comentario:"+" "+ category[2].description;
            productDate2HTML.innerHTML = "Fecha y hora:"+" "+category[2].dateTime;
            productName3HTML.innerHTML = "Nombre:"+" "+category[3].user;
            productScore3HTML.innerHTML = "Puntuación:"+" "+category[3].score;
            productCriteriaaa3HTML.innerHTML = "Comentario:"+" "+ category[3].description;
            productDate3HTML.innerHTML = "Fecha y hora:"+" "+category[3].dateTime;
            

            //Muestro las imagenes en forma de galería
            // showImagesGallery(category.images);
        }
    });
});