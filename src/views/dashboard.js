const config = require('../config');
const Marionette = require('backbone.marionette');
const template = require('../templates/dashboard.hbs')
const css = require('../assets/css/drag.css');

var DashboardView = Marionette.View.extend({
  template: template,
  ui: {
    dropZone: '.drop-zone'
  },
  initialize() {},
  onRender() {
    var dropZone = this.getUI('dropZone');

    dropZone.ondrop = function (e) {
      e.preventDefault();
      console.log('ondrop');
    }

    dropZone.ondragover = function () {
      console.log('ondragover');
    }

    dropZone.ondragleave = function () {
      console.log('ondragleave');
    }
  },
  serializeData() {
    return {
      title: 'Dashboard'
    }
  }
});

module.exports = DashboardView;
