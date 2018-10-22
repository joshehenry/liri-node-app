require("dotenv").config();
const fs = require('fs');
const keys = require('./keys');
const request = require('request')
//var spotify = new Spotify(keys.spotify);
var LiriCommand = process.argv[2];
var input = process.argv[3];
var Spotify = require('node-spotify-api');

function doThis(LiriCommand, input) {

    switch (LiriCommand) {

        case 'spotify-this-song':
            getSong(input);
            break;

        case 'movie-this':
            getMovie(input);
            break;

        case 'concert-this':
            getConcert(input);
            break;

        case 'do-what-it-says':
            tryMe(input);

        default: console.log("Liri doesn't recognize this request");
    }

}

function getSong(input) {
    var spotify = new Spotify(keys.spotify);

    if (!input) {
        input = "In My Feelings";
    };

    console.log(input);

    //Callback to spotify to search for song name
    var spotify = new Spotify({
        id: '63952ab3ff394707b786ebaf20997789',
        secret: '59e7db7e1810472baf154e1f9b58cc6a'
    });

    spotify.search({ type: 'track', query: input }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log("Artist: " + data.tracks.items[0].artists[0].name + "\nSong name: " + data.tracks.items[0].name +
            "\nAlbum Name: " + data.tracks.items[0].album.name + "\nPreview Link: " + data.tracks.items[0].preview_url);

        //Creates a variable to save text into log.txt file
        var logSong = "Artist: " + data.tracks.items[0].artists[0].name + "\nSong name: " + data.tracks.items[0].name +
            "\nAlbum Name: " + data.tracks.items[0].album.name + "\nPreview Link: " + data.tracks.items[0].preview_url + "\n";

        //Appends text to log.txt file
        fs.appendFile('log.txt', logSong, function (err) {
            if (err) throw err;
        });

    });
};

function getMovie(input) {

    if (!input) {

        movie = "The Godfather"
    }

    var movie = process.argv[3];
    var url = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json&tomatoes=true&apikey=trilogy";
    request(url, function (err, response, body) {

        if (!err && response.statusCode == 200) {

            var movieObject = JSON.parse(body);

            var movieResults = {

                plot: movieObject.Plot,
                year: movieObject.Year,
                rating: movieObject.Rating,
                country: movieObject.Country,
                language: movieObject.Language,
                actors: movieObject.Actors,

            }


            //console.log(movieObject);
            console.log(movieResults);
            fs.appendFile('log.txt', movieResults, function (err) {
                if (err) throw err;
            });
            

        } else {
            console.log("Error :" + error);
            return;
        }
    }
    )
}

function getConcert(input) {

    if (!input) {

        concert = "No event found"
    }

    var concert = process.argv[3];
    var url = `https://rest.bandsintown.com/artists/${concert}/events?app_id=codingbootcamp`
    request(url, function (err, response, body) {

        if (!err && response.statusCode == 200) {

            var concertObject = JSON.parse(body);

            console.log(concertObject[1].venue);
            fs.appendFile('log.txt', concertObject[1].venue, function (err) {
                if (err) throw err;
            });
        } else {

            console.log("Error: " + err);
            return;
        }
    })
}


doThis(LiriCommand, input);