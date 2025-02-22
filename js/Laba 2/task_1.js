function calcucalteMin(array) {
  let min = array[0];
  for (let i = 0; i < array.length; i++) {
    if (array[i] < min) {
      min = array[i];
    }
  }
  return min;
}
function calcucalteMax(array) {
  let max = array[0];
  for (let i = 0; i < array.length; i++) {
    if (array[i] > max) {
      max = array[i];
    }
  }
  return max;
}
const numbers = [1, 2, -3, 4, -5, 6, 7, 8, 9, -10];
console.log(calcucalteMin(numbers));
console.log(calcucalteMax(numbers));

// part 2
let obj1 = {
  name: "John",
  age: 30,
};
let obj2 = {
  name: "John",
  age: 30,
};
function isEquals(obj1, obj2) {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }
  for (let key in obj1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
}
console.log(isEquals(obj1, obj2));
