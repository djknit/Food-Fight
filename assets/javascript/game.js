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
    var iconId = "#" + name.toLowerCase();
    this.icon = $(iconId);
}

var characters = [];
characters[0] = new Character("Cupcake", 60, 30, 40);
characters[1] = new Character("Cheeseburger", 90, 25, 60);
characters[2] = new Character("Artichoke", 180, 15, 25);
characters[3] = new Character("Carrot", 200, 30, 40);
