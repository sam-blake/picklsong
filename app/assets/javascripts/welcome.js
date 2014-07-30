
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
      var activeTrack = $('#active-song-title').data('track');
      playNextSong(activeTrack);

    }
  }

  // Ajax needs to change vid-container video_id in _vidmain.html.erb
  function playNextSong(activeTrack) {
    // Figure out currently playing song    
    console.log("activeTrack: " + activeTrack);
    var nextTrack = activeTrack + 1;
    var nextSongTitle = $("#track_" + nextTrack).data('title');
    var nextSongId = $("#track_" + nextTrack).data('video-id');
    console.log(nextTrack + ': ' + nextSongTitle);
    // Updates page
    $('#active-song-title').attr('data-track', nextTrack);
    $('#active-song-title').html(nextSongTitle);
    // Change video
    player.loadVideoById(nextSongId);
  }
