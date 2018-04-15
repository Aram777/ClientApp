function GetProducts() {
    var baseurl = 'http://localhost/OnlineShoppingProject/';
    var geturl = baseurl + 'index.php/Products_ctl/products';
    var imgurl = baseurl + '/images/';
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
                    ' <a href="javascript:addtcocart(' + jsonData[x].ProductsId + ');">' +
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
function addtcocart(prdId) {
    alert(prdId);
}
