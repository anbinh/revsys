module.exports = function(req, passport,pool,done) {
    
    var siteConfig = {
        title : "404",
        subtitle : "Oops sth goes wrong",
        bg : "/assets/img/background/bg6.jpg",
        currPage : 'upcoming-bookings'
    };
    var output = {
    	siteConfig : siteConfig,
		content : "Page cannot found",
		user : req.user
    }
    done(output);
}