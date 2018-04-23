let usrId = 2;
//var baseurl = 'http://localhost/OnlineShoppingProject/';
function BaseUrl() {
    return 'http://localhost/OnlineShoppingProject/';
}
function userid() {
    return 2;
}
function showDataJsn(ctlName, resName, prmName, prmVal, fncName) {
    let url = 'index.php/' + ctlName + '/' + resName;
    if (!(prmName === undefined || prmName === null)) {
        url += '/' + prmName + '/' + prmVal;
    }
    GetRequestfn(url, fncName);
}

function GetRequestfn(requrl, cFunction) {
    var geturl = BaseUrl() + requrl;
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            jsonData = JSON.parse(xhttp.responseText);
            cFunction(jsonData);
        }
    };
    xhttp.open("GET", geturl, true);
    xhttp.send();
}
function SendDataJsn(ctlName, resName, prmName, prmVal, frmdata, actMtd, fncName) {
    let url = 'index.php/' + ctlName + '/' + resName;
    if (!(prmName === undefined || prmName === null)) {
        url += '/' + prmName + '/' + prmVal;
    }
    PostRequestfn(url, fncName, actMtd);
}
function PostRequestfn(requrl, cFunction) {
    var geturl = BaseUrl() + requrl;
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            jsonData = JSON.parse(xhttp.responseText);
            cFunction(jsonData);
        }
    };
    xhttp.open("GET", geturl, true);
    xhttp.send();
}


// Price category functions
function PriceCatShow(jsonData) {
    var elmtxt = '<table id="PriceCat" border="1">';
    var elmtxt = '<table class="table table-hover table-bordered">' +
        '<tr class="info">' +
        '<th>Price Category ID</th><th>Perecent</th><th>Edit</th><th>Delete</th>';
    for (x in jsonData) {
        elmtxt +=
            '<tr><td>' +
            jsonData[x].PriceCategoryId +
            '</td><td> ' +
            jsonData[x].PriceCatPerecent +
            '</td>' +
            '<td> <a href="#"><button onclick="PriceCatEditData(' + jsonData[x].PriceCategoryId + ')" class="btn btn-primary"><span class="glyphicon glyphicon-edit"></button></a></td>' +
            '<td> <a href="#"><button class="btn btn-primary"><span class="glyphicon glyphicon-remove"></button></a></td>' +
            '</tr>';
    }
    elmtxt += '</table>';
    document.getElementById("results_dyn").innerHTML = elmtxt;
}

function PriceCatEditData(PriceCategoryId) {
    showDataJsn('Pricecategory_ctl', 'pricecategory', 'PriceCategoryId', PriceCategoryId, PriceCatEditForm);
}
function PriceCatEditForm(jsonData) {
    let elmtxt=
    '<form id="PrcCatDataForm">'+
    '<label for="">Price category Id</label>'+
    '<br>'+
    '<input type="text" name="PriceCategoryId" value="'+jsonData[0].PriceCategoryId+'" readonly>'+
    '<br>'+
    '<label for="">Perecent</label>'+
    '<br>'+
    '<input type="number" name="PriceCatPerecent" value="'+jsonData[0].PriceCatPerecent+'">'+
    '<br>'+
    '<br>'+
    '<button class="btn btn-success" onclick="AddUser()">Save</button>'+
    '<button class="btn btn-danger" onclick="AddUser()">Cancel</button>'+
    '</form>';
    document.getElementById("results_dyn").innerHTML = elmtxt;
}
function PriceCatEditSave(){
    var form = document.getElementById('PrcCatDataForm');
    var formData = new FormData(form);
    SendDataJsn('Pricecategory_ctl', 'pricecategory', null, null, formData, 'PUT', fncName) ;

    
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
            document.getElementById('myCarousel').innerHTML = data;

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



