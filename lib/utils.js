export function round(num, dec=1) {
  let pow = Math.pow(10, dec);
  return Math.round(num * pow) / pow;
}

