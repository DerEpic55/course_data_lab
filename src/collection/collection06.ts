/* 
	Создайте функцию getUnique, которая принимает массив чисел 
	и возвращает новый массив только с уникальными элементами, используя Set.
*/

export function getUnique(arr: number[]): number[] {
	return [...new Set(arr)];
}
