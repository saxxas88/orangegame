const headers = {
	"Content-Type": "application/json",
	"X-Parse-Application-Id": PARSE_APP_ID,
	"X-Parse-REST-API-Key": PARSE_REST_API_KEY,
   };
 const url = PARSE_URL

/* Load game's Ranking at loading page */
/*
$(document).ready(function () {
	$.ajax({
		url: url + "sessions/me",
		method: "GET",
		headers: Object.assign(headers, {"X-Parse-Session-Token":localStorage.getItem('parseToken')})
	}).then(function(response){
		//console.log(JSON.stringify(response));
		if (!response.error){
			location.href = 'game.html';
		}
		else 
			localStorage.removeItem('parseToken');
	});
});
*/

/* Start game's session and Get Event Data */
$('.submit').click(function () {
	let user = $('#username').val().toLowerCase();
	let password = $('#password').val();
	$.ajax({
		url: url + "login",
		method: "GET",
		headers: headers,
		data: {
			username: user,
			password: password
		}
	}).then(function (response) {
		//console.log(JSON.stringify(response));
		if (!response.error) {
			localStorage.setItem("parseToken", response.sessionToken);
			localStorage.setItem("event", response.event);
			if (response.eventData) {
				localStorage.setItem("eventLogo", response.eventData.eventLogo);
			} else {
				localStorage.setItem("eventLogo", "assets/demo-logo.jpg");
			}
			location.href = 'game.html';
		}
	})


})