var currentBeer;
var currentBrewery;

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
	var $beerRatings = $("#beer-ratings")
	$beers.addClass("col-sm-12");

	$("#icon-beer").rating();

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
		var response;
		var searchType = "breweries";
		var queryURL = brewDBURL + searchType + "?" + brewDBKey + "&name=" + $sBrewery.val().trim();

		$.ajax({
			method: "GET",
			url: queryURL
		}).done(function(r) {
			response = r.data;
			console.log(response);
			console.log(r);
			if(response != undefined)
			{
				initMap();
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
								.attr("href", response[i].website)
								.attr("target", "_blank")
								.append(breweryLinkPop(response[i])))
							.append($("<h4>")
								.addClass("brewery-name")
								.text(response[i].name)))
						.append($("<p>")
							.addClass("brewery-desc")
							.text(response[i].description))
						.append($("<div>")
							.append($("<button>")
								.addClass("btn beer-button")
								.text("get Beers")
								.data({breweryId: response[i].id})
								.click(getBeers))));
					addMarker(response[i]);
					map.fitBounds(bounds);
					brewdiv.appendTo($results);
					$results.parent().removeClass("hidden");
				}
				location.href = "#search-results";
			}
		});
	}

	function beerSearch()
	{
		var response;
		var searchType = "beers";
		var queryURL = brewDBURL + searchType + "?" + brewDBKey + "&name=" + $sBeer.val().trim();

		$.ajax({
			method: "GET",
			url: queryURL
		}).done(function(r) {
			response = r.data;
			console.log(response);
			$("#beer-list").empty();
			if(!(response === undefined))
			{
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
			}
		});
	}

	function locationSearch()
	{
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
			{
				initMap();
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
				location.href = "#search-results";
			}
		});
	}

	function getBeers()
	{
		var $this = $(this);
		currentBrewery = $this.data("breweryId");
		currentBeer = "";
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

			if(!(r === undefined))
			{
				$beers.empty();
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
			}
			else
			{
				var beerdiv = $("<div>")
				.append($("<h5>")
					.text("No beers were in the database for this Brewery."))
			}
		});
	}

	function getCurrentBeer()
	{
		var $this = $(this);
		currentBeer = $this.parent().data().id;
		if(currentBrewery)
			$("#ratings-beer-name").text($this.parent().data().name);
		//TODO: pull stats from database for this beer
		$.ajax({
			method: "GET",
			url: (database.ref(currentBrewery + "/" + currentBeer).toString() + ".json")
		}).done(function(r) {
			if(!(r === null))
			{
				location.href = "#beer-ratings-navigate";
				var $beerTable = $beerRatings.find("table");
				$beerTable.empty();
				$beerTable.append($("<thead>")
					.append($("<tr>")
						.append($("<td>")
							.text("Rating"))
						.append($("<td>")
							.text("Comment"))));
				$beerRatings.find("#goToRate")
				.removeClass("hidden");
				var keys = Object.keys(r);
				console.log(r);
				console.log(keys);
				var thumbs = [0, 0, 0, 0, 0];
				for(var j = 0; j < keys.length; j++)
				{
					thumbs[(r[keys[j]].userRating - 1)]++;
				}
				var maxThumbs = 0;
				for(var k = 0; k < thumbs.length; k++)
				{
					if(thumbs[k] > maxThumbs)
					{
						maxThumbs = thumbs[k];
					}
				}
				console.log(maxThumbs);
				console.log(thumbs);
				d3.select(".rating-chart")
				.selectAll("div")
				.data(thumbs)
				.enter().append("div")
				.style("width", function(d) {return (d / maxThumbs * 80 + "%");})
				.text(function(d) {return d;})
				for(var i = 0; i < keys.length && i < 4; i++)
				{
					var rating = $("<tr>")
					.append($("<td>")
						.text(r[keys[i]].userRating))
					.append($("<td>")
						.text(r[keys[i]].rateComment));
					rating.appendTo($beerTable);
				}
			}
			else
			{
				location.href = "#beer-ratings-navigate";
				var $beerTable = $beerRatings.find("table");
				$beerTable.empty();
				$beerTable.append($("<thead>")
					.append($("<tr>")
						.append($("<td>")
							.text("Nobody has rated this beer."))));
				$beerRatings.find("#goToRate")
				.removeClass("hidden");
			}
		});
	}

	$beerRatings.find("#goToRate").click(goToRateBeer);

	function goToRateBeer()
	{
		location.href = "#beer-thumbs";
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

	function singleBreweryLinkPop(anObject)
	{
		if(anObject.images === undefined)
		{
			return ($("<button>")
				// .text("WS")
				.addClass("w3-button"));
		}
		else
		{
			return ($("<img>")
				.attr("src", anObject.images.icon)
				.attr("alt", "Brewery Logo")
				.addClass("img-thumbnail brewery-img"));
		}
	}

	//TODO: add D3js bar graph for rating distribution
	//TODO: finish search results displays
	//TODO: pass .data() of beer name to rating submission form.
});



