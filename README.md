# Food Fight

### Food Fight is a simple RPG game.

## Contents
* [Links](#links)
* [Project Goals](#project-goals)
* [Project Features](#project-features)
* [Technologies Used](#technologies-used)
* [Instructions for Use](#instructions-for-use)
* [Developer](#developer)

## Links
* Live App: [djknit.github.io/Food-Fight/](https://djknit.github.io/Food-Fight/)
* GitHub Repository: [github.com/djknit/Food-Fight](https://github.com/djknit/Food-Fight/)

## Project Goals
Create a web-based RPG game using jQuery for DOM interaction that satisfies the following conditions.
* The user may choose one of 4 characters to play the game as by clicking on that character's picture at the beginning of the game.
* Each character has the 3 attributes "health points" (HP), "attack points," and "counter attack power."
  * The values of these attributes are positive integers.
  * No two characters have the exact same attribute values.
* Once the player's character is selected, the player must fight the other three characters one at a time. The enemies are also selected by clicking on the character's picture. The selected opponent character's picture should be moved to a defender area when selected.
* Once an enemy is selected to fight, the user must press the attack button to attack their opponent until either the player's character or the opponent is defeated.
* When the attack button is pressed:
  * The player's character deals damage to the opponent equal to the current attack points value of the attacking character. This damage is subtracted from the opponent's health points (HP).
  * The opponent deals damage to the player's character equal to the opponent's counter attack power. The damage is subtracted from the player's character's HP.
  * The player's character's attack points value is increased by that character's base attack points (the starting value of the character's attack points).
* If either the player's character's or the opponent character's HP reaches 0 or less, that character is defeated.
  * When an opponent character is defeated, it's picture is removed from the screen, and the user must select another opponent to fight.
  * When the player's character is defeated, the game is over and the player loses.
* The player wins the game when they have defeated all 3 opponents.
* The player is able to both win and lose when playing as each character. (The outcome of the game will depend on the order in which the enemies are battled).

## Project Features
The finished app satisfies all the conditions listed under [Project Goals](#Project-Goals). Additionally, the following statements are also true.
* When the player attacks an opponent and the opponent is defeated by the attack, the opponent does not deal counter attack damage to the player's character.
* Each character's HP is displayed by the character's picture. Attack points and counter attack points are not displayed.
* After each attack, the damage done to each character is displayed on the screen.
* The player is able to determine the attack points and counter attack points of each character by making note of the amount of damage they deal during battle.

## Technologies Used
* jQuery (for DOM interaction and AJAX)
* HTML, CSS, and JavaScript

## Instructions for Use
To run the app, visit [https://djknit.github.io/Food-Fight/](https://djknit.github.io/Food-Fight/). Alternatively, you can run the app by cloning the repository to your local machine and opening `index.html` in your browser.
Select a character to play as by clicking on that character. Battle your enemies one at a time until you have defeated them all or you have been defeated.

## Developer
This project is developed and maintained by David Knittel. Any and all questions, comments, suggestions, or proposed contributions are welcome.
* Email: [djknit@gmail.com](mailto:djknit@gmail.com)
* Portfolio: [djknit.github.io](https://djknit.github.io/)
* GitHub: [github.com/djknit](https://github.com/djknit)
* LinkedIn: [linkedin.com/in/djknit](https://www.linkedin.com/in/djknit/)

This project was originally developed as a homework assignment for the KU Coding Bootcamp Full Stack Flex program and uses specifications laid out by the homework requirements.