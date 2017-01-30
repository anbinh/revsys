module.exports = function(req, passport,pool,done) {

	pool.getConnection(function(err, connection) {
	    if (err) throw err;

		var booking = JSON.parse(JSON.stringify(req.body));
		booking.customer_id = req.user.id;
		booking.status = 1;
		console.log("BOOKING",booking);

		sql  = "UPDATE bookings SET ";
		sql += " title = " + pool.escape(booking.title);
		sql += " , description = " + pool.escape(booking.description);
		sql += " , labels = " + pool.escape(booking.labels);
		sql += " , priority = " + pool.escape(booking.priority);
		sql += " , team_id = " + pool.escape(booking.team_id);
		sql += " WHERE id=" + pool.escape(booking.id);

	    connection.query(sql, function(err, results, fields) {
			if (err) throw err;

	    	var siteConfig = {}
	    	var output = {
	    		siteConfig : siteConfig,
	    		user : req.user
	    	};
	    	done(booking);
	    	
	    });
	    
	    
	})
    
}