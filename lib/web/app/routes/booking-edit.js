module.exports = function(req, passport,pool,done) {
	pool.getConnection(function(err, connection) {

        var sql = "SELECT bookings.*,users.floor, users.desk, users.first_name as user_firstname, users.last_name as user_lastname, customers.first_name as customer_firstname, customers.last_name as customer_lastname, teams.name as team_name FROM bookings LEFT JOIN users ON bookings.agent_id = users.id LEFT JOIN users as customers ON bookings.customer_id = customers.id LEFT JOIN teams ON teams.id = bookings.team_id WHERE bookings.id = " + pool.escape(req.params.id);
        connection.query(sql, function(err, results, fields) {
            var booking = results[0];
            var agent_id = booking.agent_id;
            if (err) throw err;

            connection.query("SELECT *,users.id as agent_id, teams.id as team_id from users LEFT JOIN teams_users ON teams_users.user_id = users.id LEFT JOIN teams ON teams.id = teams_users.team_id  where users.role = 'STAFF' AND users.id = " + pool.escape(agent_id)  ,function(err, teams, fields) {

                connection.release();
                if (err) throw err;
                if (teams.length == 0) {
                    console.log("NO DATA FOUND");
                } else {
                    var finalTeams = [];
                    teams.forEach(function(team){
                        finalTeams.push( {
                            name : team.name,
                            id : team.team_id
                        });
                    });
                    var agent = {
                        id : teams[0].agent_id,
                        first_name :teams[0].first_name,
                        last_name :teams[0].last_name,
                        floor :teams[0].floor,
                        desk :teams[0].desk,
                        teams : finalTeams
                    }
            
                    var siteConfig = {
                        title : "Book A Desk",
                        subtitle : "STEP 2: Create a new booking",
                        bg : "/assets/img/background/bg4.jpg",
                        currPage : 'book-a-desk'
                    }
                    var progress  = {
                        step1 : "complete",
                        step2 : "complete"
                    }

                    done({booking : booking,agent: agent ,siteConfig : siteConfig, user : req.user});
                }
                
            });

        });
        
        
        
    });
}