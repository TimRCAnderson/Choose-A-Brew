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
	var $results = $("#locations").children(".results");

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
							.attr("src", response[i].brewery.images.icon)
							.addClass("img-thumbnail brewery-img"))
						.append($("<h4>")
							.addClass("brewery-name")
							.text(response[i].brewery.name)))
					.append($("<p>")
						.addClass("brewery-desc")
						.text(response[i].brewery.description))
					.append($("<div>")
						.append("<button>")
						.data("breweryID", response[i].breweryID)
						.cdivck(getBeers)));

				brewdiv.appendTo($results);
			}
		});
	}

	function beerSearch()
	{
		var response;
		var searchType = "beer";
		var queryURL = brewDBURL + searchType + "?" + brewDBKey + "&name=" + $sBeer.val().trim();

		$.ajax({
			method: "GET",
			url: queryURL
		}).done(function(r) {
			response = r.data;

			$("#beer-list").empty();
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
		});
	}

	function locationSearch()
	{
		var response;
		var searchType = "locations";
		var city = $sCity.val().trim();
		var state = $sState.val().trim();
		var postal = $sZip.val().trim();

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

		if(postal != "")
		{
			postal = "&postalCode=" + postal;
		}
		else
		{
			postal = "";
		}

		queryURL = brewDBURL + searchType + "?" + brewDBKey + city + state + postal;
		$.ajax({
			method: "GET",
			url: queryURL
		}).done(function(r) {
			response = r.data;
			console.log(r);
			console.log(response);
			$results.empty();
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
						.append($("<img>")
							.attr("src", checkImages(response[i]))
							.attr("alt", "Brewery Logo")
							.addClass("img-thumbnail brewery-img" + noImageHidden(response[i])))
						.append($("<h4>")
							.addClass("brewery-name")
							.text(response[i].brewery.name))
						.append($("<a>")
							.addClass("brewery-website")
							.attr("href", response[i].brewery.website)
							.attr("target", "_blank")
							.append($("<button>")
								.text("Website")
								.addClass("w3-button w3-dark-grey"))))
					.append($("<p>")
						.addClass("brewery-desc")
						.text(response[i].brewery.description))
					);
				brewdiv.appendTo($results);
			}
		});
	}

	function getBeers()
	{
		var $this = $(this);
		var response;
		queryURL = brewDBURL + "brewery/" + $this.data("breweryID") + "/beers?" + brewDBKey;
		$.ajax({
			method: "GET",
			url: queryURL
		}).done(function(r) {
			response = r.data;
		});

		for(var i = 0; i < response.length; i++)
		{
			var beerdiv = $("<div>")
			.data(response[i])
			.addClass("beer")
			.append($("<h5>")
				.addClass("beer-name")
				.text(response[i].name))
			.append($("<p>")
				.addClass("beer-description")
				.text(response[i].description))
			.append($("<div>")
				.addClass("rating-container")
				.append($.fn.rating()));
		}
	}

	function checkImages(anObject)
	{
		if(anObject.brewery.images === undefined)
		{
			return "";
		}
		else
		{
			return anObject.brewery.images.icon;
		}
	}

	function noImageHidden(anObject)
	{
		if(anObject.brewery.images === undefined)
		{
			return " hidden";
		}
		else
		{
			return "";
		}
	}

	//TODO: add D3js bar graph for rating distribution
	//TODO: finish search results displays
	//TODO: pass .data() of beer name to rating submission form.
	//TODO: add brewery divnks on their names.
});