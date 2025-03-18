let colors = ["Red", "Green", "Blue", "Yellow", "Black"];
function find_longest_shortest(arr) {
  let longest = arr.reduce((acc, el) => (el.length >= acc.length ? el : acc));
  let shortest = arr.reduce((acc, el) => (el.length <= acc.length ? el : acc));
  console.log("Longest color:", longest);
  console.log("Shortest color:", shortest);
}
find_longest_shortest(colors);

function delete_words(colors) {
   let blue = colors.filter(colors => colors.includes("Blue"));
    console.log("Array only with color 'Blue':", blue);
}
delete_words(colors);

function join_words(colors) {
  let joined = colors.join(',');
  console.log("Joined array:", joined);
}

join_words(colors);