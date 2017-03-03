module.exports = function(req, passport,pool,done) {

	pool.getConnection(function(err, connection) {
	    if (err) throw err;

		var booking = JSON.parse(JSON.stringify(req.body));
		booking.customer_id = req.user.id;
		booking.status = 1;
		console.log("BOOKING",booking);

		if (booking.title == "") {
			done(null,{err : "Title cannot be null"})
		} else {
			connection.query('INSERT INTO bookings SET ?', booking, function(err, results, fields) {
				if (err) throw err;
	
	    		var siteConfig = {}
	    		var output = {
	    			siteConfig : siteConfig,
	    			user : req.user
	    		};
	    		booking.id = results.insertId;
	    		done(booking);
	    		
	    	});
		}


	    
	    
	    
	})
    
}