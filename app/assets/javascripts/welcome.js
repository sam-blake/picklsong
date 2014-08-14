var tag = document.createElement('script');
tag.src = "http://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('main-player', {
    height: '480',
    width: '853',
    videoId: $('#main-player').data('video-id'),
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  event.target.playVideo();
}


function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
    playNextSong();
  }
}

  // Ajax needs to change vid-container video_id in _vidmain.html.erb
  function playNextSong() {
    // Figure out currently playing song
    var activeTrack = parseInt($('#active-song-title').attr('data-track'));
    var playlistId = $('.active-playlist').data('id');
    var songs = $('#'+playlistId).data('songs');
    var nextTrack;
    var lastTrack = $('#playlist_songs .song:last-child').attr("data-track");
    for (var i=1; i<=lastTrack+1; i++){
      if ( $('#track_' + (activeTrack+i)).length > 0 ) {
        nextTrack = activeTrack+i;
        break;
      }
    }
    if (nextTrack){
      var nextSongTitle = $("#track_" + nextTrack).data('title');
      var nextSongId = $("#track_" + nextTrack).data('video-id');
    // Updates page
    $('#active-song-title').attr('data-track', nextTrack);
    $('#active-song-title').html(nextSongTitle);
    // Change video
    player.loadVideoById(nextSongId);
  }
}
$(document).ready(function() {
  $('.tipster').on('click', function() {
    $('.modal-welcome').show();
    $('.modal-sign-up').hide();
    $('.modal-sign-in').hide();
  });
  $('.signup-link').on('click', function() {
    $('.modal-sign-in').hide();
    $('.modal-welcome').hide();
    $('.modal-sign-up').slideDown();
  });
  $('.login-link').on('click', function() {
    $('.modal-sign-up').hide();
    $('.modal-welcome').hide();
    $('.modal-sign-in').slideDown();
  });

});

// $(document).click(function () {
//     $('#back').hide();
//     $('#details').slideUp(function () {
//         $('#students').slideDown();
//     });
// });