////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// jQuery
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var $ = jQuery.noConflict();

$(document).ready(function($) {
        
    // Property page tabs
    $('.tabs .tab-links a').on('click', function(e)  {
        var currentAttrValue = $(this).attr('href');
        var priceSlider = $('.jslider').detach();
        $('.tabs ' + currentAttrValue).slideDown(400).siblings().slideUp(400);
        $(this).parent('li').addClass('active').siblings().removeClass('active');
        
        priceSlider.appendTo($('.tabs ' + currentAttrValue).find('.price-range-wrapper'));
        priceSlider = null;
        e.preventDefault();
    });

    //  Price slider search page 
    if( $(".price-input").length > 0) {
        $(".price-input").each(function() {
            var vSLider = $(this).slider({
                from: 0,
                to: 9000000,
                smooth: true, 
                round: 0,       
                dimension: ',00&nbsp;$',
            }); 
        });
    }

    // Initialize  Owl Carousel block
    $("#owl-demo").owlCarousel({
        items : 4,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            1024:{
                items:3
            }
        }
    });
    $("#owl-demo-2").owlCarousel({
        items : 3,
        pagination: true,
        nav: true,
        slideSpeed: 700,
        itemsDesktop: [1024,3],
        itemsDesktop: [480,1],
        loop:true,
        navText: [
        "<i class='fa fa-chevron-left'></i>",
        "<i class='fa fa-chevron-right'></i>"
        ]
    });
    $("#owl-demo-3").owlCarousel({
        items : 1,
        pagination:true,
        nav:true,
        autoHeight:true,
        itemsCustom: [1600, 1],
        slideSpeed:700,
        loop:true,
        navText: [
        "<i class='fa fa-chevron-left'></i>",
        "<i class='fa fa-chevron-right'></i>"
        ]
    });

    //  iCheck
    if ($('.switch').length > 0) {
        $('.switch input').iCheck();
    }
    if ($('.radio').length > 0) {
        $('input').iCheck();
    }
    if ($('.checkbox').length > 0) {
        $('input:not(.no-icheck)').iCheck();
    }

    $('.wrapper').live('click', function (e) {
        if ($('.secondary').hasClass("open")) { 
            $('.drop-left, .primary>ul').removeClass("hidden");
        }
    });
 
    // Set Bookmark button attribute
    $( ".bookmark" ).each(function(index) {
        $(this).on("click", function() {
            if ($(this).data('bookmark-state') == 'empty') {
                $(this).removeClass('bookmark-added');
            } else if ($(this).data('bookmark-state') == 'added') {
                $(this).addClass('bookmark-added');
            }
            var is_choose = 0;
            var property_id = $(this).data('propertyid');
            if ($(this).data('bookmark-state') == 'empty') {
                $(this).data('bookmark-state', 'added');
                $(this).addClass('bookmark-added');
                is_choose = 1;
            } else if ($(this).data('bookmark-state') == 'added') {
                $(this).data('bookmark-state', 'empty');
                $(this).removeClass('bookmark-added');
                is_choose = 0;
            }
            var data = { action: 'add_user_bookmark', property_id : property_id, is_choose : is_choose };
            return false;
        });
    });
    
    // Set Compare button attribute
    $( ".compare" ).each(function(index) {
        $(this).on("click", function(){
            if ($(this).data('compare-state') == 'empty') {
                $(this).removeClass('compare-added');
            } else if ($(this).data('compare-state') == 'added') {
                $(this).addClass('compare-added');
            }
            var is_choose = 0;
            var property_id = $(this).data('propertyid');
            if ($(this).data('compare-state') == 'empty') {
                $(this).data('compare-state', 'added');
                $(this).addClass('compare-added');
                is_choose = 1;
            } else if ($(this).data('compare-state') == 'added') {
                $(this).data('compare-state', 'empty');
                $(this).removeClass('compare-added');
                is_choose = 0;
            }
            var data = { action: 'add_user_bookmark', property_id : property_id, is_choose : is_choose };
            return false;
        });
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// On RESIZE
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(window).on('resize', function(){
    equalHeight('.equal-height');
    // Set Owl Carousel width on resize window
    $('.carousel-full-width').css('width', $(window).width());  
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// On LOAD
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(window).load(function(){

    //  Show counter after appear
    var $number = $('.number');
    var $grid;
    
    if ($number.length > 0 ) {
        $number.waypoint(function() {
            initCounter();
        }, { offset: '100%' });
    }

    //Masonry grid init
    function triggerMasonry() {
        if ( !$grid ) { return; }
        $grid.masonry({
            itemSelector: '.grid-item'
        });
    }

    $grid = $('.grid');
    triggerMasonry();
    
    // Owl Carousel
    // Disable click when dragging
    function disableClick(){
        $('.owl-carousel .property').css('pointer-events', 'none');
    }
    // Enable click after dragging
    function enableClick(){
        $('.owl-carousel .property').css('pointer-events', 'auto');
    }

    if ($('.owl-carousel').length > 0) {
        if ($('.carousel-full-width').length > 0) {
            setCarouselWidth();
        }
        $(".testimonials-carousel").owlCarousel({
            items: 1,
            responsiveBaseWidth: ".testimonial",
            pagination: true,
            nav:true,
            slideSpeed : 700,
            loop:true,
            navText: [
            "<i class='fa fa-chevron-left'></i>",
            "<i class='fa fa-chevron-right'></i>"
            ],
        });
    }
    function sliderLoaded(){
        $('#slider').removeClass('loading');
        document.getElementById("loading-icon").remove();
        centerSlider();
    }
    function animateDescription(){
        var $description = $(".slide .overlay .info");
        $description.addClass('animate-description-out');
        $description.removeClass('animate-description-in');
        setTimeout(function() {
            $description.addClass('animate-description-in');
        }, 400);
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//  Equal heights
function equalHeight(container) {
    var currentTallest = 0,
    currentRowStart = 0,
    rowDivs = new Array(),
    $el,
    topPosition = 0;
    $(container).each(function() {

        $el = $(this);
        $($el).height('auto');
        topPostion = $el.position().top;

        if (currentRowStart != topPostion) {
            for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                rowDivs[currentDiv].height(currentTallest);
            }
            rowDivs.length = 0; // empty the array
            currentRowStart = topPostion;
            currentTallest = $el.height();
            rowDivs.push($el);
        } else {
            rowDivs.push($el);
            currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
        }
        for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
            rowDivs[currentDiv].height(currentTallest);
        }
    });
}

//funny numbers counter
function initCounter(){
    $('.number').countTo({
        speed: 3000,
        refreshInterval: 50,
        onComplete: function (value) {
            window.initCounter=function(){return false;};
        }
    });
}

// Set Owl Carousel width
function setCarouselWidth(){
    $('.carousel-full-width').css('width', $(window).width());
}