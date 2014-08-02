$(document).ready(function() {

//this is where the functions live :)
    function checkIfSongMatches(songId){
      var deletedSongTrack = $('.song[data-id=' + songId + ']').data("track");
      var activeSongTrackStr = $('#active-song-title').attr("data-track");
      return deletedSongTrack === parseInt(activeSongTrackStr, 10);
    }

    function removeSongFromDropdownPlaylist(songId, playlistId){
        var playlist = $('#' + playlistId);
        var songs = $('#' + playlistId).data("songs");
        for (var i = 0; i < songs.length; i++) {
            if (songs[i].id == songId) {
              songs.splice(i, 1);
              playlist.attr('data-songs', JSON.stringify(songs));
            }
        }
    }

    function destroySong(songId, playlistId){
        var songMatches = checkIfSongMatches(songId);
        if (songMatches){
            playNextSong();
        }
        removeSongFromDropdownPlaylist(songId, playlistId);
      $('.song[data-id=' + songId + ']').remove();
    }

    function ajaxDeleteSong(songId, playlistId){
        $.ajax({
            url: "/songs/" + songId,
            type: "DELETE",
            data: {
                id: songId,
                playlist: playlistId
            },
            success: destroySong(songId, playlistId)
        });
    }

    function ajaxDeletePlaylist(){
        var playlistId = $('.active-playlist').data('id');
        $.ajax({
            url: "/playlists/" + playlistId,
            type: "DELETE"
        });
    }

    function ajaxUpdatePlaylistName(){
        var playlistId = $('.active-playlist').data("id");
        $.ajax({
            type: "GET",
            url: "/playlists/" + playlistId + "/edit",
            dataType: "script"
        });
    }

    function appendPlaylistPanelWithPlaylist(playlist){
        var titleTemplate = "<h3 class='active-playlist' data-id='<%= item.data('playlistid') %>'><%= item.attr('data-name') %></h3><a class='delete-button'><i class='fa fa-trash-o'></i></a>";
        var titleTemp = _.template(titleTemplate);
        $('#playlist_title').html(titleTemp({
            item: playlist
        }));
    }

    function appendPlaylistPanelWithSongs(songs){
        $('#playlist_songs').empty();
        for (var i = 0; i < songs.length; i++) {
            var templateString = "<div id='track_<%= track %>' data-id='<%=item.id%>' class='song' data-track='<%= track %>' data-video-id='<%= item.video_id %>' data-embed-url='<%= item.embed_url %>' data-title='<%= item.title %>'><a class='song-delete-button'><i class='fa fa-times-circle-o'></i></a><div class='pl-song-thumb'><img src='<%=item.thumbnail%>'></div><div class='pl-song-title' class='desc truncate line-clamp'><%= item.title %></div>";
            var template = _.template(templateString);
            $('#playlist_songs').append(template({
                item: songs[i],
                track: i + 1
            }));
        }
    }

    function playClickedSong(clickedSongId) {
        player.loadVideoById(clickedSongId);
    }
    
    function changeActiveSongTitle(track, vidTitle){
        $('#active-song-title').attr('data-track', track);
        $('#active-song-title').html(vidTitle);
    }

    function appendSongToDropdownPlaylist(vidAttributes, activePlaylist, songsArray){
        vidAttributes.id = getSongId();
        songsArray.push(vidAttributes);
        playlist.attr('data-songs', JSON.stringify(songsArray));
    }

    function ajaxCreateSong(vidAttributes, activePlaylist, songsArray){
         $.ajax({
            type: "POST",
            url: "/songs",
            data: {
                song: vidAttributes,
                playlist: activePlaylist
            },
            dataType: 'script',
            success: appendSongToDropdownPlaylist(vidAttributes, activePlaylist, songsArray)
        });
    }

    function checkIfActivePlaylist(){
       return ($('.active-playlist').length > 0);
    }

    function playResult(vidAttributes){
        $('#active-song-title').html(vidAttributes.title);
        player.loadVideoById(vidAttributes.video_id);
    }

//Where the events live :)
    $('.search-results').on('click', '.vid-item', function() {
        var vidAttributes = $(this).data('attributes');
        var activePlaylist = $('.active-playlist').data('id');
        var songsArray = $('.playlist').attr('data-songs');
        if (checkIfActivePlaylist()){
            ajaxCreateSong(vidAttributes, activePlaylist, songsArray);
        } else {
            playResult(vidAttributes);
        }
    });

    $('.dropdown-toggle').click(function() {
        $('.new_playlist').remove();
        $('#new_link').show();
    });

    $('#playlist_songs').on('click', '.song-delete-button', function() {
        var songId = $(this).parent().data('id');
        var playlistId = $('.active-playlist').data('id');
        ajaxDeleteSong(songId, playlistId);
    });

    $('#playlist_title').on('click', '.delete-button', function() {
        ajaxDeletePlaylist();
    });

    $('#playlist_title').dblclick(function(){
        ajaxUpdatePlaylistName();
    });


    $('.dropdown-menu').on('click', '.playlist', function() {
        var playlist = $(this);
        appendPlaylistPanelWithPlaylist(playlist);
        
        var songs = $(this).data('songs');
        appendPlaylistPanelWithSongs(songs);
    });

    $('#playlist_songs').on('click', '.pl-song-thumb', function() {
        var track = $(this).parent().data('track');
        var vidTitle = $(this).parent().data('title');
        var clickedSongId = $(this).parent().data('video-id');
        playClickedSong(clickedSongId);
        changeActiveSongTitle(track, vidTitle);
    });

});