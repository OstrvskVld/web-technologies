let employees = [
  { name: "John", age: 25, job: "Developer"},
  { name: "Andrew", age: 27, job: "Designer"},
  { name: "Marcus", age: 30, job: "Manager"},
  { name: "Tim", age: 23, job: "Developer"},
  { name: "Matt", age: 24, job: "Designer"}
];

function sortArr(arr) {
  let result = arr.sort((a, b) => a.name.localeCompare(b.name));
  console.log("Sorted array by name:", result);
}

sortArr(employees);

function filterdevelopers(arr) {
  let result = arr.filter(arr => arr.job === "Developer");
  console.log("Array only with developers:", result);
}
filterdevelopers(employees);

function delete_age(arr) {
    let result = arr.filter(arr => arr.age !== 30);
    console.log("Array without age:", result);
}

delete_age(employees);

function add_employee(arr) {
    let newEmployee = { name: "Tom", age: 29, job: "Designer" };
    arr.push(newEmployee);
    console.log("Array with new employee:", arr);
}

add_employee(employees);