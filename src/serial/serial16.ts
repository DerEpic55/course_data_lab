/* 
	Найти все элементы, имеющие атрибут id
*/

import { select } from 'xpath';

export function findElementsWithIdAttribute(doc: Document): Node[] {
   const query = "//*[@id]" 	// Тут нужно написать XPath запрос
  return select(query, doc) as Node[];
}


