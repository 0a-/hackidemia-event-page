$(window).load(function(){
    //align image
    $(".imgWrap img").each(function(){
       var w = $(this).width();
       $(this).css("margin-left",(-(w-300)/2)+"px");
    });
});
