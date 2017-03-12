'use strict';
angular.module('main', [
  'ionic',
  'ngCordova',
  'ui.router',
  'restangular',
])
.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/main');
  $stateProvider

  .state('main', {
    url: '/',
    abstract: true,
    templateUrl: 'main/templates/menu.html',
    controller: 'MainCtrl as Main',
    resolve: {
      schedule: ['Grilla', function (Grilla) {
        return Grilla.get();
      }],
    }
  })

  .state('main.player', {
    url: 'player',
    views: {
      'menuContent': {
        templateUrl: 'main/templates/player.html'
      }
    }
  })

  .state('main.historial', {
    url: 'historial',
    views: {
      'menuContent': {
        templateUrl: 'main/templates/historial.html',
        controller: 'HistorialCtrl'
      }
    }
  })

  .state('main.grilla', {
    url: 'grilla',
    views: {
      'menuContent': {
        templateUrl: 'main/templates/grilla.html',
        controller: 'GrillaCtrl'
      }
    }
  })

  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('player');
});
