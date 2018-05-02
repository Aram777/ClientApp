let system_usrId = 0;
let system_usrname = '';
let user_has_order = 0;
let isAdmin = 1;
function openadminNav() {
    document.getElementById("bgdiv").style.display = "none";
    document.getElementById("adminNav").style.width = "100%";
    adminProduct();
}

function closeadminNav() {
    document.getElementById("bgdiv").style.display = "block";

    document.getElementById("adminNav").style.width = "0%";
}
function openNav() {
    if (user_has_order > 0) {

        document.getElementById("bgdiv").style.display = "none";
        document.getElementById("myNav").style.width = "100%";
        adminShoppingCart();
    }

}

function closeNav() {
    document.getElementById("bgdiv").style.display = "block";
    document.getElementById("myNav").style.width = "0%";
}

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
function seeallproduct() {
    document.getElementById("forchangesection").style.display = "none";
    document.getElementById("newproductsection").style.display = "block";
    GetProducts(1);
}
function BaseUrl() {
    //return 'https://onlinetoy.azurewebsites.net/';
    //return 'http://localhost/OnlineShoppingProject/';
    return 'https://www.students.oamk.fi/~t7abar00/';
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
        showDataJsn('Orders_ctl', 'userorders', 'SystemUsersId', userid(), ShoppingcartShow);
    }
}
function adminProduct() {
    showDataJsn('Products_ctl', 'products', null, null, ProductShow);
}
function adminPriceCat() {
    showDataJsn('Pricecategory_ctl', 'pricecategory', null, null, PriceCatShow);
}
function adminProductCat() {
    showDataJsn('Productscategory_ctl', 'productscategory', null, null, ProdCatShow);

}
function adminDiscount() {
    showDataJsn('Discounts_ctl', 'discounts', null, null, DiscountShow);

}

//end of Admin Functions
//Discount functions
function DiscountShow(jsonData) {
    var enbBut = '';
    var elmtxt = '<button onclick=" PriceCatInsert() ">Add new</button> <br>' +
        '<table " >' +
        '<tr><td>' +
        '<table style=" table-layout: fixed;" id="BaseShowTbl" class="table table-hover table-bordered table-striped " >' +
        '<tr class="info">' +
        '<th>Discount ID</th><th>Product name</th>' +
        '<th>Start Date</th>' +
        '<th>End Date</th>' +
        '<th>Percent</th>' +
        '<th>Edit</th><th>Delete</th>';
    for (x in jsonData) {
        //        enbBut = (jsonData[x].Chkuse > 0) ? 'disabled title="This Id is in use"' : 'enabled';
        elmtxt +=
            '<tr><td>' +
            jsonData[x].DiscountsId +
            '</td><td> ' +
            jsonData[x].ProductName +
            '</td><td> ' +
            jsonData[x].DiscountStartDate +
            '</td><td> ' +
            jsonData[x].DiscountEndDate +
            '</td><td> ' +

            jsonData[x].DiscountPercent +
            '</td>' +

            '<td> <a href="javascript:DiscountEdit(' + jsonData[x].DiscountsId + '");"> <button class="btn btn-primary" ' +
            '><span class="glyphicon glyphicson-edit"></button></a></td>' +
            '<td> <a href="javascript:DiscountDelete(' + jsonData[x].DiscountsId + ');"> <button class="btn btn-primary" ' +

            '><span class="glyphicon glyphicon-remove"></button></a></td>' +
            '</tr>';
    }
    elmtxt += '</table></td> </tr></table>';
    document.getElementById("adminpagedv").innerHTML = elmtxt;
}

//end of discount functions
//Products function
function SearchFunction() {
    var input, filter, tbl, i;
    tbl = document.getElementById("BaseShowTbl");
    iRow = tbl.rows.length;
    input = document.getElementById("SearchInput");
    filter = input.value.toUpperCase();


    for (i = 1; i < iRow; i++) {
        a = tbl.rows[i].cells[1];

        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            tbl.rows[i].style.display = "";
        } else {
            tbl.rows[i].style.display = "none";

        }
    }
}
function ProductShow(jsonData) {
    var elmtxt = '<button onclick=" ProductInsert() ">Add new</button> <br>' +
        '<input type="text" class"SearchInput" id="SearchInput" onkeyup="SearchFunction()" placeholder="Search for product names.." title="Type in a name of product">' +
        '<table id="BaseShowTbl" class="table table-hover table-bordered table table-striped">' +
        '<tr class="info">' +
        '<th>Products ID</th>' +
        '<th>Product Name</th> ' +
        '<th>Quantity</th> ' +
        '<th>Order Point</th> ' +
        '<th>Category</th> ' +
        '<th>Status</th> ' +
        '<th>Price</th> ' +
        '<th>Disscounted Price</th> ' +
        '<th>Edit</th><th>Delete</th>';
    for (x in jsonData) {
        elmtxt +=
            '<tr><td>' +
            jsonData[x].ProductsId +
            '</td><td> ' +
            jsonData[x].ProductName +
            '</td><td> ' +
            jsonData[x].ProductQuantity +
            '</td><td> ' +
            jsonData[x].ProductOrderPoint +
            '</td><td> ' +
            jsonData[x].PrdCatDescription +
            '</td><td> ' +
            jsonData[x].ProductStatus +
            '</td><td> ' +
            jsonData[x].ProdFinalPrice +
            '</td><td> ' +
            jsonData[x].DiscountPrice +
            '</td>' +
            '<td> <a href="javascript:PriceCatEdit(' + jsonData[x].PriceCategoryId + ');"> <button class="btn btn-primary"><span class="glyphicon glyphicon-edit"></button></a></td>' +
            '<td> <a href="javascript:PriceCatDelete(' + jsonData[x].PriceCategoryId + ');"> <button class="btn btn-primary"><span class="glyphicon glyphicon-remove"></button></a></td>' +
            '</tr>';
    }
    elmtxt += '</table>';
    document.getElementById("adminpagedv").innerHTML = elmtxt;
}

//end of products function
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
    document.getElementById("adminpagedv").innerHTML = elmtxt;
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

        '<table id="BaseShowTbl" class="table table-hover table-bordered table-striped ">' +
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
    document.getElementById("adminpagedv").innerHTML = elmtxt;
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
function GetProducts(flgstat) {
    if (flgstat == 0)
        var geturl = BaseUrl() + 'index.php/Products_ctl/products3';
    else
        var geturl = BaseUrl() + 'index.php/Products_ctl/products';

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
            if (flgstat == 0)
                document.getElementById('products').innerHTML = data;
            else
                document.getElementById('productsallshow').innerHTML = data;


        }
    };
    xhttp.send();
}
function addtcocart(ProductsId, UserId) {

    // alert('order not added');
    if (system_usrId > 0) {

        var geturl = BaseUrl() + 'index.php/Orders_ctl/orderscart';
        var orderdata = {};
        orderdata.ProductsId = parseInt(ProductsId);
        orderdata.SystemUsersId = system_usrId;

        var jsonData = JSON.stringify(orderdata);
        var xhttp = new XMLHttpRequest();
        xhttp.open('POST', geturl, true);
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 201) {
                alert('Product added to your cart');
                user_has_order = 1;
                setnavstat(0);

            }
        };
        xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhttp.send(jsonData);
    }
    else {
        alert('Pleas login / register First');
    }
}
//Shopping cart
function calcprice(itmprc, itmcounter) {
    let quaid = "Itemqua_" + itmcounter;
    let prodprcid = "Productsprice_" + itmcounter;
    let oldprc = document.getElementById(prodprcid).innerHTML;
    let totprc = document.getElementById("Cartsubtotal").innerHTML;

    let itemqua = document.getElementById(quaid).value * itmprc;
    document.getElementById(prodprcid).innerHTML = itemqua;
    document.getElementById("Cartsubtotal").innerHTML = (totprc - oldprc) + itemqua;

    //document.getElementById(prodprcid).innerHTML*itmprc;
}
function deletecart(orderid) {
    if (confirm("Are you sure to delete this order??")) {
        let url = BaseUrl() + 'index.php/Orders_ctl/ordersdel/OrdersId/' + orderid.toString();
        var xhttp = new XMLHttpRequest();
        xhttp.open('GET', url, true);
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                adminShoppingCart();
            }
        };
        //  xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        //        xhttp.withCredentials = true;
        xhttp.send();
    }

}
function UpdateOrder() {
    if (confirm("Are you sure for checkout?")) {

        var url = BaseUrl() + 'index.php/Orders_ctl/ordersupd?SystemUsersId=' + system_usrId.toString();
        var xhttp = new XMLHttpRequest();
        xhttp.open('GET', url, true);
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 201) {
                user_has_order = 0;
                closeNav();
                setnavstat(0);

            }
        };

        xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhttp.send();
    }

}
function ShoppingcartShow(jsonData) {
    var imgurl = BaseUrl() + '/images/';
    var counter = 0;
    var totprc = 0
    var data = '';


    for (x in jsonData) {
        counter++;
        totprc += jsonData[x].OrderPrice * jsonData[x].OrderQuantity;
        data +=

            '<div class="Item">' +
            '<div class="Itemimage">' +
            '<img src="' + imgurl + jsonData[x].ProductPicture + '" height="100" width="100">' +
            '</div>' +
            '<div class="Itemdescription">' +
            '<div class="Itemname">' + jsonData[x].ProductName + '</div>' +
            '<p class="Itemdetails">' + jsonData[x].ProductDesc + '</p>' +
            '</div>' +
            '<div  class="Itemprice">' + jsonData[x].OrderPrice + '</div>' +
            '<div class="Itemquantity">' +
            '<input id="Itemqua_' + counter + '" type="number"  value="' + jsonData[x].OrderQuantity + '" min="1" oninput="calcprice(' + jsonData[x].OrderPrice + ',' + counter + ')">' +
            '</div>' +
            '<div class="Itemremove">' +
            '<button class="Removeitem" onclick="deletecart(' + jsonData[x].OrdersId + ')">' +
            'Remove' +
            '</button>' +
            '</div>' +
            '<div id="Productsprice_' + counter + '" class="Productsprice">' + jsonData[x].OrderPrice * jsonData[x].OrderQuantity + '</div>' +
            '</div>';

    }
    document.getElementById("customershopcart").innerHTML = data;
    document.getElementById("Cartsubtotal").innerHTML = totprc;

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
            isAdmin = jsonResponse["isAdmin"];
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
            isAdmin = 1;
            setnavstat(0);
        }
    };

    xhttp.send();
}

function setnavstat(flgfirst) {
    if (flgfirst == 1) {
        system_usrId = 0;
        system_usrname = '';
        user_has_order = 0;
        isAdmin = 1;

    }
    if (system_usrId > 0) {
        if (isAdmin == 0) {
            document.getElementById("navbarDropdown").style.display = "block";

        }
        else {
            document.getElementById("navbarDropdown").style.display = "none";

        }
        document.getElementById("Login").style.display = "none";
        document.getElementById("LoginB").style.display = "none";
        document.getElementById("RegisterB").innerText = "Logout";
        document.getElementById('hiusrname').innerText = 'Hi ' + system_usrname;
        if (user_has_order == 0) {

            document.getElementById('shopcart').style.color = "black";
            document.getElementById('shopcart').disabled = true;

        }
        else {
            document.getElementById('shopcart').style.color = "#F18000";
            document.getElementById('shopcart').disabled = false;;


        }
    }
    else {
        document.getElementById("forchangesection").style.display = "block";
        document.getElementById("newproductsection").style.display = "none";
    
        document.getElementById("navbarDropdown").style.display = "none";
        document.getElementById("LoginB").style.display = "block";
        document.getElementById("RegisterB").innerText = "Register";
        document.getElementById('hiusrname').innerText = '';
        document.getElementById('shopcart').disabled = true;
        document.getElementById('shopcart').style.color = "black";
        if (flgfirst == 1)
            GetProducts(0);
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




