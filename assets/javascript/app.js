//create array of Animes
var Animes= ['Naruto', 'Bleach', 'Dragonball Super', 'Reborn', 'One piece', 'totoro', 'doraemon', 'death note', 'gundam'];


//===============Grab data query from URL and selectively choose the appropriate info============

// function gives html to diplay appropriate anime content
function displayanimes() {

	//empty previous image contents before start
	$("#Contents").empty();
	
	//Grabbing and storing data-name property value from the button
	var anime = $(this).attr('data-name');
	
	//constructing queryURL using name of anime
	var queryURL ="https://api.giphy.com/v1/gifs/search?q=" + anime + "-anime&api_key=dc6zaTOxFJmzC&limit=10";
    console.log(queryURL);
	
	//Ajax request from queryURL
	$.ajax({
		url: queryURL,	method: "GET"
		
		//after getting results from the request
		}).done(function(response){
		console.log(queryURL);
		console.log(response);
		
		//store the results in the variable
		var results = response.data;
		
		//loop through each result item
		for (var i=0; i<results.length; i++){

		//create a div tag to store each anime rating and image
		var animeDiv = $('<div class="animeDiv">');

		//create a paragraph tag to display rating corresponding to the image
		var animep = $("<p>").text("Rating: " + results[i].rating);

		//create a image tag to store each anime image
		var animeimg = $("<img>");
		animeimg.addClass("gif data-state data-still data-animate");//add classes for animated
		animeimg.attr("src", results[i].images.fixed_height_still.url);
		animeimg.attr("data-state", "still");
		animeimg.attr("data-still", results[i].images.fixed_height_still.url);
		animeimg.attr("data-animate", results[i].images.fixed_height.url);


		//append the paragraph and the animeimg to the animeDiv
		animeDiv.append(animep);
		animeDiv.append(animeimg);
		console.log(animeimg);
		//Prepending animeDiv to the "contents" in html
		$("#Contents").prepend(animeDiv);
		}
	  });
	};

//====================function for dynamic animated images=======================
		function animation(){
		//set value of the attribute on html element
			var state = $(this).attr("data-state");
		// If the clicked image's state is still, update it's src attribute to what it's data-animate value is.
        // Then set the image's data-state to animate
		if (state === "still") {
			$(this).attr("src", $(this).data("animate"));
			$(this).attr("data-state", "animate");
		}
		else {
		//change back to state ==="still" if not "still"
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
		}
		};

//======================================create anime buttons=====================================
//create buttons for each name in AnimeArray
function Animebuttons() {
//deletes previous displayed buttons to avoid repeated buttons 
	$("#AnimeBtn").empty();

//loop of the Anime Array
	for (var i=0; i<Animes.length; i++){

//make a button corresponding to the data name
	var Btn = $('<button>');
	Btn.addClass('Anime');
	Btn.attr('data-name', Animes[i]);
	Btn.text(Animes[i]);
	$('#AnimeBtn').append(Btn);
	}
};

	//call all anime buttons from the array
	Animebuttons()

//====================================create add anime button====================================
//add event listener to the div addAnime
$("#AddAnime").on('click', function(){

	//creating variable to input typed in the textbox
	var Janime = $("#anime-input").val().trim();

	//new anime entered added to the end of array
	Animes.push(Janime);

	//display buttons in AnimeBtn
	Animebuttons();

	return false;
});

//display anime info in html
$(document).on("click", ".Anime", displayanimes);
//display animated images when click on image
$(document).on("click", ".gif", animation);



