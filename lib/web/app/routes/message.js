module.exports = function(req, passport,pool,done) {
	var siteConfig = {
        title : "Info",
        subtitle : '',
        homepage : true,
        bg : "/assets/img/header-image.jpg"
    }
    done({siteConfig : siteConfig,user : req.user})
}