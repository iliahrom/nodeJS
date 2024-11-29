/*
Done by:
Ilia Hromchenko 
class:48/6

Bar Fahima
class 48/6

*/

//Task#1
/*
write a program that check for the given number the folowing,
a.if the number can be divided by 2 or 3 or 5 it will return 1(can be divided only by one number)
b.if the number can be divided by 2&3 or 3&5 or 2&5(can be divided by two numbers) returns 2.
c.if the number can be divided by 2&3&5(can be divided by all numbers) returns 3.
if can't be divided by any of the numbers, it will return 0.
*/

const num = 123;

//checks if the number can be devided by 2,3,5, by using NOT we gettinig the opposite number
//it will return the needed number according to the task.

const by2 = !(num % 2);
const by3 = !(num % 3);
const by5 = !(num % 5);

const res = by2 + by3 + by5;

console.log(res);
