const input = ["MA", "SA", "I", "SCH", "OOL"];
const lowerCase = (character) => character.toLowerCase();
const wordConversion = (word) =>
  word
    .split()
    .map((letter) => lowerCase(letter))
    .join("");
const output = input.map((word) => wordConversion(word));
console.log(output);
