/* 
	Создайте функцию countByRanges, которая принимает массив чисел и массив диапазонов, возвращает Map, где ключи - строковые представления диапазонов, а значения - количество чисел, попадающих в каждый диапазон.
*/

export function countByRanges(numbers: number[], ranges: [number, number][]): Map<string, number> {
	const result = new Map<string, number>(
		ranges.map(([min, max]) => [`${min}-${max}`, 0])
	);

	 return numbers.reduce((acc, num) => {
    for (const [min, max] of ranges) {
      if (num >= min && num <= max) {
        const key = `${min}-${max}`;
        acc.set(key, (acc.get(key) || 0) + 1);
      }
    }
    return acc;
  }, result);
}
