module.exports = function(req, passport,pool,done) {
	pool.getConnection(function(err, connection) {
        var agent_id = req.params.agent_id;
        var date = req.params.date;
        connection.query("SELECT *,users.id as agent_id, teams.id as team_id from users LEFT JOIN teams_users ON teams_users.user_id = users.id LEFT JOIN teams ON teams.id = teams_users.team_id  where users.role = 'STAFF' AND users.id = " + pool.escape(agent_id)  ,function(err, teams, fields) {

            connection.release();
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

                done({agent: agent ,siteConfig : siteConfig, date : date, progress: progress,user : req.user});
            }
            
        });
        
        
    });
}