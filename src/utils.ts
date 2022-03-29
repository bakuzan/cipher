import fs from 'fs';
import { CipherOptions } from './constants/CipherOptions';

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

export async function readTextFromFile(filePath: string) {
  return fs.readFileSync(filePath, 'utf8').toString();
}

export async function writeTextToFile(options: CipherOptions, text: string) {
  if (options.file === undefined) {
    throw new Error('File undefined!');
  }

  const outputFilePath = options.file.split('.').slice(0, -1).join('.');
  const filename = `${outputFilePath}_${options.mode.toString()} output.txt`;
  fs.writeFileSync(filename, text);

  console.log(`Result output to: `, outputFilePath);
}
