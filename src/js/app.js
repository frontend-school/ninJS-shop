window.addEventListener('load', function() {

    document.getElementsByClassName('basket-toggle')[0].addEventListener('click', function () {
        document.getElementsByClassName('basket')[0].classList.toggle('hide');
    });

});