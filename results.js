const headers = {
	"Content-Type": "application/json",
	"X-Parse-Application-Id": "biorfarm_365e4dcrbh76t",
	"X-Parse-Session-Token": localStorage.getItem('parseToken')
};
const url = 'https://biorfarm.herokuapp.com/parse/'


$(document).ready(function () {
	if (!localStorage.getItem('score_game'))
		location.href = 'game.html';

	/* Load game's Ranking at loading page and Show player's position */
	/*
	$('#result .score').text(localStorage.getItem('score_game'));
	//$('#leaderboard h2').text(localStorage.getItem('event'));
	let uristring = '?where={"event":"'+localStorage.getItem('event') + '", "score":{"$gte":'+ localStorage.getItem('score_game')+'}}';
	$.ajax({
		url: url + "classes/GameScore" + uristring,
		method: "GET",
		headers: headers,
		//data:{"where":{"event":localStorage.getItem('event'), "score":{"$gte":localStorage.getItem('score_game')}}}
	}).then(function(response){
		$('#result .position').text(response.results.length);
	});
	*/

	/*Set default button's properties and Show best score */
	//$('#dismiss button').text("Esci");
	//$('#dismiss button').prop("disabled",false);


	$('#escape').prop("disabled", false);
	$('#send').prop("disabled", true);
	$('#player-score').text("Il tuo miglior punteggio : " + localStorage.getItem('score_best'));
});

/* Validate email function */
function validateEmail(email) {
	var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,})?$/;
	return emailReg.test(email);
}

/*Change button's value depending on state*/
/*
$('#accept').click(function(){
	if($('#accept').prop("checked"))
		$('#dismiss button').text("Invia");
	else
		$('#dismiss button').text("Esci");
})
*/

/*Change send-button's value depending on state*/
$('#accept').click(function () {
	if ($('#accept').prop("checked")) {
		$('#send').prop('disabled', false);
		$('#send').toggleClass('disabled-send');
	} else {
		$('#send').prop('disabled', true);
		$('#send').toggleClass('disabled-send');
	}
})

/* Send user's data and check errors */
$('#dismiss button').click(function () {
	let score = localStorage.getItem("score_best");
	let event = localStorage.getItem("event");

	if ($('#accept').prop("checked") && $(this).text() === 'Invia') {
		let email = $('#email').val();
		if (email == "" || email == "email" || !validateEmail(email)) {
			nativeToast({
				message: 'Inserisci un indirizzo email valido!',
				position: 'south',
				// Self destroy in 5 seconds
				timeout: 5000,
				type: 'warning'
			});
			return 0;
		} else {
			$('#dismiss button').prop("disabled", true);
			$.ajax({
				url: url + "classes/GameScore",
				method: "POST",
				headers: headers,
				data: JSON.stringify({
					"email": email,
					"score": Number(score),
					"event": event
				})
			}).then(function () {
				nativeToast({
					message: 'Grazie per aver partecipato!',
					position: 'south',
					// Self destroy in 5 seconds
					timeout: 5000,
					type: 'success'
				})
				setTimeout(redirect, 5000);
			}, function (err) {
				$('#dismiss button').prop("disabled", false);
				nativeToast({
					message: 'Impossibile salvare i tuoi dati!',
					position: 'south',
					// Self destroy in 10 seconds
					timeout: 10000,
					type: 'error'
				})
				setTimeout(redirect(), 10000);
			})
		}
	} //else not accept	
	else {
		redirect();
	}
})

/* Redirect to the start page of the game and Remove scores of the game*/
function redirect() {
	localStorage.removeItem("score_game");
	localStorage.removeItem("score_best");
	location.href = 'game.html';
}

/* Load game's Ranking and Show podium */
/*
	$.ajax({
		url: url + "classes/GameScore",
		method: "GET",
		headers: headers,
		data:{where:{event:localStorage.getItem('event')},order:'-score', limit:3}
	}).then(function(response){
		$('#leaderboard h2').text(localStorage.getItem('event'));
		$.each(response.results, function(index, value){
			$('#leaderboard .table').append('<div class="row"><div class="nickname">' + value.playerName + '</div><div class="score">' +  value.score + '</div></div>');
		});
	});
*/


/* Modal */
// Get DOM Elements
const modal = document.querySelector('#my-modal');
const modalBtn = document.querySelector('#modal-btn');
const closeBtn = document.getElementById('btnClose');
const closeFooter = document.getElementById('close');
// Events
modalBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
closeFooter.addEventListener('click', closeModal);
//window.addEventListener('click', outsideClick);

// Open
function openModal() {
	modal.style.display = 'block';
}

// Close
function closeModal() {
	modal.style.display = 'none';
}

// Close If Outside Click
function outsideClick(e) {
	if (e.target == modal) {
		modal.style.display = 'none';
	}
}

var privacyPolicy = false;

$('#modal-btn').click(function () {
	if (!privacyPolicy) {

		$.ajax({
			url: url + "config",
			method: "GET",
			headers: headers,

		}).then(function (response) {
			privacyPolicy = true;
			$('.modal-body').append(response.params.privacyPolicy);
		})
	}
})