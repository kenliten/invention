const Dice = require('./dice');

const dice1 = new Dice(6);
const dice2 = new Dice(8);
var roll;

describe('Dices class', function() {
  it('Is a valid constructor', function() {
    expect(typeof dice1).toEqual('object');
  });

  it('Has a limit number', function() {
    expect(typeof dice1.limit).toEqual('number');
  });

  it('Has a dice value', function() {
    expect(typeof dice1.value).toEqual('number');
  });

  it('It rolls', function() {
    roll = dice1.roll();
    expect(typeof roll).toEqual('number');
  });

  it('Rolls with a limit', function() {
    roll = dice1.roll();
    expect(roll).toBeLessThan(7);
  });

  it('Rolls with a limit', function() {
    roll = dice2.roll();
    expect(roll).toBeLessThan(9);
  });
});