const _ = require('lodash');
const Marionette = require('backbone.marionette');
const template = require('../templates/database-item.hbs');
const config = require('../config');

var TableItemView = Marionette.View.extend({
  template: template,
  tagName: 'option',
  modelEvents: {
    'change:name': 'onModelChange'
  },
  onModelChange() {
    console.log(this.model);
  },
  onRender() {
    var value = this.model.get('name');
    this.$el.attr({
      value: value
    });
  },
  serializeData() {
    return this.model.toJSON();
  }
});

module.exports = TableItemView;
