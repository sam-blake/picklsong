$(document).ready(function() {
    //when you click on a playlist in the dropdown menu
    $('.playlist').click(function() {
        var playlist = $(this);
        var id = $(this).data('playlistid');
        //setting playlist_song div to the clicked playlist's name and delete button. setting data attributes to playlist attributes
        var titleTemplate = "<h4 class='active-playlist' data-id='<%= item.data('playlistid') %>'><%= item.data('name') %></h4><a class='delete-button'><i class='fa fa-minus-circle'></i></a>";
        var titleTemp = _.template(titleTemplate);
        $('#playlist_songs').html(titleTemp({
            item: playlist
        }));

        //when you click on playlist delete button we send an ajax request to playlist_controller destroy method
        $('.delete-button').click(function() {
            var playlist = $('.active-playlist').data('id');
            $.ajax({
                url: "/playlists/" + id,
                type: "DELETE"
            });
        });

        //iterate through all of the playlist songs and append the title and thumbnail for each via append. set data-song-attributes to song attributes
        var songData = $(this).data('songs');
        for (var i = 0; i < songData.length; i++) {
            var templateString = "<div id='track_<%= track %>' class='song' data-track='<%= track %>' data-video-id='<%= item.video_id %>' data-embed-url='<%= item.embed_url %>' data-title='<%= item.title %>'><div id='pl-song-thumb'><img src='<%=item.thumbnail%>'></div><div id='pl-song-title' class='desc truncate line-clamp'>" + songData[i].title + "</div></div>";
            var template = _.template(templateString);
            $('#playlist_songs').append(template({
                item: songData[i], track: i+1
            }));
        }

        //when the song inside of the playlist is clicked it sets the active-song-title and video-id. Then is passed to playClickedSong
        $('.song').click(function() {
            var track = $(this).data('track');
            var vidTitle = $(this).data('title');
            var clickedSongId = $(this).data('video-id');
            $('#active-song-title').attr('data-track', track);
            $('#active-song-title').html(vidTitle);
            playClickedSong(clickedSongId);
            //changes video player to clicked song's video
            function playClickedSong(clickedSongId) {
                player.loadVideoById(clickedSongId);
            }
        });
    });
});
