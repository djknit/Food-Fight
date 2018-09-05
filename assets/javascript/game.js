// creating character objects
// constructor
function Character(name, hp, attack, counter) {
    this.name = name;
    this.startingHealthPoints = hp;
    this.startingAttackPoints = attack;
    this.startingCounterAttackPoints = counter;
    this.healthPoints = hp;
    this.attackPoints = attack;
    this.counterAttackPoints = counter;
    this.icon = $("#" + name.toLowerCase());
    this.isDefeated = false;
    this.incrementAttack = function() {
        this.attackPoints = this.attackPoints + this.startingAttackPoints;
    };
    this.displayHp = function() {
        $(".hp." + this.name.toLowerCase()).html(this.healthPoints + " hp");
    };
    this.reduceHp = function(points) {
        this.healthPoints = this.healthPoints - points;
        this.displayHp();
    };
    this.attack = function(defender0) {
        defender0.reduceHp(this.attackPoints);
    };
    this.defend = function(attacker0) {
        attacker0.reduceHp(this.counterAttackPoints);
    };
    this.reset = function() {
        this.healthPoints = this.startingHealthPoints;
        this.attackPoints = this.startingAttackPoints;
        this.counterAttackPoints = this.startingCounterAttackPoints;
        this.isDefeated = false;
        this.displayHp();
    };
}

// character
var characters = [];
characters[0] = new Character("Cupcake", 90, 30, 40);
characters[1] = new Character("Cheeseburger", 105, 25, 60);
characters[2] = new Character("Artichoke", 155, 15, 20);
characters[3] = new Character("Carrot", 160, 25, 35);

// Other variables
var attacker = {};
var defender = {};
var gamePhase = "characterSelection";
var enemiesLeft = 3;

// Functions
// resetting for new game
function newGame() {
    gamePhase = "characterSelection";
    for (let i = 0; i < characters.length; i++) {
        $("#characters").append(characters[i].icon);
        $("#characters").append(" ");
        // removing classes added during previous game from character icons
        characters[i].icon.removeClass("user_character enemy in_battle");
        // Adding click events for elements that were dynamically removed and re-added to the page losing their click events in the process
        if (characters[i].isDefeated) {
            characters[i].icon.on("click", function() {
                console.log("clicked");
                chooseDefender(characters[i]);
                chooseCharacter(characters[i]);
            });
        }
        characters[i].isDefeated = false;
        characters[i].reset();
    }
    enemiesLeft = 3;
}

// functions for choosing character/defender (will be called when icon is clicked)
function chooseCharacter(character0) {
    if (gamePhase === "characterSelection") {
        attacker = character0;
        // adding class to chosen character icon for changing style
        attacker.icon.addClass("user_character");
        for (i = 0; i < characters.length; i++) {
            if (characters[i] === attacker) {
                $("#your_character").append(characters[i].icon);
            }
            else {
                $("#enemies").append(characters[i].icon);
                $("#enemies").append(" ");
                // adding class to enemy icons for changing style
                characters[i].icon.addClass("enemy");
            }
        }
        gamePhase = "enemySelection";
        $("#info").html("Choose an enemy to battle.");
    }
}

function chooseDefender(enemy0) {
    if (gamePhase === "enemySelection" && enemy0 !== attacker) {
        console.log("enemy selection: " + enemy0.name);
        defender = enemy0;
        defender.icon.addClass("in_battle");
        attacker.icon.addClass("in_battle");
        $("#defender").append(enemy0.icon);
        gamePhase = "battle";
        $("#info").html("Click the attack button to attack your enemy.")
    }
}

// Gameplay
newGame();
$("#info").html("Choose a character to fight with.");

// creating click events for character icons
for (let i = 0; i < characters.length; i++) {
    characters[i].icon.on("click", function() {
        console.log(characters[i].name + " clicked");
        chooseDefender(characters[i]);
        chooseCharacter(characters[i]);
    });
}

// attack button
$("#attack_btn").on("click", function() {
    if (gamePhase === "battle") {
        attacker.attack(defender);
        $("#info").html(attacker.name + " attacked " + defender.name + " for " + attacker.attackPoints + " damage.");
        attacker.incrementAttack();
        if (defender.healthPoints <= 0) {
            defender.isDefeated = true;
            console.log("Enemy defeated");
            $("#info").append("<br>" + attacker.name + " defeated " + defender.name + ".");
            defender.icon.remove();
            enemiesLeft--;
            attacker.icon.removeClass("in_battle");
            console.log(enemiesLeft + " enemies left");
            if (enemiesLeft === 0) {
                $("#info").prepend("You won! Choose another character to fight with!<br>Last round:<br>");
                newGame();
                console.log("win");
            }
            else {
                gamePhase = "enemySelection";
                $("#info").append("<br>Choose an enemy to battle next.");
            }
        }
        else {
            defender.defend(attacker);
            $("#info").append("<br>" + defender.name + " attacked " + attacker.name + " for " + defender.counterAttackPoints + " damage.");
            if (attacker.healthPoints <= 0) {
                $("#info").prepend("You lost. Try again. Choose a character.<br>Last round:<br>");
                $("#info").append("<br>" + defender.name + " defeated " + attacker.name + ".");
                newGame();
                console.log("loss");
            }
        }
    }
});