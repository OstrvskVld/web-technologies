let students = [
    { name: "John", age: 25, course: 1 },
    { name: "Andrew", age: 27, course: 2 },
    { name: "Marcus", age: 30, course: 3 },
    { name: "Tim", age: 23, course: 1 },
    { name: "Matt", age: 24, course: 2 }
]

function delete_name(arr) {
    let result = arr.filter(arr => arr.name !== "John");
    console.log("Array without John:", result);
}

delete_name(students);

function add_student(arr) {
    let newStudent = { name: "Tom", age: 29, course: 3 };
    arr.push(newStudent);
    console.log("Array with new student:", arr);
}

add_student(students);

function sortAge(arr){
    let result = arr.sort((a, b) => b.age - a.age);
    console.log("Sorted array by age:", result);
}

sortAge(students);

function findCourse(arr){
    let result = arr.filter(arr => arr.course === 3);
    console.log("Array only with course 3:", result);
}

findCourse(students);