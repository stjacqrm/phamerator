// set up Genomes collection
// publish just genome names and clusters

Meteor.publish("allUsers", function () {
  //return Meteor.users.find({}, {fields: {name: 1, emails: 1, roles: 1, username:1, profile:1}});
  return Meteor.users.find({'profile.includeInDirectory': true}, {fields: {name: 1, emails: 1, roles: 1, username:1, profile:1}});
})

/*Meteor.publish("genomes", function (dataset) {
  var datasets = Roles.getGroupsForUser(this.userId, "view")
  if (!datasets.includes(dataset)) { return [] }
  console.log("getting genomes in ", dataset);
  return Genomes.find({dataset: dataset}, {fields: {phagename: 1, genomelength: 1, cluster: 1, subcluster: 1, dataset: 1}});
});*/

Meteor.publishComposite("genomes", function (dataset) {
  return {
    find: function () {
      return Datasets.find({"name": {$in: Roles.getGroupsForUser(this.userId, "view")}});
    },
    children: [{
      find: function () {
        if (!Roles.getGroupsForUser(this.userId, "view").includes(dataset)) {
          return [];
        }
        return Genomes.find({dataset: dataset}, {fields: {phagename: 1, genomelength: 1, cluster: 1, subcluster: 1, dataset: 1}});
      }
    }]
  }
});

Meteor.publish("genomesWithSeq", function (dataset, selectedGenomes) {
  //console.log(selectedGenomes);
  var datasets = Roles.getGroupsForUser(this.userId, "view")
  if (!datasets.includes(dataset)) { return [] }

  //return Genomes.find({$and:[{"phagename": {$in: selectedGenomes}},{dataset: dataset}]});
  return Genomes.find({"phagename": {$in: selectedGenomes},dataset: dataset});

  //return Genomes.find({});
  //return Genomes.find({"phagename": {$in: selectedGenomes}});
});

/*Meteor.publish("datasets", function () {
  //var datasetsView = Roles.getGroupsForUser(this.userId, "view");
  //console.log("datasets publication:", this.userId, datasetsView)
  //return Datasets.find({"name": {$in: Session.get("datasetsView")}});
  return Datasets.find({"name": {$in: Roles.getGroupsForUser(this.userId, "view")}});
});*/

Meteor.publishComposite("datasets", {
  find: function () {
    return Meteor.users.find({_id: this.userId});
  },
  children: [{
    find: function () {
      return Datasets.find({"name": {$in: Roles.getGroupsForUser(this.userId, "view")}});
    }
  }]
});

Meteor.publish('preferredDataset', function () {
  return Meteor.users.find({_id: this.userId}, {fields: {preferredDataset: 1}});
});

Meteor.publish('files.images.all', function () {
  return Images.find().cursor;
});

Meteor.publish('selectedData', function() {
  return Meteor.users.find({_id: this.userId}, {fields: {selectedData: 1}});
});

Meteor.publish('featureDiscovery', function() {
  return Meteor.users.find({_id: this.userId}, {fields: {featureDiscovery: 1}});
});

Meteor.publish('newTermsAndPolicies', function() {
  return Meteor.users.find({_id: this.userId}, {fields: {newTermsAndPolicies: 1}});
});

Meteor.publish('fullname', function () {
  return Meteor.users.find({_id: this.userId}, {fields: {name: 1}});
});

Meteor.publish('phameratorVersion', function () {
  return PhameratorVersion.find({}, {fields: {version: 1}});
});

Meteor.users.find({ "status.online": true }).observe({
  added: function(id) {
    // id just came online
    console.log(new Date().toLocaleString(), "[ONLINE]:  ", id.username, "(" + id.name + ")", id.emails[0]);
  },
  removed: function(id) {
    // id just went offline
    console.log(    new Date().toLocaleString(), "[OFFLINE]: ", id.username, "(" + id.name + ")", id.emails[0]);
  }
});
