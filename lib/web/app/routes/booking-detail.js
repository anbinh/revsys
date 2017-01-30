module.exports = function(req, passport,pool,done) {
	pool.getConnection(function(err, connection) {
        if (err) throw err;
        var sql = "SELECT bookings.*,users.floor, users.desk, users.first_name as user_firstname, users.last_name as user_lastname, customers.first_name as customer_firstname, customers.last_name as customer_lastname, teams.name as team_name FROM bookings LEFT JOIN users ON bookings.agent_id = users.id LEFT JOIN users as customers ON bookings.customer_id = customers.id LEFT JOIN teams ON teams.id = bookings.team_id WHERE bookings.id = " + pool.escape(req.params.id);
        connection.query(sql, function(err, results, fields) {
            connection.release();
            if (err) throw err;
            // console.log(req.session);
            var siteConfig = {
                title : results[0].title,
                subtitle : "",
                bg : "/assets/img/background/bg3.jpg",
                currPage : 'booking-detail'
            }
            done({booking: results[0],siteConfig : siteConfig,user : req.user});
        });
    });
}