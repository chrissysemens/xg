export const poisson = (lambda: number, k: number): number =>  {
    if (lambda < 0 || k < 0) {
      throw new Error('Lambda and k must be non-negative values.');
    }
  
    const factorial = (n: number): number => {
      if (n === 0) return 1;
      return n * factorial(n - 1);
    };
  
    const numerator = Math.pow(lambda, k) * Math.exp(-lambda);
    const denominator = factorial(k);
  
    return (numerator / denominator) * 100;
  }