var PS = require


function getProducts () {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'API/data/products.json', false);
    xhr.send();

    if (xhr.status != 200) {
        alert('Ошибка ' + xhr.status + ': ' + xhr.statusText);
    } else {
        console.log(xhr.responseText);
    }
}

getProducts();
