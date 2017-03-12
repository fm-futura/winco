'use strict';
angular.module('main')
.controller('MainCtrl', function ($scope, Config) {

  var vm = this;

  vm.player = {
    baseUrl: Config.ENV.defaultStreamUrl,
  };

  vm.player.state = vm.playerState = {
    playing: false,
    timeshifting: false,
    timeOffset: 0,
  };


  vm.player.stop = function () {
    if (vm.player.audio) {
      vm.player.audio.src = '';
      vm.player.audio = undefined;
    }
    vm.player.state.playing = false;
  };

  vm.player.play = function (timeOffset) {
    var audio = _create_audio();

    timeOffset = timeOffset || 0;

    vm.player.state.timeOffset = timeOffset;

    var url = vm.player.baseUrl;
    if (timeOffset) {
      url = url + '?offset=' + timeOffset;
    }

    audio.src = url;
    vm.player.audio = audio;
    audio.play().then(function () {
    })
    .catch(function () {
      vm.player.stop();
    });
  };

  vm.toggleTimeshifting = function () {
    vm.player.state.timeshifting = !vm.player.state.timeshifting;
  };

  function _create_audio () {
    var errorEvents = ['error', 'offline', 'reset', 'cancel', 'close', 'abort'];
    var playEvents = ['playing'];

    var oldAudio = vm.player.audio;

    vm.player.stop();
    _remove_listeners(oldAudio);

    var audio = new Audio();
    _add_listeners(audio);

    return audio;


    function _on_player_play (event) {
      if (event.target === vm.player.audio) {
        vm.player.state.playing = true;
        $scope.$apply();
      }
    }

    function _on_player_error (event) {
      if (event.target === vm.player.audio) {
        vm.player.state.playing = false;
        $scope.$apply();
      }
      event.target.src = '';
    }

    function _add_listeners (audio) {
      if (!audio) {
        return;
      }

      errorEvents.forEach(function (event) {
        audio.addEventListener(event, _on_player_error);
      });

      playEvents.forEach(function (event) {
        audio.addEventListener(event, _on_player_play);
      });
    }

    function _remove_listeners (audio) {
      if (!audio) {
        return;
      }

      errorEvents.forEach(function (event) {
        audio.removeEventListener(event, _on_player_error);
      });

      playEvents.forEach(function (event) {
        audio.removeEventListener(event, _on_player_play);
      });
    }
  }

});
