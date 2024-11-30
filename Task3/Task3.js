/*
Done by:
Ilia Hromchekno
class:48/6

Bar Fahima
class 48/6
*/

//Task #3

/*
Write a program that defines an array and counts the amount of zero's.
*use conditional expression, if statmant not allowed.
*/
const arr = [123, 100, 0, 1234, 645, 2131];
let counter = 0;
arr.forEach((num) => (counter += num === 0 ? 1 : 0));

console.log(counter);
