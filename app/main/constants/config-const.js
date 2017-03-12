'use strict';
angular.module('main')
.constant('Config', {

  // gulp environment: injects environment vars
  ENV: {
    /*inject-env*/
    'schedule': 'schedule.json',
    'streams': 'streams.json',
    'current': 'current_song.txt',
    'defaultStreamUrl': 'http://streamer.fmfutura.com.ar:8101/vivo'
    /*endinject*/
  },

  // gulp build-vars: injects build vars
  BUILD: {
    /*inject-build*/
    /*endinject*/
  }

});
