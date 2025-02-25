function fibonacciSum() {
  let a = 0,
    b = 1,
    sum = 0,
    count = 0;

  while (count <= 10) {
    sum += a;
    let temp = a + b;
    a = b;
    b = temp;
    count++;
  }

  console.log("Answer of first task is:" + sum);
}

fibonacciSum();
