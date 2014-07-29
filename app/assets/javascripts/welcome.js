
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

  function playNextSong() {
    var currentSongId = $('#main-player').data('video-id');
    
  }
// Ajax needs to change vid-container video_id in _vidmain.html.erb