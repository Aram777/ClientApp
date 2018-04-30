let system_usrId = 0;
let system_usrname = '';
let user_has_order = 0;
let isAdmin=1;
function openModal(number) {
    var modal;
    var btn;
    var span;
    if (number == 1) {
        modal = document.getElementById('Login');
        span = document.getElementById("logclosbut");
        modal.style.display = "block";
        span.onclick = function () {
            modal.style.display = "none";
        }
    } else {
        if (system_usrId > 0) {
            logoutuser();
        }
        else {
            modal = document.getElementById('RegisterModal')
            span = document.getElementById("regclosbut");
            modal.style.display = "block";
            span.onclick = function () {
                modal.style.display = "none";
            }
        }
    }

}

function BaseUrl() {
    //return 'https://onlinetoy.azurewebsites.net/';
    //return 'http://localhost/OnlineShoppingProject/';
    return 'http://www.students.oamk.fi/~t7abar00/';
}
function userid() {
    return system_usrId;
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
function adminShoppingCart() {
    if (user_has_order > 0) {

        document.getElementById("results_dyn").innerHTML = "";
        document.getElementById("AdminPageHeader").innerHTML = "Shopping Cart";
        document.getElementById("AdminPageContent").style.width = "100%";
        document.getElementById("AdminPageContent").style.height = "100%";
        modal = document.getElementById('AdminPage');

        modal.classList.add("overlay");

        span = document.getElementById('adminclose');
        modal.style.display = "block";
        span.onclick = function () {
            modal.style.display = "none";
        }
        showDataJsn('Orders_ctl', 'userorders', 'SystemUsersId', userid(), ShoppingcartShow);
    }
}

function adminPriceCat() {
    document.getElementById("results_dyn").innerHTML = "";
    document.getElementById("AdminPageHeader").innerHTML = "Price Category";
    document.getElementById("AdminPageContent").style.width = "50%";
    document.getElementById("AdminPageContent").style.height = "60%";
    modal = document.getElementById('AdminPage');
    modal.classList.add("overlay");

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

            '<td> <a href="javascript:ProdCatEdit(' + jsonData[x].ProductsCategoryId + ',"' + jsonData[x].PrdCatDescription + '");"> <button class="btn btn-primary" ' +
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
        let url = BaseUrl() + 'index.php/Productscategory_ctl/productscategorydel/ProductsCategoryId/' + ProductsCategoryId.toString();
        var xhttp = new XMLHttpRequest();
        xhttp.open('GET', url, true);
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                alert(xhttp.responseText);
                adminProductCat();
            }
        };
        //  xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        //        xhttp.withCredentials = true;
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
                    ' <a title="Add to cart" href="javascript:addtcocart(' + jsonData[x].ProductsId + ',' + userid() + ');">' +
                    ' <i class="ion-android-cart"></i>' +
                    '</a>' +
                    ' <a title="Product Description">' +
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
function addtcocart(ProductsId, UserId) {
    // alert('order not added');
    var geturl = BaseUrl() + 'index.php/Orders_ctl/orderscart';
    var orderdata = {};
    orderdata.ProductsId = parseInt(ProductsId);
    orderdata.SystemUsersId = parseInt(UserId);

    var jsonData = JSON.stringify(orderdata);
    var xhttp = new XMLHttpRequest();
    xhttp.open('POST', geturl, true);
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 201) {
            alert('order already added');
        }
    };
    xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhttp.send(jsonData);
}
//Shopping cart
function ShoppingcartShow(jsonData) {
    var imgurl = BaseUrl() + '/images/';

    var totprc = 0
    var data =
        '<div id="myNav" class="overlay">'
    '<div class="ShoppingCart">' +
        '<div class="Namecolumns">' +
        '<label class="Itemimage">Image</label>' +
        '<label class="Itemdescription">Description of Products</label>' +
        '<label class="Itemprice">Price</label>' +
        '<label class="Itemquantity">Quantity</label>' +
        '<label class="Itemremove">Remove</label>' +
        '<label class="Productsprice">Total</label>' +
        '</div>';


    for (x in jsonData) {
        totprc += jsonData[x].OrderPrice;
        data +=

            '<div class="Item">' +
            '<div class="Itemimage">' +
            '<img src="' + imgurl + jsonData[x].ProductPicture + '" height="200" width="200">' +
            '</div>' +
            '<div class="Itemdescription">' +
            '<div class="Itemname">' + jsonData[x].ProductName + '</div>' +
            '<p class="Itemdetails">' + jsonData[x].ProductDesc + '</p>' +
            '</div>' +
            '<div class="Itemprice">' + jsonData[x].OrderPrice + '</div>' +
            '<div class="Itemquantity">' +
            '<input type="number" value="1" min="1">' +
            '</div>' +
            '<div class="Itemremove">' +
            '<button class="Removeitem" onclick="deletecart(' + jsonData[x].OrdersId + ')">' +
            'Remove' +
            '</button>' +
            '</div>' +
            '<div class="Productsprice">' + jsonData[x].OrderPrice * jsonData[x].OrderQuantity + '</div>' +
            '</div>';

    }
    data +=
        ' <div class="Total">' +
        '<div class="Itemtotal">' +
        '<label>Subtotal</label>' +
        ' <div class="Totalvalue" id="Cartsubtotal"></div>' +
        ' </div>' +
        '<div class="Itemtotal">' +
        '  <label>Tax (5%)</label>' +
        ' <div class="Totalvalue" id="Carttax">3</div>' +
        ' </div>' +
        ' <div class="Itemtotal">' +
        ' <label>Shipping</label>' +
        ' <div class="Totalvalue" id="Cartshipping">10.00</div>' +
        ' </div>' +
        ' <div class="Itemtotal Itemtotal-Total">' +
        ' <label>Grand Total</label>' +
        ' <div class="Totalvalue" id="Carttotal">73</div>' +
        '</div>' +
        ' </div>' +

        '<button class="Checkout">Checkout</button>' +
        ' </div>' +

        ' </div>';

    document.getElementById("results_dyn").innerHTML = data;

}
//End of shopping cart  
function loginuser(usreml, urspass, srcflg) {
    if (srcflg == 0) {
        usname = document.getElementById('inputEmail').value;
        uspass = document.getElementById('inputPassword').value;
    }
    else {
        usname = usreml;
        uspass = urspass;

    }
    let url = BaseUrl() + 'index.php/Login_ctl/login?email=' + usname + '&password=' + uspass;
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', url, true);
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var jsonResponse = JSON.parse(xhttp.responseText);
            system_usrId = parseInt(jsonResponse["userId"]);
            system_usrname = jsonResponse["username"];
            user_has_order = jsonResponse["hasorder"];
            isAdmin= jsonResponse["isAdmin"];
            setnavstat(0);
        }
    };

    xhttp.send();
}
function logoutuser() {
    let url = BaseUrl() + 'index.php/Login_ctl/logout';
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', url, true);
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            system_usrId = 0;
            system_usrname = '';
            user_has_order = 0;
            isAdmin=1;
            setnavstat(0);
        }
    };

    xhttp.send();
}

function setnavstat(flgfirst) {
    if (system_usrId > 0) {
        if(isAdmin==0){
            document.getElementById("navbarDropdown").style.display = "block";
            
        }
        else{
            document.getElementById("navbarDropdown").style.display = "none";

        }
        document.getElementById("Login").style.display = "none";
        document.getElementById("LoginB").style.display = "none";
        document.getElementById("RegisterB").innerText = "Logout";
        document.getElementById('hiusrname').innerText = 'Hi ' + system_usrname;
        if (user_has_order == 0) {

            document.getElementById('shopcart').style.color = "black";
        }
        else {
            document.getElementById('shopcart').style.color = "#F18000";

        }
    }
    else {
        document.getElementById("navbarDropdown").style.display = "none";
        document.getElementById("LoginB").style.display = "block";
        document.getElementById("RegisterB").innerText = "Register";
        document.getElementById('hiusrname').innerText = '';
        document.getElementById('shopcart').style.color = "black";
        if (flgfirst == 1)
            GetProducts();
    }

}
function Registeruser() {
    let url = BaseUrl() + 'index.php/Systemusers_ctl/systemusers';

    var usrdata = {};
    usrdata.UserFirstName = document.getElementById('UserFirstName').value;
    usrdata.UserLastName = document.getElementById('UserLastName').value;
    usrdata.UserEmail = document.getElementById('UserEmail').value;
    usrdata.UserAddress = document.getElementById('UserAddress').value;
    usrdata.UserPass = document.getElementById('UserPass').value;

    var jsonData = JSON.stringify(usrdata);
    var xhttp = new XMLHttpRequest();
    xhttp.open('POST', url, true);
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 201) {
            document.getElementById("RegisterModal").style.display = "none";
            loginuser(usrdata.UserEmail, usrdata.UserPass, 1)
        }
    };
    xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhttp.send(jsonData);

}




