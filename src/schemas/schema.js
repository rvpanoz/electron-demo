const config = require('../config');
const moment = require('moment');

var database = Backbone.Model.extend({

});

var databases = Backbone.Collection.extend({
  url: function() {
    return config.url + '/databases';
  },
  model: database,
  parse: function(response) {
    return response.data;
  }
});

var table = Backbone.Model.extend({
  defaults: {
    name: ''
  }
});

var tables = Backbone.Collection.extend({
  model: table,
  initialize: function(params) {
    this.database = params.database;
  },
  url: function() {
    return config.url + '/tables/' + this.database;
  },
  parse: function(response) {
    return response.data;
  }
});

module.exports = {
  databases: databases,
  tables: tables
}
