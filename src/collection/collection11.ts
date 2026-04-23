/* 
	Создайте функцию groupBy, которая принимает массив объектов и ключ, 
	возвращает Map, где ключи - значения этого свойства, а значения - массивы объектов с 
	таким значением свойства.
*/

export function groupBy<T extends Record<string, any>>(arr: T[], key: keyof T): Map<T[keyof T], T[]> {
	return arr.reduce((acc, item) => {
		const groupKey = item[key];
		const group = acc.get(groupKey) ?? [];
		group.push(item);
		acc.set(groupKey, group);
		return acc;
	}, 
	new Map<T[keyof T], T[]>
	);
}
