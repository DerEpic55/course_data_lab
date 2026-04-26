/* 
	РНайти все элементы с class="active".
*/

import { select } from 'xpath';

export function findElementsWithExactClass(doc: Document): Node[] {
   	const query = "//*[@class='active']" 	// Тут нужно написать XPath запрос
  	return select(query, doc) as Node[];
}