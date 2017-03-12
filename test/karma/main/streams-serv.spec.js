'use strict';

describe('module: main, service: Streams', function () {

  // load the service's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate service
  var Streams;
  beforeEach(inject(function (_Streams_) {
    Streams = _Streams_;
  }));

  it('should do something', function () {
    expect(!!Streams).toBe(true);
  });

});
