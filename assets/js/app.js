var currentBeer;

$(document).ready(function() {
	var brewDBURL = "https://fathomless-plains-61908.herokuapp.com/beer/"
	var brewDBKey = "key=f763de9765b39a76ecb1f8861767928a"
	
	var $resultsDiv = $("<div>");
	var $sByLoc = $("#form-location");
	var $sCity = $("#search-city");
	var $sState = $("#search-state");
	var $sZip = $("#search-zip");
	var $sByBeer = $("#form-beer");
	var $sBeer = $("#search-beer");
	var $sByBrewery = $("#form-brewery");
	var $sBrewery = $("#search-brewery");
	var $results = $("#results-list");
	var $beers = $("#beers-here");



	console.log($sByLoc.toString());

	$sByLoc.submit(function(event) {
		event.preventDefault();
		locationSearch();
	})

	$sByBrewery.submit(function(event) {
		event.preventDefault();
		brewerySearch();
	});

	$sByBeer.submit(function(event) {
		event.preventDefault();
		beerSearch();
	});

	function brewerySearch()
	{
		location.href = "#search-results";
		var response;
		var searchType = "breweries";
		var queryURL = brewDBURL + searchType + "?" + brewDBKey + "&name=" + $sBrewery.val().trim();

		$.ajax({
			method: "GET",
			url: queryURL
		}).done(function(r) {
			response = r.data;
			console.log(response);
			$results.empty();
			for(var i = 0; i < response.length; i++)
			{
				var brewdiv = $("<div>")
				.data(response[i])
				.addClass("row-brewery")
				.append($("<div>")
					.addClass("col-sm-12")
					.append($("<div>")
						.addClass("brewery")
						.append($("<img>")
							.attr("src", checkImages(response[i]))
							.attr("alt", "Brewery Logo")
							.addClass("img-thumbnail brewery-img" + noImageHidden(response[i])))
						.append($("<h4>")
							.addClass("brewery-name")
							.text(response[i].brewery.name)))
					.append($("<p>")
						.addClass("brewery-desc")
						.text(response[i].brewery.description))
					.append($("<div>")
						.append($("<button>")
							.text("get Beers")
							.data("breweryId", response[i].breweryId)
							.click(getBeers))));

				brewdiv.appendTo($results);
			}
		});
	}

	function beerSearch()
	{
		location.href = "#search-results";
		var response;
		var searchType = "beers";
		var queryURL = brewDBURL + searchType + "?" + brewDBKey + "&name=" + $sBeer.val().trim();

		$.ajax({
			method: "GET",
			url: queryURL
		}).done(function(r) {
			response = r.date;
			console.log(response);
			$("#beer-list").empty();
			if(response === undefined)
			{
				for(var i = 0; i < response.length; i++)
				{
					var beerdiv = $("<div>")
					.data(response[i])
					.addClass("row beer")
					.append($("<div>")
						.addClass("col-sm-12 beer")
						.append($("<div>")
							.append($("<h5>")
								.text(response[i].name)))
						.append($("<p>")
							.text(response[i].description))
						);
					beerdiv.appendTo($("#beer-list"));
				}
			}
		});
	}

	function locationSearch()
	{
		location.href = "#search-results";
		var response;
		var searchType = "locations";
		var city = $sCity.val().trim();
		var state = $sState.val().trim();
		// var postal = $sZip.val().trim();

		if(city != "")
		{
			city = "&locality=" + city;
		}
		else
		{
			city = "";
		}

		if(state != "")
		{
			state = "&region=" + state;
		}
		else
		{
			state = "";
		}

		// if(postal != "")
		// {
		// 	postal = "&postalCode=" + postal;
		// }
		// else
		// {
		// 	postal = "";
		// }

		queryURL = brewDBURL + searchType + "?" + brewDBKey + city + state;
		$.ajax({
			method: "GET",
			url: queryURL
		}).done(function(r) {
			response = r.data;
			console.log(r);
			console.log(response);
			$results.empty();
			if(response != undefined)
				{initMap();
					for(var i = 0; i < response.length; i++)
					{
						console.log(i);
						var brewdiv = $("<div>")
						.data(response[i])
						.addClass("row row-brewery")
						.append($("<div>")
							.addClass("col-sm-12")
							.append($("<div>")
								.addClass("brewery")
								.append($("<a>")
									.addClass("brewery-website")
									.attr("href", response[i].brewery.website)
									.attr("target", "_blank")
									.append(breweryLinkPop(response[i])))
								.append($("<h4>")
									.addClass("brewery-name")
									.text(response[i].brewery.name)))
							.append($("<p>")
								.addClass("brewery-desc")
								.text(response[i].brewery.description))
							.append($("<div>")
								.append($("<button>")
									.addClass("btn beer-button")
									.text("get Beers")
									.data({breweryId: response[i].breweryId})
									.click(getBeers))));
						addMarker(response[i]);
						map.fitBounds(bounds);
						brewdiv.appendTo($results);
						$results.parent().removeClass("hidden");
					}
				}
			});
	}

	function getBeers()
	{
		var $this = $(this);
		var $breweryDiv = $this.parent().parent().clone();
		$breweryDiv.find(".btn.beer-button").parent().remove();
		$("#current-brewery").empty().append($breweryDiv);
		var response;
		queryURL = brewDBURL + "brewery/" + $this.data("breweryId") + "/beers?" + brewDBKey;
		$.ajax({
			method: "GET",
			url: queryURL
		}).done(function(r) {
			response = r.data;
			console.log(r);
 	
			for(var i = 0; i < response.length; i++)
			{
				var beerdiv = $("<div>")
				.data(response[i])
				.addClass("beer")
				.append($("<h5>")
					.addClass("beer-name")
					.text(response[i].name.trim())
					.click(getCurrentBeer))
				.append($("<p>")
					.addClass("beer-description")
					.text(response[i].description));
				beerdiv.appendTo($beers);
			}
			location.href = "#beer-list";
		});
	}

	function getCurrentBeer()
	{
		var $this = $(this);
		currentBeer = $this.parent().data().id;

	}

	function breweryLinkPop(anObject)
	{
		if(anObject.brewery.images === undefined)
		{
			return ($("<button>")
				// .text("WS")
				.addClass("w3-button"));
	}
	else
	{
		return ($("<img>")
			.attr("src", anObject.brewery.images.icon)
			.attr("alt", "Brewery Logo")
			.addClass("img-thumbnail brewery-img"));
	}
}

function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

	//TODO: add D3js bar graph for rating distribution
	//TODO: finish search results displays
	//TODO: pass .data() of beer name to rating submission form.

	//TODO: pass brewery and beer IDs.
});