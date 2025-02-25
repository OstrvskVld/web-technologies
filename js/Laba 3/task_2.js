function isPrime(n) {
    if (n < 2) return false;
    for (let i = 2; i * i <= n; i++) {
        if (n % i === 0) return false;
    }
    return true;
}

function sumPrimes(limit) {
    let sum = 0;
    for (let i = 1; i <= limit; i++) {
        if (isPrime(i)) {
            sum += i;
        }
    }
    return sum;
}

console.log("Answer of second task is", sumPrimes(1000));
