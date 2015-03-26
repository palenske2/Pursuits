//$.noConflict();
jQuery(document).ready(function ($) {
    $('a').click(function () {
        $('html, body').animate({
            scrollTop: $('[name="' + $.attr(this, 'href').substr(1) + '"]').offset().top - 120
        }, 500);
        return false;

    });
});