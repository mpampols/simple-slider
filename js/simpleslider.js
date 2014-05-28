;(function($) {

    "use strict";

    $.fn.simpleSlider = function(o) {

        var options = {
            transition    : "slow", // Type of transition between slides
            firstActive   : 1,      // Set the first slide to be active
            order         : "asc"   // Set the slider ordering
        };

        var selector      = this.selector; // Current slider selector

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
        };

        var findSliders = function(slider_selector) {
            return $(slider_selector).children();
        };

        var orderSliders = function() {
            $.each(sliders, function(key, value) {
               $(this).attr("data-imagenum", key);
            });
        };

        /**
         * Adds controls for the slider right after them
         *
         * @param num_sliders number of sliders found
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

        // set a default active slider
        var setDefaultActiveSlider = function() {
            var active_slider = options.firstActive - 1;
            showOnlySlider(active_slider);
        };

        // change slider function
        var changeSlide = function() {
            var selected_slider = this.dataset.slidernum;
            var controls = $("#slider-controls").find("a");
            showOnlySlider(this.dataset.slidernum);
        };

        // hides all sliders but numslider
        var showOnlySlider = function(numslider) {
            $("#slider-controls").find("a[data-slidernum=" + numslider + "]").parent().addClass("selected");
            $(sliders).each(function(key, value) {
                if ($(this).data('imagenum') == numslider) {
                    $(this).fadeIn("slow");
                } else {
                    $(this).hide();
                    $("#slider-controls").find("a[data-slidernum=" + key + "]").parent().removeClass("selected");
                }
            });
        }

        init();

    };

})(jQuery);
