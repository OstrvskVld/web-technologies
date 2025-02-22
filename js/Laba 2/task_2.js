function IsInRange(number, min, max) {
  if (number > min && number < max) {
    return true;
  }
  return false;
}
console.log(IsInRange(5, 1, 10));
console.log(IsInRange(11, 1, 10));

// part 2
function IsInRange(number, min, max) {
  if (number > min && number < max) {
    return true;
  }
  return false;
}
console.log(!IsInRange(5, 1, 10));
console.log(!IsInRange(11, 1, 10));
