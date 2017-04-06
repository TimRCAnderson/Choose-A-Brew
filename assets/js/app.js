$(document).ready(function() {
	var brewDBURL = "https://fathomless-plains-61908.herokuapp.com/beer/locations?key=f763de9765b39a76ecb1f8861767928a&locality=Charlotte"

	$.ajax({
		method: "GET",
		url: brewDBURL,
	}).done(function(response) {
		console.log(response);
	});
});