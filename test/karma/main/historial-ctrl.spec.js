'use strict';

describe('module: main, controller: HistorialCtrl', function () {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var HistorialCtrl;
  beforeEach(inject(function ($controller) {
    HistorialCtrl = $controller('HistorialCtrl');
  }));

  it('should do something', function () {
    expect(!!HistorialCtrl).toBe(true);
  });

});
