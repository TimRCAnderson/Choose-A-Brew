function openLink(event, text) 	{
		event.preventDefault();
		$(".w3-orange").removeClass("w3-orange");
		$(event.toElement).addClass("w3-orange");
		$(".w3-display-middle .shown").addClass("hidden").removeClass("shown");
		$("#" + text).removeClass("hidden").addClass("shown");
	}


	// // 	// Tabs
	// 	function openLink(evt, linkName) {
	// 		var i, x, tablinks;
	// 		x = document.getElementsByClassName("myLink");
	// 		for (i = 0; i < x.length; i++) {
	// 			x[i].style.display = "none";
	// 		}
	// 		tablinks = document.getElementsByClassName("tablink");
	// 		for (i = 0; i < x.length; i++) {
	// 			tablinks[i].className = tablinks[i].className.replace(" w3-orange", "");
	// 		}
	// 		document.getElementById(linkName).style.display = "block";
	// 		evt.currentTarget.className += " w3-orange";
	// 	}
	// 	// Click on the first tablink on load
	// 	document.getElementsByClassName("tablink")[0].click();

