var product = {};

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

function showRelatedProducts(array) {
    let htmlContentToAppend = "";
    let related = product.relatedProducts;

    for(let i = 0; i < related.length; i++) {
        let j = related[i];

        let proRel = array[j];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <a href="product-info.html">
              <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + proRel.imgSrc + `" alt="">
                <strong> ` + proRel.name + " " + proRel.currency + " " + proRel.cost + ` </strong>
              </div>
            </a>
        </div>
        `

        document.getElementById("relatedProducts").innerHTML = htmlContentToAppend;
    }
}

function showComments(commentArray){

    let htmlContentToAppend = "";

    for(let i = 0; i < commentArray.length; i++){
        let comment = commentArray[i];
        
        var score = "";
        for (let i = 1; i <= comment.score; i++) {
            score += `<span class="fa fa-star checked"></span>`;
        }
        for (let i = comment.score; i < 5; i++) {
            score += `<span class="fa fa-star"></span>`;
        }

        htmlContentToAppend += `
        <div>
            <p><strong> ` + comment.user + " " + score + ` </strong></p>
            <p> ` + comment.description + `</p>
            <small class="text-muted">` + comment.dateTime + `</small>
            <hr>
            </div>
        </div>
        `

        document.getElementById("comments").innerHTML = htmlContentToAppend;
    }
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHTML = document.getElementById("productCost");
            let productCountHTML = document.getElementById("productCount");
            let productCategoryHTML = document.getElementById("productCategory");
            

            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCostHTML.innerHTML = product.currency + " " + product.cost;
            productCountHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = product.category;

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);

            getJSONData(PRODUCTS_URL).then(function(resultObj2) {
                if (resultObj2.status === "ok") 
                {
                    productRel = resultObj2.data;
                    showRelatedProducts(productRel);
                }
            });
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            comments = resultObj.data;

            showComments(comments);

        }
    });
});

let selectedScore = 1;

let star1 = document.getElementById("one");
let star2 = document.getElementById("two");
let star3 = document.getElementById("three");
let star4 = document.getElementById("four");
let star5 = document.getElementById("five");

star1.addEventListener("click", function(e) {
    star1.className = "fa fa-star checked";
    star2.className = "fa fa-star";
    star3.className = "fa fa-star";
    star4.className = "fa fa-star";
    star5.className = "fa fa-star";

    selectedScore = 1;
});

star2.addEventListener("click", function(e) {
    star1.className = "fa fa-star checked";
    star2.className = "fa fa-star checked";
    star3.className = "fa fa-star";
    star4.className = "fa fa-star";
    star5.className = "fa fa-star";

    selectedScore = 2;
});
star3.addEventListener("click", function(e) {
    star1.className = "fa fa-star checked";
    star2.className = "fa fa-star checked";
    star3.className = "fa fa-star checked";
    star4.className = "fa fa-star";
    star5.className = "fa fa-star";

    selectedScore = 3;
});
star4.addEventListener("click", function(e) {
    star1.className = "fa fa-star checked";
    star2.className = "fa fa-star checked";
    star3.className = "fa fa-star checked";
    star4.className = "fa fa-star checked";
    star5.className = "fa fa-star ";

    selectedScore = 4;
});
star5.addEventListener("click", function(e) {
    star1.className = "fa fa-star checked";
    star2.className = "fa fa-star checked";
    star3.className = "fa fa-star checked";
    star4.className = "fa fa-star checked";
    star5.className = "fa fa-star checked";

    selectedScore = 5;
});


document.getElementById("comment").addEventListener("click", function (e) {
    e.preventDefault();
    let newComment = {};

    newComment.score = selectedScore; //document.getElementById("stars").value;
    newComment.description = document.getElementById("cuerpo").value;
    newComment.user = sessionStorage.getItem("user");
    newComment.dateTime = new Date();

    comments.push(newComment);

    showComments(comments);

});