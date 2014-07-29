
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
    // Figure out currently playing song
    var activeSongTitle = $('#active-song-title').text();
    console.log(activeSongTitle);
    
    // Creating variable equal to NEW video id
    // var currentSongId = $('#main-player').data('video-id');
    var nextSongId = $(".song[data-title='" + activeSongTitle + "']").parent().next().children().data('video-id');
    // var nextSongId = $('.song[data-title="Beyonce - If I Were A Boy (Karaoke)"]').parent().next().children().data('video-id');
    console.log(nextSongId);

    // Change video
    player.loadVideoById(nextSongId);
  }
// Ajax needs to change vid-container video_id in _vidmain.html.erb