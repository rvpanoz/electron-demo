const config = require('../config');
const Marionette = require('backbone.marionette');
const template = require('templates/databases.hbs');
const Schema = require('schemas/schema');
const DatabaseItemView = require('./database-item');

var DatabasesView = Marionette.CompositeView.extend({
  template: template,
  childView: DatabaseItemView,
  childViewContainer: '#database-items',
  collectionEvents: {
    'sync': 'render'
  },
  events: {
    'change select#database-items': 'onDatabaseSelect'
  },
  ui: {
    'databases': 'select#database-items'
  },
  initialize() {
    this.collection = new Schema.databases();
    this.collection.fetch();
  },
  onDatabaseSelect(e) {
    var database = this.getUI('databases').val();
    this.triggerMethod('database:selected', database);
    return false;
  }
});

module.exports = DatabasesView;
