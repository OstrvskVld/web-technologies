let student = {
    name: "John",
    age: 30,
    course: 2
};
student.items = ["book", "pen", "pencil"];
delete student.age;
console.log(student);
