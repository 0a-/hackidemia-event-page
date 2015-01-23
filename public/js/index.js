$(function(){
    var $body = $("body"),$window = $(window),bh = undefined, wh = $window.height(),
    regions = [];
    function region(fn,px){
        this.fn = fn;
        this.entered = false;
        this.px = px;
        this.enterSt = px-wh;
    }
    region.prototype.trigger = function(){
        if(!this.entered){
            this.entered = true;
            this.fn();
        }
    };
    function captureRegions(name){
        var n = regions.length, a = 0;
        //single
        $(".tobe"+name+".single").each(function(){
            var element = $(this);
            regions[n] = new region(function(){
                element.addClass(name);
            },$(".trigger"+name+".single:eq("+a+")").offset().top);
            n++;
            a++;
        });
        a = 0;
        //groups
        $(".tobe"+name+"Group").each(function(){
            var element = $(this);
            regions[n] = new region(function(){
                var children = element.find(".tobe"+name);
                var b = 0;
                var Interval;
                var Interval = setInterval(function(){
                    $(children[b]).addClass(name);
                    b++;
                    if(b===children.length)
                        clearInterval(Interval);
                },200);
            },$(".trigger"+name+"Group:eq("+a+")").offset().top);
            n++;
            a++;
        });
    }
    function init(){
        $(".detailsContainer").height($(".archyEvent").outerHeight()-$(".date").outerHeight());
        $window.load(function(){
            bh = $body.height();
            //just in case the first $window.height is inaccurate
            wh = $window.height();
            $(".backgroundThatMoves").height(bh+(bh-wh)*0.3);
        });
    }
    function domEffects(){
        $(".joinTheTeam h4").hover(function(){
            $(".joinTheTeamButtonBackground").css("height","100%");
        },function(){
             $(".joinTheTeamButtonBackground").css("height","0%");
        });
        captureRegions("ScaledUp");
        captureRegions("SprangOut");
        regions.sort(function(a,b){return(a.px - b.px)});
        var n = 0, passedAllRegions = false;
        return function domScrolledEffects(st){
            if(!passedAllRegions){
                if(st>regions[n].enterSt){
                    regions[n].trigger();
                    n++;
                    if(n===regions.length){
                        passedAllRegions = true;
                    }
                    //return true to call itself again
                    return true;
                }
            }
        }
    }
    init();
    var domScrolledEffects = domEffects();
    $(document).on("scroll",function(){
        var st = $(document).scrollTop();
        $(".background_that_fades").css("opacity",1-0.8*(st/500));
        $(".backgroundThatMoves").css("margin-top",st*-0.3);
        var passed = domScrolledEffects(st);
        while(passed){
            //case domScrolledEffects again just
            //in case user scrolls way to fast.
            passed =domScrolledEffects(st);
        }
    });

})