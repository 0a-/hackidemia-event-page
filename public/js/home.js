$(function(){
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
    function scrollMenu(btn,DOM){
        btn.click(function(){
            $("html,body").animate({scrollTop: DOM.offset().top});
        }); 
    }
    scrollMenu($(".toAbout"),$(".aboutHacKIDemia"));
    scrollMenu($(".toWorkshops"),$(".workshops"));
});
