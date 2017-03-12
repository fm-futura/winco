'use strict';

describe('module: main, service: SongInfo', function () {

  // load the service's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate service
  var SongInfo;
  beforeEach(inject(function (_SongInfo_) {
    SongInfo = _SongInfo_;
  }));

  it('should do something', function () {
    expect(!!SongInfo).toBe(true);
  });

});
