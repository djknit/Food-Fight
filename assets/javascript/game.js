// creating character objects
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
        $(".hp." + this.name.toLowerCase()).html(this.healthPoints);
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

var characters = [];
characters[0] = new Character("Cupcake", 60, 30, 40);
characters[1] = new Character("Cheeseburger", 90, 25, 60);
characters[2] = new Character("Artichoke", 180, 15, 25);
characters[3] = new Character("Carrot", 200, 30, 40);

var attacker = {};
var defender = {};
var gamePhase = "characterSelection";
var enemiesLeft = 3;

function newGame() {
    gamePhase = "characterSelection";
    for (let i = 0; i < characters.length; i++) {
        $("#characters").append(characters[i].icon);
        $("#characters").append(" ");
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

function chooseCharacter(character0) {
    if (gamePhase === "characterSelection") {
        attacker = character0;
        for (i = 0; i < characters.length; i++) {
            if (characters[i] === attacker) {
                $("#your_character").append(characters[i].icon);
            }
            else {
                $("#enemies").append(characters[i].icon);
                $("#enemies").append(" ");
            }
        }
        gamePhase = "enemySelection";
        $("#info").html("Choose an enemy to battle.");
    }
}

function chooseDefender(enemy0) {
    if (gamePhase === "enemySelection") {
        console.log("enemy selection: " + enemy0.name);
        defender = enemy0;
        $("#defender").append(enemy0.icon);
        gamePhase = "battle";
        $("#info").html("Click the attack button to attack your enemy.")
    }
}

newGame();
$("#info").html("Choose a character to fight with.");

for (let i = 0; i < characters.length; i++) {
    characters[i].icon.on("click", function() {
        console.log(characters[i].name + " clicked");
        chooseDefender(characters[i]);
        chooseCharacter(characters[i]);
    });
}

// characters[0].icon.on("click", function() {
//     console.log("cupcake clicked");
//     chooseDefender(characters[0]);
//     chooseCharacter(characters[0]);
// });
// characters[1].icon.on("click", function() {
//     console.log("burger clicked");
//     chooseDefender(characters[1]);
//     chooseCharacter(characters[1]);
// });
// characters[2].icon.on("click", function() {
//     console.log("artichoke clicked");
//     chooseDefender(characters[2]);
//     chooseCharacter(characters[2]);
// });
// characters[3].icon.on("click", function() {
//     console.log("carrot clicked");
//     chooseDefender(characters[3]);
//     chooseCharacter(characters[3]);
// });

$("#attack_btn").on("click", function() {
    if (gamePhase === "battle") {
        attacker.attack(defender);
        if (defender.healthPoints <= 0) {
            defender.isDefeated = true;
            console.log("Enemy defeated");
            defender.icon.remove();
            enemiesLeft--;
            console.log(enemiesLeft + " enemies left");
            if (enemiesLeft === 0) {
                $("#info").html("You won! Choose another character to fight with!");
                newGame();
                console.log("win");
            }
            else {
                gamePhase = "enemySelection";
                $("#info").html("Choose an enemy to battle next.");
            }
        }
        else {
        defender.defend(attacker);
        attacker.incrementAttack();
        if (attacker.healthPoints <= 0) {
            $("#info").html("You lost. Try again. Choose a character.");
            newGame();
            console.log("loss");
        }
    }
    }
});