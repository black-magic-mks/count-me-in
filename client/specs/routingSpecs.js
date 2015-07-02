describe('Routing', function () {
  var $state;
  var $stateParams;
  beforeEach(module('app'));

  beforeEach(inject(function($injector){
    $state = $injector.get('$state');
    $stateParams = $injector.get('$stateParams');
  }));

  it('Should have \'feed\' state, url, template, and controller', function () {
    var state = $state.get('feed');
    var view = state.views['feed'];
    expect(state.name).to.be('feed');
    expect(state.url).to.be('/feed');
    expect(view.templateUrl).to.be('/views/feed.html');
    expect(view.controller).to.be('FeedController');
  });

  it('Should have \'feed.all\' state, url, template, and controller', function () {
    var state = $state.get('feed.all');
    expect(state.name).to.be('feed.all');
    expect(state.url).to.be('/all');
    expect(state.templateUrl).to.be('/views/feed.all.html');
    expect(state.controller).to.be('FeedController')
  });

  it('Should have \'feed.pledge\' state, url, template, and controller', function () {
    var state = $state.get('feed.pledge');
    expect(state.name).to.be('feed.pledge');
    expect(state.url).to.be('/pledge/:pledgename');
    expect(state.templateUrl).to.be('/views/feed.pledge.html');
    expect(state.controller).to.be('FeedController')
  });

  it('Should have \'user\' state, url, template, and controller', function () {
    var state = $state.get('user');
    var view = state.views['user'];
    expect(state.name).to.be('user');
    expect(state.url).to.be('/user/:username');
    expect(view.templateUrl).to.be('/views/user.html');
    expect(view.controller).to.be('UserController');
  });

  it('Should have \'user.profile\' state, url, and template', function () {
    var state = $state.get('user.profile');
    expect(state.name).to.be('user.profile');
    expect(state.url).to.be('/profile');
    expect(state.templateUrl).to.be('/views/user.profile.html');
  });

  it('Should have \'user.post\' state, url, and template', function () {
    var state = $state.get('user.post');
    expect(state.name).to.be('user.post');
    expect(state.url).to.be('/post');
    expect(state.templateUrl).to.be('/views/post.html');
  });

  it('Should have \'user.post.add\' state, url, template, and controller', function () {
    var state = $state.get('user.post.add');
    expect(state.name).to.be('user.post.add');
    expect(state.url).to.be('/new');
    expect(state.templateUrl).to.be('/views/post.add.html');
    expect(state.controller).to.be('addPostController')
  });

  it('Should have \'user.post.view\' state, url, template, and controller', function () {
    var state = $state.get('user.post.view');
    expect(state.name).to.be('user.post.view');
    expect(state.url).to.be('/:post_id');
    expect(state.templateUrl).to.be('/views/post.view.html');
    expect(state.controller).to.be('viewPostController')
  });

  it('Should have \'user.pledge\' state, url, template, and controller', function () {
    var state = $state.get('user.pledge');
    expect(state.name).to.be('user.pledge');
    expect(state.url).to.be('/:pledgename');
    expect(state.templateUrl).to.be('/views/user.pledge.html');
    expect(state.controller).to.be('UserPledgeController')
  });

  it('Should have \'login\' state, url, template, and controller', function () {
    var state = $state.get('login');
    var view = state.views['login'];
    expect(state.name).to.be('login');
    expect(state.url).to.be('/login');
    expect(view.templateUrl).to.be('/views/login.html');
    expect(view.controller).to.be('AuthController')
  });

  it('Should have \'signup\' state, url, template, and controller', function () {
    var state = $state.get('signup');
    var view = state.views['signup'];
    expect(state.name).to.be('signup');
    expect(state.url).to.be('/signup');
    expect(view.templateUrl).to.be('/views/signup.html');
    expect(view.controller).to.be('AuthController')
  });

  it('Should have \'user.pledge\' state, url, template, and no controller', function () {
    var state = $state.get('user.pledge');
    expect(state.name).to.be('user.pledge');
    expect(state.url).to.be('/pledge');
    expect(state.templateUrl).to.be('/views/user.pledge.html');
    expect(state.controller).to.be(undefined);    
  });

  it('Should have \'user.pledge.add\' state, url, template, and ontroller', function () {
    var state = $state.get('user.pledge.add');
    expect(state.name).to.be('user.pledge.add');
    expect(state.url).to.be('/new');
    expect(state.templateUrl).to.be('/views/user.pledge.add.html');
    expect(state.controller).to.be('addPledgeController');    
  });

  it('Should have \'user.pledge.view\' state, url, template, and controller', function () {
    var state = $state.get('user.pledge.view');
    expect(state.name).to.be('user.pledge.view');
    expect(state.url).to.be('/:pledgename');
    expect(state.templateUrl).to.be('/views/user.pledge.view.html');
    expect(state.controller).to.be('viewPledgeController');    
  });

});
