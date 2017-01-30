module.exports = function(req, passport,pool,done) {
    
    var siteConfig = {
        title : "500",
        subtitle : "Oops sth goes wrong with the server",
        bg : "/assets/img/background/bg7.jpg",
        currPage : 'upcoming-bookings'
    };
    var output = {
        siteConfig : siteConfig,
        content : "Internal Server Error",
        user : req.user
    } 
    done(output);
}