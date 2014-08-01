
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
    for (var i=activeTrack; i<=songs.length; i++){
      if ( $('#track_' + (i+1)).length > 0 ) {
        nextTrack = i+1;
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
