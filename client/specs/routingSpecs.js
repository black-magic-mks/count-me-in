describe('Routing', function () {
  var $state;
  var $stateParams;
  beforeEach(module('app'));

  beforeEach(inject(function($injector){
    $state = $injector.get('$state');
    $stateParams = $injector.get('$stateParams');
  }));

  it('Should have /feed route, view and controller', function () {
    var state = $state.get('feed');
    expect(state.url).to.be('/feed');
    expect(state.name).to.be('feed');
    expect(state.templateUrl).to.be('/views/feed.html');
    expect(state.controller).to.be('FeedController');
  });

});