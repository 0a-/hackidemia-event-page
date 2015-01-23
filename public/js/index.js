$(function(){
    var $body = $("body"), $window = $(window);
    var bh, wh, $window_loaded = false, 
    regions = [];
    function region(fn,px){
        this.fn = fn;
        this.entered = false;
        this.px = px;
    }
    region.prototype.obtainEnterSt = function(){
        this.enterSt = this.px - wh;
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
        bh = $body.height();
        wh = $window.height();
        for(key in regions){
            regions[key].obtainEnterSt();
        }
        $(".backgroundThatMoves").height(bh+(bh-wh)*0.3);
    }
    function domEffects(){
        $(".robotImage").load(function(){
            $(this).addClass("ScaledUp");
        }).each(function(){
            if(this.complete){
                $(this).trigger('load');
            }
        });
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
    var domScrolledEffects = domEffects();
    $window.load(function(){
        $window_loaded = true;
        $(".spinner").addClass("hidden");
        $("html,body").css("overflow","scroll");
        setTimeout(function(){
            $(".quoteAtHead").addClass("SprangOut");
        },400);
        init();
    }).resize(init);
    $(document).on("scroll",function(){
        var st = $(document).scrollTop();
        $(".background_that_fades").css("opacity",1-0.8*(st/500));
        $(".backgroundThatMoves").css("margin-top",st*-0.3);
        if($window_loaded){
            var passed = domScrolledEffects(st);
            while(passed){
                //case domScrolledEffects again just
                //in case user scrolls way to fast.
                passed =domScrolledEffects(st);
            }
        }
    });

})