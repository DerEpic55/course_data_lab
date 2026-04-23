/* 
	Напишите функцию findIntersection, которая принимает два массива и 
  возвращает массив их общих элементов, используя Set.
*/

export function findIntersection(arr1: number[], arr2: number[]): number[] {
  const intersection = new Set<number>();
  for(const value1 of arr1){
    for(const value2 of arr2){
      if(value1 === value2){
         intersection.add(value1);
      }
    }
  }
  return [...intersection];
}
