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
      if(Meteor.isClient) {
        dataset = Session.get('currentDataset');
      }
      return [Meteor.subscribe('genomes', dataset), Meteor.subscribe('allUsers')];
    },
    fastRender: true
  });
  this.route('phamilies');
  this.route('newDatabase');
  this.route('cresawnlab');
  this.route('domains');
<<<<<<< HEAD
  this.route('terms');
  this.route('account', {
    loadingTemplate: 'loading',
    waitOn: function() {
      return [Meteor.subscribe('files.images.all'), Meteor.subscribe('fullname')];
    }
=======
  this.route('barChart');
  this.route('account');
  this.route('help');
});

if (Meteor.isClient) {
  Router.plugin('ensureSignedIn', {
    only: ['account']
>>>>>>> a40458e2170fde17965d18e4e1db2f51fe6cea53
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
