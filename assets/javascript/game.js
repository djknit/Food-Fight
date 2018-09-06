// creating character objects
// --- constructor
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
    // methods
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
        // move icon to character selection area
        $("#characters").append(this.icon);
        $("#characters").append(" ");
        // reset hp and attack points to starting values (and update hp on page)
        this.healthPoints = this.startingHealthPoints;
        this.attackPoints = this.startingAttackPoints;
        this.displayHp();
        // recreating click event for icon IF the icon was removed from the page in previous game (thus causing it to loose the click event)
        // - the conditional is necessary to avoid creating multiple click events on one icon
        var self = this;
        if (self.isDefeated) {
            self.icon.on("click", function() {
            chooseDefender(self);
            chooseCharacter(self);
            });
        }
        // resetting variable showing whether icon has been removed from the page
        this.isDefeated = false;
        // removing classes added during previous game from character icons
        this.icon.removeClass("user_character enemy in_battle");
        // adding "choosable" class to icon (used to allow hover effect can be applied only when character is available to be chosen)
        this.icon.addClass("choosable")
    };
}

// --- creating individual characters using constructor
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
var wins = 0;
var losses = 0;

// Functions
// --- resetting for new game
function newGame() {
    // set game phase to "characterSelection" to allow character to be chosen
    gamePhase = "characterSelection";
    for (let i = 0; i < characters.length; i++) {
        characters[i].reset();
    }
    enemiesLeft = 3;
}

// --- functions for adding/removing "choosable" class from ALL character icons
// --- - this is used only to remove add/remove hover effect from icons
function makeAllCharactersChoosable() {
    for (i = 0; i < characters.length; i++) {
        characters[i].icon.addClass("choosable");
    }
}

function makeAllCharactersUnchoosable() {
    for (i = 0; i < characters.length; i++) {
        characters[i].icon.removeClass("choosable");
    }
}

// --- function for writing wins and losses to page
function displayWinsAndLosses() {
    if ($("#wins_losses").hasClass("not_empty") === false) {
        $("#wins_losses").addClass("not_empty");
    }
    $("#wins_losses").html("Wins: " + wins + "<br>Losses: " + losses);
}

// --- functions for choosing character/defender (will be called when icon is clicked)
function chooseCharacter(character0) {
    if (gamePhase === "characterSelection") {
        attacker = character0;
        // adding class to chosen character icon for changing style
        attacker.icon.addClass("user_character");
        attacker.icon.removeClass("choosable");
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
        makeAllCharactersUnchoosable();
        defender.icon.addClass("in_battle");
        attacker.icon.addClass("in_battle");
        $("#defender").append(enemy0.icon);
        gamePhase = "battle";
        $("#attack_btn").addClass("choosable");
        $("#info").html("Click the attack button to attack your enemy.");
    }
}

// Gameplay
newGame();
$("#info").html("Choose a character to fight with.");

// creating click events for character icons
for (let i = 0; i < characters.length; i++) {
    characters[i].icon.on("click", function() {
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
            $("#info").append("<br>" + attacker.name + " defeated " + defender.name + ".");
            defender.icon.remove();
            enemiesLeft--;
            attacker.icon.removeClass("in_battle");
            if (enemiesLeft === 0) {
                $("#info").prepend("You won! Choose another character to fight with!<br>Last round:<br>");
                wins++;
                displayWinsAndLosses();
                newGame();
            }
            else {
                makeAllCharactersChoosable();
                attacker.icon.removeClass("choosable");
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
                losses++;
                displayWinsAndLosses();
                newGame();
            }
        }
    }
    else {
        $("#info").append("<br>Attack failed because you are not currently in battle.")
    }
});