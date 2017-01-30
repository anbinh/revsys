module.exports = function(req, passport,pool,done) {
    
    var siteConfig = {
        title : "Login",
        subtitle : "Access to the site",
        bg : "/assets/img/background/bg5.jpg",
        currPage : 'login'
    }
    done({results: {},siteConfig : siteConfig,user : req.user})
	
}