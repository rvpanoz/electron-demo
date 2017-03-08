const config = require('./config');
const mysql = require('mysql');

module.exports = {
  createConnection: function() {
    /**
     * [connect to mySQL]
     * @type {[type]}
     */
  
    try {
      var connection = mysql.createConnection({
        host: config.db.host,
        user: config.db.user,
        password: config.db.password,
        database: config.db.dbname,
        charset: 'utf8_general_ci'
      });

      return connection;
    } catch (e) {
      throw new Error(e);
    }
  },
  closeConnection: function(connection) {
    connection.end();
  }
}
