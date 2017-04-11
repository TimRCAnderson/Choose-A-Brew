	function openLink(event, text) 	{
		event.preventDefault();
		$(".w3-display-middle .shown").addClass("hidden").removeClass("shown");
		$("#" + text).removeClass("hidden").addClass("shown");
	}