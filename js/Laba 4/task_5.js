let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function sum(arr){
    let result = arr.map(arr => arr*arr);
    console.log("Array with squared numbers:", result);
}

sum(numbers);

function even(arr){
    let result = arr.filter(arr => arr%2 === 0);
    console.log("Array with even numbers:", result);
}

even(numbers);

function odd(arr){
    let result = arr.reduce((a,b) => a+b)
    console.log("Sum of all numbers:", result);
}

odd(numbers);

let newnumbers = [1,2,3,4,5];

function multiply(arr1, arr2){
    arr1.splice(arr1.length, 0, ...arr2);
    console.log("New array:", arr1);
}

multiply(numbers.slice(), newnumbers);

function delete_numbers(arr){
    let result = arr.splice(0, 3);
    console.log("Array without first 3 numbers:", arr);
}

delete_numbers(numbers);