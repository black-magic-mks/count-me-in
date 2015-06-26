describe('Routing', function () {
  var $state;
  var $stateParams;
  beforeEach(module('app'));

  beforeEach(inject(function($injector){
    $state = $injector.get('$state');
    $stateParams = $injector.get('$stateParams');
  }));

  it('Should have /feed route, view and controller', function () {
    var state = $state.get('tab.feed');
    expect(state.url).to.be('/feed');
    expect(state.name).to.be('tab.feed');

    var view = state.views['tab-feed'];
    expect(view.templateUrl).to.be('/views/feed.html');
    expect(view.controller).to.be('FeedController');
  });

});
