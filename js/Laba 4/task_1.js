function task1_pop(arr) {
    arr.pop();
    console.log("Answer of first task (pop) is", arr);
  }
  
  function task1_unshift(arr) {
    arr.unshift("Ananas");
    console.log("Answer of first task (unshift) is", arr);
  }
  
  function task1_sortReverse(arr) {
    arr.sort().reverse();
    console.log("Answer of first task (sort().reverse()) is", arr);
  }

  function task1_search(arr) {
    console.log("Answer of first task (indexOf) is", arr.indexOf("Apple"));
  }
  
  let fruits = ["Apple", "Orange", "Plum", "Banana", "Kiwi"];
  
  task1_pop(fruits.slice()); 
  task1_unshift(fruits.slice()); 
  task1_sortReverse(fruits.slice()); 
  task1_search(fruits.slice());
  
  console.log("Original array:", fruits);