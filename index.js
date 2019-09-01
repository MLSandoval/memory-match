$(function(){
    autoslide();
});

function autoslide() {
    if (!$('.slider .active').is(':last-child')) {
        $('.slider .active').delay(3000).fadeOut(2000, function () {
            $(this).removeClass('active').next().addClass('active').fadeIn();
            autoslide();
            console.log(this);
        })
    } else {
        $('.slider .active').removeClass('active').delay(3000).fadeOut(2000, function () {
            $('.slider .image').eq(0).addClass('active').fadeOut(2000);
            autoslide();
        })
    }
};