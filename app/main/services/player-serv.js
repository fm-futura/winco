'use strict';
angular.module('main')
.service('Player', function ($rootScope, Config) {

  var player = {
    baseUrl: Config.ENV.defaultStreamUrl,
    play: play,
    stop: stop,
    setTimeOffset: setTimeOffset,
  };

  player.state = {
    playing: false,
    timeshifting: false,
    timeOffset: 0,
  };

  return player;

  function stop () {
    if (player.audio) {
      player.audio.src = '';
      player.audio = undefined;
    }
    player.state.playing = false;
  }

  function play (options) {
    options = options || {};
    var audio = create_audio();

    var timeOffset = options.timeOffset || player.state.timeOffset || 0;
    var url = options.url || player.baseUrl;

    player.state.timeOffset = timeOffset;

    if (timeOffset && player.state.timeshifting) {
      url = url + '?offset=' + timeOffset;
    }

    audio.src = url;
    player.audio = audio;

    audio.play().then(function () {
    })
    .catch(function () {
      player.stop();
    });
  }

  function setTimeOffset (timeOffset) {
    timeOffset = parseInt(timeOffset);
    player.state.timeOffset = timeOffset;
    player.state.timeshifting = timeOffset > 0 ? true : false;

    if (player.state.playing) {
      player.play();
    }
  }

  function create_audio () {
    var errorEvents = ['error', 'offline', 'reset', 'cancel', 'close', 'abort'];
    var playEvents = ['playing'];

    var oldAudio = player.audio;

    player.stop();
    remove_listeners(oldAudio);

    var audio = new Audio();
    add_listeners(audio);

    return audio;


    function on_player_play (event) {
      if (event.target === player.audio) {
        player.state.playing = true;
        $rootScope.$apply();
      }
    }

    function on_player_error (event) {
      if (event.target === player.audio) {
        player.state.playing = false;
        $rootScope.$apply();
      }
      event.target.src = '';
    }

    function add_listeners (audio) {
      if (!audio) {
        return;
      }

      errorEvents.forEach(function (event) {
        audio.addEventListener(event, on_player_error);
      });

      playEvents.forEach(function (event) {
        audio.addEventListener(event, on_player_play);
      });
    }

    function remove_listeners (audio) {
      if (!audio) {
        return;
      }

      errorEvents.forEach(function (event) {
        audio.removeEventListener(event, on_player_error);
      });

      playEvents.forEach(function (event) {
        audio.removeEventListener(event, on_player_play);
      });
    }
  }

});
