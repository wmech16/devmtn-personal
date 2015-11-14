//EXTERNAL MODULES

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var session = require('express-session');

var appKey = process.env.SP_KEY;
var appSecret = process.env.SP_SEC;


//CONFIG

var config = require('./config');

//CONTROLLERS

var UserCtrl = require('./controllers/UserCtrl');
var ReviewController = require('./controllers/ReviewController');
var AlbumController = require('./controllers/AlbumController');
//SERVICES
var passport = require('passport');
var SpotifyStrategy = require('passport-spotify').Strategy;
var User = require('./models/users.js')

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(obj, done) {
	done(null, obj);
});

passport.use(new SpotifyStrategy({
    clientID: appKey,
    clientSecret: appSecret,
    callbackURL: "http://localhost:3000/auth/spotify/callback"
}, function(accessToken, refreshToken, profile, done) {
	console.log(11, profile);
    User.findOne({ spotifyId: profile.id }, function (findErr, foundUser) { 
    	console.log('err', findErr, 'user', foundUser)
    	if (findErr) return done(findErr, foundUser);
    	if (!foundUser) {
    		var newUser = {
    			name: profile.displayName,
    			spotifyId: profile.id,
    			profilePic: profile.photos[0],
    			accessToken: accessToken,
    			refreshToken: refreshToken
    		};
    		User.create(newUser, function(createErr, createdUser) {
    			if (createErr) return done(createErr, null);
    			return done(null, createdUser);
    		})
    	}
    	else {
    		return done(findErr, foundUser);
    	}
    })

}));
var app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(session({
	secret: 'super secret secret',
	resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('./public'));

app.get('/auth/spotify',
	passport.authenticate('spotify', {scope: ['user-read-email', 
		'user-read-private', 'playlist-read-private'], showDialog: true}),
	function(req, res) {
		console.log(100, res)
	});

app.get('/auth/spotify/callback', 
	passport.authenticate('spotify', { 
		successRedirect: '/#/home',
		failureRedirect: '/#/login' 
	}),
	function(req, res) {
		res.redirect('/#/login');
	});


var ensureAuthenticated = function(req, res, next) {
    console.log('IM COOL!!!!!!!!!!!');
	if (req.isAuthenticated()) { return next(); }
	res.status(401).send();
}



app.get('/login', function(req, res){
  res.json(req.user);
});

app.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/#/login');
})

app.get('/currentUser', function(req, res) {
	res.send(req.user);	
})
//REVIEW ENDPOINTS
app.get('/review', ReviewController.read);
app.get('/review/:userId', ReviewController.getReviews);
app.post('/review/:albumId/:userId', ReviewController.create);

// app.get('/review/:SpotifyId', ReviewController.getReviews);
//app.get('/review/:id', ReviewController.show);
app.put('/review/:id', ReviewController.update);
app.delete('/review/:id', ReviewController.delete);

//ALBUM ENDPOINTS
app.post('/album', AlbumController.create);
app.get('/album/:albumSpotifyId', AlbumController.getAlbum);
app.get('/album', AlbumController.read);
app.post('/album/:overallRating', AlbumController.post)

//USER ENDPOINTS
app.get('/users/:userId', UserCtrl.getUser);

app.get('/isAuth', ensureAuthenticated, function(req, res) {
	res.send(req.user);
})


//CONNECTIONS 

var port = config.PORT;
var mongoURI = config.MONGO_URI;

mongoose.set('debug', true);

mongoose.connect(mongoURI);
mongoose.connection.once('open', function() {
	console.log('Connected to Mongo DB at', mongoURI);
});

app.listen(process.env.PORT || port, function() {
	console.log('Listening on port '+ port);
});



