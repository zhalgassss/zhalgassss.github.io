$.event.trigger({
		type: "canLoad"
});

function mr_load_block(url, id, params, type){
	var date = new Date(new Date().getTime() + 40*3600 * 1000);
	document.cookie = 'mrreferer='+document.referrer+';path=/; expires=' + date.toUTCString();
	document.cookie = 'mrcurrentpath='+location.pathname+';path=/; expires=' + date.toUTCString();

	if (!url){
		return;
	}
	params = params || {};
	type = type || 'GET';
	$('#'+id+'_load').show();
	$.ajax({
		async: true,
		type: type,
		url: url,
		dataType: 'html',
		data: params,
		success: function (data) {
				try{
					var json = $.parseJSON(data);
				}catch(err){
					var json = false;
				}
				if (!json){
					$('#'+id).html(data);
					$('#'+id+'_load').hide();
				} else {
					if (json.redirect){
						document.location.href = json.redirect;
					} else if (json.nosdc){
						$.ajax({
			url: "https://auth.mail.ru/sdc",
			jsonp: "JSONP_call",
			data: {
				from: json.host
			},
			dataType: "jsonp",
			success: function( response ) {
				document.location.href = json.host;
			},
	error: function (response){
delete_cookie('MRGToken');
document.location.href = json.host;
}
		});
					} else {
						if (console){
							console.log(json);
						}
					}
				}
		},
		error: function (data) {
			$('#'+id).html('');
			$('#'+id+'_load').hide();
		}
	});
}

function delete_cookie( name ) {
	var c = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=.'+document.location.host;
	document.cookie = c;
}
