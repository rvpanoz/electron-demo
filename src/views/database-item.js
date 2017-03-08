const _ = require('lodash');
const Marionette = require('backbone.marionette');
const template = require('../templates/database-item.hbs');
const config = require('../config');

var DatabaseItemView = Marionette.View.extend({
  template: template,
  tagName: 'option',
  serializeData() {
    return this.model.toJSON();
  },
  onRender() {
    var database = this.model.get('Database');
    this.$el.attr({
      value: database
    });
  }
});

module.exports = DatabaseItemView;
