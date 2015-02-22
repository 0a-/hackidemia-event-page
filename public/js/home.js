$(window).load(function(){
    //align image
    $(".imgWrap img").each(function(){
       var w = $(this).width();
       $(this).css("margin-left",(-(w-300)/2)+"px");
    });
    $(".social").each(function(){
        var eles = $(this).find(".social_block");
        eles.css("width",1/eles.length*100+"%");
    }); 
});
