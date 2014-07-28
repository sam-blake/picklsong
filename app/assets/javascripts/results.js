$(document).on('page:change', function() {
    $('.vid-item').click(function() {
        console.log('clicked');
        var vidAttributes = $(this).data('attributes');
        // POST TO SONGS CONTROLLER#create
    });
});

$(document).on('page:change', function() {
    $(".arrow-right").bind("click", function(event) {
        event.preventDefault();
        $(".vid-list-container").stop().animate({
            scrollLeft: "+=336"
        }, 750);
    });
    $(".arrow-left").bind("click", function(event) {
        event.preventDefault();
        $(".vid-list-container").stop().animate({
            scrollLeft: "-=336"
        }, 750);
    });
});