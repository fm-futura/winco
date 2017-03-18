'use strict';
angular.module('main')
.controller('MainCtrl', function ($scope, $interval, Player, Grilla) {

  var vm = this;

  vm.player = Player;
  vm.playerState = Player.state;
  vm.state = {
    currentShow: undefined,
    timeOffset: 0,
    dateStart: undefined,
  };

  vm.toggleTimeshifting = function () {
    var show = Grilla.getCurrentShow();
    if (show && !vm.playerState.timeshifting) {
      var offset = (moment() - show.start) / 1000;
      vm.state.dateStart = show.start;
      vm.state.timeOffset = offset;
      Player.setTimeOffset(offset);
    } else {
      vm.state.dateStart = undefined;
      vm.state.timeOffset = 0;
      Player.setTimeOffset(0);
    }
  };

  vm.updateCurrentShow = function () {
    vm.state.currentShow = Grilla.getCurrentShow();
  };
  vm.updateCurrentShow();

  $interval(vm.updateCurrentShow, 5000);
});
