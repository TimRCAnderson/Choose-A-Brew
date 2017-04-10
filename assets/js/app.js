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
	var $results = $("#locations").children("ul");

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
		});

		for(var i = 0; i < response.length; i++)
		{
			var brewLi = $("<li>")
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
				);
		}
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
		});

		for(var i = 0; i < response.length; i++)
		{
			var beerLi = $("<li>")
			.data(response[i])
			.addClass("row beer")
			.append($("<div>")
				.addClass("col-sm-12 beer")
				.append($("<div>")
					.append($("<h4>")
						.text(response[i].name)))
				.append($("<p>")
					.text(response[i].description))
				);
		}
	}

	function locationSearch()
	{
		var response;
		var searchType = "location";
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
			postal = "&postal=" + postal;
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
		});

		for(var i = 0; i < response.length; i++)
		{
			var brewLi = $("<li>")
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
				);

			$results.empty();
			brewLi.appendTo($results);
		}
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
			var beerLi = $("<li>")
			.data(response[i])
			.addClass("beer")
			.append($("<h5>")
				.addClass("beer-name")
				.text(response[i].name))
			.append($("<p>")
				.addClass("beer-description")
				.text(response[i].description));
		}
	}

	//TODO: add D3js bar graph for rating distribution
	//TODO: finish search results displays
	//TODO: pass .data() of beer name to rating submission form.
	//TODO: add brewery links on their names.
});