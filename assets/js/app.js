$(document).ready(function() {
	var brewDBURL = "https://fathomless-plains-61908.herokuapp.com/beer/"

	var brewDBKey = "key=f763de9765b39a76ecb1f8861767928a"

	var searchType = "location";

	var resultsDiv = $("<div>");

	function search()
	{
		var response;
		queryURL = brewDBURL + searchType + "?" + brewDBKey + "locality=charlotte";
		$.ajax({
			method: "GET",
			url: queryURL
		}).done(function(r) {
			response = r.data;
		});

		for(var i = 0; i < response.length; i++)
		{
			var brewDiv = $("<div>")
			.data(response[i])
			.addClass("row brewery")
			.append($("<div>")
				.addClass("col-sm-12")
				.append($("<div>")
					.append($("<img>")
						.attr("src", response[i].brewery.images.icon)
						.addClass("img-thumbnail"))
					.append($("<h4>")
						.text(response[i].brewery.name)))
				.append($("<p>")
					.text(response[i].brewery.description))
				);
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
			var beerDiv = $("<div>")
				.data(response[i])
				.addClass("beer")
				.append($("<div>")
					.addClass("beer-name")
					.text(response[i].name))
				.append(("<div>")
					.addClass("beer-description")
					.text(response[i].description));
		}
	}
});