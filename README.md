# Invention

The next generation game engine.

This is intended to be a modular game engine, where you can use each functionality as a library or a libraries bundle to make the game development easier.

## Libraries

### Dice

Dice is a class to build simple dices

```js
// require the library
const Dice = require('./dist/dice');
// or import it
// import { Dice } from './dist/dice.js';

// create a new dice
const diceSize = 6;
const dice1 = new Dice(diceSize);

let move = dice.roll();
console.log(move);
```
