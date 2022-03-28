export function enumValues<O extends object>(obj: O): string[] {
  return Object.values(obj);
}

function greatestCommonDivisor(a: number, b: number): number {
  // Everything divides 0
  if (a === 0 || b === 0) {
    return 0;
  }

  // Base case
  if (a == b) {
    return a;
  }

  // a is greater
  if (a > b) {
    return greatestCommonDivisor(a - b, b);
  }

  return greatestCommonDivisor(a, b - a);
}

export function areCoprime(n: number, m: number) {
  return greatestCommonDivisor(n, m) === 1;
}

export function modInverse(a: number, m: number) {
  for (let x = 1; x < m; x++) {
    const isModInverse = (a * x) % m === 1 % m;
    if (isModInverse) {
      return x;
    }
  }

  throw new Error(`Unable to calculate modular inverse.`);
}

export function chunk(arr: any[], size: number) {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
}
