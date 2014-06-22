;(function($) {

    "use strict";

    $.fn.simpleSlider = function(o) {

        var options = {
            transitionSpeed  : "slow", // type of transition between slides
            firstActive      : 1,      // set the first slide to be active
            order            : "asc",  // set the slider ordering ("asc", "desc" or "random")
            autoPlay         : false,  // enable auto-play on slides
            autoPlayDelay    : 4500   // time in miliseconds to wait til load the next slide
        };

        var selector      = this.selector; // current slider selector

        var sliders       = null;
        var num_sliders   = 0;
        var slider_object = null;

        var settings = $.extend({}, options, o);

        var init = function() {
            slider_object = $(selector);
            sliders = findSliders(slider_object);
            
            num_sliders = sliders.length;
            
            addSliderControls();
            orderSliders();
            setDefaultActiveSlider();
            
            if (settings.autoPlay) {
                enableAutoPlay();
            }
        };

        /**
         * finds the image sliders using the selector
         *
         * @param slider_selector
         * @returns {*}
         */
        var findSliders = function(slider_selector) {
            return $(slider_selector).children('.slider-image');
        };

        /**
         * applies the settings.order to slider elements
         */
        var orderSliders = function() {
            switch(settings.order) {
                case "asc":
                    // default, do nothing
                    break;
                case "desc":
                    // reverse sliders order
                    $(slider_object).children("div[data-imagenum]").each(
                        function(key, value) {
                            $(slider_object).prepend(value)
                        }
                    );
                    break;
                case "random":
                    var slider_array = $(sliders).detach();
                    for (var x = (slider_array.length - 1);x > 0; x--) {
                        var y = Math.floor(Math.random() * (x + 1));
                        var temp = slider_array[x];
                        slider_array[x] = slider_array[y];
                        slider_array[y] = temp;
                    }
                    $(slider_array).prependTo($(slider_object));
                    break;
            }

            sliders = findSliders(slider_object);
            $.each(sliders, function(key, value) {
                $(this).attr("data-imagenum", key);
            });
        };

        /**
         * adds controls for the slider right after them
         */
        var addSliderControls = function() {
            var $controls_container = $("<div id=\"slider-controls\"></div>");
            var $controls_ul = $("<ul></ul>");
            var $controls_li = $("<li></li>");
            var $controls_a  = $("<a href=\"#\"></a>");

            $controls_ul.appendTo($controls_container);

            $.each(sliders, function(key, value) {
                var $element = $controls_li.clone().append(
                    $controls_a.clone().attr(
                        "data-slidernum", key
                    )
                );
                $element.appendTo($controls_ul);
            });

            $controls_container.appendTo(slider_object);

            // attach an onclick trigger to slider controls
            $("#slider-controls").find("a").on("click", changeSlide);
        };

        /**
         * set a default active slider
         */
        var setDefaultActiveSlider = function() {
            var active_slider = settings.firstActive - 1;
            showOnlySlider(active_slider);
        };

        /**
         * change slider function
         */
        var changeSlide = function() {
            var selected_slider = this.dataset.slidernum;
            var controls = $("#slider-controls").find("a");
            showOnlySlider(selected_slider);
        };

        /**
         * hides all sliders but numslider
         * @param numslider
         */
        var showOnlySlider = function(numslider) {
            $("#slider-controls").find("a[data-slidernum=" + numslider + "]").parent().addClass("selected");
            $("#slider").find("div[data-imagenum=" + numslider + "]").addClass("selected");
            $(sliders).each(function(key, value) {
                if ($(this).data('imagenum') == numslider) {
                    $(this).fadeIn(settings.transitionSpeed);
                } else {
                    $(this).hide();
                    $("#slider-controls").find("a[data-slidernum=" + key + "]").parent().removeClass("selected");
                    $("#slider").find("div[data-imagenum=" + key + "]").removeClass("selected");
                }
            });
        };

        /**
         * changes to the next slide
         */
        var goToNextSlide = function() {
            var active_slider = $(slider_object).find(".slider-image.selected").data("imagenum");
            var next_slider = ((active_slider + 1) === num_sliders ? 0 : active_slider + 1);
            showOnlySlider(next_slider);
        };

        /**
         * Enables AutoPlay feature
         */
        var enableAutoPlay = function() {
            setInterval(
                goToNextSlide
                , options.autoPlayDelay);
        };

        init();

    };

})(jQuery);
