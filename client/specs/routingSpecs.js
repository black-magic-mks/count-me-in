describe('Routing', function () {
  var $state;
  var $stateParams;
  beforeEach(module('app'));

  beforeEach(inject(function($injector){
    $state = $injector.get('$state');
    $stateParams = $injector.get('$stateParams');
  }));

it('Should have \'tab.feed\' state, controller, and url', function () {
    var state = $state.get('tab.feed');
    var view = state.views['tabs-feed'];
    expect(state.name).to.be('tab.feed');
    expect(state.url).to.be('/feed');
    expect(view.templateUrl).to.be('/views/user.html');
    expect(view.Controller).to.be('FeedController');
  });

  it('Should have \'tab.feed.all\' state, controller, and url', function () {
    var state = $state.get('tab.feed.all');
    expect(state.name).to.be('tab.feed.all');
    expect(state.url).to.be('/all');
    expect(state.controller).to.be('PledgeController')
    expect(state.templateUrl).to.be('/views/feed.all.html');
  });

  it('Should have \'tab.feed.pledge\' state, controller, and url', function () {
    var state = $state.get('tab.feed.pledge');
    expect(state.name).to.be('tab.feed.pledge');
    expect(state.controller).to.be('PledgeController')
    expect(state.url).to.be('/pledge/:pledgename');
    expect(state.templateUrl).to.be('/views/feed.pledge.html');
  });
  it('Should have \'tab.user\' state, view, and url', function () {
    var state = $state.get('tab.user');
    var view = state.views['tabs-user'];
    expect(state.name).to.be('tab.user');
    expect(state.url).to.be('/user/:username');
    expect(view.templateUrl).to.be('/views/user.html');
    expect(view.controller).to.be('UserController');
  });

  it('Should have \'tab.user.dashboard\' state, controller, and url', function () {
    var state = $state.get('tab.user.dashboard');
    expect(state.name).to.be('tab.user.dashboard');
    expect(state.controller).to.be('UserController')
    expect(state.url).to.be('/dashboard');
    expect(state.templateUrl).to.be('/views/user.dashboard.html');
  });
  it('Should have \'tab.user.addPost\' state, controller, and url', function () {
    var state = $state.get('tab.user.addPost');
    expect(state.name).to.be('tab.user.addPost');
    expect(state.controller).to.be('UserAddPostController')
    expect(state.url).to.be('/post/new');
    expect(state.templateUrl).to.be('/views/user.addPost.html');
  });
  it('Should have \'tab.user.pledge\' state, controller, and url', function () {
    var state = $state.get('tab.user.pledge');
    expect(state.name).to.be('tab.user.pledge');
    expect(state.controller).to.be('UserPledgeController')
    expect(state.url).to.be('/:pledgename');
    expect(state.templateUrl).to.be('/views/user.pledge.html');
  });
  it('Should have \'tab.login\' state, controller, and url', function () {
    var state = $state.get('tab.login');
    expect(state.name).to.be('tab.login');
    expect(state.controller).to.be('AuthController')
    expect(state.url).to.be('/login');
    expect(state.templateUrl).to.be('/views/login.html');
  });
  it('Should have \'tab.signup\' state, controller, and url', function () {
    var state = $state.get('tab.signup');
    expect(state.name).to.be('tab.signup');
    expect(state.controller).to.be('AuthController')
    expect(state.url).to.be('/signup');
    expect(state.templateUrl).to.be('/views/signup.html');
  });
});
