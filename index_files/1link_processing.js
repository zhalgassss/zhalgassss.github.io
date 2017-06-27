if (typeof(partnerCounter) == 'object'){
	partnerCounter.save = function(site_id){
		var expiresDate = new Date();
		expiresDate.setTime(expiresDate.getTime() + (365 * 24 * 60 * 60 * 1000));
		var expires = expiresDate.toGMTString();
		var newCookie = "__partner_id=" + site_id + "; path=/; expires=" + expires;
		document.cookie = newCookie + ";";
	}

	partnerCounter.load = function () {
		return this.getCookie("__partner_id");
	}

	partnerCounter.run();
}
