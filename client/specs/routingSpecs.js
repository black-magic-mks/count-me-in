describe('Routing', function () {
  var $state;
  var $stateParams;
  beforeEach(module('app'));

  beforeEach(inject(function($injector){
    $state = $injector.get('$state');
    $stateParams = $injector.get('$stateParams');
  }));

  it('Should have \'tab.feed\' state, url, template, and controller', function () {
    var state = $state.get('tab.feed');
    var view = state.views['tab-feed'];
    expect(state.name).to.be('tab.feed');
    expect(state.url).to.be('/feed');
    expect(view.templateUrl).to.be('/views/feed.html');
    expect(view.controller).to.be('FeedController');
  });

  it('Should have \'tab.feed.all\' state, url, template, and controller', function () {
    var state = $state.get('tab.feed.all');
    expect(state.name).to.be('tab.feed.all');
    expect(state.url).to.be('/all');
    expect(state.templateUrl).to.be('/views/feed.all.html');
    expect(state.controller).to.be('FeedController')
  });

  it('Should have \'tab.feed.pledge\' state, url, template, and controller', function () {
    var state = $state.get('tab.feed.pledge');
    expect(state.name).to.be('tab.feed.pledge');
    expect(state.url).to.be('/pledge/:pledgename');
    expect(state.templateUrl).to.be('/views/feed.pledge.html');
    expect(state.controller).to.be('FeedController')
  });

  it('Should have \'tab.user\' state, url, template, and controller', function () {
    var state = $state.get('tab.user');
    var view = state.views['tab-user'];
    expect(state.name).to.be('tab.user');
    expect(state.url).to.be('/user/:username');
    expect(view.templateUrl).to.be('/views/user.html');
    expect(view.controller).to.be('UserController');
  });

  it('Should have \'tab.user.profile\' state, url, and template', function () {
    var state = $state.get('tab.user.profile');
    expect(state.name).to.be('tab.user.profile');
    expect(state.url).to.be('/profile');
    expect(state.templateUrl).to.be('/views/user.profile.html');
  });

  it('Should have \'tab.user.post\' state, url, and template', function () {
    var state = $state.get('tab.user.post');
    expect(state.name).to.be('tab.user.post');
    expect(state.url).to.be('/post');
    expect(state.templateUrl).to.be('/views/post.html');
  });

  it('Should have \'tab.user.post.add\' state, url, template, and controller', function () {
    var state = $state.get('tab.user.post.add');
    expect(state.name).to.be('tab.user.post.add');
    expect(state.url).to.be('/new');
    expect(state.templateUrl).to.be('/views/post.add.html');
    expect(state.controller).to.be('addPostController')
  });

  it('Should have \'tab.user.post.view\' state, url, template, and controller', function () {
    var state = $state.get('tab.user.post.view');
    expect(state.name).to.be('tab.user.post.view');
    expect(state.url).to.be('/:post_id');
    expect(state.templateUrl).to.be('/views/post.view.html');
    expect(state.controller).to.be('viewPostController')
  });

  it('Should have \'tab.user.pledge\' state, url, template, and controller', function () {
    var state = $state.get('tab.user.pledge');
    expect(state.name).to.be('tab.user.pledge');
    expect(state.url).to.be('/:pledgename');
    expect(state.templateUrl).to.be('/views/user.pledge.html');
    expect(state.controller).to.be('UserPledgeController')
  });

  it('Should have \'tab.login\' state, url, template, and controller', function () {
    var state = $state.get('tab.login');
    var view = state.views['tab-login'];
    expect(state.name).to.be('tab.login');
    expect(state.url).to.be('/login');
    expect(view.templateUrl).to.be('/views/login.html');
    expect(view.controller).to.be('AuthController')
  });

  it('Should have \'tab.signup\' state, url, template, and controller', function () {
    var state = $state.get('tab.signup');
    var view = state.views['tab-signup'];
    expect(state.name).to.be('tab.signup');
    expect(state.url).to.be('/signup');
    expect(view.templateUrl).to.be('/views/signup.html');
    expect(view.controller).to.be('AuthController')
  });

  it('Should have \'tab.user.pledge\' state, url, template, and no controller', function () {
    var state = $state.get('tab.user.pledge');
    expect(state.name).to.be('tab.user.pledge');
    expect(state.url).to.be('/pledge');
    expect(state.templateUrl).to.be('/views/user.pledge.html');
    expect(state.controller).to.be(undefined);    
  });

  it('Should have \'tab.user.pledge.add\' state, url, template, and ontroller', function () {
    var state = $state.get('tab.user.pledge.add');
    expect(state.name).to.be('tab.user.pledge.add');
    expect(state.url).to.be('/new');
    expect(state.templateUrl).to.be('/views/user.pledge.add.html');
    expect(state.controller).to.be('addPledgeController');    
  });

  it('Should have \'tab.user.pledge.view\' state, url, template, and controller', function () {
    var state = $state.get('tab.user.pledge.view');
    expect(state.name).to.be('tab.user.pledge.view');
    expect(state.url).to.be('/:pledgename');
    expect(state.templateUrl).to.be('/views/user.pledge.view.html');
    expect(state.controller).to.be('viewPledgeController');    
  });

});
