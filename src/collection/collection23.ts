/* 
	Напишите функцию groupByCategory, которая принимает массив объектов и имя свойства для группировки, 
	возвращает объект, где ключи - значения свойства, а значения - массивы объектов.
*/

export function groupByCategory<T extends Record<string, any>>(arr: T[], key: keyof T): Record<T[keyof T], T[]> {
	return arr.reduce((acc, item) => {
    	const groupKey = item[key];
    	if (!acc[groupKey]) {
    	  acc[groupKey] = [];
    	}
    	acc[groupKey].push(item);
    	return acc;
		},
		{} as Record<T[keyof T], T[]>
	);
}


