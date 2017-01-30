module.exports = function(req, passport,pool,done) {
	pool.getConnection(function(err, connection) {
        if (err) throw err;
        var date = req.query.date;
        if (!date) {
            var now = new Date();
            date = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
        }
        var sql = "SELECT agent_id,weekday(startdate) AS weekday,day(startdate) AS day, month(startdate) AS month, year(startdate) AS year FROM bookings ";
        sql += " WHERE startdate = " + pool.escape(date);
        sql += " ORDER BY year,month ASC";
        // console.log("SQL" ,sql);
        connection.query(sql, function(err, results, fields) {
            if (err) throw err;

            connection.query("SELECT * from users WHERE role = 'STAFF'", function(err, agents, fields) {
                var finalDat = {};
                
                connection.release();
                // console.log("AGENT",agents,results);
                var filteredAgents = agents.filter(function(agent){
                    var notFound = true;
                    results.forEach(function(result){
                        if (agent.id == result.agent_id) {
                            notFound = false;
                        }
                    });
                    return notFound;
                });

                filteredAgents.forEach(function(item,idx){
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

                // console.log("filteredAgents",filteredAgents);
    
                // console.log(req.session);
                var siteConfig = {
                    title : "Book A Desk",
                    subtitle : "STEP1: Select Your Date",
                    bg : "/assets/img/background/bg4.jpg",
                    currPage : 'book-a-desk'
                }
                var progress  = {
                    step1 : "complete",
                    step2 : "disabled"
                }

                done({results: filteredAgents,siteConfig : siteConfig, date : date, progress: progress,user : req.user});
                
            });

            
        });
    });
}