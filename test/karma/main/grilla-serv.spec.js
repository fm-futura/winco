'use strict';

describe('module: main, service: Grilla', function () {

  // load the service's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate service
  var Grilla;
  beforeEach(inject(function (_Grilla_) {
    Grilla = _Grilla_;
  }));

  it('should do something', function () {
    expect(!!Grilla).toBe(true);
  });

});
