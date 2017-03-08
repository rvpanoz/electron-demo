//import 3rd party modules
const Marionette = require('backbone.marionette');
const template = require('../templates/home.hbs')
const config = require('../config');
const DatabasesView = require('views/databases');
const TablesView = require('views/tables');

var HomeView = Marionette.View.extend({
  template: template,
  regions: {
    'databasesRegion': '.databases-control',
    'tablesRegion': '.tables-control'
  },
  childViewTriggers: {
    'database:selected': 'child:database:selected',
  },
  collectionEvents: {
    'sync': 'render'
  },
  events: {
    'click button.btn-generate': 'onGenerate'
  },
  ui: {
    tableName: 'input.table'
  },
  onRender() {
    this.showChildView('databasesRegion', new DatabasesView());
  },
  onChildDatabaseSelected(database) {
    this.showChildView('tablesRegion', new TablesView({
      database: database
    }));
  },
  onDescribe(e) {
    var table = this.getUI('tableName').val();
    if(table) {
      this.collection.setTable(table);
      this.collection.describe().done(function(response) {

      });
    }
    return;
  },
  serializeData() {
    return {
      title: 'Home'
    }
  }
});

module.exports = HomeView;
