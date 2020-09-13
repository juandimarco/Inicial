const ORDER_ASC_BY_COST = "Asc";
const ORDER_DESC_BY_COST = "Desc";
const ORDER_BY_PROD_RELEVANCE = "Rel";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minRel = undefined;
var maxRel = undefined;

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_RELEVANCE){
        result = array.sort(function(a, b) {
            let aRel = parseInt(a.soldCount);
            let bRel = parseInt(b.soldCount);

            if ( aRel > bRel ){ return -1; }
            if ( aRel < bRel ){ return 1; }
            return 0;
        });
    }

    return result;
}

function showProductsList() {

    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductsArray.length; i++) {
        let product = currentProductsArray[i];

        if (((minRel == undefined) || (minRel != undefined && parseInt(product.cost) >= minRel)) &&
            ((maxRel == undefined) || (maxRel != undefined && parseInt(product.cost) <= maxRel))){

            htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="list-group-item list-group-item-action">
                    <div class="row">
                        <div class="col-3">
                            <img src="` + product.imgSrc + `" alt="` + product.desc + `" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">` + product.name + `</h4>
                                <small class="text-muted">` + product.soldCount + ` artículos</small>
                            </div>
                            <p>${product.description}</p>
                            <br><br>
                            <h4>${product.currency + "  " + product.cost}</h4>
                        </div>
                    </div>
                </div>
            </a>
            `
            }

        document.getElementById("products_list").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro los productos ordenados
    showProductsList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDER_ASC_BY_COST, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortByRel").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_RELEVANCE);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterRelMin").value = "";
        document.getElementById("rangeFilterRelMax").value = "";

        minRel = undefined;
        maxRel = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterRel").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minRel = document.getElementById("rangeFilterRelMin").value;
        maxRel = document.getElementById("rangeFilterRelMax").value;

        if ((minRel != undefined) && (minRel != "") && (parseInt(minRel)) >= 0){
            minRel = parseInt(minRel);
        }
        else{
            minRel = undefined;
        }

        if ((maxRel != undefined) && (maxRel != "") && (parseInt(maxRel)) >= 0){
            maxRel = parseInt(maxRel);
        }
        else{
            maxRel = undefined;
        }

        showProductsList();
    });
});