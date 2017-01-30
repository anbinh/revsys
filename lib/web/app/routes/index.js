module.exports = function(req, passport,pool,done) {
	pool.getConnection(function(err, connection) {
        if (err) throw err;
        var sql = "SELECT *,weekday(startdate) AS weekday,day(startdate) AS day, month(startdate) AS month, year(startdate) AS year FROM bookings ";
        sql += "WHERE startdate <= DATE_ADD(NOW(), INTERVAL 1 YEAR) AND startdate >= NOW() ";
        sql += "ORDER BY year,month ASC";
        connection.query(sql, function(err, results, fields) {

            connection.release();

            if (err) throw err;

            var outputBookings = {};
            results.forEach(function(item,idx){
            	var key = item.year + "-" + item.month;
				if (!outputBookings[key]) {
					outputBookings[key] = {}
				}

				if (outputBookings[key][item.day]) {
					outputBookings[key][item.day].push(item);
				} else {
					outputBookings[key][item.day] = [item];
				}
            });

            var siteConfig = {
                title : "Reservation System",
                subtitle : 'Welcome! Book Your Desk Now',
                homepage : true,
                bg : "/assets/img/header-image.jpg"
            }
            done({results: outputBookings,siteConfig : siteConfig,user : req.user})
        });
    })
}