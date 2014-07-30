$(document).ready(function() {
    $('.playlist').click(function() {
        var songData = $(this).data('songs');
        $('#playlist_songs').empty();
        var playlist = $(this);
        var id = $(this).data('playlistid');
        var titleTemplate = "<h4 class='active-playlist' data-id='<%= item.data('playlistid') %>'><%= item.data('name') %></h4><a class='delete-button'><i class='fa fa-minus-circle'></i></a>";
        var titleTemp = _.template(titleTemplate);
        $('#playlist_songs').append(titleTemp({
            item: playlist
        }));

        $('.delete-button').click(function() {
            var playlist = $('.active-playlist').data('id');
            $.ajax({
                url: "/playlists/" + id,
                type: "DELETE"
            });
        });

        for (var i = 0; i < songData.length; i++) {
            var templateString = "<div class='clearfix'><div id='track_<%= track %>' class='song' data-track='<%= track %>' data-video-id='<%= item.video_id %>' data-embed-url='<%= item.embed_url %>' data-title='<%= item.title %>'><span id='pl-song-thumb'><img src='<%=item.thumbnail%>'></span><h4 id='pl-song-title' class='truncate'><%= item.title %></h4></div></div>";
            var template = _.template(templateString);
            $('#playlist_songs').append(template({
                item: songData[i], track: i+1
            }));
        }
        $('.song').click(function() {
            var track = $(this).data('track');
            console.log("clicked track:" + track);
            $('#active-song-title').attr('data-track', track);
            var vidTitle = $(this).data('title');
            console.log("clicked playlist's song:" + vidTitle);
            $('#active-song-title').html(vidTitle);
            // var embedUrl = $(this).data('embed-url');
            // document.getElementById('vid_frame').src = "//" + embedUrl;
            var clickedSongId = $(this).data('video-id');
            playClickedSong(clickedSongId);

            function playClickedSong(clickedSongId) {
                player.loadVideoById(clickedSongId);
            }
        });
    });
});