
// 1. Grab data from required files

// A. TWITTER

// 2. Store twitter keys in keys.js file so they are private
// 3. Create function for tweets
// 4. npm twitter package docs to display tweets
// 5. Display 20 tweets and when they were created


// B. SPOTIFIY

// 6. Create function for spotify
// 7. npm node-spotify-api documenation
// 8.  Display artist, song name, preview, album
// 9. Default to "The Sign" by Ace of Base


// 1. Required files
var keys = require('./keys.js');

var Twitter = require('twitter');

var Spotify = require('node-spotify-api');


// 3. Create function for tweets
var myTweets = function () {
	
	// 4. Lines 25-44 based on npm documentation for twitter package
	var client = new Twitter(keys.twitterKeys);
	
	// 5. Count is set for 20 tweets
	var params = {screen_name: 'PixieSput', count: 20};

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  		if (!error) {
    		
  			// Only need .text and .created_at from tweets
    		for (var i = 0; i < tweets.length; i +=1) {
    			console.log("Tweet: " + tweets[i].text);
    			console.log("Created: " + tweets[i].created_at);
    			console.log(" ---------------------------------");
    		}
  		}
  		else {
  			console.log(error);
  		}
	});
}



var mySpotify = function(title) {
// 7. Copied from npm node-Spotify-API documentation
	var spotify = new Spotify({
		id: "f837e7ccf2db4ffe80e97bec1003e4a2",
		secret: "d0974c3068694cdb8692898f055886c8"
	});
 
	spotify.search({type: 'track', query: title}, function(err, data) {
		if (err) {
			return console.log('Error occurred: ' + err);
		}
		if (title === "The Sign") {
			spotify.search({type: 'track', query: "The Sign"}, function(err, data) {
				console.log(data);
				return;
			});
		}
 		// Per Spotify docs, search type "track" will return track object wrapped in paging object
 		// "items" in paging object will give array of objects of requested data
 		// Artist: items.artist.name
 		// Song: items.name
 		// Preview: items.preview_url
 		// Album: items.album.name
 		var info = data.tracks.items;
 		for (var i = 0; i < info.length; i+=1) {
 			console.log("Artist: " + info[i].artists[0].name);
			console.log("Song: " + info[i].name);
			console.log("Preview: " + info[i].preview_url);
			console.log("Album: " + info[i].album.name);
			console.log("---------------------------------------");
		}
	});
}



// 6. Switch statement
var command = process.argv[2];
var title = process.argv[3];
if (title == undefined) {
	title = "The Sign";
}
	
switch(command) {
	case "my-tweets" :
		myTweets();
		break;

	case "spotify-this-song" :
		mySpotify(title);
		break;

	case "movie-this" :
		myMovie();
		break;

	case "do-what-it-says" :
		listen();
		break;

		default:
		console.log("Must use specified commands");
}

	


