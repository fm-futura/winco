'use strict';

describe('module: main, controller: GrillaCtrl', function () {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var GrillaCtrl;
  beforeEach(inject(function ($controller) {
    GrillaCtrl = $controller('GrillaCtrl');
  }));

  it('should do something', function () {
    expect(!!GrillaCtrl).toBe(true);
  });

});
