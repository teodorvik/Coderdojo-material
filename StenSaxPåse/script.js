
// Globala variabler
var id = 0;
var stop_id;
var player2_stopped = true;
var game_started = false;
var border1;
var border2;

// Ändra val för spelare 2
function change_image_player2(){
	
	// Varje gång funktionen ropas på så kommer den att ändra bild 
	id = id % 3 + 1;

	var player2_image = document.getElementById("player2");
	
	if( id == 1 ){
		player2_image.src = "Sten.jpg";
	}
	else if(id == 2){
		player2_image.src = "Sax.jpg";
	}
	else {
		player2_image.src = "Pase.jpg";
	}
}

function onload(){

	/* 
		Så vi lätt kan ändra bordercolor sen.
	*/
	border1 = document.getElementById("player1").style;
	border2 = document.getElementById("player2").style;	
	
}

function input() {
    
    /* 
    	Lätt att skriva ut och se vad x är:
    	1 = Unicode 49
    	2 = Unicode 50
    	3 = Unicode 51
    	Enter = Unicode 13

    	alert("Unicode Value: "+x);
    */
    x = event.keyCode;

    /*
		Hämta bilden för spelare 1
    */
	var player1_image = document.getElementById("player1");

	/*
		När man har tryckt på en tangent så: 
		- har vi startat spelet? 

		Om vi har det ska vi:
		- kollar vi vilken det var
		- stoppar spelare 2
		- kollar vem som vann!

		Annars:
		- starta spelet!
	*/
    if (game_started == true){
	    if(x == 49){
	   		start_stop_player2();
	    	player1_image.src = "Sten.jpg";
			the_winner_is();
	    }
	    else if(x == 50){
	    	start_stop_player2();
			player1_image.src = "Sax.jpg";
			the_winner_is();

	    }else if(x == 51){
	    	start_stop_player2();
	    	player1_image.src = "Pase.jpg";
	    	the_winner_is();

	    }
	    game_started = false;
	}

	/* 
		om man trycker på enter ska spelet starta/stoppa
	*/
	if(x == 13){
		if (game_started == false) {
			game_started = true;
			start_stop_player2();
		} else {
			game_started = false;
		}

		// Återställ bordercolor till vit
		border1.borderColor="#ffffff";
		border2.borderColor="#ffffff";
	}

}

function the_winner_is(){

	/* 
		Kollar vilken bild spelare 1 och 2 har valt. 

		För bara få filnamnet på bilden använder man funktionen:
		player1.substring(player1.lastIndexOf('/')+1)
	*/
	var player1 = document.getElementById("player1").src;
	var player1s_choice = player1.substring(player1.lastIndexOf('/')+1);
	
	var player2 = document.getElementById("player2").src;
	var player2s_choice = player2.substring(player2.lastIndexOf('/')+1);

	/* 
		Räkna ut vem vinnaren är! Om spelare 1 vinner är winner = 1 och om 
	 	spelare 2 vinner är winner == 2.
	 */
	var winner;
	if (player1s_choice == "Sten.jpg" && player2s_choice == "Sax.jpg") {
		winner = 1;
	}	

	if (player1s_choice == "Sax.jpg" && player2s_choice == "Sten.jpg") {
		winner = 2;
	}

	if (player1s_choice == "Sax.jpg" && player2s_choice == "Pase.jpg") {
		winner = 1;
	}

	if (player1s_choice == "Pase.jpg" && player2s_choice == "Sax.jpg") {
		winner = 2;
	}

	if (player1s_choice == "Pase.jpg" && player2s_choice == "Sten.jpg") {
		winner = 1;
	}

	if (player1s_choice == "Sten.jpg" && player2s_choice == "Pase.jpg") {
		winner = 2;
	}

	if (player1s_choice == player2s_choice) {
		winner = 0;
	}	

	/* 
		Säg vem som vann genom att ändra bordercolor på vinnaren
	*/
	if (winner == 1) {
		border1.borderColor="#00ff00";
		border2.borderColor="#ffffff";
	} 
	else if (winner == 2){
		border1.borderColor="#ffffff";
		border2.borderColor="#00ff00";
	} 
	else{
		border1.borderColor="#006655";
		border2.borderColor="#006655";
	}
}

function start_stop_player2(){

	/*
		Starta och stoppa spelare 2
	*/
	if(player2_stopped == true){
		/*
			Vi behöver stop_id för att kunna stoppa setInterval sen.
		*/	
		stop_id = setInterval(change_image_player2, 100);
		player2_stopped = false;

	} else {
		clearInterval(stop_id);
		player2_stopped = true;

	}
}