module.exports = function(req, passport,pool,done) {
	pool.getConnection(function(err, connection) {

        var sql  = "DELETE FROM bookings WHERE id=" + pool.escape(req.params.id);
        sql += " AND customer_id= " + pool.escape(req.user.id);

        connection.query( sql ,function(err, teams, fields) {

            var booking = {
                id : req.params.id,
                title : req.params.name
            }
            
            done({booking : booking});
            
        });
        
        
        
    });
}