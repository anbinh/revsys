var config = require('./app/config/database');
var pool = require('mysql').createPool(config.connection);



pool.getConnection(function(err, connection) {
  if (err) {
  	console.log(err)
  } else {
  	console.log("CONNECTED");
  }
});