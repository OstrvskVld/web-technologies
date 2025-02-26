function filterOddLengthStrings(arr) {
  return arr.filter((str) => str.length % 2 !== 0);
}

const strings = ["apple", "banana", "cherry", "kiwi", "grape"];
const result = filterOddLengthStrings(strings);
console.log(result); 
