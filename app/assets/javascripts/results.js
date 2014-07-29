$(document).on('page:change', function() {
    $('.vid-item').click(function() {
        console.log('clicked');
        var vidAttributes = $(this).data('attributes');
        // POST TO SONGS CONTROLLER#create
    });
});