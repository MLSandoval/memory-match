$(function(){
    function autoslide(){
        if(!$('.slider .active').is(':last-child')){
            $('.slider .active').delay(2000).fadeOut(2000, function(){
                $(this).removeClass('active').next().addClass('active').fadeIn();
                autoslide();
            })
        }else{
            $('.slider .active').removeClass('active').delay(2000).fadeOut(2000, function(){
                $('.slider .image').eq(0).addClass('active').fadeOut(2000);
                autoslide();
            })
        }
    }
    autoslide();
})