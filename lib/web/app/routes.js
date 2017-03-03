// app/routes.js
function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, ''); // Trim - from end of text
}
module.exports = function(app, passport, pool) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        require("./routes/index")(req, passport, pool, function(output) {
            res.render('index', output); // load the index.ejs file
        })
    });

    app.get('/bookings', isLoggedIn, function(req, res) {
        require("./routes/bookings")(req, passport, pool, function(output) {
            res.render('booking-list', output); // load the index.ejs file
        })
    });

    app.get('/history', isLoggedIn, function(req, res) {
        require("./routes/history")(req, passport, pool, function(output) {
            res.render('booking-history', output);
        })
    });

    app.get('/booking/:id/:name', isLoggedIn, function(req, res) {
        require("./routes/booking-detail")(req, passport, pool, function(output) {
            res.render('booking-detail', output);
        })
    });


    // create a new booking - STEP 1
    app.get('/book', isLoggedIn, isCustomer, function(req, res) {
        require("./routes/booking-new")(req, passport, pool, function(output) {
            res.render('booking-new', output);
        })
    });

    // create a new booking - STEP 2
    app.get('/book/agent/:agent_id/date/:date', isLoggedIn, isCustomer, function(req, res) {
        require("./routes/booking-new-step-2")(req, passport, pool, function(output) {
            res.render('booking-new-step-2', output);
        })
    });

    app.post('/book', isLoggedIn, isCustomer, function(req, res) {
        require("./routes/booking-post")(req, passport, pool, function(booking,fail) {
            if (fail && fail.err != "")  {
                req.flash('message',{
                    title : "Error",
                    content : fail.err
                })
                res.redirect('/message');
            } else {
                // go to the booking detail page
                res.redirect('/booking/' + booking.id + "/" + slugify(booking.title));
            }
            
        })
    });

    app.get('/booking/edit/:id/:name', isLoggedIn, isCustomer, function(req, res) {
        require("./routes/booking-edit")(req, passport, pool, function(output) {
            res.render('booking-edit', output);
        })
    });

    app.get('/booking/delete/:id/:name', isLoggedIn, isCustomer, function(req, res) {
        require("./routes/booking-delete")(req, passport, pool, function(output) {
            req.flash('message',{
                title : "Invalid Role",
                content : "Your Booking '" + output.booking.title +"' has been deleted!"
            });
            res.redirect('/message');
        })
    });

    app.get('/login', function(req, res) {
        require("./routes/login")(req, passport, pool, function(output) {
            output.message = req.flash('loginMessage');
            res.render('login', output);
        });
    });

    app.post('/booking/:id', isLoggedIn, isCustomer, function(req, res) {
        require("./routes/booking-update")(req, passport, pool, function(booking) {
            // go to the booking detail page
            res.redirect('/booking/' + booking.id + "/" + slugify(booking.title));
        })
    });

    // process the login form
    app.post(
        '/login',
        passport.authenticate(
            'local-login', {
                successRedirect: '/bookings', // redirect to the secure profile section
                failureRedirect: '/login', // redirect back to the signup page if there is an error
                failureFlash: true // allow flash messages
            }
        ),
        function(req, res) {
            if (req.body.remember) {
                req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
                req.session.cookie.expires = false;
            }
            res.redirect('/bookings');
        }
    );


    app.get('/message', function(req, res) {
        require("./routes/message")(req, passport, pool, function(output) {
        	output.message = req.flash('message');
            res.render('message', output);
        })
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });


    // Handle 404
	app.use(function(req, res) {
	   	res.status(400);
	   	require("./routes/404")(req, passport, pool, function(output) {
        	res.render('404', output);
        })
     	
	});
	
	// Handle 500
	app.use(function(error, req, res, next) {
		res.status(500);
		require("./routes/500")(req, passport, pool, function(output) {
        	res.render('500', output);
        })
	});

};

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

function isCustomer(req, res, next) {


    if (req.user.role === "CUSTOMER") {
        return next();
    }

    // if they aren't redirect them to the home page
    req.flash('message',{
    	title : "Invalid Role",
    	content : "You do not have permission to access this page"
    })
    res.redirect('/message');
}
