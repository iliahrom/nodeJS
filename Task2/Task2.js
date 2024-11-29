/*
Done by:
Ilia Hromchenko 
class:48/6

Bar Fahima
class 48/6

*/

//Task #2

/**
 write a code that will print all prime numbers that lower than 237
 */
num = 237;

//function checks if the number is a prime.
//in- number
//out- true or false
function isPrime(num) {
  if (num <= 1) return false; //0  and 1 not considered as primes

  //loop that starts from 2 till the square root of the number, if it has any divider in the range thats not a prime.
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}
//runs through numbers from 2 till the entered num(in our case 237 as requested)
for (let i = 2; i < num; i++) {
  if (isPrime(i)) {
    console.log(i);
  }
}
