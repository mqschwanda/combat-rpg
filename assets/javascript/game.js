	// declare variables 
		var userToon, userState, enemyState, userPower, enemyPower, userDodge, userCounter, userBlock, enemy1, enemy2, enemy3, currentEnemy;
		var toonArray = [];
		// lock buttons until enemy is selected
		var buttonsActive = false;
		// allows enemy to be selected
		var canSelectEnemy = true;
		var deadEnemy = 0;

	    function enemyDecision() {
	    	var random = 3;
	    	var random = Math.floor(Math.random()*5);
	    	if (random >= 3) {
	    		enemyState = 3;
	    		enemyPower = currentEnemy.strength;
	    		console.log("attack");
	    	}
	    	if (random == 2) {
	    		enemyState = 2;
	    		enemyPower = currentEnemy.counter;
	    		console.log("counter");
	    	}
	    	if (random == 1) {
	    		enemyState = 1;
	    		enemyPower = currentEnemy.block;
	    		console.log("block");
	    	}
	    }

    function endTurn() {
    	buttonsActive = true;

    	if (currentEnemy.health <= 0) {
    		// allow the user to select enemy
    		// add new img to show death
    		canSelectEnemy = true;
    		deadEnemy++;
    		$('#current-enemy-name').append(" - Dead");
    	}

    	if (userToon.health <= 0) {
    		alert("GAME OVER!");
    	}

    	if (deadEnemy == 3) {
    		alert("YOU WIN!");
    	}	
    }

    function fight() {
    	enemyDecision();

    	// if enemy toon attacks
    	if (enemyState >= 3 && userState < 3) {
		    if ((enemyPower - userPower) > 0) {
	    		userToon.health = userToon.health - (enemyPower - userPower);
	    		$('#user-health').html('Health: ' + userToon.health);	
			}
		    if (((userPower - enemyPower) > 0) && (userState != 1)) {
	    		currentEnemy.health = currentEnemy.health - (userPower - enemyPower);
	    		$('#current-enemy-health').html('Health: ' + currentEnemy.health);	
			}
			if ((userState == 1) && ((enemyPower - userPower) <= 0)){
				alert("Block");
			}
		}
		// if user toon attacks
    	if (userState >= 3 && enemyState < 3) {
		    if ((userPower - enemyPower) > 0) {
	    		currentEnemy.health = currentEnemy.health - (userPower - enemyPower);
	    		$('#current-enemy-health').html('Health: ' + currentEnemy.health);	
			}
			if (((enemyPower - userPower) > 0) && (enemyState != 1)) {
	    		userToon.health = userToon.health - (enemyPower - userPower);
	    		$('#user-health').html('Health: ' + userToon.health);	
			}
			if ((enemyState == 1) && ((enemyPower - userPower) <= 0)){
				alert("Block");
			}
		}
		// if both toons attack
		if (userState >= 3 && enemyState >= 3) {
    		currentEnemy.health = currentEnemy.health - userPower;
	    	$('#current-enemy-health').html('Health: ' + currentEnemy.health);
	    	// if enemy is alive allow to attack
	    	if (currentEnemy.health > 0) {
				userToon.health = userToon.health - enemyPower;
		    	$('#user-health').html('Health: ' + userToon.health);	

	    	}
	    }

		// if no toons attack
		if (userState < 3 && enemyState < 3) {
			alert("NO ATTACK");	
		}

		endTurn();
    }

	function toon(name, health, agility, strength, defense) {
	    // build variable
	    this.name = name;
	    this.health = health;
	    this.agility = agility;
	    this.strength = strength;
	    this.defense = defense;
	    this.block = Math.round((defense+strength)/2);
	    this.counter = Math.round((agility+strength)/2);
	    // where to locate the img for this toon
	    this.src = ("assets/images/" + name.replace(/ /g,"_") + ".png" ).toLowerCase()
	    // create name of id for use in HTML
	    this.id = (name.replace(/ /g,"-")).toLowerCase();
		// create the naming convention for javascript variables
	    function camelize(str) {
			return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
				return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
			}).replace(/\s+/g, '');
		}
	    this.var = (camelize(name));
	    // load toon objects into array
	    toonArray.push(this);
	    // print toon into the loading toon-field
	    $('#print-toon-field').append('<div class="col-xs-4 col-md-3 col-lg-2"><img id="' + this.id + '" class="img-responsive toon-field-img" src="' + this.src + '"></div>')
		// load toon value into div with toon.id 
	    $("#" + this.id).data('value',this);
	}
	// list of toons
		var buzzLightyear = new toon("Buzz Lightyear", 600, 60, 50, 55); 
		var adamWest = new toon("Adam West", 600, 60, 40, 60);
		var pikachu = new toon("Pikachu", 550, 75, 35, 50);
		var simba = new toon("Simba", 500, 55, 55, 40);
		var yoshi = new toon("Yoshi", 500, 55, 55, 40);
		var captainAmerica =  new toon("Captain America", 750, 75, 75, 75);
		var bowser = new toon("Bowser", 650, 25, 65, 65);
		var bender = new toon("Bender", 450, 40, 90, 45);
		var archer = new toon("Archer", 400, 50, 50, 40);
		var link = new toon("Link", 550, 55, 55, 55);
		var spongebob = new toon("Spongebob", 60, 30, 30, 55);
		var ratchetAndClank = new toon("Ratchet and Clank", 50, 70, 35, 50);

		console.log(toonArray);

	// print image into the player info div when a player card is clicked   
    $('.toon-field-img').click(function(){
    	userToon = $(this).data('value');
        $('#print-toon-img').attr( 'src', userToon.src );
        $('#print-toon-name').html(userToon.name);
        $('#print-toon-health').html('Health: ' + userToon.health);
        $('#print-toon-agility').html('Agility: ' + userToon.agility);
        $('#print-toon-defense').html('Defense: ' + userToon.defense);
        $('#print-toon-strength').html('Strength: ' + userToon.strength);  		
    })

    // print into matchup box
    $('#start-game').click(function(){
    	// display battlefield
    	$('#battlefield').removeClass('hidden');
    	// print user and enemy field
        $('#user-img').attr( 'src', userToon.src );
        $('#user-name').html(userToon.name);
        $('#user-health').html('Health: ' + userToon.health);
        $('#user-agility').html('Agility: ' + userToon.agility);
        $('#user-strength').html('Strength: ' + userToon.strength);
        $('#user-defense').html('Defense: ' + userToon.defense);
        enemy1 = toonArray[Math.floor(Math.random()*toonArray.length)];
        $('#enemy1-img').data('value',enemy1);
        $('#enemy1-img').attr( 'src', enemy1.src );
        $('#enemy1-name').html(enemy1.name);
        enemy2 = toonArray[Math.floor(Math.random()*toonArray.length)];
        $('#enemy2-img').attr( 'src', enemy2.src );
        $('#enemy2-img').data('value',enemy2);
        $('#enemy2-name').html(enemy2.name);
        enemy3 = toonArray[Math.floor(Math.random()*toonArray.length)]; 	
        $('#enemy3-img').attr( 'src', enemy3.src );
        $('#enemy3-img').data('value',enemy3);
        $('#enemy3-name').html(enemy3.name);
        // hide the selector window
        $('#selector-box').addClass('hidden');
    })

    // select enemy to battle
    $('.enemy-img').click(function() {
    	if (canSelectEnemy == true) {
    		// allow user to attack enemy
	    	buttonsActive = true;
	    	// lock select enemy
	    	canSelectEnemy = false;
	    	// print enemy
	    	$('#current-enemy-img').data('value', $(this).data('value') );
	        $('#current-enemy-img').attr( 'src', this.src );
	        currentEnemy = $('#current-enemy-img').data('value');
	        $('#current-enemy-name').html(currentEnemy.name);
	        $('#current-enemy-health').html('Health: ' + currentEnemy.health);
	        $('#current-enemy-agility').html('Agility: ' + currentEnemy.agility);
	        $('#current-enemy-strength').html('Strength: ' + currentEnemy.strength);
	        $('#current-enemy-defense').html('Defense: ' + currentEnemy.defense);
    	}	

    })


    // attack button
    $('#user-attack-btn').click(function(){
    	if (buttonsActive == true){
    		buttonsActive = false;
    		userState = 3;
    		userPower = userToon.strength;
    		fight();
    		
    	}
    })
    // block button
    $('#user-block-btn').click(function(){
    	if (buttonsActive == true){
    		buttonsActive = false;
    		userState = 1;
    		userPower = userToon.block;
    		fight();
    	}
    })
    // counter button
    $('#user-counter-btn').click(function(){
    	if (buttonsActive == true){
    		buttonsActive = false;
    		userState = 2;
    		userPower = userToon.counter;
    		fight();
    	}
    })










