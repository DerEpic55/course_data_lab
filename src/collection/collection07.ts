/* 
  Напишите функцию countFrequency, которая принимает массив строк и возвращает Map, где ключи - это элементы массива, а значения - количество их вхождений.
*/

export function countFrequency(arr: string[]): Map<string, number> {
  const map = new Map();

  for (const str of arr) {
    const count = map.get(str) || 0;
    map.set(str, count + 1);
  }

  return map;
}
