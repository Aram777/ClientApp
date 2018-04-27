let usrId = 2;
//var baseurl = 'http://localhost/OnlineShoppingProject/';

function PricecatSave1() {

    let url = 'http://localhost/OnlineShoppingProject/index.php/Pricecategory_ctl/pricecategory/PriceCategoryId/9';
    var xhttp = new XMLHttpRequest();
    xhttp.open('DELETE', url, true);
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            document.getElementById("id0").innerHTML = xhttp.responseText;
        }
    };
    xhttp.send();

}

function BaseUrl() {
    return 'https://onlinetoy.azurewebsites.net/';
    //return 'http://localhost/OnlineShoppingProject/';
    //return 'http://www.students.oamk.fi/~t7abar00/';
}
function userid() {
    return 2;
}
function showDataJsn(ctlName, resName, prmName, prmVal, fncName) {
    let url = BaseUrl() + 'index.php/' + ctlName + '/' + resName;
    if (!(prmName === undefined || prmName === null)) {
        url += '/' + prmName + '/' + prmVal;
    }
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            jsonData = JSON.parse(xhttp.responseText);
            fncName(jsonData);
        }
    };
    xhttp.open("GET", url, true);
    //  xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhttp.send();


}


//Admin Functions
function adminPriceCat() {
    document.getElementById("results_dyn").innerHTML = "";
    document.getElementById("AdminPageHeader").innerHTML = "Price Category";
    document.getElementById("AdminPageContent").style.width = "50%";
    document.getElementById("AdminPageContent").style.height = "60%";
    modal = document.getElementById('AdminPage');

    span = document.getElementById('adminclose');
    modal.style.display = "block";
    span.onclick = function () {
        modal.style.display = "none";
    }
    showDataJsn('Pricecategory_ctl', 'pricecategory', null, null, PriceCatShow);

}
function adminProductCat() {
    document.getElementById("results_dyn").innerHTML = "";
    document.getElementById("AdminPageHeader").innerHTML = "Product Category";
    document.getElementById("AdminPageContent").style.width = "50%";
    document.getElementById("AdminPageContent").style.height = "70%";
    modal = document.getElementById('AdminPage');

    span = document.getElementById('adminclose');
    modal.style.display = "block";
    span.onclick = function () {
        modal.style.display = "none";
    }
    showDataJsn('Productscategory_ctl', 'productscategory', null, null, ProdCatShow);

}

//end of Admin Functions
//Product category Functions
function ProdCatShow(jsonData) {
    var enbBut = '';
    var elmtxt = '<button onclick=" PriceCatInsert() ">Add new</button> <br>' +
        '<table " >' +
        '<tr><td>' +
        '<table style=" table-layout: fixed;" id="BaseShowTbl" class="table table-hover table-bordered table-striped " >' +
        '<tr class="info">' +
        '<th>Product Category ID</th><th>Description</th><th>Edit</th><th>Delete</th>';
    for (x in jsonData) {
        enbBut = (jsonData[x].Chkuse > 0) ? 'disabled title="This Id is in use"' : 'enabled';
        elmtxt +=
            '<tr><td>' +
            jsonData[x].ProductsCategoryId +
            '</td><td> ' +
            jsonData[x].PrdCatDescription +
            '</td>' +

            '<td> <a href="javascript:ProdCatEdit(' + jsonData[x].ProductsCategoryId + ',' + jsonData[x].PrdCatDescription + ');"> <button class="btn btn-primary" ' +
            '><span class="glyphicon glyphicson-edit"></button></a></td>' +
            '<td> <a href="javascript:ProdCatDelete(' + jsonData[x].ProductsCategoryId + ');"> <button class="btn btn-primary" ' +
            enbBut +
            '><span class="glyphicon glyphicon-remove"></button></a></td>' +
            '</tr>';
    }
    elmtxt += '</table></td> </tr></table>';
    document.getElementById("results_dyn").innerHTML = elmtxt;
}

function ProdCatEdit(ProductsCategoryId, PrdCatDescription) {
    document.getElementById("results_dyn").innerHTML = '';
    let elmtxt =

        '<label for="">Product category Id</label>' +
        '<br>' +
        '<input type="text" id="ProductsCategoryId" value="' + ProductsCategoryId + '" readonly>' +
        '<br>' +
        '<label for="">Category description</label>' +
        '<br>' +
        '<input type="number" id="PrdCatDescription" value="' + PrdCatDescription + '">' +
        '<br>' +
        '<br>' +
        '<button class="btn btn-success" onclick="ProdcatSave(2)">Save</button>' +
        '<button class="btn btn-danger" onclick="adminProductCat()">Cancel</button>';

    document.getElementById("results_dyn").innerHTML = elmtxt;

}
function PriceCatInsert() {
    document.getElementById("results_dyn").innerHTML = '';
    let elmtxt =

        '<label for="">New product category </label>' +
        '<br>' +
        '<input type="text" id="PrdCatDescription" value="">' +
        '<br>' +
        '<br>' +
        '<button class="btn btn-success" onclick="ProdcatSave(1)">Save</button>' +
        '<button class="btn btn-danger" onclick="adminProductCat()">Cancel</button>';

    document.getElementById("results_dyn").innerHTML = elmtxt;

}
function ProdCatDelete(ProductsCategoryId) {
    if (confirm("Are you sure to delete this record??")) {
        let url = BaseUrl() + 'index.php/Productscategory_ctl/productscategory/ProductsCategoryId/' + ProductsCategoryId.toString();
        var xhttp = new XMLHttpRequest();
        xhttp.open('DELETE', url, true);
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                adminProductCat();
            }
        };
        xhttp.send();
    }
}

function ProdcatSave(mtdflag) {
    let url = BaseUrl() + 'index.php/Productscategory_ctl/productscategory';

    var data2 = {};
    if (mtdflag == 2)
        data2.ProductsCategoryId = parseInt(document.getElementById('ProductsCategoryId').value);
    data2.PrdCatDescription = parseFloat(document.getElementById('PrdCatDescription').value);

    var jsonData = JSON.stringify(data2);
    var xhttp = new XMLHttpRequest();
    if (mtdflag == 2)
        xhttp.open('PUT', url, true);
    else
        xhttp.open('POST', url, true);
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 201) {
            adminProductCat();
        }
    };
    //xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhttp.send(jsonData);
}


//End of Product category Functions
// Price category functions

function PriceCatShow(jsonData) {
    var elmtxt = '<button onclick=" PriceCatInsert() ">Add new</button> <br>' +
        '<table id="BaseShowTbl" class="table table-hover table-bordered table ">' +
        '<tr class="info">' +
        '<th>Price Category ID</th><th>Perecent</th><th>Edit</th><th>Delete</th>';
    for (x in jsonData) {
        elmtxt +=
            '<tr><td>' +
            jsonData[x].PriceCategoryId +
            '</td><td> ' +
            jsonData[x].PriceCatPerecent +
            '</td>' +
            '<td> <a href="javascript:PriceCatEdit(' + jsonData[x].PriceCategoryId + ',' + jsonData[x].PriceCatPerecent + ');"> <button class="btn btn-primary"><span class="glyphicon glyphicon-edit"></button></a></td>' +
            '<td> <a href="javascript:PriceCatDelete(' + jsonData[x].PriceCategoryId + ');"> <button class="btn btn-primary"><span class="glyphicon glyphicon-remove"></button></a></td>' +
            '</tr>';
    }
    elmtxt += '</table>';
    document.getElementById("results_dyn").innerHTML = elmtxt;
}

function PriceCatEdit(PriceCategoryId, PriceCatPerecent) {
    document.getElementById("results_dyn").innerHTML = '';
    let elmtxt =

        '<label for="">Price category Id</label>' +
        '<br>' +
        '<input type="text" id="PriceCategoryId" value="' + PriceCategoryId + '" readonly>' +
        '<br>' +
        '<label for="">Perecent</label>' +
        '<br>' +
        '<input type="number" id="PriceCatPerecent" value="' + PriceCatPerecent + '">' +
        '<br>' +
        '<br>' +
        '<button class="btn btn-success" onclick="PricecatSave(2)">Save</button>' +
        '<button class="btn btn-danger" onclick="adminPriceCat()">Cancel</button>';

    document.getElementById("results_dyn").innerHTML = elmtxt;

}
function PriceCatInsert() {
    document.getElementById("results_dyn").innerHTML = '';
    let elmtxt =

        '<label for="">New price category Perecent</label>' +
        '<br>' +
        '<input type="number" id="PriceCatPerecent" value="">' +
        '<br>' +
        '<br>' +
        '<button class="btn btn-success" onclick="PricecatSave(1)">Save</button>' +
        '<button class="btn btn-danger" onclick="adminPriceCat()">Cancel</button>';

    document.getElementById("results_dyn").innerHTML = elmtxt;

}
function PriceCatDelete(PriceCategoryId) {
    let url = BaseUrl() + 'index.php/Pricecategory_ctl/pricecategory/PriceCategoryId/' + PriceCategoryId.toString();
    var xhttp = new XMLHttpRequest();
    xhttp.open('DELETE', url, true);
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            adminPriceCat();
        }
    };
    xhttp.send();

}

function PricecatSave(mtdflag) {
    let url = BaseUrl() + 'index.php/Pricecategory_ctl/pricecategory';

    var data2 = {};
    if (mtdflag == 2)
        data2.PriceCategoryId = parseInt(document.getElementById('PriceCategoryId').value);
    data2.PriceCatPerecent = parseFloat(document.getElementById('PriceCatPerecent').value);

    var jsonData = JSON.stringify(data2);
    var xhttp = new XMLHttpRequest();
    if (mtdflag == 2)
        xhttp.open('PUT', url, true);
    else
        xhttp.open('POST', url, true);
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 201) {
            adminPriceCat();
        }
    };
    //xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhttp.send(jsonData);






}
// End of Price category functions
function GetProducts() {
    //   var baseurl = 'onlinetoy.azurewebsites.net/';
    var geturl = BaseUrl() + 'index.php/Products_ctl/products3';
    var imgurl = BaseUrl() + '/images/';
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', geturl, true);
    var jsonData = '';
    var data = '';
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            jsonData = JSON.parse(xhttp.responseText);
            for (x in jsonData) {
                data +=
                    '<figure class="snip1583">' +
                    '<img src="' + imgurl + jsonData[x].ProductPicture + '" alt="sample68" height="200" width="200"/>' +
                    '<div class="icons">' +
                    ' <a href="javascript:addtcocart(' + jsonData[x].ProductsId + ', ' + jsonData[x].ProdFinalPrice + ');">' +
                    ' <i class="ion-android-cart"></i>' +
                    '</a>' +
                    ' <a>' +
                    '  <i class="ion-android-list"></i>' +
                    ' </a>' +
                    '</div>' +
                    '<figcaption>' +
                    '<h3>' + jsonData[x].ProductName + '</h3>' +
                    '<div class="price">';
                if (jsonData[x].DiscountPercent == 0) {
                    data +=
                        '€' + jsonData[x].ProdFinalPrice +
                        '  </div>' +
                        ' </figcaption>' +
                        ' </figure>';
                }
                else {

                    data +=
                        '<s>€' + jsonData[x].ProdFinalPrice + '</s>€' + jsonData[x].DiscountPrice +
                        '  </div>' +
                        ' </figcaption>' +
                        ' </figure>';
                }
            }
            document.getElementById('products').innerHTML = data;

        }
    };
    xhttp.send();
}
function addtcocart(prdId, prdPrice) {
    // alert('order not added');
    var ordDate = new Date();
    var geturl = BaseUrl() + 'index.php/Orders_ctl/orders';
    var xhttp = new XMLHttpRequest();
    xhttp.open('POST', geturl, true);
    var formData = new FormData();
    formData.append("SystemUsersId", userid());
    formData.append("ProductsId", prdId);
    formData.append("OrdersDate", ordDate);
    formData.append("OrderStatus", 1);
    formData.append("ProductRate", 1);
    formData.append("OrderQuantity", 1);
    formData.append("OrderPrice", prdPrice);
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 201) {
            alert('order added');
        } else {
            alert('order not added');
        }
    };
    xhttp.send(formData);

    //alert(lg_urs_stat);
}


function ProductCatEdit(prdcatId) {
    alert(prdcatId);
}



