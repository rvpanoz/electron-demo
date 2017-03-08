'use strict';

const path = require('path');
const fs = require('fs');
const mysql = require('mysql');
const Hapi = require('hapi');
const request = require('request');
const _ = require('lodash');
const config = require('./config');
const Boom = require('boom');

const mysqlUtil = require('./mysql-util');

// hapi server instance
var server = new Hapi.Server({
  connections: {
    routes: {
      cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-with']
      }
    }
  }
});

// HAPI server connection
server.connection({
  port: config.port
});

server.route({
  method: 'GET',
  path: '/databases',
  config: {
    handler(req, reply) {
      var connection = mysqlUtil.createConnection();
      var query = "SHOW DATABASES";

      connection.query(query, function(err, results, fields) {
        if(err) {
          throw Boom.badImplementation('Error in:' + query);
        }

        //close mysql connection
        connection.end();

        //reply results
        reply({
          success: true,
          data: results
        });
      });
    }
  }
});

server.route({
  method: 'GET',
  path: '/tables/{database}',
  config: {
    handler(req, reply) {
      var data = [];
      var database = req.params.database;
      var connection = mysqlUtil.createConnection();
      var queryUse = "USE " + database;
      var queryShow = "SHOW TABLES";

      connection.query(queryUse, function(err, results, fields) {
        if(err) {
          throw Boom.badImplementation('Error in:' + query);
        }

        connection.query(queryShow, function(err, results, fields) {

          //close mysql connection
          connection.end();

          if(results.length) {
            _.each(results, function(RowDataPacket, idx) {
              var v = RowDataPacket['Tables_in_' + database];
              data.push({
                name: v
              });
            }, this);
          }

          //reply results
          reply({
            success: true,
            data: data
          });
        });
      });
    }
  }
});

server.route({
  method: 'GET',
  path: '/table/{tableName}/describe',
  config: {
    handler(req, reply) {
      var params = req.params;
      var table = params.tableName;
      var query = "DESCRIBE " + table;

      //open mysql connection
      var connection = mysqlUtil.createConnection();

      //query execution
      connection.query(query, function(err, results, fields) {
        if(err) {
          throw Boom.badImplementation('Error in:' + query);
        }

        //close mysql connection
        connection.end();

        //reply results
        reply({
          success: true,
          data: {
            results: results,
            fields: fields
          }
        });
      });
    }
  }
});

// start the server
server.start(function(err) {
  if (err) {
    throw new Error(err);
  }
  console.log('Server is running at ' + server.info.host + ":" + server.info.port);
});
