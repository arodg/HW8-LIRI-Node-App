
// 1. Grab data from required files

// (A) TWITTER

// 2. Store twitter keys in keys.js file so they are private
// 3. Create function for tweets
// 4. npm twitter package to display tweets
// 5. Display 20 tweets and when they were created


// (B) SPOTIFIY

// 6. Create function for spotify
// 7. npm node-spotify-api documenation
// 8. Default to "The Sign" by Ace of Base
// 9. Display artist, song name, preview, album


// (C) MOVIE

// 10. Create function for movie name, OMDB API
// 11. If no movie title, display Mr. Nobody

// (D) Do What It Says

// 12. Use fs to read from random.txt and call spotify function


// 13. Switch statement


// 1. Required files
var key = require('./keys.js');

var Twitter = require('twitter');

var Spotify = require('node-spotify-api');

var request = require('request');

var fs = require('fs');


// 3. Function for tweets
var myTweets = function () {
	
	// 4. Lines 25-44 based on npm documentation for twitter package
	var client = new Twitter(key);
	
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


// 6. Function for Spotify
var mySpotify = function(title) {

// 7. From npm node-Spotify-API documentation
	var spotify = new Spotify({
		id: "f837e7ccf2db4ffe80e97bec1003e4a2",
		secret: "d0974c3068694cdb8692898f055886c8"
	});

	// 8. Display The Sign by Ace of Base if no song title given. Look up ID from Spotify search
	if (title == undefined) {
		spotify
  		.request('https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE')
  		.then(function(data) {
 				console.log("Song: " + data.name);
 				console.log("Album: " + data.album.name);
				console.log("Artist: " + data.album.artists[0].name);
				console.log("---------------------------------------");
  		})
  		.catch(function(err) {
    		console.error('Error occurred: ' + err); 
  		});
  		return;
	}
 
		spotify
		.search({ type: 'track', query: title })
	 	.then(function(response) {
 			var info = response.tracks.items;
 			for (var i = 0; i < info.length; i+=1) {
 				console.log("Artist: " + info[i].artists[0].name);
				console.log("Song: " + info[i].name);
				console.log("Preview: " + info[i].preview_url);
				console.log("Album: " + info[i].album.name);
				console.log("---------------------------------------");
			}
		})
	 
	 	.catch(function(err) {
	 		console.log(err);
	 	});
}	 	


// 10. Function for movie name
var myMovie = function(title) {
	
	// 11. If no movie title given, display Mr. Nobody
	if (title == undefined) {
		var query = "http://www.omdbapi.com/?apikey=40e9cece&t=Mr+Nobody";
	}
	else {
	var query = "http://www.omdbapi.com/?apikey=40e9cece&t=" + title;
	}
	
	request(query, function(error, response, body) {

  		if (!error && response.statusCode === 200) {

    	console.log("Title: " + JSON.parse(body).Title);
    	console.log("Release Year: " + JSON.parse(body).Year);
    	console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
    	console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
    	console.log("Country: " + JSON.parse(body).Country);
    	console.log("Language: " + JSON.parse(body).Language);
    	console.log("Plot: " + JSON.parse(body).Plot);
    	console.log("Actors: " + JSON.parse(body).Actors);;
  	}
	});
}


var myFile = function () {
	fs.readFile("random.txt", "utf8", function(error, data) {

		if (error) {
    		return console.log(error);
  		}

  		var x = data.split(",");
  		console.log(x[0]);
  
  		if (x[0] == "my-tweets") {
  			myTweets();
  			return;
  		}
  		if (x[0] == "spotify-this-song") {
  			mySpotify(x[1]);
  			return;
  		}
  		if (x[0] == "movie-this") {
  			myMovie(x[1]);
  			return;
  		}
  		else {
  			console.log("Use one of the following commands: my-tweets, spotify-this-song, movie-this, do-what-it-says");
		}
  	});
}



// 13. Switch statement
var command = process.argv[2];
var title = process.argv[3];

	
switch(command) {
	case "my-tweets" :
		myTweets();
		break;

	case "spotify-this-song" :
		mySpotify(title);
		break;

	case "movie-this" :
		myMovie(title);
		break;

	case "do-what-it-says" :
		myFile();
		break;

		default:
		console.log("Use one of the following commands: my-tweets, spotify-this-song, movie-this, do-what-it-says");
}

	


