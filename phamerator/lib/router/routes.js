//var subscriptions = new SubsManager();

if (Meteor.isClient) {
  Router.plugin('ensureSignedIn', {
    only: ['account', 'phages']
  });
}

Router.configure({
  layoutTemplate: 'masterLayout',
  //loadingTemplate: 'loading',
  notFoundTemplate: 'pageNotFound',
  //progressDebug : true,
  progress : true,
  progressSpinner : false,
  yieldTemplates: {
    nav: {to: 'nav'},
    footer: {to: 'footer'}
  }
});

Router.map(function() {
  this.route('home', {
    path: '/',
    loadingTemplate: 'loading',
    waitOn: function() {
      return [Meteor.subscribe('allUsers')];
    }
  });
  this.route('phages', {
    loadingTemplate: 'loading',
    waitOn: function() {
      return [Meteor.subscribe('genomes', Session.get("currentDataset")), Meteor.subscribe('allUsers')];
    }
  });
  this.route('phamilies');
  this.route('newDatabase');
  this.route('cresawnlab');
  this.route('domains');
  this.route('terms');
  this.route('account', {
    loadingTemplate: 'loading',
    waitOn: function() {
      return [Meteor.subscribe('files.images.all'), Meteor.subscribe('fullname')];
    }
  });
});

//Routes
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('enrollAccount');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');
