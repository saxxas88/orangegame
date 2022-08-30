const headers = {
	"Content-Type": "application/json",
	"X-Parse-Application-Id": "biorfarm_365e4dcrbh76t",
	"X-Parse-Session-Token": localStorage.getItem('parseToken')
};
const url = 'https://biorfarm.herokuapp.com/parse/'

/* Validate email function */
function validateEmail(email) {
	var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,})?$/;
	return emailReg.test(email);
}

$(document).ready(function () {
	// fix keyboard appearing on mobile
	let viewheight = $(window).height();
	let viewwidth = $(window).width();
	let viewport = document.querySelector("meta[name=viewport]");
	viewport.setAttribute("content", "height=" + viewheight + "px, width=" + viewwidth + "px, initial-scale=1.0");

	/* Load game's Ranking at loading page and Show podium */
	/*
	$.ajax({
		url: url + "classes/GameScore",
		method: "GET",
		headers: headers,
		//data:{where:{event:localStorage.getItem('event')},order:'-score', limit:3}
	}).then(function(response){
		$.each(response.results, function(index, value){
			$('#leaderboard .table').append('<div class="row"><div class="nickname">' + value.playerName + '</div><div class="score"><span>' +  value.score + '</span></div></div>');
		});
	});*/

	/* Show Event Data and Show player's score game */
	$('#leaderboard h2').text(localStorage.getItem('event'));
	$('#leaderboard .table').append('<div class="row"><img class="img-event" src="' + localStorage.getItem('eventLogo') + '"></div>');

});

/* Send player's score and redirect to results page */
/* Old version - refresh() */
/*
function refresh(){
	cr_setSuspended(true);
	//let score = localStorage.getItem("score_game");
	//let score = localStorage.getItem("score_best");
//	let email = localStorage.getItem("email");
	//let player = localStorage.getItem("player");
//	let event = localStorage.getItem("event");
/*
	// Send player's data
	$.ajax({
	url: url + "classes/GameScore",
	method: "POST",
	headers: headers,
	//data:JSON.stringify({"email":email, "playerName":player, "score":Number(score), "event":event })
	data:JSON.stringify({"email":email, "score":Number(score), "event":event })
}).then(function(){
			//location.reload();
		  localStorage.removeItem("player");
			localStorage.removeItem("email");
			location.href = 'results.html';
		});  
	}
});  
}
*/

/* End game's session and Redirect to results page */
/*  New Version - refresh() */
function refresh() {
	cr_setSuspended(true);
	location.href = 'results.html';
}

/* Initialize game's parameters and Show Game */
/* Old version */
/*
// Check validation email 
$('.submit-form').click(function(){
	/* Register User & Get Ranking Game
	let email = $('#email').val();
	let player = $('#player').val();
	console.log(email);
	if (email == "" || email == "email" || !validateEmail(email)){
		nativeToast({
		  message: 'Inserisci un indirizzo email!',
		  position: 'south',
		  // Self destroy in 5 seconds
		  timeout: 5000,
		  type: 'warning'
		});
		return 0;
	}
	*/
/*
	// Load game's ranking
	$.ajax({
		url: url + "classes/GameScore",
		method: "GET",
		headers: headers,
		data:{where:{email:email, event:localStorage.getItem("event")}}
	}).then(function(response){
		// Check game's attempts
		if (response.results.length > 0){
			nativeToast({
			  message: 'Hai già partecipato :(',
			  position: 'south',
			  // Self destroy in 5 seconds
			  timeout: 5000,
			  type: 'error'
			});
		}
		// Set new game's scores and Start game
		else {
		//	localStorage.setItem("email", email);
		//	localStorage.setItem("player", player);
			localStorage.setItem('score_best',0);
			cr_createRuntime("c2canvas");
			$('#c2canvasdiv').show();
			$('#top').hide();
		//}
	//})
})
*/

/* Initialize game's parameters and Start Game */
/* Only set score_best to 0 */
$('.submit-form').click(function () {
	localStorage.setItem('score_best', 0);
	cr_createRuntime("c2canvas");
	$('#c2canvasdiv').show();
	$('#top').hide();

})

$('#form').click(function (e) {
	e.preventDefault();
})