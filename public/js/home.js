$(function(){
    var imageWidth;
    function setImageWidth(){
      var ww = $(window).width(), n = 3; imageWidth = 301;
      if(ww>450){
      while(imageWidth>300){
         imageWidth = ww/n;
         n++;
        }
      while(imageWidth<250 && n>1){
         imageWidth = ww/n;
         n--;
      }
      }else{
        imageWidth = ww;
      }
    }
    function alignImage(){
      $(".person, .imgWrap").width(imageWidth);
      $(".imgWrap img").each(function(){
           var w = $(this).width();
           $(this).css("margin-left",(-(w-imageWidth)/2)+"px");
        });
    }
    var t;
    $(window).resize(function(){
        clearTimeout(t);
        t = setTimeout(function(){
             setImageWidth();
             alignImage();
        },200);
    });
    $(window).load(function(){
        setImageWidth();
        alignImage();
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
