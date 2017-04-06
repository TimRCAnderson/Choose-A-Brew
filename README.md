# Choose-A-Brew

for prototyping: 
	* layout
	* User Interface:
		* search bar with city, state, zip code, which ties in to the brewDB API search functionality.
			* Search returns breweries
		* Clicking on a brewery field expands a segment that lists their beers.
			* clicking on a beer will load in restaurants on google maps that serve that beer.
				*? Also search restaurants by brewery?
			* Restaurants can have their menus displayed, toggled between food, beer, or both.
		* User star ratings by beer
			*? tied to specific user (requires authentication. Shortcut is using local storage.)