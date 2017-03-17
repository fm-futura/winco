'use strict';

describe('module: main, service: Player', function () {

  // load the service's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate service
  var Player;
  beforeEach(inject(function (_Player_) {
    Player = _Player_;
  }));

  it('should do something', function () {
    expect(!!Player).toBe(true);
  });

});
