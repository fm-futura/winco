'use strict';
angular.module('main')
.service('Grilla', function (Restangular, Config) {
  var state = {
    data: undefined
  };

  var Service = {
    get: get,
    getCurrentShow: getCurrentShow,
  };
  return Service;

  function get (options) {

    var p = Restangular.all(Config.ENV.schedule).getList(options);

    p.then(function (data) {
      state.data = data;
    });

    return p;
  }

  /* eslint no-unused-vars:warn */
  function getCurrentShow (when) {
    when = when || new Date();
    return {};
  }

});
