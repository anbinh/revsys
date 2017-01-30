var getTeamsAndAgents = function(user,connection, done) {

    var teamQuery = "SELECT * FROM teams";
    if (user.role=="CUSTOMER") {
        teamQuery = "SELECT bookings.team_id, teams.* FROM bookings ";
        teamQuery += " LEFT JOIN teams ON teams.id = bookings.team_id where bookings.customer_id = " + user.id;
        teamQuery += " GROUP BY bookings.team_id";
    }
    if (user.role=="STAFF") {
        teamQuery = "SELECT bookings.team_id, teams.* FROM bookings ";
        teamQuery += "LEFT JOIN teams ON teams.id = bookings.team_id where bookings.agent_id = " + user.id;
        teamQuery += " GROUP BY bookings.team_id";
    }
    connection.query(teamQuery, function(err, teams, fields) {
        if (err) throw err;
        var agentQuery = "select * from users where role='STAFF'";
        if (user.role == 'CUSTOMER') {
            agentQuery = "SELECT users.id, users.first_name, users.last_name FROM bookings ";
            agentQuery += " LEFT JOIN users ON users.id = bookings.agent_id where bookings.customer_id = " + user.id;
            agentQuery += " GROUP BY bookings.agent_id ";
        }
        if (user.role == "STAFF") {
            agentQuery = "SELECT users.id, users.first_name, users.last_name FROM bookings ";
            agentQuery += " LEFT JOIN users ON users.id = bookings.agent_id where bookings.agent_id = " + user.id;
            agentQuery += " GROUP BY bookings.agent_id ";
        }
        connection.query(agentQuery, function(err, agents, fields) {
            if (err) throw err;
            connection.release();
            done(teams,agents);
        });
    });

}
module.exports = function(req, passport,pool,done) {
	pool.getConnection(function(err, connection) {
        if (err) throw err;

        var user = req.user;
        var sql = "SELECT teams.name as team_name, b.id, b.title, b.priority, b.description, b.agent_id ,b.team_id, b.labels, b.customer_id, b.startdate, b.enddate, b.status, b.checktime ,agents.first_name as agent_first_name, agents.last_name as agent_last_name, customers.first_name as cust_first_name, customers.last_name as cust_last_name, agents.floor as agent_floor, agents.desk as agent_desk, weekday(startdate) AS weekday,day(startdate) AS day, month(startdate) AS month, year(startdate) AS year FROM bookings as b";
        sql += " LEFT JOIN users AS agents ON agents.id = b.agent_id ";
        sql += " LEFT JOIN users as customers ON customers.id = b.customer_id ";
        sql += " LEFT JOIN teams as teams ON teams.id = b.team_id ";
        sql += "WHERE startdate >= DATE_SUB(NOW(), INTERVAL 1 YEAR) AND startdate <= NOW() ";
        
        switch (user.role) {
            case "ADMIN" :
                // do nothing, can view all
                break;
            case "STAFF" :
                sql += " AND agent_id = " + pool.escape(user.id) + " ";
                break;
            case "CUSTOMER" :
                sql += " AND customer_id = " + pool.escape(user.id)+ " ";
                break;
            default : 
                // do nothing, no role found, view all
        }

        if (req.query && req.query.agent_id) {
            sql += " AND agent_id= " + pool.escape(req.query.agent_id) + " ";
        }

        if (req.query && req.query.team_id) {
            sql += " AND team_id= " + pool.escape(req.query.team_id) + " ";
        }

        if (req.query && req.query.customer_id) {
            sql += " AND customer_id= " + pool.escape(req.query.customer_id) + " ";
        }

        if (req.query && req.query.q) {
            sql += " AND description LIKE '%" + req.query.q + "%' ";
        }

        sql += " ORDER BY year,month ASC";
        connection.query(sql, function(err, results, fields) {

            if (err) throw err;

            getTeamsAndAgents(user,connection,function(teams,agents){
                var finalDat = {};
                results.forEach(function(item,idx){
                    var key = item.year + "-" + item.month;
                    if (!finalDat[key]) {
                        finalDat[key] = {}
                    }
    
                    if (finalDat[key][item.day]) {
                        finalDat[key][item.day].push(item);
                    } else {
                        finalDat[key][item.day] = [item];
                    }
                });
                req.session.current_url = '/history';
                
                var siteConfig = {
                    title : "Previous Bookings",
                    subtitle : "All available bookings in the past",
                    bg : "/assets/img/background/bg2.jpg",
                    currPage : 'history',
                    homeUrl : '/history'
                }
    
                done({results: finalDat,teams : teams, agents : agents, siteConfig : siteConfig,user : user, query : req.query});
            });

            
        });
    });
}