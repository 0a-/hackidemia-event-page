//form width
$(function(){
    var length = 0,inputDefaultWidth, f = $("form");
    f.children("p").each(function(){
        if(length===0){
            length = $(this).outerWidth();
            inputDefaultWidth = $(this).children("input").width();
        }else{
            var l = $(this).outerWidth();
            $(this).children("input").width(inputDefaultWidth-(l-length));
        }
    });
});