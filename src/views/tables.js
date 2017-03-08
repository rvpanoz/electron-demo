const config = require('../config');
const Marionette = require('backbone.marionette');
const template = require('templates/tables.hbs');
const Schema = require('schemas/schema');
const TableItemView = require('./table-item');

var TablesView = Marionette.CompositeView.extend({
  template: template,
  childView: TableItemView,
  childViewContainer: '#table-items',
  collectionEvents: {
    'sync': 'render'
  },
  ui: {
    'tables': 'select#table-items'
  },
  initialize(params) {
    this.database = _.get(params, 'database');
    this.collection = new Schema.tables({
      database: this.database
    });
    this.collection.fetch();
  },
  onRender() {
    this.children.each(_.bind(function (childView) {
      childView.trigger("table:event", this.database);
     }, this));
  }
});

module.exports = TablesView;
