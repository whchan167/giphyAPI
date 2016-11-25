//create array of Animes
var Animes= ['Naruto', 'Bleach', 'Dragonball', 'Reborn', 'One piece'];

// adding event listener to all buttons
function displayanimes() {
//Grabbing and storing data-name property value from the button
	var Janime = $(this).data(name);
//constructing queryURL using name of anime
	var queryURL ="http://api.giphy.com/v1/gifs/search?q=" +
        		   Janime + "&api_key=dc6zaTOxFJmzC&limit=10";

//Ajax request from queryURL
	$.ajax({
		URL: queryURL,	method: "GET"
		}).done(function(response){
		console.log(queryURL);
		console.log(response);
		$("#content").html(JSON.stringify(response));
		});
		};
displayanimes()

//create buttons for each name in AnimeArray
function Animebuttons() {
//deletes previous displayed buttons to avoid repeated buttons 
	$("#AnimeBtn").empty();
//loop of the Anime Array
	for (var i=0; i<Animes.length; i++){
//make a button corresponding to the data name
	var Btn = $('<button>');
	Btn.addClass("Anime");
	Btn.attr("data-name", Animes[i]);
	Btn.text(Animes[i]);
	$("#AnimeBtn").append(Btn);
	}
};




