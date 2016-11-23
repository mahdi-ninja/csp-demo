jQuery(function($){
    $('h1').css('color', 'red')
        .mouseover(function(){
            $(this).css('position','relative')
                .animate({left: 20, opacity: 0}, 'fast')
                .animate({left: 0, opacity: 1}, 'fast');
        });
})